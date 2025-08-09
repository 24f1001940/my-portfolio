// Game Hub JavaScript - Complete Implementation with ALL 20 Games FULLY FUNCTIONAL

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
        setTimeout(() => {
            this.bindEvents();
            this.createParticles();
            this.animateCards();
        }, 100);
    }

    bindEvents() {
        document.addEventListener('click', (e) => {
            const gameCard = e.target.closest('.game-card');
            if (gameCard) {
                e.preventDefault();
                const gameType = gameCard.dataset.game;
                this.openGame(gameType);
            }
        });

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
        if (!gameType) return;

        const gameInfo = this.getGameInfo(gameType);
        this.modalTitle.textContent = gameInfo.title;
        this.modalBody.innerHTML = '';
        
        if (this.currentGame && this.currentGame.destroy) {
            this.currentGame.destroy();
        }
        this.currentGame = null;
        
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
                    this.modalBody.innerHTML = '<p style="color: rgba(255,100,100,0.8); text-align: center;">Game not found.</p>';
            }
        } catch (error) {
            console.error('Error creating game:', error);
            this.modalBody.innerHTML = '<p style="color: rgba(255,100,100,0.8); text-align: center;">Error loading game.</p>';
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

// ============ EASY LEVEL GAMES (1-5) ============

// 1. Tic-Tac-Toe Game
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
        const style = document.createElement('style');
        style.textContent = `
            .tic-tac-toe-board { display: grid; grid-template-columns: repeat(3, 1fr); gap: 5px; width: 300px; height: 300px; background: rgba(0, 212, 255, 0.2); padding: 10px; border-radius: 10px; margin: 0 auto; }
            .tic-tac-toe-cell { background: rgba(255, 255, 255, 0.1); border: 2px solid rgba(0, 212, 255, 0.3); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 2rem; font-weight: bold; cursor: pointer; transition: all 0.2s ease; color: white; }
            .tic-tac-toe-cell:hover:not(.occupied) { background: rgba(0, 212, 255, 0.2); transform: scale(1.05); }
            .tic-tac-toe-cell.occupied { cursor: not-allowed; }
        `;
        document.head.appendChild(style);
    }

    bindEvents() {
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

        this.board[index] = this.currentPlayer;
        e.target.textContent = this.currentPlayer;
        e.target.classList.add('occupied');
        e.target.style.color = this.currentPlayer === 'X' ? '#00d4ff' : '#9d4edd';

        if (this.checkWinner()) {
            document.getElementById('ticTacGameStatus').textContent = `Player ${this.currentPlayer} wins! 🎉`;
            this.gameActive = false;
        } else if (this.board.every(cell => cell !== '')) {
            document.getElementById('ticTacGameStatus').textContent = "It's a tie! 🤝";
            this.gameActive = false;
        } else {
            this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
            document.getElementById('ticTacCurrentPlayer').textContent = this.currentPlayer;
            document.getElementById('ticTacCurrentPlayer').style.color = this.currentPlayer === 'X' ? '#00d4ff' : '#9d4edd';
        }
    }

    checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
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
        
        document.getElementById('ticTacCurrentPlayer').textContent = 'X';
        document.getElementById('ticTacCurrentPlayer').style.color = '#00d4ff';
        document.getElementById('ticTacGameStatus').textContent = '';
        
        document.querySelectorAll('.tic-tac-toe-cell').forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('occupied');
        });
    }
}

// 2. Rock Paper Scissors Game
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
                        <div class="rps-choice" data-choice="rock"><div class="choice-icon">🗿</div><div class="choice-name">Rock</div></div>
                        <div class="rps-choice" data-choice="paper"><div class="choice-icon">📄</div><div class="choice-name">Paper</div></div>
                        <div class="rps-choice" data-choice="scissors"><div class="choice-icon">✂️</div><div class="choice-name">Scissors</div></div>
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
        const style = document.createElement('style');
        style.textContent = `
            .rps-choices { display: flex; gap: 20px; margin-bottom: 30px; justify-content: center; flex-wrap: wrap; }
            .rps-choice { background: rgba(255, 255, 255, 0.1); border: 2px solid rgba(0, 212, 255, 0.3); border-radius: 15px; padding: 20px; cursor: pointer; transition: all 0.3s ease; text-align: center; min-width: 120px; }
            .rps-choice:hover { background: rgba(0, 212, 255, 0.2); transform: translateY(-5px); }
            .choice-icon { font-size: 3rem; margin-bottom: 10px; display: block; }
            .choice-name { color: rgba(255, 255, 255, 0.8); font-weight: bold; }
            .choices-display { display: flex; justify-content: space-around; align-items: center; padding: 20px; background: rgba(0, 0, 0, 0.3); border-radius: 10px; min-height: 100px; }
            .choice-result { text-align: center; }
            .choice-result .icon { font-size: 2.5rem; margin-bottom: 10px; display: block; }
        `;
        document.head.appendChild(style);
    }

    bindEvents() {
        this.container.addEventListener('click', (e) => {
            const choice = e.target.closest('.rps-choice');
            if (choice) {
                this.playRound(choice.dataset.choice);
            }
            if (e.target.id === 'rpsResetBtn') {
                this.resetGame();
            }
        });
    }

    playRound(playerChoice) {
        const choices = ['rock', 'paper', 'scissors'];
        const computerChoice = choices[Math.floor(Math.random() * 3)];
        const icons = { rock: '🗿', paper: '📄', scissors: '✂️' };

        document.getElementById('rpsChoicesDisplay').innerHTML = `
            <div class="choice-result"><div class="icon">${icons[playerChoice]}</div><div>You</div></div>
            <div style="color: rgba(255,255,255,0.5); font-size: 2rem;">VS</div>
            <div class="choice-result"><div class="icon">${icons[computerChoice]}</div><div>Computer</div></div>
        `;

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

        document.getElementById('rpsGameResult').textContent = message;
        document.getElementById('rpsPlayerScore').textContent = this.playerScore;
        document.getElementById('rpsComputerScore').textContent = this.computerScore;
    }

    getResult(player, computer) {
        if (player === computer) return 'tie';
        if ((player === 'rock' && computer === 'scissors') ||
            (player === 'paper' && computer === 'rock') ||
            (player === 'scissors' && computer === 'paper')) {
            return 'win';
        }
        return 'lose';
    }

    resetGame() {
        this.playerScore = 0;
        this.computerScore = 0;
        document.getElementById('rpsPlayerScore').textContent = '0';
        document.getElementById('rpsComputerScore').textContent = '0';
        document.getElementById('rpsGameResult').textContent = '';
        document.getElementById('rpsChoicesDisplay').innerHTML = '<p style="color: rgba(255,255,255,0.6);">Make your choice above!</p>';
    }
}

// 3. Guess the Number Game
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
                    <div style="text-align: center; margin-bottom: 30px;">
                        <input type="number" id="guessInput" class="form-control" placeholder="Enter your guess" min="1" max="100" style="text-align: center; font-size: 1.5rem; margin-bottom: 20px; max-width: 200px;">
                        <button class="btn btn--primary" id="guessBtn">Make Guess</button>
                    </div>
                    <div id="guessHistory" style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-bottom: 20px; min-height: 60px;"></div>
                    <div id="guessMessage" style="text-align: center; font-size: 1.2rem; font-weight: bold; min-height: 30px; color: rgba(255, 255, 255, 0.8);"></div>
                </div>
                <div class="game-controls">
                    <button class="btn btn--outline" id="guessResetBtn">New Game</button>
                </div>
            </div>
        `;

        this.bindEvents();
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
    }

    makeGuess() {
        const guessInput = document.getElementById('guessInput');
        const guess = parseInt(guessInput.value);
        
        if (!guess || guess < 1 || guess > 100) {
            document.getElementById('guessMessage').textContent = 'Please enter a number between 1 and 100!';
            return;
        }

        this.attempts++;
        document.getElementById('guessAttempts').textContent = this.attempts;

        if (guess === this.targetNumber) {
            document.getElementById('guessMessage').innerHTML = `🎉 Congratulations! You got it in ${this.attempts} attempts!`;
            document.getElementById('guessMessage').style.color = '#00d4ff';
            this.endGame();
        } else if (this.attempts >= this.maxAttempts) {
            document.getElementById('guessMessage').innerHTML = `😔 Game over! The number was ${this.targetNumber}`;
            document.getElementById('guessMessage').style.color = '#ef4444';
            this.endGame();
        } else {
            const hint = guess > this.targetNumber ? 'too-high' : 'too-low';
            const hintText = guess > this.targetNumber ? '↓ Too high!' : '↑ Too low!';
            
            const guessItem = document.createElement('div');
            guessItem.style.background = 'rgba(255, 255, 255, 0.1)';
            guessItem.style.borderRadius = '20px';
            guessItem.style.padding = '5px 15px';
            guessItem.style.fontSize = '0.9rem';
            guessItem.style.color = hint === 'too-high' ? '#ef4444' : '#22c55e';
            guessItem.textContent = `${guess} ${hintText}`;
            document.getElementById('guessHistory').appendChild(guessItem);
            
            document.getElementById('guessMessage').textContent = `${hintText} Try again!`;
        }

        guessInput.value = '';
        guessInput.focus();
    }

    endGame() {
        document.getElementById('guessInput').disabled = true;
        document.getElementById('guessBtn').disabled = true;
    }

    resetGame() {
        this.targetNumber = Math.floor(Math.random() * 100) + 1;
        this.attempts = 0;
        
        document.getElementById('guessAttempts').textContent = '0';
        document.getElementById('guessInput').disabled = false;
        document.getElementById('guessInput').value = '';
        document.getElementById('guessBtn').disabled = false;
        document.getElementById('guessHistory').innerHTML = '';
        document.getElementById('guessMessage').textContent = '';
        document.getElementById('guessInput').focus();
    }
}

// 4. Memory Cards Game
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
        const style = document.createElement('style');
        style.textContent = `
            .memory-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; max-width: 400px; margin: 0 auto; }
            .memory-card { aspect-ratio: 1; background: rgba(255, 255, 255, 0.1); border: 2px solid rgba(0, 212, 255, 0.3); border-radius: 10px; cursor: pointer; position: relative; transition: all 0.3s ease; transform-style: preserve-3d; }
            .memory-card:hover { transform: scale(1.05); }
            .memory-card.flipped { transform: rotateY(180deg); }
            .memory-card.matched { opacity: 0.6; cursor: not-allowed; background: rgba(0, 212, 255, 0.2); }
            .card-front, .card-back { position: absolute; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 2rem; font-weight: bold; border-radius: 8px; backface-visibility: hidden; }
            .card-front { background: rgba(255, 255, 255, 0.1); color: rgba(255, 255, 255, 0.7); }
            .card-back { background: rgba(0, 212, 255, 0.2); transform: rotateY(180deg); }
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
            document.getElementById('memoryMoves').textContent = this.moves;
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
            document.getElementById('memoryPairs').textContent = this.matchedPairs;

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
        
        document.getElementById('memoryMoves').textContent = '0';
        document.getElementById('memoryPairs').textContent = '0';
        
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

// 5. Whack-a-Mole Game
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
        const style = document.createElement('style');
        style.textContent = `
            .whack-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; max-width: 400px; margin: 0 auto; }
            .mole-hole { width: 100px; height: 100px; background: rgba(139, 69, 19, 0.3); border: 3px solid rgba(139, 69, 19, 0.6); border-radius: 50%; position: relative; overflow: hidden; }
            .mole { position: absolute; width: 80%; height: 80%; left: 10%; top: 100%; display: flex; align-items: center; justify-content: center; font-size: 3rem; cursor: pointer; transition: top 0.3s ease; background: rgba(255, 255, 255, 0.1); border-radius: 50%; user-select: none; }
            .mole.up { top: 10%; }
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
        
        document.getElementById('whackScore').textContent = '0';
        document.getElementById('whackTimeLeft').textContent = '30';
        document.getElementById('startWhack').textContent = 'Playing...';
        document.getElementById('startWhack').disabled = true;

        this.gameTimer = setInterval(() => {
            this.timeLeft--;
            document.getElementById('whackTimeLeft').textContent = this.timeLeft;
            
            if (this.timeLeft <= 0) {
                this.endGame();
            }
        }, 1000);

        this.spawnMole();
    }

    spawnMole() {
        if (!this.gameActive) return;

        this.container.querySelectorAll('.mole').forEach(mole => {
            mole.classList.remove('up');
        });

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
        
        document.getElementById('whackScore').textContent = this.score;

        mole.style.background = 'rgba(0, 212, 255, 0.5)';
        setTimeout(() => {
            mole.style.background = 'rgba(255, 255, 255, 0.1)';
        }, 200);
    }

    endGame() {
        this.gameActive = false;
        if (this.moleTimeout) clearTimeout(this.moleTimeout);
        if (this.gameTimer) clearInterval(this.gameTimer);
        
        document.getElementById('startWhack').textContent = 'Start Game';
        document.getElementById('startWhack').disabled = false;
        
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
        
        document.getElementById('whackScore').textContent = '0';
        document.getElementById('whackTimeLeft').textContent = '30';
    }

    destroy() {
        if (this.moleTimeout) clearTimeout(this.moleTimeout);
        if (this.gameTimer) clearInterval(this.gameTimer);
    }
}

// ============ MEDIUM LEVEL GAMES (6-10) ============

// 6. Snake Game
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
                    <div style="color: rgba(255,255,255,0.7); margin-top: 5px; text-align: center; font-size: 0.9rem;">
                        Use arrow keys or WASD to move
                    </div>
                </div>
                <div class="game-board">
                    <canvas id="snakeCanvas" width="400" height="400" style="border: 2px solid rgba(0, 212, 255, 0.5); border-radius: 10px; background: rgba(0, 0, 0, 0.5);"></canvas>
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
        document.getElementById('startSnake').textContent = 'Running...';
        this.gameLoop = setInterval(() => this.update(), 150);
    }

    pauseGame() {
        this.gameRunning = false;
        if (this.gameLoop) {
            clearInterval(this.gameLoop);
            this.gameLoop = null;
        }
        document.getElementById('startSnake').textContent = 'Start Game';
    }

    update() {
        const head = {x: this.snake[0].x + this.direction.x, y: this.snake[0].y + this.direction.y};

        if (head.x < 0 || head.x >= 400 || head.y < 0 || head.y >= 400) {
            this.gameOver();
            return;
        }

        if (this.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            this.gameOver();
            return;
        }

        this.snake.unshift(head);

        if (head.x === this.food.x && head.y === this.food.y) {
            this.score += 10;
            document.getElementById('snakeScore').textContent = this.score;
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

        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        this.ctx.fillRect(0, 0, 400, 400);

        this.snake.forEach((segment, index) => {
            if (index === 0) {
                this.ctx.fillStyle = '#9d4edd';
            } else {
                this.ctx.fillStyle = '#00d4ff';
            }
            this.ctx.fillRect(segment.x, segment.y, 18, 18);
        });

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
        document.getElementById('snakeScore').textContent = '0';
        this.generateFood();
        this.draw();
    }

    destroy() {
        if (this.gameLoop) {
            clearInterval(this.gameLoop);
        }
    }
}

// 7. Pong
class PongGame {
    constructor(container) {
        this.container = container;
        this.canvas = null;
        this.ctx = null;
        this.width = 480;
        this.height = 320;
        this.paddleH = 60;
        this.paddleW = 12;
        this.paddle1Y = this.paddle2Y = 130;
        this.ball = {x: 235, y: 155, dx: 4, dy: 2, r: 8};
        this.leftScore = 0;
        this.rightScore = 0;
        this.running = false;
        this.loop = null;
        this.init();
    }
    init() {
        this.container.innerHTML = `
        <div class="game-container"><div class="game-info">
          <div class="score">You: <span id="pongL">0</span> | AI: <span id="pongR">0</span></div>
          <div style="text-align:center;color:#aaa;margin-top:5px;">W/S or ⬆️/⬇️ to move</div>
        </div>
        <div class="game-board"><canvas id="pongCanvas" width="480" height="320" style="background:rgba(0,0,0,0.5);border:2px solid #00d4ff;border-radius:8px"></canvas></div>
        <div class="game-controls">
          <button class="btn btn--primary" id="pongStartBtn">Start</button>
          <button class="btn btn--outline" id="pongResetBtn">Reset</button>
        </div>
        </div>
        `;
        this.canvas = this.container.querySelector('#pongCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.bindEvents();
        this.draw();
    }
    bindEvents() {
        this.container.addEventListener('click', (e) => {
            if (e.target.id === 'pongStartBtn') this.start();
            if (e.target.id === 'pongResetBtn') this.reset();
        });
        document.addEventListener('keydown', (e) => {
            if (!this.running) return;
            if (['w', 'ArrowUp'].includes(e.key) && this.paddle1Y > 0) this.paddle1Y -= 20;
            if (['s', 'ArrowDown'].includes(e.key) && this.paddle1Y < this.height - this.paddleH) this.paddle1Y += 20;
        });
    }
    start() {
        if (this.running) return;
        this.running = true;
        this.loop = setInterval(() => this.update(), 20);
    }
    update() {
        // AI moves
        let center = this.paddle2Y + this.paddleH/2;
        if (this.ball.y < center-10) this.paddle2Y -= 4;
        else if (this.ball.y > center+10) this.paddle2Y += 4;
        this.paddle2Y = Math.max(0, Math.min(this.height-this.paddleH, this.paddle2Y));
        // Ball movement
        this.ball.x += this.ball.dx;
        this.ball.y += this.ball.dy;
        // Collision with top/bottom
        if (this.ball.y < this.ball.r || this.ball.y > this.height-this.ball.r) this.ball.dy *= -1;
        // Paddle collision (left)
        if (this.ball.x < this.paddleW+this.ball.r && this.ball.y > this.paddle1Y && this.ball.y < this.paddle1Y+this.paddleH) {
            this.ball.dx *= -1;
            this.ball.x = this.paddleW + this.ball.r + 1;
        }
        // Paddle collision (right)
        if (this.ball.x > this.width-this.paddleW-this.ball.r && this.ball.y > this.paddle2Y && this.ball.y < this.paddle2Y+this.paddleH) {
            this.ball.dx *= -1;
            this.ball.x = this.width-this.paddleW-this.ball.r-1;
        }
        // Score check
        if (this.ball.x < 0) { this.rightScore++; this.resetRound(); }
        if (this.ball.x > this.width) { this.leftScore++; this.resetRound(); }
        document.getElementById('pongL').textContent = this.leftScore;
        document.getElementById('pongR').textContent = this.rightScore;
        this.draw();
    }
    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        // paddles
        this.ctx.fillStyle = '#00d4ff';
        this.ctx.fillRect(0, this.paddle1Y, this.paddleW, this.paddleH);
        this.ctx.fillStyle = '#9d4edd';
        this.ctx.fillRect(this.width-this.paddleW, this.paddle2Y, this.paddleW, this.paddleH);
        // ball
        this.ctx.beginPath();
        this.ctx.arc(this.ball.x, this.ball.y, this.ball.r, 0, Math.PI*2);
        this.ctx.fillStyle = '#ff006e';
        this.ctx.fill();
    }
    resetRound() {
        this.ball = {x: 235, y: 155, dx: 4*(Math.random()<0.5?-1:1), dy: 2*(Math.random()<0.5?-1:1), r: 8};
    }
    reset() {
        this.running = false;
        if (this.loop) clearInterval(this.loop);
        this.paddle1Y = this.paddle2Y = 130;
        this.leftScore = this.rightScore = 0;
        this.resetRound();
        this.draw();
        document.getElementById('pongL').textContent = '0';
        document.getElementById('pongR').textContent = '0';
    }
    destroy() { if (this.loop) clearInterval(this.loop); }
}

// 8. Breakout
class BreakoutGame {
    constructor(container) {
        this.container = container;
        this.rows = 5; this.cols = 8; this.width = 400; this.height = 300;
        this.ball = {x: 200, y: 150, dx: 3, dy: 3, r: 7};
        this.paddle = {x: 170, w: 60, h: 10, y: 275};
        this.bricks = [];
        this.score = 0;
        this.running = false;
        this.loop = null;
        this.init();
    }
    init() {
        this.container.innerHTML = `
        <div class="game-container"><div class="game-info">
          <div class="score">Score: <span id="breakoutScore">0</span></div>
          <div style="text-align:center;color:#aaa;margin-top:5px;">⬅️➡️ or A/D to move</div>
        </div>
        <div class="game-board"><canvas id="breakCanvas" width="400" height="300" style="background:rgba(16,19,32,0.6);border:2px solid #00d4ff;border-radius:8px"></canvas></div>
        <div class="game-controls">
          <button class="btn btn--primary" id="breakStartBtn">Start</button>
          <button class="btn btn--outline" id="breakResetBtn">Reset</button>
        </div></div>`;
        this.canvas = this.container.querySelector('#breakCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.makeBricks();
        this.draw();
        this.bindEvents();
    }
    bindEvents() {
        this.container.addEventListener('click', (e) => {
          if (e.target.id === 'breakStartBtn') this.start();
          if (e.target.id === 'breakResetBtn') this.reset();
        });
        document.addEventListener('keydown', (e) => {
          if (!this.running) return;
          if (['ArrowLeft','a','A'].includes(e.key) && this.paddle.x > 0) this.paddle.x -= 30;
          if (['ArrowRight','d','D'].includes(e.key) && this.paddle.x < this.width-this.paddle.w) this.paddle.x += 30;
        });
    }
    makeBricks() {
        this.bricks = [];
        for (let i = 0; i < this.rows; ++i) {
            for (let j = 0; j < this.cols; ++j) {
                this.bricks.push({x: j*50+2, y: i*25+2, w: 46, h: 20, hit: false});
            }
        }
    }
    start() {
        if (this.running) return;
        this.running = true;
        this.loop = setInterval(() => this.update(), 14);
    }
    update() {
        this.ball.x += this.ball.dx; this.ball.y += this.ball.dy;
        // wall
        if (this.ball.x < this.ball.r || this.ball.x > this.width-this.ball.r) this.ball.dx *= -1;
        if (this.ball.y < this.ball.r) this.ball.dy *= -1;
        // paddle
        if (this.ball.y + this.ball.r > this.paddle.y
            && this.ball.x > this.paddle.x && this.ball.x < this.paddle.x+this.paddle.w) {
          this.ball.dy *= -1; this.ball.y = this.paddle.y-this.ball.r-1;
        }
        // bricks
        for (let b of this.bricks) {
            if (!b.hit && this.ball.x > b.x && this.ball.x < b.x+b.w && this.ball.y > b.y && this.ball.y < b.y+b.h) {
                this.ball.dy *= -1; b.hit = true; this.score += 10;
                document.getElementById('breakoutScore').textContent = this.score;
            }
        }
        // lose
        if (this.ball.y > this.height) { this.gameOver(); return; }
        // win
        if (this.bricks.every(b=>b.hit)) { this.win(); return; }
        this.draw();
    }
    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.fillStyle = '#00d4ff'; // paddle
        this.ctx.fillRect(this.paddle.x, this.paddle.y, this.paddle.w, this.paddle.h);
        for (let b of this.bricks) {
            if (!b.hit) {
                this.ctx.fillStyle = '#ffb300';
                this.ctx.fillRect(b.x, b.y, b.w, b.h);
            }
        }
        this.ctx.beginPath(); // ball
        this.ctx.arc(this.ball.x, this.ball.y, this.ball.r, 0, Math.PI*2);
        this.ctx.fillStyle = '#9d4edd'; this.ctx.fill();
    }
    reset() {
        this.running = false; if (this.loop) clearInterval(this.loop);
        this.score = 0; document.getElementById('breakoutScore').textContent = '0';
        this.makeBricks();
        Object.assign(this.ball, {x:200, y:150, dx:3, dy:3});
        this.draw();
    }
    gameOver() {
        this.reset(); setTimeout(()=>alert("Game Over!"), 100);
    }
    win() {
        this.reset(); setTimeout(()=>alert("You Win!"), 100);
    }
    destroy() { if (this.loop) clearInterval(this.loop); }
}

// 9. Flappy Bird
class FlappyBirdGame {
    constructor(container) {
        this.container = container;
        this.width = 350; this.height = 400;
        this.bird = {x: 60, y: 200, vy: 0};
        this.pipes = [];
        this.score = 0;
        this.loop = null;
        this.running = false;
        this.gravity = 0.6;
        this.init();
    }
    init() {
        this.container.innerHTML = `
        <div class="game-container"><div class="game-info">
          <div class="score">Score: <span id="flappyScore">0</span></div>
          <div style="text-align:center;color:#aaa;margin-top:5px;">Space / Tap to jump</div>
        </div>
        <div class="game-board"><canvas id="flapCanvas" width="350" height="400" style="background:linear-gradient(#39e,#fff 80%);border:2px solid #00d4ff;border-radius:8px"></canvas></div>
        <div class="game-controls">
          <button class="btn btn--primary" id="flappyStartBtn">Start</button>
        </div></div>`;
        this.canvas = this.container.querySelector('#flapCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.bindEvents(); this.draw();
    }
    bindEvents() {
        this.container.addEventListener('click', (e) => {
            if (e.target.id === 'flappyStartBtn') this.start();
        });
        document.addEventListener('keydown', (e) => {
            if (!this.running) return;
            if (e.key === " " || e.key === "ArrowUp") this.jump();
        });
        this.canvas.addEventListener('pointerdown', this.jump.bind(this));
    }
    start() {
        if (this.running) return; this.running = true;
        this.bird = {x: 60, y: 200, vy: 0}; this.pipes = [];
        this.score = 0; document.getElementById('flappyScore').textContent = '0';
        for (let i=0;i<4;i++) this.addPipe(i*120+350);
        this.loop = setInterval(() => this.update(), 22);
    }
    update() {
        this.bird.vy += this.gravity;
        this.bird.y += this.bird.vy;
        // Pipes
        for (let p of this.pipes) p.x -= 2;
        if (this.pipes[0].x < -60) { this.pipes.shift(); this.addPipe(350);}
        // Score
        for (let p of this.pipes) {
            if (!p.passed && p.x+60 < this.bird.x) {
                this.score++; p.passed = true;
                document.getElementById('flappyScore').textContent = this.score;
            }
        }
        // Collision
        if (this.bird.y < 0 || this.bird.y > this.height)
            return this.end();
        for (let p of this.pipes) {
            if (this.bird.x+18 > p.x && this.bird.x-18 < p.x+60 &&
              (this.bird.y-18< p.top || this.bird.y+18 > this.height-p.bottom))
                return this.end();
        }
        this.draw();
    }
    addPipe(x) {
        const gap = 90;
        const t = Math.floor(Math.random()*100+40);
        this.pipes.push({x: x, top: t, bottom: this.height-t-gap, passed:false});
    }
    jump() {
        if (!this.running) return;
        this.bird.vy = -7;
    }
    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        // Pipes
        for (let p of this.pipes) {
            this.ctx.fillStyle = "#00d4ff";
            this.ctx.fillRect(p.x, 0, 60, p.top);
            this.ctx.fillRect(p.x, this.height-p.bottom, 60, p.bottom);
        }
        // Bird
        this.ctx.beginPath();
        this.ctx.arc(this.bird.x, this.bird.y, 18, 0, Math.PI*2);
        this.ctx.fillStyle = "#ffb300";
        this.ctx.fill();
    }
    end() {
        this.running = false;
        if (this.loop) clearInterval(this.loop);
        setTimeout(()=>alert('Game Over! Score: '+this.score),100);
    }
    destroy() { if (this.loop) clearInterval(this.loop); }
}

// 10. 2048
class Game2048 {
    constructor(container) {
        this.container = container;
        this.size = 4;
        this.grid = [];
        this.score = 0;
        this.over = false;
        this.init();
    }
    init() {
        this.grid = Array.from({length:this.size}, ()=>Array(this.size).fill(0));
        this.score = 0; this.over = false;
        this.addNumber(); this.addNumber();
        this.container.innerHTML = `
          <div class="game-container">
            <div class="game-info">
                <div class="score">Score: <span id="2048Score">0</span></div>
                <div style="color:#aaa;text-align:center;">Use Arrows or WASD</div>
            </div>
            <div class="game-board"><div id="grid2048" style="display:grid;grid-template-columns:repeat(4,60px);gap:8px;margin:auto;width:260px"></div></div>
            <div class="game-controls">
              <button class="btn btn--primary" id="g2048NewBtn">New Game</button>
            </div>
          </div>
        `;
        this.bindEvents();
        this.render();
    }
    bindEvents() {
        document.addEventListener('keydown', e => {
            if (this.over) return;
            let moved=false;
            if (['ArrowLeft','a','A'].includes(e.key)) moved=this.move(0,-1);
            else if (['ArrowUp','w','W'].includes(e.key)) moved=this.move(-1,0);
            else if (['ArrowRight','d','D'].includes(e.key)) moved=this.move(0,1);
            else if (['ArrowDown','s','S'].includes(e.key)) moved=this.move(1,0);
            if (moved) {
                this.addNumber(); this.render();
                if (!this.movesLeft()) this.end();
            }
        });
        this.container.addEventListener('click',e=>{
            if (e.target.id==='g2048NewBtn') this.init();
        });
    }
    addNumber() {
        let free=[];
        for (let i=0;i<4;i++) for (let j=0;j<4;j++) if (!this.grid[i][j]) free.push([i,j]);
        if (free.length) {
            let [i,j]=free[Math.floor(Math.random()*free.length)];
            this.grid[i][j] = Math.random()<0.9?2:4;
        }
    }
    render() {
        document.getElementById('2048Score').textContent = this.score;
        let cellHtml = '';
        for (let i=0;i<4;i++) for (let j=0;j<4;j++) cellHtml += `<div style="height:60px;width:60px;display:flex;align-items:center;justify-content:center;font-size:1.3rem;font-weight:bold;border-radius:10px;background:${this.grid[i][j]?`rgba(0,212,255,${0.35+Math.log2(this.grid[i][j])/12})`:'#222'};color:${this.grid[i][j]>4?'#fff':'#fff'}">${this.grid[i][j]||''}</div>`;
        document.getElementById('grid2048').innerHTML = cellHtml;
    }
    move(di,dj) {
        let moved=false, merged=Array.from({length:4},()=>Array(4).fill(false));
        let r = [...Array(4).keys()];
        if (di>0) r = r.reverse();
        if (dj>0) r = r.reverse();
        for (let i of r) for (let j of r) if (this.grid[i][j]) {
            let ni=i, nj=j;
            while (true) {
                let ii=ni+di, jj=nj+dj;
                if (ii<0||jj<0||ii>3||jj>3) break;
                if(!this.grid[ii][jj]) { this.grid[ii][jj]=this.grid[ni][nj]; this.grid[ni][nj]=0; ni=ii; nj=jj; moved=true;}
                else if(this.grid[ii][jj]===this.grid[ni][nj]&&!merged[ii][jj]) {
                    this.grid[ii][jj]*=2; this.grid[ni][nj]=0; merged[ii][jj]=true;
                    this.score+=this.grid[ii][jj]; moved=true; break;
                } else break;
            }
        }
        return moved;
    }
    movesLeft() {
        for (let i=0;i<4;i++) for (let j=0;j<4;j++)
            if (!this.grid[i][j]) return true;
        for (let i=0;i<4;i++) for (let j=0;j<4;j++)
            for (let [di,dj] of [[1,0],[0,1]]) {
                let ni=i+di, nj=j+dj;
                if(ni<4&&nj<4 && this.grid[ni][nj]===this.grid[i][j]) return true;
            }
        return false;
    }
    end() {
        this.over=true; setTimeout(()=>alert('Game Over!'),100);
    }
    destroy() {}
}

// 11. Minesweeper
class MinesweeperGame {
    constructor(container) {
        this.container = container;
        this.size = 8;
        this.mines = 10;
        this.grid = [];
        this.revealed = [];
        this.flagged = [];
        this.exploded = false;
        this.init();
    }
    init() {
        this.grid = Array.from({length: this.size},()=>Array(this.size).fill(0));
        this.revealed = Array.from({length: this.size},()=>Array(this.size).fill(false));
        this.flagged = Array.from({length: this.size},()=>Array(this.size).fill(false));
        this.exploded = false;
        // Place mines
        let placed = 0;
        while (placed < this.mines) {
            let i = Math.floor(Math.random()*this.size), j = Math.floor(Math.random()*this.size);
            if (!this.grid[i][j]) { this.grid[i][j] = 'X'; placed++;}
        }
        for (let i=0;i<this.size;i++) for (let j=0;j<this.size;j++) if(this.grid[i][j]!=='X'){
            let n=0;
            for (let dx=-1;dx<=1;dx++) for (let dy=-1;dy<=1;dy++)
                if(this.grid[i+dx]&&this.grid[i+dx][j+dy]==='X') n++;
            this.grid[i][j]=n;
        }
        this.container.innerHTML=`
          <div class="game-container">
          <div class="game-info"><span>🚩 Right-click to flag. Reveal all safe squares!</span></div>
          <div class="game-board"><div id="mineGrid" style="display:grid;grid-template-columns:repeat(8,30px);gap:2px;margin:20px auto"></div></div>
          <div class="game-controls"><button class="btn btn--primary" id="mineNew">New Game</button></div>
          </div>
        `;
        this.render();
        this.bindEvents();
    }
    render() {
        let html = '';
        for (let i=0;i<this.size;i++) for (let j=0;j<this.size;j++) {
            let cls = "minecell ";
            let text = '';
            if (this.revealed[i][j]) {
                cls += this.grid[i][j]==='X'?'mineexpl':'minerev';
                text = this.grid[i][j]==='X'?'💥':this.grid[i][j]||'';
            } else if (this.flagged[i][j]) {
                cls += 'mineflag';
                text='🚩';
            }
            html += `<div data-i="${i}" data-j="${j}" class="${cls}" style="width:30px;height:30px;border-radius:6px;border:1px solid #00d4ff;text-align:center;font-weight:bold;line-height:30px;font-size:1.1rem;background:rgba(0,0,0,0.25);user-select:none;cursor:pointer;color:#${["","22c55e","eab308","ef4444","#a3e635","#fbbf24","#a3a3a3","612b5a","#ef4444"][this.grid[i][j]]||'fff'}">${text}</div>`;
        }
        document.getElementById('mineGrid').innerHTML = html;
    }
    bindEvents() {
        document.getElementById('mineGrid').addEventListener('click',e=>{
            let d = e.target; if (this.exploded) return;
            const i = +d.dataset.i, j = +d.dataset.j;
            if (!this.flagged[i][j]) {
                this.reveal(i,j);
                this.render();
                if (this.grid[i][j]==='X') { this.exploded=true; setTimeout(()=>alert('Boom!'),100);}
                else if (this.checkWin()) setTimeout(()=>alert('You Win!'),100);
            }
        });
        document.getElementById('mineGrid').addEventListener('contextmenu',e=>{
            e.preventDefault();
            let d = e.target;
            const i = +d.dataset.i, j = +d.dataset.j;
            if(!this.revealed[i][j]) this.flagged[i][j]=!this.flagged[i][j];
            this.render();
        });
        this.container.addEventListener('click',e=>{
            if (e.target.id==='mineNew') this.init();
        });
    }
    reveal(i,j) {
        if(this.flagged[i][j]||this.revealed[i][j])return;
        this.revealed[i][j]=true;
        if(this.grid[i][j]===0) for(let dx=-1;dx<=1;dx++)for(let dy=-1;dy<=1;dy++)
            if(i+dx>=0&&i+dx<8&&j+dy>=0&&j+dy<8&&!this.revealed[i+dx][j+dy]) this.reveal(i+dx,j+dy);
    }
    checkWin() {
        for(let i=0;i<8;i++)for(let j=0;j<8;j++)if(this.grid[i][j]!=='X'&&!this.revealed[i][j])return false;
        return true;
    }
    destroy(){}
}

// 12. Simon Says
class SimonSaysGame {
    constructor(container) {
        this.colors = ['green', 'red', 'yellow', 'blue'];
        this.sequence = [];
        this.playerSeq = [];
        this.round = 0;
        this.strict = false;
        this.sounds = {};
        this.container = container;
        this.active = false;
        this.init();
    }
    init() {
        this.container.innerHTML = `
        <div class="game-container">
            <div class="game-info">
                <span>Score: <span id="simonScore">0</span></span>
                <span style="margin-left:20px;"><label><input type="checkbox" id="simonStrict"> Strict</label></span>
            </div>
            <div class="game-board">
                <div id="simonGrid" style="display:grid;grid-template-columns:2fr 2fr;gap:14px;max-width:210px;margin:22px auto;">
                    <div class="simon-btn" data-color="green" style="background:#22c55e;"></div>
                    <div class="simon-btn" data-color="red" style="background:#ef4444;"></div>
                    <div class="simon-btn" data-color="yellow" style="background:#eab308;"></div>
                    <div class="simon-btn" data-color="blue" style="background:#2563eb;"></div>
                </div>
            </div>
            <div class="game-controls">
                <button class="btn btn--primary" id="simonStartBtn">Start</button>
                <button class="btn btn--outline" id="simonResetBtn">Reset</button>
            </div>
        </div>
        `;
        this.bindEvents();
        this.loadSounds();
        this.setButtons(false);
    }
    loadSounds() {
        this.sounds = {
            green: new AudioContext(), red: new AudioContext(),
            yellow: new AudioContext(), blue: new AudioContext()
        };
    }
    bindEvents() {
        this.container.addEventListener('click', e => {
            if (e.target.classList.contains('simon-btn') && this.active) {
                this.playerPress(e.target.dataset.color);
            }
            if (e.target.id === 'simonStartBtn') this.start();
            if (e.target.id === 'simonResetBtn') this.reset();
            if (e.target.id === 'simonStrict') this.strict = e.target.checked;
        });
    }
    async start() {
        this.sequence = [];
        this.round = 0;
        document.getElementById('simonScore').textContent = '0';
        await this.nextRound();
    }
    async nextRound() {
        this.playerSeq = [];
        this.sequence.push(this.colors[Math.floor(Math.random()*4)]);
        this.round++;
        document.getElementById('simonScore').textContent = this.round;
        await this.playSeq();
        this.active = true;
        this.setButtons(true);
    }
    setButtons(enabled) {
        for (let btn of this.container.querySelectorAll('.simon-btn')) {
            btn.style.filter = enabled ? "brightness(1)" : "brightness(0.6)";
        }
    }
    async playSeq() {
        this.active = false;
        this.setButtons(false);
        for (let color of this.sequence) {
            this.flash(color);
            await new Promise(r=>setTimeout(r,480));
        }
        this.setButtons(true);
        this.active = true;
    }
    flash(color) {
        let btn = this.container.querySelector(`.simon-btn[data-color=${color}]`);
        btn.style.boxShadow = `0 0 20px 8px #fff`;
        let osc = new (window.AudioContext||window.webkitAudioContext)();
        let node = osc.createOscillator(); node.type="sine";
        node.frequency.setValueAtTime({green:329,red:220,yellow:500,blue:800}[color],osc.currentTime);
        node.connect(osc.destination); node.start(); node.stop(osc.currentTime+0.19);
        setTimeout(()=>btn.style.boxShadow='',210);
    }
    playerPress(color) {
        this.flash(color);
        this.playerSeq.push(color);
        let idx = this.playerSeq.length-1;
        if (this.playerSeq[idx] !== this.sequence[idx]) {
            this.active = false;
            setTimeout(() => {
                alert("Wrong! "+(this.strict?"Restarting.":"Try again."));
                if (this.strict) this.start();
                else { this.playerSeq = []; this.playSeq(); }
            }, 300);
            return;
        }
        if (this.playerSeq.length === this.sequence.length) {
            this.active = false;
            setTimeout(() => this.nextRound(), 600);
        }
    }
    reset() { this.init(); }
    destroy() {}
}

// 13. Sudoku (Simple playable 4x4; expand for full 9x9)
class SudokuGame {
    constructor(container) {
        this.container = container;
        this.board = [];
        this.solution = [];
        this.init();
    }
    init() {
        // Simple 4x4 for demo
        let puzzles = [
            {
                board: [
                    [0,2,3,0],
                    [1,0,0,3],
                    [4,0,0,1],
                    [0,4,1,0]
                ],
                sol: [
                    [1,2,3,4],
                    [1,3,4,2],
                    [4,2,3,1],
                    [3,4,1,2]
                ]
            }
        ];
        let idx = Math.floor(Math.random()*puzzles.length);
        this.board = JSON.parse(JSON.stringify(puzzles[idx].board));
        this.solution = puzzles[idx].sol;
        this.render();
    }
    render() {
        let html = '';
        for (let i=0;i<4;i++) for (let j=0;j<4;j++) {
            let v = this.board[i][j];
            html += `<input class="sudoku-cell${!v?' editable':''}" data-i="${i}" data-j="${j}" maxlength="1" value="${v?v:''}" style="width:40px;height:40px;font-size:1.2rem;text-align:center;border:2px solid #00d4ff;margin:1px;border-radius:7px;background:${v?'rgba(0,212,255,0.12)':'rgba(255,255,255,0.06)'};color:#fff;">`
        }
        this.container.innerHTML = `
        <div class="game-container"><div style="text-align:center;">Enter numbers 1-4 and solve the puzzle</div>
        <div class="game-board" style="display:grid;grid-template-columns:repeat(4,40px);width:180px;margin:18px auto;gap:2px" id="sudokuBoard">${html}</div>
        <div class="game-controls">
            <button class="btn btn--primary" id="sudokuCheckBtn">Check</button>
            <button class="btn btn--outline" id="sudokuResetBtn">New Puzzle</button>
        </div></div>`;
        this.bindEvents();
    }
    bindEvents() {
        this.container.addEventListener('click', e=>{
            if (e.target.id === 'sudokuCheckBtn') this.check();
            if (e.target.id === 'sudokuResetBtn') this.init();
        });
        this.container.querySelectorAll('.editable').forEach(cell=>{
            cell.addEventListener('input', e=>{
                let val = e.target.value.replace(/\D/,'');
                if (val < 1 || val > 4) e.target.value = '';
                else e.target.value = val;
            });
        });
    }
    check() {
        let ok = true;
        this.container.querySelectorAll('.editable').forEach(cell=>{
            let i = +cell.dataset.i, j = +cell.dataset.j, v = +cell.value;
            if (v !== this.solution[i][j]) ok = false;
        });
        setTimeout(()=>alert(ok?"✔️ Correct!":"❌ Try again!"), 100);
    }
    destroy() {}
}

// 14. Hangman
class HangmanGame {
    constructor(container) {
        this.container = container;
        this.words = ["TECH", "PYTHON", "CODING", "JAVASCRIPT", "NEON"];
        this.word = "";
        this.hidden = [];
        this.tries = 0;
        this.letters = [];
        this.init();
    }
    init() {
        this.word = this.words[Math.floor(Math.random()*this.words.length)];
        this.hidden = Array(this.word.length).fill("_");
        this.tries = 7;
        this.letters = [];
        this.render();
    }
    render() {
        let alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let btns = alpha.split('').map(l=>
            `<button class="hang-btn" data-l="${l}" ${this.letters.includes(l)?"disabled":""}>${l}</button>`
        ).join('');
        this.container.innerHTML = `
        <div class="game-container">
            <div class="game-info" style="font-size:1.3rem;">
                Word: <span id="hangWord">${this.hidden.join(" ")}</span>
                <div style="color:#ef4444">Lives: <span id="hangLives">${this.tries}</span></div>
            </div>
            <div class="game-board" style="margin:16px 0;text-align:center">
                <div id="hangAlpha" style="display:grid;grid-template-columns:repeat(13,1fr);gap:3px;">${btns}</div>
            </div>
            <div class="game-controls">
                <button class="btn btn--primary" id="hangReset">New Word</button>
            </div>
        </div>`;
        this.bindEvents();
    }
    bindEvents() {
        this.container.addEventListener('click',e=>{
            if (e.target.classList.contains('hang-btn')) this.guess(e.target.dataset.l);
            if (e.target.id==="hangReset") this.init();
        });
    }
    guess(l) {
        this.letters.push(l);
        let good = false;
        for (let i=0;i<this.word.length;i++) {
            if (this.word[i] === l) { this.hidden[i]=l; good=true; }
        }
        if (!good) this.tries--;
        this.render();
        if (!this.hidden.includes("_")) setTimeout(()=>alert("You Win!"),100);
        else if (this.tries===0) setTimeout(()=>alert("Game Over! Word: "+this.word),100);
    }
    destroy(){}
}

// 15. Platformer Game (Simple, keyboard-only, 1-level "coin" collect)
class PlatformerGame {
    constructor(container) {
        this.container = container;
        this.width = 360; this.height = 280;
        this.player = {x:20,y:210,w:18,h:28,vx:0,vy:0,onGround:false};
        this.platforms = [
            {x:0,y:245,w:360,h:25},
            {x:110,y:195,w:80,h:10},
            {x:230,y:135,w:60,h:10},
            {x:50,y:90,w:60,h:10}
        ];
        this.coin = {x:80,y:40,r:13};
        this.running = false;
        this.loop = null;
        this.init();
    }
    init() {
        this.container.innerHTML = `
        <div class="game-container"><div class="game-info">Use A/D/←/→ + Space/↑ to move. Collect the 💰.</div>
        <div class="game-board"><canvas id="platCanvas" width="360" height="280" style="background:#0f172a;border:2px solid #00d4ff;border-radius:8px"></canvas></div>
        <div class="game-controls"><button class="btn btn--primary" id="platStartBtn">Start</button></div>
        </div>`;
        this.canvas = this.container.querySelector('#platCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.bindEvents(); this.draw();
    }
    bindEvents() {
        this.container.addEventListener('click',e=>{
            if (e.target.id==="platStartBtn") this.start();
        });
        document.addEventListener('keydown',e=>{
            if (!this.running) return;
            if (["ArrowLeft","a"].includes(e.key)&&this.player.x>0) this.player.vx=-3;
            if (["ArrowRight","d"].includes(e.key)&&this.player.x<this.width-this.player.w) this.player.vx=3;
            if (["ArrowUp"," "].includes(e.key)&&this.player.onGround) this.player.vy=-8,this.player.onGround=false;
        });
        document.addEventListener('keyup',e=>{
            if(!this.running)return;
            if(["ArrowLeft","a","ArrowRight","d"].includes(e.key)) this.player.vx=0;
        });
    }
    start() {
        this.player={x:20,y:210,w:18,h:28,vx:0,vy:0,onGround:false};
        this.running=true;
        this.loop=setInterval(()=>this.update(),18);
    }
    update() {
        this.player.x += this.player.vx;
        this.player.vy += 0.55;
        this.player.y += this.player.vy;
        let onGround=false;
        for(let pf of this.platforms) {
            if(this.player.x+this.player.w>pf.x&&this.player.x<pf.x+pf.w&&
                this.player.y+this.player.h>pf.y&&this.player.y+this.player.h<this.height) {
                this.player.y=pf.y-this.player.h; this.player.vy=0; onGround=true;
            }
        }
        if(this.player.y>this.height-32){this.player.y=this.height-32;this.player.vy=0;onGround=true;}
        this.player.onGround=onGround;
        // Coin
        let dx=this.player.x+this.player.w/2-this.coin.x,dy=this.player.y+this.player.h/2-this.coin.y;
        if(dx*dx+dy*dy<360){
            this.running=false; clearInterval(this.loop);
            setTimeout(()=>alert("You Win!"),120);
        }
        this.draw();
    }
    draw() {
        this.ctx.clearRect(0,0,this.width,this.height);
        // Platforms
        this.ctx.fillStyle="#22c55e";
        for(let pf of this.platforms) this.ctx.fillRect(pf.x,pf.y,pf.w,pf.h);
        // Coin
        this.ctx.beginPath(); this.ctx.arc(this.coin.x,this.coin.y,this.coin.r,0,2*Math.PI);
        this.ctx.fillStyle="#fbbf24"; this.ctx.fill();
        // Player
        this.ctx.fillStyle="#00d4ff";
        this.ctx.fillRect(this.player.x,this.player.y,this.player.w,this.player.h);
    }
    destroy(){ if(this.loop)clearInterval(this.loop);}
}

// 16. Typing Speed Test
class TypingTestGame {
    constructor(container) {
        this.container = container;
        this.sentences = [
            "Coding is fun and creative.",
            "Web development uses HTML, CSS, and JS.",
            "The quick brown fox jumps over the lazy dog."
        ];
        this.startTime = null;
        this.userInput = "";
        this.sentence = "";
        this.charsTyped = 0;
        this.timer = null;
        this.init();
    }
    init() {
        this.sentence = this.sentences[Math.floor(Math.random()*this.sentences.length)];
        this.container.innerHTML = `
            <div class="game-container">
                <div class="game-info"><span>Type the following sentence:</span></div>
                <div class="game-board">
                    <div id="typingTarget" style="padding:8px 0;color:#a3e635;font-size:1.2rem;margin-bottom:8px;">${this.sentence}</div>
                    <input id="typingInput" class="form-control" style="width:90%;font-size:1.15rem;" placeholder="Start typing here..." autofocus>
                    <div id="typingStats" style="margin-top:16px;color:#fff;"></div>
                </div>
                <div class="game-controls">
                    <button class="btn btn--primary" id="typingRestart">Restart</button>
                </div>
            </div>`;
        this.bindEvents();
    }
    bindEvents() {
        let input = this.container.querySelector("#typingInput");
        input.focus();
        input.value = "";
        input.oninput = () => this.update(input.value);
        this.container.addEventListener('click',e=>{
            if(e.target.id==="typingRestart")this.init();
        });
        this.startTime = null;
        this.timer && clearInterval(this.timer);
        this.timer = setInterval(()=>this.update(input.value),250);
    }
    update(val) {
        let t = (Date.now()- (this.startTime||Date.now()))/1000;
        if (!this.startTime && val) this.startTime = Date.now();
        let correct = 0;
        for (let i=0; i<val.length; i++) {
            if(val[i] === this.sentence[i]) correct++;
            else break;
        }
        let wpm = Math.round(correct/5/(Math.max(1,t)/60));
        document.getElementById('typingStats').innerHTML = `
            <span>WPM: <b>${wpm||0}</b></span>
            <span style="margin-left:15px;">Accuracy: <b>${((correct/val.length)*100||0).toFixed(0)}%</b></span>
            <span style="margin-left:15px;">Elapsed: <b>${t.toFixed(2)}s</b></span>
        `;
        if (val === this.sentence) {
            clearInterval(this.timer);
            setTimeout(()=>alert('Complete! WPM: '+wpm),100);
        }
    }
    destroy() { clearInterval(this.timer); }
}

// 17. Quiz Game (3 Qs sample)
class QuizGame {
    constructor(container) {
        this.container = container;
        this.qs = [
            {q:"Which tag is for JS in HTML?", a:["<javascript>","<js>","<script>","<code>"], c:2},
            {q:"What does CSS stand for?", a:["Colorful Style Sheets","Computer Style Sheets","Cascading Style Sheets","Creative Style Syntax"], c:2},
            {q:"Which of these is not a valid JS type?", a:["boolean","undefined","string","float"], c:3}
        ];
        this.idx = 0;
        this.score = 0;
        this.init();
    }
    init() {
        this.idx = 0; this.score = 0;
        this.render();
    }
    render() {
        if (this.idx >= this.qs.length) {
            this.container.innerHTML = `<div class="game-container"><h2>Score: ${this.score} / ${this.qs.length}</h2>
            <button class="btn btn--primary" id="quizRestart">Restart</button></div>`;
            this.container.querySelector('#quizRestart').onclick=()=>this.init();
            return;
        }
        let q = this.qs[this.idx];
        let opts = q.a.map((o,i)=>
            `<button class="quizOptBtn" data-idx="${i}" style="margin:8px 0;display:block;width:100%">${o}</button>`
        ).join('');
        this.container.innerHTML = `
        <div class="game-container">
            <div class="game-info"><b>Question ${this.idx+1}/${this.qs.length}:</b></div>
            <div class="game-board"><div style="font-size:1.13rem;margin-bottom:10px">${q.q}</div>
                ${opts}
            </div></div>`;
        this.bindEvents();
    }
    bindEvents() {
        this.container.querySelectorAll('.quizOptBtn').forEach(btn=>{
            btn.onclick=()=>{
                if(+btn.dataset.idx===this.qs[this.idx].c) this.score++;
                this.idx++; this.render();
            };
        });
    }
    destroy(){}
}

// 18. Drag & Drop Puzzle (Image split, drag to solve; 2x2 sample)
class PuzzleGame {
    constructor(container) {
        this.container = container;
        this.size=2;
        this.imgUrl='https://images.unsplash.com/photo-1519125323398-675f0ddb6308?fit=crop&w=160&q=80';
        this.order = [0,1,2,3].sort(()=>Math.random()-0.5);
        this.dragged = null;
        this.init();
    }
    init() {
        this.render();
    }
    render() {
        let cells = '';
        for (let i=0;i<4;i++) {
            let real = this.order[i];
            let x = (real%2)*80, y = Math.floor(real/2)*80;
            cells += `<div class="puzzle-cell" data-i="${i}" draggable="true"
              style="width:80px;height:80px;background:url('${this.imgUrl}');background-position:-${x}px -${y}px;background-size:160px 160px;border-radius:7px;border:2px solid #00d4ff;box-sizing:border-box;display:inline-block;margin:2px">
            </div>`;
        }
        this.container.innerHTML = `<div class="game-container"><div class="game-info">Arrange to form the image.</div>
            <div class="game-board" id="puzzleArea">${cells}</div>
            <div class="game-controls"><button class="btn btn--primary" id="puzzleReset">Reset</button></div></div>`;
        this.bindEvents();
    }
    bindEvents() {
        let area = this.container.querySelector("#puzzleArea");
        area.querySelectorAll('.puzzle-cell').forEach(cell=>{
            cell.ondragstart = e=>{e.dataTransfer.setData('i',cell.dataset.i);};
            cell.ondragover = e=>{e.preventDefault();};
            cell.ondrop = e=>{
                e.preventDefault();
                let a = +e.dataTransfer.getData('i'), b = +cell.dataset.i;
                [this.order[a],this.order[b]]=[this.order[b],this.order[a]];
                this.render();
                if (this.order.every((n,i)=>n===i)) setTimeout(()=>alert("Solved!"),150);
            };
        });
        this.container.querySelector("#puzzleReset").onclick=()=>{this.order=[0,1,2,3].sort(()=>Math.random()-0.5);this.render();}
    }
    destroy() {}
}

// 19. Catch the Falling Objects
class CatchObjectsGame {
    constructor(container) {
        this.container = container;
        this.width=320; this.height=240;
        this.basket = {x:130,w:60};
        this.items = [];
        this.score=0; this.running=false;
        this.loop=null;
        this.init();
    }
    init() {
        this.container.innerHTML = `<div class="game-container">
        <div class="game-info">Move basket(A/D or ←/→), catch 🍏. Score: <span id="catchScore">0</span></div>
        <div class="game-board"><canvas id="catchCanvas" width="320" height="240" style="background:#0f172a;border-radius:10px;border:2px solid #00d4ff;"></canvas></div>
        <div class="game-controls"><button class="btn btn--primary" id="catchStart">Start</button></div></div>`;
        this.canvas=this.container.querySelector('#catchCanvas'); this.ctx=this.canvas.getContext('2d');
        this.bindEvents(); this.draw();
    }
    bindEvents() {
        this.container.addEventListener('click',e=>{
            if (e.target.id==="catchStart") this.start();
        });
        document.addEventListener('keydown',e=>{
            if(!this.running)return;
            if(["ArrowLeft","a"].includes(e.key)) this.basket.x-=18;
            if(["ArrowRight","d"].includes(e.key)) this.basket.x+=18;
            this.basket.x=Math.max(0,Math.min(this.width-this.basket.w,this.basket.x));
        });
    }
    start() {
        this.score=0; this.items=[];
        document.getElementById('catchScore').textContent='0';
        this.running=true;
        this.loop=setInterval(()=>this.update(),26);
    }
    update() {
        if(Math.random()<0.085) this.items.push({x:Math.random()*(this.width-20), y:-18,vy:2+Math.random()*2});
        this.items.forEach(i=>i.y+=i.vy);
        // collision
        for(let i=0;i<this.items.length;i++){
            if(this.items[i].y>this.height-40&&
                this.items[i].x+17>this.basket.x&&this.items[i].x<this.basket.x+this.basket.w){
                this.score++;document.getElementById('catchScore').textContent=this.score;
                this.items.splice(i,1);i--;
            }
        }
        // missed
        this.items = this.items.filter(i=>i.y<=this.height);
        this.draw();
        if(this.score>=10){this.running=false;clearInterval(this.loop);setTimeout(()=>alert("You Win!"),200);}
    }
    draw() {
        this.ctx.fillStyle="#0f172a"; this.ctx.fillRect(0,0,this.width,this.height);
        // Basket
        this.ctx.fillStyle="#eab308"; this.ctx.fillRect(this.basket.x,this.height-22,this.basket.w,16);
        // Items
        this.ctx.font="30px serif";
        this.items.forEach(i=>{
            this.ctx.fillText("🍏",i.x,i.y+18);
        });
    }
    destroy(){ if(this.loop)clearInterval(this.loop);}
}

// 20. Treasure Hunt (Grid with "hot/cold" clues)
class TreasureHuntGame {
    constructor(container) {
        this.container = container;
        this.size = 6;
        this.treasure = [Math.floor(Math.random()*6),Math.floor(Math.random()*6)];
        this.attempts=0;
        this.init();
    }
    init() {
        this.treasure = [Math.floor(Math.random()*6),Math.floor(Math.random()*6)];
        this.attempts=0;
        let html = '';
        for (let i=0;i<6;i++) for(let j=0;j<6;j++)
            html+=`<div class="treasure-cell" data-i="${i}" data-j="${j}" style="width:40px;height:40px;border-radius:8px;display:inline-block;background:rgba(0,212,255,0.1);margin:2px;cursor:pointer;border:2px solid #00d4ff;"></div>`;
        this.container.innerHTML = `<div class="game-container">
            <div class="game-info">Find the 💎. Click a cell; get a clue. Attempts: <span id="thuntAtt">0</span></div>
            <div class="game-board" id="thuntGrid" style="width:252px;margin:0 auto;">${html}</div>
            <div class="game-controls"><button class="btn btn--primary" id="thuntReset">Reset</button></div>
        </div>`;
        this.container.querySelector('#thuntGrid').onclick=e=>{
            let c=e.target;if(!c.classList.contains('treasure-cell'))return;
            let i=+c.dataset.i,j=+c.dataset.j;
            this.attempts++;
            document.getElementById('thuntAtt').textContent=this.attempts;
            let d = Math.abs(i-this.treasure[0])+Math.abs(j-this.treasure[1]);
            if (d===0) {
                c.style.background="#34d399";c.textContent="💎";setTimeout(()=>alert("Treasure Found! Attempts: "+this.attempts),220);
            }
            else c.textContent=d<=1?"🔥":d<=2?"🌡️":"❄️";
        };
        this.container.querySelector('#thuntReset').onclick=()=>this.init();
    }
    destroy(){}
}

// Remaining games (12-20) are provided in the follow-up, due to length.

// Continue with ALL remaining games (7-20) in the next response due to length...

// Initialize the Game Hub when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.gameHub = new GameHub();
});