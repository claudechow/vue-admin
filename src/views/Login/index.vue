<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          v-for="item in menuTab"
          :key="item.id"
          :class="{ current: item.isCurrent }"
          @click="toggleMenu(item)"
        >
          {{ item.txt }}
        </li>
      </ul>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="login-form"
        size="medium"
      >
        <el-form-item prop="username" class="item-form">
          <label for="username">邮箱</label>
          <el-input
            id="username"
            type="text"
            v-model="ruleForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password" class="item-form">
          <label for="password">密码</label>
          <el-input
            id="password"
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item
          prop="checkPass"
          class="item-form"
          v-show="modelType == 'register'"
        >
          <label for="checkPass">确认密码</label>
          <el-input
            id="checkPass"
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item prop="code" class="item-form">
          <label for="code">验证码</label>
          <el-row :gutter="10">
            <el-col :span="15"
              ><el-input
                id="code"
                v-model="ruleForm.code"
                minlength="6"
                maxlength="6"
              ></el-input
            ></el-col>
            <el-col :span="9">
              <el-button type="success" class="block-form" @click="getSms"
                >获取验证码</el-button
              >
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-button
            type="danger"
            class="login-btn block-form"
            @click="submitForm('ruleForm')"
            :disabled="subButtonStats"
            >{{ modelType == "login" ? "登陆" : "注册" }}</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
//必须引入 api 相关的内容
import { reactive, ref, onMounted } from "@vue/composition-api";
import { GetSms } from "@/api/login";
import {
  validateStr,
  validateEmail,
  validatePass,
  validateVCode
} from "@/utils/validate";
export default {
  name: "login",
  // setup(props,context){
  //解构
  setup(props, { refs, root }) {
    //ref 对象需要使用.value取到内部值
    const modelType = ref("login");
    //提交按钮状态
    const subButtonStats = ref(true);
    const menuTab = reactive([
      { txt: "登录", isCurrent: true, type: "login" },
      { txt: "注册", isCurrent: false, type: "register" }
    ]);
    //表单绑定数据
    const ruleForm = reactive({
      username: "claudesoft@163.com",
      password: "wo123456789",
      passwords: "",
      code: ""
    });

    //验证用户名
    let validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (validateEmail(value)) {
        callback(new Error("邮箱格式不正确!!"));
      } else {
        callback();
      }
    };
    //验证密码
    let validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (validateStr(value)) {
        callback(new Error("密码包含特殊字符"));
      } else if (validatePass(value)) {
        callback(new Error("请输入6至20位的字母+数字"));
      } else {
        callback();
      }
    };
    //验证确认密码
    let validatecheckPass = (rule, value, callback) => {
      if (modelType.value == "login") {
        callback();
      } else if (value === "") {
        callback(new Error("请输入确认密码"));
      } else if (value != ruleForm.password) {
        callback(new Error("两次密码输入不一致"));
        //当前页面如果是登录操作，就不验证这个表单元素
      } else {
        callback();
      }
    };
    //验证验证码
    let validateCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (validateVCode(value) || validateStr(value)) {
        callback(new Error("验证码格式有误"));
      } else {
        callback();
      }
    };

    // 表单的验证
    const rules = reactive({
      username: [{ validator: validateUsername, trigger: "blur" }],
      password: [{ validator: validatePassword, trigger: "blur" }],
      checkPass: [{ validator: validatecheckPass, trigger: "blur" }],
      code: [{ validator: validateCode, trigger: "blur" }]
    });
    //事件函数
    const toggleMenu = data => {
      menuTab.forEach(element => {
        element.isCurrent = false;
      });
      data.isCurrent = true;
      modelType.value = data.type;
    };
    //获取验证码
    const getSms = () => {
      //邮箱为空
      if (ruleForm.username == "") {
        root.$message.error("邮箱不能为空!!");
        return false;
      }
      if (validateEmail(ruleForm.username)) {
        root.$message.error("邮箱格式不正确!!");
        return false;
      }
      //请求服务器接口 获取验证码/GetSms
      let requestData = {
        username: ruleForm.username,
        module: modelType.value
      };
      GetSms(requestData)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    };
    //提交
    const submitForm = formName => {
      refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };

    //挂载完成后自动执行
    onMounted(() => {});

    return {
      subButtonStats,
      menuTab,
      modelType,
      submitForm,
      toggleMenu,
      ruleForm,
      rules,
      getSms
    };
  }
};
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
    background-color: rgba(0, 0, 0, 0.1);
  }
}
.login-form {
  margin-top: 29px;
  label {
    display: block;
    margin-bottom: 3px;
    font-size: 14px;
    color: #fff;
  }
  .item-form {
    margin-bottom: 13px;
  }
  .block-form {
    display: block;
    width: 100%;
  }
  .login-btn {
    margin-top: 19px;
  }
}
</style>
