const { BrowserWindow, ipcMain } = require('electron')
const path = require('path')

// 渲染进程，主进程（双向）
module.exports = function rendererMainTwoWay(todoList = []) {
    const rendererMainTwoWay = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, './preload.js')
        }
    })
    ipcMain.handle('set-to-do', (event, value) => {
        todoList.push(value)
        return todoList
    })
    rendererMainTwoWay.loadFile('./demo/rendererMainTwoWay/index.html')
    rendererMainTwoWay.webContents.openDevTools() // 打开开发工具
}