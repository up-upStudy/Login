<template>
<div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
        <!-- 搜索与探索的区域 -->
        <el-row :gutter=20>
            <el-col :span="8">
                <el-input placeholder="请输入内容" class="input-with-select" 
                v-model="queryInfo.query" clearable @clear="getUsersList">
                    <el-button slot="append" icon="el-icon-search" @click="getUsersList"></el-button>
                </el-input>
            </el-col>
            <el-col :span="4">
                <el-button type="primary" @click="dialogVisible=true">添加用户</el-button>
            </el-col>
        </el-row>
        <!-- 用户列表区域 -->
    <el-table :data="userlist" border>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="username" label="姓名" align="center"></el-table-column>
        <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
        <el-table-column prop="mobile" label="电话" align="center"></el-table-column>
        <el-table-column prop="role_name" label="角色" align="center"></el-table-column>
        <el-table-column label="状态" align="center">
        <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="userStateChange(scope.row)">
            </el-switch>
        </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
            <template slot-scope="scope">
            <el-tooltip content="修改" placement="top" :enterable="false">
                <el-button type="primary" icon="el-icon-edit" circle @click="showEditDialog(scope.row.id)"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top" :enterable="false">
                <el-button type="danger" icon="el-icon-delete" circle @click="removeUserById(scope.row.id)"></el-button>
            </el-tooltip>
            <el-tooltip content="设置" placement="top" :enterable="false">
                <el-button type="primary" icon="el-icon-setting" circle></el-button>
            </el-tooltip>
            </template>
        </el-table-column>
    </el-table>
    <!-- 分页区域 -->
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage1"
      :page-sizes="[1, 2, 3, 5,10]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
</el-card>
<!-- 添加用户对话框 -->
<el-dialog title="添加用户" :visible.sync="dialogVisible" width="50%" @close="addDialogClosed">
  <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
    <el-form-item label="用户名" prop="username">
        <el-input v-model="addForm.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
        <el-input v-model="addForm.password"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
        <el-input v-model="addForm.email"></el-input>
    </el-form-item>
    <el-form-item label="电话" prop="mobile">
        <el-input v-model="addForm.mobile"></el-input>
    </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addUser">确 定</el-button>
  </span>
</el-dialog>
<!-- 修改用户对话框 -->
<el-dialog title="修改用户" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
  <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="100px">
    <el-form-item label="用户名">
        <el-input v-model="editForm.username" disabled></el-input>
    </el-form-item>
    <!-- <el-form-item label="密码" prop="password">
        <el-input v-model="editForm.password"></el-input>
    </el-form-item> -->
    <el-form-item label="邮箱" prop="email">
        <el-input v-model="editForm.email"></el-input>
    </el-form-item>
    <el-form-item label="电话" prop="mobile">
        <el-input v-model="editForm.mobile"></el-input>
    </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="editDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editUser">确 定</el-button>
  </span>
</el-dialog>
</div>
</template>

<script>
export default {
    data(){
        //验证手机号的规则
        var checkMobile=(rule,value,callback)=>{
            const regMobile=/^1[3456789]\d{9}$/
            if(regMobile.test(value)){
                return callback()
            }
            callback(new Error('请输入合法的手机号'))
        }
        return{
            editForm:{},
            //获取用户列表定义的参数对象
            queryInfo:{
                query:'',//查询用户的条件
                pagenum:1, //当前页码值
                pagesize:2 //每页显示的条目数
            },
             userlist:[],
             total:0,
             currentPage1:1,
             dialogVisible:false,
             //控制修改对话框显示与隐藏
             editDialogVisible:false,
             //添加用户的表单数据
             addForm:{
                 username:'',
                 password:'',
                 email:'',
                 mobile:''
             },
             addFormRules:{
                 username: [
                { required: true, message: '请输入用户名', trigger: 'blur' },
                { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' },
                { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }],
                email: [{ required: true, message: '请输入电子邮箱', trigger: 'blur' }],
                mobile: [{ required: true, message: '请输入电话', trigger: 'blur' },
                { validator: checkMobile, trigger:'blur' }],         
            },
             editFormRules:{
                 email: [{ required: true, message: '请输入电子邮箱', trigger: 'blur' }],
                 mobile: [{ required: true, message: '请输入电话', trigger: 'blur' },
                { validator: checkMobile, trigger:'blur' }
          ]
             }
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
        },
        handleSizeChange(newSize){
            this.queryInfo.pagesize = newSize
            this.getUsersList()
        },
        /* 监听页码值 */
        handleCurrentChange(newPage){
            this.queryInfo.pagenum = newPage
            this.getUsersList()
        },
        //监听用户状态改变
       async userStateChange(userInfo){
            //users/:uid/state/:type 修改
         const{data:res} = await this.$http.put(`users/${userInfo.id}/state/${userInfo.mg_state}`)
            if(res.meta.status !== 200){
                userInfo.mg_state=!userInfo.mg_state
                return this.$message.error('用户状态更新失败')
            }
            this.$message.success('用户状态更新成功')
        },
        //监听添加用户对话框
        addDialogClosed(){
            this.$refs.addFormRef.resetFields()
        },
        //添加用户
        addUser(){
            this.$refs.addFormRef.validate(async valid => {
                if(!valid) return 
                //预校验通过，发请求 post users 
              const{data: res} = await this.$http.post('users',this.addForm)
              if(res.meta.status !== 201){
                  return this.$message.error("添加用户失败")
              }
              this.$message.success('添加用户成功')
              //隐藏对话框
              this.dialogVisible=false
              //刷新用户列表
              this.getUsersList()
            })
        },
        //显示修改用户对话框
       async showEditDialog(id){
            this.editDialogVisible=true
            //users:/id
            const{data: res} = await this.$http.get(`users/${id}`)
            if(res.meta.status !== 200){
                  return this.$message.error(res.meta.msg)
              }
              this.editForm=res.data
        },
            //重置修改信息
    editDialogClosed(){
        this.$refs.editFormRef.resetFields()
    },
    //修改用户
    editUser(){
       this.$refs.editFormRef.validate(async valid=>{
           if(!valid) return
           //发送修改用户信息的数据请求
         const{data:res} = await this.$http.put(`users/${this.editForm.id}`,{
               email:this.editForm.email,
               mobile:this.editForm.mobile
           })
           if(res.meta.status!==200){
               return this.$message.error('该用户信息更新失败')
           }
           //关闭修改用户对话框
           this.editDialogVisible = false
           //刷新数据列表
           this.getUsersList()
           this.$message.success('该用户信息更新成功')
       })
    },
    async removeUserById(id){
       const result=await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => err)
       if(result==='cancel'){
           return this.$message.info('已取消删除')
       }
       //发送删除请求
      const {data: res} = await this.$http.delete(`users/${id}`)
      if( res.meta.status !== 200){
        return this.$message.error('删除用户失败!')
      }
      this.$message.success('删除用户成功')
      this.queryInfo.pagenum = 1
      this.getUsersList()
        }
    },

}
//修改用户api users:/id put 请求参数 id email mobile
//删除用户api users:/id delete 
</script>

<style lang="less" scoped>
.el-breadcrumb{
    margin-bottom: 16px;
}
.el-card{
    box-shadow: 0 0 10px rgba(0,0,0,0.15);
}
.el-table{
    margin-top: 20px;
}
.el-pagination{
    margin-top:15px
}

</style>
