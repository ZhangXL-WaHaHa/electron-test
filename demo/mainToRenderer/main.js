const { app, BrowserWindow, Menu, ipcMain } = require('electron')
const path = require('path')

module.exports = function mainToRenderer() {
  const mainToRenderer = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  const menu = Menu.buildFromTemplate([
    {
      label: app.name,
      submenu: [
        {
          click: () => mainToRenderer.webContents.send('update-counter', 1),
          label: 'Increment'
        },
        {
          click: () => mainToRenderer.webContents.send('update-counter', -1),
          label: 'Decrement'
        }
      ]
    }

  ])
  Menu.setApplicationMenu(menu)
  mainToRenderer.loadFile('./demo/mainToRenderer/index.html')

  ipcMain.on('counter-value', (_event, value) => {
    console.log(value) // will print value to Node console
  })
  mainToRenderer.webContents.openDevTools()
}