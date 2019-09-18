import store from './store'
var start = async (item) => {
    const fs = require('fs')
    const path = require('path')
    const zipper = require('zip-local')
    const shell = require('shelljs')
    const node_ssh = require('node-ssh')
    let SSH = new node_ssh()
    shell.config.execPath = path.join('C:', 'Program Files', 'nodejs', 'node.exe')
    const config = {
        SERVER_PATH: item.location, // ssh地址
        SSH_USER: item.ssh, // ssh 用户名
        SSH_KEY: item.password, // ssh 密码 
        PATH: item.addressServer, // 服务器文件夹地址
        distDir: path.resolve(item.addressLocal), // 打包文件夹
        distZipPath: path.resolve(item.addressLocal, 'dist.zip') // 打包压缩文件地址,
    }
    // loggs
    // 文件夹位置
    const compileDist = async () => {
        // 进入本地文件夹 执行命令
        store.commit("setPrompt", '即将进入目标文件夹')
        shell.cd(path.resolve(config.distDir, '../'))
        store.commit("setPrompt", '进入目标文件夹')
        store.commit("setPrompt", path.resolve(config.distDir, '../'))
        store.commit("setPrompt", '开始编译')
        shell.exec(`npm run build`)
        store.commit("setPrompt", '编译完成')
    }
    // ********* 压缩dist 文件夹 *********
    const zipDist = async () => {
        try {
            if (fs.existsSync(config.distZipPath)) {
                store.commit("setPrompt", 'dist.zip已经存在, 即将删除压缩包')
                fs.unlinkSync(config.distZipPath)
            } else {
                store.commit("setPrompt", '即将开始压缩zip文件')
            }
            await zipper.sync.zip(config.distDir).compress().save(config.distZipPath);
            store.commit("setPrompt", '文件夹压缩成功')
        } catch (error) {
            store.commit("setPrompt", error)
            store.commit("setPrompt", '压缩dist文件夹失败')
        }
    }
    // ********* 连接ssh *********
    const connectSSh = async () => {
        store.commit("setPrompt", `尝试连接服务： ${config.SERVER_PATH}`)
        try {
            await SSH.connect({
                host: config.SERVER_PATH,
                username: config.SSH_USER,
                password: config.SSH_KEY
            })
            store.commit("setPrompt", 'SSH 连接成功')
        } catch (error) {
            store.commit("setPrompt", 'SSH 连接失败');
        }
    }
    // ********* 执行清空线上文件夹指令 *********
    const runCommond = async (commond) => {
        const result = await SSH.exec(commond, [], { cwd: config.PATH })
        store.commit("setPrompt", result)
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
            store.commit("setPrompt", "完成上传, 开始解压")
            await runCommond('unzip ./dist.zip')
            await runCommond('rm  ./dist.zip')
        } catch (error) {
            store.commit("setPrompt", '上传失败')
        }
    }
    // ********* 发布程序 *********
    const runTask = async () => {
        await compileDist()
        await zipDist()
        await uploadZipBySSH()
        store.commit("setPrompt", '发布完成!')
        // defaultLog('开始清理压缩包')
        await fs.unlinkSync(config.distZipPath)
        store.commit("setPrompt", '清理完成!')
        SSH.dispose()
        // exit process
        // process.exit(1)
    }
    runTask()
}
export default start