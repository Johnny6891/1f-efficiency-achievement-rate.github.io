/**
 * 前端互動邏輯
 * 包含：打字機特效、頁面標題動態切換、以及 GAS 數據串接
 */

// GAS API 設定 (請確保此為最新部署的 URL)
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
    // 簡單檢查 URL 是否異常
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
        
        // 更新第一個卡片 (圖表)
        const chartEl = document.getElementById('chart-preview');
        if (data.chart && chartEl) {
            // 動態判斷顏色：如果是 "達標" 顯示綠色，否則顯示紅色
            const statusText = data.chart.status;
            const tagClass = statusText === "達標" ? "tag-success" : "tag-urgent";
            
            chartEl.innerHTML = `
                達成率: <span class="data-highlight">${data.chart.rate}</span>
                <span class="data-tag ${tagClass}">${statusText}</span>
            `;
        }
        
        // 【修改】第二張卡片已移除數據顯示，因此刪除了對應的 JS 更新邏輯

    } catch (error) {
        console.error("Fetch GAS Data Error:", error);
        const errorMsg = "數據載入失敗";
        if (document.getElementById('chart-preview')) {
            document.getElementById('chart-preview').innerText = errorMsg;
        }
    }
}

// 頁面載入後，執行數據抓取
window.addEventListener('load', fetchGasData);
