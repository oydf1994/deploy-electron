<template>
    <div>
        <el-dialog title="添加应用" :visible.sync="dialogVisible" width="500px" :before-close="$handleClose"
            :close-on-click-modal="false" destroy-on-close top="20px">
            <el-form :label-position="labelPosition" label-width="140px" :model="form" ref="form">
                <el-form-item label="项目名称" prop="name" :rules="required">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="服务器地址" prop="location" :rules="required">
                    <el-input v-model="form.location"></el-input>
                </el-form-item>
                <el-form-item label="服务器账号" prop="password" :rules="required">
                    <el-input v-model="form.ssh"></el-input>
                </el-form-item>
                <el-form-item label="服务器密码" prop="password" :rules="required">
                    <el-input v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item label="服务器部署地址" prop="addressServer" :rules="required">
                    <el-input v-model="form.addressServer"></el-input>
                </el-form-item>
                <el-form-item label="本地项目打包地址" prop="addressLocal" :rules="required">
                    <el-input v-model="form.addressLocal" placeholder="选择打包后index,html文件所在目录" readonly>
                        <el-button slot="append" icon="el-icon-search" @click="openFile"></el-button>
                        <input type="file" id="file" v-show="false" slot="append" @change="selPath">
                    </el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="add">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                labelPosition: 'right',
                form: {},
                dialogVisible: false,
                required: [{
                    required: true,
                    message: '请输入必填字段',
                    trigger: 'blur'
                }]
            };
        },
        computed: {

        },
        created() {

        },
        mounted() {

        },
        watch: {

        },
        methods: {
            selPath(e) {
                var path = e.target.files[0].path.replace(e.target.files[0].name, '');
                this.$set(this.form, 'addressLocal', path)
                console.log(this.form.addressLocal)
            },
            openFile() {
                console.log(document.querySelector('#file'))
                document.querySelector('#file').click()
            },
            add() {
                this.$refs.form.validate(valid => {
                    if (valid) {
                        this.$api.post('/item/add', this.form).then(res => {
                            this.dialogVisible = false
                            this.$emit('upList')
                        })
                    }
                })
            },
            open(item) {
                this.form = item
                this.dialogVisible = true
            }
        },
        components: {

        },
    };
</script>

<style scoped lang="less">
</style>