// GitHub Path: modules/login.js
// Modern Trusted UI with Professional Light Background For Login Card

const BACKEND_GATEWAY = "https://script.google.com/macros/s/AKfycbxMyKNAmfTUdW9yKCKggFn_T7WAuXSuqtCEYzq06A-h-mkKe4NV4ue6ioDaOpSW0H8cSw/exec"; 

export function drawGamingUI() {
    return `
        <style>
            /* Global Layout Config */
            .auth-wrapper {
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                width: 100%;
                max-width: 360px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            /* 1. 2-Second Intro Splash Screen */
            .intro-screen {
                text-align: center;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                animation: fadeOut 0.5s ease 2s forwards;
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
                text-shadow: 0 2px 10px rgba(255, 255, 255, 0.1);
            }
            .intro-title span {
                color: #ffd700; 
                text-shadow: 0 0 15px rgba(255, 215, 0, 0.4);
            }
            .intro-tagline {
                font-size: 14px;
                color: #94a3b8; 
                font-weight: 500;
                letter-spacing: 0.5px;
            }

            /* 2. Modern Minimalist Login Form Design with New Background Change Override */
            .login-card {
                display: none;
                background: #ffffff;
                border-radius: 16px;
                padding: 36px 24px;
                width: 100%;
                border: 1px solid #e2e8f0;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06); /* Card shadow */
                opacity: 0;
                animation: fadeIn 0.4s ease 2.4s forwards;
            }

            /* MAGIC TRICK: Login card aate hi pure screen ka background change karne ke liye */
            .login-card-active-bg {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: #f1f5f9 !important; /* Pure background ka naya clean rang */
                z-index: -1;
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
                background: #ffffff; /* Input background light theme ke hisab se safe white */
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

            /* Professional Submit Button */
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

            /* Please Wait Spinner */
            .btn-spinner {
                display: none;
                width: 18px;
                height: 18px;
                border: 2px solid rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                border-top-color: #ffffff;
                animation: spin 0.8s linear infinite;
            }

            /* Animations Engine */
            @keyframes fadeOut {
                to { opacity: 0; display: none; visibility: hidden; height: 0; padding: 0; margin: 0; }
            }
            @keyframes fadeIn {
                to { opacity: 1; display: block; }
            }
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
            @keyframes pulse {
                0% { transform: scale(1); }
                100% { transform: scale(1.05); }
            }

            .error-box {
                color: #dc2626;
                margin-top: 14px;
                font-size: 13px;
                font-weight: 500;
                text-align: center;
                min-height: 20px;
            }
        </style>

        <div class="auth-wrapper">
            <!-- 1. Intro Screen Content -->
            <div id="intro-arena" class="intro-screen">
                <div class="modern-logo-box">🎮</div> 
                <h1 class="intro-title"><span>Win</span>cash</h1>
                <p class="intro-tagline">Spin the wheel, change your fortune ⚡</p>
            </div>

            <!-- 2. Clean Minimal Login Form -->
            <div id="login-arena" class="login-card">
                <!-- Background Changer Element -->
                <div class="login-card-active-bg"></div>

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
    `;
}

export function bindGameLogic() {
    const introArena = document.getElementById('intro-arena');
    const loginArena = document.getElementById('login-arena');
    const btn = document.getElementById('auth-submit-btn');
    const loader = document.getElementById('btn-loader');
    const btnText = document.getElementById('btn-text');
    const errorDiv = document.getElementById('login-error');

    setTimeout(() => {
        if(introArena) introArena.style.display = 'none';
        if(loginArena) loginArena.style.display = 'block';
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
