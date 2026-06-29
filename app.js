// GitHub Root Path: app.js
// Yeh router hamesha bina chhede naye modules ko load karta rahega

const appRouter = {
    // Dynamic Application Matrix Map
    gameRoutes: {
        '#login': 'modules/login.js',
        '#spin': 'modules/spin_game.js'
        // Future me koi bhi naya game/option aayega toh sirf yahan ek line judegi
    },

    async bootUpArena() {
        // App open hote hi sabse pehle Login check hoga
        const currentHash = window.location.hash || '#login';
        const targetModule = this.gameRoutes[currentHash];
        
        if (targetModule) {
            try {
                // Quantum Chunk Loader Tech: Purane code ko bina chhede file load karna
                const activeModule = await import(`./${targetModule}`);
                const arenaElement = document.getElementById('game-arena');
                
                // Screen flush karke naya gaming view mount karna
                arenaElement.innerHTML = activeModule.drawGamingUI();
                activeModule.bindGameLogic();
            } catch (error) {
                console.error("Module Sync Fail: ", error);
                document.getElementById('game-arena').innerHTML = "<h2>🎮 Core Link Sync Failure!</h2>";
            }
        }
    }
};

// Event Listeners jo user ke click par automatic page badal dete hain
window.addEventListener('hashchange', () => appRouter.bootUpArena());
window.addEventListener('DOMContentLoaded', () => appRouter.bootUpArena());
