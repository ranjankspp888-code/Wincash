// GitHub Path: modules/spin_game.js
// High-End Premium Zupee Style Game Interface 

const BACKEND_GATEWAY = "https://script.google.com/macros/s/AKfycbxMyKNAmfTUdW9yKCKggFn_T7WAuXSuqtCEYzq06A-h-mkKe4NV4ue6ioDaOpSW0H8cSw/exec"; 

export function drawGamingUI() {
    const userSession = JSON.parse(localStorage.getItem("game_user")) || { mobileNumber: "Guest", walletBalance: 0 };
    
    return `
        <style>
            /* Fixed Global Background - Zupee Deep Royal Space Theme */
            .game-screen-container {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: linear-gradient(180deg, #1e1b4b 0%, #0f172a 100%); /* Deep Royal Purple/Navy */
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: flex-start;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                overflow-y: auto;
                padding-bottom: 90px;
            }

            .game-wrapper {
                width: 100%;
                max-width: 380px;
                padding: 16px;
                display: flex;
                flex-direction: column;
                align-items: center;
            }

            /* Premium Zupee User Header Bar */
            .zupee-header {
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: rgba(255, 255, 255, 0.08);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 14px;
                padding: 12px 16px;
                margin-bottom: 24px;
                backdrop-filter: blur(10px);
            }
            .user-info {
                color: #e2e8f0;
                font-size: 14px;
                font-weight: 600;
                display: flex;
                align-items: center;
                gap: 6px;
            }
            .wallet-badge {
                background: linear-gradient(135deg, #eab308 0%, #ca8a04 100%); /* Shiny Gold */
                color: #0f172a;
                padding: 6px 14px;
                border-radius: 20px;
                font-size: 14px;
                font-weight: 700;
                display: flex;
                align-items: center;
                gap: 6px;
                box-shadow: 0 4px 10px rgba(234, 179, 8, 0.25);
            }

            /* Title Branding styling */
            .game-main-title {
                color: #ffffff;
                font-size: 24px;
                font-weight: 800;
                text-align: center;
                margin-bottom: 6px;
                letter-spacing: 0.5px;
            }
            .game-subtitle {
                color: #94a3b8;
                font-size: 13px;
                margin-bottom: 30px;
                text-align: center;
            }

            /* Zupee Style Wheel Arena Frame */
            .wheel-outer-ring {
                position: relative;
                width: 300px;
                height: 300px;
                margin: 10px auto 30px auto;
                background: #ffffff; /* Smooth White Outercrust */
                border-radius: 50%;
                padding: 12px;
                box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4), 0 0 0 6px rgba(255, 255, 255, 0.05);
            }
            
            /* Premium Top Center Pointer Arrow */
            .zupee-pointer {
                position: absolute;
                top: -8px;
                left: calc(50% - 16px);
                z-index: 20;
                width: 32px;
                height: 32px;
                background: #ef4444; /* Sharp Crimson Red Pointer */
                clip-path: polygon(50% 100%, 0 0, 100% 0);
                filter: drop-shadow(0 4px 6px rgba(0,0,0,0.2));
            }

            /* Internal Canvas Engine */
            .wheel-frame {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                overflow: hidden;
                position: relative;
                background: #f8fafc;
                transition: transform 4s cubic-bezier(0.1, 0.8, 0.3, 1);
                border: 2px solid #e2e8f0;
            }

            /* Center Metallic Hub Cap Button */
            .wheel-center-cap {
                position: absolute;
                top: calc(50% - 24px);
                left: calc(50% - 24px);
                width: 48px;
                height: 48px;
                background: linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%);
                border: 4px solid #1e1b4b;
                border-radius: 50%;
                z-index: 15;
                box-shadow: 0 4px 8px rgba(0,0,0,0.15);
            }

            /* Dynamic Slice Partitions styling */
            .wheel-slice-item {
                position: absolute;
                width: 100%;
                height: 100%;
                text-align: center;
                padding-top: 32px;
                font-size: 16px;
                font-weight: 700;
                font-family: system-ui, sans-serif;
            }

            /* High-Conversion Zupee CTA Spin Button */
            .spin-trigger-btn {
                background: linear-gradient(180deg, #facc15 0%, #eab308 100%); /* Bright Gold Button */
                border: none;
                color: #0f172a;
                padding: 16px;
                font-size: 18px;
                font-weight: 700;
                border-radius: 14px;
                cursor: pointer;
                width: 100%;
                letter-spacing: 0.5px;
                box-shadow: 0 6px 20px rgba(234, 179, 8, 0.3);
                transition: all 0.2s ease;
                border-bottom: 4px solid #ca8a04; /* Real App Thick Click Style */
            }
            .spin-trigger-btn:hover {
                transform: translateY(-1px);
                box-shadow: 0 8px 24px rgba(234, 179, 8, 0.4);
            }
            .spin-trigger-btn:active {
                transform: translateY(2px);
                border-bottom-width: 0px;
            }
            .spin-trigger-btn:disabled {
                background: #475569;
                color: #94a3b8;
                border-bottom: none;
                cursor: not-allowed;
                box-shadow: none;
            }

            /* Premium Full Screen Overlay For Video Ads Loading */
            .overlay-ad-loader {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: rgba(15, 23, 42, 0.98);
                z-index: 100;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                color: #ffffff;
            }
            .spinner-icon {
                border: 4px solid rgba(234, 179, 8, 0.1);
                border-left-color: #eab308;
                width: 44px;
                height: 44px;
                border-radius: 50%;
                animation: spinAnim 0.8s linear infinite;
                margin-bottom: 20px;
            }
            @keyframes spinAnim { 100% { transform: rotate(360deg); } }
            
            .ad-title-msg { font-size: 18px; font-weight: 700; color: #ffffff; text-align: center; margin-bottom: 6px;}
            .ad-sub-msg { font-size: 13px; color: #94a3b8; text-align: center;}
        </style>

        <div class="game-screen-container">
            <div class="game-wrapper">
                
                <div class="zupee-header">
                    <div class="user-info">
                        <span>👤</span> ${userSession.mobileNumber}
                    </div>
                    <div class="wallet-badge">
                        <span>🪙</span> <span id="display-wallet">₹${Number(userSession.walletBalance).toFixed(2)}</span>
                    </div>
                </div>

                <h1 class="game-main-title">Wincash Lucky Wheel</h1>
                <p class="game-subtitle">Spin to win instant cash directly into your wallet</p>

                <div class="wheel-outer-ring">
                    <div class="zupee-pointer"></div>
                    <div class="wheel-center-cap"></div>
                    
                    <div id="lucky-wheel-canvas" class="wheel-frame">
                        <div style="color:#94a3b8; text-align:center; padding-top:130px; font-size:13px;">Loading Wheel Slices...</div>
                    </div>
                </div>

                <button id="action-roll-btn" class="spin-trigger-btn">Spin Now</button>
            </div>
        </div>

        <div id="ad-gate-overlay" class="overlay-ad-loader">
            <div class="spinner-icon"></div>
            <div class="ad-title-msg">Loading Reward Video Ad...</div>
            <div class="ad-sub-msg">Your balance will be credited automatically after ad completion</div>
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
        alert("🔒 Session Expired: Please log in again.");
        window.location.hash = "#login";
        return;
    }

    // 1. Fetching config matrix values
    let initFetch = await fetch(BACKEND_GATEWAY, {
        method: 'POST',
        body: JSON.stringify({ action: "getSpinGameConfig", payload: {} })
    });
    let serverSetup = await initFetch.json();
    let slotsData = serverSetup.data.slots;

    // Drawing Clean Professional Alternating Light Slices (Zupee Pattern)
    let sliceDeg = 360 / slotsData.length;
    let fallbackUI = "";
    
    // Smooth Professional Color Palette (Soft Whites and Premium Cream Tones)
    const colors = ["#ffffff", "#f8fafc", "#f1f5f9", "#f8fafc"];
    
    slotsData.forEach((slot, index) => {
        let currentSliceBg = colors[index % colors.length];
        let textFillColor = slot.cash > 0 ? "#15803d" : "#64748b"; // Positive green for cash, slate for 0
        
        fallbackUI += `
            <div class="wheel-slice-item" style="position:absolute; width:100%; height:100%; transform:rotate(${sliceDeg * index}deg); background:${currentSliceBg}; clip-path: transform; border-right: 1px solid #e2e8f0; color:${textFillColor}">
                <div style="transform: rotate(0deg); margin-top: 6px;">₹${slot.cash}</div>
            </div>`;
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
        let baseRotations = 6 * 360; // 6 Clean rounds before stopping
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
                alert(`🎉 Congratulations! ₹${rollResult.data.cashAmount} credited to your wallet.`);
                
                userSession.walletBalance = finalCredit.data.currentWallet;
                localStorage.setItem("game_user", JSON.stringify(userSession));
                walletDisplay.innerText = `₹${Number(finalCredit.data.currentWallet).toFixed(2)}`;
                
                wheel.style.transform = "rotate(0deg)";
                btn.disabled = false;
                
            }, 6000); // Ad run simulation

        }, 4200); // Wheel spin runtime stop
    });
}
