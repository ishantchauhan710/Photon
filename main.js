const { app, BrowserWindow, ipcMain, desktopCapturer } = require("electron");


const isMac = process.platform === "darwin";

const createMainWindow = () => {
  const mainWindow = new BrowserWindow({
    title: "Photon",
    width: 800,
    height: 600,
    frame: false,
    resizable: false,
    nodeIntegration: true,
    contextIsolation: false,
    enableRemoteModule: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
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

ipcMain.on("close-app", (evt, arg) => {
  app.quit();
});

ipcMain.on("screenshot-app", (evt, arg) => {
  
});
