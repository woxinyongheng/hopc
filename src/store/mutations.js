import * as types from './mutations-type'

const mutations = {
  loginChangeTrue(state) {
    state.isLogin = localStorage.getItem('LOGINDATA') ? true : false
  },
  listChange(state){
    if(!localStorage.getItem('LIST')){
      return
    }
    var listData = JSON.parse(localStorage.getItem('LIST'))
    var itemList = []
    listData.forEach(function (item) {
      if(item.parentId==0){
        itemList.push(item)
      }
    })
    itemList.forEach(function (item,index) {
      item.list=[]
      listData.forEach(function (list) {
        if(item.menuId==list.parentId){
          item.list.push(list)
        }
      })
      itemList[index]=item
    })
    state.itemList = itemList
  },
  spinShowSet(state,bool){
    state.loadingShow = bool
  },
    leftShowHandle(state,bool){
        state.leftShow = bool
    }
}

export default mutations
