const signupForm = document.getElementById("signupForm");

signupForm.addEventListener('submit', function(e){
    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value;
    const conPassword = document.getElementById("confirmpwd").value;
    const checkbox = document.getElementById("checkbox").checked;

    //validations

    if(fullName === "" || email === "" || phone === "" || password === ""){
        alert("Please fill all fields");
        return;
    }
    if(password != conPassword){
        alert("Password is not matched")
        return;
    }
    if(password.length<6){
        alert("Password must contain at least 6 characters.");
        return;
    }
    if(!/\S+@\S+\.\S+/.test(email)){
        alert("Invalid Email");
        return;
    }
    if(!/^\d{10}$/.test(phone)){
        alert("Contact number must be 10 digits");
        return;
    }
    if(!checkbox){
        alert("Please accept the Terms & Policy.");
        return;
    }

    //get existing users or create new arry if none exist
    const users = JSON.parse(localStorage.getItem("users")) || [];

    //check email alrady registered
    const emailExists = users.some(user => user.email === email);

    if(emailExists){
        alert("This email is alredy registered")
        return;
    }
    // Create the new user object
    const newUser = {fullName, phone, email, password};
    
    //add new user
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration Successful!");

    window.location.href ="signin.html";
    //clear form
    signupForm.reset();
})