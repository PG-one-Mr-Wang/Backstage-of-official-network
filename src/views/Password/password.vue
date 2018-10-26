<template>
  <el-card>
    <my-breadcrumb level1="密码修改" level2="密码列表"></my-breadcrumb>
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="common">
  <el-form-item label="密码" prop="pass">
    <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="checkPass">
    <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
    <el-button @click="resetForm('ruleForm2')">重置</el-button>
  </el-form-item>
</el-form>

  </el-card>
</template>

<script type="text/javascript">
export default{
   data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          if (value < 18) {
            callback(new Error('必须年满18岁'));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm2.checkPass !== '') {
          this.$refs.ruleForm2.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm2: {
        pass: '',
        checkPass: '',
        age: ''
      },
      rules2: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        age: [
          { validator: checkAge, trigger: 'blur' }
        ]
      }
    };
  },
  created() {
    // this.loadData();
  },
  methods: {
    // async loadData () {
    //   const response = await this.$http.post(`keeper?action=login`, this.fromData);
    //   const { status, data:{ Message}} = response;
    //   // console.log(response)
    //   if (response.data.Code === 200) {
    //     this.$message.success('登录成功');
    //     // 将tocken取到
    //     const token = document.cookie;
    //     // console.log(token)
    //     // 将tocken保存到sessionStorage中
    //     sessionStorage.setItem('token', token);
    //     this.$router.push('/');
    //   } else {
    //     this.$message.error('登录失败');
    //   }
    // },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
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

.common {
  margin: 20px 0;
}

</style>




