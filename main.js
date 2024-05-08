const { app, BrowserWindow } = require('electron')
const path = require('path')
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.resolve(__dirname, './preload.js')
    }
  })
  win.loadFile('index.html')
  // 打开开发者工具控制台
  win.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow()
  console.log(12312)
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})