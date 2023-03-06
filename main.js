const { app, BrowserWindow } = require("electron");
const path = require("path");

const isMac = process.platform === "darwin";

const createMainWindow = () => {
  const mainWindow = new BrowserWindow({
    title: "Photon",
    width: 800,
    height: 600,
    frame: false
  });

  mainWindow.loadFile("./renderer/index.html");
};

app.whenReady().then(() => {
  createMainWindow();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === "0") {
    createMainWindow();
  }
});

app.on("window-all-closed", () => {
  if (!isMac) {
    app.quit();
  }
});
