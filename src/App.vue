<template>
  <div id="app"  v-loading="loading" element-loading-text="拼命加载中"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.5)">
    <el-container v-if="isLogin">
      <el-header>
        <Top></Top>
      </el-header>
      <el-container>
        <el-aside v-if="showLeftValue" width="200px" class="left" style="background: linear-gradient(top, #3b6179 0%,#6e808b 80% ,#7d757a 100%);">
          <Left></Left>
        </el-aside>
        <el-main>
          <router-view v-if="isLoginjudge"/>
          <div :class="showLeftValue?'power':'powerl'">
            Copyright @ 2018 SINOMIS. All Rights Reserved
          </div>
        </el-main>
      </el-container>
    </el-container>
    <router-view v-if="!isLoginjudge"/>
  </div>
</template>

<script>
    import Left from '@/components/common/Left'
    import Top from '@/components/common/Top'

    export default {
        name: 'App',
        data:function () {
            return{
                isLoginjudge:localStorage.getItem('LOGINDATA'),
                loading:false,
                showLeftValue:true

            }
        },
        computed:{
            isLogin(){
                return this.$store.state.isLogin
            },
            isLoading(){
                return this.$store.state.loadingShow
            },
            isShowLeft(){
                return this.$store.state.leftShow
            }
        },
        watch:{
            isLogin:function (val) {
                this.isLoginjudge = val
            },
            isLoading:function (val) {
                this.loading = val
            },
            isShowLeft(val){
                this.showLeftValue = val
            }
        },
        components:{
            Left,Top
        }
    }
</script>

<style lang="scss" scoped>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    height: 100%;
    .el-header, .el-footer {
      background-color: #27435f;//7d757a
      color: #333;
      line-height: 60px;
    }
    .el-container{
      height: 100%;
    }

    .el-aside {
      background:-moz-linear-gradient(top, #27435f 0%,#27435f 80% ,#3b6179 100%);

      background: -webkit-linear-gradient(top, #27435f 0%,#27435f 80% ,#3b6179 100%);
      /*!*background-color: #D3DCE6;*!*/
      color: #fff;
      height: 100%;
      text-align: left;
    }

    .el-main {
      background-color: #E9EEF3;
      color: #333;
      min-width: 1000px;
    }

    body > .el-container {
      margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
      line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
      line-height: 320px;
    }
    .power{
      height: 40px;
      line-height: 40px;
      background-color: #fff;
      font-size: 12px;
      position: absolute;
      bottom: 0;
      left: 200px;
      width: calc(100% - 198px);
      box-shadow: 0 -2px 5px #999;
      z-index: 9999;
    }
    .powerl{
      height: 40px;
      line-height: 40px;
      background-color: #fff;
      font-size: 12px;
      position: absolute;
      bottom: 0;
      left: 0px;
      width: 100%;
      box-shadow: 0 -2px 5px #999;
      z-index: 9999;
    }
  }
</style>
