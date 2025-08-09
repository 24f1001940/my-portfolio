// Typing Master Pro - JavaScript (Final Fixed Version)
class TypingMaster {
    constructor() {
        this.textSamples = {
            easy: [
                "The quick brown fox jumps over the lazy dog.",
                "A simple sentence with common words to type.",
                "Practice makes perfect when you type daily.",
                "Learning to type faster requires patience.",
                "Simple words help build confidence and speed."
            ],
            medium: [
                "Technology advances rapidly in our modern world requiring adaptation.",
                "Professional development involves continuous skill improvement and knowledge.",
                "Communication skills are essential for success in personal environments.",
                "Effective time management contributes to increased productivity levels.",
                "Creative problem solving abilities distinguish exceptional employees."
            ],
            hard: [
                "Sophisticated algorithms analyze complex datasets to extract meaningful insights.",
                "Entrepreneurial ventures require strategic planning and innovative thinking.",
                "Cybersecurity protocols implement multi-layered defense mechanisms against threats.",
                "Quantum computing paradigms revolutionize computational capabilities through principles.",
                "Artificial intelligence systems demonstrate remarkable adaptability in domains."
            ],
            programming: [
                "function calculateWPM(chars, mins) { return Math.round(chars / 5 / mins); }",
                "const response = await fetch('/api/data').then(res => res.json());",
                "class Game { constructor() { this.wpm = 0; this.accuracy = 100; } }",
                "const users = database.collection('users').where('active', true).get();",
                "import React from 'react'; export default function App() { return <div>Hi</div>; }"
            ]
        };

        // Game state
        this.gameState = {
            isActive: false,
            isPaused: false,
            startTime: null,
            endTime: null,
            currentMode: 'time',
            currentValue: 30,
            difficulty: 'easy',
            currentText: '',
            userInput: '',
            errors: 0,
            totalCharacters: 0,
            correctCharacters: 0,
            wpm: 0,
            cpm: 0,
            accuracy: 100
        };

        // Settings
        this.settings = {
            soundEnabled: true,
            showKeyboard: true,
            fontSize: 18
        };

        // Statistics
        this.stats = {
            bestWPM: 0,
            bestAccuracy: 0
        };

        this.keyPresses = {};
        this.timer = null;
        this.updateInterval = null;
        
        // Initialize
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        this.loadSettings();
        this.loadStats();
        this.generateKeyboard();
        this.generateText();
        this.updateDisplay();
        this.bindEvents();
        
        // Set initial timer display
        document.getElementById('timer').textContent = '00:30';
        
        console.log('Typing Master initialized');
    }

    loadSettings() {
        try {
            const saved = localStorage.getItem('typingMasterSettings');
            if (saved) {
                this.settings = { ...this.settings, ...JSON.parse(saved) };
                this.applySettings();
            }
        } catch (e) {
            console.log('Failed to load settings');
        }
    }

    loadStats() {
        try {
            const saved = localStorage.getItem('typingMasterStats');
            if (saved) {
                this.stats = { ...this.stats, ...JSON.parse(saved) };
                this.updateBestStats();
            }
        } catch (e) {
            console.log('Failed to load stats');
        }
    }

    bindEvents() {
        // Mode selection - Fix UI overlap issue
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                this.gameState.currentMode = btn.dataset.mode;
                this.gameState.currentValue = parseInt(btn.dataset.value);
                
                // Update timer display based on mode
                if (this.gameState.currentMode === 'time') {
                    const minutes = Math.floor(this.gameState.currentValue / 60);
                    const seconds = this.gameState.currentValue % 60;
                    document.getElementById('timer').textContent = 
                        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                } else {
                    document.getElementById('timer').textContent = '00:00';
                }
                
                this.resetGame();
            });
        });

        // Difficulty selection
        document.getElementById('difficulty').addEventListener('change', (e) => {
            this.gameState.difficulty = e.target.value;
            this.generateText();
            console.log('Difficulty changed to:', e.target.value);
        });

        // Control buttons
        document.getElementById('start-btn').addEventListener('click', () => this.startGame());
        document.getElementById('pause-btn').addEventListener('click', () => this.pauseGame());
        document.getElementById('restart-btn').addEventListener('click', () => this.resetGame());

        // Typing input
        const typingInput = document.getElementById('typing-input');
        typingInput.addEventListener('input', (e) => this.handleInput(e));
        typingInput.addEventListener('keydown', (e) => this.handleKeydown(e));
        typingInput.addEventListener('paste', (e) => e.preventDefault());

        // Settings and modals
        document.getElementById('settings-btn').addEventListener('click', () => this.showSettings());
        document.getElementById('close-settings').addEventListener('click', () => this.hideSettings());
        document.getElementById('close-modal').addEventListener('click', () => this.hideResults());
        document.getElementById('restart-test').addEventListener('click', () => {
            this.hideResults();
            this.resetGame();
        });
        document.getElementById('new-mode').addEventListener('click', () => {
            this.hideResults();
            this.resetGame();
        });

        // Theme toggle
        document.getElementById('theme-toggle').addEventListener('click', () => this.toggleTheme());
        
        // Sound toggle
        document.getElementById('sound-toggle').addEventListener('click', () => this.toggleSound());

        this.bindSettingsControls();
    }

    bindSettingsControls() {
        const fontSize = document.getElementById('font-size');
        if (fontSize) {
            fontSize.addEventListener('input', (e) => {
                this.settings.fontSize = parseInt(e.target.value);
                this.applyFontSize();
                this.saveSettings();
            });
        }

        const soundEffects = document.getElementById('sound-effects');
        if (soundEffects) {
            soundEffects.addEventListener('change', (e) => {
                this.settings.soundEnabled = e.target.checked;
                this.saveSettings();
            });
        }

        const showKeyboard = document.getElementById('show-keyboard');
        if (showKeyboard) {
            showKeyboard.addEventListener('change', (e) => {
                this.settings.showKeyboard = e.target.checked;
                this.toggleKeyboard();
                this.saveSettings();
            });
        }

        const resetStats = document.getElementById('reset-stats');
        if (resetStats) {
            resetStats.addEventListener('click', () => this.resetStats());
        }
    }

    generateText() {
        const difficulty = this.gameState.difficulty;
        const textPool = this.textSamples[difficulty];
        
        if (this.gameState.currentMode === 'time') {
            // For time-based tests, use longer text
            let text = '';
            const targetLength = Math.max(200, this.gameState.currentValue * 3); // Rough estimation
            while (text.length < targetLength) {
                const randomText = textPool[Math.floor(Math.random() * textPool.length)];
                text += text ? ' ' + randomText : randomText;
            }
            this.gameState.currentText = text.substring(0, targetLength);
        } else {
            // For word-based tests, create exact word count
            let words = [];
            while (words.length < this.gameState.currentValue) {
                const randomText = textPool[Math.floor(Math.random() * textPool.length)];
                const textWords = randomText.split(' ');
                words = words.concat(textWords);
            }
            this.gameState.currentText = words.slice(0, this.gameState.currentValue).join(' ');
        }

        this.displayText();
    }

    displayText() {
        const textDisplay = document.getElementById('text-content');
        if (!textDisplay) return;

        const text = this.gameState.currentText;
        const userInput = this.gameState.userInput;
        let html = '';

        for (let i = 0; i < text.length; i++) {
            let className = '';
            
            if (i < userInput.length) {
                if (userInput[i] === text[i]) {
                    className = 'correct';
                } else {
                    className = 'incorrect';
                }
            } else if (i === userInput.length && this.gameState.isActive && !this.gameState.isPaused) {
                className = 'current';
            }

            const char = text[i] === ' ' ? '&nbsp;' : this.escapeHtml(text[i]);
            html += `<span class="char ${className}">${char}</span>`;
        }

        textDisplay.innerHTML = html;
        
        // Auto-scroll fix - scroll current character into view
        if (this.gameState.isActive) {
            const currentChar = textDisplay.querySelector('.char.current');
            if (currentChar) {
                currentChar.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
            }
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    startGame() {
        if (this.gameState.isActive) return;
        
        this.gameState.isActive = true;
        this.gameState.isPaused = false;
        this.gameState.startTime = Date.now();
        this.gameState.userInput = '';
        this.gameState.errors = 0;
        this.gameState.totalCharacters = 0;
        this.gameState.correctCharacters = 0;
        
        const typingInput = document.getElementById('typing-input');
        typingInput.disabled = false;
        typingInput.value = '';
        typingInput.focus();
        
        document.getElementById('start-btn').classList.add('hidden');
        document.getElementById('pause-btn').classList.remove('hidden');
        
        // Start the appropriate timer
        if (this.gameState.currentMode === 'time') {
            this.startCountdownTimer();
        } else {
            this.startElapsedTimer();
        }
        
        // Start real-time updates
        this.startRealTimeUpdates();
        
        this.displayText();
        console.log('Game started successfully');
    }

    startCountdownTimer() {
        let timeLeft = this.gameState.currentValue;
        
        this.timer = setInterval(() => {
            if (!this.gameState.isPaused && this.gameState.isActive) {
                timeLeft--;
                this.updateTimerDisplay(timeLeft);
                
                const timerElement = document.getElementById('timer');
                if (timeLeft <= 10) {
                    timerElement.classList.add('warning');
                }
                if (timeLeft <= 5) {
                    timerElement.classList.add('danger');
                }
                
                if (timeLeft <= 0) {
                    this.endGame();
                }
            }
        }, 1000);
    }

    startElapsedTimer() {
        this.timer = setInterval(() => {
            if (!this.gameState.isPaused && this.gameState.isActive) {
                const elapsed = Math.floor((Date.now() - this.gameState.startTime) / 1000);
                const minutes = Math.floor(elapsed / 60);
                const seconds = elapsed % 60;
                document.getElementById('timer').textContent = 
                    `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }
        }, 1000);
    }

    startRealTimeUpdates() {
        // Update statistics every 500ms for smooth real-time feedback
        this.updateInterval = setInterval(() => {
            if (this.gameState.isActive && !this.gameState.isPaused) {
                this.calculateStats();
                this.updateDisplay();
            }
        }, 500);
    }

    updateTimerDisplay(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        document.getElementById('timer').textContent = 
            `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    handleInput(e) {
        if (!this.gameState.isActive || this.gameState.isPaused) return;

        this.gameState.userInput = e.target.value;
        this.displayText();
        this.updateProgress();

        // Immediate stats update for responsiveness
        this.calculateStats();
        this.updateDisplay();

        // Check completion conditions
        this.checkCompletion();

        // Play keystroke sound
        if (this.settings.soundEnabled) {
            this.playKeystrokeSound();
        }
    }

    handleKeydown(e) {
        if (!this.gameState.isActive || this.gameState.isPaused) return;

        const key = e.key.toUpperCase();
        this.highlightKey(key === ' ' ? ' ' : key);
        this.trackKeyPress(key === ' ' ? ' ' : key);
    }

    checkCompletion() {
        if (this.gameState.currentMode === 'words') {
            const words = this.gameState.userInput.trim().split(/\s+/).filter(w => w.length > 0);
            if (words.length >= this.gameState.currentValue) {
                // Add small delay to allow final character to be processed
                setTimeout(() => this.endGame(), 100);
            }
        } else if (this.gameState.userInput.length >= this.gameState.currentText.length) {
            setTimeout(() => this.endGame(), 100);
        }
    }

    calculateStats() {
        if (!this.gameState.startTime) return;

        const currentTime = Date.now();
        const timeElapsed = (currentTime - this.gameState.startTime) / 1000 / 60; // in minutes
        
        this.gameState.totalCharacters = this.gameState.userInput.length;
        this.gameState.correctCharacters = 0;
        this.gameState.errors = 0;

        // Calculate correct characters and errors
        for (let i = 0; i < this.gameState.userInput.length; i++) {
            if (i < this.gameState.currentText.length && 
                this.gameState.userInput[i] === this.gameState.currentText[i]) {
                this.gameState.correctCharacters++;
            } else {
                this.gameState.errors++;
            }
        }

        // Calculate WPM and CPM
        if (timeElapsed > 0) {
            const words = this.gameState.correctCharacters / 5; // Standard: 5 chars = 1 word
            this.gameState.wpm = Math.round(words / timeElapsed);
            this.gameState.cpm = Math.round(this.gameState.correctCharacters / timeElapsed);
        } else {
            this.gameState.wpm = 0;
            this.gameState.cpm = 0;
        }

        // Calculate accuracy
        this.gameState.accuracy = this.gameState.totalCharacters > 0 ? 
            Math.round((this.gameState.correctCharacters / this.gameState.totalCharacters) * 100) : 100;
    }

    updateDisplay() {
        document.getElementById('wpm').textContent = this.gameState.wpm;
        document.getElementById('cpm').textContent = this.gameState.cpm;
        document.getElementById('accuracy').textContent = `${this.gameState.accuracy}%`;
        document.getElementById('errors').textContent = this.gameState.errors;
    }

    updateProgress() {
        let progress = 0;
        
        if (this.gameState.currentMode === 'time') {
            const elapsed = (Date.now() - this.gameState.startTime) / 1000;
            progress = (elapsed / this.gameState.currentValue) * 100;
        } else {
            progress = (this.gameState.userInput.length / this.gameState.currentText.length) * 100;
        }
        
        progress = Math.min(100, Math.max(0, progress));
        
        document.getElementById('progress-bar').style.width = `${progress}%`;
        document.getElementById('progress-percentage').textContent = `${Math.round(progress)}%`;
    }

    pauseGame() {
        if (!this.gameState.isActive || this.gameState.isPaused) return;
        
        this.gameState.isPaused = true;
        document.getElementById('typing-input').disabled = true;
        document.getElementById('start-btn').classList.remove('hidden');
        document.getElementById('pause-btn').classList.add('hidden');
    }

    endGame() {
        if (!this.gameState.isActive) return;
        
        this.gameState.isActive = false;
        this.gameState.endTime = Date.now();
        
        // Clear all timers
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
        
        document.getElementById('typing-input').disabled = true;
        document.getElementById('start-btn').classList.remove('hidden');
        document.getElementById('pause-btn').classList.add('hidden');

        // Final calculation
        this.calculateStats();
        this.updateStats();
        
        // Show results modal
        setTimeout(() => {
            this.showResults();
        }, 500);
        
        console.log('Game ended. Final stats:', {
            wpm: this.gameState.wpm,
            accuracy: this.gameState.accuracy,
            errors: this.gameState.errors
        });
    }

    resetGame() {
        // Clear all timers first
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
        
        this.gameState.isActive = false;
        this.gameState.isPaused = false;
        this.gameState.startTime = null;
        this.gameState.endTime = null;
        this.gameState.userInput = '';
        this.gameState.errors = 0;
        this.gameState.totalCharacters = 0;
        this.gameState.correctCharacters = 0;
        this.gameState.wpm = 0;
        this.gameState.cpm = 0;
        this.gameState.accuracy = 100;

        const typingInput = document.getElementById('typing-input');
        typingInput.value = '';
        typingInput.disabled = true;
        
        document.getElementById('start-btn').classList.remove('hidden');
        document.getElementById('pause-btn').classList.add('hidden');
        document.getElementById('progress-bar').style.width = '0%';
        document.getElementById('progress-percentage').textContent = '0%';
        
        // Reset timer display
        if (this.gameState.currentMode === 'time') {
            const minutes = Math.floor(this.gameState.currentValue / 60);
            const seconds = this.gameState.currentValue % 60;
            document.getElementById('timer').textContent = 
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        } else {
            document.getElementById('timer').textContent = '00:00';
        }
        
        // Clear timer classes
        const timerElement = document.getElementById('timer');
        timerElement.classList.remove('warning', 'danger');

        this.generateText();
        this.updateDisplay();
        this.resetKeyboardHeat();
    }

    showResults() {
        const modal = document.getElementById('results-modal');
        if (!modal) return;

        const duration = this.gameState.currentMode === 'time' ? this.gameState.currentValue :
                        (this.gameState.endTime - this.gameState.startTime) / 1000;

        // Populate results
        document.getElementById('final-wpm').textContent = this.gameState.wpm;
        document.getElementById('final-accuracy').textContent = `${this.gameState.accuracy}%`;
        document.getElementById('final-cpm').textContent = this.gameState.cpm;
        document.getElementById('final-time').textContent = `${Math.round(duration)}s`;
        document.getElementById('total-chars').textContent = this.gameState.totalCharacters;
        document.getElementById('correct-chars').textContent = this.gameState.correctCharacters;
        document.getElementById('incorrect-chars').textContent = this.gameState.errors;

        modal.classList.remove('hidden');
        console.log('Results modal shown');
    }

    hideResults() {
        document.getElementById('results-modal').classList.add('hidden');
    }

    showSettings() {
        const modal = document.getElementById('settings-modal');
        if (!modal) return;

        modal.classList.remove('hidden');
        document.getElementById('font-size').value = this.settings.fontSize;
        document.getElementById('sound-effects').checked = this.settings.soundEnabled;
        document.getElementById('show-keyboard').checked = this.settings.showKeyboard;
    }

    hideSettings() {
        document.getElementById('settings-modal').classList.add('hidden');
    }

    updateStats() {
        if (this.gameState.wpm > this.stats.bestWPM) {
            this.stats.bestWPM = this.gameState.wpm;
        }
        if (this.gameState.accuracy > this.stats.bestAccuracy) {
            this.stats.bestAccuracy = this.gameState.accuracy;
        }
        
        this.saveStats();
    }

    saveStats() {
        try {
            localStorage.setItem('typingMasterStats', JSON.stringify(this.stats));
            this.updateBestStats();
        } catch (e) {
            console.log('Failed to save stats');
        }
    }

    saveSettings() {
        try {
            localStorage.setItem('typingMasterSettings', JSON.stringify(this.settings));
        } catch (e) {
            console.log('Failed to save settings');
        }
    }

    updateBestStats() {
        document.getElementById('best-wpm').textContent = this.stats.bestWPM;
        document.getElementById('best-accuracy').textContent = `${this.stats.bestAccuracy}%`;
    }

    generateKeyboard() {
        const keyboardLayout = [
            ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
            ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
            ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
        ];

        const keyboardDisplay = document.getElementById('keyboard-display');
        if (!keyboardDisplay) return;

        keyboardDisplay.innerHTML = '';

        keyboardLayout.forEach(row => {
            const rowDiv = document.createElement('div');
            rowDiv.className = 'keyboard-row';
            
            row.forEach(key => {
                const keyDiv = document.createElement('div');
                keyDiv.className = 'key';
                keyDiv.textContent = key;
                keyDiv.setAttribute('data-key', key);
                rowDiv.appendChild(keyDiv);
                this.keyPresses[key] = 0;
            });
            
            keyboardDisplay.appendChild(rowDiv);
        });

        // Add spacebar
        const spaceRow = document.createElement('div');
        spaceRow.className = 'keyboard-row';
        const spaceKey = document.createElement('div');
        spaceKey.className = 'key';
        spaceKey.style.width = '200px';
        spaceKey.textContent = 'SPACE';
        spaceKey.setAttribute('data-key', ' ');
        spaceRow.appendChild(spaceKey);
        keyboardDisplay.appendChild(spaceRow);
        this.keyPresses[' '] = 0;
    }

    highlightKey(key) {
        const keyElement = document.querySelector(`[data-key="${key}"]`);
        if (keyElement) {
            keyElement.classList.add('pressed');
            setTimeout(() => keyElement.classList.remove('pressed'), 200);
        }
    }

    trackKeyPress(key) {
        if (this.keyPresses[key] !== undefined) {
            this.keyPresses[key]++;
            this.updateKeyboardHeat();
        }
    }

    updateKeyboardHeat() {
        const maxPresses = Math.max(...Object.values(this.keyPresses));
        if (maxPresses === 0) return;

        Object.keys(this.keyPresses).forEach(key => {
            const keyElement = document.querySelector(`[data-key="${key}"]`);
            if (keyElement && this.keyPresses[key] > 0) {
                const heatLevel = Math.ceil((this.keyPresses[key] / maxPresses) * 5);
                keyElement.className = `key heat-${heatLevel}`;
            }
        });
    }

    resetKeyboardHeat() {
        Object.keys(this.keyPresses).forEach(key => {
            this.keyPresses[key] = 0;
            const keyElement = document.querySelector(`[data-key="${key}"]`);
            if (keyElement) {
                keyElement.className = 'key';
            }
        });
    }

    toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute('data-color-scheme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-color-scheme', newTheme);
        this.settings.theme = newTheme;
        this.saveSettings();

        const icon = document.querySelector('#theme-toggle i');
        if (icon) {
            icon.className = newTheme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
        }
    }

    toggleSound() {
        this.settings.soundEnabled = !this.settings.soundEnabled;
        this.saveSettings();
        
        const icon = document.querySelector('#sound-toggle i');
        if (icon) {
            icon.className = this.settings.soundEnabled ? 
                'fa-solid fa-volume-high' : 'fa-solid fa-volume-mute';
        }
    }

    toggleKeyboard() {
        const keyboard = document.querySelector('.keyboard-heatmap');
        if (keyboard) {
            keyboard.style.display = this.settings.showKeyboard ? 'block' : 'none';
        }
    }

    applySettings() {
        if (this.settings.theme) {
            document.documentElement.setAttribute('data-color-scheme', this.settings.theme);
        }
        this.applyFontSize();
        this.toggleKeyboard();
    }

    applyFontSize() {
        const textContent = document.getElementById('text-content');
        const typingInput = document.getElementById('typing-input');
        
        if (textContent) textContent.style.fontSize = `${this.settings.fontSize}px`;
        if (typingInput) typingInput.style.fontSize = `${this.settings.fontSize}px`;
    }

    playKeystrokeSound() {
        if (!this.settings.soundEnabled) return;
        
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        } catch (e) {
            // Silent fallback
        }
    }

    resetStats() {
        if (confirm('Are you sure you want to reset all statistics? This cannot be undone.')) {
            this.stats = {
                bestWPM: 0,
                bestAccuracy: 0
            };
            localStorage.removeItem('typingMasterStats');
            this.updateBestStats();
        }
    }
}

// Initialize the game
document.addEventListener('DOMContentLoaded', () => {
    window.typingMaster = new TypingMaster();
});

// Achievement notification styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);