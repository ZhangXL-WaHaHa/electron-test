/*
 * @Author: Tobi
 * @Date: 2023-09-03 14:38:22
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-09-03 15:50:31
 * @Description: 
 * @FilePath: \test\index.js
 */
// electron 模块可以用来控制应用的生命周期和创建原生浏览窗口
const { app, BrowserWindow } = require('electron')
const rendererToMain = require('./demo/rendererToMain/main')
const rendererMainTwoWay = require('./demo/rendererMainTwoWay/main')
const mainToRenderer = require('./demo/mainToRenderer/main')


const createWindow = () => {
    const todoList = []

    rendererToMain(todoList) // 窗口1. 渲染进程 -> 主进程
    rendererMainTwoWay(todoList) // 窗口2. 渲染进程，主进程双向通信
    mainToRenderer() // 窗口3. 主进程 -> 渲染进程
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