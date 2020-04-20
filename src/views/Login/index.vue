<template>
    <div id="login">
        登录页
        <el-row>
            <el-button>默认按钮</el-button>
            <el-button type="primary">主要按钮</el-button>
            <el-button type="success">成功按钮</el-button>
            <el-button type="info">信息按钮</el-button>
            <el-button type="warning">警告按钮</el-button>
            <el-button type="danger">危险按钮</el-button>
        </el-row>
    </div>

</template>
<script>
export default {
    name: "login"
}
</script>
<style lang="scss" scoped>
 #login {
     height: 100vh; 
     background-color: #344a5f;
 }
 .login-wrap {
     widows: 33px;
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
 }
 .current {
     background-color: rgba(0,0,0,.1);
 }
</style>