  // ======================= FIREBASE IMPORT =======================
    import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-analytics.js";
    import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";

    // ======================= FIREBASE CONFIG =======================
    const firebaseConfig = {
        apiKey: "AIzaSyC_5zwHVBSGlafgtSerW6DWQ5_MoocACRo",
        authDomain: "iot-green-house-ebeaf.firebaseapp.com",
        databaseURL: "https://iot-green-house-ebeaf-default-rtdb.firebaseio.com",
        projectId: "iot-green-house-ebeaf",
        storageBucket: "iot-green-house-ebeaf.firebasestorage.app",
        messagingSenderId: "472750644936",
        appId: "1:472750644936:web:c402395617eb24e3f7cffd",
        measurementId: "G-VWSXQ37WJG"
    };

    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const database = getDatabase(app);

    // ======================= DOM ELEMENTS =======================
    const nhietDoElement = document.getElementById('temperature');
    const doAmElement = document.getElementById('humidity');
    const soilElement = document.getElementById('soil');
    const lightElement = document.getElementById('light');

    // ======================= FIREBASE REFERENCE =======================
    const tempRef = ref(database, 'Green_house/temp');
    const humRef  = ref(database, 'Green_house/hum');
    const soilRef = ref(database, 'Green_house/soil_hum');
    const lightRef= ref(database, 'Green_house/light');



document.addEventListener("DOMContentLoaded", () => {  // Đảm bảo HTML load xong mới chạy JS

    // ======================= CHART.JS CONFIG =======================
    function createChartConfig(label, color) {
        return {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: label,
                    data: [],
                    borderColor: color,
                    backgroundColor: color.replace(')', ',0.2)').replace('rgb', 'rgba'),
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true,
                    pointRadius: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { title: { display: true, text: "Thời gian" }, grid: { display: false }},
                    y: { beginAtZero: false, grid: { display: false }},
                },
                animation: false
            }
        };
    }

    // ======================= NHIỆT ĐỘ =======================
    const ctxTemp = document.getElementById('temp-chart').getContext('2d');
    const tempChart = new Chart(ctxTemp, createChartConfig('Nhiệt độ (°C)', 'rgb(231, 76, 60)'));

    onValue(tempRef, snapshot => {
        const data = snapshot.val();
        nhietDoElement.innerText = (data ?? "--") + "°C";

        if (data !== null) {
            const t = new Date().toLocaleTimeString();
            tempChart.data.labels.push(t);
            tempChart.data.datasets[0].data.push(data);

            if (tempChart.data.labels.length > 20) {
                tempChart.data.labels.shift();
                tempChart.data.datasets[0].data.shift();
            }
            tempChart.update('none');
        }
    });

    // ======================= HƠI NƯỚC / ĐỘ ẨM =======================
    const ctxHum = document.getElementById('humidity-chart').getContext('2d');
    const humChart = new Chart(ctxHum, createChartConfig('Độ ẩm (%)', 'rgb(54,162,235)'));

    onValue(humRef, snapshot => {
        const data = snapshot.val();
        doAmElement.innerText = (data ?? "--") + "%";

        if (data !== null) {
            const t = new Date().toLocaleTimeString();
            humChart.data.labels.push(t);
            humChart.data.datasets[0].data.push(data);

            if (humChart.data.labels.length > 20) {
                humChart.data.labels.shift();
                humChart.data.datasets[0].data.shift();
            }
            humChart.update('none');
        }
    });

    // ======================= ĐỘ ẨM ĐẤT =======================
    const ctxSoil = document.getElementById('soil-chart').getContext('2d');
    const soilChart = new Chart(ctxSoil, createChartConfig('Độ ẩm đất (%)', 'rgb(0,128,0)'));

    onValue(soilRef, snapshot => {
        const data = snapshot.val();
        soilElement.innerText = (data ?? "--") + "%";

        if (data !== null) {
            const t = new Date().toLocaleTimeString();
            soilChart.data.labels.push(t);
            soilChart.data.datasets[0].data.push(data);

            if (soilChart.data.labels.length > 20) {
                soilChart.data.labels.shift();
                soilChart.data.datasets[0].data.shift();
            }
            soilChart.update('none');
        }
    });

    // ======================= ÁNH SÁNG =======================
    const ctxLight = document.getElementById('light-chart').getContext('2d');
    const lightChart = new Chart(ctxLight, createChartConfig('Ánh sáng (lux)', 'rgb(255,206,86)'));

    onValue(lightRef, snapshot => {
        const data = snapshot.val();
        lightElement.innerText = (data ?? "--") + " lux";

        if (data !== null) {
            const t = new Date().toLocaleTimeString();
            lightChart.data.labels.push(t);
            lightChart.data.datasets[0].data.push(data);

            if (lightChart.data.labels.length > 20) {
                lightChart.data.labels.shift();
                lightChart.data.datasets[0].data.shift();
            }
            lightChart.update('none');
        }
    });


    
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


