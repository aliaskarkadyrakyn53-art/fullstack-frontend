const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {
    nav.classList.toggle("show");
});

document.querySelectorAll(".nav a").forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("show");
    });
});

const defaultTasks = [
    {
        id: 1,
        title: "HTML және CSS қайталау",
        subject: "Web Programming",
        date: "2026-10-10",
        completed: true
    },
    {
        id: 2,
        title: "JavaScript оқу",
        subject: "Frontend",
        date: "2026-10-12",
        completed: false
    },
    {
        id: 3,
        title: "Жеке жоба жасау",
        subject: "Fullstack",
        date: "2026-10-20",
        completed: false
    }
];

let tasks = JSON.parse(
    localStorage.getItem("studyMateTasks")
);

if (!tasks) {
    tasks = defaultTasks;
    saveTasks();
}

function saveTasks() {
    localStorage.setItem(
        "studyMateTasks",
        JSON.stringify(tasks)
    );
}

function updateStatistics() {
    const total = tasks.length;

    const completed = tasks.filter(
        task => task.completed
    ).length;

    const remaining = total - completed;

    const percent = total
        ? Math.round((completed / total) * 100)
        : 0;

    document.getElementById("total").textContent = total;
    document.getElementById("completed").textContent = completed;
    document.getElementById("remaining").textContent = remaining;

    document.getElementById("profileTotal").textContent = total;
    document.getElementById("profileCompleted").textContent = completed;
    document.getElementById("profileRemaining").textContent = remaining;

    document.getElementById("profilePercent").textContent =
        percent + "%";

    document.getElementById("profileBar").style.width =
        percent + "%";

    document.getElementById("heroPercent").textContent =
        percent + "%";

    document.getElementById("heroBar").style.width =
        percent + "%";
}

function displayTasks() {
    const taskList = document.getElementById("taskList");
    const search = document
        .getElementById("search")
        .value
        .toLowerCase();

    const filter = document.getElementById("filter").value;

    const filteredTasks = tasks.filter(task => {

        const searchMatch =
            task.title.toLowerCase().includes(search) ||
            task.subject.toLowerCase().includes(search);

        let filterMatch = true;

        if (filter === "completed") {
            filterMatch = task.completed;
        }

        if (filter === "remaining") {
            filterMatch = !task.completed;
        }

        return searchMatch && filterMatch;
    });

    taskList.innerHTML = "";

    const empty = document.getElementById("empty");

    if (filteredTasks.length === 0) {
        empty.style.display = "block";
    } else {
        empty.style.display = "none";
    }

    filteredTasks.forEach(task => {

        const element = document.createElement("div");

        element.className = "task";

        if (task.completed) {
            element.classList.add("completed");
        }

        element.innerHTML = `
            <div class="task-left">

                <input
                    type="checkbox"
                    class="task-checkbox"
                    data-id="${task.id}"
                    ${task.completed ? "checked" : ""}
                    aria-label="Тапсырманы орындау"
                >

                <div>
                    <div class="task-title">
                        ${task.title}
                    </div>

                    <div class="task-subject">
                        ${task.subject}
                    </div>
                </div>

            </div>

            <div class="task-date">
                ${task.date}
            </div>

            <button
                class="delete-btn"
                data-id="${task.id}">
                🗑
            </button>
        `;

        taskList.appendChild(element);
    });

    document.querySelectorAll(".task-checkbox")
        .forEach(checkbox => {

            checkbox.addEventListener("change", () => {

                const id = Number(
                    checkbox.dataset.id
                );

                const task = tasks.find(
                    item => item.id === id
                );

                task.completed =
                    checkbox.checked;

                saveTasks();
                displayTasks();
                updateStatistics();
            });
        });

    document.querySelectorAll(".delete-btn")
        .forEach(button => {

            button.addEventListener("click", () => {

                const id = Number(
                    button.dataset.id
                );

                tasks = tasks.filter(
                    task => task.id !== id
                );

                saveTasks();
                displayTasks();
                updateStatistics();
            });
        });

    updateStatistics();
}

document
    .getElementById("search")
    .addEventListener("input", displayTasks);

document
    .getElementById("filter")
    .addEventListener("change", displayTasks);

const modal = document.getElementById("modal");

document
    .getElementById("addTaskBtn")
    .addEventListener("click", () => {
        modal.classList.add("show");
    });

document
    .getElementById("ctaButton")
    .addEventListener("click", () => {
        modal.classList.add("show");
    });

document
    .getElementById("closeModal")
    .addEventListener("click", () => {
        modal.classList.remove("show");
    });

modal.addEventListener("click", event => {

    if (event.target === modal) {
        modal.classList.remove("show");
    }

});

document
    .getElementById("taskForm")
    .addEventListener("submit", event => {

        event.preventDefault();

        const title = document
            .getElementById("title")
            .value
            .trim();

        const subject = document
            .getElementById("subject")
            .value
            .trim();

        const date = document
            .getElementById("date")
            .value;

        if (!title || !subject || !date) {
            alert("Барлық өрісті толтырыңыз!");
            return;
        }

        tasks.push({
            id: Date.now(),
            title: title,
            subject: subject,
            date: date,
            completed: false
        });

        saveTasks();

        document
            .getElementById("taskForm")
            .reset();

        modal.classList.remove("show");

        displayTasks();
        updateStatistics();
    });

const profileForm =
    document.getElementById("profileForm");

const savedName =
    localStorage.getItem("studentName");

const savedEmail =
    localStorage.getItem("studentEmail");

if (savedName) {
    document.getElementById("profileName")
        .textContent = savedName;

    document.getElementById("avatar")
        .textContent = savedName
        .charAt(0)
        .toUpperCase();
}

if (savedEmail) {
    document.getElementById("profileEmail")
        .textContent = savedEmail;
}

profileForm.addEventListener("submit", event => {

    event.preventDefault();

    const name = document
        .getElementById("name")
        .value
        .trim();

    const email = document
        .getElementById("email")
        .value
        .trim();

    const message =
        document.getElementById("message");

    if (!name || !email) {
        message.textContent =
            "Барлық өрісті толтырыңыз.";

        message.style.color = "#ef4444";

        return;
    }

    localStorage.setItem(
        "studentName",
        name
    );

    localStorage.setItem(
        "studentEmail",
        email
    );

    document.getElementById("profileName")
        .textContent = name;

    document.getElementById("profileEmail")
        .textContent = email;

    document.getElementById("avatar")
        .textContent = name
        .charAt(0)
        .toUpperCase();

    message.textContent =
        "Профиль сәтті сақталды!";

    message.style.color = "#22c55e";
});

displayTasks();
updateStatistics();