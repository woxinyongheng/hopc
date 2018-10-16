<template>
    <div class="left">
      <el-tree
              class="itemsource"
              :data="$store.state.itemList"
              :props="defaultProps"
              accordion
              @node-click="handleNodeClick">
      </el-tree>
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
              activePath:'index'

          }
        },
        created(){
          if(!this.$store.state.itemList){
            this.$store.commit('listChange')
          }
        },
        methods:{
            handleNodeClick(a,b,c){
                if(a.path){
                    this.$router.push('/'+a.path)
                }
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
