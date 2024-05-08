const fs = require('fs')
console.log(fs)

const { contextBridge } = require('electron')
const { platform } = require('os')

contextBridge.exposeInMainWorld('_preData', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  platform: process.env.platform
})