<template>
  <div class="login-wrap">
    <div class="main">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <h3>聊天室登录</h3>
        <el-divider></el-divider>
        <el-form-item label="用户名" prop="name">
          <el-input placeholder="请输入用户名" v-model.number="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" placeholder="请输入密码" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <router-link to="/signup" style="float: right">我要注册</router-link>
        <br>
        <el-form-item>
          <el-button type="primary" icon="el-icon-upload"  @click="submitForm('ruleForm')">登 录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'));
      }
      callback();
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码不能为空'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    return {
      ruleForm: {
        pass: '',
        name: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        name: [
          { validator: checkName, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    open2() {
      this.$message({
        message: '登录成功',
        type: 'success'
      });
    },
    open4() {
      this.$message.error('帐号或者密码错误');
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.handleLogin()
        } else {
          return false;
        }
      });
    },
    handleLogin() {
      this.$axios.
      post('/sign_in', {
        username: this.ruleForm.name,
        password: this.ruleForm.pass,
      }).then(res => {
        if (res.data.status === 200) {
          this.open2()
          localStorage.setItem('token', 'Bearer'+res.data.data.token)
          localStorage.setItem('username', this.ruleForm.name)
          localStorage.setItem('enter', 'Yes');
          this.$router.replace({
            path: '/chat'
          });
        }
      }).catch(error => {
        this.open4()
      });
    }
  }
}
</script>

<style scoped>

.main {
  text-align: center;
  border-radius: 20px;
  width: 300px;
  height: 350px;
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.login-wrap {
  width: 100%;
  height: 100vh;
  background-size: 100% 100%;
  position: fixed;
}

h3 {
  color: #409EFF;
  font-size: 24px;
}

hr {
  background-color: #444;
  margin: 20px auto;
}

a {
  text-decoration: none;
  color: #409EFF;
  font-size: 15px;
}

a:hover {
  color: coral;
}

.el-button {
  width: 70%;
  margin-left: -50px;
}
</style>