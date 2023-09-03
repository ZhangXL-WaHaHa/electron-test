/*
 * @Author: Tobi
 * @Date: 2023-09-03 15:06:54
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-09-03 15:37:45
 * @Description: 
 * @FilePath: \test\demo\mainToRenderer\preload.js
 */
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  handleCounter: (callback) => ipcRenderer.on('update-counter', callback)
})