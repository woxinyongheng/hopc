<template>
    <div class="login">
      <div class="box" v-if="showLog">
        <div class="item">
          <el-input v-model="userName" placeholder="请输入账号"></el-input>
        </div>
        <div class="item">
          <el-input v-model="password" placeholder="请输入密码"></el-input>
        </div>
        <div class="item">
          <el-button @click="loginClick">登陆</el-button>
        </div>
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
            showLog:false
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
              return
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
.login{
  .box{
    width: 500px;
    height: 300px;
    padding: 10px;
    margin: 50px auto;
    box-shadow:0 0 10px #999;
    .item{
      height: 60px;
      line-height: 60px;
    }
  }
}
</style>
