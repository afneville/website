function enableStylesheet(node) {
  node.rel = "stylesheet";
}

function disableStylesheet(node) {
  node.rel = "stylesheet alternate";
}

function lightTheme() {
  var light_stylesheet = document.getElementById("light-stylesheet");
  var dark_stylesheet = document.getElementById("dark-stylesheet");
  disableStylesheet(dark_stylesheet);
  enableStylesheet(light_stylesheet);
  // var moon = document.createElement("i");
  // moon.classList = "fa-solid fa-moon";
  // var themeButton = document.getElementById("theme-switch-button");
  // themeButton.innerHTML = null;
  // themeButton.appendChild(moon);
}

function darkTheme() {
  var light_stylesheet = document.getElementById("light-stylesheet");
  var dark_stylesheet = document.getElementById("dark-stylesheet");
  disableStylesheet(light_stylesheet);
  enableStylesheet(dark_stylesheet);
  // var sun = document.createElement("i");
  // sun.classList = "fa-regular fa-sun";
  // var themeButton = document.getElementById("theme-switch-button");
  // themeButton.innerHTML = null;
  // themeButton.appendChild(sun);
}

function switchTheme() {
  var light_stylesheet = document.getElementById("light-stylesheet");
  if (light_stylesheet.rel === "stylesheet alternate") {
    lightTheme();
  } else {
    darkTheme();
  }
}

document
  .getElementById("theme-switch-button")
  .addEventListener("click", switchTheme);

const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
if (systemTheme.matches) {
  darkTheme();
}
