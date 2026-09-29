// ============================================================
// EMPLOYEE ADMIN PANEL
// JAVASCRIPT ONLY
// Existing HTML and CSS are NOT changed
// ============================================================


// ============================================================
// DEFAULT DATA
// ============================================================

const defaultEmployees = [
    {
        name: "Rahul Kumar",
        department: "IT",
        status: "Active"
    },
    {
        name: "Ananya Rao",
        department: "IT",
        status: "Active"
    },
    {
        name: "Priya Sharma",
        department: "Finance",
        status: "Active"
    },
    {
        name: "Pradeep Kumar",
        department: "HR",
        status: "Leave"
    },
    {
        name: "Aishwarya",
        department: "IT",
        status: "Leave"
    },
    {
        name: "Arun",
        department: "Finance",
        status: "Active"
    },
    {
        name: "Chethan",
        department: "HR",
        status: "Active"
    },
    {
        name: "Sahana",
        department: "IT",
        status: "Leave"
    },
    {
        name: "Dev",
        department: "IT",
        status: "Active"
    },
    {
        name: "Namratha",
        department: "IT",
        status: "Active"
    },
    {
        name: "Manoj",
        department: "IT",
        status: "Active"
    },
    {
        name: "Alia",
        department: "Finance",
        status: "Leave"
    }
];


const defaultTasks = [
    {
        task: "Website Development",
        employee: "Rahul",
        status: "In Progress"
    },
    {
        task: "Employee Database",
        employee: "Ananya",
        status: "Completed"
    },
    {
        task: "Monthly Report",
        employee: "Priya",
        status: "Pending"
    },
    {
        task: "Testing",
        employee: "Pradeep",
        status: "In Progress"
    }
];


const defaultLeaves = [
    {
        employee: "Rahul Kumar",
        type: "Casual Leave",
        status: "Approved"
    },
    {
        employee: "Priya Sharma",
        type: "Sick Leave",
        status: "Pending"
    },
    {
        employee: "Aishwarya",
        type: "Casual Leave",
        status: "Approved"
    },
    {
        employee: "Alia",
        type: "Personal Leave",
        status: "Pending"
    }
];


// ============================================================
// LOAD DATA
// ============================================================

let employees =
    JSON.parse(localStorage.getItem("employees")) ||
    defaultEmployees;

let tasks =
    JSON.parse(localStorage.getItem("tasks")) ||
    defaultTasks;

let leaves =
    JSON.parse(localStorage.getItem("leaves")) ||
    defaultLeaves;


// ============================================================
// SAVE DATA
// ============================================================

function saveData() {

    localStorage.setItem(
        "employees",
        JSON.stringify(employees)
    );

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

    localStorage.setItem(
        "leaves",
        JSON.stringify(leaves)
    );
}


// ============================================================
// PAGE LOAD
// ============================================================

document.addEventListener("DOMContentLoaded", function () {

    const dashboard = document.querySelector(".dashboard");

    if (!dashboard) {
        return;
    }


    // --------------------------------------------------------
    // LOGIN CHECK
    // --------------------------------------------------------

    if (sessionStorage.getItem("adminLoggedIn") !== "true") {

        alert("Please login first.");

        window.location.href = "login.html";

        return;
    }


    // --------------------------------------------------------
    // BUILD WEBSITE
    // --------------------------------------------------------

    createLogoutButton();

    createTopControls();

    renderEmployees();

    renderAttendance();

    renderTasks();

    renderLeaves();

    updateDashboard();

    showSection("dashboard");

});


// ============================================================
// NAVIGATION
// ============================================================

function showSection(sectionName) {

    const sections = [
        "dashboard",
        "employees",
        "attendance",
        "tasks",
        "leave"
    ];


    sections.forEach(function (section) {

        const element =
            document.getElementById(section);

        if (!element) {
            return;
        }


        if (section === sectionName) {

            element.style.display = "block";

        } else {

            element.style.display = "none";

        }

    });


    // Highlight current sidebar option

    const sidebarItems =
        document.querySelectorAll(".sidebar p");


    sidebarItems.forEach(function (item) {

        item.style.background = "";

        const text =
            item.textContent.trim().toLowerCase();


        if (text === sectionName.toLowerCase()) {

            item.style.background = "#5479c4";

        }

    });

}


// ============================================================
// TOP CONTROLS
// ============================================================

function createTopControls() {

    const content =
        document.querySelector(".content");

    if (!content) {
        return;
    }


    const toolbar =
        document.createElement("div");

    toolbar.id = "adminToolbar";

    toolbar.style.display = "flex";
    toolbar.style.justifyContent = "space-between";
    toolbar.style.alignItems = "center";
    toolbar.style.marginBottom = "20px";
    toolbar.style.flexWrap = "wrap";
    toolbar.style.gap = "10px";


    const welcome =
        document.createElement("span");

    const email =
        sessionStorage.getItem("adminEmail") ||
        "Administrator";

    welcome.textContent =
        "Logged in as: " + email;

    welcome.style.color = "#666";


    const date =
        document.createElement("span");

    date.id = "currentDate";

    date.style.color = "#021d55";
    date.style.fontWeight = "bold";


    toolbar.appendChild(welcome);
    toolbar.appendChild(date);


    content.insertBefore(
        toolbar,
        content.firstChild
    );


    updateDate();

    setInterval(updateDate, 1000);

}


// ============================================================
// CURRENT DATE AND TIME
// ============================================================

function updateDate() {

    const dateElement =
        document.getElementById("currentDate");

    if (!dateElement) {
        return;
    }


    const now = new Date();


    dateElement.textContent =
        now.toLocaleDateString() +
        " | " +
        now.toLocaleTimeString();

}


// ============================================================
// LOGOUT
// ============================================================

function createLogoutButton() {

    const sidebar =
        document.querySelector(".sidebar");

    if (!sidebar) {
        return;
    }


    const logout =
        document.createElement("button");

    logout.textContent = "Logout";


    logout.style.width = "100%";
    logout.style.padding = "12px";
    logout.style.marginTop = "30px";
    logout.style.border = "none";
    logout.style.borderRadius = "6px";
    logout.style.cursor = "pointer";
    logout.style.background = "white";
    logout.style.color = "#021d55";
    logout.style.fontWeight = "bold";


    logout.addEventListener("click", function () {

        const confirmLogout =
            confirm("Do you want to logout?");


        if (confirmLogout) {

            sessionStorage.removeItem(
                "adminLoggedIn"
            );

            sessionStorage.removeItem(
                "adminEmail"
            );


            window.location.href =
                "login.html";

        }

    });


    sidebar.appendChild(logout);

}


// ============================================================
// EMPLOYEE SECTION
// ============================================================

function renderEmployees() {

    const section =
        document.getElementById("employees");

    if (!section) {
        return;
    }


    section.innerHTML = "";


    const title =
        document.createElement("h2");

    title.textContent = "Employees";


    section.appendChild(title);


    // --------------------------------------------------------
    // SEARCH
    // --------------------------------------------------------

    const search =
        document.createElement("input");

    search.type = "text";

    search.placeholder =
        "Search employee...";


    search.style.width = "100%";
    search.style.padding = "12px";
    search.style.marginBottom = "15px";
    search.style.border = "1px solid #ccc";
    search.style.borderRadius = "6px";


    section.appendChild(search);


    // --------------------------------------------------------
    // ADD EMPLOYEE BUTTON
    // --------------------------------------------------------

    const addButton =
        createButton(
            "+ Add Employee"
        );


    section.appendChild(addButton);


    // --------------------------------------------------------
    // EMPLOYEE LIST
    // --------------------------------------------------------

    const list =
        document.createElement("div");

    list.id = "employeeList";


    section.appendChild(list);


    function displayEmployees(filter = "") {

        list.innerHTML = "";


        employees.forEach(function (employee, index) {

            if (
                !employee.name
                    .toLowerCase()
                    .includes(filter.toLowerCase())
            ) {
                return;
            }


            const row =
                document.createElement("div");


            row.style.padding = "13px";
            row.style.borderBottom =
                "1px solid #eee";
            row.style.display = "flex";
            row.style.justifyContent =
                "space-between";
            row.style.alignItems = "center";
            row.style.gap = "10px";
            row.style.flexWrap = "wrap";


            const info =
                document.createElement("span");


            info.innerHTML =
                "<strong>" +
                employee.name +
                "</strong> - " +
                employee.department +
                " - " +
                employee.status;


            const buttons =
                document.createElement("div");


            // EDIT

            const edit =
                createSmallButton("Edit");


            edit.addEventListener(
                "click",
                function () {

                    editEmployee(index);

                }
            );


            // DELETE

            const remove =
                createSmallButton("Delete");


            remove.addEventListener(
                "click",
                function () {

                    deleteEmployee(index);

                }
            );


            buttons.appendChild(edit);
            buttons.appendChild(remove);


            row.appendChild(info);
            row.appendChild(buttons);


            list.appendChild(row);

        });

    }


    displayEmployees();


    search.addEventListener(
        "input",
        function () {

            displayEmployees(
                search.value
            );

        }
    );


    addButton.addEventListener(
        "click",
        function () {

            addEmployee();

        }
    );

}


// ============================================================
// ADD EMPLOYEE
// ============================================================

function addEmployee() {

    const name =
        prompt("Enter employee name:");


    if (!name || !name.trim()) {
        return;
    }


    const department =
        prompt(
            "Enter department:",
            "IT"
        );


    if (!department || !department.trim()) {
        return;
    }


    employees.push({

        name: name.trim(),

        department: department.trim(),

        status: "Active"

    });


    saveData();

    renderEmployees();

    renderAttendance();

    updateDashboard();


    showNotification(
        "Employee added successfully!"
    );

}


// ============================================================
// EDIT EMPLOYEE
// ============================================================

function editEmployee(index) {

    const employee =
        employees[index];


    const newName =
        prompt(
            "Edit employee name:",
            employee.name
        );


    if (!newName || !newName.trim()) {
        return;
    }


    const newDepartment =
        prompt(
            "Edit department:",
            employee.department
        );


    if (!newDepartment ||
        !newDepartment.trim()) {
        return;
    }


    employee.name =
        newName.trim();


    employee.department =
        newDepartment.trim();


    saveData();

    renderEmployees();

    renderAttendance();

    updateDashboard();


    showNotification(
        "Employee updated!"
    );

}


// ============================================================
// DELETE EMPLOYEE
// ============================================================

function deleteEmployee(index) {

    const employee =
        employees[index];


    const confirmDelete =
        confirm(
            "Delete " +
            employee.name +
            "?"
        );


    if (!confirmDelete) {
        return;
    }


    employees.splice(index, 1);


    saveData();

    renderEmployees();

    renderAttendance();

    updateDashboard();


    showNotification(
        "Employee deleted."
    );

}


// ============================================================
// ATTENDANCE
// ============================================================

function renderAttendance() {

    const section =
        document.getElementById("attendance");

    if (!section) {
        return;
    }


    section.innerHTML = "";


    const title =
        document.createElement("h2");

    title.textContent = "Attendance";


    section.appendChild(title);


    const today =
        document.createElement("p");

    today.textContent =
        "Date: " +
        new Date().toLocaleDateString();


    today.style.fontWeight = "bold";


    section.appendChild(today);


    employees.forEach(function (employee) {

        const row =
            document.createElement("div");


        row.style.padding = "13px";
        row.style.borderBottom =
            "1px solid #eee";
        row.style.display = "flex";
        row.style.justifyContent =
            "space-between";
        row.style.alignItems = "center";
        row.style.gap = "10px";
        row.style.flexWrap = "wrap";


        const info =
            document.createElement("span");


        info.textContent =
            employee.name +
            " - " +
            employee.department;


        const select =
            document.createElement("select");


        const statuses = [
            "Active",
            "Absent",
            "Leave"
        ];


        statuses.forEach(function (status) {

            const option =
                document.createElement("option");

            option.value = status;
            option.textContent = status;


            if (employee.status === status) {
                option.selected = true;
            }


            select.appendChild(option);

        });


        select.addEventListener(
            "change",
            function () {

                employee.status =
                    select.value;


                saveData();

                renderEmployees();

                updateDashboard();


                showNotification(
                    employee.name +
                    " attendance updated."
                );

            }
        );


        row.appendChild(info);
        row.appendChild(select);


        section.appendChild(row);

    });

}


// ============================================================
// TASK SECTION
// ============================================================

function renderTasks() {

    const section =
        document.getElementById("tasks");

    if (!section) {
        return;
    }


    section.innerHTML = "";


    const title =
        document.createElement("h2");

    title.textContent = "Tasks";


    section.appendChild(title);


    const addButton =
        createButton("+ Add Task");


    section.appendChild(addButton);


    const list =
        document.createElement("div");


    section.appendChild(list);


    tasks.forEach(function (task, index) {

        const row =
            document.createElement("div");


        row.style.padding = "13px";
        row.style.borderBottom =
            "1px solid #eee";
        row.style.display = "flex";
        row.style.justifyContent =
            "space-between";
        row.style.alignItems = "center";
        row.style.gap = "10px";
        row.style.flexWrap = "wrap";


        const info =
            document.createElement("span");


        info.innerHTML =
            "<strong>" +
            task.task +
            "</strong> - " +
            task.employee +
            " - " +
            task.status;


        const controls =
            document.createElement("div");


        // STATUS BUTTON

        const statusButton =
            createSmallButton(
                "Change Status"
            );


        statusButton.addEventListener(
            "click",
            function () {

                changeTaskStatus(index);

            }
        );


        // DELETE BUTTON

        const deleteButton =
            createSmallButton(
                "Delete"
            );


        deleteButton.addEventListener(
            "click",
            function () {

                deleteTask(index);

            }
        );


        controls.appendChild(statusButton);
        controls.appendChild(deleteButton);


        row.appendChild(info);
        row.appendChild(controls);


        list.appendChild(row);

    });


    addButton.addEventListener(
        "click",
        addTask
    );

}


// ============================================================
// ADD TASK
// ============================================================

function addTask() {

    const taskName =
        prompt("Enter task name:");


    if (!taskName || !taskName.trim()) {
        return;
    }


    const employee =
        prompt(
            "Assign task to:",
            employees.length > 0
                ? employees[0].name
                : ""
        );


    if (!employee || !employee.trim()) {
        return;
    }


    tasks.push({

        task: taskName.trim(),

        employee: employee.trim(),

        status: "Pending"

    });


    saveData();

    renderTasks();

    updateDashboard();


    showNotification(
        "Task added successfully!"
    );

}


// ============================================================
// CHANGE TASK STATUS
// ============================================================

function changeTaskStatus(index) {

    const task =
        tasks[index];


    if (task.status === "Pending") {

        task.status =
            "In Progress";

    }

    else if (task.status === "In Progress") {

        task.status =
            "Completed";

    }

    else {

        task.status =
            "Pending";

    }


    saveData();

    renderTasks();

    updateDashboard();


    showNotification(
        "Task status changed to " +
        task.status
    );

}


// ============================================================
// DELETE TASK
// ============================================================

function deleteTask(index) {

    const confirmDelete =
        confirm(
            "Delete this task?"
        );


    if (!confirmDelete) {
        return;
    }


    tasks.splice(index, 1);


    saveData();

    renderTasks();

    updateDashboard();


    showNotification(
        "Task deleted."
    );

}


// ============================================================
// LEAVE MANAGEMENT
// ============================================================

function renderLeaves() {

    const section =
        document.getElementById("leave");

    if (!section) {
        return;
    }


    section.innerHTML = "";


    const title =
        document.createElement("h2");

    title.textContent =
        "Leave Requests";


    section.appendChild(title);


    // ADD LEAVE BUTTON

    const addButton =
        createButton(
            "+ Add Leave Request"
        );


    section.appendChild(addButton);


    addButton.addEventListener(
        "click",
        addLeaveRequest
    );


    // LEAVE LIST

    leaves.forEach(function (leave, index) {

        const row =
            document.createElement("div");


        row.style.padding = "15px";
        row.style.borderBottom =
            "1px solid #eee";
        row.style.marginBottom = "5px";


        const info =
            document.createElement("div");


        info.innerHTML =
            "<strong>" +
            leave.employee +
            "</strong> - " +
            leave.type;


        const status =
            document.createElement("span");


        status.textContent =
            " " +
            leave.status;


        status.style.fontWeight = "bold";
        status.style.marginLeft = "10px";


        if (leave.status === "Pending") {

            status.style.color =
                "#d97706";

        }

        else if (
            leave.status === "Approved"
        ) {

            status.style.color =
                "green";

        }

        else if (
            leave.status === "Rejected"
        ) {

            status.style.color =
                "red";

        }


        info.appendChild(status);


        row.appendChild(info);


        // BUTTON CONTAINER

        const buttons =
            document.createElement("div");


        buttons.style.marginTop = "10px";


        // ACCEPT

        const accept =
            createSmallButton(
                "Accept"
            );


        accept.addEventListener(
            "click",
            function () {

                acceptLeave(index);

            }
        );


        // REJECT

        const reject =
            createSmallButton(
                "Reject"
            );


        reject.addEventListener(
            "click",
            function () {

                rejectLeave(index);

            }
        );


        // DELETE

        const remove =
            createSmallButton(
                "Delete"
            );


        remove.addEventListener(
            "click",
            function () {

                deleteLeave(index);

            }
        );


        buttons.appendChild(accept);
        buttons.appendChild(reject);
        buttons.appendChild(remove);


        row.appendChild(buttons);


        section.appendChild(row);

    });

}


// ============================================================
// ACCEPT LEAVE
// ============================================================

function acceptLeave(index) {

    const leave =
        leaves[index];


    leave.status =
        "Approved";


    saveData();

    renderLeaves();

    updateDashboard();


    showNotification(
        leave.employee +
        "'s leave has been accepted."
    );

}


// ============================================================
// REJECT LEAVE
// ============================================================

function rejectLeave(index) {

    const leave =
        leaves[index];


    leave.status =
        "Rejected";


    saveData();

    renderLeaves();

    updateDashboard();


    showNotification(
        leave.employee +
        "'s leave has been rejected."
    );

}


// ============================================================
// ADD LEAVE REQUEST
// ============================================================

function addLeaveRequest() {

    const employee =
        prompt("Employee name:");


    if (!employee || !employee.trim()) {
        return;
    }


    const type =
        prompt(
            "Leave type:",
            "Casual Leave"
        );


    if (!type || !type.trim()) {
        return;
    }


    leaves.push({

        employee:
            employee.trim(),

        type:
            type.trim(),

        status:
            "Pending"

    });


    saveData();

    renderLeaves();

    updateDashboard();


    showNotification(
        "Leave request added."
    );

}


// ============================================================
// DELETE LEAVE
// ============================================================

function deleteLeave(index) {

    const confirmDelete =
        confirm(
            "Delete this leave request?"
        );


    if (!confirmDelete) {
        return;
    }


    leaves.splice(index, 1);


    saveData();

    renderLeaves();

    updateDashboard();


    showNotification(
        "Leave request deleted."
    );

}


// ============================================================
// DASHBOARD COUNTS
// ============================================================

function updateDashboard() {

    const cards =
        document.querySelectorAll(
            ".card h2"
        );


    if (cards.length < 4) {
        return;
    }


    const totalEmployees =
        employees.length;


    const activeEmployees =
        employees.filter(function (employee) {

            return employee.status === "Active";

        }).length;


    const totalTasks =
        tasks.length;


    const pendingLeaves =
        leaves.filter(function (leave) {

            return leave.status === "Pending";

        }).length;


    cards[0].textContent =
        totalEmployees;


    cards[1].textContent =
        activeEmployees;


    cards[2].textContent =
        totalTasks;


    cards[3].textContent =
        pendingLeaves;


    // Add a small notification
    // to the Leave Requests card

    updateLeaveCard(pendingLeaves);

}


// ============================================================
// LEAVE CARD NOTIFICATION
// ============================================================

function updateLeaveCard(count) {

    const cards =
        document.querySelectorAll(".card");


    if (cards.length < 4) {
        return;
    }


    const leaveCard =
        cards[3];


    let notification =
        leaveCard.querySelector(
            ".leave-notification"
        );


    if (!notification) {

        notification =
            document.createElement("small");

        notification.className =
            "leave-notification";

        notification.style.display =
            "block";

        notification.style.marginTop =
            "8px";

        notification.style.color =
            "#d97706";


        leaveCard.appendChild(
            notification
        );

    }


    if (count > 0) {

        notification.textContent =
            count +
            " pending request(s)";

    } else {

        notification.textContent =
            "No pending requests";

        notification.style.color =
            "green";

    }

}


// ============================================================
// GENERIC BUTTON
// ============================================================

function createButton(text) {

    const button =
        document.createElement("button");


    button.textContent = text;


    button.style.padding =
        "10px 15px";

    button.style.marginBottom =
        "15px";

    button.style.background =
        "#021d55";

    button.style.color =
        "white";

    button.style.border =
        "none";

    button.style.borderRadius =
        "6px";

    button.style.cursor =
        "pointer";


    button.addEventListener(
        "mouseenter",
        function () {

            button.style.background =
                "#5479c4";

        }
    );


    button.addEventListener(
        "mouseleave",
        function () {

            button.style.background =
                "#021d55";

        }
    );


    return button;

}


// ============================================================
// SMALL BUTTON
// ============================================================

function createSmallButton(text) {

    const button =
        document.createElement("button");


    button.textContent =
        text;


    button.style.padding =
        "7px 10px";

    button.style.margin =
        "3px";

    button.style.background =
        "#021d55";

    button.style.color =
        "white";

    button.style.border =
        "none";

    button.style.borderRadius =
        "5px";

    button.style.cursor =
        "pointer";


    button.addEventListener(
        "mouseenter",
        function () {

            button.style.background =
                "#5479c4";

        }
    );


    button.addEventListener(
        "mouseleave",
        function () {

            button.style.background =
                "#021d55";

        }
    );


    return button;

}


// ============================================================
// NOTIFICATION
// ============================================================

function showNotification(message) {

    const notification =
        document.createElement("div");


    notification.textContent =
        message;


    notification.style.position =
        "fixed";

    notification.style.right =
        "25px";

    notification.style.bottom =
        "25px";

    notification.style.background =
        "#021d55";

    notification.style.color =
        "white";

    notification.style.padding =
        "15px 20px";

    notification.style.borderRadius =
        "8px";

    notification.style.boxShadow =
        "0 3px 15px rgba(0,0,0,0.2)";

    notification.style.zIndex =
        "9999";


    document.body.appendChild(
        notification
    );


    setTimeout(function () {

        notification.remove();

    }, 2500);

}


// ============================================================
// RESET DEMO DATA
// ============================================================

function resetDemoData() {

    const confirmation =
        confirm(
            "Reset all employee, task and leave data?"
        );


    if (!confirmation) {
        return;
    }


    localStorage.removeItem(
        "employees"
    );

    localStorage.removeItem(
        "tasks"
    );

    localStorage.removeItem(
        "leaves"
    );


    employees =
        JSON.parse(
            JSON.stringify(defaultEmployees)
        );

    tasks =
        JSON.parse(
            JSON.stringify(defaultTasks)
        );

    leaves =
        JSON.parse(
            JSON.stringify(defaultLeaves)
        );


    saveData();


    renderEmployees();

    renderAttendance();

    renderTasks();

    renderLeaves();

    updateDashboard();


    showNotification(
        "Demo data has been reset."
    );

}