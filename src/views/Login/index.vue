<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li v-for="item in menuTab" :key="item.id" :class="{'current': item.isCurrent}" @click="toggleMenu(item)">
          {{item.txt}}
        </li>
      </ul>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"  class="login-form" size="medium">

        <el-form-item prop="username" class="item-form"> 
          <label>邮箱</label>
            <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item  prop="password" class="item-form">
          <label>密码</label>
            <el-input type="password" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>

        <el-form-item  prop="checkPass" class="item-form" v-show="modelType == 'register'">
          <label>确认密码</label>
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>

        <el-form-item  prop="code" class="item-form">
          <label>验证码</label>
          <el-row :gutter="10">
            <el-col :span="15"><el-input v-model="ruleForm.code" minlength="6" maxlength="6"></el-input></el-col>
            <el-col :span="9">
              <el-button type="success" class="block-form" >获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-button type="danger" class="login-btn block-form" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>
<script>
import {validateStr,validateEmail,validatePass,validateVCode} from '@/utils/validate';
export default {
  name: "login",
  data(){
    //验证用户名
    var validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else if(validateEmail(value)) {
        callback(new Error('请输入正确的用户名'));
      }else{
        callback();
      }
    };
    //验证密码
    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      }else if(validateStr(value)){
        callback(new Error('密码包含特殊字符'));
      } else if(validatePass(value)) {
        callback(new Error('请输入6至20位的字母+数字'));
      }else{
        callback();
      }
    };
    //验证确认密码
    var validatecheckPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入确认密码'));
      }else if(value != this.ruleForm.password){
        callback(new Error('两次密码输入不一致'));
       //当前页面如果是登录操作，就不验证这个表单元素
      }else if (this.modelType == 'login'){
        callback();
      }else{
        callback();
      }
    };
    //验证验证码
    var validateCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'));
      } else if(validateVCode(value)||validateStr(value)) {
        callback(new Error('验证码格式有误'));
      }else{
        callback();
      }
    };
    return{
      menuTab: [
        {txt: '登录',isCurrent: true ,type: 'login'},
        {txt: '注册',isCurrent: false,type: 'register'}
      ],
      modelType: 'login',
      ruleForm: {
        username: '',
        password: '',
        checkPass: '',
        code: ''
      },
      rules: {
        username: [
          { validator: validateUsername, trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatecheckPass, trigger: 'blur' }
        ],
        code: [
          { validator: validateCode, trigger: 'blur' }
        ]
      }
        
    }
  },
  created(){},
  //挂载完成后自动执行
  mounted(){},
  //事件函数
  methods: {
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
    toggleMenu(data){
      this.menuTab.forEach(element => {
        element.isCurrent = false
      });
      data.isCurrent = true
      this.modelType = data.type
    }
  }
}
</script>
<style lang="scss" scoped>

#login {
  height: 100vh; 
  background-color: #344a5f;
 }
.login-wrap {
  width: 330px;
  margin: auto;
}
.menu-tab {
  text-align: center;
    li {
      display: inline-block;
      width: 88px;
      line-height: 36px;
      font-size: 14px;
      color: #fff;
      border-radius: 2px;
      cursor: pointer;
    }
    .current {
      background-color: rgba(0,0,0,.1);
    }
 }
 .login-form{
  margin-top:29px;
  label{
    display: block;
    margin-bottom: 3px;
    font-size: 14px;
    color: #fff;

  }
  .item-form{
    margin-bottom: 13px;
  }
  .block-form{
    display: block;
    width: 100%;
  }
  .login-btn{
    margin-top: 19px;
  }
 }

</style>