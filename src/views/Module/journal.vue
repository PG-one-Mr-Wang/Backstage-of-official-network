<template>
  <el-card>
    <my-breadcrumb level1="模块管理" level2="日志列表"></my-breadcrumb>
    <el-table
      class="tabel common"
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
        prop="KeeperId"
        label="操作人员"
        width="200">
      </el-table-column>
      <el-table-column
        prop="ActionType"
        label="操作内容"
        width="200">
      </el-table-column>
      <el-table-column
        prop="Content"
        label="内容"
        width="350">
      </el-table-column>
      <el-table-column
        prop="Date"
        label="时间"
        width="265">
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
      loading: true,
    }
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      this.loading = true;
      const response = await this.$http.get(`log?Page=${this.pagenum}&Pagesize=${this.pagesize}`)
      // console.log(response)
      if(response.data.Code === 200) {
        this.loading = false;
        this.data = response.data.Message.TotalList;
        this.total = response.data.Message.Total;
      } else {
        this.$message.error(msg);
      }
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

