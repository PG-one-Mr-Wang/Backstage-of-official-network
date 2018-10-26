<template>
  <el-card>
    <my-breadcrumb level1="模块管理" level2="banner列表"></my-breadcrumb>
    <el-button type='success' @click="addBannerList = true" plain class="common">创建banner列表</el-button>
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
        width="400">
      </el-table-column>
      <el-table-column
        prop="Describe"
        label="描述内容"
        width="400">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" plain @click="openEdit(scope.row)">
          </el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" plain @click="handleDelete(scope.row.Id)">
          </el-button>
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
  <el-dialog title="创建banner列表" :visible.sync="addBannerList">
      <el-form
      label-position="right"
      label-width="80px"
      :model="formAddBannerList">
          <!-- action  上传的地址，此处必须写上全部路径 -->
        <el-upload
          class="anniu"
          ref="upload"
          action="http://222.35.31.66:28080/banner"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-change="handleSuccess"
          :file-list="fileList"
          :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        </el-upload>
        <el-form-item label="描述内容">
          <el-input v-model="formAddBannerList.Describe" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="序号">
          <el-input v-model.number="formAddBannerList.Index" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addBannerList = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </div>
  </el-dialog>
  <!-- 修改对话框 -->
  <el-dialog
      title="修改banner列表"
      :visible.sync="openEidtBanner">
      <el-form
        :model="formAddBannerList"
        label-width="100px">
        <el-upload
          class="anniu"
          ref="upload"
          :show-file-list="true"
          action="http://222.35.31.66:28080/banner"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-change="handleSuccess"
          :file-list="fileList"
          :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        </el-upload>
        <img :src="formAddBannerList.Photo" class="pic">
        <el-form-item label="描述内容">
          <el-input v-model="formAddBannerList.Describe" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="序号">
          <el-input v-model.number="formAddBannerList.Index" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="openEidtBanner = false">取 消</el-button>
        <el-button type="primary" @click="handleEdit">确 定</el-button>
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
      pagesize: 6,
      // 总共有多少条数据
      total: 0,
      loading: true,
      addBannerList: false,
      openEidtBanner: false,
      fileList: [],
      file: null,
      banID: -1,
      // formData: {},
      formAddBannerList: {
        "Photo":"",
        "Describe": "",
        "Index": ""
      },
       headers: {
        'Authorization': sessionStorage.getItem('token')
      }
    }
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
        this.loading = true;
        const response = await this.$http.get(`banner?Page=${this.pagenum}&Pagesize=${this.pagesize}`);
        // console.log(response);
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
    // 添加图片获取数据方法
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },

    handlePreview(file) {
        console.log(file);
    },
    handleSuccess (a) {
      // this.formAddBannerList.Photo = a.raw;
      this.file = a.raw;
      console.log(a.raw)
    },
    // 添加banner列表
    async handleAdd () {
      const formData = new FormData();
      formData.append('Photo', this.file);
      formData.append('Index', this.formAddBannerList.Index);
      formData.append('Describe', this.formAddBannerList.Describe);
      const response = await this.$http.post('banner', formData);
      // console.log(response)
      if(response.data.Code === 200){
        this.$message.success('添加成功');
        this.loadData();
        this.addBannerList = false;
      } else {
        this.$message.error('添加失败');
      }
    },
    // 打开编辑窗口
     async openEdit(response) {
      console.log(response)
      this.openEidtBanner = true;
      this.banID = response.Id;
      this.formAddBannerList.Photo ='http://172.31.1.10:8080/' + response.Photo;
      console.log(this.formAddBannerList.Photo);
      this.formAddBannerList.Describe = response.Describe;
      this.formAddBannerList.Index = response.Index;
    },
    // 修改banner列表
    async handleEdit() {
      const formData = new FormData();
      formData.append('Photo', this.file);
      formData.append('Index', this.formAddBannerList.Index);
      formData.append('Describe', this.formAddBannerList.Describe);
      const response = await this.$http.post(`banner/${this.banID}`, formData);
      if(response.data.Code === 200) {
        this.formAddBannerList.Photo = '';
        this.formAddBannerList.Describe = '';
        this.formAddBannerList.Index = '';
        this.openEidtBanner = false;
        this.loadData();
        this.$message({
          type:'success',
          message: '编辑成功'
        });
      } else {
        this.$message({
          type:'error',
          message: '编辑失败'
        })
      }
    },
    // 删除banner列表
    handleDelete(BId) {
      // 删除提示
      this.$confirm('是否要删除该分类?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 点击确定按钮
        const response = await this.$http.delete(`banner/${BId}`);
        console.log(response)
        // 判断是否删除成功
        if (response.data.Code === 200) {
          this.loadData();
          this.$message({
          type: 'success',
          message: '删除成功!'
          });
        } else {
          this.$message({
            type: 'error',
            message: '删除失败!'
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
.pic {
  width: 200px;
  height: 100px;
}
</style>

