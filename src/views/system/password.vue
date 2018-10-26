<template>
  <el-card>
    <my-breadcrumb level1="商品管理" level2="商品列表"></my-breadcrumb>
    <el-row class="searchRow">
      <el-col :span="24">
        <el-input v-model="searchValue" placeholder="请输入内容" class="searchInput" clearable>
          <el-button  slot="append" icon="el-icon-search" ></el-button>
        </el-input>
        <el-button @click="handleOpenAddGoods" type="success">添加商品</el-button>

      </el-col>
    </el-row>
    <el-table
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
        prop="goods_name"
        label="商品名称"
        width="500">
      </el-table-column>
      <el-table-column
        prop="goods_price"
        label="商品价格"
        width="100">
      </el-table-column>
      <el-table-column
        prop="goods_weight"
        label="商品重量"
        width="100">
      </el-table-column>
       <el-table-column
        prop="add_time"
        label="创建时间"
        width="180">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" plain >
          </el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" plain >
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
      const response = await this.$http.get(`goods?pagenum=${this.pagenum}&pagesize=${this.pagesize}`);
      const { meta: { msg, status }} = response.data;
      if(status === 200) {
        this.data = response.data.data.goods;
        this.total = response.data.data.total;

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
</style>
