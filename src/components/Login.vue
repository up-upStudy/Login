<template>
  <div class="login_box">
    <div class="login_form">
      <div class="logo">
        <img src="../assets/logo.png" alt />
      </div>
      <!-- 边界到名称的宽度 -->
      <!-- 登入表单 ref引用-->
      <el-form ref="loginFormRef" label-width="0px" :model="loginForm" :rules="loginRules">
      <!-- Form 组件提供了表单验证的功能，只需要通过 rules 属性传入约定的验证规则，
      并将 Form-Item 的 prop 属性设置为需校验的字段名即可。 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登入</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 登入表单，数据绑定对象
      loginForm: {
        username: 'lisi',
        password: '123456'
      },
      // 表单验证规则对象
      loginRules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }, { min: 3, max: 15, message: '用户名长度在 3 到 15 个字符', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }, { min: 6, max: 18, message: '密码长度在 6 到 18 个字符', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 重置表单
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields()
    },
    // 登入
    login () {
      this.$refs.loginFormRef.validate(async (vaild) => {
        if (!vaild) return
        // 发请求，data：res写一个别名
        const { data: res } = await this.$http.post('login',this.loginForm)
        if (res.meta.status !== 200) return this.$message({
          message:'登入失败',
          type:'error'
        })
        this.$message.success('登入成功')
        // 把token保存起来
        window.sessionStorage.setItem('token', res.data.token)
        // 跳转主页
        this.$router.push('/home')
      })
    }
  }
}
</script>


<style scoped lang="less">
.login_box {
  height: 100%;
  background-color: #2b4b6b;
}
.login_form {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 4px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.login_form .logo {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 140px;
  height: 140px;
  border-radius: 50%;
  padding: 10px;
  /* 在元素框架上添加阴影 x y偏移量 阴影模糊半径 阴影扩散半径*/
  box-shadow: 0 0 10px #ddd;
  background-color: #fff;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
.login_form .el-form {
  position: absolute;
  bottom: 0;
  padding: 0 20px;
  width: 100%;
  /* 计算一个元素的总宽度和总高度
  border-box 总宽度包含padding和border，不包含margin
   */
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
