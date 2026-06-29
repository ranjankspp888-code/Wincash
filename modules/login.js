// GitHub Path: modules/login.js
// Seamless Transition UI - No Blinking, Pure Cinematic Fade Effect

const BACKEND_GATEWAY = "https://script.google.com/macros/s/AKfycbxMyKNAmfTUdW9yKCKggFn_T7WAuXSuqtCEYzq06A-h-mkKe4NV4ue6ioDaOpSW0H8cSw/exec"; 

export function drawGamingUI() {
    return `
        <style>
            /* Fixed Global Background - No flashes between states */
            .auth-screen-container {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: #f1f5f9; /* Professional Light Background */
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                overflow: hidden;
            }

            .auth-wrapper {
                position: relative;
                width: 100%;
                max-width: 360px;
                padding: 20px;
            }

            /* 1. Cinematic Intro Overlay (No Blink Setup) */
            .intro-screen {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #0d0e15; /* Elegant Dark Intro Layer */
                border-radius: 16px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                z-index: 10; /* Login ke upar baithega */
                transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                padding: 36px 24px;
            }
            
            .modern-logo-box {
                width: 80px;
                height: 80px;
                background: linear-gradient(135deg, #ffd700 0%, #b8860b 100%);
                border-radius: 22px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 24px;
                box-shadow: 0 10px 25px rgba(255, 215, 0, 0.3);
                font-size: 36px;
                animation: pulse 1.5s infinite alternate;
            }
            
            .intro-title {
                font-size: 32px;
                font-weight: 800;
                color: #ffffff; 
                margin-bottom: 10px;
                letter-spacing: 1px;
            }
            .intro-title span {
                color: #ffd700; 
            }
            .intro-tagline {
                font-size: 14px;
                color: #94a3b8; 
                font-weight: 500;
                letter-spacing: 0.5px;
            }

            /* 2. Login Form Card (Pre-rendered underneath) */
            .login-card {
                background: #ffffff;
                border-radius: 16px;
                padding: 36px 24px;
                width: 100%;
                border: 1px solid #e2e8f0;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
                z-index: 1; /* Niche pehle se ready hai */
            }

            .login-heading {
                font-size: 24px;
                font-weight: 700;
                color: #0f172a;
                margin-bottom: 28px;
                text-align: left;
                letter-spacing: -0.5px;
            }
            .input-group {
                margin-bottom: 20px;
            }
            .input-group label {
                display: block;
                font-size: 12px;
                font-weight: 600;
                color: #475569;
                margin-bottom: 8px;
            }
            .modern-input {
                width: 100%;
                background: #ffffff;
                border: 1px solid #cbd5e1;
                border-radius: 10px;
                padding: 12px 14px;
                color: #1e293b;
                font-size: 15px;
                outline: none;
                transition: all 0.2s ease;
            }
            .modern-input:focus {
                border-color: #2563eb;
                box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
            }

            /* Button Setup */
            .submit-btn {
                background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
                border: none;
                color: #ffffff;
                padding: 14px;
                font-size: 16px;
                font-weight: 600;
                border-radius: 10px;
                cursor: pointer;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                transition: all 0.2s ease;
                box-shadow: 0 4px 12px rgba(29, 78, 216, 0.15);
            }
            .submit-btn:disabled {
                background: #94a3b8;
                box-shadow: none;
                cursor: not-allowed;
            }

            .btn-spinner {
                display: none;
                width: 18px;
                height: 18px;
                border: 2px solid rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                border-top-color: #ffffff;
                animation: spin 0.8s linear infinite;
            }

            /* Smooth Hide Class Triggered by JS */
            .intro-hidden {
                opacity: 0 !important;
                transform: scale(0.95) translateY(-10px); /* Halki flight upar ki taraf bina jhatke ke */
                pointer-events: none;
            }

            @keyframes spin { to { transform: rotate(360deg); } }
            @keyframes pulse { 0% { transform: scale(1); } 100% { transform: scale(1.05); } }

            .error-box {
                color: #dc2626;
                margin-top: 14px;
                font-size: 13px;
                font-weight: 500;
                text-align: center;
                min-height: 20px;
            }
        </style>

        <div class="auth-screen-container">
            <div class="auth-wrapper">
                
                <!-- Intro Layer: Baad me bas ye smooth fadeout hoga -->
                <div id="intro-arena" class="intro-screen">
                    <div class="modern-logo-box">🎮</div> 
                    <h1 class="intro-title"><span>Win</span>cash</h1>
                    <p class="intro-tagline">Spin the wheel, change your fortune ⚡</p>
                </div>

                <!-- Login Layer: Jo peeche hi baitha hai bina blink kiye -->
                <div class="login-card">
                    <h2 class="login-heading">Login</h2>
                    
                    <div class="input-group">
                        <label>User ID / Mobile Number</label>
                        <input type="number" id="login-mobile" class="modern-input" placeholder="Enter your registered number" required>
                    </div>

                    <div class="input-group">
                        <label>Password</label>
                        <input type="password" id="login-pass" class="modern-input" placeholder="Enter your password" required>
                    </div>

                    <button id="auth-submit-btn" class="submit-btn">
                        <div id="btn-loader" class="btn-spinner"></div>
                        <span id="btn-text">Submit</span>
                    </button>
                    
                    <div id="login-error" class="error-box"></div>
                </div>

            </div>
        </div>
    `;
}

export function bindGameLogic() {
    const introArena = document.getElementById('intro-arena');
    const btn = document.getElementById('auth-submit-btn');
    const loader = document.getElementById('btn-loader');
    const btnText = document.getElementById('btn-text');
    const errorDiv = document.getElementById('login-error');

    // 2.2 Second baad bina blink kiye ek dum smooth dissolve (fade out) effect
    setTimeout(() => {
        if (introArena) {
            introArena.classList.add('intro-hidden');
            // Animation poori hone ke baad remove karna taaki HTML clean rahe
            setTimeout(() => introArena.remove(), 600);
        }
    }, 2200);

    btn.addEventListener('click', async () => {
        const mobile = document.getElementById('login-mobile').value;
        const pass = document.getElementById('login-pass').value;

        if (!mobile || !pass) {
            errorDiv.innerText = "⚠️ Please fill all parameters.";
            return;
        }

        btn.disabled = true;
        loader.style.display = "block";
        btnText.innerText = "Please Wait...";
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
                loader.style.display = "none";
                btnText.innerText = "Submit";
            }
        } catch (err) {
            errorDiv.innerText = "📡 Link failed. Please check network.";
            btn.disabled = false;
            loader.style.display = "none";
            btnText.innerText = "Submit";
        }
    });
}
