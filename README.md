# Mohd Saqib — AI & ML Portfolio

<div align="center">

### M.Tech AI & ML • Generative AI • AI Agents • Data Science • Full-Stack Development

A modern, responsive personal portfolio showcasing my academic journey, technical skills, projects, AI work, teaching, achievements, and professional experience.

</div>

---

## Run locally and deploy

Requirements: Node.js 20 or newer.

```bash
npm install
npm start
```

The site is available at `http://localhost:3000`. The `/api/health` endpoint reports which optional integrations are configured without exposing credentials.

The public resume is served from `mohd saqib resume.pdf`; the page's download control uses the filename `Mohd-Saqib-Resume.pdf` for downloaded copies.

Configure the values in [.env.example](./.env.example) locally or in your deployment provider:

- `MONGODB_URI` and `MONGODB_DB_NAME` enable contact-message persistence.
- `YOUTUBE_API_KEY` enables live channel statistics and latest videos.
- `GEMINI_API_KEY` and `GEMINI_MODEL` enable the portfolio chatbot.
- `GOOGLE_DRIVE_API_KEY` enables the Drive resources proxy.
- `ALLOWED_ORIGIN` restricts API CORS in production.

### Vercel

1. Import this repository into Vercel.
2. Add the production environment variables in **Project Settings → Environment Variables**.
3. Deploy with the default Node.js settings.
4. Verify `/api/health`, the contact form, and the dynamic YouTube section after deployment.

The project includes [vercel.json](./vercel.json), bounded upstream requests, server-side caching for YouTube data, and explicit unavailable states when optional credentials are not configured.

---

## 👨‍💻 About Me

I'm **Mohd Saqib**, a Computer Engineer and Data Science practitioner currently pursuing an **M.Tech in Computer Engineering with a focus on Artificial Intelligence & Machine Learning at Jamia Millia Islamia**.

Alongside my M.Tech, I am completing a **BS in Data Science & Applications from IIT Madras**.

My technical interests include:

- Artificial Intelligence & Machine Learning
- Generative AI
- Large Language Models (LLMs)
- AI Agents & Agentic AI
- Retrieval-Augmented Generation (RAG)
- LLM-powered automation
- Data Science
- Full-Stack Development
- Cloud & DevOps
- Quantum Computing

I also create and teach practical technical courses on **Udemy**.

---

## 🎓 Education

### M.Tech in Computer Engineering (AI & ML)
**Jamia Millia Islamia, New Delhi**  
2026 – Present

Focus areas include Artificial Intelligence, Machine Learning, Generative AI and Agentic AI.

### B.Tech in Computer Engineering
**Jamia Millia Islamia, New Delhi**  
2022 – 2026

- CPI: **8.39/10**
- First Division
- 193 Credits

### BS in Data Science & Applications
**Indian Institute of Technology Madras**  
2024 – 2026

- Data Science & Artificial Intelligence
- Currently completing the program

---

## 🚀 Featured Projects

### Visual Question Answering System

A deep-learning based Visual Question Answering system for image and video inputs.

**Technologies:**

- Python
- PyTorch
- BLIP
- Hugging Face Transformers
- Flask

---

### EventOps — Sound & Light Rental Operations Platform

A small-business operations platform designed around sound and light rental workflows and operational management.

**Focus:**

- Full-Stack Development
- Database Systems
- Business Operations
- Web Application Development

---

### Quiz Master V2

A full-stack quiz and examination platform supporting multiple user roles and asynchronous application workflows.

**Technologies:**

- Flask
- Vue.js
- SQLite
- Redis
- Celery
- Bootstrap

---

### LLM-based Automation Agent

An LLM-powered automation system designed for practical workflow automation, file processing, SQL-related tasks and other operations.

**Technologies:**

- Python
- LLM APIs
- Shell
- Docker

---

### TDS Solver — LLM API

A REST API that uses Large Language Models to answer assignment questions and supports file uploads with structured responses.

**Technologies:**

- Python
- FastAPI
- LLM APIs
- Vercel

---

### Machine Learning Regression Project

A machine-learning regression project involving feature engineering, model development, evaluation and ensemble methods.

**Technologies:**

- Python
- Pandas
- Scikit-Learn
- XGBoost
- Matplotlib

---

### Smart Hospital Management System

A web-based hospital management application designed to manage users, workflows and healthcare-related operations.

**Technologies:**

- Python
- Flask
- Database Systems
- Web Development

---

## 🎥 Teaching & Udemy

I create practical technology courses focused on programming, data science, machine learning and Generative AI.

### Complete Generative AI, Agentic AI & RAG Bootcamp

A comprehensive practical course covering:

- Generative AI
- Large Language Models
- Prompt Engineering
- Retrieval-Augmented Generation
- AI Agents
- Agentic AI workflows
- Tool Calling
- LLM Applications
- Automation
- Practical AI development

**Platform:** Udemy

---

## 🛠️ Technical Skills

### Programming

- Python
- C++
- C
- Java
- JavaScript
- R
- SQL

### Web Development

- HTML
- CSS
- Bootstrap
- JavaScript
- React.js
- Node.js
- Express.js
- Flask
- FastAPI
- Tailwind CSS

### Data Science & Machine Learning

- NumPy
- Pandas
- Matplotlib
- Scikit-Learn
- TensorFlow
- XGBoost
- LightGBM
- Jupyter Notebook

### Generative AI & AI

- Generative AI
- Large Language Models
- RAG
- AI Agents
- Agentic AI
- Prompt Engineering
- LLM Integration
- Tool Calling
- AI Automation

### Databases

- MySQL
- MongoDB
- SQLite
- PostgreSQL
- Redis

### Cloud & DevOps

- AWS
- Google Cloud Platform
- Docker
- Kubernetes
- Git
- GitHub

### Tools

- VS Code
- Postman
- Excel
- PowerPoint
- Celery
- ReportLab

---

## ✨ Portfolio Features

The portfolio includes:

- Modern responsive UI
- Dark / Light theme
- Responsive navigation
- Education timeline
- Skills showcase
- Project portfolio
- Course showcase
- Achievements
- Certifications
- Experience & journey timeline
- AI-powered portfolio chatbot
- Contact form
- YouTube integration
- Google Drive integration
- Online code execution integration
- PWA support
- Service worker and caching
- SEO and social sharing metadata
- Smooth animations and interactive elements

---

## 📂 Project Structure

```text
mohd-saqib-portfolio/
│
├── api/
│   ├── chat/
│   ├── contact/
│   ├── judge0/
│   └── youtube/
│
├── game/
│
├── images/
│
├── index.html
├── style.css
├── app.js
├── chatbot.js
│
├── courses.json
├── saqib_certifications.json
│
├── server.js
├── appdrive.js
├── drive.html
├── drive-styles.css
├── editor.html
│
├── effects.css
├── effects.js
│
├── typing.html
├── typing.css
├── typing.js
│
├── manifest.json
├── service-worker.js
├── 404.html
│
├── package.json
├── package-lock.json
├── .gitignore
├── .env.example
└── README.md