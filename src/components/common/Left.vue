<template>
    <div class="left">
      <el-tree
              class="itemsource"
              :data="$store.state.itemList"
              :props="defaultProps"
              accordion
              @node-click="handleNodeClick">
      </el-tree>
        <!--<div v-for="(item,index) in $store.state.itemList" :key="index">-->
          <!--<img class="iconimg" :src="'./static/images/'+item.icon+'.png'" alt=""/>-->
          <!--<span class="labeltitle point">{{item.menuName}}</span>-->
          <!--<div class="itemlist">-->
            <!--<p  class="point" v-for="i in $store.state.itemList[index].list" @click="activeClick(i.menuId,i.menuHref)" :class="pathActive==i.menuId?'active':''">{{i.menuName}}</p>-->
          <!--</div>-->
        <!--</div>-->
      </div>
</template>

<script>
    export default {
        name: "Left",
        data:function () {
          return{
            activeNum:0,
            itemList:[],
            pathActive:localStorage.getItem('activePath')||'index',
              defaultProps: {
                  children: 'list',
                  label: 'menuName'
              }
          }
        },
        created(){
          if(!this.$store.state.itemList){
            this.$store.commit('listChange')
          }
        },
        methods:{
            handleNodeClick(){

            },
          activeClick(path,menuHref){
            if(this.pathActive==path) return
            this.pathActive = path
            localStorage.setItem('activePath',path)
            this.$router.push('/'+menuHref)
          }
        },
    }
</script>

<style scoped lang="scss">
  .left {
    /*padding-left: 20px;*/
    line-height: 36px;
    font-size: 14px;
    height: 100%;
    width: 100%;
    .itemsource{
      height: 100%;
      width: 100%;
      text-align: left;
      background:-moz-linear-gradient(top, #3b6179 0%,#6e808b 80% ,#7d757a 100%);

      background: -webkit-linear-gradient(top, #3b6179 0%,#6e808b 80% ,#7d757a 100%);
      color: #fff;
      /*background: rgba(255,255,255,0);*/
      .labeltitle{
        font-weight: bold;
      }
      .iconimg{
        width:14px;
        height: 14px;
        vertical-align: middle;
      }
      .itemlist{
        padding-left: 40px;
        font-size: 14px;
      }
      .point{
        cursor: pointer;
      }
      .active{
        color: #409eff;
      }
    }


  }
</style>
