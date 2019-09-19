<template>
    <div>
        <el-dialog title="添加应用" :visible.sync="dialogVisible" width="500px" :before-close="$handleClose"
            :close-on-click-modal="false" destroy-on-close top="20px">
            <el-form :label-position="labelPosition" label-width="130px" :model="form" ref="form">
                <el-form-item label="项目名称" prop="name" :rules="required">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="服务器地址" prop="location" :rules="required">
                    <el-input v-model="form.location"></el-input>
                </el-form-item>
                <el-form-item label="服务器账号" prop="ssh" :rules="required">
                    <el-input v-model="form.ssh"></el-input>
                </el-form-item>
                <el-form-item label="服务器密码" prop="password" :rules="required">
                    <el-input v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item label="服务器部署地址" prop="addressServer" :rules="required">
                    <el-input v-model="form.addressServer"></el-input>
                </el-form-item>
                <el-form-item label="本地项目地址" prop="addressLocal" :rules="required">
                    <el-input v-model="form.addressLocal"></el-input>
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