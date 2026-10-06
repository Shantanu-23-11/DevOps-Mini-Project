/**
 * ==============================================================================
 * Student Task Manager - JavaScript Logic (script.js)
 * Phase 1: Core functionality, DOM manipulation, state management & localStorage
 * 
 * College Mini Project: "CI/CD Pipeline for a Web Application using DevOps Tools"
 * ==============================================================================
 */

// Run script once DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------------------------------------------
     1. DOM Element References
     ---------------------------------------------------------------------------- */
  const taskForm = document.getElementById('taskForm');
  const taskInput = document.getElementById('taskInput');
  const validationMessage = document.getElementById('validationMessage');
  const taskList = document.getElementById('taskList');
  const emptyState = document.getElementById('emptyState');
  const emptyTitle = document.getElementById('emptyTitle');
  const emptyDesc = document.getElementById('emptyDesc');

  // Dashboard Statistics Elements
  const totalTasksCount = document.getElementById('totalTasksCount');
  const pendingTasksCount = document.getElementById('pendingTasksCount');
  const completedTasksCount = document.getElementById('completedTasksCount');

  // Filter Elements
  const filterButtons = document.querySelectorAll('.filter-btn');
  const badgeAll = document.getElementById('badgeAll');
  const badgePending = document.getElementById('badgePending');
  const badgeCompleted = document.getElementById('badgeCompleted');

  /* ----------------------------------------------------------------------------
     2. Application State
     ---------------------------------------------------------------------------- */
  // Key for browser localStorage persistence
  const STORAGE_KEY = 'student_task_manager_tasks';

  // Current active filter: 'all' | 'pending' | 'completed'
  let currentFilter = 'all';

  // Task list array (loaded from localStorage or initialized as empty array)
  let tasks = loadTasksFromStorage();

  /* ----------------------------------------------------------------------------
     3. LocalStorage Functions (Optional persistence for browser reloads)
     ---------------------------------------------------------------------------- */
  /**
   * Loads saved tasks from the browser's localStorage.
   * Returns an array of tasks or an empty array if none exists.
   */
  function loadTasksFromStorage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.warn('LocalStorage is unavailable or disabled:', error);
      return [];
    }
  }

  /**
   * Saves the current tasks array into the browser's localStorage.
   */
  function saveTasksToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.warn('Unable to save tasks to LocalStorage:', error);
    }
  }

  /* ----------------------------------------------------------------------------
     4. Statistics & Counters Update
     ---------------------------------------------------------------------------- */
  /**
   * Calculates Total, Pending, and Completed tasks and updates the UI cards & badges.
   */
  function updateStatistics() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = total - completed;

    // Update Summary Cards
    totalTasksCount.textContent = total;
    pendingTasksCount.textContent = pending;
    completedTasksCount.textContent = completed;

    // Update Filter Tab Badges
    badgeAll.textContent = total;
    badgePending.textContent = pending;
    badgeCompleted.textContent = completed;
  }

  /* ----------------------------------------------------------------------------
     5. Validation Helpers
     ---------------------------------------------------------------------------- */
  /**
   * Displays an error message and adds error styling to the input field.
   */
  function showValidationError(message) {
    validationMessage.textContent = message;
    validationMessage.classList.add('active');
    taskInput.classList.add('input-error');
    taskInput.focus();
  }

  /**
   * Clears the validation error message and resets input styling.
   */
  function clearValidationError() {
    validationMessage.textContent = '';
    validationMessage.classList.remove('active');
    taskInput.classList.remove('input-error');
  }

  /* ----------------------------------------------------------------------------
     6. Render Function
     ---------------------------------------------------------------------------- */
  /**
   * Filters and renders the task list in the DOM.
   * Uses semantic DOM manipulation and textContent to prevent XSS vulnerabilities.
   */
  function renderTasks() {
    // Filter tasks based on selected tab ('all', 'pending', or 'completed')
    const filteredTasks = tasks.filter(task => {
      if (currentFilter === 'pending') return !task.completed;
      if (currentFilter === 'completed') return task.completed;
      return true; // 'all'
    });

    // Clear previous task elements
    taskList.innerHTML = '';

    // Show or hide empty state container
    if (filteredTasks.length === 0) {
      emptyState.style.display = 'flex';

      // Customize empty message based on filter
      if (currentFilter === 'completed') {
        emptyTitle.textContent = 'No completed tasks yet';
        emptyDesc.textContent = 'Check off tasks as you finish them to see them listed here.';
      } else if (currentFilter === 'pending') {
        emptyTitle.textContent = 'No pending tasks!';
        emptyDesc.textContent = 'Great job! You have completed all scheduled tasks.';
      } else {
        emptyTitle.textContent = 'No tasks yet';
        emptyDesc.textContent = 'Enter your task above and click "Add Task" to organize your study schedule.';
      }
    } else {
      emptyState.style.display = 'none';

      // Build task elements
      filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.dataset.id = task.id;

        // Content wrapper (Checkbox + Label)
        const contentDiv = document.createElement('div');
        contentDiv.className = 'task-item-content';

        // Checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        checkbox.checked = task.completed;
        checkbox.setAttribute('aria-label', `Mark "${task.text}" as ${task.completed ? 'pending' : 'completed'}`);

        // Task Text (using textContent to prevent XSS)
        const spanText = document.createElement('span');
        spanText.className = 'task-text';
        spanText.textContent = task.text;

        contentDiv.appendChild(checkbox);
        contentDiv.appendChild(spanText);

        // Delete Button
        const deleteBtn = document.createElement('button');
        deleteBtn.type = 'button';
        deleteBtn.className = 'btn-delete';
        deleteBtn.setAttribute('aria-label', `Delete task: "${task.text}"`);
        deleteBtn.title = 'Delete Task';
        deleteBtn.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
        `;

        li.appendChild(contentDiv);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
      });
    }

    // Always keep summary counts synchronized
    updateStatistics();
  }

  /* ----------------------------------------------------------------------------
     7. Core Actions (Add, Toggle, Delete, Filter)
     ---------------------------------------------------------------------------- */

  /**
   * Adds a new task to the array after input validation.
   */
  function handleAddTask(e) {
    e.preventDefault();

    const taskText = taskInput.value.trim();

    // Validation: Do not allow empty tasks
    if (!taskText) {
      showValidationError('Please enter a task before clicking Add Task.');
      return;
    }

    // Clear any active error message
    clearValidationError();

    // Create a new task object
    const newTask = {
      id: Date.now(),      // Unique timestamp identifier
      text: taskText,      // Task description
      completed: false     // Initial status is pending
    };

    // Add to state and save
    tasks.unshift(newTask); // Adds new task at the top of the list
    saveTasksToStorage();

    // Reset input field and update UI
    taskInput.value = '';
    taskInput.focus();
    renderTasks();
  }

  /**
   * Toggles the completed status of a task by ID.
   */
  function toggleTaskCompletion(taskId) {
    const task = tasks.find(t => t.id === Number(taskId));
    if (task) {
      task.completed = !task.completed;
      saveTasksToStorage();
      renderTasks();
    }
  }

  /**
   * Deletes a task from the list by ID.
   */
  function deleteTask(taskId) {
    tasks = tasks.filter(t => t.id !== Number(taskId));
    saveTasksToStorage();
    renderTasks();
  }

  /**
   * Switches the active filter tab ('all' | 'pending' | 'completed').
   */
  function setFilter(filter) {
    currentFilter = filter;

    // Update active filter button styling & ARIA state
    filterButtons.forEach(btn => {
      const isActive = btn.dataset.filter === filter;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    renderTasks();
  }

  /* ----------------------------------------------------------------------------
     8. Event Listeners (Event Delegation for Performance)
     ---------------------------------------------------------------------------- */

  // Form Submission (Add Task button or Enter key)
  taskForm.addEventListener('submit', handleAddTask);

  // Clear validation warning automatically when user starts typing
  taskInput.addEventListener('input', () => {
    if (validationMessage.classList.contains('active')) {
      clearValidationError();
    }
  });

  // Event Delegation on Task List (Handles both Checkbox and Delete button clicks)
  taskList.addEventListener('click', (e) => {
    const taskItem = e.target.closest('.task-item');
    if (!taskItem) return;

    const taskId = taskItem.dataset.id;

    // Checkbox clicked
    if (e.target.matches('.task-checkbox')) {
      toggleTaskCompletion(taskId);
      return;
    }

    // Delete button (or inner SVG icon) clicked
    const deleteBtn = e.target.closest('.btn-delete');
    if (deleteBtn) {
      deleteTask(taskId);
    }
  });

  // Filter Buttons Click
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      setFilter(button.dataset.filter);
    });
  });

  /* ----------------------------------------------------------------------------
     9. Initial Application Bootstrap
     ---------------------------------------------------------------------------- */
  renderTasks();
});

