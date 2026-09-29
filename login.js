// ===============================
// ADMIN LOGIN
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    const loginBox = document.querySelector(".login");

    if (!loginBox) {
        return;
    }

    const emailInput = loginBox.querySelector('input[type="email"]');
    const passwordInput = loginBox.querySelector('input[type="password"]');
    const loginButton = loginBox.querySelector("button");

    // Remove the default link behavior
    const loginLink = loginButton.closest("a");

    loginLink.addEventListener("click", function (event) {

        event.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // Clear previous message
        const oldMessage = document.querySelector(".login-message");

        if (oldMessage) {
            oldMessage.remove();
        }

        // Create message
        const message = document.createElement("p");
        message.className = "login-message";
        message.style.marginTop = "15px";
        message.style.textAlign = "center";

        // Empty validation
        if (email === "" || password === "") {

            message.textContent = "Please enter email and password.";
            message.style.color = "red";

            loginBox.appendChild(message);
            return;
        }

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            message.textContent = "Please enter a valid email address.";
            message.style.color = "red";

            loginBox.appendChild(message);
            return;
        }

        // Demo admin credentials
        if (email === "admin@gmail.com" && password === "admin123") {

            // Store login information
            sessionStorage.setItem("adminLoggedIn", "true");
            sessionStorage.setItem("adminEmail", email);

            message.textContent = "Login successful! Redirecting...";
            message.style.color = "green";

            loginBox.appendChild(message);

            setTimeout(function () {
                window.location.href = "dashboard.html";
            }, 700);

        } else {

            message.textContent = "Invalid email or password.";
            message.style.color = "red";

            loginBox.appendChild(message);
        }

    });

});