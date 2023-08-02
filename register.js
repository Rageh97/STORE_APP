// 1- Register Account........................................................
let userName = document.getElementById("username");
let email = document.getElementById("email");
let password = document.getElementById("password");
let btnReg = document.getElementById("btn-reg");

btnReg.addEventListener("click", (e) => {
    e.preventDefault();
    if (userName.value === "" || email.value === "" || password.value === "") {
        alert("you have to register");
    } else {
        localStorage.setItem("username", userName.value);
        localStorage.setItem("email", email.value);
        localStorage.setItem("password", password.value);
        setTimeout(() => {
            window.location = "login.html";
        }, 1000);
    }
});
