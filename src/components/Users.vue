<template>
<div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
        <el-row :gutter=20>
            <el-col :span="8">
                <el-input placeholder="请输入内容" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </el-col>
            <el-col :span="4">
                <el-button type="primary">添加用户</el-button>
            </el-col>
        </el-row> 
    <el-table :data="userlist" border>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="username" label="姓名" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column label="状态">
        <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state">
            </el-switch>
        </template>
        </el-table-column>
        <el-table-column label="操作">
            <template>
            <el-tooltip content="修改" placement="top" :enterable="false">
                <el-button type="primary" icon="el-icon-edit" circle></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top" :enterable="false">
                <el-button type="danger" icon="el-icon-delete" circle></el-button>
            </el-tooltip>
            <el-tooltip content="设置" placement="top" :enterable="false">
                <el-button type="primary" icon="el-icon-setting" circle></el-button>
            </el-tooltip>
            </template>
        </el-table-column>
    </el-table>
</el-card>
</div>
</template>

<script>
export default {
    data(){
        return{
            queryInfo:{
                query:'',
                pagenum:1,
                pagesize:2
            },
             userlist:[],
             total:0
        } 
    },
    created(){
        this.getUsersList()
    },
    methods:{
       async getUsersList(){
         const {data:res}= await this.$http.get('users',{params:this.queryInfo})
         if(res.meta.status !== 200) return this.$message.error('获取用户列表失败')
         this.userlist=res.data.users
         this.total=res.data.total
        }
    }
}
</script>

<style lang="less" scoped>
.el-breadcrumb{
    margin-bottom: 16px;
}
.el-card{
    box-shadow: 0 0 10px rgba(0,0,0,0.15);
    margin-bottom: 20px;
}

</style>
