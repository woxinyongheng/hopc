const state = {
  isLogin:localStorage.getItem('LOGINDATA') ? true : false,
  //#409eff
  itemList:'',
  loadingShow:false,
    // [
    // {
    //   name: '首页',
    //   path:'index',
    //   icon:'index',
    //   hashChidArr:['index'],
    //   list: [{
    //     name: '首页',
    //     path: 'index',
    //     hashChidArr:['index'],
    //   }]
    // },
    // {
    //   name: '资产管理',
    //   path:'index',
    //   icon:'asset',
    //   hashChidArr:['assetlist','scrappedlist','uselist'],
    //   list: [
    //     {
    //       name: '资产列表',
    //       path: 'assetlist',
    //       hashChidArr:['assetlist'],
    //
    //   },{
    //       name: '报废记录',
    //       path: 'scrappedlist',
    //       hashChidArr:['scrappedlist'],
    //   },{
    //       name: '领用记录',
    //       path: 'uselist',
    //       hashChidArr:['uselist'],
    //   }]
    // },
    // {
    //   name: '系统管理',
    //   path:'index',
    //   icon:'system',
    //   hashChidArr:['classifymanage','codemanage','templateset'],
    //   list: [{
    //     name: '资产分类管理',
    //     path: 'classifymanage',
    //     hashChidArr:['classifymanage'],
    //   },{
    //     name: '资产编码规则',
    //     path: 'codemanage',
    //     hashChidArr:['codemanage'],
    //   },{
    //     name: '标签模板设置',
    //     path: 'templateset',
    //     hashChidArr:['templateset'],
    //   }]
    // }
  // ]

}

export default state
