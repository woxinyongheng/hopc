<template>
  <div class="top">
    <el-row :gutter="20">
      <el-col :span="12"><div class="grid-content bg-purple">
        <img src="../../../static/images/logo.png" alt="">
        <span class="welcom">欢迎使用医院设备管理云平台</span>
      </div></el-col>
      <el-col :span="12">
        <div class="grid-content topright">
          <div style="padding: 0 30px;display: inline-block;">
            <el-switch
                    @change="changeLeft"
                    v-model="value3">
            </el-switch>
          </div>

          <img src="../../../static/images/avatar.png" alt="">
          <span class="name">{{name}}</span>
          <!--<el-dropdown trigger="click" @command="logoutClick">-->
          <!--<span class="el-dropdown-link">-->
          <!--{{name}}<i class="el-icon-caret-bottom el-icon&#45;&#45;right"></i>-->
          <!--</span>-->
          <!--<el-dropdown-menu slot="dropdown">-->
          <!--<el-dropdown-item class="clearfix" command="a">-->
          <!--退出-->
          <!--</el-dropdown-item>-->

          <!--</el-dropdown-menu>-->
          <!--</el-dropdown>-->
          <span class="logout" @click="logoutClick('a')">退出</span>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
    export default {
        name: "Top",
        data:function () {
            return{
                showlogout:true,
                name:JSON.parse(localStorage.getItem('LOGINDATA')).name,
                value3:true
            }
        },
        methods:{
            logoutClick(item){
                if(item=='a'){
                    localStorage.removeItem('LOGINDATA')
                    localStorage.removeItem('LIST')
                    localStorage.removeItem('activePath')
                    this.$store.commit('loginChangeTrue')
                    this.$router.push('/login')
                }
            },
            changeLeft(bool){
                this.$store.commit('leftShowHandle',bool)
            }
        }
    }
</script>

<style scoped lang="scss">
  .top{
    text-align: left;
    .topright{
      text-align: right;
      .logout{
        width: 20px;
        height: 20px;
        vertical-align: middle;
      }
      span{
        color: #fff;
        font-size: 14px;
        line-height: 60px;
        position: relative;
      }

    }
    .name{
      color: #fff;
      display: inline-block;
      vertical-align: middle;
    }
    .welcom{
      display: inline-block;
      vertical-align: middle;
      color: #fff;
      margin-left: 110px;
    }
    img{
      height: 40px;
      vertical-align: middle;
    }
    .showlogout{
      position: absolute;
      background-color: #fff;
      top: 20px;
      right: 0;
      text-align: left;
      color: #666;
      line-height: 20px;
      width: 100%;
      font-size: 12px;
      color: #999;
      padding: 15px 0;
    }
    .logout{
      padding: 0 10px;
      color: orange !important;
      background: rgba(255,255,255,0.1);
      position: absolute;
      /*top: 30px;*/
      right: -20px;
      height: 60px;
      padding: 21px;
      cursor: pointer;
    }

  }
</style>
