<template>
    <div class="top">
      <el-row :gutter="20">
        <el-col :span="12"><div class="grid-content bg-purple">
          <img src="../../../static/images/logo.png" alt="">
        </div></el-col>
        <el-col :span="12">
          <div class="grid-content topright">
            <img src="../../../static/images/avatar.png" alt="">
            <el-dropdown trigger="click" @command="logoutClick">
              <span class="el-dropdown-link">
                {{name}}<i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item class="clearfix" command="a">
                    退出
                </el-dropdown-item>

              </el-dropdown-menu>
            </el-dropdown>
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
            name:JSON.parse(localStorage.getItem('LOGINDATA')).name
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

}
</style>
