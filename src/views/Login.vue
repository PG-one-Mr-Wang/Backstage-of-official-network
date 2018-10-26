<template>
  <div class="login-wrap">
    <el-form
    class="login-from"
    label-position="top"
    label-width="80px"
    :model="fromData">
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="fromData.UserName"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input @keyup.enter.native="handleLogin" type="password" v-model="fromData.Password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleLogin" class="btn" type="primary">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      fromData: {
        UserName: '',
        Password: ''
      }
    };
  },
  methods: {
    async handleLogin () {
      const response = await this.$http.post(`keeper?action=login`, this.fromData);
      const { status, data:{ Message}} = response;
      // console.log(response)
      if (response.data.Code === 200) {
        this.$message.success('登录成功');
        // 将tocken取到
        const token = document.cookie;
        // console.log(token)
        // 将tocken保存到sessionStorage中
        sessionStorage.setItem('token', token);
        this.$router.push('/');
      } else {
        this.$message.error('登录失败');
      }
    }
  }
};
</script>

<style scoped>
  .login-wrap{
    background-color: #324152;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .login-wrap .login-from{
    background-color: #fff;
    width: 400px;
    border-radius: 5px;
    padding: 30px;
  }
  .login-wrap .login-from .btn{
    width: 100%;
  }
</style>
