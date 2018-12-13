<template>
    <div class="left">
        <el-menu
                :default-active="activePath"
                class="el-menu-vertical-demo"
                @select="handleNodeClick"
                background-color="#27435f"
                unique-opened
                text-color="#fff"
                active-text-color="#66a3ff">
            <el-menu-item  v-for="(item,index) in $store.state.itemList" :index="item.menuId+''" :key="index" v-if="item.menuHref">
                <template slot="title">
                    <img class="leftlistimg" src="../../../static/images/list.png" alt="">
                    <span>{{item.menuName}}</span>
                </template>
            </el-menu-item>

            <el-submenu v-for="(item,index) in $store.state.itemList" :index="item.menuId+''" :key="index" v-if="!item.menuHref">
                <template slot="title">
                    <img class="leftlistimg" src="../../../static/images/list.png" alt="">
                    <span>{{item.menuName}}</span>
                </template>
                <el-menu-item-group v-for="(it,ii) in item.list" :key="ii">
                    <el-menu-item :index="it.menuHref">{{it.menuName}}</el-menu-item>
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
              activePath:sessionStorage.getItem('activePath') || (this.$store.state.itemList[0]?(this.$store.state.itemList[0].menuHref?this.$store.state.itemList[0].menuId:this.$store.state.itemList[0].list[0].menuHref):''),

          }
        },
        mounted(){
            if(!this.$store.state.itemList){
                this.$store.commit('listChange')
                this.activePath = sessionStorage.getItem('activePath') || (this.$store.state.itemList[0]?(this.$store.state.itemList[0].menuHref?this.$store.state.itemList[0].menuId:this.$store.state.itemList[0].list[0].menuHref):'')
            }
        },
        created(){
          if(!this.$store.state.itemList){
            this.$store.commit('listChange')
              this.activePath = sessionStorage.getItem('activePath') || (this.$store.state.itemList[0]?(this.$store.state.itemList[0].menuHref?this.$store.state.itemList[0].menuId:this.$store.state.itemList[0].list[0].menuHref):'')
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
