<template>
    <div class="left">
      <div class="itemsource">
        <div v-for="(item,index) in $store.state.itemList" :key="index">
          <img class="iconimg" :src="'./static/images/'+item.icon+'.png'" alt=""/>
          <span class="labeltitle point">{{item.menuName}}</span>
          <div class="itemlist">
            <p  class="point" v-for="i in $store.state.itemList[index].list" @click="activeClick(i.menuId,i.menuHref)" :class="pathActive==i.menuId?'active':''">{{i.menuName}}</p>
          </div>
        </div>
      </div>

    </div>
</template>

<script>
    export default {
        name: "Left",
        data:function () {
          return{
            activeNum:0,
            itemList:[],
            pathActive:localStorage.getItem('activePath')||'index'
          }
        },
        created(){
          if(!this.$store.state.itemList){
            this.$store.commit('listChange')
          }
        },
        methods:{
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
    padding-left: 20px;
    line-height: 36px;
    font-size: 14px;
    .itemsource{
      text-align: left;
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
