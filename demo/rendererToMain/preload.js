/*
 * @Author: Tobi
 * @Date: 2023-09-03 14:15:11
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-09-03 20:25:09
 * @Description: 
 * @FilePath: \test\demo\rendererToMain\preload.js
 */
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  setTitle: (title) => ipcRenderer.send('set-title', title),
})
ipcRenderer.on('reply', (event, message) => {
  console.info(message)
})

ipcRenderer.on('port', e => {
  console.log('收到主进程消息', e)
  // 接收到端口，使其全局可用。
  window.electronMessagePort = e.ports[0]

  window.electronMessagePort.onmessage = messageEvent => {
    console.log('收到主进程消息', messageEvent)
    // 处理消息
  }
})