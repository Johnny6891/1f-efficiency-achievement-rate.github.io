/**
 * 前端互動邏輯
 * 包含：打字機特效、頁面標題動態切換、以及 GAS 數據串接
 */

// GAS API 設定 (請保留你目前正確的 URL)
const GAS_API_URL = "https://script.google.com/a/macros/dgstand.com/s/AKfycbyeDao7zNeomdusgymdIIVNmllqUBx9EMDiLM8LEcufZFuzkkeHDXt3f0WJfJCugKc2EA/exec";

// 1. 打字機特效設定
const textToType = "生產一組"; 
const typeSpeed = 150;        
const element = document.getElementById('typewriter-text');
let index = 0;

function typeWriter() {
    if (index < textToType.length) {
        element.innerHTML += textToType.charAt(index);
        index++;
        setTimeout(typeWriter, typeSpeed);
    }
}

window.addEventListener('load', typeWriter);

// 2. 智慧分頁標題
const originalTitle = document.title;
const awayTitle = "( ˘•ω•˘ ) 等你回來..."; 

document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        document.title = awayTitle;
    } else {
        document.title = originalTitle;
    }
});

// 3. 從 GAS 獲取數據並更新卡片
async function fetchGasData() {
    if (GAS_API_URL.includes("你的_GAS_API_DEPLOY_ID")) {
        console.warn("⚠ 尚未設定 GAS_API_URL");
        return;
    }

    try {
        const response = await fetch(GAS_API_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // 更新第一個卡片 (圖表) - 僅保留這部分的更新
        const chartEl = document.getElementById('chart-preview');
        if (data.chart && chartEl) {
            // 判斷顏色：如果不是 "達標"，則改變顏色樣式 (可選)
            const tagClass = data.chart.status.includes("達標") ? "tag-success" : "tag-urgent";
            
            chartEl.innerHTML = `
                達成率: <span class="data-highlight">${data.chart.rate}</span>
                <span class="data-tag ${tagClass}">${data.chart.status}</span>
            `;
        }
        
        // 【修改】已移除對 pending-preview 的更新邏輯

    } catch (error) {
        console.error("Fetch GAS Data Error:", error);
        const errorMsg = "數據載入失敗";
        if (document.getElementById('chart-preview')) document.getElementById('chart-preview').innerText = errorMsg;
    }
}

window.addEventListener('load', fetchGasData);
