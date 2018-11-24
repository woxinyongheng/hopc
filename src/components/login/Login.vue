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
        mounted(){
            // this.loginClick()
        },
        methods:{
            getUrl(para){
                let paraArr = location.search.substring(1).split('&')
                for (let i = 0; i < paraArr.length; i++) {
                  if(para == paraArr[i].split('=')[0]){
                      return paraArr[i].split('=')[1]
                  }
                }
                return ''
            },
          loginClick(){
            var vm =this
            if(!vm.userName || !vm.password){
              return
            }
            vm.$http.post('userLoginController/userLogin', {
                userName: vm.userName,
                password: vm.password,
                // userName: vm.getUrl('userName'),
                // password: vm.getUrl('password'),
                // sessionId:vm.getUrl('sessionId')

              }
            ).then(function (res) {
              if(res.code==200){
                  localStorage.setItem('LOGINDATA',JSON.stringify(res.data))
                  localStorage.setItem('LIST',JSON.stringify(res.data.menuList))
                  vm.$store.commit('listChange')
                  vm.$store.commit('loginChangeTrue')
                  let _path = vm.$store.state.itemList[0].list[0].menuHref
                  vm.$router.push('/'+_path)
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
