/*
 * @Author: Tobi
 * @Date: 2023-09-03 15:06:54
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-09-03 20:22:44
 * @Description: 
 * @FilePath: \test\demo\mainToRenderer\preload.js
 */
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  handleCounter: (callback) => ipcRenderer.on('update-counter', callback)
})

ipcRenderer.on('port', e => {
  // 接收到端口，使其全局可用。
  window.electronMessagePort = e.ports[0]

  window.electronMessagePort.onmessage = messageEvent => {
    console.log('收到主进程消息', messageEvent)
    // 处理消息
  }
})