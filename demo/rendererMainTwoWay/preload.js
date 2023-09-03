/*
 * @Author: Tobi
 * @Date: 2023-09-03 15:06:54
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-09-03 20:25:00
 * @Description: 
 * @FilePath: \test\demo\rendererMainTwoWay\preload.js
 */
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  setTodo: (title) => ipcRenderer.invoke('set-to-do', title)
})

ipcRenderer.on('port', e => {
  // 接收到端口，使其全局可用。
  window.electronMessagePort = e.ports[0]

  window.electronMessagePort.onmessage = messageEvent => {
    console.log('收到主进程消息', messageEvent)
    // 处理消息
  }
})