const path = require('path');
const { app, BrowserWindow, dialog, webContents } = require('electron');
const hotkeys = require('./utils/hotkeys');
let mainWindow;

function createWindow() {
  const windowStateKeeper = require('electron-window-state');
  let mainWindowState = windowStateKeeper({
    defaultWidth: 1024,
    defaultHeight: 768
  });

  mainWindow = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    webPreferences: {
      preload: path.join(__dirname, 'renderer.js'),
      nodeIntegration: false
    }
  });

  mainWindowState.manage(mainWindow);

  mainWindow.loadURL('https://vk.com/audios51392005?section=recoms');
  // mainWindow.webContents.openDevTools()
  hotkeys.registerMediaHotKeys(mainWindow);

  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  mainWindow.webContents.on('crashed', err => {
    const options = {
      type: 'info',
      title: 'Error',
      message: `Error message: ${err}`,
      buttons: ['Close']
    };
    dialog.showMessageBox(options, index => {
      mainWindow.close();
    });
  });
}

process.on('uncaughtException', function(error) {
  console.error('err!:', error);
});

app.on('ready', createWindow);

app.on('window-all-closed', function() {
  app.quit();
});

app.on('activate', function() {
  if (mainWindow === null) createWindow();
});
