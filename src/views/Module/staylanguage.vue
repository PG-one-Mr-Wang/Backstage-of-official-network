<template>
  <el-card>
    <my-breadcrumb level1="模块管理" level2="留言板列表"></my-breadcrumb>
    <el-button type='success' @click="replyToMessage = true" plain class="common">回复留言板</el-button>
    <el-table
      class="tabel"
      :data="data"
      border
      style="width: 100%">
      <el-table-column
          label="#"
          type="index"
          width="50">
      </el-table-column>
      <el-table-column type="expand" label="回复留言内容" width="150">
            <template slot-scope="props">
                <el-table :data="props.row.ResultData" style="width: 100%" :show-header="false">
                    <el-table-column
                    prop="Content"
                    label="留言内容"
                    width="400">
                    </el-table-column>
                    <el-table-column
                    prop="Date"
                    label="时间"
                    width="400">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" type='success' @click="replyToMessage = true">添加</el-button>
                            <el-button size="mini" type="danger" @click="handleDeleteMessage(scope.row.Id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </el-table-column>
       <el-table-column
        prop="Content"
        label="留言内容"
        width="250">
      </el-table-column>
      <el-table-column
        prop="Date"
        label="时间"
        width="200">
      </el-table-column>
       <el-table-column
        prop="Name"
        label="留言人员"
        width="200">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
            <el-button size="mini" type='success' @click="addStayLanguage = true">添加</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.Id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
   <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[6, 8, 10]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
     <!-- 添加对话框 -->
    <el-dialog title="添加留言" :visible.sync="addStayLanguage">
      <el-form label-position="right" label-width="80px" :model="formData">
        <el-form-item label="姓名">
          <el-input v-model="formData.Name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="公司名称">
          <el-input v-model="formData.CompanyName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电子邮件">
          <el-input v-model="formData.Email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="formData.Tel" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="QQ号">
          <el-input v-model="formData.Qq" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="留言内容">
          <el-input v-model="formData.Content" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addStayLanguage = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 回复留言对话框 -->
    <el-dialog title="添加留言" :visible.sync="replyToMessage">
      <el-form label-position="right" label-width="80px" :model="form">
        <el-form-item label="给留言ID">
          <el-input v-model.number="form.GuestBookId" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="留言内容">
          <el-input v-model="form.Content" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="replyToMessage = false">取 消</el-button>
        <el-button type="primary" @click="handleAddMessage">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>
<script type="text/javascript">
export default{
  data() {
    return {
      data:[],
      // 分页数据
      pagenum: 1,
      pagesize: 10,
      // 总共有多少条数据
      total: 0,
      addStayLanguage: false,
      replyToMessage: false,
      loading: true,
      formData: {
        "Name":"", //姓名
        "CompanyName": "", //公司名
        "Email": "", //电子邮件
        "Tel": "", //手机号
        "Qq": "", //QQ号
        "Content": ""
      },
      form: {
        "GuestBookId": "",
        "Content": ""
      }
    }
  },
  created() {
    this.loadData();
  },
  methods: {
      async loadData() {
        this.loading = true;
        const response = await this.$http.get(`guestbook?Page=${this.pagenum}&Pagesize=${this.pagesize}`)
        // console.log(response)
        if(response.data.Code === 200) {
          this.loading = false;
          this.data = response.data.Message.TotalList;
          this.total = response.data.Message.Total;
        } else {
          this.$message.error(msg);
      }
    },
    // 添加留言
    async handleAdd() {
      const response = await this.$http.post('guestbook', this.formData);
      if (response.data.Code === 200) {
        this.loadData();
        this.addStayLanguage = false;
        this.$message({
          type: 'success',
          message: '留言成功'
        });
      } else {
        this.$message({
          type: 'error',
          message: '留言失败'
        });
      }
    },
    // 删除留言
    handleDelete(StayId) {
      // 删除提示
      this.$confirm('是否要删除该留言?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 点击确定按钮
        const response = await this.$http.delete(`guestbook/${StayId}`);
        // 判断是否删除成功
        if (response.data.Code === 200) {
          this.loadData();
          this.$message({
          type: 'success',
          message: '删除留言成功!'
        });
        } else {
          this.$message({
            type: 'error',
            message: '删除留言失败!'
          });
        }
      }).catch(() => {
        // 点击取消按钮
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 回复留言板内容
    async handleAddMessage () {
      const response = await this.$http.post('guestbookresult', this.form);
      if(response.data.Code === 200) {
        this.loadData();
        this.replyToMessage = false;
        this.$message({
          type: 'success',
          message: '回复留言成功!'
        });
      } else {
        this.$message({
          type: 'error',
          message: '回复留言失败!'
        });
      }
    },
    // 删除留言板内容
     handleDeleteMessage(MId) {
      // 删除提示
      this.$confirm('是否要删除该留言?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 点击确定按钮
        const response = await this.$http.delete(`guestbookresult/${MId}`);
        // 判断是否删除成功
        if (response.data.Code === 200) {
          // this.loadData();
          this.$message({
          type: 'success',
          message: '删除回复留言成功!'
        });
        } else {
          this.$message({
            type: 'error',
            message: '删除回复留言失败!'
          });
        }
      }).catch(() => {
        // 点击取消按钮
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 分页方法
    handleSizeChange(val) {
      this.pagesize = val;
      this.loadData();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.loadData();
      console.log(`当前页: ${val}`);
    },
  }
};
</script>

<style type="text/css">
.searchInput{
  width: 300px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.el-table .cell {
  white-space: nowrap;
}
/*.tabel {
  margin-top: 20px;
}*/
.common {
  margin: 10px 0;
}
.anniu {
  margin-bottom: 15px;
}
</style>

