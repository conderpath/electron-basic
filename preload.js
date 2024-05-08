const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('_w', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  platform: process.platform
})