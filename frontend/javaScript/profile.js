// Get elements
const profileName = document.querySelector(".profile-name");
const profileEmail = document.querySelector(".profile-email");

const fullNameInput = document.querySelector(
    ".detail-item:nth-child(1) input"
);

const emailInput = document.querySelector(
    ".detail-item:nth-child(2) input"
);

const phoneInput = document.querySelector(
    ".detail-item:nth-child(3) input"
);

const editBtn = document.getElementById("editBtn");
const logoutBtn = document.getElementById("logoutBtn");


// Check login status
const storedCurrentUser = localStorage.getItem("currentUser");

if (!storedCurrentUser) {
    alert("Please sign in first.");
    window.location.href = "signin.html";
}

const currentUser = JSON.parse(storedCurrentUser);

// Display profile information
profileName.textContent = currentUser.fullName;
profileEmail.textContent = currentUser.email;

fullNameInput.value = currentUser.fullName;
emailInput.value = currentUser.email;
phoneInput.value = currentUser.phone;


// Logout
logoutBtn.addEventListener("click", function () {

    const confirmLogout = confirm("Are you sure you want to logout?");

    if (confirmLogout) {
        localStorage.removeItem("currentUser");

        window.location.href = "signin.html";
    }
});