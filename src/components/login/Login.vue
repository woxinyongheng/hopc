<template>
  <div class="login" style="background: url('../../../static/images/bg.png') no-repeat;background-size: 100% 100%" v-if="showLog">
    <div class="logobox">
      <img src="../../../static/images/titlelogo.png" alt="">
    </div>
    <div class="titlebox">
      <img src="../../../static/images/title.png" alt="">

    </div>
    <div class="box">
      <div class="item" style="margin-top: 40px;margin-bottom: 40px">
        <p class="label">用户名</p>
        <el-input class="namereg" v-model="userName" placeholder="请输入用户名"></el-input>
      </div>
      <p class="regtitle" style="margin-top: -20px" v-if="titlename">{{titlename}}</p>

      <div class="item">
        <p class="label">密码</p>
        <el-input type="password" class="passreg" v-model="password" placeholder="请输入密码" @keyup.enter.native="onSubmit"></el-input>
      </div>
      <p class="regtitle" v-if="title">{{title}}</p>
      <div class="item" style="margin-top: 60px">
        <p class="btn" @click="loginClick">登陆</p>
      </div>
      <!--<p class="forgetpass">忘记密码</p>-->
      <div class="download">
        <p><span>下载中心</span> |  <span> 版本信息</span></p>
      </div>
      <div class="tip">
        请使用google浏览器，最佳分辨率1920*1080
      </div>
    </div>
    <div class="power">
      Copyright @ 2018 SINOMIS. All Rights Reserved
    </div>
  </div>
</template>

<script>
    export default {
        name: "Login",
        data:function () {
          return{
            userName:'',
            password:'',
            showLog:false,
              titlename:'',
              title:''

          }
        },
        mounted(){
            if(!sessionStorage.getItem('SESSIONID')){
                this.showLog=true
            }
            if(sessionStorage.getItem('SESSIONID')){
                this.loginClick('session')
            }

        },
        methods:{
          loginClick(judge){
             let str = (judge=='session')?true:false
            var vm =this
            if(!str && (!vm.userName || !vm.password)){
                if(!vm.userName){
                    document.querySelector('.namereg').className='namereg errorinput'
                    this.titlename = '用户名不能为空'
                    return
                }
                if(!vm.password){
                    document.querySelector('.passreg').className='passreg errorinput'
                    this.title = '密码不能为空'

                    return
                }
            }
            if(str && !JSON.parse(sessionStorage.getItem('SESSIONID')).sessionId){
                this.showLog=true
                return
            }
            vm.$http.post('userLoginController/userLogin', {
                userName: str?JSON.parse(sessionStorage.getItem('SESSIONID')).userName:vm.userName,
                password: str?JSON.parse(sessionStorage.getItem('SESSIONID')).password:vm.password,
                sessionId:str?JSON.parse(sessionStorage.getItem('SESSIONID')).sessionId:'',

              }
            ).then(function (res) {
              if(res.code==200){
                  localStorage.setItem('LOGINDATA',JSON.stringify(res.data))
                  localStorage.setItem('LIST',JSON.stringify(res.data.menuList))
                  vm.$store.commit('listChange')
                  vm.$store.commit('loginChangeTrue')
                  let _path = vm.$store.state.itemList[0].list[0].menuHref
                  vm.$router.push('/'+_path)
              }else{
                  vm.showLog=true
                  sessionStorage.removeItem('SESSIONID')
              }

            })
          }
        }
    }
</script>

<style scoped lang="scss">
  .login {
    /*width: 100%;*/
    height: 100%;
    /*background: url("/static/images/bg.png") no-repeat;*/
    /*background-size: 100% 100%;*/
    background-color: #3267bf;
    position: relative;
    min-width: 1300px;
    text-align: center;
    .logobox {
      position: absolute;
      top: 40px;
      right: 40px;
    }
    .titlebox {
      position: absolute;
      top: 30%;
      right: 45%;
      img {
        /*width: 520px;*/
      }
    }
    .nametitle {
      position: absolute;
      top: 30%;
      color: #fff;
      font-size: 50px;
      font-weight: bolder;
      width: 100%;
      text-align: center;
    }
    .power {
      position: absolute;
      width: 100%;
      text-align: center;
      color: #fff;
      bottom: 20px;
    }
    .box {
      width: 380px;
      height: 500px;
      padding: 10px;
      position: absolute;
      right: 300px;
      top: 280px;
      background-color: #fff;
      border-top: 8px solid #27bfbd;
      /*margin: 50px auto;*/
      box-shadow: 0 0 10px #999;
      .regtitle {
        color: #f56c6c;
        font-size: 12px;
        text-align: left;
        margin-top: 10px;
        padding-left: 10%;
      }
      .item {
        margin: 0px auto;
        width: 80%;
        height: 60px;
        line-height: 60px;
        margin-bottom: 60px;
        .label {
          font-size: 15px;
          color: #666;
          text-align: left;
          line-height: 20px;
        }
        .btn {
          height: 40px;
          line-height: 40px;
          border-radius: 20px;
          color: #fff;
          text-align: center;
          background-color: #27bfbd;
          cursor: pointer;

        }
      }
      .forgetpass {
        text-align: left;
        color: #999999;
        font-size: 14px;
        padding-left: 10%;
        cursor: pointer;
        margin-bottom: 40px;
      }
      .download {
        color: #599392;
        font-size: 14px;
        height: 20px;
        line-height: 20px;
        span {
          cursor: pointer;
        }
      }
      .tip {
        font-size: 14px;
        color: #999999;
        height: 30px;
        line-height: 30px;
      }
    }
  }
</style>
