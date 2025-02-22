// Host this on grindx.xyz/watermark.js
(function(){
    const sites = new Map();
    // You can control which sites are authorized directly from this file
    sites.set('virtualrez.com', false); // false = show watermark, true = hide watermark
    
    function injectWatermark() {
        const style = document.createElement('style');
        style.textContent = `
            .grindx-watermark {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) rotate(-45deg);
                font-size: 8vw;
                color: rgba(255, 255, 255, 0.15);
                pointer-events: none;
                z-index: 999999999;
                font-family: sans-serif;
                font-weight: bold;
                white-space: nowrap;
                user-select: none;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
                animation: grindxFade 1s ease-in-out;
            }
            @keyframes grindxFade {
                from { opacity: 0; }
                to { opacity: 0.15; }
            }
        `;
        document.head.appendChild(style);
        
        const watermark = document.createElement('div');
        watermark.className = 'grindx-watermark';
        watermark.innerHTML = 'grindx.xyz';
        document.body.appendChild(watermark);
        
        // Make it harder to remove via devtools
        setInterval(() => {
            if (!document.querySelector('.grindx-watermark')) {
                document.body.appendChild(watermark.cloneNode(true));
            }
        }, 500);
    }

    const hostname = window.location.hostname.replace('www.', '');
    if (!sites.get(hostname)) {
        injectWatermark();
    }
})(); 
