# Student Task Manager 🎓
> **Phase 1: Web Application Frontend**  
> Part of the College Mini Project: *"CI/CD Pipeline for a Web Application using DevOps Tools"*

---

## 📌 Project Overview
**Student Task Manager** is a modern, lightweight, responsive web application designed for students to organize academic tasks, deadlines, and study goals effectively. 

This phase represents **Phase 1** of the DevOps mini project. It focuses strictly on building a clean, robust, and dependency-free frontend using vanilla web standards.

---

## 🛠️ Technology Stack
- **HTML5**: Semantic tags (`<header>`, `<main>`, `<section>`, `<ul>`, `<form>`, `<footer>`) for structure and accessibility.
- **CSS3**: Modern styling utilizing CSS Custom Properties (variables), Flexbox, CSS Grid, and responsive media queries.
- **Vanilla JavaScript (ES6+)**: Pure client-side logic for DOM manipulation, event delegation, filtering, and data persistence without any external libraries or frameworks.
- **Web Storage API (`localStorage`)**: Persists task data across browser reloads.

---

## 📂 Project Structure
```text
DevOps mini project/
└── Student-Task-Manager/
    ├── index.html     # Semantic structure and markup
    ├── style.css      # Responsive styles and dashboard theme
    ├── script.js      # Application logic, state management & storage
    └── README.md      # Project documentation and viva guide
```

---

## 🚀 Key Features

1. **Dashboard & Summary Cards**:
   - Real-time counters for **Total Tasks**, **Pending Tasks**, and **Completed Tasks**.
   - Distinct color-coded icons (Blue for Total, Amber for Pending, Emerald for Completed).

2. **Add Task & Input Validation**:
   - Single-click or `Enter`-key task submission.
   - Prevents empty or whitespace-only tasks with visual feedback and inline validation messages.
   - Automatically dismisses error messages as soon as the user starts typing.

3. **Task List & Completion**:
   - Checkbox to toggle task completion.
   - Instant strikethrough effect and muted appearance for completed tasks.
   - Synchronous statistics updates.

4. **Task Filters**:
   - **All**: Displays all created tasks.
   - **Pending**: Shows only active/uncompleted tasks.
   - **Completed**: Shows only finished tasks.
   - Dynamic badge counters on each filter button.

5. **Delete Task**:
   - Instant deletion with immediate recalculation of all statistics.
   - Clean, user-friendly empty state when all tasks are deleted.

6. **Responsive Design**:
   - **Desktop / Laptop**: 3-column dashboard statistics grid with side-by-side controls.
   - **Tablet / Mobile**: Graceful adaptation down to single-column layout with touch-friendly button sizes and zero horizontal scroll.

---

## 🖥️ How to Run the Project

1. Simply navigate to the `Student-Task-Manager/` folder.
2. Double-click [index.html](file:///c:/Users/Shantanu/OneDrive/Desktop/DevOps%20mini%20project/Student-Task-Manager/index.html) to open it directly in any web browser (Google Chrome, Microsoft Edge, Firefox, Brave, Safari).
3. No build tools, node servers, or backend dependencies are required.

---

## 🎓 Viva Preparation & Code Explanation

### 1. How does the application store and manage data?
- State is maintained in a JavaScript array of objects named `tasks`:
  ```javascript
  {
    id: Date.now(),       // Unique timestamp ID
    text: "Task description",
    completed: false
  }
  ```
- Any state alteration (adding, toggling, deleting) calls `saveTasksToStorage()` to sync with `localStorage.setItem()`, ensuring data survives browser refreshes.

### 2. How are click events handled efficiently?
- The application uses **Event Delegation**: instead of attaching individual listeners to every checkbox and delete button, a single listener is placed on `<ul id="taskList">`.
- It uses `event.target.closest()` to identify whether a checkbox or delete button was clicked.

### 3. How does the app prevent Cross-Site Scripting (XSS)?
- Task descriptions are inserted into the DOM using `textContent` and `document.createElement()`, never through unescaped `innerHTML`.

### 4. How does the filtering logic work?
- The `renderTasks()` function filters the array using:
  ```javascript
  tasks.filter(task => {
    if (currentFilter === 'pending') return !task.completed;
    if (currentFilter === 'completed') return task.completed;
    return true; // 'all'
  });
  ```

