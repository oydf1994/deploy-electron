<template>
    <div class="home">
        <el-row :gutter="10">
            <el-col :span="12" v-for="item in list" :key="item.id">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>{{item.name}}</span>
                        <el-link type="primary" class="btn" @click="deploy(item)">发布</el-link>
                        <el-link type="primary" class="btn" @click="edit(item)">编辑</el-link>
                        <el-link type="danger" class="btn" @click="del(item.id)">删除</el-link>
                    </div>
                    <div class="text item">
                        服务地址: {{item.location }}
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <div class="add">
            <el-button type="primary" @click="add">添加应用</el-button>
            <el-button type="primary" @click="$router.push('/')">退出登录</el-button>
        </div>
        <addApp ref="addApp" @upList="getList"></addApp>
        <el-dialog title="发布中" :visible.sync="dialogVisible" width="400px" :before-close="$handleClose" top="10px"
            :close-on-click-modal="false" destroy-on-close class="dialog">
            <div class="textList" id="textList">
                <div v-for="(item,index) in textList" :key="index" v-html="item"></div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import addApp from './addApp.vue'
    import bus from "../../main/bus";
    const ipcRenderer = require('electron').ipcRenderer;
    // @ is an alias to /src
    export default {
        name: 'home',
        data() {
            return {
                list: [],
                ele: null,
                textList: ['***开始发布***'],
                dialogVisible: false,
            }
        },
        components: {
            addApp
        },
        computed: {
            text() {
                return this.$store.state.Prompt
            }
        },
        created() {
            ipcRenderer.on('msg', (event, arg) => {
                arg.trim().split('\n').forEach((v, i) => {
                    this.textList.push(v)
                })
                this.ele.scrollTop = this.ele.scrollHeight;
            });
            this.getList()
        },
        methods: {
            add() {
                this.$refs.addApp.open({})
            },
            del(id) {
                this.$confirm('此操作将永久删除该应用, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$api.get('/item/del', {
                        id: id
                    }).then(res => {
                        if (res) {
                            this.$api.success('删除成功')
                            this.getList()
                        }
                    })
                }).catch(() => {})

            },
            getList() {
                this.$api.get('/item/list').then(res => {
                    if (res) {
                        this.list = res
                    }
                })
            },
            edit(item) {
                this.$refs.addApp.open(item)
            },
            deploy(item) {
                this.textList = ['***开始发布***']
                this.dialogVisible = true
                setTimeout(() => {
                    this.ele = document.getElementById('textList');
                    ipcRenderer.send('message', item);
                }, 1000)
                // this.start(item)
            }
        }
    }
</script>
<style scoped>
    .home {
        width: 100%;
    }

    .btn {
        float: right;
    }

    .el-link+.el-link {
        margin-right: 10px;
    }

    .add {
        margin-top: 10px;
        text-align: center;
    }

    .textList {
        height: 400px;
        overflow-y: auto;
        background: rgba(0, 0, 0, .3);
        color: #582424;
        padding: 10px;
    }

    .home>>>.el-dialog__header {
        padding: 10px;
    }

    .home>>>.el-dialog__body {
        padding: 10px;
    }
</style>