<template>
<div class="login_box">
  <div class="login_form">
    <div class="logo">
    <img src="../assets/logo.png" alt="">
  </div>
  <!-- 边界到名称的宽度 -->
  <!-- 登入表单 -->
  <el-form label-width="0px">
    <el-form-item>
      <el-input></el-input>
      <el-input></el-input>
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
export default {}
</script>


<style scoped lang="less">
  .login_box{
    height: 100%;
    background-color: #2b4b6b;
  }
  .login_form{
    width:450px;
    height: 300px;
    background-color: #fff;
    border-radius: 4px;
    position: absolute;
    left:50%;
    top:50%;
    transform:translate(-50%,-50%);
  }
  .login_form .logo{
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    width:140px;
    height: 140px;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    background-color: #fff;
    img{
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .login_form .el-form{
    position: absolute;
    bottom: 0;
    padding:0 20px;
    width:100%;
    box-sizing: border-box;
  }
  .btns{
    display: flex;
    justify-content: flex-end;
  }
</style>
