<template>
    <el-button type="info" plain @click='logout'>系统退出</el-button>
</template>

<script>
    export default {
        methods:{
            logout(){
             //销毁本地的token
             window.sessionStorage.clear()
             this.$router.push('/login')   
            }
        }
    }
</script>

<style lang='less' scoped>

</style>