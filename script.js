const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage on page load
window.onload = () => {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  savedTasks.forEach(task => renderTask(task.text, task.completed));
};

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;
  renderTask(taskText, false);
  saveTasks();
  taskInput.value = "";
}

function renderTask(text, completed) {
  const li = document.createElement('li');
  li.textContent = text;
  if (completed) li.classList.add('completed');

  // Toggle completed state
  li.addEventListener('click', () => {
    li.classList.toggle('completed');
    saveTasks();
  });

  // Delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = "Delete";
  deleteBtn.onclick = (e) => {
    e.stopPropagation();
    li.remove();
    saveTasks();
  };

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll('#taskList li').forEach(li => {
    tasks.push({ 
      text: li.firstChild.textContent, 
      completed: li.classList.contains('completed') 
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
