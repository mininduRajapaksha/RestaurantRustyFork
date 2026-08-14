const signinForm = document.getElementById("signinForm");

signinForm.addEventListener('submit',function(e){

    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Find matching user
    const userMatch = users.find(user=> user.email===email && user.password===password);

    if(userMatch){

        //save current logged user
        localStorage.setItem("currentUser", JSON.stringify(userMatch));

        alert("Login Successful!");

        window.location.href = "home.html";
    }else{
        alert("Invalid Email or Password");
    }
})