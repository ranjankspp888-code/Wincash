// GitHub Path: modules/login.js
// Professional, Modern & Trusted UI Design

const BACKEND_GATEWAY = "https://script.google.com/macros/s/AKfycbxMyKNAmfTUdW9yKCKggFn_T7WAuXSuqtCEYzq06A-h-mkKe4NV4ue6ioDaOpSW0H8cSw/exec"; 

export function drawGamingUI() {
    return `
        <style>
            /* Modern Professional Layout */
            .auth-card { 
                background: #ffffff; 
                border-radius: 16px; 
                padding: 32px 24px; 
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08); 
                max-width: 360px; 
                width: 100%; 
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                border: 1px solid #e2e8f0;
            }
            .brand-logo {
                width: 60px;
                height: 60px;
                background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
                border-radius: 14px;
                margin: 0 auto 16px auto;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 24px;
                font-weight: bold;
                box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
            }
            .auth-title { 
                color: #0f172a; 
                font-size: 22px; 
                font-weight: 700;
                margin-bottom: 6px;
                text-align: center;
            }
            .auth-subtitle {
                color: #64748b;
                font-size: 13px;
                margin-bottom: 24px;
                text-align: center;
            }
            .input-group { 
                margin-bottom: 18px; 
                text-align: left; 
            }
            .input-group label { 
                display: block; 
                color: #334155; 
                font-size: 12px; 
                font-weight: 600;
                margin-bottom: 6px; 
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
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
            .modern-input:focus { 
                border-color: #3b82f6; 
                background: #ffffff;
                box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15); 
            }
            /* Clean Submit Button */
            .submit-btn { 
                background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); 
                border: none; 
                color: #ffffff; 
                padding: 14px; 
                font-size: 16px; 
                font-weight: 600; 
                border-radius: 10px; 
                cursor: pointer; 
                transition: all 0.2s ease; 
                margin-top: 10px; 
                width: 100%; 
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                box-shadow: 0 4px 12px rgba(29, 78, 216, 0.2);
            }
            .submit-btn:hover { 
                transform: translateY(-1px);
                box-shadow: 0 6px 16px rgba(29, 78, 216, 0.3);
            }
            .submit-btn:disabled {
                background: #94a3b8;
                box-shadow: none;
                cursor: not-allowed;
            }
            /* Smooth Please Wait Loader Spinner */
            .btn-spinner {
                display: none;
                width: 18px;
                height: 18px;
                border: 2px solid rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                border-top-color: #ffffff;
                animation: spin 0.8s linear infinite;
            }
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
            .error-box { 
                color: #dc2626; 
                margin-top: 14px; 
                font-size: 13px; 
                font-weight: 500;
                text-align: center;
                min-height: 20px; 
            }
            .trust-badge {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 6px;
                margin-top: 20px;
                color: #94a3b8;
                font-size: 11px;
                font-weight: 500;
            }
        </style>

        <div class="auth-card">
            <div class="brand-logo">₹</div>
            <h1 class="auth-title">Welcome Back</h1>
            <p class="auth-subtitle">Please enter your details to connect securely</p>
            
            <div class="input-group">
                <label>Mobile Number</label>
                <input type="number" id="login-mobile" class="modern-input" placeholder="Enter 10 digit number" required>
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
            
            <div class="trust-badge">
                <span>🛡️</span> Secure End-to-End Encrypted Link
            </div>
        </div>
    `;
}

export function bindGameLogic() {
    const btn = document.getElementById('auth-submit-btn');
    const loader = document.getElementById('btn-loader');
    const btnText = document.getElementById('btn-text');
    const errorDiv = document.getElementById('login-error');

    btn.addEventListener('click', async () => {
        const mobile = document.getElementById('login-mobile').value;
        const pass = document.getElementById('login-pass').value;

        if (!mobile || !pass) {
            errorDiv.innerText = "⚠️ Please fill all data fields.";
            return;
        }

        // Please Wait Animation Triggering
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
                window.location.hash = "#spin"; // Success par redirect
            } else {
                errorDiv.innerText = result.data.message;
                // Reset Button status if failed
                btn.disabled = false;
                loader.style.display = "none";
                btnText.innerText = "Submit";
            }
        } catch (err) {
            errorDiv.innerText = "📡 Connection timeout. Please try again.";
            btn.disabled = false;
            loader.style.display = "none";
            btnText.innerText = "Submit";
        }
    });
}
