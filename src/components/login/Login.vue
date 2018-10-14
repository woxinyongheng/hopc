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
            vm.$http.post('/userLoginController/userLogin', {
                userName: vm.userName,
                passWord: vm.password
              }
            ).then(function (res) {
              if(res.code==200){
                var obj = {}
                obj.companyCode = res.data.companyCode
                obj.hospitalCode = res.data.hospitalCode
                obj.hospitalName = res.data.hospitalName
                obj.id = res.data.id
                obj.name = res.data.name
                obj.officeCode = res.data.officeCode
                obj.roleCode = res.data.roleCode
                obj.roleName = res.data.roleName
                obj.unitCode = res.data.unitCode
                obj.unitName = res.data.unitName
                obj.unitCode = res.data.unitCode
                obj.type = res.data.type
                // var listData = res.data.menuList
                // var itemList = []
                // listData.forEach(function (item) {
                //   if(item.parentId==0){
                //     itemList.push(item)
                //   }
                // })
                // itemList.forEach(function (item,index) {
                //   item.list=[]
                //   listData.forEach(function (list) {
                //     if(item.menuId==list.parentId){
                //       item.list.push(list)
                //     }
                //   })
                //   itemList[index]=item
                // })
                vm.$store.commit('listChange')
                localStorage.setItem('LIST',JSON.stringify(res.data.menuList))
                localStorage.setItem('LOGINDATA',JSON.stringify(obj))
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
