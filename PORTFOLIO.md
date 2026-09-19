![工作坊完成徽章](https://img.shields.io/badge/GitHub_Copilot_實戰工作坊-已完成-1F883D?style=for-the-badge&logo=githubcopilot&logoColor=white)

# 待辦清單 Web App

## 簡介

這是一個在 GitHub Copilot 實戰工作坊中完成的待辦清單 Web App。專案從基本的待辦管理開始，逐步加入深色模式、篩選、批次清除與 GitHub issue 修復流程，並維持可離線開啟的前端實作。

## 線上展示

[GitHub Pages](https://<你的帳號>.github.io/<你的repo名稱>/)

> 請將上方網址中的 `<你的帳號>` 與 `<你的repo名稱>` 替換成實際的 GitHub Pages 網址。

## 功能

- 新增待辦事項，輸入空白內容時不會建立項目。
- 勾選待辦事項並以刪除線與淡化效果標示完成狀態。
- 逐筆刪除待辦事項。
- 顯示整體清單的未完成項目數量。
- 使用「全部」、「未完成」、「已完成」篩選待辦事項。
- 篩選結果為空時顯示對應提示，說明項目可能只是被篩選條件過濾。
- 一次清除所有已完成事項，並在刪除前顯示確認對話框。
- 沒有已完成事項時停用「清除已完成」按鈕。
- 支援淺色與深色模式切換，切換按鈕會顯示對應圖示與文字。
- 使用者手動選擇的主題會保存，重新整理後仍會保留；尚未手動選擇時會跟隨作業系統設定。
- 待辦資料與主題偏好保存於 `localStorage`，重新整理後仍可使用。
- 支援手機螢幕與響應式版面。

## 技術

- 使用純 HTML、CSS 與原生 JavaScript。
- 不使用任何前端框架、套件或外部 CDN。
- 透過 CSS 變數管理淺色與深色主題配色。
- 使用 `localStorage` 保存待辦資料與主題偏好。
- 使用原生 DOM API 建立與更新待辦項目。

## 開發方式

- 使用 GitHub Copilot Agent Mode，從需求開始建立待辦清單的前端結構與互動功能。
- 使用 MCP 整合官方資料來源與 GitHub，查詢 Microsoft Learn 的深色模式與無障礙建議，以及讀取 GitHub issue。
- 使用 `.github/prompts` 中的 agentic workflow，依照固定步驟讀取 issue、提出計畫、建立修復分支、修改程式、驗證、提交推送並建立 Pull Request。
- 透過實際的 issue #3 與 issue #4，分別完成篩選空狀態提示改善與清除已完成事項功能，並以 Pull Request 形式提交。

## 我學到什麼

- 如何把自然語言需求拆成 HTML 結構、CSS 樣式與 JavaScript 狀態邏輯。
- 如何使用 `localStorage` 保存資料，讓頁面重新整理後仍維持使用者狀態。
- 如何設計篩選、主題切換與批次操作，並處理空狀態、確認對話框與按鈕停用等情境。
- 如何使用 MCP 查詢官方文件與 GitHub issue，讓實作決策有明確的資料來源。
- 如何透過 agentic workflow 將 issue 修復流程標準化，從計畫、驗證到 Pull Request 都保留清楚紀錄。
