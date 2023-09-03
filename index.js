/*
 * @Author: Tobi
 * @Date: 2023-09-03 14:38:22
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-09-03 20:24:12
 * @Description: 
 * @FilePath: \test\index.js
 */
// electron 模块可以用来控制应用的生命周期和创建原生浏览窗口
const { app, BrowserWindow, MessageChannelMain } = require('electron')
const rendererToMain = require('./demo/rendererToMain/main')
const rendererMainTwoWay = require('./demo/rendererMainTwoWay/main')
const mainToRenderer = require('./demo/mainToRenderer/main')


const createWindow = () => {
    const todoList = []

    const rendererToMainWindow = rendererToMain(todoList) // 窗口1. 渲染进程 -> 主进程
    const rendererMainTwoWayWindow = rendererMainTwoWay(todoList) // 窗口2. 渲染进程，主进程双向通信
    const mainToRendererWindow = mainToRenderer() // 窗口3. 主进程 -> 渲染进程

    /** postmessage */
    // 建立通道
    const { port1, port2, port3 } = new MessageChannelMain()
    // webContents准备就绪后，使用postMessage向每个webContents发送一个端口。
    rendererToMainWindow.once('ready-to-show', () => {
        rendererToMainWindow.webContents.postMessage('port', null, [port1])
    })
    mainToRendererWindow.once('ready-to-show', () => {
        mainToRendererWindow.webContents.postMessage('port', null, [port2])
    })
}

// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        // 在 macOS 系统内, 如果没有已开启的应用窗口
        // 点击托盘图标时通常会重新创建一个新窗口
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此, 通常
// 对应用程序和它们的菜单栏来说应该时刻保持激活状态, 
// 直到用户使用 Cmd + Q 明确退出
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

/** 热更新 */
const isDevelopment = !app.isPackaged;
if (isDevelopment) {
    try {
        require('electron-reloader')(module);
    } catch (err) {
        console.log(err)
    }
}