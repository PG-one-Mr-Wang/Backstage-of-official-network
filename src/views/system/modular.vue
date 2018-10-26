<template>
  <el-card>
    <my-breadcrumb level1="系统维护" level2="模块管理"></my-breadcrumb>

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
        prop="Content"
        label="内容"
        width="400">
      </el-table-column>
      <el-table-column
        prop="ActionType"
        label="操作内容"
        width="180">
      </el-table-column>
       <el-table-column
        prop="Date"
        label="创建时间"
        width="230">
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
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[6, 20, 30, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
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
      total: 0
    }
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      const response = await this.$http.get(`log`);
      const { status, data:{ Message}} = response;
      console.log(response.data.Message.length)
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
    handleOpenAddGoods () {
      this.$router.push('/goods/add')
    }
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
.tabel {
  margin-top: 20px;
}
</style>

