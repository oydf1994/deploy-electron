import { app, BrowserWindow } from 'electron'
import start from './start'
const ipcMain = require('electron').ipcMain;
const path = require('path')
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}
//   start({
//     SERVER_PATH: "116.62.150.59", // ssh地址
//     SSH_USER: "root", // ssh 用户名
//     SSH_KEY: "Qq573027166", // ssh 密码 
//     PATH: '/www/wwwroot/admin/dist', // 服务器文件夹地址
//     distDir: path.resolve('F:\\CODE\\itemrepos\\youpinku\\front\\admin\\dist'), // 打包文件夹
//     distZipPath: path.resolve('F:\\CODE\\itemrepos\\youpinku\\front\\admin\\dist', 'dist.zip') // 打包压缩文件地址,
//   })  //接收窗口传来的消息
// }, 2000)  
let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000
  })
  mainWindow.webContents.openDevTools()
  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
ipcMain.on('message', function (event, item) {
  let config = {
    SERVER_PATH: item.location, // ssh地址
    SSH_USER: item.ssh, // ssh 用户名
    SSH_KEY: item.password, // ssh 密码 
    PATH: item.addressServer, // 服务器文件夹地址
    distDir: path.resolve(item.addressLocal), // 打包文件夹
    distZipPath: path.resolve(item.addressLocal, 'dist.zip') // 打包压缩文件地址,
  }
  start(config, mainWindow)
});
/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
