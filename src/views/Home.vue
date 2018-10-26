
 <template>
  <el-container class="container">
    <!-- 头部 -->
    <el-header class="header">
      <!-- 栅格 -->
      <el-row>
        <el-col :span="4">
          <img src="@/assets/logo.png" alt="交科信用管理有限公司" class="logoimg">
        </el-col>
        <el-col :span="19">
          <div class="title">后台管理系统</div>
        </el-col>
        <el-col :span="1">
          <div class="logout">
            <a href="#" @click.prevent="handleLogout">退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside class="aside" width="200px">
        <!-- default-active 可以让某一个menu-item选中，值是menu-item的index的值
          unique-opened 默认只有一项展开
          开启路由模式， menu-item的index作为路由地址
         -->
        <el-menu
          unique-opened
          router
          style="height: 100%">
          <el-submenu
            v-for="item in menus"
            :key="item.id"
            :index="item.id + ''">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ item.authName }}</span>
            </template>
            <el-menu-item
              v-for="item1 in item.children"
              :key="item1.id"
              :index="'/' + item1.path">
              <i class="el-icon-menu"></i>
              {{ item1.authName }}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menus: [
        {
          id:1,
          authName:"模块管理",
          children:[
            {
              id:1,
              path:"navigation",
              authName:"导航分类"
            },
            {
              id:2,
              path:"banner",
              authName:"banner列表"
            },
            {
              id:3,
              path:"imgtext",
              authName:"图文列表"
            },
            {
              id:4,
              path:"news",
              authName:"新闻列表"
            },
            {
              id:5,
              path:"journal",
              authName:"日志列表"
            },
            {
              id:6,
              path:"staylanguage",
              authName:"留言板列表"
            },
          ]
        },
        {
          id:2,
          authName:"用户管理",
          children:[
            {
              id:1,
              path:"users",
              authName:"用户列表"
            }
          ]
        },
        {
          id:3,
          authName:"密码修改",
          children:[
            {
              id:1,
              path:"password",
              authName:"密码列表"
            }
          ]
        },
      ]
    };
  },
  beforeCreate() {
    // 判断是否登录，token
    var token = sessionStorage.getItem('token');
    if (!token) {
      // 提示
      this.$message.warning('请先登录');
      // 没有token，跳转到登录页面
      this.$router.push('/login');
    }
  },
  created() {
    // 加载菜单数据
    // this.loadMenus();

  },
  methods: {
    // 退出
    handleLogout() {
      // 提示退出成功
      this.$message.success('退出成功');
      // 1 清除token
      sessionStorage.clear();
      // 2 跳转到登录页面
      this.$router.push('/login');
    },
    // 加载菜单数据
    // async loadMenus() {
    //   const response = await this.$http.get('menus');
    //   this.menus = response.data.data;
    //   console.log(response)
    // }
  }
};
</script>

<style>
.container {
  height: 100%;
}
.header {
  background-color: #b3c0d1;
  padding: 0;
}
.header .title {
  text-align: center;
  color: white;
  font-size: 24px;
  line-height: 60px;
}
.header .logout {
  line-height: 60px;
}
.header .logout a {
  color: orange;
  text-decoration: none;
}
.aside {
  background-color: #d3dce6;
}
.main {
  background-color: #e9eef3;
}
.logoimg {
  margin-top: 15px;
  margin-left: 20px;
}
</style>
