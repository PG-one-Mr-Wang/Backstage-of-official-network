<template>
  <el-card>
    <my-breadcrumb level1="用户管理" level2="用户列表"></my-breadcrumb>
    <el-button type='success' @click="addimgtextList = true" plain class="common">创建新闻列表</el-button>
    <el-table
      class="tabel"
      :data="data"
      stripe
      border
      style="width: 100%">
      <el-table-column
          label="#"
          type="index"
          width="50">
      </el-table-column>
      <el-table-column
        prop="Photo"
        label="图片路径"
        width="200">
      </el-table-column>
      <el-table-column
        prop="Describe"
        label="新闻描述"
        width="200">
      </el-table-column>
      <el-table-column
        prop="NewName"
        label="新闻标题"
        width="200">
      </el-table-column>
      <el-table-column
        prop="Date"
        label="时间"
        width="200">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <!-- <el-button type="primary" icon="el-icon-edit" size="mini" plain @click="openEidtUerDialogFormVisible(scope.row)">
          </el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" plain @click="handleDelete(scope.row.id)">
          </el-button>
          <el-button type="success" icon="el-icon-check" size="mini" plain @click="banneraddform(scope.row)">
          </el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[6, 20, 30, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
  </el-pagination>
     <!-- 添加对话框 -->
  <el-dialog title="创建新闻列表" :visible.sync="addimgtextList">
      <el-form label-position="right" label-width="80px" :model="formaddimgtextList">
        <el-form-item label="图片路径">
          <el-input v-model="formaddimgtextList.Photo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述内容">
          <el-input v-model="formaddimgtextList.Describe" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="formaddimgtextList.Index" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="序号">
          <el-input v-model="formaddimgtextList.Index" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addimgtextList = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </div>
  </el-dialog>
  </el-card>
</template>

<script type="text/javascript">
export default{
  data() {
    return {
      data:[],
      pagenum: 1,
      pagesize: 6,
      searchValue: '',
      total: 0,
      addimgtextList: false,
      formaddimgtextList:{
        Photo: '',
        Describe: '',
        Index: '',
        Name:''
      }
    }
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      const response = await this.$http.get(`newinfo`);
      const { status, data:{ Message}} = response;
      // console.log(response.data.Message.length)
      console.log(response.data.Message)
      if(status === 200) {
        this.data = response.data.Message;
        this.total = response.data.Message.length;
      } else {
        this.$message.error(msg);
      }
    },
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
    // async handleAdd () {
    //   const response = await this.$http.post('banner', this.formaddimgtextList);
    //   // const {}
    // }
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

.common {
  margin: 10px 0;
}
</style>




