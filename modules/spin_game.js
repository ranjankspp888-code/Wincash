// GitHub Path: modules/spin_game.js
// Live Backend Gateway Configured Safely

const BACKEND_GATEWAY = "https://script.google.com/macros/s/AKfycbxMyKNAmfTUdW9yKCKggFn_T7WAuXSuqtCEYzq06A-h-mkKe4NV4ue6ioDaOpSW0H8cSw/exec"; 

export function drawGamingUI() {
    const userSession = JSON.parse(localStorage.getItem("game_user")) || { mobileNumber: "Guest", walletBalance: 0 };
    
    return `
        <style>
            .arcade-box { text-align: center; background: #151728; border: 3px solid #00ffcc; border-radius: 20px; padding: 30px; box-shadow: 0 0 25px #00ffcc; max-width: 400px; width:100%; font-family: monospace; position: relative; }
            .user-bar { display: flex; justify-content: space-between; color: #00ffcc; font-size: 12px; margin-bottom: 15px; border-bottom: 1px dashed #334155; padding-bottom: 8px; }
            .arcade-title { color: #fff; font-size: 24px; text-shadow: 0 0 10px #ff007f; margin-bottom: 20px; letter-spacing: 2px;}
            .wheel-frame { position: relative; width: 280px; height: 280px; margin: 20px auto; border: 8px solid #ff007f; border-radius: 50%; box-shadow: 0 0 20px #ff007f; overflow: hidden; background: #222; transition: transform 4s cubic-bezier(0.1, 0.8, 0.3, 1); }
            .pointer { position: absolute; top: 65px; left: calc(50% - 15px); z-index: 10; width: 0; height: 0; border-left: 15px solid transparent; border-right: 15px solid transparent; border-top: 25px solid #00ffcc; filter: drop-shadow(0 0 5px #00ffcc); }
            .spin-trigger-btn { background: #ff007f; border: none; color: white; padding: 15px 40px; font-size: 18px; font-weight: bold; border-radius: 30px; cursor: pointer; box-shadow: 0 0 15px #ff007f; transition: 0.3s; margin-top: 15px; width: 100%; letter-spacing: 1px; font-family: monospace;}
            .spin-trigger-btn:hover { background: #00ffcc; color: #000; box-shadow: 0 0 20px #00ffcc; }
            .overlay-ad-loader { display: none; position: fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.95); z-index:100; justify-content:center; align-items:center; flex-direction:column; color:#00ffcc; font-family: monospace;}
            .spinner-icon { border: 4px solid rgba(255,0,127,0.3); border-left-color: #ff007f; width: 50px; height: 50px; border-radius: 50%; animation: spinAnim 1s linear infinite; margin-bottom: 20px;}
            @keyframes spinAnim { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        </style>

        <div class="arcade-box">
            <div class="user-bar">
                <span>📱 ${userSession.mobileNumber}</span>
                <span id="display-wallet">💰 ₹${userSession.walletBalance}</span>
            </div>
            <h1 class="arcade-title">⚡ CYBER SPIN ⚡</h1>
            <div class="pointer"></div>
            <div id="lucky-wheel-canvas" class="wheel-frame">
                <div style="color:#666; padding-top:120px;">LOADING SLOTS...</div>
            </div>
            <button id="action-roll-btn" class="spin-trigger-btn">ENGAGE SPIN</button>
        </div>

        <div id="ad-gate-overlay" class="overlay-ad-loader">
            <div class="spinner-icon"></div>
            <h2>🎬 STREAMING REWARD VIDEO AD...</h2>
            <p style="color:#666; margin-top:10px;">Wallet rewards unlock after full preview</p>
        </div>
    `;
}

export async function bindGameLogic() {
    const btn = document.getElementById('action-roll-btn');
    const wheel = document.getElementById('lucky-wheel-canvas');
    const adOverlay = document.getElementById('ad-gate-overlay');
    const walletDisplay = document.getElementById('display-wallet');

    const userSession = JSON.parse(localStorage.getItem("game_user"));
    if (!userSession) {
        alert("🔒 Cyber Security Alert: Authenticate first!");
        window.location.hash = "#login";
        return;
    }

    let initFetch = await fetch(BACKEND_GATEWAY, {
        method: 'POST',
        body: JSON.stringify({ action: "getSpinGameConfig", payload: {} })
    });
    let serverSetup = await initFetch.json();
    let slotsData = serverSetup.data.slots;

    let sliceDeg = 360 / slotsData.length;
    let fallbackUI = "";
    slotsData.forEach((slot, index) => {
        fallbackUI += `<div style="position:absolute; width:100%; height:100%; transform:rotate(${sliceDeg * index}deg); text-align:center; padding-top:25px; font-weight:bold; color:${index % 2 === 0 ? '#00ffcc' : '#ff007f'}">₹${slot.cash}</div>`;
    });
    wheel.innerHTML = fallbackUI;

    btn.addEventListener('click', async () => {
        btn.disabled = true;

        let spinRoll = await fetch(BACKEND_GATEWAY, {
            method: 'POST',
            body: JSON.stringify({ action: "rollTheLuckyWheel", payload: { mobileNumber: userSession.mobileNumber } })
        });
        let rollResult = await spinRoll.json();

        if (rollResult.data.status === "LIMIT_REACHED") {
            alert(rollResult.data.message);
            btn.disabled = false;
            return;
        }

        let targetIndex = rollResult.data.clientIndex;
        let baseRotations = 5 * 360; 
        let stopAngle = baseRotations + (360 - (targetIndex * sliceDeg));

        wheel.style.transform = `rotate(${stopAngle}deg)`;

        setTimeout(() => {
            adOverlay.style.display = "flex";

            setTimeout(async () => {
                let creditCall = await fetch(BACKEND_GATEWAY, {
                    method: 'POST',
                    body: JSON.stringify({
                        action: "creditGameReward",
                        payload: {
                            mobileNumber: userSession.mobileNumber,
                            rewardId: rollResult.data.rewardId,
                            cashAmount: rollResult.data.cashAmount
                        }
                    })
                });
                let finalCredit = await creditCall.json();

                adOverlay.style.display = "none";
                alert(`💰 Matrix Success! ₹${rollResult.data.cashAmount} added to your core wallet.`);
                
                userSession.walletBalance = finalCredit.data.currentWallet;
                localStorage.setItem("game_user", JSON.stringify(userSession));
                walletDisplay.innerText = `💰 ₹${finalCredit.data.currentWallet}`;
                
                wheel.style.transform = "rotate(0deg)";
                btn.disabled = false;
                
            }, 6000); 

        }, 4100); 
    });
}
