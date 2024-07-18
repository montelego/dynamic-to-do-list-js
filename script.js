document.addEventListener('DOMContentLoaded', function() {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' indicates not to save again to Local Storage
    }

    // Function to add a task
    function addTask(taskText, save = true) {
        // Create a new list item (li)
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a remove button for the task
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = 'remove-btn';

        // Set up the remove button's onclick event
        removeBtn.onclick = function() {
            taskList.removeChild(li);
            removeTaskFromLocalStorage(taskText);
        };

        // Append the remove button to the list item
        li.appendChild(removeBtn);

        // Append the list item to the task list
        taskList.appendChild(li);

        // Clear the input field
        taskInput.value = '';

        // Save the task to Local Storage if needed
        if (save) {
            saveTaskToLocalStorage(taskText);
        }
    }

    // Save a task to Local Storage
    function saveTaskToLocalStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Remove a task from Local Storage
    function removeTaskFromLocalStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    // Add event listener to the Add Task button
    addButton.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }
        addTask(taskText);
    });

    // Add event listener to the task input field for the Enter key press
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            if (taskText === "") {
                alert("Please enter a task.");
                return;
            }
            addTask(taskText);
        }
    });

    // Load tasks from Local Storage when the page loads
    loadTasks();
});