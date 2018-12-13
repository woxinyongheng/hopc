<template>
  <div id="app"  v-loading="loading" element-loading-text="拼命加载中"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.5)">
    <!--<el-container v-if="isLogin">-->
      <!--<el-aside v-if="showLeftValue" width="260px" class="left">-->
        <!--<Left></Left>-->
      <!--</el-aside>-->
      <!--<el-container>-->
        <!--<el-header>-->
          <!--<Top></Top>-->
        <!--</el-header>-->
        <!--<el-main>-->
          <!--<router-view v-if="isLoginjudge"/>-->
        <!--</el-main>-->
        <!--<el-footer  v-if="isLoginjudge" class="power"> Copyright @ 2018 SINOMIS. All Rights Reserved</el-footer>-->
      <!--</el-container>-->
    <!--</el-container>-->
    <el-container v-if="isLogin">
      <el-header><Top></Top></el-header>
      <el-container>
        <el-aside v-if="showLeftValue" width="260px" class="left">
          <Left></Left>
        </el-aside>
        <el-container>
          <el-main>
            <router-view v-if="isLoginjudge"/>

          </el-main>
          <el-footer v-if="isLoginjudge" class="power">
            Copyright @ 2018 SINOMIS. All Rights Reserved
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
    <!--<el-container v-if="isLogin">-->
      <!--<el-header>-->
        <!--<Top></Top>-->
      <!--</el-header>-->
      <!--<el-container>-->
        <!--<el-aside v-if="showLeftValue" width="260px" class="left">-->
          <!--<Left></Left>-->
        <!--</el-aside>-->
        <!--<el-main>-->
          <!--<router-view v-if="isLoginjudge"/>-->
          <!--&lt;!&ndash;<div :class="showLeftValue?'power':'powerl'">&ndash;&gt;-->
            <!--&lt;!&ndash;Copyright @ 2018 SINOMIS. All Rights Reserved&ndash;&gt;-->
          <!--&lt;!&ndash;</div>&ndash;&gt;-->
        <!--</el-main>-->
        <!--<el-footer v-if="isLoginjudge"> Copyright @ 2018 SINOMIS. All Rights Reserved</el-footer>-->
      <!--</el-container>-->
    <!--</el-container>-->
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
        mounted(){
            // this.initSocket()
            // this.threadPoxi(JSON.parse(localStorage.getItem('LOGINDATA')).id)
          if(JSON.parse(localStorage.getItem('LOGINDATA')).id){
              this.initSocket()
              this.threadPoxi(JSON.parse(localStorage.getItem('LOGINDATA')).id)
          }
        },
        methods:{
            threadPoxi(agentData) {  // 实际调用的方法
                let vm = this
                //参数
                if (this.websock.readyState === this.websock.OPEN) {

                }
                else if (this.websock.readyState === this.websock.CONNECTING) {
                    let that = this;//保存当前对象this
                    setTimeout(function () {
                        that.websocketsend(agentData)
                    }, 300);
                }
                else {
                    this.initWebSocket();
                    let that = this;//保存当前对象this
                    setTimeout(function () {
                        that.websocketsend(agentData)
                    }, 500);
                }
            },
            initSocket() {
                let vm = this
                //ws地址
                const wsuri = 'wss://imasdev.logimis.com/webSocket';
                this.websock = new WebSocket(wsuri);
                this.websock.onmessage = this.websocketonmessage;
                this.websock.onclose = this.websocketclose;

            },
            websocketonmessage(e) { //数据接收
                let vm = this
                let _data = JSON.parse(e.data)
                if(_data.pushType=='0'){
                    vm.$notify({
                        title: '系统消息',
                        message: _data.message,
                        duration: 0
                    });
                }else if(_data.pushType=='1'){
                    vm.websocketclose()
                    localStorage.removeItem('LOGINDATA')
                    localStorage.removeItem('LIST')
                    localStorage.removeItem('activePath')
                    if(sessionStorage.getItem('SESSIONID')){
                        sessionStorage.removeItem('SESSIONID')
                    }
                    vm.$store.commit('loginChangeTrue')
                    vm.$router.push('/login')
                }

            },
            websocketsend(agentData) {//数据发送
                this.websock.send(agentData);
            },
            websocketclose(e) {  //关闭
                let vm =this
                vm.linkstatus = 'off'  //状态链接
            },
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
    min-width: 1100px;
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
      background-color: #fff;
      text-align: center;
      font-size: 12px;
      color: #666;

    }

  }
</style>
