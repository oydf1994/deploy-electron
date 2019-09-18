<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">一键部署系统</div>
      <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
        <el-form-item prop="name">
          <el-input v-model="param.name" placeholder="请输入用户名">
            <el-button slot="prepend" icon="iconfont iconyonghu"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input type="password" placeholder="请输入密码" v-model="param.pwd" @keyup.enter.native="submitForm()">
            <el-button slot="prepend" icon="iconfont iconmima"></el-button>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm()">登录</el-button>
        </div>
        <p class="login-tips">Tips : 初次登陆即注册。</p>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        param: {
          name: '',
          pwd: '',
        },
        rules: {
          name: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }],
          pwd: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }],
        },
      };
    },
    methods: {
      submitForm() {
        this.$refs.login.validate(valid => {
          if (valid) {
            this.$api.post('/user/login', this.param).then(res => {
              if (res) {
                this.$api.success('登陆成功')
                // this.$cookies.set('user', res)
                window.localStorage.setItem('user', JSON.stringify(res))
                this.$router.push('/home')
              }
            })
          }
        });
      }
    },
  };
</script>

<style scoped>
  .login-wrap {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-image: url('./../assets/images/back.jpg');
    background-size: 100%;
  }

  .ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
  }

  .ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
  }

  .ms-content {
    padding: 30px 30px;
  }

  .login-btn {
    text-align: center;
  }

  .login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
  }

  .login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
  }
</style>