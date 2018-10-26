<template>
  <el-card>
    <my-breadcrumb level1="模块管理" level2="新闻列表"></my-breadcrumb>
    <el-button type='success' @click="addnews = true" plain class="common">创建新闻列表</el-button>
    <el-table :data="data" style="width: 100%" stripe border>
        <el-table-column type="expand">
            <template slot-scope="props">
                <el-table :data="props.row.NewLists" style="width: 100%" :show-header="false">
                    <el-table-column prop="Photo" label="图片路径" width="200"></el-table-column>
                    <el-table-column prop="Describe" label="新闻描述" width="200"></el-table-column>
                    <el-table-column prop="NewName" label="新闻标题" width="200"></el-table-column>
                    <el-table-column prop="Date" label="时间" width="200"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="openEdit(scope.row)">编辑</el-button>
                            <el-button size="mini" type="danger" @click="handleDelete(scope.row.Id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </el-table-column>
        <el-table-column label="#" type="index" width="50"></el-table-column>
      <el-table-column prop="Photo" label="图片路径" width="200"></el-table-column>
      <el-table-column prop="Describe" label="新闻描述" width="200"></el-table-column>
      <el-table-column prop="NewName" label="新闻标题" width="200"></el-table-column>
      <el-table-column prop="Date" label="时间" width="200"></el-table-column>

      <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button size="mini" @click="openEdit(scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.row.Id)">删除</el-button>
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
  <el-dialog title="创建新闻列表" :visible.sync="addnews">
    <el-form label-position="right" label-width="80px" :model="formaddnewList">
        <el-upload
          class="anniu"
          ref="upload"
          action="http://222.35.31.66:28080/newinfo"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-change="handleSuccess"
          :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        </el-upload>
        <el-form-item label="描述内容">
          <el-input v-model="formaddnewList.Describe" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新闻标题">
          <el-input v-model="formaddnewList.NewName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新闻类型">
          <el-input v-model="formaddnewList.Type" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="序号">
          <el-input v-model.number="formaddnewList.Index" auto-complete="off"></el-input>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="addnews = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
    </div>
  </el-dialog>
  <!-- 修改对话框 -->
  <el-dialog
      title="修改新闻列表"
      :visible.sync="openEidtNews">
      <el-form
        :model="formaddnewList"
        label-width="100px">
        <el-upload
          class="anniu"
          ref="upload"
          action="http://222.35.31.66:28080/newinfo"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-change="handleSuccess"
          :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        </el-upload>
        <img :src="formaddnewList.Photo" class="pic">
        <el-form-item label="描述内容">
          <el-input v-model="formaddnewList.Describe" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新闻标题">
          <el-input v-model="formaddnewList.NewName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新闻类型">
          <el-input v-model="formaddnewList.Type" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="序号">
          <el-input v-model.number="formaddnewList.Index" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="openEidtNews = false">取 消</el-button>
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
      addnews: false,
      openEidtNews: false,
      loading: true,
      NewsId: -1,
      formaddnewList:{
        "Photo": '',
        "Describe": '',
        "Index": '',
        "NewName":'',
        "Type": ''
      }
    }
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      this.loading = true;
      const response = await this.$http.get(`newinfo`);
      // console.log(response.data.Message.length)
      // console.log(response.data.Message)
      if(response.data.Code === 200) {
        this.loading = false;
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
    // 上传图片功能
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },

    handlePreview(file) {
        console.log(file);
    },
    handleSuccess (a) {
      // this.formaddnewList.Photo = a.raw;
      this.file = a.raw;
    },
    async handleAdd () {
      const formData = new FormData();
      formData.append('Photo', this.file);
      formData.append('Index', this.formaddnewList.Index);
      formData.append('Describe', this.formaddnewList.Describe);
      formData.append('NewName', this.formaddnewList.NewName);
      formData.append('Type', this.formaddnewList.Type);
      const response = await this.$http.post('newinfo', formData);
      // const { status, data:{ Message}} = response;
      console.log(response)
      if(response.data.Code === 200){
        this.$message.success('添加成功');
        this.loadData();
        this.addnews = false;
      } else {
        this.$message.error('添加失败');
      }
    },
    // 删除新闻列表
    handleDelete(NewId) {
      // 删除提示
      this.$confirm('是否要删除该分类?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 点击确定按钮
        const response = await this.$http.delete(`newinfo/${NewId}`);
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
      this.openEidtNews = true;
      this.NewsId = response.Id;
      this.formaddnewList.Photo ='http://172.31.1.10:8080/' + response.Photo;
      // console.log(this.formaddnewList.Photo);
      this.formaddnewList.Describe = response.Describe;
      this.formaddnewList.Index = response.Index;
      this.formaddnewList.NewName = response.NewName;
      this.formaddnewList.Type = response.Type;
    },
    // 修改新闻列表
    async handleEdit() {
      const formData = new FormData();
      formData.append('Photo', this.file);
      formData.append('Index', this.formaddnewList.Index);
      formData.append('Describe', this.formaddnewList.Describe);
      formData.append('NewName', this.formaddnewList.NewName);
      formData.append('Type', this.formaddnewList.Type);
      const response = await this.$http.post(`newinfo/${this.NewsId}`, formData);
      if(response.data.Code === 200) {
        this.formaddnewList.Photo = '';
        this.formaddnewList.Describe = '';
        this.formaddnewList.Index = '';
        this.formaddnewList.Type = '';
        this.formaddnewList.NewName = '';
        this.openEidtNews = false;
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
.anniu {
  margin-bottom: 15px;
}
.pic {
  width: 200px;
  height: 100px;
}
</style>




