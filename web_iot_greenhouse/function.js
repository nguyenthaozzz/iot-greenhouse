document.addEventListener("DOMContentLoaded", () => {
    // ======== SPA PAGE SWITCH =========
    window.showPage = function (pageId) {
        document.querySelectorAll(".page").forEach(p => {
            p.classList.remove("active");
        });
        document.getElementById(pageId).classList.add("active");
    };
    // ======== SOIL PUMP =========
    const pumpBtn = document.getElementById("Bumpbt");
    if (pumpBtn) {
        pumpBtn.addEventListener("click", () => {
            const dot = document.getElementById("soil-dot");
            const txt = document.getElementById("soil-text");

            if (txt.textContent === "OFF") {
                txt.textContent = "ON";
                dot.classList.replace("offline", "online");
                pumpBtn.textContent = "Tắt máy bơm nước";
            } else {
                txt.textContent = "OFF";
                dot.classList.replace("online", "offline");
                pumpBtn.textContent = "Mở máy bơm nước";
            }
        });
    }
    // ======== FAN =========
    const fanBtn = document.getElementById("fanbt");
    const fanVideo = document.getElementById("fan-video");

    if (fanBtn) {
        fanBtn.addEventListener("click", () => {
            const dot = document.getElementById("temp-dot");
            const txt = document.getElementById("temp-text");

            if (txt.textContent === "OFF") {
                txt.textContent = "ON";
                dot.classList.replace("offline", "online");
                fanBtn.textContent = "Tắt quạt";

                fanVideo.hidden = false;  // bật video
            } else {
                txt.textContent = "OFF";
                dot.classList.replace("online", "offline");
                fanBtn.textContent = "Mở quạt";

                fanVideo.hidden = true;   // tắt video
            }
        });
    }
    // ======== LIGHT =========
    const ledBtn = document.getElementById("led");
    if (ledBtn) {
        ledBtn.addEventListener("click", () => {
            const dot = document.getElementById("light-dot");
            const txt = document.getElementById("light-text");
            const glow = document.getElementById("light-glow");

            if (txt.textContent === "OFF") {
                txt.textContent = "ON";
                dot.classList.replace("offline", "online");
                ledBtn.textContent = "Tắt đèn";
                glow.classList.replace("hide", "show");
            } else {
                txt.textContent = "OFF";
                dot.classList.replace("online", "offline");
                ledBtn.textContent = "Mở Đèn";
                glow.classList.replace("show", "hide");

            }
        });
    }
    // YEAR FOOTER
    document.getElementById("year").textContent = new Date().getFullYear();
});
