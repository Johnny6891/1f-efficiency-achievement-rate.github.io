# 📊 效率日誌月度圖表展示系統 (Efficiency Daily Log Dashboard)

![Version](https://img.shields.io/badge/version-1.8.2-blue)
![Tech](https://img.shields.io/badge/Google_Apps_Script-Backend-green)
![UI](https://img.shields.io/badge/Tailwind_CSS-Glassmorphism-purple)
![Chart](https://img.shields.io/badge/Chart.js-4.4.0-orange)

這是一個基於 **Google Apps Script (GAS)** 開發的資料視覺化 Web App。它能自動讀取 Google 試算表中的效率日誌，將枯燥的數據轉換為精美的互動式圖表，並具備「莫迪蘭色系」的溫暖毛玻璃介面風格。

主要用於追蹤每日工作效率、達成率以及獎金門檻達成狀態。

---

## ✨ 主要功能

### 1. 視覺化儀表板
* **互動式圖表**：整合長條圖（數量）與折線圖（百分比/達成率）的組合圖表。
* **響應式設計**：完美支援手機與電腦版面，手機版自動優化圖表高度與字體。
* **莫迪蘭風格 (Morandi Style)**：採用低飽和度的溫暖色系，搭配現代感的毛玻璃 (Glassmorphism) 特效。

### 2. 資料分析與篩選
* **月份篩選器**：自動偵測資料中存在的所有月份，支援切換特定月份或查看全部資料。
* **自動排序**：無論原始資料順序為何，系統會自動依照日期由舊到新排序。

### 3. 獎金追蹤機制
* **即時狀態卡片**：顯示當前達成率與對應的獎金金額。
* **動態門檻線**：在圖表上自動繪製 70% / 80% / 90% 的獎金門檻虛線。
* **計算邏輯**：基於最近一天的達成率來判斷目前的獎金位階。

### 4. 高度自動化
* **智慧欄位偵測**：系統會自動判斷欄位是「數值」還是「比率」，並決定圖表類型。
* **設定驅動**：透過試算表標題列即可定義圖表顏色與類型，無需修改程式碼。

---

## 🛠️ 技術架構

* **Backend**: Google Apps Script (GAS)
* **Frontend**: HTML5, Tailwind CSS (CDN)
* **Visualization**: Chart.js v4.4.0 + Annotation Plugin
* **Database**: Google Sheets

---

## ⚙️ 安裝與設定指南

### 步驟 1: 準備 Google Sheet
建立一個 Google 試算表，工作表名稱預設為 `Efficiency Daily Log`。
第一欄必須為 **日期**，後續欄位為數值數據。

### 步驟 2: 設定標題列 (進階配置)
您可以在試算表的標題列使用特殊語法來控制圖表樣式：
格式：`欄位名稱 [圖表類型:色碼]`

**範例：**
| 日期 | 總筆數 | 達成率 [line:#7D9D9C] | 未達成 [bar:#C78283] |
| :--- | :--- | :--- | :--- |
| 2025/12/01 | 100 | 85% | 15 |

* `line`：繪製折線圖（通常用於百分比）
* `bar`：繪製長條圖（通常用於數量）
* 如果不標記，系統會嘗試自動偵測。

### 步驟 3: 部署程式碼
1. 開啟試算表，點擊 `擴充功能` > `Apps Script`。
2. 建立 `code.gs` 並貼上後端程式碼。
3. 建立 `index.html` 並貼上前端程式碼。
4. 修改 `code.gs` 中的 `CONFIG` 區域：
    ```javascript
    const CONFIG = {
      SHEET_ID: '您的_GOOGLE_SHEET_ID', // 請替換為您的試算表 ID
      SHEET_NAME: 'Efficiency Daily Log',
      // ... 其他設定
    };
    ```
5. 點擊 `部署` > `新增部署` > 選擇 `網頁應用程式`。
6. 執行身分選擇「我」，存取權限選擇「任何人」。

---

## 📅 更新紀錄

* **v1.8.2 (2025/12/30)**: 修正月份選擇器包含「全部顯示」選項。
* **v1.8.1 (2025/12/30)**: 優化獎金狀態計算邏輯（取最近一天）。
* **v1.8.0 (2025/12/30)**: 新增獎金狀態卡片與圖例門檻標示。
* **v1.7.0**: 新增圖表門檻標示線 (Annotation)。
* **v1.6.0**: 實作後端月份篩選邏輯。
* **v1.5.0**: UI 大改版（莫迪蘭色系 + 毛玻璃）。

---

## 📝 License
此專案由 GAS Architect 開發，供內部效率追蹤使用。
