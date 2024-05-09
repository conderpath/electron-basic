const { app, BrowserWindow, ipcMain } = require('electron')
const WinState = require('electron-win-state').default
const path = require('path')
const winState = new WinState({
  defaultWidth: 800,
  defaultHeight: 600,
})
const createWindow = () => {
  const win = new BrowserWindow({
    ...winState.winOptions,

    webPreferences: {
      preload: path.resolve(__dirname, './preload.js')
    }
  })
  win.loadFile('index.html')
  // 打开开发者工具控制台
  const webContents = win.webContents
  webContents.openDevTools()
  // 打开的窗口使用winState进行管理
  winState.manage(win)
}

app.whenReady().then(() => {
  createWindow()
  console.log(12312)
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
  // 监听渲染器进程发送过来的消息，并返回渲染器进程
  ipcMain.handle('send', (event, msg) => {
    console.log(msg)
    return 'main back'
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

