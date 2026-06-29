// GitHub Path: modules/login.js
// Live Backend Gateway URL Embedded Successfully

const BACKEND_GATEWAY = "https://script.google.com/macros/s/AKfycbxMyKNAmfTUdW9yKCKggFn_T7WAuXSuqtCEYzq06A-h-mkKe4NV4ue6ioDaOpSW0H8cSw/exec"; 

export function drawGamingUI() {
    return `
        <style>
            .login-box { text-align: center; background: #151728; border: 3px solid #ff007f; border-radius: 20px; padding: 40px; box-shadow: 0 0 25px #ff007f; max-width: 380px; width:100%; font-family: monospace; }
            .login-title { color: #fff; font-size: 26px; text-shadow: 0 0 10px #00ffcc; margin-bottom: 30px; letter-spacing: 3px;}
            .input-group { margin-bottom: 20px; text-align: left; }
            .input-group label { display: block; color: #00ffcc; font-size: 12px; margin-bottom: 5px; letter-spacing: 1px; }
            .game-input { width: 100%; background: #0d0e15; border: 2px solid #ff007f; border-radius: 8px; padding: 12px; color: #fff; font-family: monospace; font-size: 16px; outline: none; transition: 0.3s; }
            .game-input:focus { border-color: #00ffcc; box-shadow: 0 0 10px #00ffcc; }
            .login-btn { background: #00ffcc; border: none; color: #000; padding: 15px; font-size: 18px; font-weight: bold; border-radius: 8px; cursor: pointer; box-shadow: 0 0 15px #00ffcc; transition: 0.3s; margin-top: 15px; width: 100%; letter-spacing: 2px; font-family: monospace;}
            .login-btn:hover { background: #ff007f; color: #fff; box-shadow: 0 0 20px #ff007f; }
            .error-msg { color: #ff3333; margin-top: 15px; font-size: 14px; min-height: 20px; text-shadow: 0 0 5px #ff3333; }
        </style>

        <div class="login-box">
            <h1 class="login-title">🎮 WIN CASH AUTH </h1>
            
            <div class="input-group">
                <label>ENTER MOBILE NUMBER</label>
                <input type="number" id="login-mobile" class="game-input" placeholder="887390XXXX" required>
            </div>

            <div class="input-group">
                <label>ENTER PASSWORD</label>
                <input type="password" id="login-pass" class="game-input" placeholder="******" required>
            </div>

            <button id="auth-submit-btn" class="login-btn">CONNECT MATRIX</button>
            <div id="login-error" class="error-msg"></div>
        </div>
    `;
}

export function bindGameLogic() {
    const btn = document.getElementById('auth-submit-btn');
    const errorDiv = document.getElementById('login-error');

    btn.addEventListener('click', async () => {
        const mobile = document.getElementById('login-mobile').value;
        const pass = document.getElementById('login-pass').value;

        if (!mobile || !pass) {
            errorDiv.innerText = "⚡ Fill all security parameters!";
            return;
        }

        btn.disabled = true;
        btn.innerText = "AUTHENTICATING...";
        errorDiv.innerText = "";

        try {
            let response = await fetch(BACKEND_GATEWAY, {
                method: 'POST',
                body: JSON.stringify({
                    action: "processUserLogin",
                    payload: { mobileNumber: mobile, password: pass }
                })
            });

            let result = await response.json();

            if (result.data.success) {
                localStorage.setItem("game_user", JSON.stringify(result.data.userData));
                window.location.hash = "#spin";
            } else {
                errorDiv.innerText = result.data.message;
                btn.disabled = false;
                btn.innerText = "CONNECT MATRIX";
            }
        } catch (err) {
            errorDiv.innerText = "📡 Network Sync Failed. Try again.";
            btn.disabled = false;
            btn.innerText = "CONNECT MATRIX";
        }
    });
}
