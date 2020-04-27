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
        <el-aside :width="isCollapse ? '64px' : '200px'">
            <div class="toggle-button" @click="toggleCollapse">|||</div>
    <el-menu background-color="#545c64" text-color="#fff"
      active-text-color="#409eff" unique-opened :collapse="isCollapse" :collapse-transition="false" :router="true">
      <el-submenu :index="item.id+''" v-for="item in menulist" :key="item.id">
        <template slot="title">
          <i :class="iconsObject[item.id]"></i><!-- 动态绑定 -->
          <span>{{item.authName}}</span>
        </template>
        <!-- 二级菜单 -->
          <el-menu-item :index="subItem.path+''" v-for="subItem in item.children" :key="subItem.id">
              <template slot="title">
          <i class="el-icon-menu"></i>
          <span>{{subItem.authName}}</span>
        </template>
          </el-menu-item>
        </el-submenu>
    </el-menu>
        </el-aside>
        <!-- 右侧内容 -->
    <el-main>
        <router-view></router-view>
    </el-main>
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
                    103:"el-icon-user",
                    101:"el-icon-goods",
                    102:"el-icon-s-order",
                    145:"el-icon-s-data"
                },
                isCollapse:false
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
                if(res.meta.status !== 200) return this.$message.error('获取菜单列表失败')
                this.menulist=res.data
            },
            toggleCollapse(){
                this.isCollapse=!this.isCollapse
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
        width:"200px";
        background-color: #333744;
        .el-menu{
            border-right: 0px;
        }
    }
    .toggle-button{
        background-color: #4a5046;
        color: #fff;
        text-align: center;
        font-size: 10px;
        cursor: pointer;
        line-height: 24px;
        letter-spacing: 0.2em;
    }
    .el-main{
        background-color: #eaedf1;
    }
</style>