<template>
  <div class="login-wrap">
    <div class="main">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <h3>聊天室注册</h3>
        <el-divider></el-divider>
        <el-form-item label="用户名" prop="name">
          <el-input placeholder="请输入用户名" v-model.number="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" placeholder="请输入密码" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" placeholder="请再次输入密码" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <router-link to="/login" style="float: right">注册完成，马上登录</router-link>
        <br>
        <el-form-item>
          <el-button icon="el-icon-magic-stick" @click="submitForm('ruleForm')">注 册</el-button>
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
      }else if(!isNaN(value)) {
        return callback(new Error('用户名不能为数字'));
      }
      callback();
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: '',
        checkPass: '',
        name: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
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
        message: '注册成功',
        type: 'success'
      });
    },
    open4() {
      this.$message.error('用户名已经被使用');
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.handleSignup()
        } else {
          return false;
        }
      });
    },
    handleSignup() {
      this.$axios.
      post('/sign_up', {
          username: this.ruleForm.name,
          password: this.ruleForm.pass,
      }).then(res => {
        if (res.data.code === 200) {
          this.open2()
        }
      }).
      catch(resp => { // 除了请求失败的情况
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
  /*background: url("../static/login1.jpeg") center center no-repeat;*/
  background-size: 100% 100%;
  position: fixed;
}

h3 {
  color: #42b983;
  font-size: 24px;
}

hr {
  background-color: #444;
  margin: 20px auto;
}

a {
  text-decoration: none;
  color: #42b983;
  font-size: 15px;
}

a:hover {
  color: coral;
}

.el-button {
  background-color: #42b983;
  width: 70%;
  margin-left: -50px;
}
</style>