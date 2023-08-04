function lightTheme() {
  document.documentElement.classList.remove("system-theme");
  document.documentElement.classList.add("light-theme");
  document.documentElement.classList.remove("dark-theme");
  localStorage.setItem("theme", "light");
}

function darkTheme() {
  document.documentElement.classList.remove("system-theme");
  document.documentElement.classList.add("dark-theme");
  localStorage.setItem("theme", "dark");
}

function systemTheme() {
  console.log("systemTheme");
  document.documentElement.classList.remove("light-theme");
  document.documentElement.classList.remove("dark-theme");
  document.documentElement.classList.remove("system-theme");
  document.documentElement.classList.add("system-theme");
  localStorage.clear();
}

document.querySelectorAll(".light-theme-button").forEach((button) =>
  button.addEventListener("click", () => {
    lightTheme();
    toggleThemeMenu();
  })
);

document.querySelectorAll(".dark-theme-button").forEach((button) =>
  button.addEventListener("click", () => {
    darkTheme();
    toggleThemeMenu();
  })
);

document.querySelectorAll(".system-theme-button").forEach((button) =>
  button.addEventListener("click", () => {
    systemTheme();
    toggleThemeMenu();
  })
);

let preference = window.matchMedia("(prefers-color-scheme: dark)");
if (localStorage.getItem("theme") === "light") {
  lightTheme();
} else if (localStorage.getItem("theme") === "dark") {
  darkTheme();
}

function hideThemeMenuDropDownResizeScroll(event) {
  toggleThemeMenu();
}

function hideThemeMenuDropDownClick(event) {
  if (
    !document
      .querySelector("#theme-dropdown-container")
      .contains(event.target)
  ) {
    toggleThemeMenu();
  }
}

function _toggleThemeMenu() {
  let menuIcon = document
    .getElementById("theme-switch-button")
    .querySelector("i");
  let menu = document.querySelector(
    "#theme-dropdown-container .dropdown-menu"
  );
  if (menu.style.display !== "block") {
    menuIcon.style.color = "var(--fg-secondary)";
    menu.style.display = "block";
    window.addEventListener("click", hideThemeMenuDropDownClick);
    window.addEventListener("resize", hideThemeMenuDropDownResizeScroll);
    window.addEventListener("scroll", hideThemeMenuDropDownResizeScroll);
  } else {
    window.removeEventListener("click", hideThemeMenuDropDownClick);
    window.removeEventListener("resize", hideThemeMenuDropDownResizeScroll);
    window.removeEventListener("scroll", hideThemeMenuDropDownResizeScroll);
    menu.removeAttribute("style");
    menuIcon.removeAttribute("style");
  }
}

function toggleThemeMenu() {
  _toggleThemeMenu();
}

async function copyCode(block, copyButton) {
  let text = block.innerText;
  await navigator.clipboard.writeText(text);
  // let para = copyButton.querySelector("p");
  let icon = copyButton.querySelector("i");
  icon.classList = "nf nf-oct-check";
  // para.style.display="block";
  setTimeout(
    (copyButton) => {
      // let para = copyButton.querySelector("p");
      let icon = copyButton.querySelector("i");
      icon.classList = "nf nf-md-clipboard_text_outline";
      // para.removeAttribute("style")
    },
    500,
    copyButton
  );
}

function addClipboardItems() {
  let blocks = document.querySelectorAll(".copy-code");
  for (var i = 0; i < blocks.length; i++) {
    if (navigator.clipboard) {
      let block = blocks[i].querySelector(".mono");
      let copyButton = blocks[i].querySelector("button");
      copyButton.addEventListener("click", async () => {
        await copyCode(block, copyButton);
      });
    }
  }
}

addClipboardItems();

document
  .getElementById("theme-switch-button")
  .addEventListener("click", toggleThemeMenu);
