// Portfolio Chatbot Application
class PortfolioChatbot {
    constructor() {
        // --- 1. Portfolio Data ---
        this.portfolioData = {
            "name": "Mohd Saqib",
            "title": "Computer Engineering Student | Aspiring Data Scientist & Full-Stack Developer",
            "email": "saqib29abubkar@gmail.com",
            "phone": "+91-9625035483",
            "location": "Nizamuddin, New Delhi, India",
            "linkedin": "https://linkedin.com/in/mohd-saqib-94b6042ba",
            "github": "https://github.com/MOHDSAQIB695786",
            "summary": "Passionate Computer Engineering student with strong foundations in full-stack web development, data science, and machine learning. Experienced in building scalable web apps, automation agents, and data-driven projects. Keen interest in quantum computing, AI/ML, and automation.",
            "skills": {
                "languages": ["C++", "C", "Python", "R", "JavaScript", "Java", "SQL"],
                "web": ["HTML", "CSS", "Bootstrap", "JavaScript", "React.js", "Node.js", "Express.js", "Jinja2", "Flask"],
                "databases": ["MySQL", "MongoDB", "SQLite"],
                "dataScience": ["NumPy", "Pandas", "Matplotlib", "Seaborn", "Scikit-Learn", "TensorFlow", "XGBoost", "Jupyter Notebook"],
                "cloudDevOps": ["AWS", "Google Cloud Platform (GCP)", "Docker", "Kubernetes", "Git", "GitHub"],
                "tools": ["VS Code", "Postman", "Excel", "PowerPoint", "Redis", "Celery", "Chart.js", "ReportLab"],
                "softSkills": ["Problem Solving", "DSA", "Team Collaboration", "Time Management", "Critical Thinking", "Leadership", "Emotional Intelligence"],
                "specialInterests": ["Quantum Computing", "Automation Agents", "LLM Integration", "Prompt Engineering"]
            },
            "projects": [
                {
                    "name": "Quiz Master V2 – Multi-User Exam Portal",
                    "description": "Full-stack quiz management system with admin/user roles, async jobs, caching, and responsive UI.",
                    "technologies": ["Flask", "VueJS", "SQLite", "Redis", "Celery", "Bootstrap"],
                    "status": "Live"
                },
                {
                    "name": "ML Regression Project – Kaggle Competition",
                    "description": "Built regression models (Linear Regression, SVM, KNN, MLP, Ensembles) with full ML pipeline.",
                    "technologies": ["Python", "scikit-learn", "XGBoost", "pandas", "matplotlib", "seaborn"],
                    "status": "Completed"
                },
                {
                    "name": "Business Optimization for Local Electronics Retailer",
                    "description": "Analyzed sales & inventory data; proposed digital inventory tracking & pricing strategies.",
                    "technologies": ["Excel", "Google Sheets", "Python (pandas, matplotlib, seaborn)"],
                    "status": "Completed"
                },
                {
                    "name": "LLM-based Automation Agent",
                    "description": "Built GPT-powered automation agent for real-world Ops tasks (file parsing, SQL queries, automation).",
                    "technologies": ["Python", "Shell", "Docker", "LLM APIs"],
                    "status": "Completed"
                },
                {
                    "name": "TDS Solver – LLM API",
                    "description": "REST API to answer assignment questions using LLMs. Supports file uploads and JSON output.",
                    "technologies": ["Python", "FastAPI", "Vercel"],
                    "status": "Completed"
                },
                {
                    "name": "Canteen Management System",
                    "description": "Real-time canteen order & inventory system with role-based access for admins/users.",
                    "technologies": ["Node.js", "Express.js", "MySQL", "HTML", "CSS", "Bootstrap"],
                    "status": "Completed"
                },
                {
                    "name": "Smart Home Services Platform",
                    "description": "Multi-role service booking app with dashboards for Admin, Users, and Service Providers.",
                    "technologies": ["Flask", "SQLite", "Flask-Login", "Jinja2", "Bootstrap", "Chart.js", "ReportLab"],
                    "status": "Completed"
                }
            ],
            "experience": [
                {
                    "company": "Agnirva.com Space Community",
                    "position": "Intern",
                    "duration": "June 2024 - July 2024",
                    "location": "Remote",
                    "responsibilities": [
                        "Learned satellite communication and spacecraft systems",
                        "Demonstrated ability to apply space technology knowledge"
                    ]
                }
            ],
            "education": [
                {
                    "degree": "B.Tech in Computer Engineering",
                    "school": "Faculty of Engineering and Technology, Jamia Millia Islamia",
                    "year": "2022 - 2026 (expected)",
                    "cgpa": "8.40 (current)"
                },
                {
                    "degree": "BS in Data Science and Applications (Online)",
                    "school": "Indian Institute of Technology, Madras",
                    "year": "2024 - 2027 (expected)",
                    "cgpa": "9.0"
                },
                {
                    "degree": "Class XII (PCM)",
                    "school": "Rajkiya Pratibha Vikas Vidyalaya, Lajpat Nagar",
                    "year": "2021",
                    "percentage": "94%"
                },
                {
                    "degree": "Class X",
                    "school": "Govt Boys Senior Secondary School, Jangpura",
                    "year": "2019",
                    "percentage": "93.4%"
                }
            ],
            "achievements": [
                "Qualified GATE CS&IT (2025) – CRL 19312 among 1.7 lakh students",
                "Qualified JEE Advanced (2022) – CRL 24106 among 1.6 lakh students",
                "JEE Main (2022): CRL 13654 among 10 lakh students",
                "Completed Memorization of the Qur'an"
            ]
        };

        // --- 2. AI Configuration ---
        // ⚠️ API Key removed for security. Use backend proxy instead.
        // Set this.API_KEY from environment or leave null for proxy mode
        this.API_KEY = null; // Use backend /api/chat endpoint instead
        this.genAI = null;
        this.model = null;
        this.backendEndpoint = '/api/chat';

        // --- 3. Static Data (Quiz/Study) ---
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

        // --- 4. Application State ---
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

        // --- 5. Initialization ---
        this.initAI(); // Start AI
        this.init();   // Start UI
    }

    // --- AI SETUP ---
  initAI() {
        this.genAI = null;
        this.model = null;
        console.log('Chatbot configured to use backend /api/chat');
        // Check backend health and update status indicator
        this.checkBackendLive();
    }

    setBotStatus(text) {
        const el = document.getElementById('botStatus');
        if (el) {
            el.textContent = text;
        }
    }

    async checkBackendLive() {
        try {
            const res = await fetch('/api/health');
            if (res.ok) {
                this.setBotStatus('Live (backend)');
                this.backendLive = true;
            } else {
                this.setBotStatus('Demo');
                this.backendLive = false;
            }
        } catch (e) {
            this.setBotStatus('Demo');
            this.backendLive = false;
        }
    }

    async attemptLiveChat(prompt, maxRetries = 2) {
        let attempt = 0;
        let lastErr = null;
        while (attempt <= maxRetries) {
            try {
                const res = await fetch(this.backendEndpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ prompt })
                });

                const data = await res.json();
                if (!res.ok) throw new Error(data.error || 'Backend error');
                return data;
            } catch (err) {
                lastErr = err;
                attempt += 1;
                const waitMs = Math.pow(2, attempt) * 400;
                await new Promise(r => setTimeout(r, waitMs));
            }
        }
        throw lastErr;
    }

    getSystemPrompt() {
        // Convert portfolio data to string for the AI
        const profileData = JSON.stringify(this.portfolioData);

        return `
        You are an AI Assistant for a portfolio website.
        You represent: ${this.portfolioData.name}.
        
        Here is the detailed profile data in JSON format:
        ${profileData}

        INSTRUCTIONS:
        1. Answer questions based ONLY on the provided JSON data.
        2. Be polite, professional, and concise.
        3. If the user asks for contact info, provide the email and LinkedIn from the data.
        4. If the user asks about a specific project, describe it using the 'description' and 'technologies' fields.
        5. Keep responses short (under 3 sentences) unless asked for details.
        6. Use emojis occasionally to be friendly.
        7. If the answer is not in the JSON data, say: "I don't have that information right now, but you can contact Saqib directly."
        8. Do not make up facts.
        `;
    }

    // --- MAIN INITIALIZATION ---
    init() {
        this.bindEvents();
        this.loadSettings();
        this.showWelcomeMessage();
        this.updateNotificationBadge();
    }

    // --- EVENT LISTENERS ---
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

        // Settings
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

    // --- UI CONTROLLERS ---
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
                description: `I can help you learn about ${this.portfolioData.name}'s skills, projects, and experience. Ask me anything!`,
                questions: [
                    "Tell me about Mohd Saqib's skills",
                    "What projects has he worked on?",
                    "What is his experience?",
                    "How can I contact him?"
                ]
            },
            study: {
                icon: '📚',
                title: 'Welcome to Study Helper!',
                description: 'I can help you with your studies. Upload notes or ask questions about CS topics.',
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
                description: 'Test your knowledge with interactive quizzes on programming topics.',
                questions: [
                    "Start a JavaScript quiz",
                    "Take a random quiz",
                    "Quiz difficulty levels"
                ]
            },
            assistant: {
                icon: '🎯',
                title: 'Welcome to AI Assistant!',
                description: 'I can provide general assistance, answer tech questions, or just chat.',
                questions: [
                    "Tell me about the projects",
                    "What are the main skills?",
                    "How to contact Saqib?",
                    "Tell me interesting facts"
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

    // --- MESSAGING LOGIC ---
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

        // Process message
        this.processMessage(message);
    }

    addMessage(text, sender, timestamp = new Date()) {
        const chatArea = document.getElementById('chatArea');
        const messageElement = document.createElement('div');
        messageElement.className = `message ${sender}`;

        const timeString = timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        // Basic markdown parsing for the bot
        let formattedText = text;
        if (sender === 'bot') {
            // Convert **bold** to <b>bold</b>
            formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
            // Convert newlines to <br>
            formattedText = formattedText.replace(/\n/g, '<br>');
        }

        messageElement.innerHTML = `
            <div class="message-bubble">
                ${formattedText}
                <div class="message-time">${timeString}</div>
            </div>
        `;

        chatArea.appendChild(messageElement);
        this.scrollToBottom();

        this.chatHistory.push({
            text,
            sender,
            timestamp,
            mode: this.currentMode
        });

        if (this.settings.soundEnabled && sender === 'bot') {
            this.playNotificationSound();
        }
    }

    // --- MAIN BRAIN (HYBRID AI + RULE BASED) ---
    async processMessage(message) {
        const lowerMessage = message.toLowerCase();

        // 1. QUIZ MODE INTERCEPT
        if (this.currentMode === 'quiz') {
            const response = this.processQuizMessage(message);
            // Quiz logic is synchronous
            if (response) this.addMessage(response, 'bot');
            return;
        }

        // 2. STUDY MODE FILE LOGIC
        // If uploading files or asking about files, handle locally first
        if (this.currentMode === 'study' && (lowerMessage.includes('upload') || this.studyMaterials.length > 0)) {
            const studyResponse = this.processStudyMessage(message);
            // If processStudyMessage returns a specific string (not default fallback), use it
            if (studyResponse && !studyResponse.includes("Study Helper Active")) {
                this.addMessage(studyResponse, 'bot');
                return;
            }
        }

        // 3. AI GENERATION (Gemini via backend)
        // Show typing indicator
        this.showTypingIndicator();

        try {
            // Construct prompt
            const systemInstruction = this.getSystemPrompt();
            
            // Add context from last 5 messages
            let historyContext = "";
            const recentHistory = this.chatHistory.slice(-5);
            recentHistory.forEach(msg => {
                historyContext += `${msg.sender}: ${msg.text}\n`;
            });

            // Add specific mode context
            let modeContext = "";
            if(this.currentMode === 'study') modeContext = "Mode: Study Helper. Focus on academic explanations.";
            if(this.currentMode === 'assistant') modeContext = "Mode: General Assistant. Be helpful and fun.";

            const prompt = `
            ${systemInstruction}
            ${modeContext}

            CURRENT CHAT HISTORY:
            ${historyContext}

            USER: ${message}
            AI RESPONSE:
            `;

            // Attempt live backend chat with retries
            try {
                this.setBotStatus('Trying live...');
                const data = await this.attemptLiveChat(prompt);
                let text = data.text || this.processRuleBasedFallback(message);
                this.hideTypingIndicator();

                if (data.fallback) {
                    // Backend is reachable but upstream AI is unavailable (quota/rate/billing etc.)
                    this.setBotStatus('Demo (quota fallback)');
                    this.backendLive = false;
                    text = `Live AI is temporarily unavailable, so I switched to demo responses.\n\n${text}`;
                } else {
                    this.setBotStatus('Live (backend)');
                    this.backendLive = true;
                }

                this.addMessage(text, 'bot');
            } catch (liveErr) {
                console.warn('Live chat failed, falling back:', liveErr);
                this.setBotStatus('Demo (backend fallback)');
                this.backendLive = false;
                this.hideTypingIndicator();
                const fallbackResponse = this.processRuleBasedFallback(message);
                this.addMessage(fallbackResponse, 'bot');
            }

        } catch (error) {
            console.error("AI Error:", error);
            this.hideTypingIndicator();
            // Fallback to Rule-Based if AI fails
            const fallbackResponse = this.processRuleBasedFallback(message);
            this.addMessage(fallbackResponse, 'bot');
        }
    }

    // --- FALLBACK LOGIC (Rule Based) ---
    // Used if AI fails or the backend is unavailable
    processRuleBasedFallback(message) {
        const lowerMessage = message.toLowerCase();
        const data = this.portfolioData;

        // Skills queries
        if (lowerMessage.includes('skill') || lowerMessage.includes('expertise')) {
            const skills = Object.entries(data.skills)
                .map(([cat, list]) => `**${cat}:** ${Array.isArray(list) ? list.join(', ') : list}`)
                .join('\n');
            return `${data.name} specializes in:\n\n${skills}`;
        }
        
        // Project queries
        if (lowerMessage.includes('project') || lowerMessage.includes('work')) {
            const projects = data.projects.slice(0, 3)
                .map(p => `• **${p.name}** - ${p.description}`)
                .join('\n');
            return `Here are ${data.name}'s top projects:\n\n${projects}\n\n👉 See the full portfolio section for more!`;
        }
        
        // Experience queries
        if (lowerMessage.includes('experience') || lowerMessage.includes('work history')) {
            return `${data.name} has interned at ${data.experience[0]?.company} as a ${data.experience[0]?.position} (${data.experience[0]?.duration}). Currently a ${data.title}.`;
        }
        
        // Education queries
        if (lowerMessage.includes('education') || lowerMessage.includes('degree') || lowerMessage.includes('study')) {
            const edu = data.education[0];
            return `**${edu.degree}** from ${edu.school} (${edu.year})\nCGPA: ${edu.cgpa || edu.percentage}`;
        }
        
        // Contact queries
        if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('phone')) {
            return `📧 Email: ${data.email}\n☎️ Phone: ${data.phone}\n💼 LinkedIn: ${data.linkedin}\n🐙 GitHub: ${data.github}`;
        }
        
        // Social media
        if (lowerMessage.includes('twitter') || lowerMessage.includes('instagram') || lowerMessage.includes('facebook')) {
            return `Connect with ${data.name} on social media:\n\n📱 Instagram, Twitter, Facebook, LinkedIn available in the footer!`;
        }
        
        // About queries
        if (lowerMessage.includes('about') || lowerMessage.includes('who') || lowerMessage.includes('tell me')) {
            return `👋 Hi! I'm ${data.name}, a ${data.title}.\n\n${data.summary}`;
        }
        
        // Default friendly response
        const defaultResponses = [
            `I'm here to help! Try asking about ${data.name}'s skills, projects, education, or contact info.`,
            `You can ask me about projects, experience, skills, or how to contact ${data.name}! 😊`,
            `Curious about something? Ask about projects, experience, or get contact details!`,
            `Tell me what you'd like to know - I have lots of info about ${data.name}'s experience and skills!`
        ];
        
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }

    // --- STUDY LOGIC ---
    processStudyMessage(message) {
        const lowerMessage = message.toLowerCase();

        // 1. File Upload Prompt
        if (lowerMessage.includes('upload') || lowerMessage.includes('file')) {
            return `📁 **Upload Study Materials:**\n\nClick the 📎 button to upload .txt files. I can then read them to help you study!`;
        }

        // 2. Check Uploaded Content
        if (this.studyMaterials.length > 0) {
            const relevantMaterial = this.studyMaterials.find(material =>
                material.content.toLowerCase().includes(lowerMessage)
            );

            if (relevantMaterial) {
                const excerpt = this.extractRelevantExcerpt(relevantMaterial.content, message);
                return `📖 **From "${relevantMaterial.name}":**\n\n${excerpt}`;
            }
        }
        
        // If no file match, allow it to fall through to AI
        return null;
    }

    // --- QUIZ LOGIC (Unchanged) ---
    processQuizMessage(message) {
        const lowerMessage = message.toLowerCase();

        if (lowerMessage.includes('start') || lowerMessage.includes('quiz')) {
            return this.startQuiz();
        }

        if (this.currentQuiz) {
            this.handleQuizAnswer(message); // This handles the logic internally
            return null; // Don't return text, let handleQuizAnswer do async UI updates
        }

        return `🎯 **Quiz Mode Active!**\n\nType "Start Quiz" to begin testing your knowledge!`;
    }

    startQuiz() {
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

        let response = `❓ **Question ${quiz.currentIndex + 1}**\n\n${question.question}`;

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
                <span class="question-number">Q ${this.currentQuiz.currentIndex + 1}</span>
                <span class="question-timer" id="questionTimer">⏱️ 30s</span>
            </div>
            <div class="question-text">${question.question}</div>
            <div class="question-options" id="questionOptions">
                ${optionsHtml}
            </div>
        `;

        chatArea.appendChild(quizElement);
        this.scrollToBottom();

        quizElement.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.selectQuizAnswer(btn.dataset.answer, btn);
            });
        });

        this.startQuestionTimer();
    }

    selectQuizAnswer(answer, buttonElement) {
        // Stop timer
        clearInterval(this.questionTimerInterval);

        const question = this.currentQuiz.questions[this.currentQuiz.currentIndex];
        const isCorrect = (question.type === 'multiple') ?
            (parseInt(answer) === question.correct) :
            ((answer === 'true') === question.correct);

        buttonElement.classList.add('selected');

        setTimeout(() => {
            // Show correct/incorrect styles
            const options = document.getElementById('questionOptions');
            if (options) {
                options.querySelectorAll('.option-btn').forEach(btn => {
                    btn.disabled = true;
                    if (question.type === 'multiple') {
                        if (parseInt(btn.dataset.answer) === question.correct) btn.classList.add('correct');
                        else if (btn.classList.contains('selected') && !isCorrect) btn.classList.add('incorrect');
                    } else {
                        const btnValue = (btn.dataset.answer === 'true');
                        if (btnValue === question.correct) btn.classList.add('correct');
                        else if (btn.classList.contains('selected') && !isCorrect) btn.classList.add('incorrect');
                    }
                });
            }

            if (isCorrect) this.currentQuiz.score++;

            const explanation = `${isCorrect ? '✅ Correct!' : '❌ Incorrect'}\n\n**Explanation:** ${question.explanation}`;
            this.addMessage(explanation, 'bot');

            setTimeout(() => {
                this.nextQuestion();
            }, 2000);

        }, 500);
    }

    handleQuizAnswer(message) {
        // This is a placeholder for text-based answers if we weren't using buttons
        // Currently handled by selectQuizAnswer
    }

    nextQuestion() {
        this.currentQuiz.currentIndex++;
        if (this.currentQuiz.currentIndex >= this.currentQuiz.questions.length) {
            this.finishQuiz();
        } else {
            const response = this.showQuizQuestion();
            this.addMessage(response, 'bot');
        }
    }

    finishQuiz() {
        const quiz = this.currentQuiz;
        const percentage = Math.round((quiz.score / quiz.questions.length) * 100);
        let msg = `🎉 **Quiz Complete!**\nScore: ${quiz.score}/${quiz.questions.length} (${percentage}%)`;
        this.addMessage(msg, 'bot');
        
        setTimeout(() => {
            this.showQuizResults(quiz.score, quiz.questions.length, 0, percentage);
        }, 1000);
        this.currentQuiz = null;
    }

    showQuizResults(score, total, duration, percentage) {
        const resultsPanel = document.getElementById('quizResults');
        document.getElementById('finalScore').textContent = score;
        document.getElementById('scorePercentage').textContent = percentage + '%';
        document.getElementById('correctAnswers').textContent = score;
        document.getElementById('totalQuestions').textContent = total;
        resultsPanel.classList.remove('hidden');
    }

    closeQuizResults() {
        document.getElementById('quizResults').classList.add('hidden');
    }

    reviewQuizAnswers() {
        this.closeQuizResults();
        this.addMessage("You can retake the quiz anytime!", 'bot');
    }

    startQuestionTimer() {
        if(this.questionTimerInterval) clearInterval(this.questionTimerInterval);
        
        let timeLeft = 30;
        const timerElement = document.getElementById('questionTimer');

        this.questionTimerInterval = setInterval(() => {
            timeLeft--;
            if (timerElement) {
                timerElement.textContent = `⏱️ ${timeLeft}s`;
                if (timeLeft <= 5) timerElement.style.color = 'var(--color-error)';
            }
            if (timeLeft <= 0) {
                clearInterval(this.questionTimerInterval);
                this.selectQuizAnswer(-1, document.createElement('button')); // Timeout
            }
        }, 1000);
    }

    // --- FILE HANDLING ---
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
                    this.addMessage(`📁 **File Uploaded:** ${file.name}\nI can now answer questions about it.`, 'bot');
                };
                reader.readAsText(file);
            } else {
                this.addMessage(`❌ Unsupported file type. Please use .txt`, 'bot');
            }
        });
    }

    extractRelevantExcerpt(content, query) {
        return content.substring(0, 300) + "..."; // Simplified for brevity
    }

    // --- UTILITIES ---
    showTypingIndicator() {
        document.getElementById('typingIndicator').classList.remove('hidden');
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        document.getElementById('typingIndicator').classList.add('hidden');
    }

    updateCharCount(count) {
        document.getElementById('charCount').textContent = `${count}/500`;
    }

    scrollToBottom() {
        const chatArea = document.getElementById('chatArea');
        chatArea.scrollTop = chatArea.scrollHeight;
    }

    toggleSettings() {
        const panel = document.getElementById('settingsPanel');
        panel.classList.toggle('hidden');
    }

    closeSettings() {
        document.getElementById('settingsPanel').classList.add('hidden');
    }

    updateTheme(theme) {
        this.settings.theme = theme;
        if (theme === 'auto') document.documentElement.removeAttribute('data-color-scheme');
        else document.documentElement.setAttribute('data-color-scheme', theme);
        this.saveSettings();
    }

    updateNotificationBadge() {
        const badge = document.getElementById('notificationBadge');
        if (this.chatHistory.length === 0) badge.classList.remove('hidden');
        else badge.classList.add('hidden');
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
            const saved = JSON.parse(localStorage.getItem('chatbot-settings') || '{}');
            this.settings = { ...this.settings, ...saved };
        } catch (e) { console.log('Default settings'); }
    }

    saveSettings() {
        localStorage.setItem('chatbot-settings', JSON.stringify(this.settings));
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioChatbot = new PortfolioChatbot();
});