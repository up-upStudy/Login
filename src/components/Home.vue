<template>
<!-- 页面的头部 -->
    <el-container class="home_box">
        <!-- 主体区 -->
        <el-header>
            <div>
                <img src="../assets/logo.png" alt="">
                <span>某某公司电商后台管理</span>
            </div>
            <el-button type="info" plain @click='logout'>系统退出</el-button>
        </el-header>
    <el-container>
        <!-- 侧边栏 -->
        <el-aside width="200px">
    <el-menu background-color="#545c64" text-color="#fff"
      active-text-color="#ffd04b" unique-opened>
      <el-submenu :index="item.id+''" v-for="item in menulist" :key="item.id">
        <template slot="title">
          <i :class="iconsObject['125']"></i>
          <span>{{item.authName}}</span>
        </template>
        <!-- 二级菜单 -->
          <el-menu-item index="1-4-1" v-for="subItem in item.children" :key="subItem.id">
              <template slot="title">
          <i class="el-icon-menu"></i>
          <span>{{subItem.authName}}</span>
        </template>
          </el-menu-item>
        </el-submenu>
    </el-menu>
        </el-aside>
        <!-- 右侧内容 -->
    <el-main>Main</el-main>
    </el-container>
    </el-container>   
</template>

<script>
    export default {
        data(){
            return {
                menulist:[], //侧边栏的菜单数据
                iconsObject:{
                    125:"el-icon-s-custom",
                    103:"el-icon-user"
                }
            }
        },
        created(){
            this.getMenuList()
        },
        methods:{
            logout(){
             //销毁本地的token
             window.sessionStorage.clear()
             this.$router.push('/login')   
            },
            //获取菜单列表
            async getMenuList() {
            //get menus
                const {data: res} = await this.$http.get('menus')
                console.log(res);
                if(res.meta.status !== 200) return this.$message.error('获取菜单列表失败')
                this.menulist=res.data
            }
        }
    }
</script>

<style lang='less' scoped>
    .home_box{
        height: 100%;
    }
    .el-header{
        background-color: #373d41;
        display: flex;
        justify-content:space-between;
        align-items: center;
        padding-left:0;
        color: #fff;
        >div{
            display: flex;
            align-items: center;
            span{
                margin-left: 60px;
                font-size: 20px;
            }
            img{
                width:60px;
            }
        }
    }
    .el-aside{
        background-color: #333744;
        .el-menu{
            border-right: 0px;
        }
    }
    .el-main{
        background-color: #eaedf1;
    }
</style>