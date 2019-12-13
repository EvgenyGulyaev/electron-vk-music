const { globalShortcut, dialog } = require('electron');

function registerMediaHotKeys(mainWindow) {
  let ret;

  const playPause = () => {
    mainWindow.webContents.executeJavaScript(
      `document.querySelector('.top_audio_player_play').click()`)
  };
  const nextTrack = () => {
    mainWindow.webContents.executeJavaScript(
      `document.querySelector('.top_audio_player_next').click();`)
  };
  const prevTrack = () => {
    mainWindow.webContents.executeJavaScript(
      `document.querySelector('.top_audio_player_prev').click();`)
  };

  ret = globalShortcut.register('MediaPlayPause', playPause);
  if (!ret) {
    dialog.showErrorBox(
      'Cant bind global shortcut',
      'Cant bind MediaPlayPause'
    );
  }

  ret = globalShortcut.register('MediaNextTrack', nextTrack);
  if (!ret) {
    dialog.showErrorBox(
      'Cant bind global shortcut',
      'Cant bind MediaNextTrack'
    );
  }

  ret = globalShortcut.register('MediaPreviousTrack', prevTrack);
  if (!ret) {
    dialog.showErrorBox(
      'Cant bind global shortcut',
      'Cant bind MediaPreviousTrack'
    );
  }
}

module.exports = {
  registerMediaHotKeys
};
