let taskCount = 0;

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        taskCount++;
        const taskList = document.getElementById('task-list');

        const listItem = document.createElement('li');
        listItem.classList.add('task-item');
        listItem.onclick = markCompleted;

        const taskSpan = document.createElement('span');
        taskSpan.textContent = `${taskCount}. ${taskText}`;
        taskSpan.classList.add('task-text', 'active-task');
        taskSpan.style.color = 'green';

        const createdTimestamp = document.createElement('span');
        createdTimestamp.classList.add('timestamp');
        const now = new Date();
        const formattedCreatedDateTime = `Created: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
        createdTimestamp.textContent = formattedCreatedDateTime;

        listItem.appendChild(taskSpan);
        listItem.appendChild(createdTimestamp);
        taskList.appendChild(listItem);

        taskInput.value = "";

        saveTasks();
    }
}

function markCompleted(event) {
    const listItem = event.currentTarget;
    const taskSpan = listItem.querySelector('.task-text');

    if (!taskSpan) return; // Ensure taskSpan exists

    const isCompleted = listItem.classList.toggle('completed-task');
    taskSpan.classList.toggle('completed-task');
    taskSpan.classList.toggle('active-task');

    if (isCompleted) {
        taskSpan.style.color = 'red';
        const timestamp = document.createElement('span');
        timestamp.classList.add('timestamp');
        const now = new Date();
        const formattedDateTime = `Done: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
        timestamp.textContent = formattedDateTime;
        listItem.appendChild(timestamp);
    } else {
        taskSpan.style.color = 'green';
        const timestamp = listItem.querySelector('.timestamp:last-of-type');
        if (timestamp && timestamp.textContent.startsWith("Done:")) {
            listItem.removeChild(timestamp);
        }
    }

    saveTasks();
}

function saveTasks() {
    const taskList = document.getElementById('task-list');
    const tasks = [];
    for (const listItem of taskList.children) {
        const taskSpan = listItem.querySelector('.task-text');
        if (!taskSpan) continue; // Ensure taskSpan exists

        const taskText = taskSpan.textContent;
        const isCompleted = listItem.classList.contains('completed-task');
        const createdTimestamp = listItem.querySelector('.timestamp:first-of-type') ? listItem.querySelector('.timestamp:first-of-type').textContent : null;
        const doneTimestamp = listItem.querySelector('.timestamp:last-of-type') && listItem.querySelector('.timestamp:last-of-type').textContent.startsWith("Done:") ? listItem.querySelector('.timestamp:last-of-type').textContent : null;
        tasks.push({ taskText, isCompleted, createdTimestamp, doneTimestamp });
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        const taskList = document.getElementById('task-list');
        taskCount = tasks.length;
        taskList.innerHTML = ''; // Clear existing tasks
        tasks.forEach((task, index) => {
            const listItem = document.createElement('li');
            listItem.classList.add('task-item');
            if (task.isCompleted) {
                listItem.classList.add('completed-task');
            }
            listItem.onclick = markCompleted;

            const taskSpan = document.createElement('span');
            taskSpan.textContent = `${index + 1}. ${task.taskText}`;
            taskSpan.classList.add('task-text', task.isCompleted ? 'completed-task' : 'active-task');
            taskSpan.style.color = task.isCompleted ? 'red' : 'green';

            const createdTimestamp = document.createElement('span');
            createdTimestamp.classList.add('timestamp');
            createdTimestamp.textContent = task.createdTimestamp;

            listItem.appendChild(taskSpan);
            listItem.appendChild(createdTimestamp);

            if (task.doneTimestamp) {
                const doneTimestamp = document.createElement('span');
                doneTimestamp.classList.add('timestamp');
                doneTimestamp.textContent = task.doneTimestamp;
                listItem.appendChild(doneTimestamp);
            }

            taskList.appendChild(listItem);
        });
    }
}