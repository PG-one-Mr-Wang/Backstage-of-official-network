<template>
  <el-card class="card">
    <my-breadcrumb level1="用户管理" level2="用户列表"></my-breadcrumb>
    <el-row class="searchRow">
      <el-col :span="24">
        <el-input v-model="searchValue" placeholder="请输入内容" class="searchInput" clearable>
          <el-button @click="handleSearch" slot="append" icon="el-icon-search" ></el-button>
        </el-input>
        <el-button @click="addUerDialogFormVisible = true" type="success">添加用户</el-button>
      </el-col>
    </el-row>
    <el-table
      v-loading="loading"
      border
      stripe
      :data="data"
      style="width: 100%">
      <!-- 序号 -->
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话"
        width="180">
      </el-table-column>
      <el-table-column
        label="时间"
        width="180">
        <template slot-scope="scope">
            {{scope.row.create_time | fmtDate('YYYY-MM-DD')}}
        </template>
      </el-table-column>
      <el-table-column
        label="用户状态"
        width="80">
        <template slot-scope="scope">
          <el-switch
          @change="handleChange(scope.row)"
          v-model="scope.row.mg_state"
          active-color="#13ce66"
          inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" plain @click="openEidtUerDialogFormVisible(scope.row)">
          </el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" plain @click="handleDelete(scope.row.id)">
          </el-button>
          <el-button type="success" icon="el-icon-check" size="mini" plain @click="handleOpenSetRoleDialog(scope.row)">
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页功能 -->
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="count">
      </el-pagination>
      <!-- 添加表单的表单 -->
    <el-dialog title="添加用户" :visible.sync="addUerDialogFormVisible">
      <el-form ref="addForm" :rules="rules" label-width="80px" :model="from">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="from.username" auto-complate="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="from.password" auto-complate="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="from.email" auto-complate="off"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="from.mobile" auto-complate="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="this.addUerDialogFormVisible = false">取 消</el-button>
        <el-button @click="handleAdd" type="primary">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改表单的表单 -->
    <el-dialog @close="handleEditDialogClose" title="修改用户" :visible.sync="eidtUerDialogFormVisible">
      <el-form label-width="80px" :model="from">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="from.username" auto-complate="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="from.email" auto-complate="off"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="from.mobile" auto-complate="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="this.eidtUerDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEidt">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配角色的表单 -->
    <el-dialog
    title="分配角色"
    :visible.sync="setUerDialogFormVisible">
      <el-form
        label-width="100px">
        <el-form-item label="用户名">
          {{ currentName }}
        </el-form-item>
        <el-form-item label="请选择角色">
          <el-select v-model="currentRoleId">
            <el-option label="请选择" :value="-1" disabled></el-option>
            <el-option v-for="item in roles" :key="item.id" :label="item.roleName" :value="item.id"></el-option>

          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="setUerDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSetRoles">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
  export default{
  data() {
    return{
      data:[],
      count: 0,
      pagenum: 1,
      pagesize: 4,
      searchValue: '',
      from:{
        username: '',
        password: '',
        email: '',
        mobile: '',
        loading: true
      },
      addUerDialogFormVisible: false,
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 11, message: '长度在 3 到 11 个字符', trigger: 'blur' }
        ]
      },
      eidtUerDialogFormVisible: false,
      setUerDialogFormVisible: false,
      currentName: '',
      currentRoleId: -1,
      currentUserId: -1,
      roles: []
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    // 渲染页面
    async loadData() {

      const response = await this.$http.get(`users?pagenum=${this.pagenum}&pagesize=${this.pagesize}&query=${this.searchValue}`);
      this.loading = false;
      const { data : { meta :{ msg, status }}} = response;
      if(status === 200) {
        this.count = response.data.data.total;
        this.data = response.data.data.users;
      }else{
        this.$message.error(msg);
      }
    },
    // 分页功能
    handleSizeChange(val) {
      this.pagesize = val;
      this.loadData();
      console.log(`每页 ${val} 条`);
    },
    // 分页功能
    handleCurrentChange(val) {
      this.pagenum = val;
      this.loadData();
      console.log(`当前页: ${val}`);
    },
    // 搜索功能
    handleSearch() {
      this.loadData();
    },
    // 添加功能
    async handleAdd() {
      this.$refs.addForm.validate(async (valid)=>{
        if(valid){
          const response = await this.$http.post('users', this.from);
          const { data : { meta :{ msg, status }}} = response;
          if(status === 201) {
            this.$message.success(msg);
            this.loadData();
            this.addUerDialogFormVisible = false;
            // this.$refs.addForm.resetFields();
            this.$refs.addForm.resetFields();
          }else {
            this.$message.error(msg);
          }
        }
      })
    },
    // 点击修改表单时所要做的事
    openEidtUerDialogFormVisible(user) {
      this.eidtUerDialogFormVisible = true;
      this.from.username = user.username;
      this.from.email = user.email;
      this.from.mobile = user.mobile;
      this.from.id = user.id;
    },
    // 修改表单
    async handleEidt() {
      const response = await this.$http.put(`users/${this.from.id}`,{
        email: this.from.email,
        mobile: this.from.mobile
      });
      const {meta :{ msg, status}} = response.data;
      if(status === 200){
        this.$message.success(msg);
        this.loadData();

        this.eidtUerDialogFormVisible = false;
        for(var key in this.from) {
          this.from[key] = '';
        }
      }else {
        this.$message.error(msg);
      }
    },
    // 点击叉号时把页面的数据清除掉
    handleEditDialogClose() {
      for(var key in this.from) {
          this.from[key] = '';
      }
    },
    // 删除功能
    handleDelete(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning'
      }).then(async () => {
          const response = await this.$http.delete(`users/${id}`);
          if(this.data.length === 1&& this.pagenum !== 1) {
            this.$message({ type: 'success', message: '删除成功!'});
            this.pagenum --;
          }
         this.loadData();
      }).catch(() => {
         this.$message({ type: 'info', message: '已取消删除'});
      });
    },
    // 用户状态的修改
    async handleChange(user) {
      const response = await this.$http.put(`users/${user.id}/state/${user.mg_state}`);
      const {meta: { msg, status}} = response.data;
      if(status === 200) {
        this.$message.success(msg);
      }else {
        this.$message.error(msg);
      }
    },
    // 点击修改权限时候得到的表单并把默认值显示
    async handleOpenSetRoleDialog(user) {
      this.setUerDialogFormVisible = true;
      this.currentName = user.username;
      this.currentUserId = user.id;
      const response = await this.$http.get('roles');
      this.roles = response.data.data;
      const userResponse = await this.$http.get(`users/${user.id}`);
      this.currentRoleId = userResponse.data.data.rid;
    },
    // 分配用户角色
    async handleSetRoles() {
      const response = await this.$http.put(`users/${this.currentUserId}/role`,{rid: this.currentRoleId});
      console.log(response);
      const { meta: { msg, status }} = response.data;
      if(status === 200) {
        this.$message.success(msg);
        this.setUerDialogFormVisible = false;
      }else {
        this.$message.error(msg);
      }
    }
  }
}
</script>

<style>
  .card {
  height: 100%;
}
.searchInput {
  width: 300px;
}
.searchRow {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
