# 網站重新設計計畫 - nickboy.github.io

## 📋 計畫概述

將個人網站從部落格導向轉型為專業履歷/作品集網站，更適合展示軟體工程師的專業形象。

**開始日期**: 2025-01-09  
**目標完成日期**: TBD  
**當前主題**: Ananke  
**目標主題**: Hugo Noir  

---

## 🎯 專案目標

1. 將網站重心從部落格文章轉移到個人履歷展示
2. 採用更專業、現代的視覺設計
3. 優化首頁以突出個人資訊和技能
4. 改善使用者體驗和導航結構
5. 確保響應式設計在所有裝置上都有良好表現

---

## 📊 現況分析

### 當前問題
- ❌ 首頁預設顯示部落格文章列表
- ❌ Ananke 主題過於簡約，不適合履歷展示
- ❌ 缺乏專業的技能展示區域
- ❌ 沒有專案作品集頁面
- ❌ 視覺設計不夠吸引人

### 優勢保留
- ✅ 已有基本內容結構 (about, experience, education, skills)
- ✅ GitHub Actions 自動部署設置完成
- ✅ SEO 基礎配置已完成

---

## 🛠️ 執行計畫

### Phase 1: 環境準備與工具安裝
- [ ] 安裝 Playwright MCP 工具
  ```bash
  npm install -g @playwright/test
  npx playwright install
  ```
- [ ] 設置 MCP 配置文件
- [ ] 創建測試腳本目錄結構
- [ ] 備份當前網站配置和內容

### Phase 2: 主題安裝與切換
- [ ] Fork Hugo Noir 主題到個人 GitHub
- [ ] 添加 Hugo Noir 為 git submodule
  ```bash
  git submodule add https://github.com/prxshetty/hugo-noir themes/hugo-noir
  git submodule update --init --recursive
  ```
- [ ] 創建主題切換分支 `feature/hugo-noir-theme`
- [ ] 更新 `hugo.toml` 配置文件
- [ ] 測試主題基本功能

### Phase 3: 內容結構重組
- [ ] 創建新的首頁內容 (`content/_index.md`)
  - [ ] 個人簡介
  - [ ] 核心技能摘要
  - [ ] 聯絡資訊
- [ ] 調整 About 頁面格式
  - [ ] 添加個人照片
  - [ ] 更詳細的背景介紹
  - [ ] 職涯目標
- [ ] 重構 Experience 頁面
  - [ ] 時間軸展示
  - [ ] 公司 logo
  - [ ] 關鍵成就 bullet points
- [ ] 創建 Projects 頁面
  - [ ] 專案卡片設計
  - [ ] GitHub 連結
  - [ ] 技術棧標籤
  - [ ] Demo 連結（如適用）
- [ ] 優化 Skills 頁面
  - [ ] 使用 Devicon 圖標
  - [ ] 技能分類（前端/後端/工具等）
  - [ ] 熟練度視覺化
- [ ] 調整 Posts 為次要頁面
  - [ ] 移至導航選單末端
  - [ ] 精選技術文章

### Phase 4: 視覺設計與客製化
- [ ] 配色方案調整
  - [ ] 定義品牌色彩
  - [ ] 深色/淺色模式配置
- [ ] 字型選擇
  - [ ] 標題字型
  - [ ] 內文字型
  - [ ] 程式碼字型
- [ ] 自訂 CSS 調整
  - [ ] 間距優化
  - [ ] 動畫效果
  - [ ] 響應式斷點
- [ ] 圖片資源準備
  - [ ] 個人專業照片
  - [ ] 專案截圖
  - [ ] 公司 logo

### Phase 5: 功能增強
- [ ] 添加聯絡表單
- [ ] 整合社交媒體連結
  - [ ] LinkedIn
  - [ ] GitHub
  - [ ] Twitter/X
- [ ] 實現搜尋功能
- [ ] 添加 RSS feed
- [ ] 設置 Google Analytics
- [ ] 實現多語言支援（如需要）

### Phase 6: 效能優化
- [ ] 圖片最佳化
  - [ ] WebP 格式轉換
  - [ ] 響應式圖片
  - [ ] Lazy loading
- [ ] CSS/JS 壓縮
- [ ] 啟用 Hugo 快取
- [ ] CDN 配置（如需要）
- [ ] Lighthouse 分數優化
  - [ ] 目標: Performance > 90
  - [ ] 目標: Accessibility > 95
  - [ ] 目標: Best Practices > 95
  - [ ] 目標: SEO > 95

### Phase 7: 測試與品質保證
- [ ] 使用 Playwright 進行 UI 測試
  - [ ] 首頁載入測試
  - [ ] 導航功能測試
  - [ ] 響應式布局測試
  - [ ] 深色模式切換測試
- [ ] 跨瀏覽器測試
  - [ ] Chrome
  - [ ] Firefox
  - [ ] Safari
  - [ ] Edge
- [ ] 行動裝置測試
  - [ ] iOS Safari
  - [ ] Android Chrome
- [ ] 內容校對
  - [ ] 拼寫檢查
  - [ ] 連結驗證
  - [ ] 資訊準確性
- [ ] SEO 檢查
  - [ ] Meta tags
  - [ ] Open Graph tags
  - [ ] Sitemap
  - [ ] robots.txt

### Phase 8: 部署與上線
- [ ] 合併功能分支到 main
- [ ] 觸發 GitHub Actions 部署
- [ ] 驗證線上版本
- [ ] 監控錯誤日誌
- [ ] 收集使用者回饋

### Phase 9: 後續維護
- [ ] 建立內容更新流程
- [ ] 設置自動化測試 CI/CD
- [ ] 定期更新依賴套件
- [ ] 監控網站效能指標
- [ ] 定期備份

---

## 📝 技術規格

### Hugo 配置
```toml
# 基本配置
baseURL = "https://nickboy.github.io/"
languageCode = "zh-tw"
defaultContentLanguage = "en"
title = "Nick Liu - Software Engineer"
theme = "hugo-noir"

# 功能開關
enableRobotsTXT = true
enableGitInfo = true
enableEmoji = true
```

### 目錄結構
```
content/
├── _index.md          # 首頁內容
├── about/
│   └── _index.md      # 關於我
├── experience/
│   └── _index.md      # 工作經歷
├── projects/          # 新增
│   ├── _index.md
│   ├── project-1.md
│   └── project-2.md
├── skills/
│   └── _index.md      # 技能列表
├── education/
│   └── _index.md      # 教育背景
└── posts/            # 部落格（次要）
    └── *.md
```

---

## 🔄 進度追蹤

### 本週目標
- [ ] 完成 Phase 1: 環境準備
- [ ] 開始 Phase 2: 主題安裝

### 已完成項目
- [x] 網站現況分析
- [x] 研究替代主題選項
- [x] 選定 Hugo Noir 作為新主題
- [x] 制定詳細改造計畫

### 待解決問題
- [ ] 確認是否需要保留所有現有內容
- [ ] 決定配色方案
- [ ] 準備個人專業照片

---

## 📚 參考資源

- [Hugo Noir 主題](https://github.com/prxshetty/hugo-noir)
- [Hugo 官方文檔](https://gohugo.io/documentation/)
- [Playwright 文檔](https://playwright.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Devicon 圖標庫](https://devicon.dev/)

---

## 📌 備註

- 保持每個階段的 git commit 清晰明確
- 每完成一個 Phase 進行完整測試
- 定期更新此文件的進度
- 遇到問題及時記錄在「待解決問題」區域

---

**最後更新時間**: 2025-01-09
**更新人**: Claude + Nick Liu