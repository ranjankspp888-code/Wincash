// GitHub Path: modules/login.js
// Professional App Entry Layout - Smooth Upward Motion Transition (No Blink)

const BACKEND_GATEWAY = "https://script.google.com/macros/s/AKfycbxMyKNAmfTUdW9yKCKggFn_T7WAuXSuqtCEYzq06A-h-mkKe4NV4ue6ioDaOpSW0H8cSw/exec"; 

export function drawGamingUI() {
    return `
        <style>
            /* Smooth Clean App Background */
            .app-main-body {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: #f1f5f9; /* Trusted light grey-blue color */
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                overflow: hidden;
            }

            /* Main Structural Container */
            .container-box {
                width: 100%;
                max-width: 360px;
                padding: 20px;
                display: flex;
                flex-direction: column;
                align-items: center;
                position: relative;
            }

            /* 1. App Logo & Brand Branding Area */
            .app-branding-section {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                margin-bottom: 24px;
                transform: translateY(110px); /* Shuru me theek center me rahega */
                transition: transform 0.7s cubic-bezier(0.25, 1, 0.5, 1); /* Slide hone ka smoother time */
                z-index: 5;
            }
            .modern-logo-box {
                width: 76px;
                height: 76px;
                background: linear-gradient(135deg, #ffd700 0%, #b8860b 100%);
                border-radius: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 10px 20px rgba(218, 165, 32, 0.25);
                font-size: 36px;
            }
            .intro-title {
                font-size: 30px;
                font-weight: 800;
                color: #1e293b; /* Dark text for light background trusted look */
                margin-top: 14px;
                letter-spacing: 0.5px;
            }
            .intro-title span {
                color: #b8860b; /* Gold Wincash touch */
            }
            .intro-tagline {
                font-size: 13px;
                color: #64748b; 
                font-weight: 500;
                margin-top: 4px;
                transition: opacity 0.4s ease;
            }

            /* 2. Login Card (Niche se slide hokar aayega) */
            .login-card {
                background: #ffffff;
                border-radius: 16px;
                padding: 32px 24px;
                width: 100%;
                border: 1px solid #e2e8f0;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.04);
                transform: translateY(40px); /* Niche baitha rahega hidden state me */
                opacity: 0;
                visibility: hidden;
                transition: transform 0.7s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.6s ease, visibility 0.6s;
                z-index: 2;
            }
            .login-heading {
                font-size: 22px;
                font-weight: 700;
                color: #0f172a;
                margin-bottom: 24px;
                text-align: left;
            }

            /* Core Logic Transitions - Triggers when JS updates the class */
            .branding-slide-up {
                transform: translateY(0px) scale(0.9); /* 2 second baad automatic upar chala jayega */
            }
            .tagline-fade-out {
                opacity: 0; /* Tagline dheere se hat jayegi space clean karne ke liye */
            }
            .login-slide-up {
                transform: translateY(0px); /* Card smoothly upar aayega */
                opacity: 1;
                visibility: visible;
            }

            /* Form Elements styling */
            .input-group { margin-bottom: 18px; }
            .input-group label { display: block; font-size: 12px; font-weight: 600; color: #475569; margin-bottom: 6px; }
            .modern-input {
                width: 100%;
                background: #f8fafc;
                border: 1px solid #cbd5e1;
                border-radius: 10px;
                padding: 12px 14px;
                color: #1e293b;
                font-size: 15px;
                outline: none;
                transition: all 0.2s ease;
            }
            .modern-input:focus { border-color: #2563eb; background: #ffffff; box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12); }
            
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
                box-shadow: 0 4px 12px rgba(29, 78, 216, 0.15);
            }
            .submit-btn:disabled { background: #94a3b8; box-shadow: none; cursor: not-allowed; }
            .btn-spinner { display: none; width: 18px; height: 18px; border: 2px solid rgba(255, 255, 255, 0.3); border-radius: 50%; border-top-color: #ffffff; animation: spin 0.8s linear infinite; }
            @keyframes spin { to { transform: rotate(360deg); } }
            .error-box { color: #dc2626; margin-top: 14px; font-size: 13px; font-weight: 500; text-align: center; min-height: 20px; }
        </style>

        <div class="app-main-body">
            <div class="container-box">
                
                <div id="brand-layer" class="app-branding-section">
                    <div class="modern-logo-box">🎮</div> 
                    <h1 class="intro-title"><span>Win</span>cash</h1>
                    <p id="tagline-layer" class="intro-tagline">Spin the wheel, change your fortune ⚡</p>
                </div>

                <div id="login-layer" class="login-card">
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
    const brandLayer = document.getElementById('brand-layer');
    const taglineLayer = document.getElementById('tagline-layer');
    const loginLayer = document.getElementById('login-layer');
    
    const btn = document.getElementById('auth-submit-btn');
    const loader = document.getElementById('btn-loader');
    const btnText = document.getElementById('btn-text');
    const errorDiv = document.getElementById('login-error');

    // 2.0 Second ke baad ek dum smooth structural slide shift active karna
    setTimeout(() => {
        if (brandLayer) brandLayer.classList.add('branding-slide-up');
        if (taglineLayer) taglineLayer.classList.add('tagline-fade-out');
        if (loginLayer) loginLayer.classList.add('login-slide-up');
    }, 2000);

    btn.addEventListener('click', async () => {
        const mobile = document.getElementById('login-mobile').value;
        const pass = document.getElementById('login-pass').value;

        if (!mobile || !pass) {
            errorDiv.innerText = "⚠️ Please fill all fields.";
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
