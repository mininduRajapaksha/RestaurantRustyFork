const signinForm = document.getElementById("signinForm");

signinForm.addEventListener("submit", async function (event) {

    event.preventDefault();


    // Get form values
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;


    // Check empty fields
    if (!email || !password) {
        alert("Please enter your email and password.");
        return;
    }


    try {

        const response = await fetch(
            "http://localhost:5000/api/users/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }
        );


        const data = await response.json();


        if (response.ok) {

            alert(data.message);

            // Store logged-in user
            localStorage.setItem(
                "currentUser",
                JSON.stringify(data.user)
            );

            // Go to home page
            window.location.href = "home.html";

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.error("Login error:", error);

        alert("Unable to connect to the server.");

    }

});