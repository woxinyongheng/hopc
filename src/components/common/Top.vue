<template>
  <div class="top">
    <el-row :gutter="20">
      <el-col :span="12"><div class="grid-content bg-purple">
        <img src="../../../static/images/logo.png" alt="">
        <span class="welcom" @click="changeLeft"><img src="../../../static/images/left.png" alt=""></span>
      </div></el-col>
      <el-col :span="12">
        <div class="grid-content topright">
          <div style="padding: 0 30px;display: inline-block;">
            <!--<el-switch-->
                    <!--@change="changeLeft"-->
                    <!--v-model="value3">-->
            <!--</el-switch>-->
            <span class="welcom">欢迎使用医院设备管理云平台</span>
          </div>
          <img src="../../../static/images/avatar.png" alt="">
          <span class="name">{{name}}</span>
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
                value3:true,

            }
        },
        methods:{
            logoutClick(item){
                if(item=='a'){
                    localStorage.removeItem('LOGINDATA')
                    localStorage.removeItem('LIST')
                    localStorage.removeItem('activePath')
                    if(sessionStorage.getItem('SESSIONID')){
                        sessionStorage.removeItem('SESSIONID')
                    }
                    this.$store.commit('loginChangeTrue')
                    this.$router.push('/login')
                }
            },
            changeLeft(){
                this.value3 = !this.value3
                this.$store.commit('leftShowHandle',this.value3)
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
      img{
        cursor: pointer;
        width: 30px;
        height: 30px;
      }
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
