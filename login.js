// login Account...............................................................
let userNameLog = document.getElementById("username-log");
let passwordLog = document.getElementById("password-log");
let btnLog = document.getElementById("btn-log");
let lore = document.querySelector('.lore')

btnLog.addEventListener("click", (i) => {
  i.preventDefault();
  if (userNameLog.value === "" || passwordLog === "") {
    alert("you have to fill the data");
  } else {
    if (
      userNameLog.value === localStorage.getItem("username") &&
      passwordLog.value === localStorage.getItem("password")
    ) 
    
    setTimeout(() => {
      window.location = "index.html";
    }, 1000);
   
  }
});
