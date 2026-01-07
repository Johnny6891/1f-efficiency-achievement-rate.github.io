/**
 * 標題: 系統入口與路由控制
 *
 * 功能簡介:
 * 負責處理 Web App 的 doGet 請求，並透過模板引擎組裝 HTML、CSS 與 JS 檔案。
 * 實作 MVC 架構中的 Controller 角色。
 *
 * 腳本流程:
 * 1. 接收 doGet 請求。
 * 2. 建立 index 模板。
 * 3. 透過 include() 函式動態注入 css 與 js。
 * 4. 回傳渲染後的 HTML 頁面。
 *
 * 更新紀錄:
 * - v1.0 (2025/01/07): 初版建立，實作 MVC 前端分離架構。
 *
 * 注意事項:
 * - 必須確保專案中包含 index.html, css.html, js.html 檔案。
 *
 * @version 1.0.0
 * @lastModified 2025/01/07
 */

/**
 * 處理 Web App HTTP GET 請求
 * @param {Object} e - 事件參數
 * @return {HtmlOutput} 回傳渲染後的 HTML
 */
function doGet(e) {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('生產一組 - 效率日誌')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * 引入 HTML 片段 (用於分離 CSS 與 JS)
 * @param {string} filename - 檔案名稱 (不含副檔名)
 * @return {string} 檔案內容
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
