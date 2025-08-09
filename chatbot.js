// Portfolio Chatbot Application
class PortfolioChatbot {
    constructor() {
        // Data from the provided JSON
        this.portfolioData = {
            "name": "Alex Johnson",
            "title": "Full Stack Developer",
            "email": "alex.johnson@email.com",
            "phone": "+1-555-123-4567",
            "location": "San Francisco, CA",
            "linkedin": "https://linkedin.com/in/alexjohnson",
            "github": "https://github.com/alexjohnson",
            "website": "https://alexjohnson.dev",
            "summary": "Passionate full-stack developer with 3+ years of experience building scalable web applications. Expert in modern JavaScript frameworks and cloud technologies.",
            "skills": {
                "frontend": ["React", "Vue.js", "TypeScript", "HTML5", "CSS3", "Tailwind CSS"],
                "backend": ["Node.js", "Python", "Express.js", "Django", "FastAPI"],
                "database": ["PostgreSQL", "MongoDB", "Redis", "MySQL"],
                "cloud": ["AWS", "Docker", "Kubernetes", "CI/CD"],
                "tools": ["Git", "VS Code", "Linux", "Figma"]
            },
            "projects": [
                {
                    "name": "TaskFlow Pro",
                    "description": "A comprehensive project management tool with real-time collaboration features",
                    "technologies": ["React", "Node.js", "Socket.io", "PostgreSQL"],
                    "github": "https://github.com/alexjohnson/taskflow-pro",
                    "live": "https://taskflow-pro.com",
                    "status": "Live in Production"
                },
                {
                    "name": "AI Content Generator",
                    "description": "SaaS platform for AI-powered content creation with user dashboard and API",
                    "technologies": ["Vue.js", "Python", "FastAPI", "MongoDB"],
                    "github": "https://github.com/alexjohnson/ai-content-gen",
                    "status": "In Development"
                },
                {
                    "name": "E-Commerce Analytics",
                    "description": "Analytics dashboard for e-commerce businesses with real-time insights",
                    "technologies": ["React", "Node.js", "Chart.js", "MySQL"],
                    "github": "https://github.com/alexjohnson/ecommerce-analytics",
                    "live": "https://demo-analytics.alexjohnson.dev",
                    "status": "Completed"
                }
            ],
            "experience": [
                {
                    "company": "TechStart Inc.",
                    "position": "Senior Full Stack Developer",
                    "duration": "2022 - Present",
                    "location": "San Francisco, CA",
                    "responsibilities": [
                        "Lead development of customer-facing web applications",
                        "Architected microservices infrastructure using Node.js and Docker",
                        "Mentored junior developers and conducted code reviews",
                        "Improved application performance by 40% through optimization"
                    ]
                },
                {
                    "company": "WebSolutions LLC",
                    "position": "Frontend Developer",
                    "duration": "2021 - 2022",
                    "location": "Remote",
                    "responsibilities": [
                        "Developed responsive web applications using React and Vue.js",
                        "Collaborated with designers to implement pixel-perfect UIs",
                        "Integrated RESTful APIs and managed state with Redux/Vuex"
                    ]
                }
            ],
            "education": [
                {
                    "degree": "B.S. Computer Science",
                    "school": "University of California, Berkeley",
                    "year": "2021",
                    "relevant_courses": ["Data Structures", "Algorithms", "Web Development", "Database Systems"]
                }
            ]
        };

        this.studyTopics = {
            "Computer Networks": {
                "keywords": ["TCP", "IP", "HTTP", "routing", "protocol", "OSI model", "network layer", "transport layer"],
                "content": "Computer networks involve the study of communication protocols, network architecture, and data transmission methods."
            },
            "Compiler Design": {
                "keywords": ["lexical analysis", "parsing", "syntax tree", "code generation", "optimization", "grammar"],
                "content": "Compiler design covers the translation of high-level programming languages to machine code through various phases."
            },
            "Data Structures": {
                "keywords": ["array", "linked list", "stack", "queue", "tree", "graph", "hash table", "algorithm"],
                "content": "Data structures are ways of organizing and storing data efficiently for various operations and algorithms."
            }
        };

        this.quizQuestions = [
            {
                "id": 1,
                "category": "JavaScript",
                "difficulty": "easy",
                "question": "Which method is used to add an element to the end of an array?",
                "type": "multiple",
                "options": ["push()", "pop()", "shift()", "unshift()"],
                "correct": 0,
                "explanation": "The push() method adds one or more elements to the end of an array and returns the new length."
            },
            {
                "id": 2,
                "category": "CSS",
                "difficulty": "medium",
                "question": "Flexbox is only for one-dimensional layouts.",
                "type": "boolean",
                "correct": true,
                "explanation": "Flexbox is designed for one-dimensional layouts (either row or column), while CSS Grid is for two-dimensional layouts."
            },
            {
                "id": 3,
                "category": "React",
                "difficulty": "medium",
                "question": "Which hook is used to manage state in functional components?",
                "type": "multiple",
                "options": ["useEffect", "useState", "useContext", "useReducer"],
                "correct": 1,
                "explanation": "useState is the primary hook for managing local state in React functional components."
            },
            {
                "id": 4,
                "category": "HTML",
                "difficulty": "easy",
                "question": "HTML stands for HyperText Markup Language.",
                "type": "boolean",
                "correct": true,
                "explanation": "HTML indeed stands for HyperText Markup Language, the standard markup language for web pages."
            },
            {
                "id": 5,
                "category": "Node.js",
                "difficulty": "hard",
                "question": "What is the purpose of the Event Loop in Node.js?",
                "type": "multiple",
                "options": [
                    "To handle synchronous operations",
                    "To manage asynchronous callbacks and I/O operations", 
                    "To create new threads",
                    "To compile JavaScript code"
                ],
                "correct": 1,
                "explanation": "The Event Loop handles asynchronous callbacks and I/O operations, allowing Node.js to be non-blocking."
            }
        ];

        this.jokes = [
            "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
            "How many programmers does it take to change a light bulb? None, that's a hardware problem! 💡",
            "Why do Java developers wear glasses? Because they can't C#! 👓",
            "What's a programmer's favorite hangout place? The Foo Bar! 🍺",
            "Why did the programmer quit his job? He didn't get arrays! 📊",
            "Why do Python programmers prefer snakes? Because they're good at scaling! 🐍",
            "What do you call a programmer from Finland? Nerdic! 🇫🇮",
            "Why was the JavaScript developer sad? Because he didn't Node how to Express himself! 😢"
        ];

        this.facts = [
            "The first computer bug was literally a bug - a moth trapped in a Harvard Mark II computer in 1947! 🦋",
            "The term 'debugging' was coined by Admiral Grace Hopper when she found the moth. 🔍",
            "JavaScript was created in just 10 days by Brendan Eich in 1995. ⚡",
            "The first 1GB hard drive cost $40,000 in 1980 - that's $40 per megabyte! 💾",
            "The '@' symbol was used in email addresses for the first time in 1971 by Ray Tomlinson. 📧",
            "The world's first website is still online: http://info.cern.ch/hypertext/WWW/TheProject.html 🌐",
            "Python was named after Monty Python's Flying Circus, not the snake! 🐍",
            "Linux runs on over 96% of the world's top 1 million servers. 🖥️"
        ];

        // Application state
        this.currentMode = 'portfolio';
        this.chatHistory = [];
        this.studyMaterials = [];
        this.currentQuiz = null;
        this.quizState = {
            currentQuestion: 0,
            score: 0,
            answers: [],
            startTime: null,
            timeLeft: 30
        };
        this.settings = {
            theme: 'auto',
            responseSpeed: 'normal',
            soundEnabled: true
        };

        this.init();
    }

    init() {
        this.bindEvents();
        this.loadSettings();
        this.showWelcomeMessage();
        this.updateNotificationBadge();
    }

    bindEvents() {
        // Floating chatbot button
        document.getElementById('chatbotFloat').addEventListener('click', () => {
            this.openChat();
        });

        // Modal close events
        document.getElementById('closeModal').addEventListener('click', () => {
            this.closeChat();
        });

        document.querySelector('.modal-overlay').addEventListener('click', () => {
            this.closeChat();
        });

        // Mode selector
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.switchMode(btn.dataset.mode);
            });
        });

        // Message input
        const messageInput = document.getElementById('messageInput');
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        messageInput.addEventListener('input', (e) => {
            this.updateCharCount(e.target.value.length);
        });

        // Send button
        document.getElementById('sendBtn').addEventListener('click', () => {
            this.sendMessage();
        });

        // Quick question buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('quick-btn')) {
                const question = e.target.dataset.question;
                this.sendMessage(question);
            }
        });

        // File upload
        const fileInput = document.getElementById('fileInput');
        const uploadZone = document.getElementById('uploadZone');
        const attachBtn = document.getElementById('attachBtn');

        attachBtn.addEventListener('click', () => {
            if (this.currentMode === 'study') {
                fileInput.click();
            }
        });

        uploadZone.addEventListener('click', () => {
            fileInput.click();
        });

        uploadZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadZone.classList.add('dragover');
        });

        uploadZone.addEventListener('dragleave', () => {
            uploadZone.classList.remove('dragover');
        });

        uploadZone.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadZone.classList.remove('dragover');
            this.handleFileUpload(e.dataTransfer.files);
        });

        fileInput.addEventListener('change', (e) => {
            this.handleFileUpload(e.target.files);
        });

        // Settings - Fixed event handling
        document.getElementById('settingsBtn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleSettings();
        });

        document.getElementById('closeSettings').addEventListener('click', () => {
            this.closeSettings();
        });

        // Close settings when clicking outside
        document.addEventListener('click', (e) => {
            const settingsPanel = document.getElementById('settingsPanel');
            const settingsBtn = document.getElementById('settingsBtn');
            
            if (!settingsPanel.contains(e.target) && e.target !== settingsBtn) {
                this.closeSettings();
            }
        });

        document.getElementById('exportBtn').addEventListener('click', () => {
            this.exportChat();
        });

        document.getElementById('clearChatBtn').addEventListener('click', () => {
            this.clearChat();
        });

        // Settings controls
        document.getElementById('chatTheme').addEventListener('change', (e) => {
            this.updateTheme(e.target.value);
        });

        document.getElementById('responseSpeed').addEventListener('change', (e) => {
            this.settings.responseSpeed = e.target.value;
            this.saveSettings();
        });

        document.getElementById('soundEnabled').addEventListener('change', (e) => {
            this.settings.soundEnabled = e.target.checked;
            this.saveSettings();
        });

        // Quiz results
        document.getElementById('closeResults').addEventListener('click', () => {
            this.closeQuizResults();
        });

        document.getElementById('retakeQuizBtn').addEventListener('click', () => {
            this.closeQuizResults();
            this.startQuiz();
        });

        document.getElementById('reviewAnswersBtn').addEventListener('click', () => {
            this.reviewQuizAnswers();
        });

        // Escape key handling
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (!document.getElementById('chatModal').classList.contains('hidden')) {
                    this.closeChat();
                } else if (!document.getElementById('settingsPanel').classList.contains('hidden')) {
                    this.closeSettings();
                } else if (!document.getElementById('quizResults').classList.contains('hidden')) {
                    this.closeQuizResults();
                }
            }
        });
    }

    openChat() {
        document.getElementById('chatModal').classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        document.getElementById('messageInput').focus();
        this.hideNotificationBadge();
    }

    closeChat() {
        document.getElementById('chatModal').classList.add('hidden');
        document.body.style.overflow = 'auto';
        this.closeSettings();
        this.closeQuizResults();
    }

    switchMode(mode) {
        this.currentMode = mode;
        
        // Update mode buttons
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-mode="${mode}"]`).classList.add('active');

        // Update UI based on mode
        this.updateModeUI();
        this.showWelcomeMessage();
        
        // Update mode info
        const modeNames = {
            portfolio: 'Portfolio Mode',
            study: 'Study Mode',
            quiz: 'Quiz Mode',
            assistant: 'Assistant Mode'
        };
        document.getElementById('modeInfo').textContent = modeNames[mode];
    }

    updateModeUI() {
        const fileUploadArea = document.getElementById('fileUploadArea');
        const attachBtn = document.getElementById('attachBtn');

        if (this.currentMode === 'study') {
            fileUploadArea.classList.remove('hidden');
            attachBtn.style.display = 'block';
        } else {
            fileUploadArea.classList.add('hidden');
            attachBtn.style.display = 'none';
        }
    }

    showWelcomeMessage() {
        const welcomeMessage = document.getElementById('welcomeMessage');
        const chatArea = document.getElementById('chatArea');
        
        // Clear existing messages
        const existingMessages = chatArea.querySelectorAll('.message');
        existingMessages.forEach(msg => msg.remove());
        
        const welcomeData = {
            portfolio: {
                icon: '💼',
                title: 'Welcome to Portfolio Assistant!',
                description: `I can help you learn about ${this.portfolioData.name}'s skills, projects, and experience. Ask me anything about the portfolio!`,
                questions: [
                    "Tell me about Alex's skills",
                    "What projects has Alex worked on?",
                    "What is Alex's experience?",
                    "How can I contact Alex?"
                ]
            },
            study: {
                icon: '📚',
                title: 'Welcome to Study Helper!',
                description: 'I can help you with your studies. Upload notes or ask questions about Computer Networks, Compiler Design, or Data Structures.',
                questions: [
                    "Explain TCP/IP protocol",
                    "What is lexical analysis?",
                    "How do binary trees work?",
                    "Upload study materials"
                ]
            },
            quiz: {
                icon: '❓',
                title: 'Welcome to Quiz Mode!',
                description: 'Test your knowledge with interactive quizzes on programming topics. Ready to challenge yourself?',
                questions: [
                    "Start a JavaScript quiz",
                    "Take a random quiz",
                    "Show my quiz history",
                    "Quiz difficulty levels"
                ]
            },
            assistant: {
                icon: '🎯',
                title: 'Welcome to AI Assistant!',
                description: 'I can tell jokes, share interesting facts, help with translations, and provide general assistance.',
                questions: [
                    "Tell me a programming joke",
                    "Share an interesting tech fact",
                    "Help me with something",
                    "What can you do?"
                ]
            }
        };

        const data = welcomeData[this.currentMode];
        
        welcomeMessage.querySelector('.welcome-avatar').textContent = data.icon;
        welcomeMessage.querySelector('h4').textContent = data.title;
        welcomeMessage.querySelector('p').textContent = data.description;
        
        const quickQuestions = welcomeMessage.querySelector('.quick-questions');
        quickQuestions.innerHTML = data.questions.map(q => 
            `<button class="quick-btn" data-question="${q}">${q}</button>`
        ).join('');
        
        welcomeMessage.classList.remove('hidden');
    }

    sendMessage(text = null) {
        const messageInput = document.getElementById('messageInput');
        const message = text || messageInput.value.trim();
        
        if (!message) return;

        // Hide welcome message
        document.getElementById('welcomeMessage').classList.add('hidden');

        // Add user message
        this.addMessage(message, 'user');
        
        // Clear input
        messageInput.value = '';
        this.updateCharCount(0);

        // Show typing indicator
        this.showTypingIndicator();

        // Process message based on current mode
        setTimeout(() => {
            this.hideTypingIndicator();
            this.processMessage(message);
        }, this.getResponseDelay());
    }

    addMessage(text, sender, timestamp = new Date()) {
        const chatArea = document.getElementById('chatArea');
        const messageElement = document.createElement('div');
        messageElement.className = `message ${sender}`;
        
        const timeString = timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        messageElement.innerHTML = `
            <div class="message-bubble">
                ${text}
                <div class="message-time">${timeString}</div>
            </div>
        `;

        chatArea.appendChild(messageElement);
        this.scrollToBottom();

        // Save to chat history
        this.chatHistory.push({
            text,
            sender,
            timestamp,
            mode: this.currentMode
        });

        // Play sound effect
        if (this.settings.soundEnabled && sender === 'bot') {
            this.playNotificationSound();
        }
    }

    processMessage(message) {
        let response = '';

        switch (this.currentMode) {
            case 'portfolio':
                response = this.processPortfolioMessage(message);
                break;
            case 'study':
                response = this.processStudyMessage(message);
                break;
            case 'quiz':
                response = this.processQuizMessage(message);
                break;
            case 'assistant':
                response = this.processAssistantMessage(message);
                break;
        }

        if (response) {
            this.addMessage(response, 'bot');
        }
    }

    processPortfolioMessage(message) {
        const lowerMessage = message.toLowerCase();
        const data = this.portfolioData;

        // Skills inquiries
        if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('tech stack')) {
            let response = `🛠️ **${data.name}'s Technical Skills:**\n\n`;
            
            Object.entries(data.skills).forEach(([category, skills]) => {
                const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
                response += `**${categoryName}:** ${skills.join(', ')}\n\n`;
            });
            
            return response + `💡 ${data.name} has ${Object.values(data.skills).flat().length} skills across ${Object.keys(data.skills).length} different areas!`;
        }

        // Projects inquiries
        if (lowerMessage.includes('project') || lowerMessage.includes('work') || lowerMessage.includes('portfolio')) {
            let response = `🚀 **${data.name}'s Projects:**\n\n`;
            
            data.projects.forEach((project, index) => {
                response += `**${index + 1}. ${project.name}** (${project.status})\n`;
                response += `${project.description}\n`;
                response += `**Tech:** ${project.technologies.join(', ')}\n`;
                if (project.live) response += `**Live:** ${project.live}\n`;
                if (project.github) response += `**GitHub:** ${project.github}\n`;
                response += '\n';
            });
            
            return response;
        }

        // Experience inquiries
        if (lowerMessage.includes('experience') || lowerMessage.includes('job') || lowerMessage.includes('career')) {
            let response = `💼 **${data.name}'s Professional Experience:**\n\n`;
            
            data.experience.forEach((exp, index) => {
                response += `**${index + 1}. ${exp.position}** at ${exp.company}\n`;
                response += `📅 ${exp.duration} | 📍 ${exp.location}\n\n`;
                response += `**Key Responsibilities:**\n`;
                exp.responsibilities.forEach(resp => {
                    response += `• ${resp}\n`;
                });
                response += '\n';
            });
            
            return response;
        }

        // Contact inquiries
        if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach')) {
            return `📞 **Contact ${data.name}:**\n\n` +
                   `📧 **Email:** ${data.email}\n` +
                   `📱 **Phone:** ${data.phone}\n` +
                   `📍 **Location:** ${data.location}\n` +
                   `💼 **LinkedIn:** ${data.linkedin}\n` +
                   `💻 **GitHub:** ${data.github}\n` +
                   `🌐 **Website:** ${data.website}\n\n` +
                   `Feel free to reach out for opportunities or collaborations! 🤝`;
        }

        // Education inquiries
        if (lowerMessage.includes('education') || lowerMessage.includes('school') || lowerMessage.includes('university')) {
            let response = `🎓 **${data.name}'s Education:**\n\n`;
            
            data.education.forEach(edu => {
                response += `**${edu.degree}**\n`;
                response += `🏫 ${edu.school} (${edu.year})\n\n`;
                response += `**Relevant Courses:** ${edu.relevant_courses.join(', ')}\n\n`;
            });
            
            return response;
        }

        // General/About inquiries
        if (lowerMessage.includes('about') || lowerMessage.includes('who') || lowerMessage.includes('summary')) {
            return `👋 **About ${data.name}:**\n\n` +
                   `${data.summary}\n\n` +
                   `**Current Role:** ${data.title}\n` +
                   `**Location:** ${data.location}\n\n` +
                   `Want to know more? Ask about skills, projects, experience, or contact information! 💻`;
        }

        // Default response
        return `🤔 I can help you learn about ${data.name}! Try asking about:\n\n` +
               `• **Skills & Technologies** 🛠️\n` +
               `• **Projects & Portfolio** 🚀\n` +
               `• **Professional Experience** 💼\n` +
               `• **Education Background** 🎓\n` +
               `• **Contact Information** 📞\n\n` +
               `What would you like to know?`;
    }

    processStudyMessage(message) {
        const lowerMessage = message.toLowerCase();

        // Check for study topic keywords
        for (const [topic, data] of Object.entries(this.studyTopics)) {
            const hasKeyword = data.keywords.some(keyword => lowerMessage.includes(keyword.toLowerCase()));
            if (hasKeyword || lowerMessage.includes(topic.toLowerCase())) {
                return `📚 **${topic}:**\n\n${data.content}\n\n` +
                       `**Key concepts:** ${data.keywords.join(', ')}\n\n` +
                       `Need more specific information? Upload study materials or ask about specific concepts! 📝`;
            }
        }

        // File upload prompts
        if (lowerMessage.includes('upload') || lowerMessage.includes('file') || lowerMessage.includes('material')) {
            return `📁 **Upload Study Materials:**\n\n` +
                   `You can upload .txt or .md files with your study materials. I'll analyze them and help answer questions based on the content.\n\n` +
                   `**Supported formats:** Text files (.txt), Markdown files (.md)\n\n` +
                   `Click the 📎 button or drag and drop files into the upload area above! 📤`;
        }

        // Check uploaded materials
        if (this.studyMaterials.length > 0) {
            const relevantMaterial = this.studyMaterials.find(material => 
                material.content.toLowerCase().includes(lowerMessage) ||
                lowerMessage.split(' ').some(word => material.content.toLowerCase().includes(word))
            );
            
            if (relevantMaterial) {
                const excerpt = this.extractRelevantExcerpt(relevantMaterial.content, message);
                return `📖 **From "${relevantMaterial.name}":**\n\n${excerpt}\n\n` +
                       `Need more details from this material? Ask more specific questions! 🔍`;
            }
        }

        // Default study response
        return `📚 **Study Helper Active!**\n\n` +
               `I can help you with:\n` +
               `• **Computer Networks** - TCP/IP, protocols, OSI model\n` +
               `• **Compiler Design** - parsing, lexical analysis, optimization\n` +
               `• **Data Structures** - arrays, trees, graphs, algorithms\n\n` +
               `You can also upload your own study materials for personalized help! 📝`;
    }

    processQuizMessage(message) {
        const lowerMessage = message.toLowerCase();

        // Start quiz
        if (lowerMessage.includes('start') || lowerMessage.includes('begin') || lowerMessage.includes('quiz')) {
            return this.startQuiz();
        }

        // Quiz in progress
        if (this.currentQuiz) {
            return this.handleQuizAnswer(message);
        }

        // Quiz history or difficulty
        if (lowerMessage.includes('history') || lowerMessage.includes('difficulty')) {
            return `📊 **Quiz Information:**\n\n` +
                   `**Available Categories:**\n` +
                   `• JavaScript 🟨 Easy to Hard\n` +
                   `• CSS 🎨 Easy to Medium\n` +
                   `• React ⚛️ Medium to Hard\n` +
                   `• HTML 📄 Easy\n` +
                   `• Node.js 🟢 Hard\n\n` +
                   `**Difficulty Levels:**\n` +
                   `🟢 **Easy** - Basic concepts\n` +
                   `🟡 **Medium** - Intermediate knowledge\n` +
                   `🔴 **Hard** - Advanced topics\n\n` +
                   `Ready to test your knowledge? Say "start quiz"! 🚀`;
        }

        // Default quiz response
        return `🎯 **Quiz Mode Active!**\n\n` +
               `Test your programming knowledge with interactive quizzes!\n\n` +
               `**Available Topics:**\n` +
               `• JavaScript, CSS, HTML\n` +
               `• React, Node.js\n` +
               `• And more!\n\n` +
               `Ready to challenge yourself? Type "start quiz" to begin! 🚀`;
    }

    processAssistantMessage(message) {
        const lowerMessage = message.toLowerCase();

        // Jokes
        if (lowerMessage.includes('joke') || lowerMessage.includes('funny') || lowerMessage.includes('humor')) {
            const randomJoke = this.jokes[Math.floor(Math.random() * this.jokes.length)];
            return `😄 **Here's a programming joke for you:**\n\n${randomJoke}\n\n` +
                   `Want another one? Just ask for another joke! 🤣`;
        }

        // Facts
        if (lowerMessage.includes('fact') || lowerMessage.includes('trivia') || lowerMessage.includes('interesting')) {
            const randomFact = this.facts[Math.floor(Math.random() * this.facts.length)];
            return `🤓 **Interesting Tech Fact:**\n\n${randomFact}\n\n` +
                   `Want to learn more? Ask for another fact! 💡`;
        }

        // Help/What can you do
        if (lowerMessage.includes('help') || lowerMessage.includes('what can') || lowerMessage.includes('assistance')) {
            return `🎯 **AI Assistant Capabilities:**\n\n` +
                   `**Entertainment:**\n` +
                   `• 😄 Programming jokes\n` +
                   `• 🤓 Interesting tech facts\n` +
                   `• 🎲 Random trivia\n\n` +
                   `**Utilities:**\n` +
                   `• 📝 Basic text help\n` +
                   `• 🔀 Simple translations\n` +
                   `• 💡 General programming tips\n\n` +
                   `**Note:** This is a local assistant with basic capabilities. For complex tasks, consider the other modes!\n\n` +
                   `What would you like me to help with? 🤝`;
        }

        // Translation (basic)
        if (lowerMessage.includes('translate') || lowerMessage.includes('translation')) {
            return `🔤 **Basic Translation:**\n\n` +
                   `I can help with simple word translations for common programming terms:\n\n` +
                   `**Examples:**\n` +
                   `• "Variable" → 变量 (Chinese), Variable (Spanish)\n` +
                   `• "Function" → 函数 (Chinese), Función (Spanish)\n` +
                   `• "Array" → 配列 (Japanese), Matriz (Spanish)\n\n` +
                   `**Note:** This is basic translation. For complex text, use dedicated translation services.\n\n` +
                   `What programming term would you like translated? 🌐`;
        }

        // Default assistant response
        return `🎯 **AI Assistant Ready!**\n\n` +
               `I'm here to help with:\n` +
               `• **Entertainment** - Jokes, facts, trivia 😄\n` +
               `• **Basic Utilities** - Simple translations, tips 🛠️\n` +
               `• **General Help** - Questions, guidance 💡\n\n` +
               `What can I assist you with today? Just ask! 🤝`;
    }

    startQuiz() {
        // Get random questions
        const selectedQuestions = this.getRandomQuestions(5);
        
        this.currentQuiz = {
            questions: selectedQuestions,
            currentIndex: 0,
            score: 0,
            answers: [],
            startTime: Date.now()
        };

        return this.showQuizQuestion();
    }

    getRandomQuestions(count) {
        const shuffled = [...this.quizQuestions].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, Math.min(count, shuffled.length));
    }

    showQuizQuestion() {
        const quiz = this.currentQuiz;
        const question = quiz.questions[quiz.currentIndex];
        
        let response = `❓ **Question ${quiz.currentIndex + 1} of ${quiz.questions.length}**\n\n`;
        response += `**Category:** ${question.category} | **Difficulty:** ${question.difficulty}\n\n`;
        response += `**${question.question}**\n\n`;

        if (question.type === 'multiple') {
            question.options.forEach((option, index) => {
                response += `**${String.fromCharCode(65 + index)}.** ${option}\n`;
            });
            response += `\nReply with A, B, C, or D 📝`;
        } else if (question.type === 'boolean') {
            response += `**A.** True\n**B.** False\n\nReply with A or B 📝`;
        }

        // Add quiz HTML element for better interaction
        setTimeout(() => {
            this.renderQuizQuestion(question);
        }, 100);

        return response;
    }

    renderQuizQuestion(question) {
        const chatArea = document.getElementById('chatArea');
        const quizElement = document.createElement('div');
        quizElement.className = 'quiz-question';
        
        let optionsHtml = '';
        if (question.type === 'multiple') {
            question.options.forEach((option, index) => {
                const letter = String.fromCharCode(65 + index);
                optionsHtml += `<button class="option-btn" data-answer="${index}">${letter}. ${option}</button>`;
            });
        } else {
            optionsHtml = `
                <button class="option-btn" data-answer="true">A. True</button>
                <button class="option-btn" data-answer="false">B. False</button>
            `;
        }

        quizElement.innerHTML = `
            <div class="question-header">
                <span class="question-number">Question ${this.currentQuiz.currentIndex + 1}/${this.currentQuiz.questions.length}</span>
                <span class="question-timer" id="questionTimer">⏱️ 30s</span>
            </div>
            <div class="question-text">${question.question}</div>
            <div class="question-options" id="questionOptions">
                ${optionsHtml}
            </div>
        `;

        chatArea.appendChild(quizElement);
        this.scrollToBottom();

        // Add click handlers for options
        quizElement.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.selectQuizAnswer(btn.dataset.answer, btn);
            });
        });

        // Start timer
        this.startQuestionTimer();
    }

    selectQuizAnswer(answer, buttonElement) {
        const question = this.currentQuiz.questions[this.currentQuiz.currentIndex];
        const isCorrect = (question.type === 'multiple') ? 
            (parseInt(answer) === question.correct) : 
            ((answer === 'true') === question.correct);

        // Visual feedback
        buttonElement.classList.add('selected');
        
        setTimeout(() => {
            // Show correct answer
            const options = document.getElementById('questionOptions');
            if (options) {
                options.querySelectorAll('.option-btn').forEach(btn => {
                    btn.disabled = true;
                    if (question.type === 'multiple') {
                        if (parseInt(btn.dataset.answer) === question.correct) {
                            btn.classList.add('correct');
                        } else if (btn.classList.contains('selected') && !isCorrect) {
                            btn.classList.add('incorrect');
                        }
                    } else {
                        const btnValue = (btn.dataset.answer === 'true');
                        if (btnValue === question.correct) {
                            btn.classList.add('correct');
                        } else if (btn.classList.contains('selected') && !isCorrect) {
                            btn.classList.add('incorrect');
                        }
                    }
                });
            }

            // Update score and show explanation
            if (isCorrect) {
                this.currentQuiz.score++;
            }

            this.currentQuiz.answers.push({
                questionIndex: this.currentQuiz.currentIndex,
                userAnswer: answer,
                correct: isCorrect,
                question: question.question,
                correctAnswer: question.correct
            });

            const explanation = `${isCorrect ? '✅ Correct!' : '❌ Incorrect'}\n\n**Explanation:** ${question.explanation}`;
            
            setTimeout(() => {
                this.addMessage(explanation, 'bot');
                this.nextQuestion();
            }, 1500);

        }, 500);
    }

    nextQuestion() {
        this.currentQuiz.currentIndex++;
        
        if (this.currentQuiz.currentIndex >= this.currentQuiz.questions.length) {
            this.finishQuiz();
        } else {
            setTimeout(() => {
                const response = this.showQuizQuestion();
                this.addMessage(response, 'bot');
            }, 2000);
        }
    }

    finishQuiz() {
        const quiz = this.currentQuiz;
        const duration = Math.round((Date.now() - quiz.startTime) / 1000);
        const percentage = Math.round((quiz.score / quiz.questions.length) * 100);

        let response = `🎉 **Quiz Complete!**\n\n`;
        response += `**Final Score:** ${quiz.score}/${quiz.questions.length} (${percentage}%)\n`;
        response += `**Time Taken:** ${duration} seconds\n\n`;

        if (percentage >= 80) {
            response += `🌟 **Excellent!** You're a programming expert! 💻`;
        } else if (percentage >= 60) {
            response += `👍 **Good job!** Keep learning and practicing! 📚`;
        } else {
            response += `💪 **Keep practicing!** Every expert was once a beginner! 🚀`;
        }

        this.addMessage(response, 'bot');

        // Show detailed results
        setTimeout(() => {
            this.showQuizResults(quiz.score, quiz.questions.length, duration, percentage);
        }, 1000);

        this.currentQuiz = null;
    }

    showQuizResults(score, total, duration, percentage) {
        const resultsPanel = document.getElementById('quizResults');
        
        document.getElementById('finalScore').textContent = score;
        document.getElementById('scorePercentage').textContent = percentage + '%';
        document.getElementById('correctAnswers').textContent = score;
        document.getElementById('totalQuestions').textContent = total;
        document.getElementById('timeTaken').textContent = duration + 's';
        
        resultsPanel.classList.remove('hidden');
    }

    closeQuizResults() {
        document.getElementById('quizResults').classList.add('hidden');
    }

    reviewQuizAnswers() {
        this.closeQuizResults();
        
        const response = `📝 **Quiz Review:**\n\n` +
                       `Here's a summary of your quiz performance:\n\n` +
                       `You can retake the quiz anytime to improve your score! 🚀`;
        
        this.addMessage(response, 'bot');
    }

    startQuestionTimer() {
        let timeLeft = 30;
        const timerElement = document.getElementById('questionTimer');
        
        const countdown = setInterval(() => {
            timeLeft--;
            if (timerElement) {
                timerElement.textContent = `⏱️ ${timeLeft}s`;
                if (timeLeft <= 5) {
                    timerElement.style.color = 'var(--color-error)';
                }
            }
            
            if (timeLeft <= 0) {
                clearInterval(countdown);
                // Auto-submit with no answer
                this.selectQuizAnswer(-1, document.createElement('button'));
            }
        }, 1000);
    }

    handleFileUpload(files) {
        Array.from(files).forEach(file => {
            if (file.type === 'text/plain' || file.name.endsWith('.md')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.studyMaterials.push({
                        name: file.name,
                        content: e.target.result,
                        uploadDate: new Date()
                    });
                    
                    const response = `📁 **File uploaded successfully!**\n\n` +
                                   `**File:** ${file.name}\n` +
                                   `**Size:** ${Math.round(file.size / 1024)} KB\n` +
                                   `**Type:** Study Material\n\n` +
                                   `I can now answer questions based on this content! Ask me anything about the material. 📚`;
                    
                    this.addMessage(response, 'bot');
                };
                reader.readAsText(file);
            } else {
                const response = `❌ **Unsupported file type!**\n\n` +
                               `Please upload .txt or .md files only. 📝`;
                this.addMessage(response, 'bot');
            }
        });
    }

    extractRelevantExcerpt(content, query) {
        const words = query.toLowerCase().split(' ');
        const sentences = content.split(/[.!?]+/);
        
        for (const sentence of sentences) {
            if (words.some(word => sentence.toLowerCase().includes(word))) {
                return sentence.trim().substring(0, 300) + (sentence.length > 300 ? '...' : '');
            }
        }
        
        return content.substring(0, 200) + '...';
    }

    showTypingIndicator() {
        document.getElementById('typingIndicator').classList.remove('hidden');
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        document.getElementById('typingIndicator').classList.add('hidden');
    }

    updateCharCount(count) {
        document.getElementById('charCount').textContent = `${count}/500`;
        
        const sendBtn = document.getElementById('sendBtn');
        if (count === 0) {
            sendBtn.disabled = true;
            sendBtn.style.opacity = '0.5';
        } else {
            sendBtn.disabled = false;
            sendBtn.style.opacity = '1';
        }
    }

    getResponseDelay() {
        const delays = { fast: 500, normal: 1000, slow: 2000 };
        return delays[this.settings.responseSpeed] || 1000;
    }

    scrollToBottom() {
        const chatArea = document.getElementById('chatArea');
        chatArea.scrollTop = chatArea.scrollHeight;
    }

    toggleSettings() {
        const settingsPanel = document.getElementById('settingsPanel');
        const isHidden = settingsPanel.classList.contains('hidden');
        
        if (isHidden) {
            settingsPanel.classList.remove('hidden');
        } else {
            settingsPanel.classList.add('hidden');
        }
    }

    closeSettings() {
        const settingsPanel = document.getElementById('settingsPanel');
        settingsPanel.classList.add('hidden');
    }

    updateTheme(theme) {
        this.settings.theme = theme;
        
        if (theme === 'auto') {
            document.documentElement.removeAttribute('data-color-scheme');
        } else {
            document.documentElement.setAttribute('data-color-scheme', theme);
        }
        
        this.saveSettings();
    }

    exportChat() {
        const chatData = {
            exportDate: new Date().toISOString(),
            totalMessages: this.chatHistory.length,
            modes: [...new Set(this.chatHistory.map(msg => msg.mode))],
            messages: this.chatHistory
        };
        
        const dataStr = JSON.stringify(chatData, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = `portfolio-chat-${new Date().toISOString().split('T')[0]}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        
        // Close settings after export
        this.closeSettings();
    }

    clearChat() {
        if (confirm('Are you sure you want to clear all chat history? This cannot be undone.')) {
            this.chatHistory = [];
            const chatArea = document.getElementById('chatArea');
            const messages = chatArea.querySelectorAll('.message');
            messages.forEach(msg => msg.remove());
            this.showWelcomeMessage();
            this.closeSettings();
        }
    }

    updateNotificationBadge() {
        const badge = document.getElementById('notificationBadge');
        if (this.chatHistory.length === 0) {
            badge.textContent = '1';
            badge.classList.remove('hidden');
        } else {
            badge.classList.add('hidden');
        }
    }

    hideNotificationBadge() {
        document.getElementById('notificationBadge').classList.add('hidden');
    }

    playNotificationSound() {
        if (this.settings.soundEnabled) {
            try {
                // Create a simple notification beep
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.value = 800;
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.3);
            } catch (e) {
                // Silently handle audio context errors
                console.log('Audio not available');
            }
        }
    }

    loadSettings() {
        try {
            const savedSettings = JSON.parse(localStorage.getItem('chatbot-settings') || '{}');
            this.settings = { ...this.settings, ...savedSettings };
        } catch (e) {
            // Use default settings if localStorage fails
            console.log('Using default settings');
        }
        
        // Apply loaded settings to UI
        const themeSelect = document.getElementById('chatTheme');
        const speedSelect = document.getElementById('responseSpeed');
        const soundCheckbox = document.getElementById('soundEnabled');
        
        if (themeSelect) themeSelect.value = this.settings.theme;
        if (speedSelect) speedSelect.value = this.settings.responseSpeed;
        if (soundCheckbox) soundCheckbox.checked = this.settings.soundEnabled;
        
        if (this.settings.theme !== 'auto') {
            this.updateTheme(this.settings.theme);
        }
    }

    saveSettings() {
        try {
            localStorage.setItem('chatbot-settings', JSON.stringify(this.settings));
        } catch (e) {
            // Silently handle localStorage errors
            console.log('Could not save settings');
        }
    }
}

// Initialize the chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioChatbot = new PortfolioChatbot();
});