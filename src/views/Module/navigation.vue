<template>
  <div>
    <my-breadcrumb level1='模块管理' level2='导航分类'></my-breadcrumb>
    <el-button type='success' @click="addNavigationtwo = true" plain class="common">创建二级导航列表</el-button>
    <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
            <template slot-scope="props">
                <el-table :data="props.row.TwoNavigation" style="width: 100%" :show-header="false">
                    <el-table-column prop="NavigationName" label=""></el-table-column>
                    <el-table-column prop="Url" label=""></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" type='success' @click="addNavigationtwo = true">添加</el-button>
                            <el-button size="mini" @click="openEdittwo(scope.row)">编辑</el-button>
                            <el-button size="mini" type="danger" @click="handleDeleteTwo(scope.row.Id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </el-table-column>
        <el-table-column label="导航名称" prop="NavigationName"></el-table-column>
        <el-table-column label="导航路径" prop="Url"></el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button size="mini" type='success' @click="addNavigation = true">添加</el-button>
                <el-button size="mini" @click="openEdit(scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.row.Id)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 编辑对话框 -->
    <el-dialog title="编辑导航分类" :visible.sync="editNavigation">
      <el-form label-position="right" label-width="80px" :model="formData">
        <el-form-item label="导航名称">
          <el-input v-model="formData.NavigationName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="导航路径">
          <el-input v-model="formData.Url" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="导航索引">
          <el-input v-model.number="formData.Index" auto-complete="off" type="number"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editNavigation = false">取 消</el-button>
        <el-button type="primary" @click="handleEdit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加对话框 -->
    <el-dialog title="添加导航分类" :visible.sync="addNavigation">
      <el-form label-position="right" label-width="80px" :model="formData">
        <el-form-item label="导航名称">
          <el-input v-model="formData.NavigationName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="导航路径">
          <el-input v-model="formData.Url" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="导航索引">
          <el-input v-model.number="formData.Index" auto-complete="off" type="number"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addNavigation = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加二级导航对话框 -->
    <el-dialog title="添加二级导航分类" :visible.sync="addNavigationtwo">
      <el-form label-position="right" label-width="80px" :model="formDataTwo">
        <el-form-item label="主导航ID">
          <el-input v-model.number="formDataTwo.PId" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="导航名称">
          <el-input v-model="formDataTwo.NavigationName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="导航路径">
          <el-input v-model="formDataTwo.Url" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="导航索引">
          <el-input v-model.number="formDataTwo.Index" auto-complete="off" type="number"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addNavigationtwo = false">取 消</el-button>
        <el-button type="primary" @click="handleAddTwo">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑二级导航对话框 -->
    <el-dialog title="编辑导航分类" :visible.sync="editNavigationTwo">
      <el-form label-position="right" label-width="80px" :model="formDataTwo">
        <el-form-item label="主导航ID">
          <el-input v-model.number="formDataTwo.PId" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="导航名称">
          <el-input v-model="formDataTwo.NavigationName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="导航路径">
          <el-input v-model="formDataTwo.Url" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="导航索引">
          <el-input v-model.number="formDataTwo.Index" auto-complete="off" type="number"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editNavigation = false">取 消</el-button>
        <el-button type="primary" @click="handleEditTwo">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>

export default {

  data() {
    return {
      tableData: [],
      loading: false,
      editNavigation: false,
      addNavigation: false,
      addNavigationtwo: false,
      editNavigationTwo: false,
      loading: true,
      navID: -1,
      navTwoId:-1,
      formData: {
        "NavigationName": "",
        "Url":"",
        "Index": ""
      },
      formDataTwo: {
        "PId":"",//主导航ID
        "NavigationName":"",//二级导航名
        "Url":"",//路径
        "Index": ""
      }
      // 分页数据
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    // 加载导航数据列表
    async loadData() {
      this.loading = true;
      const res = await this.$http.get('navigation');
      // console.log(res)
      if (res.data.Code === 200) {
        this.loading = false;
        this.tableData = res.data.Message;
      } else {
        this.loading = false;
        this.$message({
          type: 'error',
          message: '获取数据失败'
        });
      }
    },
    // 删除一级导航
    handleDelete(navId) {
      // 删除提示
      this.$confirm('是否要删除该分类?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 点击确定按钮
        const res = await this.$http.delete(`navigation/${navId}`);
        // 判断是否删除成功
        if (res.data.Code === 200) {
          this.loadData();
          this.$message({
          type: 'success',
          message: '删除一级导航成功!'
        });
        } else {
          this.$message({
            type: 'error',
            message: '删除一级导航失败!'
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
    // 打开编辑一级导航分类窗口
    async openEdit(response) {
      this.editNavigation = true;
      this.navID = response.Id;
      this.formData.NavigationName = response.NavigationName;
      this.formData.Url = response.Url;
      this.formData.Index = response.Index;

    },
    // 修改一级导航
    async handleEdit() {
      const res = await this.$http.post(`navigation/${this.navID}`, this.formData);
      if (res.data.Code === 200) {
        this.editNavigation = false;
        this.loadData();
        this.$message({
          type: 'success',
          message: '编辑一级导航成功'
        });
      } else {
        this.$message({
          type: 'error',
          message: '编辑一级导航失败'
        });
      }
    },
    // 添加一级导航
    async handleAdd() {
      const res = await this.$http.post('navigation?action=one', this.formData);
      if (res.data.Code === 200) {
        this.loadData();
        this.addNavigation = false;
        this.$message({
          type: 'success',
          message: '添加一级导航成功'
        });
      } else {
        this.$message({
          type: 'error',
          message: '添加一级导航失败'
        });
      }
    },

    // 添加二级导航分类
    async handleAddTwo() {
      const res = await this.$http.post('navigation?action=two', this.formDataTwo);
      if (res.data.Code === 200) {
        this.loadData();
        this.addNavigationtwo = false;
        this.$message({
          type: 'success',
          message: '添加二级导航成功'
        });
      } else {
        this.$message({
          type: 'error',
          message: '添加二级导航失败'
        });
      }
    },
    // 打开编辑二级导航分类窗口
    async openEdittwo(response) {
      this.editNavigationTwo = true;
      this.navTwoId = response.Id;
      this.formDataTwo.PId = response.PId;
      this.formDataTwo.NavigationName = response.NavigationName;
      this.formDataTwo.Url = response.Url;
      this.formDataTwo.Index = response.Index;
    },
    async handleEditTwo() {
      const res = await this.$http.post(`twonavigation/${this.navTwoId}`, this.formDataTwo);
      if (res.data.Code === 200) {
        this.editNavigationTwo = false;
        this.loadData();
        this.$message({
          type: 'success',
          message: '编辑一级导航成功'
        });
      } else {
        this.$message({
          type: 'error',
          message: '编辑一级导航失败'
        });
      }
    },
    // 删除二级导航
    handleDeleteTwo(navIdTwo) {
      // 删除提示
      this.$confirm('是否要删除该分类?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 点击确定按钮
        const res = await this.$http.delete(`twonavigation/${navIdTwo}`);
        // 判断是否删除成功
        if (res.data.Code === 200) {
          this.loadData();
          this.$message({
          type: 'success',
          message: '删除二级导航成功!'
        });
        } else {
          this.$message({
            type: 'error',
            message: '删除二级导航失败!'
          });
        }
      }).catch(() => {
        // 点击取消按钮
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }
};
</script>
<style scoped>
.common {
  margin: 10px 0;
}
</style>
