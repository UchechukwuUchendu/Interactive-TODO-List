// script.js
let tasks = [];

document.getElementById("addTaskButton").addEventListener("click", addTask);
document.getElementById("taskInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

document.addEventListener("DOMContentLoaded", function() {
    let today = new Date().toISOString().split("T")[0];
    document.getElementById("dateAddedInput").setAttribute("max", today);
    document.getElementById("dueDateInput").setAttribute("min", today);
    renderTasks();
});

function renderTasks() {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${task.text}</td>
            <td>${task.priority}</td>
            <td>${task.status}</td>
            <td>${task.dateAdded}</td>
            <td>${task.dueDate}</td>
            <td>
                <button class="edit-button" onclick="editTask(${index})">Edit</button>
                <button class="delete-button" onclick="deleteTask(${index})">Delete</button>
            </td>
        `;
        taskList.appendChild(row);
    });
}

function addTask() {
    let input = document.getElementById("taskInput");
    let dateAddedInput = document.getElementById("dateAddedInput");
    let dueDateInput = document.getElementById("dueDateInput");
    let priorityInput = document.getElementById("priorityInput");
    let error = document.getElementById("error");
    let taskText = input.value.trim();
    let dateAdded = dateAddedInput.value;
    let dueDate = dueDateInput.value;
    let priority = priorityInput.value;
    
    if (taskText === "" || dateAdded === "" || dueDate === "") {
        error.textContent = "Please fill out all fields!";
        return;
    }
    if (new Date(dueDate) < new Date(dateAdded)) {
        error.textContent = "Due date must be after the date added!";
        return;
    }
    error.textContent = "";
    
    let task = {
        text: taskText,
        priority: priority,
        status: "New",
        dateAdded: dateAdded,
        dueDate: dueDate
    };
    tasks.push(task);
    input.value = "";
    dateAddedInput.value = "";
    dueDateInput.value = "";
    renderTasks();
}

function editTask(index) {
    let task = tasks[index];
    let newText = prompt("Edit task:", task.text);
    let newPriority = prompt("Edit priority (High, Medium, Low):", task.priority);
    let newDateAdded = prompt("Edit date added:", task.dateAdded);
    let newDueDate = prompt("Edit due date:", task.dueDate);
    
    if (newText && newPriority && newDateAdded && newDueDate && new Date(newDueDate) >= new Date(newDateAdded)) {
        task.text = newText.trim();
        task.priority = newPriority;
        task.dateAdded = newDateAdded;
        task.dueDate = newDueDate;
        renderTasks();
    } else {
        alert("Invalid inputs. Make sure all fields are filled and due date is after date added.");
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}




