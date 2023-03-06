const { ipcRenderer } = require("electron");

const closeApp = document.getElementById("closeBtn");
closeApp.addEventListener("click", () => {
  ipcRenderer.send("close-app");
});
