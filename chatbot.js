// // Portfolio Chatbot Application
// class PortfolioChatbot {
//     constructor() {
//         // --- 1. Portfolio Data ---
// this.portfolioData = {
//     "name": "Mohd Saqib",

//     "title": "M.Tech AI & ML Student | Generative AI & Agentic AI Developer | Data Science Practitioner",

//     "email": "saqib29abubkar@gmail.com",
//     "phone": "+91-9625035483",
//     "location": "New Delhi, India",

//     "linkedin": "https://linkedin.com/in/mohd-saqib-94b6042ba",
//     "github": "https://github.com/MOHDSAQIB695786",

//     "summary": "Computer Engineer and Data Science practitioner pursuing an M.Tech in Computer Engineering with a focus on Artificial Intelligence & Machine Learning at Jamia Millia Islamia, while completing a BS in Data Science & Applications from IIT Madras. Builds full-stack applications, machine learning systems, LLM-powered applications, AI agents, RAG systems, and automation tools. Also creates and teaches practical technology courses on Udemy.",

//     "currentFocus": [
//         "M.Tech in Computer Engineering (AI & ML) at Jamia Millia Islamia",
//         "Generative AI and Large Language Models",
//         "Agentic AI and AI Agents",
//         "Retrieval-Augmented Generation (RAG)",
//         "LLM-powered automation",
//         "Machine Learning and Data Science",
//         "Full-Stack Development"
//     ],

//     "skills": {
//         "languages": [
//             "Python",
//             "C++",
//             "C",
//             "Java",
//             "JavaScript",
//             "R",
//             "SQL"
//         ],

//         "web": [
//             "HTML",
//             "CSS",
//             "Bootstrap",
//             "JavaScript",
//             "React.js",
//             "Node.js",
//             "Express.js",
//             "Flask",
//             "FastAPI",
//             "Tailwind CSS"
//         ],

//         "databases": [
//             "MySQL",
//             "MongoDB",
//             "SQLite",
//             "PostgreSQL",
//             "Redis"
//         ],

//         "dataScience": [
//             "NumPy",
//             "Pandas",
//             "Matplotlib",
//             "Scikit-Learn",
//             "TensorFlow",
//             "XGBoost",
//             "LightGBM",
//             "Jupyter Notebook"
//         ],

//         "aiAndGenAI": [
//             "Machine Learning",
//             "Deep Learning",
//             "Generative AI",
//             "Large Language Models (LLMs)",
//             "RAG",
//             "AI Agents",
//             "Prompt Engineering",
//             "LLM Integration",
//             "Tool Calling",
//             "Automation Workflows"
//         ],

//         "cloudDevOps": [
//             "AWS",
//             "Google Cloud Platform (GCP)",
//             "Docker",
//             "Kubernetes",
//             "Git",
//             "GitHub"
//         ],

//         "tools": [
//             "VS Code",
//             "Postman",
//             "Excel",
//             "PowerPoint",
//             "Redis",
//             "Celery",
//             "Chart.js",
//             "ReportLab"
//         ],

//         "softSkills": [
//             "Problem Solving",
//             "Critical Thinking",
//             "Team Collaboration",
//             "Time Management",
//             "Leadership"
//         ],

//         "specialInterests": [
//             "Artificial Intelligence",
//             "Generative AI",
//             "Agentic AI",
//             "RAG Systems",
//             "Quantum Computing",
//             "Automation Agents",
//             "LLM Applications"
//         ]
//     },

//     "projects": [
//         {
//             "name": "Visual Question Answering System",
//             "description": "Deep learning based Visual Question Answering system for image and video inputs using BLIP, with a Flask backend.",
//             "technologies": [
//                 "Python",
//                 "PyTorch",
//                 "BLIP",
//                 "Hugging Face Transformers",
//                 "Flask"
//             ],
//             "status": "Completed"
//         },

//         {
//             "name": "EventOps – Sound & Light Rental Operations Platform",
//             "description": "Small-business operations platform designed to manage sound and light rental workflows, operations, and business processes.",
//             "technologies": [
//                 "Full-Stack Development",
//                 "Web Technologies",
//                 "Database Systems"
//             ],
//             "status": "Completed"
//         },

//         {
//             "name": "Quiz Master V2 – Multi-User Exam Portal",
//             "description": "Full-stack quiz management system with admin and user roles, asynchronous jobs, caching, and responsive UI.",
//             "technologies": [
//                 "Flask",
//                 "Vue.js",
//                 "SQLite",
//                 "Redis",
//                 "Celery",
//                 "Bootstrap"
//             ],
//             "status": "Live"
//         },

//         {
//             "name": "LLM-based Automation Agent",
//             "description": "LLM-powered automation system designed for practical operations tasks including file processing, SQL queries, and workflow automation.",
//             "technologies": [
//                 "Python",
//                 "LLM APIs",
//                 "Shell",
//                 "Docker"
//             ],
//             "status": "Completed"
//         },

//         {
//             "name": "TDS Solver – LLM API",
//             "description": "REST API that uses Large Language Models to answer assignment questions and supports file uploads with structured JSON responses.",
//             "technologies": [
//                 "Python",
//                 "FastAPI",
//                 "LLM APIs",
//                 "Vercel"
//             ],
//             "status": "Completed"
//         },

//         {
//             "name": "ML Regression Project – Kaggle Competition",
//             "description": "Machine learning regression project involving model development, feature engineering, evaluation, and ensemble methods.",
//             "technologies": [
//                 "Python",
//                 "Scikit-Learn",
//                 "XGBoost",
//                 "Pandas",
//                 "Matplotlib"
//             ],
//             "status": "Completed"
//         },

//         {
//             "name": "Smart Hospital Management System",
//             "description": "Hospital management application designed to manage users, hospital workflows, and healthcare-related operations.",
//             "technologies": [
//                 "Python",
//                 "Flask",
//                 "Database Systems",
//                 "Web Development"
//             ],
//             "status": "Completed"
//         }
//     ],

//     "experience": [
//         {
//             "company": "Udemy",
//             "position": "Instructor & Content Creator",
//             "duration": "December 2025 - Present",
//             "location": "Remote",
//             "responsibilities": [
//                 "Designed and published practical technical courses covering Python, Data Science, Machine Learning, and Generative AI.",
//                 "Created structured curricula, coding exercises, demonstrations, and practical learning materials.",
//                 "Published the Complete Generative AI, Agentic AI & RAG Bootcamp."
//             ]
//         },

//         {
//             "company": "Agnirva Space Community",
//             "position": "Space Technology Intern",
//             "duration": "June 2024 - July 2024",
//             "location": "Remote",
//             "responsibilities": [
//                 "Learned about satellite communication and spacecraft systems.",
//                 "Explored applications of space technology and related engineering concepts."
//             ]
//         }
//     ],

//     "education": [
//         {
//             "degree": "M.Tech in Computer Engineering (AI & ML)",
//             "school": "Jamia Millia Islamia, New Delhi",
//             "year": "2026 - Present",
//             "status": "Currently pursuing",
//             "focus": [
//                 "Artificial Intelligence",
//                 "Machine Learning",
//                 "Generative AI",
//                 "Agentic AI"
//             ]
//         },

//         {
//             "degree": "B.Tech in Computer Engineering",
//             "school": "Jamia Millia Islamia, New Delhi",
//             "year": "2022 - 2026",
//             "status": "Completed",
//             "cpi": "8.39/10",
//             "division": "First Division",
//             "credits": "193"
//         },

//         {
//             "degree": "BS in Data Science & Applications",
//             "school": "Indian Institute of Technology Madras",
//             "year": "2024 - 2026",
//             "status": "In progress",
//             "cgpa": "7.08"
//         },

//         {
//             "degree": "Class XII (PCM)",
//             "school": "Rajkiya Pratibha Vikas Vidyalaya, Lajpat Nagar",
//             "year": "2021",
//             "percentage": "94%"
//         },

//         {
//             "degree": "Class X",
//             "school": "Govt Boys Senior Secondary School, Jangpura",
//             "year": "2019",
//             "percentage": "93.4%"
//         }
//     ],

//     "courses": [
//         {
//             "title": "Complete Generative AI, Agentic AI & RAG Bootcamp",
//             "platform": "Udemy",
//             "status": "Published",
//             "lectures": "160+",
//             "duration": "30+ Hours",
//             "description": "Practical course covering Generative AI, LLMs, RAG, AI agents, prompt engineering, tool calling, workflows, and real-world AI applications."
//         },
//         {
//             "title": "Python for Absolute Beginners",
//             "platform": "Udemy",
//             "status": "Published",
//             "description": "Beginner-friendly Python programming course."
//         }
//     ],

//     "achievements": [
//         "B.Tech in Computer Engineering from Jamia Millia Islamia with CPI 8.39/10",
//         "Pursuing M.Tech in Computer Engineering with focus on AI & ML at Jamia Millia Islamia",
//         "Pursuing BS in Data Science & Applications from IIT Madras",
//         "Qualified GATE CS&IT 2025",
//         "Qualified JEE Advanced 2022",
//         "Published technical courses on Udemy"
//     ]
// };

//         // --- 2. AI Configuration ---
//         // ⚠️ API Key removed for security. Use backend proxy instead.
//         // Set this.API_KEY from environment or leave null for proxy mode
//         this.API_KEY = null; // Use backend /api/chat endpoint instead
//         this.genAI = null;
//         this.model = null;
//         this.backendEndpoint = '/api/chat';

//         // --- 3. Static Data (Quiz/Study) ---
//         this.studyTopics = {
//             "Computer Networks": {
//                 "keywords": ["TCP", "IP", "HTTP", "routing", "protocol", "OSI model", "network layer", "transport layer"],
//                 "content": "Computer networks involve the study of communication protocols, network architecture, and data transmission methods."
//             },
//             "Compiler Design": {
//                 "keywords": ["lexical analysis", "parsing", "syntax tree", "code generation", "optimization", "grammar"],
//                 "content": "Compiler design covers the translation of high-level programming languages to machine code through various phases."
//             },
//             "Data Structures": {
//                 "keywords": ["array", "linked list", "stack", "queue", "tree", "graph", "hash table", "algorithm"],
//                 "content": "Data structures are ways of organizing and storing data efficiently for various operations and algorithms."
//             }
//         };

//         this.quizQuestions = [
//             {
//                 "id": 1,
//                 "category": "JavaScript",
//                 "difficulty": "easy",
//                 "question": "Which method is used to add an element to the end of an array?",
//                 "type": "multiple",
//                 "options": ["push()", "pop()", "shift()", "unshift()"],
//                 "correct": 0,
//                 "explanation": "The push() method adds one or more elements to the end of an array and returns the new length."
//             },
//             {
//                 "id": 2,
//                 "category": "CSS",
//                 "difficulty": "medium",
//                 "question": "Flexbox is only for one-dimensional layouts.",
//                 "type": "boolean",
//                 "correct": true,
//                 "explanation": "Flexbox is designed for one-dimensional layouts (either row or column), while CSS Grid is for two-dimensional layouts."
//             },
//             {
//                 "id": 3,
//                 "category": "React",
//                 "difficulty": "medium",
//                 "question": "Which hook is used to manage state in functional components?",
//                 "type": "multiple",
//                 "options": ["useEffect", "useState", "useContext", "useReducer"],
//                 "correct": 1,
//                 "explanation": "useState is the primary hook for managing local state in React functional components."
//             },
//             {
//                 "id": 4,
//                 "category": "HTML",
//                 "difficulty": "easy",
//                 "question": "HTML stands for HyperText Markup Language.",
//                 "type": "boolean",
//                 "correct": true,
//                 "explanation": "HTML indeed stands for HyperText Markup Language, the standard markup language for web pages."
//             },
//             {
//                 "id": 5,
//                 "category": "Node.js",
//                 "difficulty": "hard",
//                 "question": "What is the purpose of the Event Loop in Node.js?",
//                 "type": "multiple",
//                 "options": [
//                     "To handle synchronous operations",
//                     "To manage asynchronous callbacks and I/O operations",
//                     "To create new threads",
//                     "To compile JavaScript code"
//                 ],
//                 "correct": 1,
//                 "explanation": "The Event Loop handles asynchronous callbacks and I/O operations, allowing Node.js to be non-blocking."
//             }
//         ];

//         // --- 4. Application State ---
//         this.currentMode = 'portfolio';
//         this.chatHistory = [];
//         this.studyMaterials = [];
//         this.currentQuiz = null;
//         this.quizState = {
//             currentQuestion: 0,
//             score: 0,
//             answers: [],
//             startTime: null,
//             timeLeft: 30
//         };
//         this.settings = {
//             theme: 'auto',
//             responseSpeed: 'normal',
//             soundEnabled: true
//         };

//         // --- 5. Initialization ---
//         this.initAI(); // Start AI
//         this.init();   // Start UI
//     }

//     // --- AI SETUP ---
//   initAI() {
//         this.genAI = null;
//         this.model = null;
//         console.log('Chatbot configured to use backend /api/chat');
//         // Check backend health and update status indicator
//         this.checkBackendLive();
//     }

//     setBotStatus(text) {
//         const el = document.getElementById('botStatus');
//         if (el) {
//             el.textContent = text;
//         }
//     }

//     async checkBackendLive() {
//         try {
//             const res = await fetch('/api/health');
//             if (res.ok) {
//                 this.setBotStatus('Live (backend)');
//                 this.backendLive = true;
//             } else {
//                 this.setBotStatus('Demo');
//                 this.backendLive = false;
//             }
//         } catch (e) {
//             this.setBotStatus('Demo');
//             this.backendLive = false;
//         }
//     }

//     async attemptLiveChat(prompt, maxRetries = 2) {
//         let attempt = 0;
//         let lastErr = null;
//         while (attempt <= maxRetries) {
//             try {
//                 const res = await fetch(this.backendEndpoint, {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify({ prompt })
//                 });

//                 const data = await res.json();
//                 if (!res.ok) throw new Error(data.error || 'Backend error');
//                 return data;
//             } catch (err) {
//                 lastErr = err;
//                 attempt += 1;
//                 const waitMs = Math.pow(2, attempt) * 400;
//                 await new Promise(r => setTimeout(r, waitMs));
//             }
//         }
//         throw lastErr;
//     }

//     getSystemPrompt() {
//         // Convert portfolio data to string for the AI
//         const profileData = JSON.stringify(this.portfolioData);

//         return `
//         You are an AI Assistant for a portfolio website.
//         You represent: ${this.portfolioData.name}.
        
//         Here is the detailed profile data in JSON format:
//         ${profileData}

//         INSTRUCTIONS:
//         1. Answer questions based ONLY on the provided JSON data.
//         2. Be polite, professional, and concise.
//         3. If the user asks for contact info, provide the email and LinkedIn from the data.
//         4. If the user asks about a specific project, describe it using the 'description' and 'technologies' fields.
//         5. Keep responses short (under 3 sentences) unless asked for details.
//         6. Use emojis occasionally to be friendly.
//         7. If the answer is not in the JSON data, say: "I don't have that information right now, but you can contact Saqib directly."
//         8. Do not make up facts.
//         `;
//     }

//     // --- MAIN INITIALIZATION ---
//     init() {
//         this.bindEvents();
//         this.loadSettings();
//         this.showWelcomeMessage();
//         this.updateNotificationBadge();
//     }

//     // --- EVENT LISTENERS ---
//     bindEvents() {
//         // Floating chatbot button
//         document.getElementById('chatbotFloat').addEventListener('click', () => {
//             this.openChat();
//         });

//         // Modal close events
//         document.getElementById('closeModal').addEventListener('click', () => {
//             this.closeChat();
//         });

//         document.querySelector('.modal-overlay').addEventListener('click', () => {
//             this.closeChat();
//         });

//         // Mode selector
//         document.querySelectorAll('.mode-btn').forEach(btn => {
//             btn.addEventListener('click', () => {
//                 this.switchMode(btn.dataset.mode);
//             });
//         });

//         // Message input
//         const messageInput = document.getElementById('messageInput');
//         messageInput.addEventListener('keypress', (e) => {
//             if (e.key === 'Enter') {
//                 this.sendMessage();
//             }
//         });

//         messageInput.addEventListener('input', (e) => {
//             this.updateCharCount(e.target.value.length);
//         });

//         // Send button
//         document.getElementById('sendBtn').addEventListener('click', () => {
//             this.sendMessage();
//         });

//         // Quick question buttons
//         document.addEventListener('click', (e) => {
//             if (e.target.classList.contains('quick-btn')) {
//                 const question = e.target.dataset.question;
//                 this.sendMessage(question);
//             }
//         });

//         // File upload
//         const fileInput = document.getElementById('fileInput');
//         const uploadZone = document.getElementById('uploadZone');
//         const attachBtn = document.getElementById('attachBtn');

//         attachBtn.addEventListener('click', () => {
//             if (this.currentMode === 'study') {
//                 fileInput.click();
//             }
//         });

//         uploadZone.addEventListener('click', () => {
//             fileInput.click();
//         });

//         uploadZone.addEventListener('dragover', (e) => {
//             e.preventDefault();
//             uploadZone.classList.add('dragover');
//         });

//         uploadZone.addEventListener('dragleave', () => {
//             uploadZone.classList.remove('dragover');
//         });

//         uploadZone.addEventListener('drop', (e) => {
//             e.preventDefault();
//             uploadZone.classList.remove('dragover');
//             this.handleFileUpload(e.dataTransfer.files);
//         });

//         fileInput.addEventListener('change', (e) => {
//             this.handleFileUpload(e.target.files);
//         });

//         // Settings
//         document.getElementById('settingsBtn').addEventListener('click', (e) => {
//             e.stopPropagation();
//             this.toggleSettings();
//         });

//         document.getElementById('closeSettings').addEventListener('click', () => {
//             this.closeSettings();
//         });

//         // Close settings when clicking outside
//         document.addEventListener('click', (e) => {
//             const settingsPanel = document.getElementById('settingsPanel');
//             const settingsBtn = document.getElementById('settingsBtn');

//             if (!settingsPanel.contains(e.target) && e.target !== settingsBtn) {
//                 this.closeSettings();
//             }
//         });

//         document.getElementById('exportBtn').addEventListener('click', () => {
//             this.exportChat();
//         });

//         document.getElementById('clearChatBtn').addEventListener('click', () => {
//             this.clearChat();
//         });

//         // Settings controls
//         document.getElementById('chatTheme').addEventListener('change', (e) => {
//             this.updateTheme(e.target.value);
//         });

//         document.getElementById('responseSpeed').addEventListener('change', (e) => {
//             this.settings.responseSpeed = e.target.value;
//             this.saveSettings();
//         });

//         document.getElementById('soundEnabled').addEventListener('change', (e) => {
//             this.settings.soundEnabled = e.target.checked;
//             this.saveSettings();
//         });

//         // Quiz results
//         document.getElementById('closeResults').addEventListener('click', () => {
//             this.closeQuizResults();
//         });

//         document.getElementById('retakeQuizBtn').addEventListener('click', () => {
//             this.closeQuizResults();
//             this.startQuiz();
//         });

//         document.getElementById('reviewAnswersBtn').addEventListener('click', () => {
//             this.reviewQuizAnswers();
//         });

//         // Escape key handling
//         document.addEventListener('keydown', (e) => {
//             if (e.key === 'Escape') {
//                 if (!document.getElementById('chatModal').classList.contains('hidden')) {
//                     this.closeChat();
//                 } else if (!document.getElementById('settingsPanel').classList.contains('hidden')) {
//                     this.closeSettings();
//                 } else if (!document.getElementById('quizResults').classList.contains('hidden')) {
//                     this.closeQuizResults();
//                 }
//             }
//         });
//     }

//     // --- UI CONTROLLERS ---
//     openChat() {
//         document.getElementById('chatModal').classList.remove('hidden');
//         document.body.style.overflow = 'hidden';
//         document.getElementById('messageInput').focus();
//         this.hideNotificationBadge();
//     }

//     closeChat() {
//         document.getElementById('chatModal').classList.add('hidden');
//         document.body.style.overflow = 'auto';
//         this.closeSettings();
//         this.closeQuizResults();
//     }

//     switchMode(mode) {
//         this.currentMode = mode;

//         // Update mode buttons
//         document.querySelectorAll('.mode-btn').forEach(btn => {
//             btn.classList.remove('active');
//         });
//         document.querySelector(`[data-mode="${mode}"]`).classList.add('active');

//         // Update UI based on mode
//         this.updateModeUI();
//         this.showWelcomeMessage();

//         // Update mode info
//         const modeNames = {
//             portfolio: 'Portfolio Mode',
//             study: 'Study Mode',
//             quiz: 'Quiz Mode',
//             assistant: 'Assistant Mode'
//         };
//         document.getElementById('modeInfo').textContent = modeNames[mode];
//     }

//     updateModeUI() {
//         const fileUploadArea = document.getElementById('fileUploadArea');
//         const attachBtn = document.getElementById('attachBtn');

//         if (this.currentMode === 'study') {
//             fileUploadArea.classList.remove('hidden');
//             attachBtn.style.display = 'block';
//         } else {
//             fileUploadArea.classList.add('hidden');
//             attachBtn.style.display = 'none';
//         }
//     }

//     showWelcomeMessage() {
//         const welcomeMessage = document.getElementById('welcomeMessage');
//         const chatArea = document.getElementById('chatArea');

//         // Clear existing messages
//         const existingMessages = chatArea.querySelectorAll('.message');
//         existingMessages.forEach(msg => msg.remove());

//         const welcomeData = {
//             portfolio: {
//                 icon: '💼',
//                 title: 'Welcome to Portfolio Assistant!',
//                 description: `I can help you learn about ${this.portfolioData.name}'s skills, projects, and experience. Ask me anything!`,
//                 questions: [
//                     "Tell me about Mohd Saqib's skills",
//                     "What projects has he worked on?",
//                     "What is his experience?",
//                     "How can I contact him?"
//                 ]
//             },
//             study: {
//                 icon: '📚',
//                 title: 'Welcome to Study Helper!',
//                 description: 'I can help you with your studies. Upload notes or ask questions about CS topics.',
//                 questions: [
//                     "Explain TCP/IP protocol",
//                     "What is lexical analysis?",
//                     "How do binary trees work?",
//                     "Upload study materials"
//                 ]
//             },
//             quiz: {
//                 icon: '❓',
//                 title: 'Welcome to Quiz Mode!',
//                 description: 'Test your knowledge with interactive quizzes on programming topics.',
//                 questions: [
//                     "Start a JavaScript quiz",
//                     "Take a random quiz",
//                     "Quiz difficulty levels"
//                 ]
//             },
//             assistant: {
//                 icon: '🎯',
//                 title: 'Welcome to AI Assistant!',
//                 description: 'I can provide general assistance, answer tech questions, or just chat.',
//                 questions: [
//                     "Tell me about the projects",
//                     "What are the main skills?",
//                     "How to contact Saqib?",
//                     "Tell me interesting facts"
//                 ]
//             }
//         };

//         const data = welcomeData[this.currentMode];

//         welcomeMessage.querySelector('.welcome-avatar').textContent = data.icon;
//         welcomeMessage.querySelector('h4').textContent = data.title;
//         welcomeMessage.querySelector('p').textContent = data.description;

//         const quickQuestions = welcomeMessage.querySelector('.quick-questions');
//         quickQuestions.innerHTML = data.questions.map(q =>
//             `<button class="quick-btn" data-question="${q}">${q}</button>`
//         ).join('');

//         welcomeMessage.classList.remove('hidden');
//     }

//     // --- MESSAGING LOGIC ---
//     sendMessage(text = null) {
//         const messageInput = document.getElementById('messageInput');
//         const message = text || messageInput.value.trim();

//         if (!message) return;

//         // Hide welcome message
//         document.getElementById('welcomeMessage').classList.add('hidden');

//         // Add user message
//         this.addMessage(message, 'user');

//         // Clear input
//         messageInput.value = '';
//         this.updateCharCount(0);

//         // Process message
//         this.processMessage(message);
//     }

//     addMessage(text, sender, timestamp = new Date()) {
//         const chatArea = document.getElementById('chatArea');
//         const messageElement = document.createElement('div');
//         messageElement.className = `message ${sender}`;

//         const timeString = timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

//         // Basic markdown parsing for the bot
//         let formattedText = text;
//         if (sender === 'bot') {
//             // Convert **bold** to <b>bold</b>
//             formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
//             // Convert newlines to <br>
//             formattedText = formattedText.replace(/\n/g, '<br>');
//         }

//         messageElement.innerHTML = `
//             <div class="message-bubble">
//                 ${formattedText}
//                 <div class="message-time">${timeString}</div>
//             </div>
//         `;

//         chatArea.appendChild(messageElement);
//         this.scrollToBottom();

//         this.chatHistory.push({
//             text,
//             sender,
//             timestamp,
//             mode: this.currentMode
//         });

//         if (this.settings.soundEnabled && sender === 'bot') {
//             this.playNotificationSound();
//         }
//     }

//     // --- MAIN BRAIN (HYBRID AI + RULE BASED) ---
//     async processMessage(message) {
//         const lowerMessage = message.toLowerCase();

//         // 1. QUIZ MODE INTERCEPT
//         if (this.currentMode === 'quiz') {
//             const response = this.processQuizMessage(message);
//             // Quiz logic is synchronous
//             if (response) this.addMessage(response, 'bot');
//             return;
//         }

//         // 2. STUDY MODE FILE LOGIC
//         // If uploading files or asking about files, handle locally first
//         if (this.currentMode === 'study' && (lowerMessage.includes('upload') || this.studyMaterials.length > 0)) {
//             const studyResponse = this.processStudyMessage(message);
//             // If processStudyMessage returns a specific string (not default fallback), use it
//             if (studyResponse && !studyResponse.includes("Study Helper Active")) {
//                 this.addMessage(studyResponse, 'bot');
//                 return;
//             }
//         }

//         // 3. AI GENERATION (Gemini via backend)
//         // Show typing indicator
//         this.showTypingIndicator();

//         try {
//             // Construct prompt
//             const systemInstruction = this.getSystemPrompt();
            
//             // Add context from last 5 messages
//             let historyContext = "";
//             const recentHistory = this.chatHistory.slice(-5);
//             recentHistory.forEach(msg => {
//                 historyContext += `${msg.sender}: ${msg.text}\n`;
//             });

//             // Add specific mode context
//             let modeContext = "";
//             if(this.currentMode === 'study') modeContext = "Mode: Study Helper. Focus on academic explanations.";
//             if(this.currentMode === 'assistant') modeContext = "Mode: General Assistant. Be helpful and fun.";

//             const prompt = `
//             ${systemInstruction}
//             ${modeContext}

//             CURRENT CHAT HISTORY:
//             ${historyContext}

//             USER: ${message}
//             AI RESPONSE:
//             `;

//             // Attempt live backend chat with retries
//             try {
//                 this.setBotStatus('Trying live...');
//                 const data = await this.attemptLiveChat(prompt);
//                 let text = data.text || this.processRuleBasedFallback(message);
//                 this.hideTypingIndicator();

//                 if (data.fallback) {
//                     // Backend is reachable but upstream AI is unavailable (quota/rate/billing etc.)
//                     this.setBotStatus('Demo (quota fallback)');
//                     this.backendLive = false;
//                     text = `Live AI is temporarily unavailable, so I switched to demo responses.\n\n${text}`;
//                 } else {
//                     this.setBotStatus('Live (backend)');
//                     this.backendLive = true;
//                 }

//                 this.addMessage(text, 'bot');
//             } catch (liveErr) {
//                 console.warn('Live chat failed, falling back:', liveErr);
//                 this.setBotStatus('Demo (backend fallback)');
//                 this.backendLive = false;
//                 this.hideTypingIndicator();
//                 const fallbackResponse = this.processRuleBasedFallback(message);
//                 this.addMessage(fallbackResponse, 'bot');
//             }

//         } catch (error) {
//             console.error("AI Error:", error);
//             this.hideTypingIndicator();
//             // Fallback to Rule-Based if AI fails
//             const fallbackResponse = this.processRuleBasedFallback(message);
//             this.addMessage(fallbackResponse, 'bot');
//         }
//     }

//     // --- FALLBACK LOGIC (Rule Based) ---
//     // Used if AI fails or the backend is unavailable
//     processRuleBasedFallback(message) {
//         const lowerMessage = message.toLowerCase();
//         const data = this.portfolioData;

//         // Skills queries
//         if (lowerMessage.includes('skill') || lowerMessage.includes('expertise')) {
//             const skills = Object.entries(data.skills)
//                 .map(([cat, list]) => `**${cat}:** ${Array.isArray(list) ? list.join(', ') : list}`)
//                 .join('\n');
//             return `${data.name} specializes in:\n\n${skills}`;
//         }
        
//         // Project queries
//         if (lowerMessage.includes('project') || lowerMessage.includes('work')) {
//             const projects = data.projects.slice(0, 3)
//                 .map(p => `• **${p.name}** - ${p.description}`)
//                 .join('\n');
//             return `Here are ${data.name}'s top projects:\n\n${projects}\n\n👉 See the full portfolio section for more!`;
//         }
//         // Course queries
// if (
//     lowerMessage.includes('course') ||
//     lowerMessage.includes('udemy') ||
//     lowerMessage.includes('bootcamp') ||
//     lowerMessage.includes('generative ai')
// ) {
//     const courses = data.courses.map(course =>
//         `• **${course.title}** — ${course.platform} | ${course.status}`
//     ).join('\n');

//     return `🎓 **Courses by ${data.name}**\n\n${courses}`;
// }
//         // Experience queries
//         if (lowerMessage.includes('experience') || lowerMessage.includes('work history')) {
//             return `${data.name} has interned at ${data.experience[0]?.company} as a ${data.experience[0]?.position} (${data.experience[0]?.duration}). Currently a ${data.title}.`;
//         }
        
//         // Education queries
// // Education queries
// if (
//     lowerMessage.includes('education') ||
//     lowerMessage.includes('degree') ||
//     lowerMessage.includes('study') ||
//     lowerMessage.includes('m.tech') ||
//     lowerMessage.includes('b.tech') ||
//     lowerMessage.includes('iit madras')
// ) {
//     const education = data.education.map(edu => {
//         const result = [`**${edu.degree}**`, `${edu.school}`, `${edu.year}`];

//         if (edu.cpi) result.push(`CPI: ${edu.cpi}`);
//         if (edu.cgpa) result.push(`CGPA: ${edu.cgpa}`);
//         if (edu.percentage) result.push(`Percentage: ${edu.percentage}`);
//         if (edu.status) result.push(edu.status);

//         return result.join(' | ');
//     }).join('\n\n');

//     return `🎓 **Mohd Saqib's Education**\n\n${education}`;
// }
        
//         // Contact queries
//         if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('phone')) {
//             return `📧 Email: ${data.email}\n☎️ Phone: ${data.phone}\n💼 LinkedIn: ${data.linkedin}\n🐙 GitHub: ${data.github}`;
//         }
        
//         // Social media
//         if (lowerMessage.includes('twitter') || lowerMessage.includes('instagram') || lowerMessage.includes('facebook')) {
//             return `Connect with ${data.name} on social media:\n\n📱 Instagram, Twitter, Facebook, LinkedIn available in the footer!`;
//         }
        
//         // About queries
//         if (lowerMessage.includes('about') || lowerMessage.includes('who') || lowerMessage.includes('tell me')) {
//             return `👋 Hi! I'm ${data.name}, a ${data.title}.\n\n${data.summary}`;
//         }
        
//         // Default friendly response
//         const defaultResponses = [
//             `I'm here to help! Try asking about ${data.name}'s skills, projects, education, or contact info.`,
//             `You can ask me about projects, experience, skills, or how to contact ${data.name}! 😊`,
//             `Curious about something? Ask about projects, experience, or get contact details!`,
//             `Tell me what you'd like to know - I have lots of info about ${data.name}'s experience and skills!`
//         ];
        
//         return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
//     }

//     // --- STUDY LOGIC ---
//     processStudyMessage(message) {
//         const lowerMessage = message.toLowerCase();

//         // 1. File Upload Prompt
//         if (lowerMessage.includes('upload') || lowerMessage.includes('file')) {
//             return `📁 **Upload Study Materials:**\n\nClick the 📎 button to upload .txt files. I can then read them to help you study!`;
//         }

//         // 2. Check Uploaded Content
//         if (this.studyMaterials.length > 0) {
//             const relevantMaterial = this.studyMaterials.find(material =>
//                 material.content.toLowerCase().includes(lowerMessage)
//             );

//             if (relevantMaterial) {
//                 const excerpt = this.extractRelevantExcerpt(relevantMaterial.content, message);
//                 return `📖 **From "${relevantMaterial.name}":**\n\n${excerpt}`;
//             }
//         }
        
//         // If no file match, allow it to fall through to AI
//         return null;
//     }

//     // --- QUIZ LOGIC (Unchanged) ---
//     processQuizMessage(message) {
//         const lowerMessage = message.toLowerCase();

//         if (lowerMessage.includes('start') || lowerMessage.includes('quiz')) {
//             return this.startQuiz();
//         }

//         if (this.currentQuiz) {
//             this.handleQuizAnswer(message); // This handles the logic internally
//             return null; // Don't return text, let handleQuizAnswer do async UI updates
//         }

//         return `🎯 **Quiz Mode Active!**\n\nType "Start Quiz" to begin testing your knowledge!`;
//     }

//     startQuiz() {
//         const selectedQuestions = this.getRandomQuestions(5);
//         this.currentQuiz = {
//             questions: selectedQuestions,
//             currentIndex: 0,
//             score: 0,
//             answers: [],
//             startTime: Date.now()
//         };
//         return this.showQuizQuestion();
//     }

//     getRandomQuestions(count) {
//         const shuffled = [...this.quizQuestions].sort(() => Math.random() - 0.5);
//         return shuffled.slice(0, Math.min(count, shuffled.length));
//     }

//     showQuizQuestion() {
//         const quiz = this.currentQuiz;
//         const question = quiz.questions[quiz.currentIndex];

//         let response = `❓ **Question ${quiz.currentIndex + 1}**\n\n${question.question}`;

//         setTimeout(() => {
//             this.renderQuizQuestion(question);
//         }, 100);

//         return response;
//     }

//     renderQuizQuestion(question) {
//         const chatArea = document.getElementById('chatArea');
//         const quizElement = document.createElement('div');
//         quizElement.className = 'quiz-question';

//         let optionsHtml = '';
//         if (question.type === 'multiple') {
//             question.options.forEach((option, index) => {
//                 const letter = String.fromCharCode(65 + index);
//                 optionsHtml += `<button class="option-btn" data-answer="${index}">${letter}. ${option}</button>`;
//             });
//         } else {
//             optionsHtml = `
//                 <button class="option-btn" data-answer="true">A. True</button>
//                 <button class="option-btn" data-answer="false">B. False</button>
//             `;
//         }

//         quizElement.innerHTML = `
//             <div class="question-header">
//                 <span class="question-number">Q ${this.currentQuiz.currentIndex + 1}</span>
//                 <span class="question-timer" id="questionTimer">⏱️ 30s</span>
//             </div>
//             <div class="question-text">${question.question}</div>
//             <div class="question-options" id="questionOptions">
//                 ${optionsHtml}
//             </div>
//         `;

//         chatArea.appendChild(quizElement);
//         this.scrollToBottom();

//         quizElement.querySelectorAll('.option-btn').forEach(btn => {
//             btn.addEventListener('click', () => {
//                 this.selectQuizAnswer(btn.dataset.answer, btn);
//             });
//         });

//         this.startQuestionTimer();
//     }

//     selectQuizAnswer(answer, buttonElement) {
//         // Stop timer
//         clearInterval(this.questionTimerInterval);

//         const question = this.currentQuiz.questions[this.currentQuiz.currentIndex];
//         const isCorrect = (question.type === 'multiple') ?
//             (parseInt(answer) === question.correct) :
//             ((answer === 'true') === question.correct);

//         buttonElement.classList.add('selected');

//         setTimeout(() => {
//             // Show correct/incorrect styles
//             const options = document.getElementById('questionOptions');
//             if (options) {
//                 options.querySelectorAll('.option-btn').forEach(btn => {
//                     btn.disabled = true;
//                     if (question.type === 'multiple') {
//                         if (parseInt(btn.dataset.answer) === question.correct) btn.classList.add('correct');
//                         else if (btn.classList.contains('selected') && !isCorrect) btn.classList.add('incorrect');
//                     } else {
//                         const btnValue = (btn.dataset.answer === 'true');
//                         if (btnValue === question.correct) btn.classList.add('correct');
//                         else if (btn.classList.contains('selected') && !isCorrect) btn.classList.add('incorrect');
//                     }
//                 });
//             }

//             if (isCorrect) this.currentQuiz.score++;

//             const explanation = `${isCorrect ? '✅ Correct!' : '❌ Incorrect'}\n\n**Explanation:** ${question.explanation}`;
//             this.addMessage(explanation, 'bot');

//             setTimeout(() => {
//                 this.nextQuestion();
//             }, 2000);

//         }, 500);
//     }

//     handleQuizAnswer(message) {
//         // This is a placeholder for text-based answers if we weren't using buttons
//         // Currently handled by selectQuizAnswer
//     }

//     nextQuestion() {
//         this.currentQuiz.currentIndex++;
//         if (this.currentQuiz.currentIndex >= this.currentQuiz.questions.length) {
//             this.finishQuiz();
//         } else {
//             const response = this.showQuizQuestion();
//             this.addMessage(response, 'bot');
//         }
//     }

//     finishQuiz() {
//         const quiz = this.currentQuiz;
//         const percentage = Math.round((quiz.score / quiz.questions.length) * 100);
//         let msg = `🎉 **Quiz Complete!**\nScore: ${quiz.score}/${quiz.questions.length} (${percentage}%)`;
//         this.addMessage(msg, 'bot');
        
//         setTimeout(() => {
//             this.showQuizResults(quiz.score, quiz.questions.length, 0, percentage);
//         }, 1000);
//         this.currentQuiz = null;
//     }

//     showQuizResults(score, total, duration, percentage) {
//         const resultsPanel = document.getElementById('quizResults');
//         document.getElementById('finalScore').textContent = score;
//         document.getElementById('scorePercentage').textContent = percentage + '%';
//         document.getElementById('correctAnswers').textContent = score;
//         document.getElementById('totalQuestions').textContent = total;
//         resultsPanel.classList.remove('hidden');
//     }

//     closeQuizResults() {
//         document.getElementById('quizResults').classList.add('hidden');
//     }

//     reviewQuizAnswers() {
//         this.closeQuizResults();
//         this.addMessage("You can retake the quiz anytime!", 'bot');
//     }

//     startQuestionTimer() {
//         if(this.questionTimerInterval) clearInterval(this.questionTimerInterval);
        
//         let timeLeft = 30;
//         const timerElement = document.getElementById('questionTimer');

//         this.questionTimerInterval = setInterval(() => {
//             timeLeft--;
//             if (timerElement) {
//                 timerElement.textContent = `⏱️ ${timeLeft}s`;
//                 if (timeLeft <= 5) timerElement.style.color = 'var(--color-error)';
//             }
//             if (timeLeft <= 0) {
//                 clearInterval(this.questionTimerInterval);
//                 this.selectQuizAnswer(-1, document.createElement('button')); // Timeout
//             }
//         }, 1000);
//     }

//     // --- FILE HANDLING ---
//     handleFileUpload(files) {
//         Array.from(files).forEach(file => {
//             if (file.type === 'text/plain' || file.name.endsWith('.md')) {
//                 const reader = new FileReader();
//                 reader.onload = (e) => {
//                     this.studyMaterials.push({
//                         name: file.name,
//                         content: e.target.result,
//                         uploadDate: new Date()
//                     });
//                     this.addMessage(`📁 **File Uploaded:** ${file.name}\nI can now answer questions about it.`, 'bot');
//                 };
//                 reader.readAsText(file);
//             } else {
//                 this.addMessage(`❌ Unsupported file type. Please use .txt`, 'bot');
//             }
//         });
//     }

//     extractRelevantExcerpt(content, query) {
//         return content.substring(0, 300) + "..."; // Simplified for brevity
//     }

//     // --- UTILITIES ---
//     showTypingIndicator() {
//         document.getElementById('typingIndicator').classList.remove('hidden');
//         this.scrollToBottom();
//     }

//     hideTypingIndicator() {
//         document.getElementById('typingIndicator').classList.add('hidden');
//     }

//     updateCharCount(count) {
//         document.getElementById('charCount').textContent = `${count}/500`;
//     }

//     scrollToBottom() {
//         const chatArea = document.getElementById('chatArea');
//         chatArea.scrollTop = chatArea.scrollHeight;
//     }

//     toggleSettings() {
//         const panel = document.getElementById('settingsPanel');
//         panel.classList.toggle('hidden');
//     }

//     closeSettings() {
//         document.getElementById('settingsPanel').classList.add('hidden');
//     }

//     updateTheme(theme) {
//         this.settings.theme = theme;
//         if (theme === 'auto') document.documentElement.removeAttribute('data-color-scheme');
//         else document.documentElement.setAttribute('data-color-scheme', theme);
//         this.saveSettings();
//     }

//     updateNotificationBadge() {
//         const badge = document.getElementById('notificationBadge');
//         if (this.chatHistory.length === 0) badge.classList.remove('hidden');
//         else badge.classList.add('hidden');
//     }

//     hideNotificationBadge() {
//         document.getElementById('notificationBadge').classList.add('hidden');
//     }

//   playNotificationSound() {
//         if (this.settings.soundEnabled) {
//             try {
//                 // Create a simple notification beep
//                 const audioContext = new (window.AudioContext || window.webkitAudioContext)();
//                 const oscillator = audioContext.createOscillator();
//                 const gainNode = audioContext.createGain();
                
//                 oscillator.connect(gainNode);
//                 gainNode.connect(audioContext.destination);
                
//                 oscillator.frequency.value = 800;
//                 gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
//                 gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
                
//                 oscillator.start(audioContext.currentTime);
//                 oscillator.stop(audioContext.currentTime + 0.3);
//             } catch (e) {
//                 // Silently handle audio context errors
//                 console.log('Audio not available');
//             }
//         }
//     }

//     loadSettings() {
//         try {
//             const saved = JSON.parse(localStorage.getItem('chatbot-settings') || '{}');
//             this.settings = { ...this.settings, ...saved };
//         } catch (e) { console.log('Default settings'); }
//     }

//     saveSettings() {
//         localStorage.setItem('chatbot-settings', JSON.stringify(this.settings));
//     }
// }

// // Initialize
// document.addEventListener('DOMContentLoaded', () => {
//     window.portfolioChatbot = new PortfolioChatbot();
// });
// Portfolio Chatbot Application
class PortfolioChatbot {
    // Small DOM helpers keep the chatbot resilient if an optional
    // element is missing from the portfolio page.
    $(selector, root = document) {
        return root.querySelector(selector);
    }

    $$(selector, root = document) {
        return Array.from(root.querySelectorAll(selector));
    }

    escapeHTML(value) {
        return String(value ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    safeMarkdown(value) {
        const escaped = this.escapeHTML(value);
        return escaped
            .replace(/\\*\\*(.*?)\\*\\*/g, '<b>$1</b>')
            .replace(/`([^`]+)`/g, '<code>$1</code>')
            .replace(/\\n/g, '<br>');
    }

    bind(id, event, handler, options) {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener(event, handler, options);
        }
        return element;
    }

    constructor() {
        // --- 1. Portfolio Data ---
        this.portfolioData = {
            "name": "Mohd Saqib",

            "title": "M.Tech AI & ML Student | Generative AI & Agentic AI Developer | Data Science Practitioner",

            "email": "saqib29abubkar@gmail.com",
            "phone": "+91-9625035483",
            "location": "New Delhi, India",

            "linkedin": "https://linkedin.com/in/mohd-saqib-94b6042ba",
            "github": "https://github.com/MOHDSAQIB695786",

            "summary": "Computer Engineer and Data Science practitioner pursuing an M.Tech in Computer Engineering with a focus on Artificial Intelligence & Machine Learning at Jamia Millia Islamia, while completing a BS in Data Science & Applications from IIT Madras. Builds full-stack applications, machine learning systems, LLM-powered applications, AI agents, RAG systems, and automation tools. Also creates and teaches practical technology courses on Udemy.",

            "currentFocus": [
                "M.Tech in Computer Engineering (AI & ML) at Jamia Millia Islamia",
                "Generative AI and Large Language Models",
                "Agentic AI and AI Agents",
                "Retrieval-Augmented Generation (RAG)",
                "LLM-powered automation",
                "Machine Learning and Data Science",
                "Full-Stack Development"
            ],

            "skills": {
                "languages": [
                    "Python",
                    "C++",
                    "C",
                    "Java",
                    "JavaScript",
                    "R",
                    "SQL"
                ],

                "web": [
                    "HTML",
                    "CSS",
                    "Bootstrap",
                    "JavaScript",
                    "React.js",
                    "Node.js",
                    "Express.js",
                    "Flask",
                    "FastAPI",
                    "Tailwind CSS"
                ],

                "databases": [
                    "MySQL",
                    "MongoDB",
                    "SQLite",
                    "PostgreSQL",
                    "Redis"
                ],

                "dataScience": [
                    "NumPy",
                    "Pandas",
                    "Matplotlib",
                    "Scikit-Learn",
                    "TensorFlow",
                    "XGBoost",
                    "LightGBM",
                    "Jupyter Notebook"
                ],

                "aiAndGenAI": [
                    "Machine Learning",
                    "Deep Learning",
                    "Generative AI",
                    "Large Language Models (LLMs)",
                    "RAG",
                    "AI Agents",
                    "Prompt Engineering",
                    "LLM Integration",
                    "Tool Calling",
                    "Automation Workflows"
                ],

                "cloudDevOps": [
                    "AWS",
                    "Google Cloud Platform (GCP)",
                    "Docker",
                    "Kubernetes",
                    "Git",
                    "GitHub"
                ],

                "tools": [
                    "VS Code",
                    "Postman",
                    "Excel",
                    "PowerPoint",
                    "Redis",
                    "Celery",
                    "Chart.js",
                    "ReportLab"
                ],

                "softSkills": [
                    "Problem Solving",
                    "Critical Thinking",
                    "Team Collaboration",
                    "Time Management",
                    "Leadership"
                ],

                "specialInterests": [
                    "Artificial Intelligence",
                    "Generative AI",
                    "Agentic AI",
                    "RAG Systems",
                    "Quantum Computing",
                    "Automation Agents",
                    "LLM Applications"
                ]
            },

            "projects": [
                {
                    "name": "Visual Question Answering System",
                    "description": "Deep learning based Visual Question Answering system for image and video inputs using BLIP, with a Flask backend.",
                    "technologies": [
                        "Python",
                        "PyTorch",
                        "BLIP",
                        "Hugging Face Transformers",
                        "Flask"
                    ],
                    "status": "Completed"
                },

                {
                    "name": "EventOps – Sound & Light Rental Operations Platform",
                    "description": "Small-business operations platform designed to manage sound and light rental workflows, operations, and business processes.",
                    "technologies": [
                        "Full-Stack Development",
                        "Web Technologies",
                        "Database Systems"
                    ],
                    "status": "Completed"
                },

                {
                    "name": "Quiz Master V2 – Multi-User Exam Portal",
                    "description": "Full-stack quiz management system with admin and user roles, asynchronous jobs, caching, and responsive UI.",
                    "technologies": [
                        "Flask",
                        "Vue.js",
                        "SQLite",
                        "Redis",
                        "Celery",
                        "Bootstrap"
                    ],
                    "status": "Live"
                },

                {
                    "name": "LLM-based Automation Agent",
                    "description": "LLM-powered automation system designed for practical operations tasks including file processing, SQL queries, and workflow automation.",
                    "technologies": [
                        "Python",
                        "LLM APIs",
                        "Shell",
                        "Docker"
                    ],
                    "status": "Completed"
                },

                {
                    "name": "TDS Solver – LLM API",
                    "description": "REST API that uses Large Language Models to answer assignment questions and supports file uploads with structured JSON responses.",
                    "technologies": [
                        "Python",
                        "FastAPI",
                        "LLM APIs",
                        "Vercel"
                    ],
                    "status": "Completed"
                },

                {
                    "name": "ML Regression Project – Kaggle Competition",
                    "description": "Machine learning regression project involving model development, feature engineering, evaluation, and ensemble methods.",
                    "technologies": [
                        "Python",
                        "Scikit-Learn",
                        "XGBoost",
                        "Pandas",
                        "Matplotlib"
                    ],
                    "status": "Completed"
                },

                {
                    "name": "Smart Hospital Management System",
                    "description": "Hospital management application designed to manage users, hospital workflows, and healthcare-related operations.",
                    "technologies": [
                        "Python",
                        "Flask",
                        "Database Systems",
                        "Web Development"
                    ],
                    "status": "Completed"
                }
            ],

            "experience": [
                {
                    "company": "Udemy",
                    "position": "Instructor & Content Creator",
                    "duration": "December 2025 - Present",
                    "location": "Remote",
                    "responsibilities": [
                        "Designed and published practical technical courses covering Python, Data Science, Machine Learning, and Generative AI.",
                        "Created structured curricula, coding exercises, demonstrations, and practical learning materials.",
                        "Published the Complete Generative AI, Agentic AI & RAG Bootcamp."
                    ]
                },

                {
                    "company": "Agnirva Space Community",
                    "position": "Space Technology Intern",
                    "duration": "June 2024 - July 2024",
                    "location": "Remote",
                    "responsibilities": [
                        "Learned about satellite communication and spacecraft systems.",
                        "Explored applications of space technology and related engineering concepts."
                    ]
                }
            ],

            "education": [
                {
                    "degree": "M.Tech in Computer Engineering (AI & ML)",
                    "school": "Jamia Millia Islamia, New Delhi",
                    "year": "2026 - Present",
                    "status": "Currently pursuing",
                    "focus": [
                        "Artificial Intelligence",
                        "Machine Learning",
                        "Generative AI",
                        "Agentic AI"
                    ]
                },

                {
                    "degree": "B.Tech in Computer Engineering",
                    "school": "Jamia Millia Islamia, New Delhi",
                    "year": "2022 - 2026",
                    "status": "Completed",
                    "cpi": "8.39/10",
                    "division": "First Division",
                    "credits": "193"
                },

                {
                    "degree": "BS in Data Science & Applications",
                    "school": "Indian Institute of Technology Madras",
                    "year": "2024 - 2026",
                    "status": "In progress",
                    "cgpa": "7.08"
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

            "courses": [
                {
                    "title": "Complete Generative AI, Agentic AI & RAG Bootcamp",
                    "platform": "Udemy",
                    "status": "Published",
                    "lectures": "160+",
                    "duration": "30+ Hours",
                    "description": "Practical course covering Generative AI, LLMs, RAG, AI agents, prompt engineering, tool calling, workflows, and real-world AI applications."
                },
                {
                    "title": "Python for Absolute Beginners",
                    "platform": "Udemy",
                    "status": "Published",
                    "description": "Beginner-friendly Python programming course."
                }
            ],

            "achievements": [
                "B.Tech in Computer Engineering from Jamia Millia Islamia with CPI 8.39/10",
                "Pursuing M.Tech in Computer Engineering with focus on AI & ML at Jamia Millia Islamia",
                "Pursuing BS in Data Science & Applications from IIT Madras",
                "Qualified GATE CS&IT 2025",
                "Qualified JEE Advanced 2022",
                "Published technical courses on Udemy"
            ]
        };

        // --- 2. AI Configuration ---
        // ⚠️ API Key removed for security. Use backend proxy instead.
        // Set this.API_KEY from environment or leave null for proxy mode
        this.API_KEY = null;
        this.genAI = null;
        this.model = null;
        this.backendEndpoint = '/api/chat';

        // --- 3. Static Data (Quiz/Study) ---
        this.studyTopics = {
            "Computer Networks": {
                "keywords": [
                    "TCP",
                    "IP",
                    "HTTP",
                    "routing",
                    "protocol",
                    "OSI model",
                    "network layer",
                    "transport layer"
                ],
                "content": "Computer networks involve the study of communication protocols, network architecture, and data transmission methods."
            },

            "Compiler Design": {
                "keywords": [
                    "lexical analysis",
                    "parsing",
                    "syntax tree",
                    "code generation",
                    "optimization",
                    "grammar"
                ],
                "content": "Compiler design covers the translation of high-level programming languages to machine code through various phases."
            },

            "Data Structures": {
                "keywords": [
                    "array",
                    "linked list",
                    "stack",
                    "queue",
                    "tree",
                    "graph",
                    "hash table",
                    "algorithm"
                ],
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
                "options": [
                    "push()",
                    "pop()",
                    "shift()",
                    "unshift()"
                ],
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
                "options": [
                    "useEffect",
                    "useState",
                    "useContext",
                    "useReducer"
                ],
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
        this.initAI();
        this.init();
    }

    // --- AI SETUP ---
    initAI() {
        this.genAI = null;
        this.model = null;

        console.log(
            'Chatbot configured to use backend /api/chat'
        );

        // Check backend health and update status indicator
        this.checkBackendLive();
    }

    setBotStatus(text) {
        const el =
            document.getElementById('botStatus');

        if (el) {
            el.textContent = text;
        }
    }

    async checkBackendLive() {
        try {
            const res =
                await fetch('/api/health');

            if (res.ok) {
                this.setBotStatus(
                    'Live (backend)'
                );

                this.backendLive =
                    true;
            } else {
                this.setBotStatus(
                    'Demo'
                );

                this.backendLive =
                    false;
            }
        } catch (e) {
            this.setBotStatus(
                'Demo'
            );

            this.backendLive =
                false;
        }
    }

    async attemptLiveChat(
        prompt,
        maxRetries = 2
    ) {
        let attempt = 0;
        let lastErr = null;

        while (
            attempt <= maxRetries
        ) {
            try {
                const res =
                    await fetch(
                        this.backendEndpoint,
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type':
                                    'application/json'
                            },
                            body: JSON.stringify({
                                prompt
                            })
                        }
                    );

                const data =
                    await res.json();

                if (!res.ok) {
                    throw new Error(
                        data.error ||
                        'Backend error'
                    );
                }

                return data;
            } catch (err) {
                lastErr = err;
                attempt += 1;

                const waitMs =
                    Math.pow(
                        2,
                        attempt
                    ) * 400;

                await new Promise(
                    resolve =>
                        setTimeout(
                            resolve,
                            waitMs
                        )
                );
            }
        }

        throw lastErr;
    }

    getSystemPrompt() {
        const profileData =
            JSON.stringify(
                this.portfolioData
            );

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
        this.bind(
            'chatbotFloat',
            'click',
            () => {
                this.openChat();
            }
        );

        // Modal close
        this.bind(
            'closeModal',
            'click',
            () => {
                this.closeChat();
            }
        );

        const overlay =
            document.querySelector(
                '.modal-overlay'
            );

        if (overlay) {
            overlay.addEventListener(
                'click',
                event => {
                    if (
                        event.target ===
                        overlay
                    ) {
                        this.closeChat();
                    }
                }
            );
        }

        // Mode selector
        this.$$('.mode-btn')
            .forEach(btn => {
                btn.addEventListener(
                    'click',
                    () => {
                        this.switchMode(
                            btn.dataset.mode
                        );
                    }
                );
            });

        // Message input
        const messageInput =
            document.getElementById(
                'messageInput'
            );

        if (messageInput) {
            messageInput.addEventListener(
                'keydown',
                event => {
                    if (
                        event.key ===
                            'Enter' &&
                        !event.shiftKey
                    ) {
                        event.preventDefault();
                        this.sendMessage();
                    }
                }
            );

            messageInput.addEventListener(
                'input',
                event => {
                    this.updateCharCount(
                        event.target.value.length
                    );
                }
            );
        }

        // Send button
        this.bind(
            'sendBtn',
            'click',
            () => {
                this.sendMessage();
            }
        );

        // Quick questions
        document.addEventListener(
            'click',
            event => {
                const button =
                    event.target.closest(
                        '.quick-btn'
                    );

                if (!button) {
                    return;
                }

                const question =
                    button.dataset.question;

                if (question) {
                    this.sendMessage(
                        question
                    );
                }
            }
        );

        // File upload
        const fileInput =
            document.getElementById(
                'fileInput'
            );

        const uploadZone =
            document.getElementById(
                'uploadZone'
            );

        const attachBtn =
            document.getElementById(
                'attachBtn'
            );

        if (attachBtn) {
            attachBtn.addEventListener(
                'click',
                () => {
                    if (
                        this.currentMode ===
                            'study' &&
                        fileInput
                    ) {
                        fileInput.click();
                    }
                }
            );
        }

        if (uploadZone) {
            uploadZone.addEventListener(
                'click',
                () => {
                    if (fileInput) {
                        fileInput.click();
                    }
                }
            );

            uploadZone.addEventListener(
                'dragover',
                event => {
                    event.preventDefault();

                    uploadZone.classList.add(
                        'dragover'
                    );
                }
            );

            uploadZone.addEventListener(
                'dragleave',
                () => {
                    uploadZone.classList.remove(
                        'dragover'
                    );
                }
            );

            uploadZone.addEventListener(
                'drop',
                event => {
                    event.preventDefault();

                    uploadZone.classList.remove(
                        'dragover'
                    );

                    if (
                        event.dataTransfer
                            ?.files
                            ?.length
                    ) {
                        this.handleFileUpload(
                            event.dataTransfer.files
                        );
                    }
                }
            );
        }

        if (fileInput) {
            fileInput.addEventListener(
                'change',
                event => {
                    if (
                        event.target.files
                            ?.length
                    ) {
                        this.handleFileUpload(
                            event.target.files
                        );
                    }

                    event.target.value =
                        '';
                }
            );
        }

        // Settings
        this.bind(
            'settingsBtn',
            'click',
            event => {
                event.stopPropagation();
                this.toggleSettings();
            }
        );

        this.bind(
            'closeSettings',
            'click',
            () => {
                this.closeSettings();
            }
        );

        document.addEventListener(
            'click',
            event => {
                const panel =
                    document.getElementById(
                        'settingsPanel'
                    );

                const button =
                    document.getElementById(
                        'settingsBtn'
                    );

                if (
                    panel &&
                    !panel.contains(
                        event.target
                    ) &&
                    button &&
                    event.target !==
                        button &&
                    !button.contains(
                        event.target
                    )
                ) {
                    this.closeSettings();
                }
            }
        );

        this.bind(
            'exportBtn',
            'click',
            () => {
                this.exportChat();
            }
        );

        this.bind(
            'clearChatBtn',
            'click',
            () => {
                this.clearChat();
            }
        );

        // Settings controls
        this.bind(
            'chatTheme',
            'change',
            event => {
                this.updateTheme(
                    event.target.value
                );
            }
        );

        this.bind(
            'responseSpeed',
            'change',
            event => {
                this.settings.responseSpeed =
                    event.target.value;

                this.saveSettings();
            }
        );

        this.bind(
            'soundEnabled',
            'change',
            event => {
                this.settings.soundEnabled =
                    event.target.checked;

                this.saveSettings();
            }
        );

        // Quiz results
        this.bind(
            'closeResults',
            'click',
            () => {
                this.closeQuizResults();
            }
        );

        this.bind(
            'retakeQuizBtn',
            'click',
            () => {
                this.closeQuizResults();
                this.startQuiz();
            }
        );

        this.bind(
            'reviewAnswersBtn',
            'click',
            () => {
                this.reviewQuizAnswers();
            }
        );

        // Escape key
        document.addEventListener(
            'keydown',
            event => {
                if (
                    event.key !==
                    'Escape'
                ) {
                    return;
                }

                const chatModal =
                    document.getElementById(
                        'chatModal'
                    );

                const settingsPanel =
                    document.getElementById(
                        'settingsPanel'
                    );

                const quizResults =
                    document.getElementById(
                        'quizResults'
                    );

                if (
                    chatModal &&
                    !chatModal.classList.contains(
                        'hidden'
                    )
                ) {
                    this.closeChat();
                } else if (
                    settingsPanel &&
                    !settingsPanel.classList.contains(
                        'hidden'
                    )
                ) {
                    this.closeSettings();
                } else if (
                    quizResults &&
                    !quizResults.classList.contains(
                        'hidden'
                    )
                ) {
                    this.closeQuizResults();
                }
            }
        );
    }

    // --- UI CONTROLLERS ---
    openChat() {
        const modal =
            document.getElementById(
                'chatModal'
            );

        if (!modal) {
            return;
        }

        modal.classList.remove(
            'hidden'
        );

        document.body.style.overflow =
            'hidden';

        const input =
            document.getElementById(
                'messageInput'
            );

        if (input) {
            input.focus();
        }

        this.hideNotificationBadge();
    }

    closeChat() {
        const modal =
            document.getElementById(
                'chatModal'
            );

        if (modal) {
            modal.classList.add(
                'hidden'
            );
        }

        document.body.style.overflow =
            '';

        this.closeSettings();
        this.closeQuizResults();
    }

    switchMode(mode) {
        this.currentMode =
            mode;

        document
            .querySelectorAll(
                '.mode-btn'
            )
            .forEach(btn => {
                btn.classList.remove(
                    'active'
                );
            });

        const selectedButton =
            document.querySelector(
                `[data-mode="${CSS.escape(
                    mode
                )}"]`
            );

        if (selectedButton) {
            selectedButton.classList.add(
                'active'
            );
        }

        this.updateModeUI();
        this.showWelcomeMessage();

        const modeNames = {
            portfolio:
                'Portfolio Mode',
            study:
                'Study Mode',
            quiz:
                'Quiz Mode',
            assistant:
                'Assistant Mode'
        };

        const modeInfo =
            document.getElementById(
                'modeInfo'
            );

        if (modeInfo) {
            modeInfo.textContent =
                modeNames[mode] ||
                'Assistant Mode';
        }
    }

    updateModeUI() {
        const fileUploadArea =
            document.getElementById(
                'fileUploadArea'
            );

        const attachBtn =
            document.getElementById(
                'attachBtn'
            );

        if (
            this.currentMode ===
            'study'
        ) {
            fileUploadArea
                ?.classList.remove(
                    'hidden'
                );

            if (attachBtn) {
                attachBtn.style.display =
                    'block';
            }
        } else {
            fileUploadArea
                ?.classList.add(
                    'hidden'
                );

            if (attachBtn) {
                attachBtn.style.display =
                    'none';
            }
        }
    }

    showWelcomeMessage() {
        const welcomeMessage =
            document.getElementById(
                'welcomeMessage'
            );

        const chatArea =
            document.getElementById(
                'chatArea'
            );

        if (
            !welcomeMessage ||
            !chatArea
        ) {
            return;
        }

        chatArea
            .querySelectorAll(
                '.message'
            )
            .forEach(
                msg =>
                    msg.remove()
            );

        const welcomeData = {
            portfolio: {
                icon: '💼',
                title:
                    'Welcome to Portfolio Assistant!',
                description:
                    `I can help you learn about ${this.portfolioData.name}'s skills, projects, and experience. Ask me anything!`,
                questions: [
                    "Tell me about Mohd Saqib's skills",
                    "What projects has he worked on?",
                    "What is his experience?",
                    "How can I contact him?"
                ]
            },

            study: {
                icon: '📚',
                title:
                    'Welcome to Study Helper!',
                description:
                    'I can help you with your studies. Upload notes or ask questions about CS topics.',
                questions: [
                    "Explain TCP/IP protocol",
                    "What is lexical analysis?",
                    "How do binary trees work?",
                    "Upload study materials"
                ]
            },

            quiz: {
                icon: '❓',
                title:
                    'Welcome to Quiz Mode!',
                description:
                    'Test your knowledge with interactive quizzes on programming topics.',
                questions: [
                    "Start a JavaScript quiz",
                    "Take a random quiz",
                    "Quiz difficulty levels"
                ]
            },

            assistant: {
                icon: '🎯',
                title:
                    'Welcome to AI Assistant!',
                description:
                    'I can provide general assistance, answer tech questions, or just chat.',
                questions: [
                    "Tell me about the projects",
                    "What are the main skills?",
                    "How to contact Saqib?",
                    "Tell me interesting facts"
                ]
            }
        };

        const data =
            welcomeData[
                this.currentMode
            ];

        welcomeMessage
            .querySelector(
                '.welcome-avatar'
            )
            .textContent =
            data.icon;

        welcomeMessage
            .querySelector('h4')
            .textContent =
            data.title;

        welcomeMessage
            .querySelector('p')
            .textContent =
            data.description;

        const quickQuestions =
            welcomeMessage.querySelector(
                '.quick-questions'
            );
        if (quickQuestions) {
            quickQuestions.replaceChildren();

            data.questions.forEach(
                question => {
                    const button =
                        document.createElement(
                            'button'
                        );

                    button.type =
                        'button';

                    button.className =
                        'quick-btn';

                    button.dataset.question =
                        question;

                    button.textContent =
                        question;

                    quickQuestions.appendChild(
                        button
                    );
                }
            );
        }

        welcomeMessage.classList.remove(
            'hidden'
        );
    }

    // --- MESSAGING LOGIC ---
    sendMessage(text = null) {
        const messageInput =
            document.getElementById(
                'messageInput'
            );

        const message =
            text ||
            messageInput?.value.trim() ||
            '';

        if (!message) {
            return;
        }

        const normalizedMessage =
            String(message).slice(
                0,
                500
            );

        const welcome =
            document.getElementById(
                'welcomeMessage'
            );

        if (welcome) {
            welcome.classList.add(
                'hidden'
            );
        }

        this.addMessage(
            normalizedMessage,
            'user'
        );

        if (messageInput) {
            messageInput.value =
                '';
        }

        this.updateCharCount(0);

        this.processMessage(
            normalizedMessage
        );
    }

    addMessage(
        text,
        sender,
        timestamp = new Date()
    ) {
        const chatArea =
            document.getElementById(
                'chatArea'
            );

        if (!chatArea) {
            return;
        }

        const messageElement =
            document.createElement(
                'div'
            );

        messageElement.className =
            `message ${sender}`;

        const timeString =
            timestamp.toLocaleTimeString(
                [],
                {
                    hour: '2-digit',
                    minute: '2-digit'
                }
            );

        const bubble =
            document.createElement(
                'div'
            );

        bubble.className =
            'message-bubble';

        const content =
            sender === 'bot'
                ? this.safeMarkdown(
                    text
                )
                : this
                    .escapeHTML(text)
                    .replace(
                        /\n/g,
                        '<br>'
                    );

        bubble.innerHTML =
            content;

        const time =
            document.createElement(
                'div'
            );

        time.className =
            'message-time';

        time.textContent =
            timeString;

        bubble.appendChild(
            time
        );

        messageElement.appendChild(
            bubble
        );

        chatArea.appendChild(
            messageElement
        );

        this.scrollToBottom();

        this.chatHistory.push({
            text,
            sender,
            timestamp,
            mode:
                this.currentMode
        });

        if (
            this.settings
                .soundEnabled &&
            sender === 'bot'
        ) {
            this.playNotificationSound();
        }

        this.updateNotificationBadge();
    }

    // --- MAIN BRAIN ---
    async processMessage(
        message
    ) {
        const lowerMessage =
            message.toLowerCase();

        // 1. QUIZ MODE
        if (
            this.currentMode ===
            'quiz'
        ) {
            const response =
                this.processQuizMessage(
                    message
                );

            if (response) {
                this.addMessage(
                    response,
                    'bot'
                );
            }

            return;
        }

        // 2. STUDY MODE
        if (
            this.currentMode ===
                'study' &&
            (
                lowerMessage.includes(
                    'upload'
                ) ||
                this.studyMaterials
                    .length > 0
            )
        ) {
            const studyResponse =
                this.processStudyMessage(
                    message
                );

            if (
                studyResponse &&
                !studyResponse.includes(
                    'Study Helper Active'
                )
            ) {
                this.addMessage(
                    studyResponse,
                    'bot'
                );

                return;
            }
        }

        // 3. AI GENERATION
        this.showTypingIndicator();

        try {
            const systemInstruction =
                this.getSystemPrompt();

            let historyContext =
                '';

            const recentHistory =
                this.chatHistory.slice(
                    -5
                );

            recentHistory.forEach(
                msg => {
                    historyContext +=
                        `${msg.sender}: ${msg.text}\n`;
                }
            );

            let modeContext =
                '';

            if (
                this.currentMode ===
                'study'
            ) {
                modeContext =
                    'Mode: Study Helper. Focus on academic explanations.';
            }

            if (
                this.currentMode ===
                'assistant'
            ) {
                modeContext =
                    'Mode: General Assistant. Be helpful and fun.';
            }

            const prompt = `
            ${systemInstruction}
            ${modeContext}

            CURRENT CHAT HISTORY:
            ${historyContext}

            USER: ${message}
            AI RESPONSE:
            `;

            try {
                this.setBotStatus(
                    'Trying live...'
                );

                const data =
                    await this.attemptLiveChat(
                        prompt
                    );

                let text =
                    data.text ||
                    this.processRuleBasedFallback(
                        message
                    );

                this.hideTypingIndicator();

                if (
                    data.fallback
                ) {
                    this.setBotStatus(
                        'Demo (quota fallback)'
                    );

                    this.backendLive =
                        false;

                    text =
                        `Live AI is temporarily unavailable, so I switched to demo responses.\n\n${text}`;
                } else {
                    this.setBotStatus(
                        'Live (backend)'
                    );

                    this.backendLive =
                        true;
                }

                this.addMessage(
                    text,
                    'bot'
                );
            } catch (
                liveErr
            ) {
                console.warn(
                    'Live chat failed, falling back:',
                    liveErr
                );

                this.setBotStatus(
                    'Demo (backend fallback)'
                );

                this.backendLive =
                    false;

                this.hideTypingIndicator();

                const fallbackResponse =
                    this.processRuleBasedFallback(
                        message
                    );

                this.addMessage(
                    fallbackResponse,
                    'bot'
                );
            }
        } catch (
            error
        ) {
            console.error(
                'AI Error:',
                error
            );

            this.hideTypingIndicator();

            const fallbackResponse =
                this.processRuleBasedFallback(
                    message
                );

            this.addMessage(
                fallbackResponse,
                'bot'
            );
        }
    }

    // --- FALLBACK LOGIC ---
    processRuleBasedFallback(
        message
    ) {
        const lowerMessage =
            message.toLowerCase();

        const data =
            this.portfolioData;

        // Skills
        if (
            lowerMessage.includes(
                'skill'
            ) ||
            lowerMessage.includes(
                'expertise'
            )
        ) {
            const skills =
                Object.entries(
                    data.skills
                )
                    .map(
                        ([
                            cat,
                            list
                        ]) =>
                            `**${cat}:** ${
                                Array.isArray(
                                    list
                                )
                                    ? list.join(
                                        ', '
                                    )
                                    : list
                            }`
                    )
                    .join('\n');

            return `${data.name} specializes in:\n\n${skills}`;
        }

        // Projects
        if (
            lowerMessage.includes(
                'project'
            ) ||
            lowerMessage.includes(
                'work'
            )
        ) {
            const projects =
                data.projects
                    .slice(0, 3)
                    .map(
                        p =>
                            `• **${p.name}** - ${p.description}`
                    )
                    .join('\n');

            return `Here are ${data.name}'s top projects:\n\n${projects}\n\n👉 See the full portfolio section for more!`;
        }

        // Courses
        if (
            lowerMessage.includes(
                'course'
            ) ||
            lowerMessage.includes(
                'udemy'
            ) ||
            lowerMessage.includes(
                'bootcamp'
            ) ||
            lowerMessage.includes(
                'generative ai'
            )
        ) {
            const courses =
                data.courses
                    .map(
                        course =>
                            `• **${course.title}** — ${course.platform} | ${course.status}`
                    )
                    .join('\n');

            return `🎓 **Courses by ${data.name}**\n\n${courses}`;
        }

        // Experience
        if (
            lowerMessage.includes(
                'experience'
            ) ||
            lowerMessage.includes(
                'work history'
            )
        ) {
            return `${data.name} has interned at ${data.experience[0]?.company} as a ${data.experience[0]?.position} (${data.experience[0]?.duration}). Currently a ${data.title}.`;
        }

        // Education
        if (
            lowerMessage.includes(
                'education'
            ) ||
            lowerMessage.includes(
                'degree'
            ) ||
            lowerMessage.includes(
                'study'
            ) ||
            lowerMessage.includes(
                'm.tech'
            ) ||
            lowerMessage.includes(
                'b.tech'
            ) ||
            lowerMessage.includes(
                'iit madras'
            )
        ) {
            const education =
                data.education
                    .map(edu => {
                        const result = [
                            `**${edu.degree}**`,
                            `${edu.school}`,
                            `${edu.year}`
                        ];

                        if (edu.cpi) {
                            result.push(
                                `CPI: ${edu.cpi}`
                            );
                        }

                        if (edu.cgpa) {
                            result.push(
                                `CGPA: ${edu.cgpa}`
                            );
                        }

                        if (
                            edu.percentage
                        ) {
                            result.push(
                                `Percentage: ${edu.percentage}`
                            );
                        }

                        if (edu.status) {
                            result.push(
                                edu.status
                            );
                        }

                        return result.join(
                            ' | '
                        );
                    })
                    .join(
                        '\n\n'
                    );

            return `🎓 **Mohd Saqib's Education**\n\n${education}`;
        }

        // Contact
        if (
            lowerMessage.includes(
                'contact'
            ) ||
            lowerMessage.includes(
                'email'
            ) ||
            lowerMessage.includes(
                'phone'
            )
        ) {
            return `📧 Email: ${data.email}\n☎️ Phone: ${data.phone}\n💼 LinkedIn: ${data.linkedin}\n🐙 GitHub: ${data.github}`;
        }

        // Social media
        if (
            lowerMessage.includes(
                'twitter'
            ) ||
            lowerMessage.includes(
                'instagram'
            ) ||
            lowerMessage.includes(
                'facebook'
            )
        ) {
            return `Connect with ${data.name} on social media:\n\n📱 Instagram, Twitter, Facebook, LinkedIn available in the footer!`;
        }

        // About
        if (
            lowerMessage.includes(
                'about'
            ) ||
            lowerMessage.includes(
                'who'
            ) ||
            lowerMessage.includes(
                'tell me'
            )
        ) {
            return `👋 Hi! I'm ${data.name}, a ${data.title}.\n\n${data.summary}`;
        }

        // Default
        const defaultResponses = [
            `I'm here to help! Try asking about ${data.name}'s skills, projects, education, or contact info.`,
            `You can ask me about projects, experience, skills, or how to contact ${data.name}! 😊`,
            `Curious about something? Ask about projects, experience, or get contact details!`,
            `Tell me what you'd like to know - I have lots of info about ${data.name}'s experience and skills!`
        ];

        return defaultResponses[
            Math.floor(
                Math.random() *
                defaultResponses.length
            )
        ];
    }

    // --- STUDY LOGIC ---
    processStudyMessage(
        message
    ) {
        const lowerMessage =
            message.toLowerCase();

        if (
            lowerMessage.includes(
                'upload'
            ) ||
            lowerMessage.includes(
                'file'
            )
        ) {
            return `📁 **Upload Study Materials:**\n\nClick the 📎 button to upload .txt files. I can then read them to help you study!`;
        }

        if (
            this.studyMaterials.length >
            0
        ) {
            const relevantMaterial =
                this.studyMaterials.find(
                    material =>
                        material.content
                            .toLowerCase()
                            .includes(
                                lowerMessage
                            )
                );

            if (
                relevantMaterial
            ) {
                const excerpt =
                    this.extractRelevantExcerpt(
                        relevantMaterial.content,
                        message
                    );

                return `📖 **From "${relevantMaterial.name}":**\n\n${excerpt}`;
            }
        }

        return null;
    }

    // --- QUIZ LOGIC ---
    processQuizMessage(
        message
    ) {
        const lowerMessage =
            message.toLowerCase();

        if (
            lowerMessage.includes(
                'start'
            ) ||
            lowerMessage.includes(
                'quiz'
            )
        ) {
            return this.startQuiz();
        }

        if (
            this.currentQuiz
        ) {
            this.handleQuizAnswer(
                message
            );

            return null;
        }

        return `🎯 **Quiz Mode Active!**\n\nType "Start Quiz" to begin testing your knowledge!`;
    }

    startQuiz() {
        const selectedQuestions =
            this.getRandomQuestions(
                5
            );

        this.currentQuiz = {
            questions:
                selectedQuestions,
            currentIndex: 0,
            score: 0,
            answers: [],
            startTime:
                Date.now()
        };

        return this.showQuizQuestion();
    }

    getRandomQuestions(
        count
    ) {
        const shuffled =
            [
                ...this.quizQuestions
            ].sort(
                () =>
                    Math.random() -
                    0.5
            );

        return shuffled.slice(
            0,
            Math.min(
                count,
                shuffled.length
            )
        );
    }

    showQuizQuestion() {
        const quiz =
            this.currentQuiz;

        const question =
            quiz.questions[
                quiz.currentIndex
            ];

        const response =
            `❓ **Question ${
                quiz.currentIndex + 1
            }**\n\n${question.question}`;

        setTimeout(
            () => {
                this.renderQuizQuestion(
                    question
                );
            },
            100
        );

        return response;
    }

    renderQuizQuestion(
        question
    ) {
        const chatArea =
            document.getElementById(
                'chatArea'
            );

        if (
            !chatArea ||
            !this.currentQuiz
        ) {
            return;
        }

        const quizElement =
            document.createElement(
                'div'
            );

        quizElement.className =
            'quiz-question';

        const header =
            document.createElement(
                'div'
            );

        header.className =
            'question-header';

        const number =
            document.createElement(
                'span'
            );

        number.className =
            'question-number';

        number.textContent =
            `Q ${
                this.currentQuiz
                    .currentIndex + 1
            }`;

        const timer =
            document.createElement(
                'span'
            );

        timer.className =
            'question-timer';

        timer.id =
            'questionTimer';

        timer.textContent =
            '⏱️ 30s';

        header.append(
            number,
            timer
        );

        const questionText =
            document.createElement(
                'div'
            );

        questionText.className =
            'question-text';

        questionText.textContent =
            question.question;

        const options =
            document.createElement(
                'div'
            );

        options.className =
            'question-options';

        options.id =
            'questionOptions';

        if (
            question.type ===
            'multiple'
        ) {
            question.options.forEach(
                (
                    option,
                    index
                ) => {
                    const button =
                        document.createElement(
                            'button'
                        );

                    button.type =
                        'button';

                    button.className =
                        'option-btn';

                    button.dataset.answer =
                        String(index);

                    const letter =
                        String.fromCharCode(
                            65 + index
                        );

                    button.textContent =
                        `${letter}. ${option}`;

                    options.appendChild(
                        button
                    );
                }
            );
        } else {
            [
                [
                    'true',
                    'A. True'
                ],
                [
                    'false',
                    'B. False'
                ]
            ].forEach(
                ([
                    value,
                    label
                ]) => {
                    const button =
                        document.createElement(
                            'button'
                        );

                    button.type =
                        'button';

                    button.className =
                        'option-btn';

                    button.dataset.answer =
                        value;

                    button.textContent =
                        label;

                    options.appendChild(
                        button
                    );
                }
            );
        }

        quizElement.append(
            header,
            questionText,
            options
        );

        chatArea.appendChild(
            quizElement
        );

        this.scrollToBottom();

        options
            .querySelectorAll(
                '.option-btn'
            )
            .forEach(
                button => {
                    button.addEventListener(
                        'click',
                        () => {
                            this.selectQuizAnswer(
                                button.dataset
                                    .answer,
                                button
                            );
                        }
                    );
                }
            );

        this.startQuestionTimer();
    }
    selectQuizAnswer(
        answer,
        buttonElement
    ) {
        if (
            !this.currentQuiz ||
            !this.currentQuiz.questions
                ?.length
        ) {
            return;
        }

        // Prevent double submission.
        if (
            buttonElement?.dataset
                ?.answered === 'true'
        ) {
            return;
        }

        if (
            buttonElement?.dataset
        ) {
            buttonElement.dataset
                .answered = 'true';
        }

        clearInterval(
            this.questionTimerInterval
        );

        const question =
            this.currentQuiz.questions[
                this.currentQuiz
                    .currentIndex
            ];

        const isCorrect =
            answer !== '-1' &&
            (
                question.type ===
                'multiple'
                    ? Number.parseInt(
                        answer,
                        10
                    ) ===
                      question.correct
                    : (
                        answer ===
                        'true'
                    ) ===
                      question.correct
            );

        buttonElement.classList.add(
            'selected'
        );

        setTimeout(
            () => {
                const options =
                    document.getElementById(
                        'questionOptions'
                    );

                if (options) {
                    options
                        .querySelectorAll(
                            '.option-btn'
                        )
                        .forEach(
                            btn => {
                                btn.disabled =
                                    true;

                                if (
                                    question.type ===
                                    'multiple'
                                ) {
                                    if (
                                        parseInt(
                                            btn.dataset
                                                .answer
                                        ) ===
                                        question.correct
                                    ) {
                                        btn.classList.add(
                                            'correct'
                                        );
                                    } else if (
                                        btn.classList.contains(
                                            'selected'
                                        ) &&
                                        !isCorrect
                                    ) {
                                        btn.classList.add(
                                            'incorrect'
                                        );
                                    }
                                } else {
                                    const btnValue =
                                        btn.dataset
                                            .answer ===
                                        'true';

                                    if (
                                        btnValue ===
                                        question.correct
                                    ) {
                                        btn.classList.add(
                                            'correct'
                                        );
                                    } else if (
                                        btn.classList.contains(
                                            'selected'
                                        ) &&
                                        !isCorrect
                                    ) {
                                        btn.classList.add(
                                            'incorrect'
                                        );
                                    }
                                }
                            }
                        );
                }

                if (isCorrect) {
                    this.currentQuiz
                        .score++;
                }

                const explanation =
                    `${
                        isCorrect
                            ? '✅ Correct!'
                            : '❌ Incorrect'
                    }\n\n**Explanation:** ${
                        question.explanation
                    }`;

                this.addMessage(
                    explanation,
                    'bot'
                );

                setTimeout(
                    () => {
                        this.nextQuestion();
                    },
                    2000
                );
            },
            500
        );
    }

    handleQuizAnswer(
        message
    ) {
        // Text-based answers are intentionally
        // not processed because quiz answers
        // are selected using the buttons.
    }

    nextQuestion() {
        if (!this.currentQuiz) {
            return;
        }

        this.currentQuiz
            .currentIndex++;

        if (
            this.currentQuiz
                .currentIndex >=
            this.currentQuiz.questions
                .length
        ) {
            this.finishQuiz();
        } else {
            const response =
                this.showQuizQuestion();

            this.addMessage(
                response,
                'bot'
            );
        }
    }

    finishQuiz() {
        const quiz =
            this.currentQuiz;

        if (
            !quiz ||
            !quiz.questions?.length
        ) {
            return;
        }

        const percentage =
            Math.round(
                (
                    quiz.score /
                    quiz.questions.length
                ) * 100
            );

        const msg =
            `🎉 **Quiz Complete!**\nScore: ${quiz.score}/${quiz.questions.length} (${percentage}%)`;

        this.addMessage(
            msg,
            'bot'
        );

        setTimeout(
            () => {
                this.showQuizResults(
                    quiz.score,
                    quiz.questions.length,
                    0,
                    percentage
                );
            },
            1000
        );

        this.currentQuiz =
            null;
    }

    showQuizResults(
        score,
        total,
        duration,
        percentage
    ) {
        const resultsPanel =
            document.getElementById(
                'quizResults'
            );

        if (!resultsPanel) {
            return;
        }

        const finalScore =
            document.getElementById(
                'finalScore'
            );

        const scorePercentage =
            document.getElementById(
                'scorePercentage'
            );

        const correctAnswers =
            document.getElementById(
                'correctAnswers'
            );

        const totalQuestions =
            document.getElementById(
                'totalQuestions'
            );

        if (finalScore) {
            finalScore.textContent =
                score;
        }

        if (scorePercentage) {
            scorePercentage.textContent =
                `${percentage}%`;
        }

        if (correctAnswers) {
            correctAnswers.textContent =
                score;
        }

        if (totalQuestions) {
            totalQuestions.textContent =
                total;
        }

        resultsPanel.classList.remove(
            'hidden'
        );
    }

    closeQuizResults() {
        const resultsPanel =
            document.getElementById(
                'quizResults'
            );

        if (resultsPanel) {
            resultsPanel.classList.add(
                'hidden'
            );
        }
    }

    reviewQuizAnswers() {
        this.closeQuizResults();

        this.addMessage(
            'You can retake the quiz anytime!',
            'bot'
        );
    }

    startQuestionTimer() {
        if (
            this.questionTimerInterval
        ) {
            clearInterval(
                this.questionTimerInterval
            );
        }

        let timeLeft = 30;

        const timerElement =
            document.getElementById(
                'questionTimer'
            );

        this.questionTimerInterval =
            setInterval(
                () => {
                    timeLeft--;

                    if (timerElement) {
                        timerElement.textContent =
                            `⏱️ ${timeLeft}s`;

                        if (
                            timeLeft <=
                            5
                        ) {
                            timerElement.style.color =
                                'var(--color-error)';
                        }
                    }

                    if (
                        timeLeft <= 0
                    ) {
                        clearInterval(
                            this.questionTimerInterval
                        );

                        const timeoutButton =
                            document.createElement(
                                'button'
                            );

                        timeoutButton.dataset
                            .answer =
                            '-1';

                        this.selectQuizAnswer(
                            '-1',
                            timeoutButton
                        );
                    }
                },
                1000
            );
    }

    // --- FILE HANDLING ---
    handleFileUpload(
        files
    ) {
        Array.from(files).forEach(
            file => {
                if (
                    file.type ===
                        'text/plain' ||
                    file.name
                        .toLowerCase()
                        .endsWith(
                            '.md'
                        )
                ) {
                    const reader =
                        new FileReader();

                    reader.onload =
                        event => {
                            this.studyMaterials.push(
                                {
                                    name:
                                        file.name,
                                    content:
                                        event.target
                                            .result,
                                    uploadDate:
                                        new Date()
                                }
                            );

                            this.addMessage(
                                `📁 **File Uploaded:** ${file.name}\nI can now answer questions about it.`,
                                'bot'
                            );
                        };

                    reader.onerror =
                        () => {
                            this.addMessage(
                                `❌ Could not read "${file.name}".`,
                                'bot'
                            );
                        };

                    reader.readAsText(
                        file
                    );
                } else {
                    this.addMessage(
                        '❌ Unsupported file type. Please use .txt or .md files.',
                        'bot'
                    );
                }
            }
        );
    }

    extractRelevantExcerpt(
        content,
        query
    ) {
        if (!content) {
            return '';
        }

        const normalizedContent =
            String(content);

        const normalizedQuery =
            String(query || '')
                .trim()
                .toLowerCase();

        if (
            !normalizedQuery
        ) {
            return normalizedContent
                .substring(
                    0,
                    300
                ) + '...';
        }

        const index =
            normalizedContent
                .toLowerCase()
                .indexOf(
                    normalizedQuery
                );

        if (index === -1) {
            return normalizedContent
                .substring(
                    0,
                    300
                ) + '...';
        }

        const start =
            Math.max(
                0,
                index - 120
            );

        const end =
            Math.min(
                normalizedContent.length,
                index +
                    normalizedQuery.length +
                    180
            );

        const excerpt =
            normalizedContent.substring(
                start,
                end
            );

        return (
            (start > 0
                ? '...'
                : '') +
            excerpt +
            (end <
            normalizedContent.length
                ? '...'
                : '')
        );
    }

    // --- UTILITIES ---
    showTypingIndicator() {
        const indicator =
            document.getElementById(
                'typingIndicator'
            );

        if (indicator) {
            indicator.classList.remove(
                'hidden'
            );
        }

        this.scrollToBottom();
    }

    hideTypingIndicator() {
        const indicator =
            document.getElementById(
                'typingIndicator'
            );

        if (indicator) {
            indicator.classList.add(
                'hidden'
            );
        }
    }

    updateCharCount(
        count
    ) {
        const element =
            document.getElementById(
                'charCount'
            );

        if (element) {
            element.textContent =
                `${Math.min(
                    500,
                    count
                )}/500`;
        }
    }

    scrollToBottom() {
        const chatArea =
            document.getElementById(
                'chatArea'
            );

        if (chatArea) {
            chatArea.scrollTop =
                chatArea.scrollHeight;
        }
    }

    toggleSettings() {
        const panel =
            document.getElementById(
                'settingsPanel'
            );

        if (panel) {
            panel.classList.toggle(
                'hidden'
            );
        }
    }

    closeSettings() {
        const panel =
            document.getElementById(
                'settingsPanel'
            );

        if (panel) {
            panel.classList.add(
                'hidden'
            );
        }
    }

    updateTheme(
        theme
    ) {
        this.settings.theme =
            theme;

        if (
            theme === 'auto'
        ) {
            document.documentElement
                .removeAttribute(
                    'data-color-scheme'
                );
        } else {
            document.documentElement
                .setAttribute(
                    'data-color-scheme',
                    theme
                );
        }

        this.saveSettings();
    }

    updateNotificationBadge() {
        const badge =
            document.getElementById(
                'notificationBadge'
            );

        if (!badge) {
            return;
        }

        if (
            this.chatHistory.length ===
            0
        ) {
            badge.classList.remove(
                'hidden'
            );
        } else {
            badge.classList.add(
                'hidden'
            );
        }
    }

    hideNotificationBadge() {
        const badge =
            document.getElementById(
                'notificationBadge'
            );

        if (badge) {
            badge.classList.add(
                'hidden'
            );
        }
    }

    playNotificationSound() {
        if (
            !this.settings
                .soundEnabled
        ) {
            return;
        }

        try {
            const AudioContext =
                window.AudioContext ||
                window.webkitAudioContext;

            if (!AudioContext) {
                return;
            }

            const audioContext =
                new AudioContext();

            const oscillator =
                audioContext.createOscillator();

            const gainNode =
                audioContext.createGain();

            oscillator.connect(
                gainNode
            );

            gainNode.connect(
                audioContext.destination
            );

            oscillator.frequency.value =
                800;

            gainNode.gain.setValueAtTime(
                0.1,
                audioContext.currentTime
            );

            gainNode.gain.exponentialRampToValueAtTime(
                0.01,
                audioContext.currentTime +
                    0.3
            );

            oscillator.start(
                audioContext.currentTime
            );

            oscillator.stop(
                audioContext.currentTime +
                    0.3
            );

            oscillator.addEventListener(
                'ended',
                () => {
                    audioContext
                        .close()
                        .catch(
                            () => {}
                        );
                },
                {
                    once: true
                }
            );
        } catch (error) {
            console.log(
                'Audio not available'
            );
        }
    }

    loadSettings() {
        try {
            const saved =
                JSON.parse(
                    localStorage.getItem(
                        'chatbot-settings'
                    ) || '{}'
                );

            if (
                saved &&
                typeof saved ===
                    'object'
            ) {
                this.settings = {
                    ...this.settings,
                    ...saved
                };
            }
        } catch (
            error
        ) {
            console.warn(
                'Could not load chatbot settings; using defaults.',
                error
            );
        }
    }

    saveSettings() {
        try {
            localStorage.setItem(
                'chatbot-settings',
                JSON.stringify(
                    this.settings
                )
            );
        } catch (
            error
        ) {
            console.warn(
                'Could not save chatbot settings.',
                error
            );
        }
    }

    // --- EXPORT CHAT ---
    exportChat() {
        if (
            !this.chatHistory.length
        ) {
            this.addMessage(
                'There is no chat history to export yet.',
                'bot'
            );
            return;
        }

        const lines =
            this.chatHistory.map(
                item => {
                    const timestamp =
                        item.timestamp instanceof Date
                            ? item.timestamp
                            : new Date(
                                item.timestamp
                            );

                    return `[${timestamp.toLocaleString()}] ${item.sender.toUpperCase()}: ${item.text}`;
                }
            );

        const content =
            lines.join('\n\n');

        const blob =
            new Blob(
                [content],
                {
                    type:
                        'text/plain;charset=utf-8'
                }
            );

        const url =
            URL.createObjectURL(
                blob
            );

        const link =
            document.createElement(
                'a'
            );

        link.href =
            url;

        link.download =
            `portfolio-chat-${new Date()
                .toISOString()
                .slice(0, 10)}.txt`;

        document.body.appendChild(
            link
        );

        link.click();

        link.remove();

        URL.revokeObjectURL(
            url
        );
    }

    // --- CLEAR CHAT ---
    clearChat() {
        this.chatHistory = [];

        const chatArea =
            document.getElementById(
                'chatArea'
            );

        if (chatArea) {
            chatArea
                .querySelectorAll(
                    '.message, .quiz-question'
                )
                .forEach(
                    element =>
                        element.remove()
                );
        }

        this.currentQuiz =
            null;

        if (
            this.questionTimerInterval
        ) {
            clearInterval(
                this.questionTimerInterval
            );
        }

        this.showWelcomeMessage();
        this.updateNotificationBadge();
    }
}

// Initialize
document.addEventListener(
    'DOMContentLoaded',
    () => {
        try {
            window.portfolioChatbot =
                new PortfolioChatbot();
        } catch (
            error
        ) {
            console.error(
                'Portfolio chatbot failed to initialize:',
                error
            );

            const status =
                document.getElementById(
                    'botStatus'
                );

            if (status) {
                status.textContent =
                    'Chatbot unavailable';
            }
        }
    }
);