### 通过预加载文件暴露属性方法给渲染子进程

```java
// 1.使用预加载脚本preload
const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        // 加载预加载文件
        preload: path.resolve(__dirname, './preload.js')
    }
})
// 2. 预加载脚本中暴露属性方法
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
 // 3.子进程访问暴露的属性和方法
  console.log(_w.platform)
```



### 主进程和子进程通信

1. 主进程进行监听

   ```javascript
   app.whenReady().then(() => {
     // 通过ipcMain.handle监听渲染器进程发送过来的消息，并返回渲染器进程
     ipcMain.handle('send', (event, msg) => {
       console.log(msg) // send to main
       return 'main back' // 告知子进程
     })
   })
   ```

   

2. 预加载脚本暴露通讯函数

   ```javascript
   const { contextBridge, ipcRenderer } = require('electron')
   // 暴露变量和方法给预渲染器,调用ipcRenderer.invoke方法
   contextBridge.exposeInMainWorld('_w', {
     // 定义主进程和子进程通信方法
     send: msg => ipcRenderer.invoke('send', msg)
   })
   ```

   

3. 子进程发送消息

   ```javascript
   document.getElementById('btn').onclick = async function () {
       // 调用预加载函数暴露的方法进行通信
     const res = await _w.send('send to main')
     console.log(`back from main：${res}`) // main back
   }
   ```

   
