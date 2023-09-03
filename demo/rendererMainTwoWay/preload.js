/*
 * @Author: Tobi
 * @Date: 2023-09-03 15:06:54
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-09-03 15:23:12
 * @Description: 
 * @FilePath: \test\demo\rendererMainTwoWay\preload.js
 */
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  setTodo: (title) => ipcRenderer.invoke('set-to-do', title)
})