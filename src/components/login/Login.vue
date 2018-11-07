<template>
    <div class="login">
      <div class="box">
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
            password:''
          }
        },
        methods:{
          loginClick(){
            var vm =this
            if(!vm.userName || !vm.password){
              return
            }
            vm.$http.post('userLoginController/userLogin', {
                userName: vm.userName,
                password: vm.password
              }
            ).then(function (res) {
              if(res.code==200){
                  localStorage.setItem('LOGINDATA',JSON.stringify(res.data))
                  localStorage.setItem('LIST',JSON.stringify(res.data.menuList))
                  vm.$store.commit('listChange')

                  vm.$store.commit('loginChangeTrue')
                  vm.$router.push('/index')
              }

            })
            // var obj = {
            //   unitCode:'BJSCSYGJ',
            //   hospitalCode:'ZXYSHJ',
            //   userId:'4a00ebaa0219423daa55e07046f2edf9',
            //   userName:'张鹏',
            //   roleCode:'corpAdmin,default'
            // }
            // localStorage.setItem('LOGINDATA',JSON.stringify(obj))
            // this.$store.commit('loginChangeTrue')
            // this.$router.push('/index')
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
