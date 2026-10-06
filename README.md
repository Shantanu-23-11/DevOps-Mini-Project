# Student Task Manager 🎓
> **College Mini Project:** *"CI/CD Pipeline for a Web Application using DevOps Tools"*  
> **Phase 1:** Web Application (HTML5, CSS3, JavaScript)  
> **Phase 2:** Git & GitHub Version Control  
> **Phase 3:** Continuous Integration (CI) using GitHub Actions  

---

## 📌 Project Overview
**Student Task Manager** is a modern, lightweight, responsive web application designed for students to organize academic tasks, deadlines, and study goals effectively.

This project implements an automated **DevOps Continuous Integration (CI) Pipeline** using **GitHub Actions** that automatically checks, lints, and validates all application source code upon every push or pull request to the `main` branch.

---

## 🛠️ Technology Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Storage**: Browser LocalStorage API (zero backend / zero database)
- **Version Control**: Git & GitHub
- **DevOps CI Tool**: GitHub Actions (`ubuntu-latest` runner)
- **Validation**: Python3 HTML/CSS parsers, Node.js syntax compiler (`node --check`)

---

## 📂 Project Structure
```text
DevOps-Mini-Project/
│
├── .github/
│   └── workflows/
│       └── ci.yml             # GitHub Actions CI Workflow configuration
│
├── Student-Task-Manager/
│   ├── .github/
│   │   └── workflows/
│   │       └── ci.yml         # Workflow copy
│   ├── index.html             # Semantic HTML5 markup & dashboard
│   ├── style.css              # Responsive styling & CSS variables
│   ├── script.js              # Vanilla JS logic & state management
│   ├── README.md              # Project documentation & viva guide
│   └── .gitignore             # Git ignore configuration
│
├── .gitignore                 # Root Git ignore configuration
└── README.md                  # Root documentation
```

---

## 🔄 CI/CD Pipeline Architecture (Phase 3: CI)

```text
 Developer
    ↓
 Modify Code
    ↓
 git add / commit / push
    ↓
 GitHub Repository (main branch)
    ↓
 GitHub Actions Runner (ubuntu-latest)
    ↓
 ┌──────────────────────────────────────────────┐
 │ 1. Checkout Code (actions/checkout@v4)       │
 ├──────────────────────────────────────────────┤
 │ 2. Validate Project Structure                │
 │    - Verifies index.html, style.css, script  │
 ├──────────────────────────────────────────────┤
 │ 3. Validate HTML                             │
 │    - DOCTYPE check, tag balance, no unclosed │
 ├──────────────────────────────────────────────┤
 │ 4. Validate CSS                              │
 │    - Balanced braces, parentheses, comments  │
 ├──────────────────────────────────────────────┤
 │ 5. Validate JavaScript                       │
 │    - node --check script.js (syntax parsing) │
 └──────────────────────────────────────────────┘
    ↓
 CI Pipeline Successful ✅
```

---

## 🚀 How to Run the Web Application Locally
1. Navigate to the `Student-Task-Manager/` folder.
2. Double-click `index.html` to open it in any web browser (Edge, Chrome, Firefox).
3. No build tools, package managers, or server installations are needed.

---

## 🤖 GitHub Actions Workflow Summary (`ci.yml`)

The workflow triggers on:
- **`push`** to `main`
- **`pull_request`** targeting `main`

### Pipeline Steps:
1. **Checkout Code**: Downloads repository files into the GitHub runner workspace.
2. **Validate Project Structure**: Ensures required files (`index.html`, `style.css`, `script.js`) exist. Fails the build if any required file is missing.
3. **Validate HTML**: Uses Python's built-in `html.parser` to ensure `<DOCTYPE>` is defined, tags are balanced, and void elements are correctly formatted.
4. **Validate CSS**: Checks that all CSS curly braces `{}` and parentheses `()` are balanced, and that all `/* */` comments are closed.
5. **Validate JavaScript**: Uses `node --check script.js` to compile the AST and verify syntax without executing the script.

---

## 🎓 Viva Questions & Answers (DevOps CI Focus)

### 1. What is Continuous Integration (CI)?
**Answer:** Continuous Integration is a DevOps software development practice where developers merge their code changes frequently into a central repository. Automated builds and tests run on every commit to detect and fix defects early in the development lifecycle.

### 2. What triggers the CI pipeline in your project?
**Answer:** The workflow triggers automatically whenever new commits are pushed to the `main` branch, or when a pull request targeting `main` is created or updated.

### 3. What environment does the CI workflow run on?
**Answer:** It runs on a hosted GitHub Actions runner running `ubuntu-latest`, providing an isolated, clean virtual Linux environment for every build.

### 4. How does the pipeline validate JavaScript without running it?
**Answer:** It uses Node.js's built-in `node --check script.js` command. The `--check` flag parses the source code into an Abstract Syntax Tree (AST) to verify syntax without executing client-side browser DOM code.

### 5. Why is this lightweight validation ideal for a static web application?
**Answer:** It has zero external dependencies, requires no heavy `node_modules` or `package.json`, executes in under 10 seconds on GitHub Actions, and prevents corrupt or broken code from entering the production branch.

