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
  }),
);

document.querySelectorAll(".dark-theme-button").forEach((button) =>
  button.addEventListener("click", () => {
    darkTheme();
    toggleThemeMenu();
  }),
);

document.querySelectorAll(".system-theme-button").forEach((button) =>
  button.addEventListener("click", () => {
    systemTheme();
    toggleThemeMenu();
  }),
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
    "#theme-dropdown-container .dropdown-menu",
  );
  if (menu.style.display !== "block") {
    menuIcon.style.color = "var(--fg-secondary)";
    menu.style.display = "block";
    window.addEventListener("click", hideThemeMenuDropDownClick);
    window.addEventListener(
      "resize",
      hideThemeMenuDropDownResizeScroll,
    );
    window.addEventListener(
      "scroll",
      hideThemeMenuDropDownResizeScroll,
    );
  } else {
    window.removeEventListener("click", hideThemeMenuDropDownClick);
    window.removeEventListener(
      "resize",
      hideThemeMenuDropDownResizeScroll,
    );
    window.removeEventListener(
      "scroll",
      hideThemeMenuDropDownResizeScroll,
    );
    menu.removeAttribute("style");
    menuIcon.removeAttribute("style");
  }
}

function toggleThemeMenu() {
  _toggleThemeMenu();
}

async function copyDetails(block, copyButton) {
  let details = block.innerText;
  await navigator.clipboard.writeText(details);
  // let icon = copyButton.querySelector("i");
  // icon.classList = "nf nf-oct-check";
  // setTimeout(
  //   (copyButton) => {
  //     let icon = copyButton.querySelector("i");
  //     icon.classList = "nf nf-oct-copy";
  //   },
  //   200,
  //   copyButton,
  // );
}

// async function buttonFeedback(linkButton) {
//   let icon = linkButton.querySelector("i");
//   let original = icon.classList;
//   icon.classList = "nf nf-oct-check";
//   setTimeout(
//     (linkButton) => {
//       let icon = linkButton.querySelector("i");
//       icon.classList = original;
//     },
//     200,
//     linkButton,
//   );
// }

function addClipboardItems() {
  let blocks = document.querySelectorAll(".details");
  for (var i = 0; i < blocks.length; i++) {
    if (navigator.clipboard) {
      let displayField = blocks[i].querySelector(".display-details");
      let copyButton = blocks[i].querySelector(".copy-details");
      copyButton.addEventListener("click", async () => {
        await copyDetails(displayField, copyButton);
      });
    }
  }
}

// function addLinkFeedback() {
//   let blocks = document.querySelectorAll(".link-details");
//   for (var i = 0; i < blocks.length; i++) {
//     let linkButton = blocks[i].querySelector("span");
//     console.log(linkButton);
//     linkButton.addEventListener("click", async () => {
//       await buttonFeedback(blocks[i]);
//     });
//   }
// }

addClipboardItems();
// addLinkFeedback();

document
  .getElementById("theme-switch-button")
  .addEventListener("click", toggleThemeMenu);
