document.addEventListener('DOMContentLoaded', () => {
    const APP_NAME = 'Nano Cleanse';

    function setupMobileViewportUnit() {
        const root = document.documentElement;
        const vv = window.visualViewport;

        function update() {
            const height = vv ? vv.height : window.innerHeight;
            root.style.setProperty('--vvh', `${height * 0.01}px`);
        }

        update();
        window.addEventListener('resize', update);
        window.addEventListener('orientationchange', update);
        if (vv) {
            vv.addEventListener('resize', update);
            vv.addEventListener('scroll', update);
        }
    }

    const translations = {
        en: {
            'nav.library': 'LIBRARY',
            'nav.allPhotos': 'All Photos',
            'nav.batch': 'Batch Remove',
            'nav.recents': 'Recents',
            'nav.tools': 'TOOLS',
            'nav.restoration': 'Nano Cleanse',
            'toolbar.export': 'Export...',
            'toolbar.exportShort': 'Export',
            'toolbar.reset': 'Reset',
            'toolbar.zoom': 'Zoom',
            'empty.noPhoto': 'No Photo Selected',
            'empty.import': 'Import Photo',
            'status.ready': 'Ready',
            'status.processing': 'Processing...',
            'status.edited': 'Edited • {size} KB',
            'alert.error': 'Error processing image',
            'download.prefix': 'cleaned_',
            'recent.empty': 'No recent exports yet',
            'recents.title': 'Recents',
            'recents.search': 'Search',
            'recents.sortNewest': 'Newest',
            'recents.sortOldest': 'Oldest',
            'recents.colName': 'Name',
            'recents.colDate': 'Date',
            'recents.colSize': 'Size',
            'recents.viewList': 'List View',
            'recents.viewGrid': 'Grid View',
            'recents.clearAll': 'Clear History',
            'recents.clearConfirm': 'Clear all history?',
            'recents.delete': 'Delete',
            'recents.deleteConfirm': 'Delete this item?',
            'recents.count': '{count} items',
            'batch.import': 'Import Photos',
            'batch.downloadAll': 'Download All',
            'batch.clear': 'Clear Queue',
            'batch.empty': 'No photos in queue',
            'batch.colName': 'Name',
            'batch.colSize': 'Size',
            'batch.colStatus': 'Status',
            'batch.count': '{count} items',
            'batch.status.waiting': 'Waiting',
            'batch.status.processing': 'Processing...',
            'batch.status.done': 'Done',
            'batch.status.error': 'Error'
        },
        zh: {
            'nav.library': '资料库',
            'nav.allPhotos': '全部照片',
            'nav.batch': '批量去除',
            'nav.recents': '最近项目',
            'nav.tools': '工具',
            'nav.restoration': 'Nano Cleanse',
            'toolbar.export': '导出...',
            'toolbar.exportShort': '导出',
            'toolbar.reset': '重置',
            'toolbar.zoom': '缩放',
            'empty.noPhoto': '未选择照片',
            'empty.import': '导入照片',
            'status.ready': '就绪',
            'status.processing': '处理中...',
            'status.edited': '已处理 • {size} KB',
            'alert.error': '处理图像时出错',
            'download.prefix': 'cleaned_',
            'recent.empty': '暂无历史导出',
            'recents.title': '最近项目',
            'recents.search': '搜索',
            'recents.sortNewest': '按最新',
            'recents.sortOldest': '按最旧',
            'recents.colName': '名称',
            'recents.colDate': '日期',
            'recents.colSize': '大小',
            'recents.viewList': '列表视图',
            'recents.viewGrid': '网格视图',
            'recents.clearAll': '清空历史',
            'recents.clearConfirm': '确定要清空所有历史吗？',
            'recents.delete': '删除',
            'recents.deleteConfirm': '确定要删除该条记录吗？',
            'recents.count': '{count} 个项目',
            'batch.import': '导入照片',
            'batch.downloadAll': '全部下载',
            'batch.clear': '清空列表',
            'batch.empty': '列表为空',
            'batch.colName': '名称',
            'batch.colSize': '大小',
            'batch.colStatus': '状态',
            'batch.count': '{count} 个项目',
            'batch.status.waiting': '等待中',
            'batch.status.processing': '处理中...',
            'batch.status.done': '完成',
            'batch.status.error': '错误'
        },
        ja: {
            'nav.library': 'ライブラリ',
            'nav.allPhotos': 'すべての写真',
            'nav.batch': '一括削除',
            'nav.recents': '最近',
            'nav.tools': 'ツール',
            'nav.restoration': 'Nano Cleanse',
            'toolbar.export': '書き出し...', 
            'toolbar.exportShort': '書き出し',
            'toolbar.reset': 'リセット',
            'toolbar.zoom': 'ズーム',
            'empty.noPhoto': '写真が選択されていません',
            'empty.import': '写真を読み込む',
            'status.ready': '準備完了',
            'status.processing': '処理中...',
            'status.edited': '編集済み • {size} KB',
            'alert.error': '画像の処理中にエラーが発生しました',
            'download.prefix': 'cleaned_',
            'recent.empty': '履歴はまだありません',
            'recents.title': '最近',
            'recents.search': '検索',
            'recents.sortNewest': '新しい順',
            'recents.sortOldest': '古い順',
            'recents.colName': '名前',
            'recents.colDate': '日付',
            'recents.colSize': 'サイズ',
            'recents.viewList': 'リスト表示',
            'recents.viewGrid': 'グリッド表示',
            'recents.clearAll': '履歴を消去',
            'recents.clearConfirm': '履歴をすべて消去しますか？',
            'recents.delete': '削除',
            'recents.deleteConfirm': 'この項目を削除しますか？',
            'recents.count': '{count} 件',
            'batch.import': '写真を読み込む',
            'batch.downloadAll': 'すべてダウンロード',
            'batch.clear': 'リストを消去',
            'batch.empty': 'キューに写真がありません',
            'batch.colName': '名前',
            'batch.colSize': 'サイズ',
            'batch.colStatus': '状態',
            'batch.count': '{count} 件',
            'batch.status.waiting': '待機中',
            'batch.status.processing': '処理中...', 
            'batch.status.done': '完了',
            'batch.status.error': 'エラー'
        }
    };

    function normalizeLang(lang) {
        if (!lang) return 'en';
        const lower = lang.toLowerCase();
        if (lower.startsWith('zh')) return 'zh';
        if (lower.startsWith('ja')) return 'ja';
        return 'en';
    }

    const systemLang = navigator.language || 'en';
    const currentLang = normalizeLang(systemLang);

    function t(key, vars = {}) {
        const table = translations[currentLang] || translations.en;
        const fallback = translations.en[key] || key;
        const text = table[key] || fallback;
        return text.replace(/\{(\w+)\}/g, (_, k) => (vars[k] ?? `{${k}}`));
    }

    function applyTranslations() {
        document.title = APP_NAME;
        document.documentElement.lang = systemLang;
        document.querySelectorAll('[data-i18n]').forEach((el) => {
            const key = el.dataset.i18n;
            if (key === 'recents.count' || key === 'batch.count') {
                const count = el.dataset.i18nArgs ?? '0';
                el.textContent = t(key, { count });
                return;
            }
            el.textContent = t(key);
        });
        document.querySelectorAll('[data-i18n-title]').forEach((el) => {
            el.title = t(el.dataset.i18nTitle);
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
            el.placeholder = t(el.dataset.i18nPlaceholder);
        });
        if (recentsSortBtn) {
            recentsSortBtn.textContent = recentsSortOrder === 'desc' ? t('recents.sortNewest') : t('recents.sortOldest');
        }
        if (recentsClearBtn) {
            recentsClearBtn.title = t('recents.clearAll');
        }
    }

    const themeMedia = window.matchMedia('(prefers-color-scheme: dark)');
    function applyThemeFromSystem() {
        document.documentElement.setAttribute('data-theme', themeMedia.matches ? 'dark' : 'light');
    }
    themeMedia.addEventListener('change', applyThemeFromSystem);

    // Elements
    const mainView = document.getElementById('mainView');
    const allPhotosNav = document.getElementById('allPhotosNav');
    const batchNav = document.getElementById('batchNav');
    const recentsNav = document.getElementById('recentsNav');
    const restorationView = document.getElementById('restorationView');
    const batchView = document.getElementById('batchView');
    const recentsView = document.getElementById('recentsView');

    const titleBar = document.getElementById('titleBar');
    const statusLeft = document.getElementById('statusLeft');
    const downloadBtn = document.getElementById('downloadBtn');
    const resetBtn = document.getElementById('resetBtn');

    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const emptyState = document.getElementById('emptyState');
    const canvasContainer = document.getElementById('canvasContainer');

    const compareViewport = document.getElementById('compareViewport');
    const imgAfter = document.getElementById('imgAfter');
    const imgBefore = document.getElementById('imgBefore');
    const overlayContainer = document.getElementById('overlayContainer');
    const sliderHandle = document.getElementById('sliderHandle');

    // Recents Elements
    const recentList = document.getElementById('recentList');
    const recentTable = document.getElementById('recentTable');
    const recentsViewListBtn = document.getElementById('recentsViewListBtn');
    const recentsViewGridBtn = document.getElementById('recentsViewGridBtn');
    const recentsSortBtn = document.getElementById('recentsSortBtn');
    const recentsClearBtn = document.getElementById('recentsClearBtn');
    const recentsSearchInput = document.getElementById('recentsSearchInput');
    const recentsCount = document.getElementById('recentsCount');

    // Batch Elements
    const batchImportBtn = document.getElementById('batchImportBtn');
    const batchDownloadAllBtn = document.getElementById('batchDownloadAllBtn');
    const batchClearBtn = document.getElementById('batchClearBtn');
    const batchList = document.getElementById('batchList');
    const batchCount = document.getElementById('batchCount');
    const batchFileInput = document.getElementById('batchFileInput');
    const batchEmptyState = document.getElementById('batchEmptyState');

    // Logic
    const remover = new WatermarkRemover();

    let currentView = 'restoration';
    let titleState = { type: 'default', value: null };
    let statusState = { key: 'ready', sizeKb: null };
    let processedBlob = null;
    let isDraggingSlider = false;
    let currentBeforeUrl = null;
    let currentAfterUrl = null;

    // --- Batch State ---
    let batchQueue = [];
    let isBatchProcessing = false;

    // --- Recents state (used by i18n too) ---
    let recentsSortOrder = 'desc'; // 'desc' newest first
    let recentsSearchQuery = '';
    let cachedRecents = [];
    let recentsLayout = (localStorage.getItem('recentsLayout') === 'grid') ? 'grid' : 'list';

    function applyRecentsLayout(layout) {
        recentsLayout = layout === 'grid' ? 'grid' : 'list';
        localStorage.setItem('recentsLayout', recentsLayout);
        if (recentTable) recentTable.dataset.layout = recentsLayout;
        if (recentsViewListBtn) recentsViewListBtn.classList.toggle('active', recentsLayout === 'list');
        if (recentsViewGridBtn) recentsViewGridBtn.classList.toggle('active', recentsLayout === 'grid');
    }

    // --- Theme + i18n ---
    setupMobileViewportUnit();
    applyThemeFromSystem();
    applyTranslations();
    applyRecentsLayout(recentsLayout);

    function updateTitle() {
        if (!titleBar) return;
        if (currentView === 'recents') {
            titleBar.textContent = t('recents.title');
            return;
        }
        if (currentView === 'batch') {
            titleBar.textContent = t('nav.batch');
            return;
        }
        if (titleState.type === 'file') {
            titleBar.textContent = titleState.value;
            return;
        }
        titleBar.textContent = APP_NAME;
    }

    function updateStatusText() {
        if (!statusLeft) return;
        if (statusState.key === 'processing') {
            statusLeft.textContent = t('status.processing');
            return;
        }
        if (statusState.key === 'edited') {
            statusLeft.textContent = t('status.edited', { size: statusState.sizeKb });
            return;
        }
        statusLeft.textContent = t('status.ready');
    }

    function setStatus(key, sizeKb = null) {
        statusState = { key, sizeKb };
        updateStatusText();
    }

    function updateNavActive() {
        if (allPhotosNav) allPhotosNav.classList.toggle('active', currentView === 'restoration');
        if (batchNav) {
            const isBatch = currentView === 'batch';
            batchNav.classList.toggle('active', isBatch);
            batchNav.setAttribute('aria-expanded', isBatch ? 'true' : 'false');
        }
        if (recentsNav) {
            const isRecents = currentView === 'recents';
            recentsNav.classList.toggle('active', isRecents);
            recentsNav.setAttribute('aria-expanded', isRecents ? 'true' : 'false');
        }
        if (mainView) {
            mainView.classList.toggle('is-recents', currentView === 'recents' || currentView === 'batch');
        }
    }

    function setView(view) {
        currentView = view;
        if (restorationView) restorationView.hidden = view !== 'restoration';
        if (batchView) batchView.hidden = view !== 'batch';
        if (recentsView) recentsView.hidden = view !== 'recents';
        updateNavActive();
        updateTitle();
        if (view === 'recents') refreshRecents();
    }

    // --- Desktop window dragging ---
    function setupDesktopWindowDragging() {
        if (window.innerWidth <= 768) return;
        const macWindow = document.querySelector('.mac-window');
        const toolbar = document.querySelector('.toolbar');
        if (!macWindow || !toolbar) return;

        let isDragging = false;
        let startOffsetX = 0;
        let startOffsetY = 0;
        let lastClientX = 0;
        let lastClientY = 0;
        let rafId = null;

        function setPosition(clientX, clientY) {
            const rect = macWindow.getBoundingClientRect();
            const maxLeft = Math.max(0, window.innerWidth - rect.width);
            const maxTop = Math.max(0, window.innerHeight - rect.height);
            const left = Math.max(0, Math.min(maxLeft, clientX - startOffsetX));
            const top = Math.max(0, Math.min(maxTop, clientY - startOffsetY));
            macWindow.style.left = `${left}px`;
            macWindow.style.top = `${top}px`;
        }

        function onPointerMove(event) {
            if (!isDragging) return;
            lastClientX = event.clientX;
            lastClientY = event.clientY;
            if (rafId) return;
            rafId = window.requestAnimationFrame(() => {
                rafId = null;
                setPosition(lastClientX, lastClientY);
            });
        }

        function endDrag() {
            if (!isDragging) return;
            isDragging = false;
            document.body.classList.remove('is-dragging-window');
            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('pointerup', endDrag);
            window.removeEventListener('pointercancel', endDrag);
            if (rafId) {
                window.cancelAnimationFrame(rafId);
                rafId = null;
            }
        }

        toolbar.addEventListener('pointerdown', (event) => {
            if (event.button !== 0) return;
            if (window.innerWidth <= 768) return;
            if (event.target.closest('button, a, input, select, textarea, .toolbar-actions')) return;

            const rect = macWindow.getBoundingClientRect();
            macWindow.style.position = 'fixed';
            macWindow.style.margin = '0';
            macWindow.style.left = `${rect.left}px`;
            macWindow.style.top = `${rect.top}px`;

            startOffsetX = event.clientX - rect.left;
            startOffsetY = event.clientY - rect.top;
            lastClientX = event.clientX;
            lastClientY = event.clientY;

            isDragging = true;
            document.body.classList.add('is-dragging-window');
            window.addEventListener('pointermove', onPointerMove);
            window.addEventListener('pointerup', endDrag);
            window.addEventListener('pointercancel', endDrag);
        });
    }

    setupDesktopWindowDragging();

    // --- Mobile adaptation (keep existing UX) ---
    function adaptForMobile() {
        if (window.innerWidth > 768) return;
        const statusBar = document.querySelector('.status-bar');
        if (!statusBar) return;

        const spans = statusBar.querySelectorAll('span');
        spans.forEach(s => s.style.display = 'none');
        if (statusBar.querySelector('.mobile-action-group')) return;

        const group = document.createElement('div');
        group.className = 'mobile-action-group';
        group.style.display = 'flex';
        group.style.width = '100%';
        group.style.justifyContent = 'space-between';
        group.style.alignItems = 'center';

        const resetClone = document.createElement('div');
        resetClone.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 4v6h6"></path><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path></svg>`;
        resetClone.style.color = '#007aff';
        resetClone.style.padding = '8px';
        resetClone.onclick = resetUI;
        group.appendChild(resetClone);

        const exportClone = document.createElement('div');
        exportClone.textContent = t('toolbar.exportShort');
        exportClone.style.color = '#007aff';
        exportClone.style.fontWeight = '600';
        exportClone.style.fontSize = '17px';
        exportClone.style.padding = '8px';
        exportClone.style.opacity = '0.5';
        exportClone.style.pointerEvents = 'none';

        exportClone.onclick = () => {
            if (!processedBlob) return;
            downloadBtn.click();
        };

        const observer = new MutationObserver(() => {
            const disabled = downloadBtn.disabled;
            exportClone.style.opacity = disabled ? '0.5' : '1';
            exportClone.style.pointerEvents = disabled ? 'none' : 'auto';
        });
        observer.observe(downloadBtn, { attributes: true });

        group.appendChild(exportClone);
        statusBar.appendChild(group);
    }

    adaptForMobile();

    // --- Helpers ---
    function setImageSource(img, url, currentUrl) {
        if (currentUrl) URL.revokeObjectURL(currentUrl);
        img.src = url;
        return url;
    }

    function clearPreview() {
        if (currentBeforeUrl) URL.revokeObjectURL(currentBeforeUrl);
        if (currentAfterUrl) URL.revokeObjectURL(currentAfterUrl);
        currentBeforeUrl = null;
        currentAfterUrl = null;
        imgBefore.removeAttribute('src');
        imgAfter.removeAttribute('src');
    }

    function showCanvas() {
        emptyState.style.display = 'none';
        canvasContainer.style.display = 'block';
    }

    function showEmpty() {
        canvasContainer.style.display = 'none';
        emptyState.style.display = 'block';
    }

    function formatSize(sizeBytes) {
        const kb = sizeBytes / 1024;
        if (kb < 1024) return `${Math.round(kb)} KB`;
        return `${(kb / 1024).toFixed(1)} MB`;
    }

    function formatTime(timestamp) {
        return new Intl.DateTimeFormat(systemLang, { dateStyle: 'medium', timeStyle: 'short' }).format(timestamp);
    }

    function createId() {
        if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
        return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    }

    async function blobToDataUrl(blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(String(reader.result));
            reader.onerror = () => reject(reader.error);
            reader.readAsDataURL(blob);
        });
    }

    async function createThumbnail(blob) {
        try {
            if (window.createImageBitmap) {
                const bitmap = await createImageBitmap(blob);
                const maxSize = 64;
                const scale = Math.min(1, maxSize / Math.max(bitmap.width, bitmap.height));
                const canvas = document.createElement('canvas');
                canvas.width = Math.max(1, Math.round(bitmap.width * scale));
                canvas.height = Math.max(1, Math.round(bitmap.height * scale));
                const ctx = canvas.getContext('2d');
                ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
                bitmap.close();
                const thumbBlob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.82));
                return await blobToDataUrl(thumbBlob);
            }
        } catch {
            // Fallback below.
        }

        const url = URL.createObjectURL(blob);
        try {
            const img = await new Promise((resolve, reject) => {
                const image = new Image();
                image.onload = () => resolve(image);
                image.onerror = () => reject(new Error('Failed to load thumbnail'));
                image.src = url;
            });
            const maxSize = 64;
            const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
            const canvas = document.createElement('canvas');
            canvas.width = Math.max(1, Math.round(img.width * scale));
            canvas.height = Math.max(1, Math.round(img.height * scale));
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            const thumbBlob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.82));
            return await blobToDataUrl(thumbBlob);
        } finally {
            URL.revokeObjectURL(url);
        }
    }

    // --- Recents (IndexedDB) ---
    const RECENT_DB = 'nano-cleanse-recents';
    const RECENT_STORE = 'images';
    const RECENT_LIMIT = 50;

    async function openRecentDb() {
        if (!window.indexedDB) throw new Error('IndexedDB not supported');
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(RECENT_DB, 1);
            request.onupgradeneeded = () => {
                const db = request.result;
                const store = db.createObjectStore(RECENT_STORE, { keyPath: 'id' });
                store.createIndex('createdAt', 'createdAt');
            };
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async function saveRecent(entry) {
        const db = await openRecentDb();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(RECENT_STORE, 'readwrite');
            tx.objectStore(RECENT_STORE).put(entry);
            tx.oncomplete = () => resolve();
            tx.onerror = () => reject(tx.error);
        });
    }

    async function deleteRecentById(id) {
        const db = await openRecentDb();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(RECENT_STORE, 'readwrite');
            tx.objectStore(RECENT_STORE).delete(id);
            tx.oncomplete = () => resolve();
            tx.onerror = () => reject(tx.error);
        });
    }

    async function clearAllRecents() {
        const db = await openRecentDb();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(RECENT_STORE, 'readwrite');
            tx.objectStore(RECENT_STORE).clear();
            tx.oncomplete = () => resolve();
            tx.onerror = () => reject(tx.error);
        });
    }

    async function pruneRecents() {
        const db = await openRecentDb();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(RECENT_STORE, 'readwrite');
            const index = tx.objectStore(RECENT_STORE).index('createdAt');
            let count = 0;
            index.openCursor(null, 'prev').onsuccess = (event) => {
                const cursor = event.target.result;
                if (!cursor) return;
                count += 1;
                if (count > RECENT_LIMIT) cursor.delete();
                cursor.continue();
            };
            tx.oncomplete = () => resolve();
            tx.onerror = () => reject(tx.error);
        });
    }

    async function getRecentEntries(order = 'desc') {
        const db = await openRecentDb();
        return new Promise((resolve, reject) => {
            const entries = [];
            const tx = db.transaction(RECENT_STORE, 'readonly');
            const index = tx.objectStore(RECENT_STORE).index('createdAt');
            const direction = order === 'asc' ? 'next' : 'prev';
            index.openCursor(null, direction).onsuccess = (event) => {
                const cursor = event.target.result;
                if (!cursor) return;
                entries.push(cursor.value);
                if (entries.length >= RECENT_LIMIT) return;
                cursor.continue();
            };
            tx.oncomplete = () => resolve(entries);
            tx.onerror = () => reject(tx.error);
        });
    }

    function getFilteredRecents() {
        if (!recentsSearchQuery) return cachedRecents;
        const q = recentsSearchQuery.toLowerCase();
        return cachedRecents.filter(e => (e.name || '').toLowerCase().includes(q));
    }

    function updateRecentsCount(count) {
        if (!recentsCount) return;
        recentsCount.textContent = t('recents.count', { count: String(count) });
    }

    function renderRecents(entries) {
        if (!recentList) return;
        recentList.replaceChildren();
        if (!entries.length) {
            const empty = document.createElement('div');
            empty.className = 'recent-empty';
            empty.textContent = t('recent.empty');
            recentList.appendChild(empty);
            updateRecentsCount(0);
            return;
        }

        entries.forEach((entry) => {
            const item = document.createElement('div');
            item.className = 'recent-item';
            item.title = entry.name || '';

            const thumb = document.createElement('img');
            thumb.className = 'recent-thumb';
            thumb.src = entry.thumbDataUrl || '';
            thumb.alt = entry.name || '';
            thumb.loading = 'lazy';

            const name = document.createElement('div');
            name.className = 'recent-name';
            name.textContent = entry.name || '';

            const date = document.createElement('div');
            date.className = 'recent-date';
            date.textContent = formatTime(entry.createdAt);

            const size = document.createElement('div');
            size.className = 'recent-size';
            size.textContent = formatSize(entry.size);

            const del = document.createElement('button');
            del.className = 'recent-delete';
            del.type = 'button';
            del.title = t('recents.delete');
            del.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path><path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path></svg>`;
            del.addEventListener('click', async (event) => {
                event.stopPropagation();
                if (!confirm(t('recents.deleteConfirm'))) return;
                try {
                    await deleteRecentById(entry.id);
                    await refreshRecents();
                } catch (error) {
                    console.warn('Unable to delete recent', error);
                }
            });

            item.appendChild(thumb);
            item.appendChild(name);
            item.appendChild(date);
            item.appendChild(size);
            item.appendChild(del);

            item.addEventListener('click', () => loadRecentEntry(entry));
            recentList.appendChild(item);
        });

        updateRecentsCount(entries.length);
    }

    async function refreshRecents() {
        try {
            cachedRecents = await getRecentEntries(recentsSortOrder);
            const filtered = getFilteredRecents();
            renderRecents(filtered);
        } catch (error) {
            console.warn('Unable to load recents', error);
            cachedRecents = [];
            renderRecents([]);
        }
    }

    async function addRecentEntry(name, processed, source) {
        try {
            const entry = {
                id: createId(),
                name,
                size: processed.size,
                createdAt: Date.now(),
                thumbDataUrl: await createThumbnail(processed),
                blob: processed,
                sourceBlob: source || null
            };
            await saveRecent(entry);
            await pruneRecents();
            if (currentView === 'recents') await refreshRecents();
        } catch (error) {
            console.warn('Unable to save recent', error);
        }
    }

    function loadRecentEntry(entry) {
        setView('restoration');

        processedBlob = entry.blob;
        const sourceBlob = entry.sourceBlob || entry.blob;

        const beforeUrl = URL.createObjectURL(sourceBlob);
        const afterUrl = URL.createObjectURL(entry.blob);
        currentBeforeUrl = setImageSource(imgBefore, beforeUrl, currentBeforeUrl);
        currentAfterUrl = setImageSource(imgAfter, afterUrl, currentAfterUrl);

        showCanvas();
        titleState = { type: 'file', value: entry.name || APP_NAME };
        updateTitle();
        setStatus('edited', Math.round(entry.size / 1024));
        downloadBtn.disabled = false;

        updateSlider(0.5);
        syncOverlay();
    }

    function loadBatchItem(item) {
        if (!item || !item.file) return;
        setView('restoration');

        const beforeUrl = URL.createObjectURL(item.file);
        currentBeforeUrl = setImageSource(imgBefore, beforeUrl, currentBeforeUrl);

        const afterBlob = item.processedBlob || null;
        processedBlob = afterBlob;
        const afterUrl = URL.createObjectURL(afterBlob || item.file);
        currentAfterUrl = setImageSource(imgAfter, afterUrl, currentAfterUrl);

        showCanvas();
        titleState = { type: 'file', value: item.file.name || APP_NAME };
        updateTitle();

        if (afterBlob) {
            setStatus('edited', Math.round(afterBlob.size / 1024));
            downloadBtn.disabled = false;
        } else {
            setStatus(item.status === 'processing' ? 'processing' : 'ready');
            downloadBtn.disabled = true;
        }

        updateSlider(0.5);
        syncOverlay();
    }

    // --- View switching events ---
    if (allPhotosNav) {
        allPhotosNav.addEventListener('click', () => setView('restoration'));
        allPhotosNav.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                setView('restoration');
            }
        });
    }
    if (recentsNav) {
        recentsNav.addEventListener('click', () => setView('recents'));
        recentsNav.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                setView('recents');
            }
        });
    }

    if (recentsSortBtn) {
        recentsSortBtn.addEventListener('click', () => {
            recentsSortOrder = recentsSortOrder === 'desc' ? 'asc' : 'desc';
            recentsSortBtn.textContent = recentsSortOrder === 'desc' ? t('recents.sortNewest') : t('recents.sortOldest');
            refreshRecents();
        });
    }
    if (recentsClearBtn) {
        recentsClearBtn.addEventListener('click', async () => {
            if (!confirm(t('recents.clearConfirm'))) return;
            try {
                await clearAllRecents();
                await refreshRecents();
            } catch (error) {
                console.warn('Unable to clear recents', error);
            }
        });
    }
    if (recentsSearchInput) {
        recentsSearchInput.addEventListener('input', () => {
            recentsSearchQuery = String(recentsSearchInput.value || '').trim();
            renderRecents(getFilteredRecents());
        });
    }
    if (recentsViewListBtn) {
        recentsViewListBtn.addEventListener('click', () => applyRecentsLayout('list'));
    }
    if (recentsViewGridBtn) {
        recentsViewGridBtn.addEventListener('click', () => applyRecentsLayout('grid'));
    }

    // --- Batch Logic ---
    if (batchNav) {
        batchNav.addEventListener('click', () => setView('batch'));
        batchNav.addEventListener('keydown', (e) => {
             if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setView('batch');
            }
        });
    }
    if (batchImportBtn) batchImportBtn.addEventListener('click', () => batchFileInput.click());
    if (batchFileInput) batchFileInput.addEventListener('change', (e) => handleBatchFiles(e.target.files));
    if (batchClearBtn) batchClearBtn.addEventListener('click', clearBatchQueue);
    if (batchDownloadAllBtn) batchDownloadAllBtn.addEventListener('click', downloadAllBatch);

    function handleBatchFiles(files) {
        if (!files || !files.length) return;
        const newItems = Array.from(files).filter(f => f.type.startsWith('image/')).map(file => ({
            id: createId(),
            file,
            status: 'waiting', // waiting, processing, done, error
            processedBlob: null,
            thumbDataUrl: ''
        }));
        batchQueue.push(...newItems);
        renderBatchList();
        // Generate thumbnails in background (do not block UX).
        (async () => {
            await Promise.all(newItems.map(async (item) => {
                try {
                    item.thumbDataUrl = await createThumbnail(item.file);
                } catch {
                    item.thumbDataUrl = '';
                }
            }));
            renderBatchList();
        })();
        processBatchQueue();
        batchFileInput.value = ''; // Reset
    }

    function clearBatchQueue() {
        if (batchQueue.length && !confirm(t('recents.clearConfirm'))) return;
        batchQueue = [];
        renderBatchList();
    }

    async function processBatchQueue() {
        if (isBatchProcessing) return;
        const nextIdx = batchQueue.findIndex(i => i.status === 'waiting');
        if (nextIdx === -1) {
            isBatchProcessing = false;
            updateBatchControls();
            return;
        }

        isBatchProcessing = true;
        const item = batchQueue[nextIdx];
        item.status = 'processing';
        renderBatchList(); // Update status text

        try {
            const blob = await remover.process(item.file);
            item.processedBlob = blob;
            item.status = 'done';
            // Update thumb to processed result (match Recents style).
            createThumbnail(blob).then((dataUrl) => {
                item.thumbDataUrl = dataUrl || item.thumbDataUrl;
                renderBatchList();
            }).catch(() => {});
            // Save to Recents
            addRecentEntry(item.file.name, blob, item.file);
        } catch (e) {
            console.error(e);
            item.status = 'error';
        }

        renderBatchList();
        isBatchProcessing = false;
        // Next
        processBatchQueue();
    }

    function renderBatchList() {
        if (!batchList) return;
        batchList.replaceChildren();

        if (!batchQueue.length) {
            batchEmptyState.style.display = 'flex';
            updateBatchControls();
            if(batchCount) batchCount.textContent = t('batch.count', { count: 0 });
            return;
        }
        batchEmptyState.style.display = 'none';

        const isMobile = window.matchMedia && window.matchMedia('(max-width: 768px)').matches;

        batchQueue.forEach(item => {
            const div = document.createElement('div');
            div.className = 'recent-item';

            const thumb = document.createElement('img');
            thumb.className = 'recent-thumb';
            thumb.src = item.thumbDataUrl || '';
            thumb.alt = item.file?.name || '';
            thumb.loading = 'lazy';
            thumb.addEventListener('click', () => loadBatchItem(item));
            
            // Name
            const name = document.createElement('div');
            name.className = 'recent-name';
            name.textContent = item.file.name;
            name.addEventListener('click', () => loadBatchItem(item));

            const size = document.createElement('div');
            size.className = 'recent-size';
            const sizeBytes = item.processedBlob ? item.processedBlob.size : item.file.size;
            size.textContent = formatSize(sizeBytes);

            // Status
            const status = document.createElement('div');
            status.className = 'recent-col-status';
            status.textContent = t(`batch.status.${item.status}`);
            if (item.status === 'error') status.style.color = 'red';
            if (item.status === 'done') status.style.color = 'var(--accent)';

            // Actions
            const actions = document.createElement('div');
            actions.className = 'recent-col-actions';
            
            if (item.status === 'done') {
                const dlBtn = document.createElement('button');
                dlBtn.className = 'recent-delete'; // Reuse style for icon button (opacity on hover)
                dlBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>`;
                dlBtn.title = t('toolbar.exportShort');
                dlBtn.onclick = (e) => {
                    e.stopPropagation();
                    downloadBlob(item.processedBlob, item.file.name);
                };
                actions.appendChild(dlBtn);
            }

            div.appendChild(thumb);
            div.appendChild(name);

            if (isMobile) {
                const meta = document.createElement('div');
                meta.className = 'batch-meta';
                meta.appendChild(size);
                meta.appendChild(status);
                div.appendChild(meta);
            } else {
                div.appendChild(size);
                div.appendChild(status);
            }

            div.appendChild(actions);
            batchList.appendChild(div);
        });
        
        if(batchCount) batchCount.textContent = t('batch.count', { count: batchQueue.length });
        updateBatchControls();
    }

    function updateBatchControls() {
        if (batchDownloadAllBtn) {
            const hasDone = batchQueue.some(i => i.status === 'done');
            batchDownloadAllBtn.disabled = !hasDone;
        }
    }

    function downloadBlob(blob, filename) {
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.download = `${t('download.prefix')}${filename}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    async function downloadAllBatch() {
        const doneItems = batchQueue.filter(i => i.status === 'done');
        for (const item of doneItems) {
            downloadBlob(item.processedBlob, item.file.name);
            await new Promise(r => setTimeout(r, 200));
        }
    }

    // --- Drag & Drop ---
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.style.background = 'rgba(0,122,255,0.05)';
    });
    dropZone.addEventListener('dragleave', () => {
        dropZone.style.background = '';
    });
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.style.background = '';
        const files = e.dataTransfer.files;
        if (!files || !files.length) return;
        if (files.length === 1) {
            handleFile(files[0]);
            return;
        }
        setView('batch');
        handleBatchFiles(files);
    });

    fileInput.addEventListener('change', (e) => {
        const files = e.target.files;
        if (!files || !files.length) return;
        if (files.length === 1) {
            handleFile(files[0]);
        } else {
            setView('batch');
            handleBatchFiles(files);
        }
        fileInput.value = '';
    });

    async function handleFile(file) {
        if (!file.type.startsWith('image/')) return;
        setView('restoration');
        setStatus('processing');

        try {
            const originalUrl = URL.createObjectURL(file);
            currentBeforeUrl = setImageSource(imgBefore, originalUrl, currentBeforeUrl);
            currentAfterUrl = setImageSource(imgAfter, originalUrl, currentAfterUrl);

            showCanvas();

            processedBlob = await remover.process(file);
            const processedUrl = URL.createObjectURL(processedBlob);
            currentAfterUrl = setImageSource(imgAfter, processedUrl, currentAfterUrl);

            titleState = { type: 'file', value: file.name };
            updateTitle();
            setStatus('edited', Math.round(file.size / 1024));
            downloadBtn.disabled = false;

            updateSlider(0.5);
            syncOverlay();

            addRecentEntry(file.name, processedBlob, file);
        } catch (error) {
            console.error(error);
            const detail = error && error.message ? `\n\n${error.message}` : '';
            alert(`${t('alert.error')}${detail}`);
            resetUI();
        }
    }

    // --- Slider logic ---
    function syncOverlay() {
        if (!compareViewport.offsetWidth) return;
        imgBefore.style.width = `${compareViewport.offsetWidth}px`;
        imgBefore.style.height = `${compareViewport.offsetHeight}px`;
    }
    window.addEventListener('resize', syncOverlay);

    function updateSlider(percent) {
        const p = Math.max(0, Math.min(1, percent));
        const px = compareViewport.offsetWidth * p;
        overlayContainer.style.width = `${px}px`;
        sliderHandle.style.left = `${px}px`;
    }

    sliderHandle.addEventListener('mousedown', () => isDraggingSlider = true);
    window.addEventListener('mouseup', () => isDraggingSlider = false);
    window.addEventListener('mousemove', (e) => {
        if (!isDraggingSlider) return;
        const rect = compareViewport.getBoundingClientRect();
        const x = e.clientX - rect.left;
        updateSlider(x / rect.width);
    });

    sliderHandle.addEventListener('touchstart', (e) => {
        isDraggingSlider = true;
        e.preventDefault();
    }, { passive: false });
    window.addEventListener('touchend', () => isDraggingSlider = false);
    window.addEventListener('touchmove', (e) => {
        if (!isDraggingSlider) return;
        e.preventDefault();
        const rect = compareViewport.getBoundingClientRect();
        const touch = e.touches[0];
        const x = touch.clientX - rect.left;
        updateSlider(x / rect.width);
    }, { passive: false });

    // --- Actions ---
    resetBtn.addEventListener('click', resetUI);

    function resetUI() {
        processedBlob = null;
        fileInput.value = '';
        clearPreview();

        showEmpty();
        titleState = { type: 'default', value: null };
        updateTitle();
        setStatus('ready');
        downloadBtn.disabled = true;
    }

    downloadBtn.addEventListener('click', () => {
        if (!processedBlob) return;
        const link = document.createElement('a');
        const downloadUrl = URL.createObjectURL(processedBlob);
        link.href = downloadUrl;
        link.download = `${t('download.prefix')}${titleState.type === 'file' ? titleState.value : 'image'}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(downloadUrl);
    });

    // Final init
    updateTitle();
    updateStatusText();
    setView('restoration');
});
