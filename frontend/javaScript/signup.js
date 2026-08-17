const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    // Get form values
    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmpwd").value;
    const terms = document.getElementById("checkbox").checked;


    // Check empty fields
    if (!fullName || !email || !phone || !password || !confirmPassword) {
        alert("Please fill in all fields.");
        return;
    }


    // Check password length
    if (password.length < 6) {
        alert("Password must be at least 6 characters.");
        return;
    }


    // Check passwords
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }


    // Check terms
    if (!terms) {
        alert("Please agree to the Terms & Conditions and Privacy Policy.");
        return;
    }


    try {

        const response = await fetch(
            "http://localhost:5000/api/users/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fullName: fullName,
                    email: email,
                    phone: phone,
                    password: password
                })
            }
        );


        const data = await response.json();


        if (response.ok) {

            alert(data.message);

            // Go to sign in page
            window.location.href = "signin.html";

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.error("Registration error:", error);

        alert("Unable to connect to the server.");

    }

});