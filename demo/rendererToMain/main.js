const { BrowserWindow, ipcMain } = require('electron')
const path = require('path')

// 渲染进程 -> 主进程（单向），可使用replay，on实现双向
module.exports = function rendererToMain(todoList) {
    const rendererToMain = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, './preload.js')
        }
    })
    ipcMain.on('set-title', (event, title) => {
        const webContents = event.sender
        const win = BrowserWindow.fromWebContents(webContents)
        win.setTitle(title)
        event.reply('reply', '主进程发送消息')
    })
    rendererToMain.loadFile('./demo/rendererToMain/index.html')
    rendererToMain.webContents.openDevTools() // 打开开发工具
}