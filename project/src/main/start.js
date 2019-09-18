const fs = require('fs')
const path = require('path')
const zipper = require('zip-local')
const shell = require('shelljs')
const node_ssh = require('node-ssh')
let SSH = new node_ssh()
shell.config.execPath = path.join('C:', 'Program Files', 'nodejs', 'node.exe')
var start = (item, mainWindow) => {
    let config = item
    // 文件夹位置
    const compileDist = async () => {
        // 进入本地文件夹 执行命令
        mainWindow.webContents.send('msg', '开始编译')
        shell.cd(path.resolve(config.distDir, '../'))
        shell.exec(`npm run build`)
        mainWindow.webContents.send('msg', '编译完成')
    }
    // ********* 压缩dist 文件夹 *********
    const zipDist = async () => {
        try {
            if (fs.existsSync(config.distZipPath)) {
                mainWindow.webContents.send('msg', 'dist.zip已经存在, 即将删除压缩包')
                fs.unlinkSync(config.distZipPath)
            } else {
                mainWindow.webContents.send('msg', '即将开始压缩zip文件')
            }
            await zipper.sync.zip(config.distDir).compress().save(config.distZipPath);
            mainWindow.webContents.send('msg', '文件夹压缩成功')
        } catch (error) {
            mainWindow.webContents.send('msg', error)
            mainWindow.webContents.send('msg', '压缩dist文件夹失败')
        }
    }
    // ********* 连接ssh *********
    const connectSSh = async () => {
        mainWindow.webContents.send('msg', `尝试连接服务： ${config.SERVER_PATH}`)
        // let spinner = ora('正在连接')
        try {
            await SSH.connect({
                host: config.SERVER_PATH,
                username: config.SSH_USER,
                password: config.SSH_KEY
            })
            mainWindow.webContents.send('msg', 'SSH 连接成功')
        } catch (error) {
            mainWindow.webContents.send('msg', err)
            mainWindow.webContents.send('msg', 'SSH 连接失败');
        }
    }
    // ********* 执行清空线上文件夹指令 *********
    const runCommond = async (commond) => {
        const result = await SSH.exec(commond, [], { cwd: config.PATH })
        mainWindow.webContents.send('msg', result)
    }
    const commonds = [`ls`, `rm -rf *`]
    // ********* 执行清空线上文件夹指令 *********
    const runBeforeCommand = async () => {
        for (let i = 0; i < commonds.length; i++) {
            await runCommond(commonds[i])
        }
    }
    // ********* 通过ssh 上传文件到服务器 *********
    const uploadZipBySSH = async () => {
        // 连接ssh
        await connectSSh()
        // 执行前置命令行
        await runBeforeCommand()
        // 上传文件
        // let spinner = ora('准备上传文件').start()
        try {
            await SSH.putFile(config.distZipPath, config.PATH + '/dist.zip')
            mainWindow.webContents.send('msg', "完成上传, 开始解压")
            await runCommond('unzip ./dist.zip')
            await runCommond('rm  ./dist.zip')
        } catch (error) {
            mainWindow.webContents.send('msg', error)
            mainWindow.webContents.send('msg', '上传失败')
        }
    }
    // ********* 发布程序 *********
    // ********* 发布程序 *********
    const runTask = async () => {
        await compileDist()
        await zipDist()
        await uploadZipBySSH()
        mainWindow.webContents.send('msg', '发布完成!')
        mainWindow.webContents.send('msg', '开始清理压缩包')
        await fs.unlinkSync(config.distZipPath)
        mainWindow.webContents.send('msg', '清理完毕!')
        SSH.dispose()
        // exit process
        // process.exit(1)
    }
    runTask()
}
export default start