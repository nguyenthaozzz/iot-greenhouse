document.getElementById("Bumpbt").addEventListener("click", () => {
    let dot = document.getElementById("soil-dot");
    let txt = document.getElementById("soil-text");
    let btn = document.getElementById("Bumpbt");

    if (txt.textContent === "OFF") {
        txt.textContent = "ON";
        dot.classList.replace("offline", "online");
        btn.textContent = "Tắt máy bơm nước";
    } else {
        txt.textContent = "OFF";
        dot.classList.replace("online", "offline");
        btn.textContent = "Mở máy bơm nước";
    }
});
document.getElementById("fanbt").addEventListener("click", () => {
    let dot = document.getElementById("temp-dot");
    let txt = document.getElementById("temp-text");
    let btn = document.getElementById("fanbt");
    if (txt.textContent === "OFF") {
        txt.textContent = "ON";
        dot.classList.replace("offline", "online");
        btn.textContent = "Tắt quạt";
    } else {
        txt.textContent = "OFF";
        dot.classList.replace("online", "offline");
        btn.textContent = "Mở quạt";
    }
});
document.getElementById("led").addEventListener("click", () => {
    let dot = document.getElementById("light-dot");
    let txt = document.getElementById("light-text");
    let btn = document.getElementById("led");
    if (txt.textContent === "OFF") {
        txt.textContent = "ON";
        dot.classList.replace("offline", "online");
        btn.textContent = "Tắt đèn";
    } else {
        txt.textContent = "OFF";
        dot.classList.replace("online", "offline");
        btn.textContent = "Mở đèn";
    }
});
