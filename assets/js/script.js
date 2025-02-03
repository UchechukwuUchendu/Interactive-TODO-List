// script.js
let tasks = [];

document.getElementById("addTaskButton").addEventListener("click", addTask);
document.getElementById("taskInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function renderTasks() {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${task.text}</td>
            <td>${task.dateAdded}</td>
            <td>${task.dueDate}</td>
            <td>
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
            </td>
        `;
        taskList.appendChild(row);
    });
}

function addTask() {
    let input = document.getElementById("taskInput");
    let dueDateInput = document.getElementById("dueDateInput");
    let error = document.getElementById("error");
    let taskText = input.value.trim();
    let dueDate = dueDateInput.value;
    
    if (taskText === "") {
        error.textContent = "Task cannot be empty!";
        return;
    }
    error.textContent = "";
    
    let task = {
        text: taskText,
        dateAdded: new Date().toLocaleDateString(),
        dueDate: dueDate || "Not Set"
    };
    tasks.push(task);
    input.value = "";
    dueDateInput.value = "";
    renderTasks();
}

function editTask(index) {
    let newText = prompt("Edit task:", tasks[index].text);
    if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText.trim();
        renderTasks();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

