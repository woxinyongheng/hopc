<template>
    <div class="left">
        <div class="logobox">

        </div>
        <!--<el-collapse v-model="activeTitle"  class="itemsource"  @change="handleChange">-->
            <!--<el-collapse-item v-for="(item,index) in $store.state.itemList" :key="index" :name="item.id">-->
                <!--<template slot="title">-->
                    <!--<img class="leftlistimg" src="../../../static/images/list.png" alt="">-->
                    <!--<span class="lefttitle">{{item.menuName}}</span>-->
                <!--</template>-->
                <!--<div v-for="(i,ii) in item.list" :key="ii" class="leftlist" :class="activePath==i.path?'active':''" @click="handleNodeClick(i.path,item.id)">{{i.menuName}}</div>-->
            <!--</el-collapse-item>-->
        <!--</el-collapse>-->
        <el-menu
                :default-active="activePath"
                class="el-menu-vertical-demo"
                @select="handleNodeClick"
                background-color="#27435f"
                unique-opened
                text-color="#fff"
                active-text-color="#66a3ff">
            <el-submenu v-for="(item,index) in $store.state.itemList" :index="item.id+''" :key="index">
                <template slot="title">
                    <img class="leftlistimg" src="../../../static/images/list.png" alt="">
                    <span>{{item.menuName}}</span>
                </template>
                <el-menu-item-group v-for="(it,ii) in item.list" :key="ii">
                    <el-menu-item :index="it.path">{{it.menuName}}</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
      </div>
</template>

<script>
    export default {
        name: "Left",
        data:function () {
          return{
              itemList:[],
              defaultProps: {
                  children: 'list',
                  label: 'menuName'
              },
              activePath:sessionStorage.getItem('activePath') || 'index',

          }
        },
        created(){
          if(!this.$store.state.itemList){
            this.$store.commit('listChange')
          }
        },
        methods:{
            handleNodeClick(a,i){
                this.activePath = a
                sessionStorage.setItem('activePath',a)
                this.$router.push('/'+a)
            },


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
      .leftleft{
          height: 100%;
      }
      .leftlistimg{
          width: 14px;
          height: 14px;
          vertical-align: middle;
      }
      .lefttitle{
          display: inline-block;
          vertical-align: middle;
      }
    .itemsource{
      height: 100%;
      width: 100%;
      text-align: left;
        background-color: #27435f;
        padding-left: 5px;
      /*background:-moz-linear-gradient(top, #3b6179 0%,#6e808b 80% ,#7d757a 100%);*/

      /*background: -webkit-linear-gradient(top, #3b6179 0%,#6e808b 80% ,#7d757a 100%);*/
      color: #fff;
      /*background: rgba(255,255,255,0);*/
        .leftlist{
            color: #ffffff;
            height: 40px;
            line-height: 40px;
            padding-left: 30px;
            cursor: pointer;
        }
        .leftlist:hover{
            background: rgba(0,0,0,0.2);
        }
        .active{
            color: #66a3ff;
        }

    }


  }
</style>
