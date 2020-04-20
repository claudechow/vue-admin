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
        {{title}}
      <div class="login-wrap">
          <ul class="menu-tab">
              <li v-for="item in menuTab" :key="item.id" :class="{'current': item.isCurrent}" @click="toggleMenu(item)">{{item.txt}}</li>
          </ul>
      </div>
    </div>

</template>
<script>
export default {
    name: "login"
    name: "login",
    data(){
        return{
            title:'登录页面',
            menuTab: [
                {txt: '登录',isCurrent: true },
                {txt: '注册',isCurrent: false}
            ],
            
        }
    },
    created(){},

    //挂载完成后自动执行
    mounted(){},

    //事件函数
    methods: {
        toggleMenu(data){
            this.menuTab.forEach(element => {
                element.isCurrent = false
            });
            data.isCurrent = true
        }
    }
}
</script>
<style lang="scss" scoped>
 #login{
     height: 100vh;
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