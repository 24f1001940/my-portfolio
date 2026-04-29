/**
 * Advanced Google Drive Public Folder Browser
 * A comprehensive file explorer with three-pane layout, search, preview, and more
 * 
 * Features:
 * - Three-pane responsive layout
 * - Real-time search with debouncing
 * - File sorting and filtering
 * - Virtual scrolling for performance
 * - Keyboard shortcuts
 * - Dark/light theme toggle
 * - Context menu actions
 * - Drag and drop support
 * - File preview and details
 * - Accessibility features
 * - Error handling and retry logic
 * - Status updates and notifications
 * 
 * @author Drive Explorer Team
 * @version 2.0
 */

(function() {
    'use strict';

    // ==================== CONFIGURATION ====================
    
    /**
     * Configuration constants
     * Replace with your actual Google Drive API key and folder ID
     */
    const CONFIG = {
        // ⚠️ API_KEY moved to backend proxy for security
        // Use /api/drive endpoint for all requests
        API_KEY: '', // DEPRECATED - use backend proxy
        FOLDER_ID: '1wuCVLOmEvdzQ6G6BbWbvxjjEiMTUFz85', // Public folder ID (reference only)
        API_BASE_URL: '/api/drive',
        MAX_RESULTS: 100,
        DEBOUNCE_DELAY: 300,
        VIRTUAL_SCROLL_THRESHOLD: 50,
        PREVIEW_SUPPORTED_TYPES: {
            image: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'],
            video: ['video/mp4', 'video/webm', 'video/ogg'],
            audio: ['audio/mp3', 'audio/wav', 'audio/ogg'],
            text: ['text/plain', 'text/html', 'text/css', 'text/javascript', 'application/json'],
            document: ['application/pdf']
        },
        MIME_TYPE_ICONS: {
            'application/vnd.google-apps.folder': 'folder',
            'image/': 'image',
            'video/': 'video',
            'audio/': 'audio',
            'text/': 'file-text',
            'application/pdf': 'file-text',
            'application/vnd.google-apps.document': 'file-text',
            'application/vnd.google-apps.spreadsheet': 'file-text',
            'application/vnd.google-apps.presentation': 'file-text',
            'application/zip': 'archive',
            'application/x-zip-compressed': 'archive',
            'application/x-rar-compressed': 'archive',
            'default': 'file'
        }
    };

    // ==================== STATE MANAGEMENT ====================
    
    /**
     * Application state
     */
    const STATE = {
        // Navigation state
        currentFolder: CONFIG.FOLDER_ID,
        breadcrumbs: [{ id: CONFIG.FOLDER_ID, name: 'Home' }],
        folderTree: new Map(),
        
        // File data
        files: [],
        filteredFiles: [],
        selectedFiles: new Set(),
        currentFile: null,
        
        // View state
        viewMode: 'list', // 'list' or 'grid'
        sortBy: 'name',
        sortOrder: 'asc',
        filterType: '',
        searchQuery: '',
        
        // UI state
        isNavCollapsed: false,
        isPreviewCollapsed: false,
        isJsonViewActive: false,
        isLoading: false,
        isOffline: false,
        
        // Theme state
        theme: 'light',
        
        // Virtual scrolling
        virtualScrollOffset: 0,
        virtualScrollHeight: 0,
        visibleItems: [],
        
        // Keyboard navigation
        focusedItemIndex: -1,
        
        // Context menu
        contextMenuVisible: false,
        contextMenuTarget: null,
        
        // Drag and drop
        draggedItem: null,
        dragOverItem: null,
        
        // Error state
        lastError: null,
        retryCount: 0,
        
        // Performance metrics
        lastApiCall: 0,
        apiCallCount: 0
    };

    // ==================== DOM REFERENCES ====================
    
    /**
     * Cached DOM elements for performance
     */
    const DOM = {
        // Header elements
        refreshBtn: null,
        searchInput: null,
        clearSearchBtn: null,
        listViewBtn: null,
        gridViewBtn: null,
        sortSelect: null,
        filterSelect: null,
        themeToggleBtn: null,
        jsonToggleBtn: null,
        aboutBtn: null,
        shortcutsBtn: null,
        
        // Layout elements
        appMain: null,
        navPane: null,
        contentPane: null,
        previewPane: null,
        navCollapseBtn: null,
        previewCloseBtn: null,
        
        // Navigation elements
        folderTree: null,
        breadcrumb: null,
        
        // Content elements
        loadingSkeleton: null,
        fileList: null,
        emptyState: null,
        jsonView: null,
        jsonContent: null,
        
        // Preview elements
        previewPlaceholder: null,
        previewContainer: null,
        
        // Status elements
        statusInfo: null,
        itemCount: null,
        selectedCount: null,
        
        // Modals and overlays
        aboutModal: null,
        shortcutsModal: null,
        contextMenu: null,
        snackbar: null,
        snackbarMessage: null,
        snackbarAction: null,
        snackbarClose: null,
        dragGhost: null,
        
        // Modal close buttons
        modalCloseBtns: null
    };

    // ==================== UTILITY FUNCTIONS ====================
    
    /**
     * Utility functions for common operations
     */
    const Utils = {
        /**
         * Debounce function to limit API calls
         */
        debounce(func, delay) {
            let timeoutId;
            return function(...args) {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => func.apply(this, args), delay);
            };
        },

        /**
         * Throttle function for scroll events
         */
        throttle(func, limit) {
            let inThrottle;
            return function(...args) {
                if (!inThrottle) {
                    func.apply(this, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        },

        /**
         * Format file size in human readable format
         */
        formatFileSize(bytes) {
            if (!bytes || bytes === 0) return '0 B';
            const k = 1024;
            const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        },

        /**
         * Format date in human readable format
         */
        formatDate(dateString) {
            if (!dateString) return 'Unknown';
            const date = new Date(dateString);
            const now = new Date();
            const diff = now - date;
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            
            if (days === 0) return 'Today';
            if (days === 1) return 'Yesterday';
            if (days < 7) return `${days} days ago`;
            if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
            if (days < 365) return `${Math.floor(days / 30)} months ago`;
            return `${Math.floor(days / 365)} years ago`;
        },

        /**
         * Get file type from MIME type
         */
        getFileType(mimeType) {
            if (!mimeType) return 'unknown';
            if (mimeType === 'application/vnd.google-apps.folder') return 'folder';
            if (mimeType.startsWith('image/')) return 'image';
            if (mimeType.startsWith('video/')) return 'video';
            if (mimeType.startsWith('audio/')) return 'audio';
            if (mimeType.startsWith('text/') || mimeType === 'application/json') return 'text';
            if (mimeType === 'application/pdf') return 'document';
            if (mimeType.includes('document') || mimeType.includes('spreadsheet') || mimeType.includes('presentation')) return 'document';
            if (mimeType.includes('zip') || mimeType.includes('rar') || mimeType.includes('archive')) return 'archive';
            return 'file';
        },

        /**
         * Get SVG icon for file type
         */
        getFileIcon(mimeType) {
            const type = this.getFileType(mimeType);
            const icons = {
                folder: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                </svg>`,
                image: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                </svg>`,
                video: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="23 7 16 12 23 17 23 7"></polygon>
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                </svg>`,
                audio: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 18V5l12-2v13"></path>
                    <circle cx="6" cy="18" r="3"></circle>
                    <circle cx="18" cy="16" r="3"></circle>
                </svg>`,
                text: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                </svg>`,
                document: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                </svg>`,
                archive: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="21 8 21 21 3 21 3 8"></polyline>
                    <rect x="1" y="3" width="22" height="5"></rect>
                    <line x1="10" y1="12" x2="14" y2="12"></line>
                </svg>`,
                file: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                </svg>`
            };
            return icons[type] || icons.file;
        },

        /**
         * Escape HTML entities
         */
        escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        },

        /**
         * Generate unique ID
         */
        generateId() {
            return Date.now().toString(36) + Math.random().toString(36).substr(2);
        },

        /**
         * Check if device is mobile
         */
        isMobile() {
            return window.innerWidth <= 768;
        },

        /**
         * Copy text to clipboard
         */
        async copyToClipboard(text) {
            try {
                await navigator.clipboard.writeText(text);
                return true;
            } catch (error) {
                console.error('Failed to copy to clipboard:', error);
                return false;
            }
        },

        /**
         * Check if file type is supported for preview
         */
        isPreviewSupported(mimeType) {
            return Object.values(CONFIG.PREVIEW_SUPPORTED_TYPES).some(types => 
                types.some(type => mimeType.startsWith(type.replace('/', '').replace('*', '')))
            );
        },

        /**
         * Get file extension from name
         */
        getFileExtension(filename) {
            return filename.split('.').pop().toLowerCase();
        },

        /**
         * Validate API key format
         */
        isValidApiKey(key) {
            return key && key.length > 10 && key !== 'YOUR_API_KEY';
        },

        /**
         * Validate folder ID format
         */
        isValidFolderId(id) {
            return id && id.length > 10 && id !== 'YOUR_FOLDER_ID';
        },

        /**
         * Safe JSON parse
         */
        safeJsonParse(str) {
            try {
                return JSON.parse(str);
            } catch (error) {
                return null;
            }
        },

        /**
         * Calculate relative time
         */
        getRelativeTime(date) {
            const now = new Date();
            const diff = now - new Date(date);
            const seconds = Math.floor(diff / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);
            
            if (seconds < 60) return 'Just now';
            if (minutes < 60) return `${minutes}m ago`;
            if (hours < 24) return `${hours}h ago`;
            if (days < 30) return `${days}d ago`;
            return this.formatDate(date);
        }
    };

    // ==================== API FUNCTIONS ====================
    
    /**
     * Google Drive API integration
     */
    const API = {
        /**
         * Make API request with error handling and retry logic
         */
        async makeRequest(endpoint, options = {}) {
            const url = `${CONFIG.API_BASE_URL}${endpoint}`;
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                ...options
            };

            STATE.lastApiCall = Date.now();
            STATE.apiCallCount++;

            try {
                const response = await fetch(url, requestOptions);
                
                if (!response.ok) {
                    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                STATE.isOffline = false;
                STATE.retryCount = 0;
                return data;
            } catch (error) {
                console.error('API request failed:', error);
                STATE.isOffline = true;
                STATE.lastError = error;
                
                if (STATE.retryCount < 3) {
                    STATE.retryCount++;
                    UI.showSnackbar(`Network error. Retrying... (${STATE.retryCount}/3)`, 'Retry', () => {
                        return this.makeRequest(endpoint, options);
                    });
                    
                    // Exponential backoff
                    await new Promise(resolve => setTimeout(resolve, Math.pow(2, STATE.retryCount) * 1000));
                    return this.makeRequest(endpoint, options);
                } else {
                    throw error;
                }
            }
        },

        /**
         * List files in a folder
         */
        async listFiles(folderId, query = '') {
            let q = `'${folderId}' in parents and trashed=false`;
            
            if (query) {
                q += ` and name contains '${query.replace(/'/g, "\\'")}'`;
            }

                        const endpoint = `/files?q=${encodeURIComponent(q)}&fields=files(id,name,mimeType,size,modifiedTime,thumbnailLink,iconLink,webViewLink,webContentLink)&orderBy=name&pageSize=${CONFIG.MAX_RESULTS}`;

            return this.makeRequest(endpoint);
        },

        /**
         * Get file metadata
         */
        async getFileMetadata(fileId) {
            const endpoint = `/files/${fileId}?fields=id,name,mimeType,size,modifiedTime,thumbnailLink,iconLink,webViewLink,webContentLink,parents,owners,permissions`;
            return this.makeRequest(endpoint);
        },

        /**
         * Get file content for preview
         */
        async getFileContent(fileId) {
            const endpoint = `/files/${fileId}?alt=media`;
            const response = await fetch(`${CONFIG.API_BASE_URL}${endpoint}`);

            if (!response.ok) {
                throw new Error(`File content request failed: ${response.status} ${response.statusText}`);
            }

            const contentType = response.headers.get('content-type') || '';
            if (contentType.includes('application/json')) {
                return response.json();
            }

            return response.text();
        },

        /**
         * Search files globally
         */
        async searchFiles(query, folderId = null) {
            let q = `name contains '${query.replace(/'/g, "\\'")}'`;
            
            if (folderId) {
                q += ` and '${folderId}' in parents`;
            }
            
            q += ' and trashed=false';

            const endpoint = `/files?q=${encodeURIComponent(q)}&fields=files(id,name,mimeType,size,modifiedTime,thumbnailLink,iconLink,webViewLink,webContentLink,parents)&orderBy=name&pageSize=${CONFIG.MAX_RESULTS}&supportsAllDrives=true&includeItemsFromAllDrives=true`;

            return this.makeRequest(endpoint);
        },

        /**
         * Get folder tree structure
         */
        async getFolderTree(folderId) {
            const q = `'${folderId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`;
            const endpoint = `/files?q=${encodeURIComponent(q)}&fields=files(id,name,mimeType)&orderBy=name&pageSize=${CONFIG.MAX_RESULTS}&supportsAllDrives=true&includeItemsFromAllDrives=true`;
            
            return this.makeRequest(endpoint);
        }
    };

    // ==================== UI FUNCTIONS ====================
    
    /**
     * User interface management
     */
    const UI = {
        /**
         * Initialize DOM references
         */
        initDOMReferences() {
            // Header elements
            DOM.refreshBtn = document.getElementById('refresh-btn');
            DOM.searchInput = document.getElementById('search-input');
            DOM.clearSearchBtn = document.getElementById('clear-search-btn');
            DOM.listViewBtn = document.getElementById('list-view-btn');
            DOM.gridViewBtn = document.getElementById('grid-view-btn');
            DOM.sortSelect = document.getElementById('sort-select');
            DOM.filterSelect = document.getElementById('filter-select');
            DOM.themeToggleBtn = document.getElementById('theme-toggle-btn');
            DOM.jsonToggleBtn = document.getElementById('json-toggle-btn');
            DOM.aboutBtn = document.getElementById('about-btn');
            DOM.shortcutsBtn = document.getElementById('shortcuts-btn');
            
            // Layout elements
            DOM.appMain = document.querySelector('.app-main');
            DOM.navPane = document.querySelector('.nav-pane');
            DOM.contentPane = document.querySelector('.content-pane');
            DOM.previewPane = document.querySelector('.preview-pane');
            DOM.navCollapseBtn = document.getElementById('nav-collapse-btn');
            DOM.previewCloseBtn = document.getElementById('preview-close-btn');
            
            // Navigation elements
            DOM.folderTree = document.getElementById('folder-tree');
            DOM.breadcrumb = document.getElementById('breadcrumb');
            
            // Content elements
            DOM.loadingSkeleton = document.getElementById('loading-skeleton');
            DOM.fileList = document.getElementById('file-list');
            DOM.emptyState = document.getElementById('empty-state');
            DOM.jsonView = document.getElementById('json-view');
            DOM.jsonContent = document.getElementById('json-content');
            
            // Preview elements
            DOM.previewPlaceholder = document.getElementById('preview-placeholder');
            DOM.previewContainer = document.getElementById('preview-container');
            
            // Status elements
            DOM.statusInfo = document.getElementById('status-info');
            DOM.itemCount = document.getElementById('item-count');
            DOM.selectedCount = document.getElementById('selected-count');
            
            // Modals and overlays
            DOM.aboutModal = document.getElementById('about-modal');
            DOM.shortcutsModal = document.getElementById('shortcuts-modal');
            DOM.contextMenu = document.getElementById('context-menu');
            DOM.snackbar = document.getElementById('snackbar');
            DOM.snackbarMessage = document.getElementById('snackbar-message');
            DOM.snackbarAction = document.getElementById('snackbar-action');
            DOM.snackbarClose = document.getElementById('snackbar-close');
            DOM.dragGhost = document.getElementById('drag-ghost');
            
            // Modal close buttons
            DOM.modalCloseBtns = document.querySelectorAll('.modal-close-btn');
        },

        /**
         * Show loading state
         */
        showLoading(show = true) {
            STATE.isLoading = show;
            DOM.loadingSkeleton.style.display = show ? 'flex' : 'none';
            DOM.fileList.style.display = show ? 'none' : 'block';
            DOM.emptyState.style.display = 'none';
            DOM.jsonView.style.display = STATE.isJsonViewActive && !show ? 'block' : 'none';
            
            if (show) {
                this.updateStatus('Loading files...');
            }
        },

        /**
         * Show empty state
         */
        showEmptyState(message = 'No files found') {
            DOM.loadingSkeleton.style.display = 'none';
            DOM.fileList.style.display = 'none';
            DOM.emptyState.style.display = 'flex';
            DOM.jsonView.style.display = 'none';
            
            const emptyTitle = DOM.emptyState.querySelector('.empty-title');
            if (emptyTitle) {
                emptyTitle.textContent = message;
            }
        },

        /**
         * Render breadcrumb navigation
         */
        renderBreadcrumb() {
            const html = STATE.breadcrumbs.map((crumb, index) => {
                const isLast = index === STATE.breadcrumbs.length - 1;
                return `
                    <li class="breadcrumb-item">
                        <span class="breadcrumb-link ${isLast ? 'current' : ''}" 
                              data-folder-id="${crumb.id}" 
                              data-index="${index}"
                              ${!isLast ? 'role="button" tabindex="0"' : ''}>
                            ${Utils.escapeHtml(crumb.name)}
                        </span>
                        ${!isLast ? '<span class="breadcrumb-separator">›</span>' : ''}
                    </li>
                `;
            }).join('');
            
            DOM.breadcrumb.innerHTML = html;
        },

        /**
         * Render file list
         */
        renderFileList() {
            if (!STATE.filteredFiles.length) {
                this.showEmptyState();
                return;
            }

            DOM.loadingSkeleton.style.display = 'none';
            DOM.fileList.style.display = 'block';
            DOM.emptyState.style.display = 'none';
            
            // Update view mode classes
            DOM.fileList.className = `file-list ${STATE.viewMode}-view`;
            
            // Render files
            const html = STATE.filteredFiles.map((file, index) => {
                const isSelected = STATE.selectedFiles.has(file.id);
                const fileType = Utils.getFileType(file.mimeType);
                const fileIcon = Utils.getFileIcon(file.mimeType);
                
                return `
                    <div class="file-item ${isSelected ? 'selected' : ''}" 
                         data-file-id="${file.id}"
                         data-file-name="${Utils.escapeHtml(file.name)}"
                         data-file-type="${fileType}"
                         data-mime-type="${file.mimeType}"
                         data-index="${index}"
                         role="button"
                         tabindex="0"
                         aria-selected="${isSelected}"
                         draggable="true">
                        
                        <div class="file-icon ${fileType}">
                            ${fileIcon}
                        </div>
                        
                        <div class="file-content">
                            <div class="file-name">${Utils.escapeHtml(file.name)}</div>
                            <div class="file-details">
                                <span class="file-size">${file.size ? Utils.formatFileSize(file.size) : ''}</span>
                                <span class="file-modified">${Utils.formatDate(file.modifiedTime)}</span>
                            </div>
                        </div>
                        
                        <div class="file-actions">
                            <button class="file-action-btn" 
                                    data-action="preview" 
                                    title="Preview"
                                    aria-label="Preview file">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                    <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                            </button>
                            <button class="file-action-btn" 
                                    data-action="download" 
                                    title="Download"
                                    aria-label="Download file">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                    <polyline points="7 10 12 15 17 10"></polyline>
                                    <line x1="12" y1="15" x2="12" y2="3"></line>
                                </svg>
                            </button>
                        </div>
                    </div>
                `;
            }).join('');
            
            DOM.fileList.innerHTML = html;
            
            // Update status
            this.updateStatus('Ready');
            this.updateItemCount();
        },

        /**
         * Render folder tree
         */
        async renderFolderTree() {
            try {
                const rootFolder = { id: CONFIG.FOLDER_ID, name: 'Home', children: [] };
                const subfolders = await API.getFolderTree(CONFIG.FOLDER_ID);
                
                if (subfolders.files) {
                    rootFolder.children = subfolders.files;
                }
                
                const html = this.renderFolderTreeNode(rootFolder, 0, true);
                DOM.folderTree.innerHTML = html;
            } catch (error) {
                console.error('Failed to render folder tree:', error);
                DOM.folderTree.innerHTML = '<div class="folder-tree-error">Failed to load folder tree</div>';
            }
        },

        /**
         * Render folder tree node
         */
        renderFolderTreeNode(folder, level, isExpanded = false) {
            const hasChildren = folder.children && folder.children.length > 0;
            const isActive = folder.id === STATE.currentFolder;
            
            let html = `
                <div class="folder-tree-item">
                    <div class="folder-tree-node ${isActive ? 'active' : ''}" 
                         data-folder-id="${folder.id}"
                         data-folder-name="${Utils.escapeHtml(folder.name)}"
                         role="treeitem"
                         aria-expanded="${isExpanded}"
                         aria-level="${level + 1}"
                         tabindex="0"
                         style="padding-left: ${level * 20}px;">
                        
                        ${hasChildren ? `
                            <button class="folder-tree-toggle ${isExpanded ? 'expanded' : ''}" 
                                    aria-label="Toggle folder">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                            </button>
                        ` : '<span style="width: 16px; margin-right: 4px;"></span>'}
                        
                        <div class="folder-tree-icon">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                            </svg>
                        </div>
                        
                        <span class="folder-tree-name">${Utils.escapeHtml(folder.name)}</span>
                    </div>
                    
                    ${hasChildren && isExpanded ? `
                        <div class="folder-tree-children">
                            ${folder.children.map(child => this.renderFolderTreeNode(child, level + 1, false)).join('')}
                        </div>
                    ` : ''}
                </div>
            `;
            
            return html;
        },

        /**
         * Update status bar
         */
        updateStatus(message, type = 'info') {
            DOM.statusInfo.innerHTML = `
                <span class="status-indicator ${type}"></span>
                ${message}
            `;
        },

        /**
         * Update item count
         */
        updateItemCount() {
            const totalCount = STATE.filteredFiles.length;
            const selectedCount = STATE.selectedFiles.size;
            
            DOM.itemCount.textContent = `${totalCount} item${totalCount !== 1 ? 's' : ''}`;
            
            if (selectedCount > 0) {
                DOM.selectedCount.textContent = `${selectedCount} selected`;
                DOM.selectedCount.style.display = 'block';
            } else {
                DOM.selectedCount.style.display = 'none';
            }
        },

        /**
         * Show file preview
         */
        async showPreview(file) {
            STATE.currentFile = file;
            
            // Hide placeholder, show container
            DOM.previewPlaceholder.style.display = 'none';
            DOM.previewContainer.style.display = 'block';
            
            // Generate preview content
            let previewHTML = '';
            
            // File details
            previewHTML += `
                <div class="preview-details">
                    <h3>File Details</h3>
                    <ul class="preview-details-list">
                        <li class="preview-details-item">
                            <span class="preview-details-label">Name:</span>
                            <span class="preview-details-value">${Utils.escapeHtml(file.name)}</span>
                        </li>
                        <li class="preview-details-item">
                            <span class="preview-details-label">Type:</span>
                            <span class="preview-details-value">${Utils.getFileType(file.mimeType)}</span>
                        </li>
                        <li class="preview-details-item">
                            <span class="preview-details-label">Size:</span>
                            <span class="preview-details-value">${file.size ? Utils.formatFileSize(file.size) : 'Unknown'}</span>
                        </li>
                        <li class="preview-details-item">
                            <span class="preview-details-label">Modified:</span>
                            <span class="preview-details-value">${Utils.formatDate(file.modifiedTime)}</span>
                        </li>
                    </ul>
                </div>
            `;
            
            // Preview content based on file type
            const fileType = Utils.getFileType(file.mimeType);
            
            if (fileType === 'image' && file.thumbnailLink) {
                previewHTML += `
                    <div class="preview-image-container">
                        <img src="${file.thumbnailLink}" 
                             alt="${Utils.escapeHtml(file.name)}" 
                             class="preview-image"
                             loading="lazy">
                    </div>
                `;
            } else if (fileType === 'video' && file.webViewLink) {
                previewHTML += `
                    <div class="preview-video-container">
                        <iframe src="${file.webViewLink}" 
                                class="preview-iframe"
                                frameborder="0"
                                allowfullscreen>
                        </iframe>
                    </div>
                `;
            } else if (file.webViewLink) {
                previewHTML += `
                    <div class="preview-iframe-container">
                        <iframe src="${file.webViewLink}" 
                                class="preview-iframe"
                                frameborder="0">
                        </iframe>
                    </div>
                `;
            }
            
            // Action buttons
            previewHTML += `
                <div class="preview-actions">
                    ${file.webViewLink ? `
                        <a href="${file.webViewLink}" 
                           target="_blank" 
                           class="preview-action-btn primary">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                <polyline points="15 3 21 3 21 9"></polyline>
                                <line x1="10" y1="14" x2="21" y2="3"></line>
                            </svg>
                            Open
                        </a>
                    ` : ''}
                    
                    ${file.webContentLink ? `
                        <a href="${file.webContentLink}" 
                           target="_blank" 
                           class="preview-action-btn">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="7 10 12 15 17 10"></polyline>
                                <line x1="12" y1="15" x2="12" y2="3"></line>
                            </svg>
                            Download
                        </a>
                    ` : ''}
                </div>
            `;
            
            DOM.previewContainer.innerHTML = previewHTML;
            
            // Show preview pane if collapsed
            if (STATE.isPreviewCollapsed) {
                this.togglePreviewPane();
            }
        },

        /**
         * Hide file preview
         */
        hidePreview() {
            STATE.currentFile = null;
            DOM.previewPlaceholder.style.display = 'flex';
            DOM.previewContainer.style.display = 'none';
            DOM.previewContainer.innerHTML = '';
        },

        /**
         * Toggle view mode
         */
        toggleViewMode(mode) {
            STATE.viewMode = mode;
            
            // Update button states
            DOM.listViewBtn.classList.toggle('active', mode === 'list');
            DOM.gridViewBtn.classList.toggle('active', mode === 'grid');
            
            // Update aria-pressed attributes
            DOM.listViewBtn.setAttribute('aria-pressed', mode === 'list');
            DOM.gridViewBtn.setAttribute('aria-pressed', mode === 'grid');
            
            // Re-render file list
            this.renderFileList();
        },

        /**
         * Toggle navigation pane
         */
        toggleNavPane() {
            STATE.isNavCollapsed = !STATE.isNavCollapsed;
            DOM.appMain.classList.toggle('nav-collapsed', STATE.isNavCollapsed);
            
            // Update button icon
            const icon = DOM.navCollapseBtn.querySelector('svg');
            icon.innerHTML = STATE.isNavCollapsed ? 
                '<polyline points="9 18 15 12 9 6"></polyline>' : 
                '<polyline points="15 18 9 12 15 6"></polyline>';
        },

        /**
         * Toggle preview pane
         */
        togglePreviewPane() {
            STATE.isPreviewCollapsed = !STATE.isPreviewCollapsed;
            DOM.appMain.classList.toggle('preview-collapsed', STATE.isPreviewCollapsed);
        },

        /**
         * Toggle JSON view
         */
        toggleJsonView() {
            STATE.isJsonViewActive = !STATE.isJsonViewActive;
            
            DOM.jsonToggleBtn.classList.toggle('active', STATE.isJsonViewActive);
            
            if (STATE.isJsonViewActive) {
                DOM.fileList.style.display = 'none';
                DOM.emptyState.style.display = 'none';
                DOM.jsonView.style.display = 'block';
                
                // Format and display JSON
                const jsonData = {
                    files: STATE.filteredFiles,
                    metadata: {
                        totalFiles: STATE.files.length,
                        filteredFiles: STATE.filteredFiles.length,
                        currentFolder: STATE.currentFolder,
                        breadcrumbs: STATE.breadcrumbs,
                        viewMode: STATE.viewMode,
                        sortBy: STATE.sortBy,
                        searchQuery: STATE.searchQuery
                    }
                };
                
                DOM.jsonContent.textContent = JSON.stringify(jsonData, null, 2);
            } else {
                DOM.jsonView.style.display = 'none';
                if (STATE.filteredFiles.length) {
                    DOM.fileList.style.display = 'block';
                } else {
                    DOM.emptyState.style.display = 'flex';
                }
            }
        },

        /**
         * Toggle theme
         */
        toggleTheme() {
            STATE.theme = STATE.theme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', STATE.theme);
            
            // Update button aria-label
            DOM.themeToggleBtn.setAttribute('aria-label', 
                STATE.theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'
            );
            
            this.updateStatus(`Switched to ${STATE.theme} theme`);
        },

        /**
         * Show context menu
         */
        showContextMenu(x, y, file) {
            STATE.contextMenuTarget = file;
            STATE.contextMenuVisible = true;
            
            DOM.contextMenu.style.display = 'block';
            DOM.contextMenu.style.left = `${x}px`;
            DOM.contextMenu.style.top = `${y}px`;
            
            // Adjust position if menu goes off screen
            const rect = DOM.contextMenu.getBoundingClientRect();
            if (rect.right > window.innerWidth) {
                DOM.contextMenu.style.left = `${x - rect.width}px`;
            }
            if (rect.bottom > window.innerHeight) {
                DOM.contextMenu.style.top = `${y - rect.height}px`;
            }
            
            // Focus first item
            const firstItem = DOM.contextMenu.querySelector('.context-menu-item');
            if (firstItem) {
                firstItem.focus();
            }
        },

        /**
         * Hide context menu
         */
        hideContextMenu() {
            STATE.contextMenuVisible = false;
            STATE.contextMenuTarget = null;
            DOM.contextMenu.style.display = 'none';
        },

        /**
         * Show modal
         */
        showModal(modalElement) {
            modalElement.style.display = 'flex';
            modalElement.setAttribute('aria-hidden', 'false');
            
            // Focus first focusable element
            const focusableElements = modalElement.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            if (focusableElements.length) {
                focusableElements[0].focus();
            }
            
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        },

        /**
         * Hide modal
         */
        hideModal(modalElement) {
            modalElement.style.display = 'none';
            modalElement.setAttribute('aria-hidden', 'true');
            
            // Restore body scroll
            document.body.style.overflow = '';
        },

        /**
         * Show snackbar notification
         */
        showSnackbar(message, actionText = null, actionHandler = null) {
            DOM.snackbarMessage.textContent = message;
            
            if (actionText && actionHandler) {
                DOM.snackbarAction.textContent = actionText;
                DOM.snackbarAction.style.display = 'block';
                DOM.snackbarAction.onclick = actionHandler;
            } else {
                DOM.snackbarAction.style.display = 'none';
                DOM.snackbarAction.onclick = null;
            }
            
            DOM.snackbar.style.display = 'block';
            
            // Auto-hide after 5 seconds
            setTimeout(() => {
                if (DOM.snackbar.style.display === 'block') {
                    this.hideSnackbar();
                }
            }, 5000);
        },

        /**
         * Hide snackbar
         */
        hideSnackbar() {
            DOM.snackbar.style.display = 'none';
            DOM.snackbarAction.onclick = null;
        },

        /**
         * Update drag ghost
         */
        updateDragGhost(x, y, text) {
            DOM.dragGhost.style.display = 'block';
            DOM.dragGhost.style.left = `${x + 10}px`;
            DOM.dragGhost.style.top = `${y + 10}px`;
            DOM.dragGhost.textContent = text;
        },

        /**
         * Hide drag ghost
         */
        hideDragGhost() {
            DOM.dragGhost.style.display = 'none';
        }
    };

    // ==================== FILE OPERATIONS ====================
    
    /**
     * File operations and management
     */
    const FileManager = {
        /**
         * Load files from current folder
         */
        async loadFiles(folderId = STATE.currentFolder, searchQuery = STATE.searchQuery) {
            try {
                UI.showLoading(true);
                
                const response = await API.listFiles(folderId, searchQuery);
                STATE.files = response.files || [];
                
                // Apply sorting and filtering
                this.sortFiles();
                this.filterFiles();
                
                UI.renderFileList();
                UI.updateItemCount();
                
                // Update JSON view if active
                if (STATE.isJsonViewActive) {
                    UI.toggleJsonView();
                    UI.toggleJsonView();
                }
                
            } catch (error) {
                console.error('Failed to load files:', error);
                UI.showEmptyState('Failed to load files');
                UI.updateStatus('Error loading files', 'error');
                
                if (error.message.includes('API key')) {
                    UI.showSnackbar('Please configure your Google Drive API key', 'Learn More', () => {
                        window.open('https://developers.google.com/drive/api/v3/quickstart/js', '_blank');
                    });
                } else {
                    UI.showSnackbar('Failed to load files. Check your internet connection.', 'Retry', () => {
                        this.loadFiles(folderId, searchQuery);
                    });
                }
            } finally {
                UI.showLoading(false);
            }
        },

        /**
         * Navigate to folder
         */
        async navigateToFolder(folderId, folderName) {
            if (folderId === STATE.currentFolder) return;
            
            try {
                STATE.currentFolder = folderId;
                
                // Update breadcrumbs
                const existingIndex = STATE.breadcrumbs.findIndex(b => b.id === folderId);
                if (existingIndex >= 0) {
                    // Navigate back to existing folder
                    STATE.breadcrumbs = STATE.breadcrumbs.slice(0, existingIndex + 1);
                } else {
                    // Navigate to new folder
                    STATE.breadcrumbs.push({ id: folderId, name: folderName });
                }
                
                // Clear selection and search
                STATE.selectedFiles.clear();
                STATE.searchQuery = '';
                DOM.searchInput.value = '';
                DOM.clearSearchBtn.style.display = 'none';
                
                // Load files and update UI
                await this.loadFiles(folderId);
                UI.renderBreadcrumb();
                UI.hidePreview();
                
                // Update folder tree
                UI.renderFolderTree();
                
                UI.updateStatus(`Navigated to ${folderName}`);
                
            } catch (error) {
                console.error('Failed to navigate to folder:', error);
                UI.showSnackbar('Failed to navigate to folder');
            }
        },

        /**
         * Sort files
         */
        sortFiles() {
            const sortBy = STATE.sortBy;
            const order = STATE.sortOrder === 'asc' ? 1 : -1;
            
            STATE.files.sort((a, b) => {
                // Always put folders first
                if (a.mimeType === 'application/vnd.google-apps.folder' && b.mimeType !== 'application/vnd.google-apps.folder') {
                    return -1;
                }
                if (b.mimeType === 'application/vnd.google-apps.folder' && a.mimeType !== 'application/vnd.google-apps.folder') {
                    return 1;
                }
                
                let aValue, bValue;
                
                switch (sortBy) {
                    case 'name':
                        aValue = a.name.toLowerCase();
                        bValue = b.name.toLowerCase();
                        break;
                    case 'modified':
                        aValue = new Date(a.modifiedTime || 0);
                        bValue = new Date(b.modifiedTime || 0);
                        break;
                    case 'size':
                        aValue = parseInt(a.size || 0);
                        bValue = parseInt(b.size || 0);
                        break;
                    case 'type':
                        aValue = Utils.getFileType(a.mimeType);
                        bValue = Utils.getFileType(b.mimeType);
                        break;
                    default:
                        aValue = a.name.toLowerCase();
                        bValue = b.name.toLowerCase();
                }
                
                if (aValue < bValue) return -1 * order;
                if (aValue > bValue) return 1 * order;
                return 0;
            });
        },

        /**
         * Filter files
         */
        filterFiles() {
            let filtered = [...STATE.files];
            
            // Apply type filter
            if (STATE.filterType) {
                filtered = filtered.filter(file => {
                    const fileType = Utils.getFileType(file.mimeType);
                    return fileType === STATE.filterType;
                });
            }
            
            // Apply search filter
            if (STATE.searchQuery) {
                const query = STATE.searchQuery.toLowerCase();
                filtered = filtered.filter(file => 
                    file.name.toLowerCase().includes(query)
                );
            }
            
            STATE.filteredFiles = filtered;
        },

        /**
         * Search files
         */
        async searchFiles(query) {
            STATE.searchQuery = query;
            
            if (!query.trim()) {
                DOM.clearSearchBtn.style.display = 'none';
                this.filterFiles();
                UI.renderFileList();
                return;
            }
            
            DOM.clearSearchBtn.style.display = 'block';
            
            try {
                // First, filter current files
                this.filterFiles();
                UI.renderFileList();
                
                // Then, optionally search globally (if needed)
                // This is commented out to avoid too many API calls
                // const response = await API.searchFiles(query, STATE.currentFolder);
                // STATE.files = response.files || [];
                // this.sortFiles();
                // this.filterFiles();
                // UI.renderFileList();
                
            } catch (error) {
                console.error('Search failed:', error);
                UI.showSnackbar('Search failed. Please try again.');
            }
        },

        /**
         * Clear search
         */
        clearSearch() {
            STATE.searchQuery = '';
            DOM.searchInput.value = '';
            DOM.clearSearchBtn.style.display = 'none';
            
            this.filterFiles();
            UI.renderFileList();
        },

        /**
         * Select file
         */
        selectFile(fileId, multiSelect = false) {
            if (multiSelect) {
                if (STATE.selectedFiles.has(fileId)) {
                    STATE.selectedFiles.delete(fileId);
                } else {
                    STATE.selectedFiles.add(fileId);
                }
            } else {
                STATE.selectedFiles.clear();
                STATE.selectedFiles.add(fileId);
            }
            
            // Update UI
            this.updateFileSelection();
            UI.updateItemCount();
        },

        /**
         * Update file selection UI
         */
        updateFileSelection() {
            const fileItems = DOM.fileList.querySelectorAll('.file-item');
            fileItems.forEach(item => {
                const fileId = item.dataset.fileId;
                const isSelected = STATE.selectedFiles.has(fileId);
                
                item.classList.toggle('selected', isSelected);
                item.setAttribute('aria-selected', isSelected);
            });
        },

        /**
         * Open file
         */
        openFile(file) {
            if (file.mimeType === 'application/vnd.google-apps.folder') {
                // Navigate to folder
                this.navigateToFolder(file.id, file.name);
            } else {
                // Show preview
                UI.showPreview(file);
            }
        },

        /**
         * Download file
         */
        downloadFile(file) {
            if (file.webContentLink) {
                window.open(file.webContentLink, '_blank');
                UI.showSnackbar(`Downloading ${file.name}...`);
            } else {
                UI.showSnackbar('Download not available for this file type');
            }
        },

        /**
         * Copy file link
         */
        async copyFileLink(file) {
            const link = file.webViewLink || `https://drive.google.com/file/d/${file.id}/view`;
            const success = await Utils.copyToClipboard(link);
            
            if (success) {
                UI.showSnackbar('Link copied to clipboard');
            } else {
                UI.showSnackbar('Failed to copy link');
            }
        },

        /**
         * Open file in Google Drive
         */
        openInDrive(file) {
            const driveUrl = `https://drive.google.com/file/d/${file.id}/view`;
            window.open(driveUrl, '_blank');
        },

        /**
         * Refresh current folder
         */
        async refresh() {
            UI.updateStatus('Refreshing...');
            await this.loadFiles(STATE.currentFolder, STATE.searchQuery);
            UI.showSnackbar('Folder refreshed');
        }
    };

    // ==================== EVENT HANDLERS ====================
    
    /**
     * Event handling and user interactions
     */
    const EventHandlers = {
        /**
         * Initialize all event listeners
         */
        init() {
            this.initHeaderEvents();
            this.initNavigationEvents();
            this.initFileListEvents();
            this.initPreviewEvents();
            this.initModalEvents();
            this.initKeyboardEvents();
            this.initDragDropEvents();
            this.initContextMenuEvents();
            this.initResizeEvents();
        },

        /**
         * Header toolbar events
         */
        initHeaderEvents() {
            // Refresh button
            DOM.refreshBtn?.addEventListener('click', () => {
                FileManager.refresh();
            });

            // Search input
            const debouncedSearch = Utils.debounce((query) => {
                FileManager.searchFiles(query);
            }, CONFIG.DEBOUNCE_DELAY);

            DOM.searchInput?.addEventListener('input', (e) => {
                debouncedSearch(e.target.value);
            });

            DOM.searchInput?.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    FileManager.clearSearch();
                }
            });

            // Clear search button
            DOM.clearSearchBtn?.addEventListener('click', () => {
                FileManager.clearSearch();
            });

            // View toggle buttons
            DOM.listViewBtn?.addEventListener('click', () => {
                UI.toggleViewMode('list');
            });

            DOM.gridViewBtn?.addEventListener('click', () => {
                UI.toggleViewMode('grid');
            });

            // Sort select
            DOM.sortSelect?.addEventListener('change', (e) => {
                const [sortBy, order] = e.target.value.split('-');
                STATE.sortBy = sortBy;
                STATE.sortOrder = order || 'asc';
                
                FileManager.sortFiles();
                FileManager.filterFiles();
                UI.renderFileList();
            });

            // Filter select
            DOM.filterSelect?.addEventListener('change', (e) => {
                STATE.filterType = e.target.value;
                FileManager.filterFiles();
                UI.renderFileList();
            });

            // Theme toggle
            DOM.themeToggleBtn?.addEventListener('click', () => {
                UI.toggleTheme();
            });

            // JSON toggle
            DOM.jsonToggleBtn?.addEventListener('click', () => {
                UI.toggleJsonView();
            });

            // About button
            DOM.aboutBtn?.addEventListener('click', () => {
                UI.showModal(DOM.aboutModal);
            });

            // Shortcuts button
            DOM.shortcutsBtn?.addEventListener('click', () => {
                UI.showModal(DOM.shortcutsModal);
            });
        },

        /**
         * Navigation events
         */
        initNavigationEvents() {
            // Navigation collapse button
            DOM.navCollapseBtn?.addEventListener('click', () => {
                UI.toggleNavPane();
            });

            // Breadcrumb navigation
            DOM.breadcrumb?.addEventListener('click', (e) => {
                const link = e.target.closest('.breadcrumb-link');
                if (link && !link.classList.contains('current')) {
                    const folderId = link.dataset.folderId;
                    const folderName = link.textContent.trim();
                    FileManager.navigateToFolder(folderId, folderName);
                }
            });

            // Folder tree navigation
            DOM.folderTree?.addEventListener('click', (e) => {
                const node = e.target.closest('.folder-tree-node');
                const toggle = e.target.closest('.folder-tree-toggle');
                
                if (toggle) {
                    // Toggle folder expansion
                    toggle.classList.toggle('expanded');
                    const children = node.parentElement.querySelector('.folder-tree-children');
                    if (children) {
                        children.style.display = toggle.classList.contains('expanded') ? 'block' : 'none';
                    }
                } else if (node) {
                    // Navigate to folder
                    const folderId = node.dataset.folderId;
                    const folderName = node.dataset.folderName;
                    FileManager.navigateToFolder(folderId, folderName);
                }
            });
        },

        /**
         * File list events
         */
        initFileListEvents() {
            DOM.fileList?.addEventListener('click', (e) => {
                const fileItem = e.target.closest('.file-item');
                if (!fileItem) return;

                const fileId = fileItem.dataset.fileId;
                const file = STATE.filteredFiles.find(f => f.id === fileId);
                if (!file) return;

                // Handle action buttons
                const actionBtn = e.target.closest('.file-action-btn');
                if (actionBtn) {
                    const action = actionBtn.dataset.action;
                    this.handleFileAction(action, file);
                    return;
                }

                // Handle file selection/opening
                const isMultiSelect = e.ctrlKey || e.metaKey;
                
                if (isMultiSelect) {
                    FileManager.selectFile(fileId, true);
                } else {
                    FileManager.openFile(file);
                }
            });

            // Double-click to open
            DOM.fileList?.addEventListener('dblclick', (e) => {
                const fileItem = e.target.closest('.file-item');
                if (!fileItem) return;

                const fileId = fileItem.dataset.fileId;
                const file = STATE.filteredFiles.find(f => f.id === fileId);
                if (file) {
                    FileManager.openFile(file);
                }
            });
        },

        /**
         * Preview pane events
         */
        initPreviewEvents() {
            // Preview close button
            DOM.previewCloseBtn?.addEventListener('click', () => {
                UI.togglePreviewPane();
            });
        },

        /**
         * Modal events
         */
        initModalEvents() {
            // Modal close buttons
            DOM.modalCloseBtns?.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const modal = e.target.closest('.modal-overlay');
                    if (modal) {
                        UI.hideModal(modal);
                    }
                });
            });

            // Modal overlay clicks
            [DOM.aboutModal, DOM.shortcutsModal].forEach(modal => {
                modal?.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        UI.hideModal(modal);
                    }
                });
            });

            // Snackbar close
            DOM.snackbarClose?.addEventListener('click', () => {
                UI.hideSnackbar();
            });
        },

        /**
         * Keyboard events
         */
        initKeyboardEvents() {
            document.addEventListener('keydown', (e) => {
                // Global shortcuts
                if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
                    e.preventDefault();
                    DOM.searchInput?.focus();
                    return;
                }

                if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
                    e.preventDefault();
                    UI.showModal(DOM.shortcutsModal);
                    return;
                }

                if (e.key === 'Escape') {
                    // Close modals, context menu, etc.
                    if (STATE.contextMenuVisible) {
                        UI.hideContextMenu();
                    } else if (DOM.aboutModal?.style.display === 'flex') {
                        UI.hideModal(DOM.aboutModal);
                    } else if (DOM.shortcutsModal?.style.display === 'flex') {
                        UI.hideModal(DOM.shortcutsModal);
                    } else if (DOM.searchInput?.value) {
                        FileManager.clearSearch();
                    }
                    return;
                }

                // Ctrl/Cmd shortcuts
                if (e.ctrlKey || e.metaKey) {
                    switch (e.key) {
                        case 'r':
                            e.preventDefault();
                            FileManager.refresh();
                            break;
                        case 'd':
                            e.preventDefault();
                            UI.toggleTheme();
                            break;
                        case 'l':
                            e.preventDefault();
                            UI.toggleViewMode('list');
                            break;
                        case 'g':
                            e.preventDefault();
                            UI.toggleViewMode('grid');
                            break;
                        case 'a':
                            e.preventDefault();
                            // Select all files
                            STATE.filteredFiles.forEach(file => {
                                STATE.selectedFiles.add(file.id);
                            });
                            FileManager.updateFileSelection();
                            UI.updateItemCount();
                            break;
                    }
                }

                // File list navigation
                if (document.activeElement === DOM.fileList || DOM.fileList?.contains(document.activeElement)) {
                    this.handleFileListKeyboard(e);
                }
            });
        },

        /**
         * Handle file list keyboard navigation
         */
        handleFileListKeyboard(e) {
            const fileItems = DOM.fileList.querySelectorAll('.file-item');
            if (!fileItems.length) return;

            switch (e.key) {
                case 'ArrowUp':
                    e.preventDefault();
                    STATE.focusedItemIndex = Math.max(0, STATE.focusedItemIndex - 1);
                    this.updateFocusedItem(fileItems);
                    break;
                
                case 'ArrowDown':
                    e.preventDefault();
                    STATE.focusedItemIndex = Math.min(fileItems.length - 1, STATE.focusedItemIndex + 1);
                    this.updateFocusedItem(fileItems);
                    break;
                
                case 'Enter':
                case ' ':
                    e.preventDefault();
                    if (STATE.focusedItemIndex >= 0) {
                        const item = fileItems[STATE.focusedItemIndex];
                        const fileId = item.dataset.fileId;
                        const file = STATE.filteredFiles.find(f => f.id === fileId);
                        if (file) {
                            if (e.key === 'Enter') {
                                FileManager.openFile(file);
                            } else {
                                UI.showPreview(file);
                            }
                        }
                    }
                    break;
            }
        },

        /**
         * Update focused item
         */
        updateFocusedItem(fileItems) {
            fileItems.forEach((item, index) => {
                item.classList.toggle('focused', index === STATE.focusedItemIndex);
                if (index === STATE.focusedItemIndex) {
                    item.focus();
                    item.scrollIntoView({ block: 'nearest' });
                }
            });
        },

        /**
         * Drag and drop events
         */
        initDragDropEvents() {
            DOM.fileList?.addEventListener('dragstart', (e) => {
                const fileItem = e.target.closest('.file-item');
                if (!fileItem) return;

                const fileId = fileItem.dataset.fileId;
                const fileName = fileItem.dataset.fileName;
                
                STATE.draggedItem = { id: fileId, name: fileName };
                fileItem.classList.add('dragging');
                
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/plain', fileName);
            });

            DOM.fileList?.addEventListener('dragend', (e) => {
                const fileItem = e.target.closest('.file-item');
                if (fileItem) {
                    fileItem.classList.remove('dragging');
                }
                
                STATE.draggedItem = null;
                UI.hideDragGhost();
            });

            DOM.fileList?.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
            });

            DOM.fileList?.addEventListener('drop', (e) => {
                e.preventDefault();
                // Handle drop logic here (visual only for read-only implementation)
                UI.showSnackbar('Drag and drop reordering is visual only in read-only mode');
            });

            // Drag ghost
            document.addEventListener('dragover', (e) => {
                if (STATE.draggedItem) {
                    UI.updateDragGhost(e.clientX, e.clientY, STATE.draggedItem.name);
                }
            });
        },

        /**
         * Context menu events
         */
        initContextMenuEvents() {
            // Show context menu
            DOM.fileList?.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                
                const fileItem = e.target.closest('.file-item');
                if (!fileItem) return;

                const fileId = fileItem.dataset.fileId;
                const file = STATE.filteredFiles.find(f => f.id === fileId);
                if (file) {
                    UI.showContextMenu(e.clientX, e.clientY, file);
                }
            });

            // Context menu item clicks
            DOM.contextMenu?.addEventListener('click', (e) => {
                const menuItem = e.target.closest('.context-menu-item');
                if (!menuItem || !STATE.contextMenuTarget) return;

                const action = menuItem.dataset.action;
                this.handleFileAction(action, STATE.contextMenuTarget);
                UI.hideContextMenu();
            });

            // Hide context menu on outside click
            document.addEventListener('click', (e) => {
                if (STATE.contextMenuVisible && !DOM.contextMenu?.contains(e.target)) {
                    UI.hideContextMenu();
                }
            });
        },

        /**
         * Handle file actions
         */
        handleFileAction(action, file) {
            switch (action) {
                case 'open':
                    FileManager.openFile(file);
                    break;
                case 'preview':
                    UI.showPreview(file);
                    break;
                case 'download':
                    FileManager.downloadFile(file);
                    break;
                case 'copy-link':
                    FileManager.copyFileLink(file);
                    break;
                case 'open-drive':
                    FileManager.openInDrive(file);
                    break;
                case 'select':
                    FileManager.selectFile(file.id, true);
                    break;
            }
        },

        /**
         * Resize events
         */
        initResizeEvents() {
            const debouncedResize = Utils.debounce(() => {
                // Handle responsive layout changes
                if (Utils.isMobile()) {
                    STATE.isNavCollapsed = true;
                    STATE.isPreviewCollapsed = true;
                    DOM.appMain.classList.add('nav-collapsed', 'preview-collapsed');
                }
                
                // Re-render file list for grid view
                if (STATE.viewMode === 'grid') {
                    UI.renderFileList();
                }
            }, 250);

            window.addEventListener('resize', debouncedResize);
        }
    };

    // ==================== INITIALIZATION ====================
    
    /**
     * Application initialization
     */
    const App = {
        /**
         * Initialize the application
         */
        async init() {
            try {
                // Initialize DOM references
                UI.initDOMReferences();
                
                // Initialize event handlers
                EventHandlers.init();
                
                // Set initial theme
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                STATE.theme = prefersDark ? 'dark' : 'light';
                document.documentElement.setAttribute('data-theme', STATE.theme);
                
                // Validate configuration
                if (!Utils.isValidFolderId(CONFIG.FOLDER_ID)) {
                    UI.showEmptyState('Please configure your folder ID');
                    UI.showSnackbar('Configuration required. Please set your Google Drive folder ID.', 'Learn More', () => {
                        window.open('https://developers.google.com/drive/api/v3/quickstart/js', '_blank');
                    });
                    return;
                }
                
                // Load initial data
                UI.updateStatus('Initializing...');
                await Promise.all([
                    FileManager.loadFiles(),
                    UI.renderFolderTree()
                ]);
                
                UI.renderBreadcrumb();
                UI.updateStatus('Ready');
                
                // Show welcome message
                UI.showSnackbar('Welcome to Drive Explorer! Press ? for keyboard shortcuts.');
                
                console.log('Drive Explorer initialized successfully');
                
            } catch (error) {
                console.error('Failed to initialize application:', error);
                UI.showEmptyState('Failed to initialize application');
                UI.updateStatus('Initialization failed', 'error');
                
                UI.showSnackbar('Failed to initialize. Please check your configuration and try again.', 'Retry', () => {
                    window.location.reload();
                });
            }
        },

        /**
         * Handle unhandled errors
         */
        handleError(error) {
            console.error('Unhandled error:', error);
            UI.showSnackbar('An unexpected error occurred. Please try refreshing the page.', 'Refresh', () => {
                window.location.reload();
            });
        }
    };

    // ==================== STARTUP ====================
    
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
        App.handleError(event.reason);
    });

    // Handle general errors
    window.addEventListener('error', (event) => {
        App.handleError(event.error);
    });

    // Initialize when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', App.init);
    } else {
        App.init();
    }

    // Expose some functions for debugging (remove in production)
    window.DriveExplorer = {
        STATE,
        CONFIG,
        API,
        UI,
        FileManager,
        Utils
    };

})();