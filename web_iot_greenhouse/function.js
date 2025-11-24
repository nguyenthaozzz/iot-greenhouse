document.addEventListener("DOMContentLoaded", () => {  // Đảm bảo HTML load xong mới chạy JS

    // ==================== SPA PAGE SWITCH ====================
    window.showPage = function(pageId){
        document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
        document.getElementById(pageId).classList.add("active");
    };

    // ==================== BIND FUNCTION (CHUNG CHO 3 THIẾT BỊ) ====================
    function bindToggle(set){

        const {
            homeDot, homeText, homeBtn,
            spaDot, spaText, spaBtn,
            lightImageId = null,
            fanVideoId = null,
            fanImageId = null,
            pumpImageId = null,
            pumpImageId2 = null
        } = set;

        // HOME
        const hDot = document.getElementById(homeDot);
        const hTxt = document.getElementById(homeText);
        const hBtn = document.getElementById(homeBtn);

        // SPA
        const sDot = document.getElementById(spaDot);
        const sTxt = document.getElementById(spaText);
        const sBtn = document.getElementById(spaBtn);

        // SPECIAL EFFECTS
        const lightImage = lightImageId ? document.getElementById(lightImageId) : null;

        const fanVideo = fanVideoId ? document.getElementById(fanVideoId) : null;

        const fanImage = fanImageId ? document.getElementById(fanImageId) : null;

        const pumpImage = pumpImageId ? document.getElementById(pumpImageId) : null;
        const pumpImage2 = pumpImageId2 ? document.getElementById(pumpImageId2) : null;

        // ================= UPDATE UI =================
        function updateUI(state){

            // Update HOME
            hTxt.textContent = state;
            hDot.className = `dot ${state === "ON" ? "online" : "offline"}`;

            // Update SPA
            sTxt.textContent = state;
            sDot.className = `dot ${state === "ON" ? "online" : "offline"}`;

            // -------- LIGHT EFFECT (đổi ảnh) --------
            if(lightImage)
                lightImage.src = state === "ON" ? "./image/light_on.png"
                                               : "./image/light_off.png";


            // -------- FAN EFFECT (video quạt) --------
           if (fanVideo && fanImage) {
                if (state === "ON") {
                    fanImage.hidden = true;        // Ẩn ảnh OFF
                    fanVideo.hidden = false;     // Hiện video ON
                } else {
                    fanVideo.hidden = true;      // Ẩn video
                    fanImage.hidden = false;       // Hiện ảnh OFF
    }
}
            // -------- PUMP EFFECT (đổi ảnh) --------
            if(pumpImage){
                pumpImage.src = state === "ON" ? "./image/van_on.png"
                                               : "./image/van_off.png";
                pumpImage2.src = state === "ON" ? "./image/van_on.png"
                                               : "./image/van_off.png";
                   
            }
        }

        // ================= TOGGLE =================
        function toggle(isHome){
            const currentState = isHome ? hTxt.textContent : sTxt.textContent;
            const newState = currentState === "OFF" ? "ON" : "OFF";
            updateUI(newState);
        }

        // Click HOME
        hBtn.addEventListener("click", () => toggle(true));

        // Click SPA
        sBtn.addEventListener("click", () => toggle(false));
    }

    // ==================== BIND DEVICES ====================

    // -------- PUMP --------
    bindToggle({
        homeDot: "soil-dot-home",
        homeText: "soil-text-home",
        homeBtn: "pump-home",

        spaDot: "soil-dot-spa",
        spaText: "soil-text-spa",
        spaBtn: "pump-spa",

        pumpImageId:  "pump-img-id",
        pumpImageId2: "pump-img-id2"
    });

    // -------- FAN --------
    bindToggle({
        homeDot:"temp-dot-home",
        homeText:"temp-text-home",
        homeBtn:"fan-home",

        spaDot:"temp-dot-spa",
        spaText:"temp-text-spa",
        spaBtn:"fan-spa",

        fanVideoId:"fan-video-id",
        fanImageId:"fan-img-id"
    });

    // -------- LIGHT --------
    bindToggle({
        homeDot:"light-dot-home",
        homeText:"light-text-home",
        homeBtn:"light-home",

        spaDot:"light-dot-spa",
        spaText:"light-text-spa",
        spaBtn:"light-spa",

        lightImageId:"light-img-id",
    });

    // FOOTER YEAR
    document.getElementById("year").textContent = new Date().getFullYear();
});
