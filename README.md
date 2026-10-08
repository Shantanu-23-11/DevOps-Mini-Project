# Student Task Manager 🎓
> **College Mini Project:** *"CI/CD Pipeline for a Web Application using DevOps Tools"*  
> **Phase 1:** Web Application (HTML5, CSS3, JavaScript)  
> **Phase 2:** Git & GitHub Version Control  
> **Phase 3:** Continuous Integration (CI) using GitHub Actions  
> **Phase 4:** Continuous Deployment (CD) using GitHub Pages  

---

## 📌 Project Overview
**Student Task Manager** is a modern, responsive, client-side web application designed for students to organize academic tasks, deadlines, and study goals effectively.

This project implements a complete, end-to-end **DevOps CI/CD Pipeline** using **GitHub Actions** and **GitHub Pages**:
- **Continuous Integration (CI)**: Automatically checks project structure, validates HTML syntax, verifies CSS rules, and compiles JavaScript syntax on an Ubuntu runner on every commit.
- **Continuous Deployment (CD)**: Automatically packages the application and deploys it live to **GitHub Pages** immediately after CI validation succeeds.

---

## 🌐 Live Website (GitHub Pages)
The deployed Student Task Manager is accessible at:  
👉 **[https://shantanu-23-11.github.io/DevOps-Mini-Project/](https://shantanu-23-11.github.io/DevOps-Mini-Project/)**

---

## 🛠️ Technology Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Storage**: Browser LocalStorage API (zero backend / zero database)
- **Version Control**: Git & GitHub
- **DevOps CI Tool**: GitHub Actions (`ubuntu-latest` runner)
- **DevOps CD Tool**: GitHub Pages (`actions/deploy-pages@v4`)
- **Code Validation**: Python3 HTML/CSS parsers, Node.js syntax compiler (`node --check`)

---

## 📂 Project Structure
```text
DevOps-Mini-Project/
│
├── .github/
│   └── workflows/
│       └── ci.yml             # Complete CI/CD Pipeline Workflow
│
├── Student-Task-Manager/
│   ├── .github/
│   │   └── workflows/
│   │       └── ci.yml         # Subfolder workflow copy
│   ├── index.html             # Semantic HTML5 markup & dashboard
│   ├── style.css              # Responsive styling & CSS variables
│   ├── script.js              # Vanilla JS logic & state management
│   ├── README.md              # Project documentation & viva guide
│   └── .gitignore             # Git ignore configuration
│
├── .gitignore                 # Root Git ignore configuration
└── README.md                  # Root repository documentation
```

---

## 🔄 End-to-End DevOps CI/CD Pipeline Flow

```text
 Developer
    ↓
 Modify Code
    ↓
 git add / commit / push
    ↓
 GitHub Repository (main branch)
    ↓
 ┌─────────────────────────────────────────────────────────────────┐
 │ JOB 1: CONTINUOUS INTEGRATION (CI)                              │
 │                                                                 │
 │ 1. Checkout Code (actions/checkout@v4)                          │
 │ 2. Validate Project Structure (index.html, style.css, script.js)│
 │ 3. Validate HTML (DOCTYPE & tag balance verification)           │
 │ 4. Validate CSS (Brace, parenthesis & comment syntax)           │
 │ 5. Validate JavaScript (node --check script.js AST parsing)     │
 └─────────────────────────────────────────────────────────────────┘
    ↓
    ├── [CI FAILS] ──→ ❌ Pipeline Stops (Deployment is BLOCKED)
    ↓
 [CI SUCCEEDS]
    ↓
 ┌─────────────────────────────────────────────────────────────────┐
 │ JOB 2: CONTINUOUS DEPLOYMENT (CD)                               │
 │ (Depends on CI via: needs: continuous-integration)              │
 │                                                                 │
 │ 1. Checkout Code                                                │
 │ 2. Package Static Website (copy assets to _site/)               │
 │ 3. Setup GitHub Pages (actions/configure-pages@v5)              │
 │ 4. Upload Pages Artifact (actions/upload-pages-artifact@v3)     │
 │ 5. Deploy to GitHub Pages (actions/deploy-pages@v4)             │
 └─────────────────────────────────────────────────────────────────┘
    ↓
 CI/CD Pipeline Successful ✅
    ↓
 Live Website Updated on GitHub Pages 🚀
```

---

## 🤖 GitHub Actions Workflow Jobs (`ci.yml`)

### Job 1: `continuous-integration`
Runs on `ubuntu-latest`.
1. **Checkout Code**: Downloads repository files into the GitHub runner workspace.
2. **Validate Project Structure**: Ensures required files (`index.html`, `style.css`, `script.js`) exist.
3. **Validate HTML**: Uses Python's built-in `html.parser` to ensure `<DOCTYPE>` is defined, tags are balanced, and void elements are correctly formatted.
4. **Validate CSS**: Checks that all CSS curly braces `{}` and parentheses `()` are balanced, and that all `/* */` comments are closed.
5. **Validate JavaScript**: Uses `node --check script.js` to compile the AST and verify syntax without executing client code.

### Job 2: `continuous-deployment`
Runs on `ubuntu-latest` **only after `continuous-integration` passes**.
- Enforces strict dependency: `needs: continuous-integration`.
- Guard condition: `if: github.ref == 'refs/heads/main' && (github.event_name == 'push' || github.event_name == 'workflow_dispatch')`.
- Actions performed:
  1. Clones repository code.
  2. Packages `index.html`, `style.css`, and `script.js` into `_site/`.
  3. Configures GitHub Pages metadata with `actions/configure-pages@v5`.
  4. Bundles `_site/` into an artifact using `actions/upload-pages-artifact@v3`.
  5. Deploys live to GitHub Pages with `actions/deploy-pages@v4`.

---

## 🎓 Viva Questions & Answers (DevOps CI/CD Focus)

### 1. What is Continuous Deployment (CD)?
**Answer:** Continuous Deployment is a DevOps practice where every code change that passes all stages of the Continuous Integration pipeline is automatically released to the production environment without manual human intervention.

### 2. How are CI and CD connected in your workflow?
**Answer:** In `.github/workflows/ci.yml`, the deployment job defines `needs: continuous-integration`. This creates an explicit execution dependency in the directed acyclic graph (DAG) of GitHub Actions. The deployment job will not start unless the CI job completes with a `success` status code.

### 3. What happens if a developer pushes code with a syntax error?
**Answer:** The CI job will detect the error (e.g., mismatched HTML tag, unclosed CSS brace, or JS syntax defect) and exit with code 1, marking CI as failed. Because deployment depends on CI, the deployment job is automatically skipped. The live production website remains safe and unaffected.

### 4. What does GitHub Pages do?
**Answer:** GitHub Pages is a static site hosting service that serves HTML, CSS, and JavaScript files directly from a GitHub repository or through artifacts generated by GitHub Actions.

### 5. Why do we package the files into `_site` before deploying?
**Answer:** Packaging creates a clean distribution artifact containing only production assets (`index.html`, `style.css`, `script.js`), excluding internal repository metadata such as `.github/`, `README.md`, and `.gitignore`.

### 6. What permissions are required for GitHub Pages deployment?
**Answer:** 
- `contents: read`: to checkout repository source code.
- `pages: write`: to upload and deploy to GitHub Pages.
- `id-token: write`: for OpenID Connect (OIDC) authentication token exchange between GitHub Actions and GitHub Pages.
