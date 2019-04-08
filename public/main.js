const electron = require("electron");
const { app } = electron;
const { BrowserWindow } = electron;
const path = require("path");
const isDev = require("electron-is-dev");
const { ipcMain } = electron;
let windowOne;
let windowTwo;

function createWindow() {
  windowOne = new BrowserWindow({ width: 900, height: 680 });
  windowTwo = new BrowserWindow({ width: 900, height: 680 });

  console.log('here');

  windowOne.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  windowTwo.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  windowOne.on("closed", () => (windowOne = null));
  windowTwo.on("closed", () => (windowOne = null));
}

ipcMain.on('send-message', (event, msg) => {
  event.sender.id === 1 ?
    windowTwo.webContents.send('transport-message', msg)
    :
    windowOne.webContents.send('transport-message', msg);
});

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (windowOne === null) {
    createWindow();
  }
});