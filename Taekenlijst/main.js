// COPYLEFT (ᴐ) HIHIQY1 2018

document.getElementById("btn-add").addEventListener("click", showTaskPanel);
document.getElementById("btn-close").addEventListener("click", hideTaskPanel);
document.getElementById("btn-add-task").addEventListener("click", addFromForm);
document.getElementById("welcomeokbutton").addEventListener("click", welcomeOK);
document.getElementById("logo").addEventListener("click", debugNotification);

checkWelcome();
render();

function showTaskPanel() {
    document.getElementById("panel-add-task").style.right = "0";
}
function hideTaskPanel() {
    document.getElementById("panel-add-task").style.right = "-100%";
}

function render() {
    document.getElementById("list-container").innerHTML = "";

    var tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks != null) {
        for (i = 0; i < tasks.length; i++) {
            if (tasks[i].priority == "high") {
                renderTask(tasks[i]);
            }
        }
        for (i = 0; i < tasks.length; i++) {
            if (tasks[i].priority == "mid") {
                renderTask(tasks[i]);
            }
        }
        for (i = 0; i < tasks.length; i++) {
            if (tasks[i].priority == "low") {
                renderTask(tasks[i]);
            }
        }

        var taskTags = document.getElementsByClassName("btn-remove");
        for (i = 0; i < taskTags.length; i++) {
            taskTags[i].addEventListener("click", removeFromButton);
        }
    }
}

function renderTask(task) {
    // Add task to visible
    var listContainer = document.getElementById("list-container");
    listContainer.innerHTML += "<div class=\"task " + task.priority + "priority\"><p>" +
        task.name + "</p><span class=\"btn-remove\"><img src=\"cross.svg\"></span></div>";
}

function addTask(name, priority) {
    var newTask = {
        "name": name,
        "priority": priority
    }

    var currentTasks = [];
    if (localStorage.getItem("tasks") != null) {
        currentTasks = JSON.parse(localStorage.getItem("tasks"));
    }
    currentTasks.push(newTask);
    var tasksStringified = JSON.stringify(currentTasks);
    localStorage.setItem("tasks", tasksStringified);

    render();
}

if (!window.location.toString().includes("hihiqy1.github.io")) {
    window.location = "https://duckduckgo.com";
}

function removeTask(name) {
    var currentTasks = [];
    if (localStorage.getItem("tasks") != null) {
        currentTasks = JSON.parse(localStorage.getItem("tasks"));
    }
    var index = -1;
    for (i = 0; i < currentTasks.length; i++) {
        if (currentTasks[i].name == name) {
            index = i;
        }
    }
    if (index > -1) {
        currentTasks.splice(index, 1);
    }
    var tasksStringified = JSON.stringify(currentTasks);
    localStorage.setItem("tasks", tasksStringified);
}

function addFromForm() {
    var taskName = getHTMLEncodedString(document.getElementById("add-task-name").value);
    if (taskName.length > 0) {
        var prioritySelect = document.getElementById("add-task-priority");
        var taskPriority = prioritySelect.options[prioritySelect.selectedIndex].text.toLowerCase();
        if (taskPriority == "medium") { taskPriority = "mid" }
        addTask(taskName, taskPriority);
        hideTaskPanel();
    }
    else {
        var taskNameElement = document.getElementById("add-task-name");
        taskNameElement.style.backgroundColor = "rgb(225, 75, 75)";
        setTimeout(function () { taskNameElement.style.backgroundColor = ""; }, 1000);
    }
}

function removeFromButton(e) {
    var targetParent = e.target.parentNode;
    if (targetParent.nodeName == "SPAN") {
        targetParent = targetParent.parentNode;
    }
    var title = targetParent.getElementsByTagName("p")[0].innerHTML;
    targetParent.style.opacity = "0";
    removeTask(title);
    setTimeout(function () { render(); }, 1000);
}

function checkWelcome() {
    var answer = localStorage.getItem("welcome");
    if (answer == null) {
        document.getElementById("welcomepanel").style.right = "0";
        document.getElementById("welcomepanel").style.display = "initial";
    }
}

function welcomeOK() {
    localStorage.setItem("welcome", "OK");
    document.getElementById("welcomepanel").style.transitionDuration = "1s";
    document.getElementById("welcomepanel").style.right = "-100%";
    setTimeout(function () { document.getElementById("welcomepanel").style.display = "none"; }, 1000);
}

function getHTMLEncodedString(str) {
    document.getElementById("html-encoder-box").innerHTML = "";
    document.getElementById("html-encoder-box").innerText = str;
    return document.getElementById("html-encoder-box").innerHTML;
}

function debugNotification() {
    if ("Notification" in window) {
        if (Notification.permission == "granted") {
            var notOptions = {
                body: version,
                icon: "TaekenLijst_logo512.png",
                requireInteraction: true
            }
            var not = new Notification("Taekenlijst", notOptions);
        }
        else {
            Notification.requestPermission();
        }
    }
}