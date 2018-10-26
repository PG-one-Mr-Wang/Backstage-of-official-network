<template>
  <el-card>
    <my-breadcrumb level1="模块管理" level2="图文列表"></my-breadcrumb>
    <el-button type='success' @click="addimgtextList = true" plain class="common">创建图文列表</el-button>
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
        width="300">
      </el-table-column>
      <el-table-column
        prop="Describe"
        label="描述内容"
        width="300">
      </el-table-column>
      <el-table-column
        prop="Name"
        label="标题"
        width="200">
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
      :page-sizes="[6, 20, 30, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
  </el-pagination>
     <!-- 添加对话框 -->
  <el-dialog title="创建图文列表" :visible.sync="addimgtextList">
      <el-form label-position="right" label-width="80px" :model="formaddimgtextList">
        <el-upload
          class="anniu"
          ref="upload"
          action="http://222.35.31.66:28080/imagedescribe"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-change="handleSuccess"
          :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        </el-upload>
        <el-form-item label="描述内容">
          <el-input v-model="formaddimgtextList.Describe" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="formaddimgtextList.Name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="序号">
          <el-input v-model.numbe="formaddimgtextList.Index" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addimgtextList = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </div>
  </el-dialog>
   <!-- 修改对话框 -->
  <el-dialog
      title="修改图文列表"
      :visible.sync="openEidtImgtext">
      <el-form
        :model="formaddimgtextList"
        label-width="100px">
        <el-upload
          class="anniu"
          ref="upload"
          action="http://222.35.31.66:28080/imagedescribe"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-change="handleSuccess"
          :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        </el-upload>
        <img :src="formaddimgtextList.Photo" class="pic">
        <el-form-item label="描述内容">
          <el-input v-model="formaddimgtextList.Describe" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="formaddimgtextList.Name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="序号">
          <el-input v-model.numbe="formaddimgtextList.Index" auto-complete="off"></el-input>
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
      pagenum: 1,
      pagesize: 6,
      searchValue: '',
      total: 0,
      file: null,
      loading: true,
      ItextId: -1,
      addimgtextList: false,
      openEidtImgtext: false,
      formaddimgtextList:{
        "Photo": '',
        "Describe": '',
        "Index": '',
        "Name":''
      }
    }
  },
  created() {
    this.loadData();
  },
  methods: {
    // 将数据渲染到页面上
    async loadData() {
      this.loading = true;
      const response = await this.$http.get(`imagedescribe?Page=${this.pagenum}&Pagesize=${this.pagesize}`)
        // console.log(response)
        if(response.data.Code === 200) {
          this.loading = false;
          this.data = response.data.Message.TotalList;
          this.total = response.data.Message.Total;
        } else {
          this.$message.error(msg);
      }
    },
    // 分页功能
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
    // 上传图片功能
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },

    handlePreview(file) {
        console.log(file);
    },
    handleSuccess (a) {
      this.file = a.raw;
    },
    // 添加图文列表
    async handleAdd () {
      // 将数据转换成formData格式
      const formData = new FormData();
      formData.append('Photo', this.file);
      formData.append('Index', this.formaddimgtextList.Index);
      formData.append('Describe', this.formaddimgtextList.Describe);
      formData.append('Name', this.formaddimgtextList.Name);
      // 发送请求
      const response = await this.$http.post('imagedescribe', formData);
      console.log(response)
      if(response.data.Code === 200){
        this.$message.success('添加成功');
        this.loadData();
        this.addimgtextList = false;
      } else {
        this.$message.error('添加失败');
      }
    },
    // 删除图文列表
    handleDelete(ImgId) {
      // 删除提示
      this.$confirm('是否要删除该分类?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 点击确定按钮
        const response = await this.$http.delete(`imagedescribe/${ImgId}`);
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
      // 打开编辑窗口
    async openEdit(response) {
      // console.log(response)
      this.openEidtImgtext = true;
      this.ItextId = response.Id;
      this.formaddimgtextList.Photo ='http://172.31.1.10:8080/' + response.Photo;
      // console.log(this.formaddimgtextList.Photo);
      this.formaddimgtextList.Describe = response.Describe;
      this.formaddimgtextList.Index = response.Index;
      this.formaddimgtextList.Name = response.Name;
    },
    // 修改图文列表
    async handleEdit() {
      const formData = new FormData();
      formData.append('Photo', this.file);
      formData.append('Index', this.formaddimgtextList.Index);
      formData.append('Describe', this.formaddimgtextList.Describe);
      formData.append('Name', this.formaddimgtextList.Name);
      const response = await this.$http.post(`imagedescribe/${this.ItextId}`, formData);
      if(response.data.Code === 200) {
        this.formaddimgtextList.Photo = '';
        this.formaddimgtextList.Describe = '';
        this.formaddimgtextList.Index = '';
        this.formaddimgtextList.Name = '';
        this.openEidtImgtext = false;
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
.pic {
  margin-bottom: 20px;
}
.pictext {
  margin-left: 30px;
}
.anniu {
  margin-bottom: 15px;
}
.pic {
  width: 200px;
  height: 100px;
}
</style>




