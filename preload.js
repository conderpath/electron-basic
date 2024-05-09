const { contextBridge, ipcRenderer } = require('electron')
// 暴露变量和方法给预渲染器
contextBridge.exposeInMainWorld('_w', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  platform: process.platform,
  // 定义主进程和子进程通信方法
  send: msg => ipcRenderer.invoke('send', msg)
})