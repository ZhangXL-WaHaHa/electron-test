/*
 * @Author: Tobi
 * @Date: 2023-09-03 14:15:11
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-09-03 16:07:11
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