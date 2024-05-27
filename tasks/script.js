let taskCount = 0;

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        taskCount++;
        const taskList = document.getElementById('task-list');

        const listItem = document.createElement('li');
        listItem.textContent = `${taskCount}. ${taskText}`;
        listItem.classList.add('active-task');
        listItem.onclick = markCompleted;

        taskList.appendChild(listItem);

        taskInput.value = "";
    }
}

function markCompleted(event) {
    const listItem = event.target;
    const isCompleted = listItem.classList.toggle('completed-task');
    listItem.classList.toggle('active-task');

    if (isCompleted) {
        const timestamp = document.createElement('span');
        timestamp.classList.add('timestamp');
        const now = new Date();
        const formattedDateTime = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
        timestamp.textContent = `Completed on: ${formattedDateTime}`;
        listItem.appendChild(timestamp);
    } else {
        const timestamp = listItem.querySelector('.timestamp');
        if (timestamp) {
            listItem.removeChild(timestamp);
        }
    }
}
