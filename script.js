const taskInput = document.getElementById('task-input');

const addBtn = document.getElementById('add-btn');

const taskList = document.getElementById('task-list');

const clearBtn = document.getElementById('clear-btn');

const themeToggle = document.getElementById('theme-toggle');


document.addEventListener('DOMContentLoaded', () => {
  loadTasks();

 
  const savedTheme = localStorage.getItem('darkMode');
  if (savedTheme === 'enabled') {
    document.body.classList.add('dark-mode');
    themeToggle.textContent = ' Light Mode';
  }
});


addBtn.addEventListener('click', addTask);


taskList.addEventListener('click', (e) => {

  if (e.target.tagName === 'SPAN') {
    e.target.parentElement.classList.toggle('completed');
    saveTasks();
  }

  if (e.target.classList.contains('delete')) {
    e.target.parentElement.remove();
    saveTasks();
  }
});


clearBtn.addEventListener('click', () => {
  if (confirm('Clear all tasks?')) {
    taskList.innerHTML = '';
    saveTasks();
  }
});


themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  const isDark = document.body.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
  themeToggle.textContent = isDark ? 'Light Mode' : ' Dark Mode';
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') return alert('Please enter a task');

  const li = document.createElement('li');
  li.innerHTML = `
    <span>${taskText}</span>
    <button class="delete">X</button>
  `;
  taskList.appendChild(li);

  saveTasks();
  taskInput.value = '';
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll('li').forEach(li => {
    tasks.push({
      text: li.querySelector('span').textContent,
      completed: li.classList.contains('completed')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {
    const li = document.createElement('li');
    if (task.completed) li.classList.add('completed');
    li.innerHTML = `
      <span>${task.text}</span>
      <button class="delete">X</button>`;
    taskList.appendChild(li);
  });
}
