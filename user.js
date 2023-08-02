let icon = document.querySelector(".icon");
let userInfo = document.querySelector(".user-info");
let lore = document.querySelector(".lore");
let logOut = document.querySelector(".log-out");
if (localStorage.getItem("username") && localStorage.getItem("password")) {
  lore.remove();
  userInfo.style.display = "block";
  userInfo.innerHTML = localStorage.getItem("username");
  logOut.style.display = "block";
}

logOut.addEventListener("click", () => {
  localStorage.clear();
  setTimeout(() => {
    window.location = 'register.html'
  }, 1000);
});
