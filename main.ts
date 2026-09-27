import { app, BrowserWindow, screen } from "electron";
import path from "path";

let mainWindow;
function createWind() {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width: screenWidth, height: screenHeight } =
    primaryDisplay.workAreaSize;
  mainWindow = new BrowserWindow({
    x: screenWidth - 170,
    y: screenHeight - 300,
    width: 300,
    height: 300,
    movable: true,
    resizable: true,
    closable: true,
    frame: false,
    titleBarStyle: "hidden",
    alwaysOnTop: true,
    transparent: true,
    skipTaskbar: true,
    type: "toolbar",

    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });
  mainWindow.webContents.session.setPermissionRequestHandler(
    (webContents, permission, callback) => {
      if (permission === "media") {
        return callback(true);
      }
      callback(false);
    },
  );
  const startUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5173"
      : `file://${path.join(__dirname, "dist/index.html")}`;
  mainWindow.loadURL(startUrl);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWind);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWind();
  }
});
