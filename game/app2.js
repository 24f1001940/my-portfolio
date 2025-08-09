// Game Hub JavaScript - Main Application Logic

class GameHub {
    constructor() {
        this.currentGame = null;
        this.modal = document.getElementById('gameModal');
        this.modalTitle = document.getElementById('modalTitle');
        this.modalBody = document.getElementById('modalBody');
        this.closeModal = document.getElementById('closeModal');
        
        this.init();
    }

    init() {
        // Add small delay to ensure DOM is ready
        setTimeout(() => {
            this.bindEvents();
            this.createParticles();
            this.animateCards();
        }, 100);
    }

    bindEvents() {
        // Game card clicks - use delegation for better reliability
        document.addEventListener('click', (e) => {
            const gameCard = e.target.closest('.game-card');
            if (gameCard) {
                e.preventDefault();
                const gameType = gameCard.dataset.game;
                console.log('Opening game:', gameType); // Debug log
                this.openGame(gameType);
            }
        });

        // Modal close events
        if (this.closeModal) {
            this.closeModal.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeGameModal();
            });
        }

        const modalOverlay = document.querySelector('.modal-overlay');
        if (modalOverlay) {
            modalOverlay.addEventListener('click', () => this.closeGameModal());
        }
        
        // Escape key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal && !this.modal.classList.contains('hidden')) {
                this.closeGameModal();
            }
        });
    }

    createParticles() {
        const particlesContainer = document.querySelector('.background-particles');
        if (!particlesContainer) return;
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 4 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = `rgba(${Math.random() > 0.5 ? '0, 212, 255' : '157, 78, 221'}, ${Math.random() * 0.5 + 0.2})`;
            particle.style.borderRadius = '50%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animation = `floatParticle ${Math.random() * 20 + 10}s linear infinite`;
            particlesContainer.appendChild(particle);
        }

        // Add particle animation keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatParticle {
                0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    animateCards() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'cardFloat 0.6s ease-out forwards';
                }
            });
        });

        document.querySelectorAll('.game-card').forEach(card => {
            observer.observe(card);
        });
    }

    openGame(gameType) {
        if (!gameType) {
            console.error('No game type provided');
            return;
        }

        console.log('Creating game instance for:', gameType);
        const gameInfo = this.getGameInfo(gameType);
        this.modalTitle.textContent = gameInfo.title;
        this.modalBody.innerHTML = '';
        
        // Destroy current game if exists
        if (this.currentGame && this.currentGame.destroy) {
            this.currentGame.destroy();
        }
        this.currentGame = null;
        
        // Create game instance based on type
        try {
            switch(gameType) {
                case 'tic-tac-toe':
                    this.currentGame = new TicTacToe(this.modalBody);
                    break;
                case 'rock-paper-scissors':
                    this.currentGame = new RockPaperScissors(this.modalBody);
                    break;
                case 'guess-number':
                    this.currentGame = new GuessNumber(this.modalBody);
                    break;
                case 'memory-cards':
                    this.currentGame = new MemoryCards(this.modalBody);
                    break;
                case 'whack-mole':
                    this.currentGame = new WhackAMole(this.modalBody);
                    break;
                case 'snake':
                    this.currentGame = new SnakeGame(this.modalBody);
                    break;
                case 'pong':
                    this.currentGame = new PongGame(this.modalBody);
                    break;
                case 'breakout':
                    this.currentGame = new BreakoutGame(this.modalBody);
                    break;
                case 'flappy-bird':
                    this.currentGame = new FlappyBirdGame(this.modalBody);
                    break;
                case '2048':
                    this.currentGame = new Game2048(this.modalBody);
                    break;
                case 'minesweeper':
                    this.currentGame = new MinesweeperGame(this.modalBody);
                    break;
                case 'simon-says':
                    this.currentGame = new SimonSaysGame(this.modalBody);
                    break;
                case 'sudoku':
                    this.currentGame = new SudokuGame(this.modalBody);
                    break;
                case 'hangman':
                    this.currentGame = new HangmanGame(this.modalBody);
                    break;
                case 'platformer':
                    this.currentGame = new PlatformerGame(this.modalBody);
                    break;
                case 'typing-test':
                    this.currentGame = new TypingTestGame(this.modalBody);
                    break;
                case 'quiz':
                    this.currentGame = new QuizGame(this.modalBody);
                    break;
                case 'puzzle':
                    this.currentGame = new PuzzleGame(this.modalBody);
                    break;
                case 'catch-objects':
                    this.currentGame = new CatchObjectsGame(this.modalBody);
                    break;
                case 'treasure-hunt':
                    this.currentGame = new TreasureHuntGame(this.modalBody);
                    break;
                default:
                    this.modalBody.innerHTML = `
                        <div class="game-container">
                            <p style="color: rgba(255,255,255,0.7); text-align: center; font-size: 1.2rem;">
                                🚧 This game is coming soon! 🚧<br><br>
                                <strong>${gameInfo.title}</strong><br>
                                Stay tuned for more exciting games.
                            </p>
                        </div>
                    `;
            }
        } catch (error) {
            console.error('Error creating game:', error);
            this.modalBody.innerHTML = `
                <div class="game-container">
                    <p style="color: rgba(255,100,100,0.8); text-align: center;">
                        ❌ Error loading game. Please try again.
                    </p>
                </div>
            `;
        }
        
        this.modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    closeGameModal() {
        this.modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
        
        if (this.currentGame && this.currentGame.destroy) {
            this.currentGame.destroy();
        }
        this.currentGame = null;
    }

    getGameInfo(gameType) {
        const gameInfoMap = {
            'tic-tac-toe': { title: '⭕ Tic-Tac-Toe' },
            'rock-paper-scissors': { title: '✂️ Rock Paper Scissors' },
            'guess-number': { title: '🎯 Guess the Number' },
            'memory-cards': { title: '🧠 Memory Card Game' },
            'whack-mole': { title: '🔨 Whack-a-Mole' },
            'snake': { title: '🐍 Snake Game' },
            'pong': { title: '🏓 Pong' },
            'breakout': { title: '🧱 Breakout' },
            'flappy-bird': { title: '🐦 Flappy Bird Clone' },
            '2048': { title: '🔢 2048 Game' },
            'minesweeper': { title: '💣 Minesweeper' },
            'simon-says': { title: '🔴 Simon Says' },
            'sudoku': { title: '🔢 Sudoku' },
            'hangman': { title: '🎪 Hangman' },
            'platformer': { title: '🏃 Platformer Game' },
            'typing-test': { title: '⌨️ Typing Speed Test' },
            'quiz': { title: '❓ Quiz Game' },
            'puzzle': { title: '🧩 Drag & Drop Puzzle' },
            'catch-objects': { title: '🗑️ Catch the Falling Objects' },
            'treasure-hunt': { title: '🏴‍☠️ Treasure Hunt' },
        };
        return gameInfoMap[gameType] || { title: 'Unknown Game' };
    }
}

// Tic-Tac-Toe Game - FIXED player alternation
class TicTacToe {
    constructor(container) {
        this.container = container;
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.init();
    }

    init() {
        this.container.innerHTML = `
            <div class="game-container">
                <div class="game-info">
                    <div class="score">Current Player: <span id="ticTacCurrentPlayer">X</span></div>
                    <div id="ticTacGameStatus" style="margin-top: 10px; color: rgba(255,255,255,0.8);"></div>
                </div>
                <div class="game-board">
                    <div class="tic-tac-toe-board">
                        ${this.board.map((cell, index) => 
                            `<div class="tic-tac-toe-cell" data-index="${index}"></div>`
                        ).join('')}
                    </div>
                </div>
                <div class="game-controls">
                    <button class="btn btn--primary" id="ticTacResetBtn">New Game</button>
                </div>
            </div>
        `;

        this.addStyles();
        this.bindEvents();
    }

    addStyles() {
        const existingStyle = document.getElementById('tic-tac-toe-styles');
        if (existingStyle) existingStyle.remove();

        const style = document.createElement('style');
        style.id = 'tic-tac-toe-styles';
        style.textContent = `
            .tic-tac-toe-board {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 5px;
                width: 300px;
                height: 300px;
                background: rgba(0, 212, 255, 0.2);
                padding: 10px;
                border-radius: 10px;
                margin: 0 auto;
            }
            .tic-tac-toe-cell {
                background: rgba(255, 255, 255, 0.1);
                border: 2px solid rgba(0, 212, 255, 0.3);
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 2rem;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.2s ease;
                color: white;
            }
            .tic-tac-toe-cell:hover:not(.occupied) {
                background: rgba(0, 212, 255, 0.2);
                transform: scale(1.05);
            }
            .tic-tac-toe-cell.occupied {
                cursor: not-allowed;
            }
            .tic-tac-toe-cell.disabled {
                cursor: not-allowed;
                opacity: 0.6;
            }
        `;
        document.head.appendChild(style);
    }

    bindEvents() {
        // Use delegation to avoid conflicts
        this.container.addEventListener('click', (e) => {
            if (e.target.classList.contains('tic-tac-toe-cell')) {
                this.handleCellClick(e);
            }
            if (e.target.id === 'ticTacResetBtn') {
                this.resetGame();
            }
        });
    }

    handleCellClick(e) {
        const index = parseInt(e.target.dataset.index);
        
        if (this.board[index] !== '' || !this.gameActive) return;

        // Mark the cell as occupied
        this.board[index] = this.currentPlayer;
        e.target.textContent = this.currentPlayer;
        e.target.classList.add('occupied');
        e.target.style.color = this.currentPlayer === 'X' ? '#00d4ff' : '#9d4edd';

        if (this.checkWinner()) {
            const statusElement = document.getElementById('ticTacGameStatus');
            if (statusElement) {
                statusElement.textContent = `Player ${this.currentPlayer} wins! 🎉`;
                statusElement.style.color = '#00d4ff';
            }
            this.gameActive = false;
            document.querySelectorAll('.tic-tac-toe-cell').forEach(cell => cell.classList.add('disabled'));
        } else if (this.board.every(cell => cell !== '')) {
            const statusElement = document.getElementById('ticTacGameStatus');
            if (statusElement) {
                statusElement.textContent = "It's a tie! 🤝";
                statusElement.style.color = '#ffa500';
            }
            this.gameActive = false;
        } else {
            // FIXED: Properly alternate players
            this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
            const currentPlayerElement = document.getElementById('ticTacCurrentPlayer');
            if (currentPlayerElement) {
                currentPlayerElement.textContent = this.currentPlayer;
                currentPlayerElement.style.color = this.currentPlayer === 'X' ? '#00d4ff' : '#9d4edd';
            }
        }
    }

    checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6] // diagonals
        ];

        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c];
        });
    }

    resetGame() {
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.currentPlayer = 'X';
        this.gameActive = true;
        
        const currentPlayerElement = document.getElementById('ticTacCurrentPlayer');
        const statusElement = document.getElementById('ticTacGameStatus');
        
        if (currentPlayerElement) {
            currentPlayerElement.textContent = 'X';
            currentPlayerElement.style.color = '#00d4ff';
        }
        if (statusElement) {
            statusElement.textContent = '';
        }
        
        document.querySelectorAll('.tic-tac-toe-cell').forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('disabled', 'occupied');
        });
    }
}

// Rock Paper Scissors Game - FIXED
class RockPaperScissors {
    constructor(container) {
        this.container = container;
        this.playerScore = 0;
        this.computerScore = 0;
        this.init();
    }

    init() {
        this.container.innerHTML = `
            <div class="game-container">
                <div class="game-info">
                    <div class="score">Player: <span id="rpsPlayerScore">0</span> | Computer: <span id="rpsComputerScore">0</span></div>
                    <div id="rpsGameResult" style="margin-top: 10px; font-size: 1.2rem; color: rgba(255,255,255,0.8);"></div>
                </div>
                <div class="game-board">
                    <div class="rps-choices">
                        <div class="rps-choice" data-choice="rock">
                            <div class="choice-icon">🗿</div>
                            <div class="choice-name">Rock</div>
                        </div>
                        <div class="rps-choice" data-choice="paper">
                            <div class="choice-icon">📄</div>
                            <div class="choice-name">Paper</div>
                        </div>
                        <div class="rps-choice" data-choice="scissors">
                            <div class="choice-icon">✂️</div>
                            <div class="choice-name">Scissors</div>
                        </div>
                    </div>
                    <div id="rpsChoicesDisplay" class="choices-display">
                        <p style="color: rgba(255,255,255,0.6);">Make your choice above!</p>
                    </div>
                </div>
                <div class="game-controls">
                    <button class="btn btn--primary" id="rpsResetBtn">Reset Score</button>
                </div>
            </div>
        `;

        this.addStyles();
        this.bindEvents();
    }

    addStyles() {
        const existingStyle = document.getElementById('rps-styles');
        if (existingStyle) existingStyle.remove();

        const style = document.createElement('style');
        style.id = 'rps-styles';
        style.textContent = `
            .rps-choices {
                display: flex;
                gap: 20px;
                margin-bottom: 30px;
                justify-content: center;
                flex-wrap: wrap;
            }
            .rps-choice {
                background: rgba(255, 255, 255, 0.1);
                border: 2px solid rgba(0, 212, 255, 0.3);
                border-radius: 15px;
                padding: 20px;
                cursor: pointer;
                transition: all 0.3s ease;
                text-align: center;
                min-width: 120px;
            }
            .rps-choice:hover {
                background: rgba(0, 212, 255, 0.2);
                transform: translateY(-5px);
                box-shadow: 0 10px 30px rgba(0, 212, 255, 0.3);
            }
            .choice-icon {
                font-size: 3rem;
                margin-bottom: 10px;
                display: block;
            }
            .choice-name {
                color: rgba(255, 255, 255, 0.8);
                font-weight: bold;
            }
            .choices-display {
                display: flex;
                justify-content: space-around;
                align-items: center;
                padding: 20px;
                background: rgba(0, 0, 0, 0.3);
                border-radius: 10px;
                min-height: 100px;
            }
            .choice-result {
                text-align: center;
            }
            .choice-result .icon {
                font-size: 2.5rem;
                margin-bottom: 10px;
                display: block;
            }
            .choice-result .label {
                color: rgba(255, 255, 255, 0.6);
                font-size: 0.9rem;
            }
        `;
        document.head.appendChild(style);
    }

    bindEvents() {
        this.container.addEventListener('click', (e) => {
            const choice = e.target.closest('.rps-choice');
            if (choice) {
                const playerChoice = choice.dataset.choice;
                this.playRound(playerChoice);
            }
            if (e.target.id === 'rpsResetBtn') {
                this.resetGame();
            }
        });
    }

    playRound(playerChoice) {
        const choices = ['rock', 'paper', 'scissors'];
        const computerChoice = choices[Math.floor(Math.random() * 3)];
        
        const icons = {
            rock: '🗿',
            paper: '📄',
            scissors: '✂️'
        };

        // Display choices
        const choicesDisplay = document.getElementById('rpsChoicesDisplay');
        if (choicesDisplay) {
            choicesDisplay.innerHTML = `
                <div class="choice-result">
                    <div class="icon">${icons[playerChoice]}</div>
                    <div class="label">You</div>
                </div>
                <div style="color: rgba(255,255,255,0.5); font-size: 2rem;">VS</div>
                <div class="choice-result">
                    <div class="icon">${icons[computerChoice]}</div>
                    <div class="label">Computer</div>
                </div>
            `;
        }

        // Determine winner
        const result = this.getResult(playerChoice, computerChoice);
        let message = '';
        
        if (result === 'win') {
            this.playerScore++;
            message = 'You win! 🎉';
        } else if (result === 'lose') {
            this.computerScore++;
            message = 'Computer wins! 🤖';
        } else {
            message = "It's a tie! 🤝";
        }

        const gameResult = document.getElementById('rpsGameResult');
        const playerScoreElement = document.getElementById('rpsPlayerScore');
        const computerScoreElement = document.getElementById('rpsComputerScore');
        
        if (gameResult) gameResult.textContent = message;
        if (playerScoreElement) playerScoreElement.textContent = this.playerScore;
        if (computerScoreElement) computerScoreElement.textContent = this.computerScore;
    }

    getResult(player, computer) {
        if (player === computer) return 'tie';
        if (
            (player === 'rock' && computer === 'scissors') ||
            (player === 'paper' && computer === 'rock') ||
            (player === 'scissors' && computer === 'paper')
        ) {
            return 'win';
        }
        return 'lose';
    }

    resetGame() {
        this.playerScore = 0;
        this.computerScore = 0;
        
        const playerScoreElement = document.getElementById('rpsPlayerScore');
        const computerScoreElement = document.getElementById('rpsComputerScore');
        const gameResult = document.getElementById('rpsGameResult');
        const choicesDisplay = document.getElementById('rpsChoicesDisplay');
        
        if (playerScoreElement) playerScoreElement.textContent = '0';
        if (computerScoreElement) computerScoreElement.textContent = '0';
        if (gameResult) gameResult.textContent = '';
        if (choicesDisplay) choicesDisplay.innerHTML = '<p style="color: rgba(255,255,255,0.6);">Make your choice above!</p>';
    }
}

// Continue with other existing game classes...
class GuessNumber {
    constructor(container) {
        this.container = container;
        this.targetNumber = Math.floor(Math.random() * 100) + 1;
        this.attempts = 0;
        this.maxAttempts = 10;
        this.init();
    }

    init() {
        this.container.innerHTML = `
            <div class="game-container">
                <div class="game-info">
                    <div class="score">Attempts: <span id="guessAttempts">0</span>/${this.maxAttempts}</div>
                    <p style="color: rgba(255,255,255,0.7); margin: 10px 0;">I'm thinking of a number between 1 and 100!</p>
                </div>
                <div class="game-board">
                    <div class="guess-input-container">
                        <input type="number" id="guessInput" class="form-control" 
                               placeholder="Enter your guess" min="1" max="100" 
                               style="text-align: center; font-size: 1.5rem; margin-bottom: 20px;">
                        <button class="btn btn--primary" id="guessBtn">Make Guess</button>
                    </div>
                    <div id="guessHistory" class="guess-history"></div>
                    <div id="guessMessage" class="game-message"></div>
                </div>
                <div class="game-controls">
                    <button class="btn btn--primary" id="guessResetBtn">New Game</button>
                </div>
            </div>
        `;

        this.addStyles();
        this.bindEvents();
    }

    addStyles() {
        const existingStyle = document.getElementById('guess-styles');
        if (existingStyle) existingStyle.remove();

        const style = document.createElement('style');
        style.id = 'guess-styles';
        style.textContent = `
            .guess-input-container {
                text-align: center;
                margin-bottom: 30px;
            }
            .guess-history {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
                justify-content: center;
                margin-bottom: 20px;
                min-height: 60px;
            }
            .guess-item {
                background: rgba(255, 255, 255, 0.1);
                border-radius: 20px;
                padding: 5px 15px;
                font-size: 0.9rem;
                border: 1px solid rgba(255, 255, 255, 0.2);
            }
            .guess-item.too-high {
                border-color: rgba(239, 68, 68, 0.5);
                color: #ef4444;
            }
            .guess-item.too-low {
                border-color: rgba(34, 197, 94, 0.5);
                color: #22c55e;
            }
            .game-message {
                text-align: center;
                font-size: 1.2rem;
                font-weight: bold;
                min-height: 30px;
                color: rgba(255, 255, 255, 0.8);
            }
        `;
        document.head.appendChild(style);
    }

    bindEvents() {
        this.container.addEventListener('click', (e) => {
            if (e.target.id === 'guessBtn') {
                this.makeGuess();
            }
            if (e.target.id === 'guessResetBtn') {
                this.resetGame();
            }
        });

        this.container.addEventListener('keypress', (e) => {
            if (e.target.id === 'guessInput' && e.key === 'Enter') {
                this.makeGuess();
            }
        });

        this.container.addEventListener('input', (e) => {
            if (e.target.id === 'guessInput') {
                // Ensure input stays within bounds
                if (e.target.value > 100) e.target.value = 100;
                if (e.target.value < 1) e.target.value = 1;
            }
        });
    }

    makeGuess() {
        const guessInput = document.getElementById('guessInput');
        const guess = parseInt(guessInput.value);
        
        if (!guess || guess < 1 || guess > 100) {
            const gameMessage = document.getElementById('guessMessage');
            if (gameMessage) gameMessage.textContent = 'Please enter a number between 1 and 100!';
            return;
        }

        this.attempts++;
        const attemptsElement = document.getElementById('guessAttempts');
        if (attemptsElement) attemptsElement.textContent = this.attempts;

        const guessHistory = document.getElementById('guessHistory');
        const gameMessage = document.getElementById('guessMessage');
        
        if (guess === this.targetNumber) {
            if (gameMessage) {
                gameMessage.innerHTML = `🎉 Congratulations! You got it in ${this.attempts} attempts!`;
                gameMessage.style.color = '#00d4ff';
            }
            this.endGame();
        } else if (this.attempts >= this.maxAttempts) {
            if (gameMessage) {
                gameMessage.innerHTML = `😔 Game over! The number was ${this.targetNumber}`;
                gameMessage.style.color = '#ef4444';
            }
            this.endGame();
        } else {
            const hint = guess > this.targetNumber ? 'too-high' : 'too-low';
            const hintText = guess > this.targetNumber ? '↓ Too high!' : '↑ Too low!';
            
            if (guessHistory) {
                const guessItem = document.createElement('div');
                guessItem.className = `guess-item ${hint}`;
                guessItem.textContent = `${guess} ${hintText}`;
                guessHistory.appendChild(guessItem);
            }
            
            if (gameMessage) gameMessage.textContent = `${hintText} Try again!`;
        }

        guessInput.value = '';
        guessInput.focus();
    }

    endGame() {
        const guessInput = document.getElementById('guessInput');
        const guessBtn = document.getElementById('guessBtn');
        
        if (guessInput) guessInput.disabled = true;
        if (guessBtn) guessBtn.disabled = true;
    }

    resetGame() {
        this.targetNumber = Math.floor(Math.random() * 100) + 1;
        this.attempts = 0;
        
        const attemptsElement = document.getElementById('guessAttempts');
        const guessInput = document.getElementById('guessInput');
        const guessBtn = document.getElementById('guessBtn');
        const guessHistory = document.getElementById('guessHistory');
        const gameMessage = document.getElementById('guessMessage');
        
        if (attemptsElement) attemptsElement.textContent = '0';
        if (guessInput) {
            guessInput.disabled = false;
            guessInput.value = '';
            guessInput.focus();
        }
        if (guessBtn) guessBtn.disabled = false;
        if (guessHistory) guessHistory.innerHTML = '';
        if (gameMessage) gameMessage.textContent = '';
    }
}

// Memory Cards, Snake, and Whack-a-Mole games...
// Continue with the existing implementations but make sure they're properly contained

class MemoryCards {
    constructor(container) {
        this.container = container;
        this.cards = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
        this.gameCards = [...this.cards, ...this.cards].sort(() => Math.random() - 0.5);
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.moves = 0;
        this.init();
    }

    init() {
        this.container.innerHTML = `
            <div class="game-container">
                <div class="game-info">
                    <div class="score">Moves: <span id="memoryMoves">0</span> | Pairs: <span id="memoryPairs">0</span>/8</div>
                </div>
                <div class="game-board">
                    <div class="memory-grid">
                        ${this.gameCards.map((card, index) => 
                            `<div class="memory-card" data-index="${index}" data-value="${card}">
                                <div class="card-front">?</div>
                                <div class="card-back">${card}</div>
                            </div>`
                        ).join('')}
                    </div>
                </div>
                <div class="game-controls">
                    <button class="btn btn--primary" id="memoryResetBtn">New Game</button>
                </div>
            </div>
        `;

        this.addStyles();
        this.bindEvents();
    }

    addStyles() {
        const existingStyle = document.getElementById('memory-styles');
        if (existingStyle) existingStyle.remove();

        const style = document.createElement('style');
        style.id = 'memory-styles';
        style.textContent = `
            .memory-grid {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 15px;
                max-width: 400px;
                margin: 0 auto;
            }
            .memory-card {
                aspect-ratio: 1;
                background: rgba(255, 255, 255, 0.1);
                border: 2px solid rgba(0, 212, 255, 0.3);
                border-radius: 10px;
                cursor: pointer;
                position: relative;
                transition: all 0.3s ease;
                transform-style: preserve-3d;
            }
            .memory-card:hover {
                transform: scale(1.05);
            }
            .memory-card.flipped {
                transform: rotateY(180deg);
            }
            .memory-card.matched {
                opacity: 0.6;
                cursor: not-allowed;
                background: rgba(0, 212, 255, 0.2);
            }
            .card-front, .card-back {
                position: absolute;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 2rem;
                font-weight: bold;
                border-radius: 8px;
                backface-visibility: hidden;
            }
            .card-front {
                background: rgba(255, 255, 255, 0.1);
                color: rgba(255, 255, 255, 0.7);
            }
            .card-back {
                background: rgba(0, 212, 255, 0.2);
                transform: rotateY(180deg);
            }
        `;
        document.head.appendChild(style);
    }

    bindEvents() {
        this.container.addEventListener('click', (e) => {
            const card = e.target.closest('.memory-card');
            if (card) {
                this.flipCard(card);
            }
            if (e.target.id === 'memoryResetBtn') {
                this.resetGame();
            }
        });
    }

    flipCard(cardElement) {
        if (cardElement.classList.contains('flipped') || 
            cardElement.classList.contains('matched') || 
            this.flippedCards.length >= 2) return;

        cardElement.classList.add('flipped');
        this.flippedCards.push(cardElement);

        if (this.flippedCards.length === 2) {
            this.moves++;
            const movesElement = document.getElementById('memoryMoves');
            if (movesElement) movesElement.textContent = this.moves;
            
            setTimeout(() => this.checkMatch(), 1000);
        }
    }

    checkMatch() {
        const [card1, card2] = this.flippedCards;
        const value1 = card1.dataset.value;
        const value2 = card2.dataset.value;

        if (value1 === value2) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            this.matchedPairs++;
            const pairsElement = document.getElementById('memoryPairs');
            if (pairsElement) pairsElement.textContent = this.matchedPairs;

            if (this.matchedPairs === 8) {
                setTimeout(() => {
                    alert(`🎉 Congratulations! You won in ${this.moves} moves!`);
                }, 500);
            }
        } else {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }

        this.flippedCards = [];
    }

    resetGame() {
        this.gameCards = [...this.cards, ...this.cards].sort(() => Math.random() - 0.5);
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.moves = 0;
        
        const movesElement = document.getElementById('memoryMoves');
        const pairsElement = document.getElementById('memoryPairs');
        
        if (movesElement) movesElement.textContent = '0';
        if (pairsElement) pairsElement.textContent = '0';
        
        // Regenerate the grid
        const memoryGrid = this.container.querySelector('.memory-grid');
        if (memoryGrid) {
            memoryGrid.innerHTML = this.gameCards.map((card, index) => 
                `<div class="memory-card" data-index="${index}" data-value="${card}">
                    <div class="card-front">?</div>
                    <div class="card-back">${card}</div>
                </div>`
            ).join('');
        }
    }
}

// Whack-a-Mole Game - FIXED
class WhackAMole {
    constructor(container) {
        this.container = container;
        this.score = 0;
        this.timeLeft = 30;
        this.gameActive = false;
        this.moleTimeout = null;
        this.gameTimer = null;
        this.init();
    }

    init() {
        this.container.innerHTML = `
            <div class="game-container">
                <div class="game-info">
                    <div class="score">Score: <span id="whackScore">0</span> | Time: <span id="whackTimeLeft">30</span>s</div>
                </div>
                <div class="game-board">
                    <div class="whack-grid">
                        ${Array.from({length: 9}, (_, i) => 
                            `<div class="mole-hole" data-hole="${i}">
                                <div class="mole" data-mole="${i}">🐹</div>
                            </div>`
                        ).join('')}
                    </div>
                </div>
                <div class="game-controls">
                    <button class="btn btn--primary" id="startWhack">Start Game</button>
                    <button class="btn btn--outline" id="whackResetBtn">Reset</button>
                </div>
            </div>
        `;

        this.addStyles();
        this.bindEvents();
    }

    addStyles() {
        const existingStyle = document.getElementById('whack-styles');
        if (existingStyle) existingStyle.remove();

        const style = document.createElement('style');
        style.id = 'whack-styles';
        style.textContent = `
            .whack-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 20px;
                max-width: 400px;
                margin: 0 auto;
            }
            .mole-hole {
                width: 100px;
                height: 100px;
                background: rgba(139, 69, 19, 0.3);
                border: 3px solid rgba(139, 69, 19, 0.6);
                border-radius: 50%;
                position: relative;
                overflow: hidden;
            }
            .mole {
                position: absolute;
                width: 80%;
                height: 80%;
                left: 10%;
                top: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 3rem;
                cursor: pointer;
                transition: top 0.3s ease;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 50%;
                user-select: none;
            }
            .mole.up {
                top: 10%;
            }
            .mole:hover {
                transform: scale(1.1);
            }
        `;
        document.head.appendChild(style);
    }

    bindEvents() {
        this.container.addEventListener('click', (e) => {
            if (e.target.id === 'startWhack') {
                this.startGame();
            }
            if (e.target.id === 'whackResetBtn') {
                this.resetGame();
            }
            if (e.target.classList.contains('mole')) {
                this.whackMole(e.target);
            }
        });
    }

    startGame() {
        if (this.gameActive) return;
        
        this.gameActive = true;
        this.score = 0;
        this.timeLeft = 30;
        
        const scoreElement = document.getElementById('whackScore');
        const timeElement = document.getElementById('whackTimeLeft');
        const startBtn = document.getElementById('startWhack');
        
        if (scoreElement) scoreElement.textContent = '0';
        if (timeElement) timeElement.textContent = '30';
        if (startBtn) {
            startBtn.textContent = 'Playing...';
            startBtn.disabled = true;
        }

        this.gameTimer = setInterval(() => {
            this.timeLeft--;
            if (timeElement) timeElement.textContent = this.timeLeft;
            
            if (this.timeLeft <= 0) {
                this.endGame();
            }
        }, 1000);

        this.spawnMole();
    }

    spawnMole() {
        if (!this.gameActive) return;

        // Hide all moles first
        this.container.querySelectorAll('.mole').forEach(mole => {
            mole.classList.remove('up');
        });

        // Show random mole
        const randomHole = Math.floor(Math.random() * 9);
        const mole = this.container.querySelector(`[data-mole="${randomHole}"]`);
        if (mole) {
            mole.classList.add('up');
        }

        this.moleTimeout = setTimeout(() => {
            if (mole) mole.classList.remove('up');
            this.spawnMole();
        }, 800 + Math.random() * 1000);
    }

    whackMole(mole) {
        if (!this.gameActive || !mole.classList.contains('up')) return;

        mole.classList.remove('up');
        this.score += 10;
        
        const scoreElement = document.getElementById('whackScore');
        if (scoreElement) scoreElement.textContent = this.score;

        // Visual feedback
        mole.style.background = 'rgba(0, 212, 255, 0.5)';
        setTimeout(() => {
            mole.style.background = 'rgba(255, 255, 255, 0.1)';
        }, 200);
    }

    endGame() {
        this.gameActive = false;
        if (this.moleTimeout) clearTimeout(this.moleTimeout);
        if (this.gameTimer) clearInterval(this.gameTimer);
        
        const startBtn = document.getElementById('startWhack');
        if (startBtn) {
            startBtn.textContent = 'Start Game';
            startBtn.disabled = false;
        }
        
        this.container.querySelectorAll('.mole').forEach(mole => {
            mole.classList.remove('up');
        });

        setTimeout(() => {
            alert(`Game Over! Your score: ${this.score}`);
        }, 500);
    }

    resetGame() {
        this.endGame();
        this.score = 0;
        this.timeLeft = 30;
        
        const scoreElement = document.getElementById('whackScore');
        const timeElement = document.getElementById('whackTimeLeft');
        
        if (scoreElement) scoreElement.textContent = '0';
        if (timeElement) timeElement.textContent = '30';
    }

    destroy() {
        if (this.moleTimeout) clearTimeout(this.moleTimeout);
        if (this.gameTimer) clearInterval(this.gameTimer);
    }
}

// Snake Game
class SnakeGame {
    constructor(container) {
        this.container = container;
        this.canvas = null;
        this.ctx = null;
        this.snake = [{x: 200, y: 200}];
        this.food = {x: 0, y: 0};
        this.direction = {x: 0, y: 0};
        this.score = 0;
        this.gameRunning = false;
        this.gameLoop = null;
        this.init();
    }

    init() {
        this.container.innerHTML = `
            <div class="game-container">
                <div class="game-info">
                    <div class="score">Score: <span id="snakeScore">0</span></div>
                    <div style="color: rgba(255,255,255,0.7); margin-top: 5px; text-align: center;">
                        Use arrow keys or WASD to move
                    </div>
                </div>
                <div class="game-board">
                    <canvas id="snakeCanvas" width="400" height="400"></canvas>
                </div>
                <div class="game-controls">
                    <button class="btn btn--primary" id="startSnake">Start Game</button>
                    <button class="btn btn--secondary" id="pauseSnake">Pause</button>
                    <button class="btn btn--outline" id="snakeResetBtn">Reset</button>
                </div>
            </div>
        `;

        this.canvas = document.getElementById('snakeCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.generateFood();
        this.draw();
        this.bindEvents();
    }

    bindEvents() {
        this.container.addEventListener('click', (e) => {
            if (e.target.id === 'startSnake') {
                this.startGame();
            }
            if (e.target.id === 'pauseSnake') {
                this.pauseGame();
            }
            if (e.target.id === 'snakeResetBtn') {
                this.resetGame();
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (!this.gameRunning) return;
            
            switch(e.key.toLowerCase()) {
                case 'arrowup':
                case 'w':
                    if (this.direction.y === 0) this.direction = {x: 0, y: -20};
                    break;
                case 'arrowdown':
                case 's':
                    if (this.direction.y === 0) this.direction = {x: 0, y: 20};
                    break;
                case 'arrowleft':
                case 'a':
                    if (this.direction.x === 0) this.direction = {x: -20, y: 0};
                    break;
                case 'arrowright':
                case 'd':
                    if (this.direction.x === 0) this.direction = {x: 20, y: 0};
                    break;
            }
        });
    }

    startGame() {
        if (this.gameRunning) return;
        this.gameRunning = true;
        const startBtn = document.getElementById('startSnake');
        if (startBtn) startBtn.textContent = 'Running...';
        this.gameLoop = setInterval(() => this.update(), 150);
    }

    pauseGame() {
        this.gameRunning = false;
        if (this.gameLoop) {
            clearInterval(this.gameLoop);
            this.gameLoop = null;
        }
        const startBtn = document.getElementById('startSnake');
        if (startBtn) startBtn.textContent = 'Start Game';
    }

    update() {
        const head = {x: this.snake[0].x + this.direction.x, y: this.snake[0].y + this.direction.y};

        // Check wall collision
        if (head.x < 0 || head.x >= 400 || head.y < 0 || head.y >= 400) {
            this.gameOver();
            return;
        }

        // Check self collision
        if (this.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            this.gameOver();
            return;
        }

        this.snake.unshift(head);

        // Check food collision
        if (head.x === this.food.x && head.y === this.food.y) {
            this.score += 10;
            const scoreElement = document.getElementById('snakeScore');
            if (scoreElement) scoreElement.textContent = this.score;
            this.generateFood();
        } else {
            this.snake.pop();
        }

        this.draw();
    }

    generateFood() {
        this.food = {
            x: Math.floor(Math.random() * 20) * 20,
            y: Math.floor(Math.random() * 20) * 20
        };
    }

    draw() {
        if (!this.ctx) return;

        // Clear canvas
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        this.ctx.fillRect(0, 0, 400, 400);

        // Draw snake
        this.snake.forEach((segment, index) => {
            if (index === 0) {
                this.ctx.fillStyle = '#9d4edd'; // Head color
            } else {
                this.ctx.fillStyle = '#00d4ff'; // Body color
            }
            this.ctx.fillRect(segment.x, segment.y, 18, 18);
        });

        // Draw food
        this.ctx.fillStyle = '#ff006e';
        this.ctx.fillRect(this.food.x, this.food.y, 18, 18);
    }

    gameOver() {
        this.pauseGame();
        setTimeout(() => {
            alert(`Game Over! Your score: ${this.score}`);
        }, 100);
    }

    resetGame() {
        this.pauseGame();
        this.snake = [{x: 200, y: 200}];
        this.direction = {x: 0, y: 0};
        this.score = 0;
        const scoreElement = document.getElementById('snakeScore');
        if (scoreElement) scoreElement.textContent = '0';
        this.generateFood();
        this.draw();
    }

    destroy() {
        if (this.gameLoop) {
            clearInterval(this.gameLoop);
        }
    }
}

// Placeholder classes for other games
class PongGame {
    constructor(container) {
        container.innerHTML = `
            <div class="game-container">
                <p style="color: rgba(255,255,255,0.7); text-align: center;">
                    🏓 Pong Game coming soon! 🚧<br>
                    Classic table tennis-style gameplay with bouncing ball and paddles.
                </p>
            </div>
        `;
    }
}

class BreakoutGame {
    constructor(container) {
        container.innerHTML = `
            <div class="game-container">
                <p style="color: rgba(255,255,255,0.7); text-align: center;">
                    🧱 Breakout Game coming soon! 🚧<br>
                    Break colorful blocks using a bouncing ball.
                </p>
            </div>
        `;
    }
}

class FlappyBirdGame {
    constructor(container) {
        container.innerHTML = `
            <div class="game-container">
                <p style="color: rgba(255,255,255,0.7); text-align: center;">
                    🐦 Flappy Bird Clone coming soon! 🚧<br>
                    Click to keep the bird flying through pipes.
                </p>
            </div>
        `;
    }
}

class Game2048 {
    constructor(container) {
        container.innerHTML = `
            <div class="game-container">
                <p style="color: rgba(255,255,255,0.7); text-align: center;">
                    🔢 2048 Game coming soon! 🚧<br>
                    Combine number tiles to reach 2048.
                </p>
            </div>
        `;
    }
}

class MinesweeperGame {
    constructor(container) {
        container.innerHTML = `
            <div class="game-container">
                <p style="color: rgba(255,255,255,0.7); text-align: center;">
                    💣 Minesweeper coming soon! 🚧<br>
                    Find safe tiles while avoiding hidden mines.
                </p>
            </div>
        `;
    }
}

class SimonSaysGame {
    constructor(container) {
        container.innerHTML = `
            <div class="game-container">
                <p style="color: rgba(255,255,255,0.7); text-align: center;">
                    🔴 Simon Says coming soon! 🚧<br>
                    Repeat the sequence of lights and sounds.
                </p>
            </div>
        `;
    }
}

class SudokuGame {
    constructor(container) {
        container.innerHTML = `
            <div class="game-container">
                <p style="color: rgba(255,255,255,0.7); text-align: center;">
                    🔢 Sudoku coming soon! 🚧<br>
                    Fill the 9x9 grid with numbers without repeating.
                </p>
            </div>
        `;
    }
}

class HangmanGame {
    constructor(container) {
        container.innerHTML = `
            <div class="game-container">
                <p style="color: rgba(255,255,255,0.7); text-align: center;">
                    🎪 Hangman coming soon! 🚧<br>
                    Guess the hidden word before time runs out.
                </p>
            </div>
        `;
    }
}

class PlatformerGame {
    constructor(container) {
        container.innerHTML = `
            <div class="game-container">
                <p style="color: rgba(255,255,255,0.7); text-align: center;">
                    🏃 Platformer Game coming soon! 🚧<br>
                    Run and jump to collect coins in a Mario-style adventure.
                </p>
            </div>
        `;
    }
}

class TypingTestGame {
    constructor(container) {
        container.innerHTML = `
            <div class="game-container">
                <p style="color: rgba(255,255,255,0.7); text-align: center;">
                    ⌨️ Typing Speed Test coming soon! 🚧<br>
                    Test your typing speed and accuracy with WPM measurement.
                </p>
            </div>
        `;
    }
}

class QuizGame {
    constructor(container) {
        container.innerHTML = `
            <div class="game-container">
                <p style="color: rgba(255,255,255,0.7); text-align: center;">
                    ❓ Quiz Game coming soon! 🚧<br>
                    Answer multiple-choice questions with a timer.
                </p>
            </div>
        `;
    }
}

class PuzzleGame {
    constructor(container) {
        container.innerHTML = `
            <div class="game-container">
                <p style="color: rgba(255,255,255,0.7); text-align: center;">
                    🧩 Drag & Drop Puzzle coming soon! 🚧<br>
                    Arrange puzzle pieces to complete the image.
                </p>
            </div>
        `;
    }
}

class CatchObjectsGame {
    constructor(container) {
        container.innerHTML = `
            <div class="game-container">
                <p style="color: rgba(255,255,255,0.7); text-align: center;">
                    🗑️ Catch the Falling Objects coming soon! 🚧<br>
                    Move your basket to catch falling items.
                </p>
            </div>
        `;
    }
}

class TreasureHuntGame {
    constructor(container) {
        container.innerHTML = `
            <div class="game-container">
                <p style="color: rgba(255,255,255,0.7); text-align: center;">
                    🏴‍☠️ Treasure Hunt coming soon! 🚧<br>
                    Follow clues to find the hidden treasure.
                </p>
            </div>
        `;
    }
}

// Initialize the Game Hub when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.gameHub = new GameHub();
});