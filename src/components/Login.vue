<template>
  <div class="login_box">
    <div class="login_form">
      <div class="logo">
        <img src="../assets/logo.png" alt />
      </div>
      <!-- 边界到名称的宽度 -->
      <!-- 登入表单 -->
      <el-form label-width="0px" :model="loginForm" :rules="loginRules">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary">登入</el-button>
          <el-button type="info">重置</el-button>
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
      // 表單驗證規則對象
      loginRules: {
        username: [{ required: true, message: '请输入用戶名', trigger: 'blur' }, { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密碼', trigger: 'blur' }, { min: 6, max: 18, message: '密碼长度在 6 到 18 个字符', trigger: 'blur' }]
      }
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
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
