  // ======================= FIREBASE IMPORT =======================
    import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-analytics.js";
    import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";

    // ======================= FIREBASE CONFIG =======================
    const firebaseConfig = {
        apiKey: "AIzaSyBr7tBAHwXaGBL0ceLK9c1UDSdYRq_cuZs",
        authDomain: "project-greenhouse-5970e.firebaseapp.com",
        databaseURL: "https://project-greenhouse-5970e-default-rtdb.firebaseio.com",
        projectId: "project-greenhouse-5970e",
        storageBucket: "project-greenhouse-5970e.firebasestorage.app",
        messagingSenderId: "476065711518",
        appId: "1:476065711518:web:fb1e3df380f3b24cfac28f",
        measurementId: "G-4YTZQB881G"
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

   // ================================================================
        // PHẦN 2: CẤU HÌNH BIỂU ĐỒ (CHART.JS)
        // ================================================================
        // Hàm tạo cấu hình biểu đồ nhanh để đỡ phải viết lại nhiều lần
        function createChartConfig(label, color) {
            return {
                type: 'line',
                data: {
                    labels: [], // Thời gian
                    datasets: [{
                        label: label,
                        data: [], // Giá trị
                        borderColor: color,
                        backgroundColor: color.replace(')', ', 0.2)').replace('rgb', 'rgba'), // Tạo màu nền mờ
                        borderWidth: 2,
                        tension: 0.4, // Đường cong mềm mại
                        fill: true,
                        pointRadius: 3
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false, // Để biểu đồ co giãn tốt hơn
                    scales: {
                        x: { title: { display: true, text: 'Thời gian' },
                             grid: {
                                display: true //tắt lưới dọc
                             }        
                    },
                        y: { beginAtZero: false ,
                            grid: {
                                display: true //tắt lưới ngang
                             }
                    },
                    animation: false // Tắt animation để realtime mượt hơn
                }
            }
        };
        }
        // ================= BIỂU ĐỒ NHIỆT ĐỘ - ĐỘ ẨM =================
        const ctxHumTemp = document.getElementById('temp-chart').getContext('2d');
        const HumTempchart = new Chart(ctxHumTemp, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Nhiệt độ (°C)',
                    data: [],
                    borderColor: 'rgba(231, 76, 60)',
                    backgroundColor: 'rgba(231, 76, 60, 0.2)',
                    borderWidth: 2,
                    yAxisID: 'y1',
                    tension: 0.4,
                    fill: false, // Không tô màu dưới đường biểu diễn
                    pointRadius: 3 // Điểm tròn trên đường biểu diễn
                }, {
                    label: 'Độ ẩm (%)',
                    data: [],
                    borderColor: 'rgba(54, 162, 235)',
                    //backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderWidth: 2,
                    yAxisID: 'y2',
                    tension: 0.4,
                    fill: false, // Không tô màu dưới đường biểu diễn
                    pointRadius: 3 // Điểm tròn trên đường biểu diễn
                }]
            },
            options: {
                responsive: true, // Đảm bảo biểu đồ co giãn theo kích thuoc
                maintainAspectRatio: false, // Không giữ tỉ lệ cố định
                scales: {
                    x: {title: {display: true, text: 'Thời gian'},
                        grid: {display: true} // Ẩn lưới ngang}
                        },
                    y1: { beginAtzero: false,
                        title: {display: true,
                                text: 'Nhiệt độ (°C)'},
                        position: 'left',
                        grid: {display: false} // Ẩn lưới dọc
                        },
                    y2: { beginAtzero: false,
                        title: {display: true,
                                text: 'Độ ẩm (%)'},
                        position: 'right',
                        grid: {display: true} 
                    }
                    }
            }
        });
        let lasttemp =null;
        let lasthum =null;
        function update_combo_chart () {
            const now = new Date().toLocaleTimeString('vi-VN');
            HumTempchart.data.labels.push(now);
            HumTempchart.data.datasets[0].data.push(lasttemp);
            HumTempchart.data.datasets[1].data.push(lasthum);
            // Giới hạn số điểm dữ liệu hiển thị trên biểu đồ
            if (HumTempchart.data.labels.length > 20) {
                HumTempchart.data.labels.shift();
                HumTempchart.data.datasets[0].data.shift();
                HumTempchart.data.datasets[1].data.shift();
            }
            HumTempchart.update('none'); // Cập nhật biểu đồ mà không có animation
        }
        // 6. Lắng nghe dữ liệu thay đổi (Realtime)
        
        // Nhiệt độ
        //const ctxTemp = document.getElementById('temp-chart').getContext('2d');
        //const tempChart = new Chart(ctxTemp, createChartConfig('Nhiệt độ (°C)', 'rgb(231, 76, 60)')); // Màu đỏ
        onValue(tempRef, (snapshot) => {
            const data = snapshot.val();
            // Kiểm tra nếu có dữ liệu thì hiển thị, không thì hiện --
            nhietDoElement.innerText = (data !== null ? data : "--") + "°C";
            if (data !== null) {
                lasttemp = data;
                update_combo_chart();
            }
        });

        // Độ ẩm không khí
        //const ctxHum = document.getElementById('humidity-chart').getContext('2d');
        //const humChart = new Chart(ctxHum, createChartConfig('Độ ẩm (%)', 'rgb(54, 162, 235)')); // Màu xanh dương
        onValue(humRef, (snapshot) => {
            const data = snapshot.val();
            doAmElement.innerText = (data !== null ? data : "--") + "%";
            if (data !== null) {
                lasthum = data;
                update_combo_chart();
            }
        });

        // Độ ẩm đất
        const ctxSoil = document.getElementById('soil-chart').getContext('2d');
        const soilChart = new Chart(ctxSoil, createChartConfig('Độ ẩm đất (%)', 'rgb(0, 128, 0)')); // Màu xanh lá
        onValue(soilRef, (snapshot) => {
            const data = snapshot.val();
            soilElement.innerText = (data !== null ? data : "--") + "%";
            if (data !== null) {
                document.getElementById("soil-bar-fill").style.width = (100 - data) + "%"; 
                const currentTime = new Date().toLocaleTimeString();
                // Cập nhật biểu đồ
                soilChart.data.labels.push(currentTime);
                soilChart.data.datasets[0].data.push(data);
                // Giới hạn số điểm dữ liệu hiển thị trên biểu đồ 
                if (soilChart.data.labels.length > 20) {
                    soilChart.data.labels.shift();
                    soilChart.data.datasets[0].data.shift();
                    }
                soilChart.update('none'); // Cập nhật biểu đồ mà không có animation
            }
        });

        // Ánh sáng
        const ctxLight = document.getElementById('light-chart').getContext('2d');
        const lightChart = new Chart(ctxLight, createChartConfig('Cường độ ánh sáng (lux)', 'rgb(255, 206, 86)')); // Màu vàng
        onValue(lightRef, (snapshot) => {
            const data = snapshot.val();
            lightElement.innerText = (data !== null ? data : "--") + " lux";
            if (data !== null) {
                const currentTime = new Date().toLocaleTimeString();
                // Cập nhật biểu đồ
                lightChart.data.labels.push(currentTime);
                lightChart.data.datasets[0].data.push(data);
                // Giới hạn số điểm dữ liệu hiển thị trên biểu đồ 
                if (lightChart.data.labels.length > 20) {
                    lightChart.data.labels.shift();
                    lightChart.data.datasets[0].data.shift();
                    }
                lightChart.update('none'); // Cập nhật biểu đồ mà không có animation
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


