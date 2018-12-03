const state = {
  isLogin:localStorage.getItem('LOGINDATA') ? true : false,
    leftShow:true,

    //#409eff
  // itemList:'',
  loadingShow:false,
    itemList:'',
    //     itemList:[
    // {
    //     menuName: '首页',
    //   path:'index',
    //   icon:'index',
    //     menuId:1,
    //   hashChidArr:['index'],
    //   list: [{
    //       menuName: '首页',
    //       menuHref: 'index',
    //     hashChidArr:['index'],
    //   }]
    // },
    //     {
    //         menuName: '用户管理',
    //         hashChidArr:['usermanage'],
    //         menuId:2,
    //         list: [{
    //             menuName: '用户管理',
    //             menuHref: 'usermanage',
    //             hashChidArr:['usermanage'],
    //         }]
    //     },
    // //    医院主管
    //     {
    //         menuName: '医院主管-我的事项',
    //         // path:'HSMyWarranty',
    //         hashChidArr:['HSMyWarranty'],
    //         menuId:3,
    //         list: [{
    //             menuName: '我的报修',
    //             menuHref: 'HSMyWarranty',
    //         }]
    //     },{
    //         menuName: '医院主管-设备管理',
    //         menuId:4,
    //         // path:'HSMtList',
    //         hashChidArr:['HSMtList','HSMtmanage','HSGdManage','HSEtList','HSSpList','HSDlList','HSTaList'],
    //         list: [{
    //             menuName: '设备列表',
    //             menuHref: 'HSMtList',
    //         },{
    //             menuName: '设备管理员',
    //             menuHref: 'HSMtmanage',
    //         },{
    //             menuName: '维保公司管理',
    //             menuHref: 'HSGdManage',
    //         },{
    //             menuName: '延期记录',
    //             menuHref: 'HSEtList',
    //         },{
    //             menuName: '报废记录',
    //             menuHref: 'HSSpList',
    //         },{
    //             menuName: '质保到期处理记录',
    //             menuHref: 'HSDlList',
    //         },{
    //             menuName: '管理任务分配',
    //             menuHref: 'HSTaList',
    //         },]
    //     },{
    //         menuName: '医院主管-维保管理',
    //         menuId:5,
    //         // path:'HSPlanTask',
    //         hashChidArr:['HSPlanTask','HSWorkOrder','HSMtTask'],
    //         list: [{
    //             menuName: '计划任务',
    //             menuHref: 'HSPlanTask',
    //         },{
    //             menuName: '维修工单',
    //             menuHref: 'HSWorkOrder',
    //         },{
    //             menuName: '保养任务',
    //             menuHref: 'HSMtTask',
    //         }]
    //     },{
    //         menuName: '医院主管-统计分析',
    //         menuId:6,
    //         // path:'HSSaList',
    //         hashChidArr:['HSSaList'],
    //         list: [{
    //             menuName: '统计分析',
    //             menuHref: 'HSSaList',
    //         }]
    //     },
    // //    医院设备管理
    //     {
    //         menuName: '医院设备-我的事项',
    //         menuId:7,
    //         // path:'HMWaitTask',
    //         hashChidArr:['HMWaitTask','HMPlanReview','HMLifeEx','HMWarrEx','HMMyRepair'],
    //         list: [
    //             {
    //                 menuName: '待办工作',
    //                 menuHref: 'HMWaitTask',
    //             },
    //             {
    //                 menuName: '计划审核',
    //                 menuHref: 'HMPlanReview',
    //             },
    //             {
    //                 menuName: '寿命到期',
    //                 menuHref: 'HMLifeEx',
    //             },
    //             {
    //                 menuName: '质保到期',
    //                 menuHref: 'HMWarrEx',
    //             },
    //             {
    //                 menuName: '我的报修',
    //                 menuHref: 'HMMyRepair',
    //             },
    //         ]
    //     },
    //     {
    //         menuName: '医院设备-设备管理',
    //         menuId:8,
    //         // path:'HMMtList',
    //         hashChidArr:['HMMtList','HMGdManage','HMEtList','HMSpList','HMDlList','HMTaList','HMExRemind'],
    //         list: [
    //             {
    //                 menuName: '设备列表',
    //                 menuHref: 'HMMtList',
    //             },
    //             {
    //                 menuName: '维保公司管理',
    //                 menuHref: 'HMGdManage',
    //             },
    //             {
    //                 menuName: '延期记录',
    //                 menuHref: 'HMEtList',
    //             },
    //             {
    //                 menuName: '报废记录',
    //                 menuHref: 'HMSpList',
    //             },
    //             {
    //                 menuName: '质保到期处理记录',
    //                 menuHref: 'HMDlList',
    //             },
    //             {
    //                 menuName: '责任归属分配',
    //                 menuHref: 'HMTaList',
    //             },
    //             {
    //                 menuName: '到期提醒设置',
    //                 menuHref: 'HMExRemind',
    //             },
    //         ]
    //     },
    //     {
    //         menuName: '医院设备-维保管理',
    //         menuId:9,
    //         // path:'HMPlanTask',
    //         hashChidArr:['HMPlanTask','HMWorkOrder','HMMtTask'],
    //         list: [
    //             {
    //                 menuName: '计划任务',
    //                 menuHref: 'HMPlanTask',
    //             },
    //             {
    //                 menuName: '维修工单',
    //                 menuHref: 'HMWorkOrder',
    //             },
    //             {
    //                 menuName: '保养任务',
    //                 menuHref: 'HMMtTask',
    //             },
    //         ]
    //     },
    //     {
    //         menuName: '医院设备-统计分析',
    //         menuId:10,
    //         // path:'HMSaList',
    //         hashChidArr:['HMSaList'],
    //         list: [{
    //             menuName: '统计分析',
    //             menuHref: 'HMSaList',
    //         }]
    //     },
    // //    物业主管
    //     {
    //         menuName: '物业主管-我的事项',
    //         menuId:11,
    //         // path:'PMMyRepair',
    //         hashChidArr:['PMMyRepair'],
    //         list: [
    //             {
    //                 menuName: '我的报修',
    //                 menuHref: 'PMMyRepair',
    //             },
    //         ]
    //     },
    //     {
    //         menuName: '物业主管-设备管理',
    //         menuId:12,
    //         // path:'PMMtList',
    //         hashChidArr:['PMMtList'],
    //         list: [
    //             {
    //                 menuName: '设备列表',
    //                 menuHref: 'PMMtList',
    //             },
    //         ]
    //     },
    //     {
    //         menuName: '物业主管-维保管理',
    //         menuId:13,
    //         // path:'PMPlanTask',
    //         hashChidArr:['PMPlanTask','PMWorkOrder','PMMtTask'],
    //         list: [
    //             {
    //                 menuName: '计划任务',
    //                 menuHref: 'PMPlanTask',
    //             },
    //             {
    //                 menuName: '维修工单',
    //                 menuHref: 'PMWorkOrder',
    //             },
    //             {
    //                 menuName: '保养任务',
    //                 menuHref: 'PMMtTask',
    //             },
    //         ]
    //     },
    //     {
    //         menuName: '物业主管-统计分析',
    //         hashChidArr:['PMSaList'],
    //         menuId:14,
    //         // path:'PMSaList',
    //         list: [{
    //             menuName: '统计分析',
    //             menuHref: 'PMSaList',
    //         }]
    //     },
    // //    物业业务经理
    //     {
    //         menuName: '物业经理-我的事项',
    //         menuId:15,
    //         // path:'PBMyRepair',
    //         hashChidArr:['PBMyRepair','PBMtPlan','PBMtItem'],
    //         list: [
    //             {
    //                 menuName: '保养计划',
    //                 menuHref: 'PBMtPlan',
    //             },
    //             {
    //                 menuName: '保养项目',
    //                 menuHref: 'PBMtItem',
    //             },
    //             {
    //                 menuName: '我的报修',
    //                 menuHref: 'PBMyRepair',
    //             },
    //         ]
    //     },
    //     {
    //         menuName: '物业经理-设备管理',
    //         // path:'PBMtList',
    //         menuId:16,
    //         hashChidArr:['PBMtList','PBTeamManage'],
    //         list: [
    //             {
    //                 menuName: '设备列表',
    //                 menuHref: 'PBMtList',
    //             },
    //             {
    //                 menuName: '班组管理',
    //                 menuHref: 'PBTeamManage',
    //             },
    //         ]
    //     },
    //     {
    //         menuName: '物业经理-维保管理',
    //         menuId:17,
    //         // path:'PBPlanTask',
    //         hashChidArr:['PBPlanTask','PBWorkOrder','PBMtTask'],
    //         list: [
    //             {
    //                 menuName: '计划任务',
    //                 menuHref: 'PBPlanTask',
    //             },
    //             {
    //                 menuName: '维修工单',
    //                 menuHref: 'PBWorkOrder',
    //             },
    //             {
    //                 menuName: '保养任务',
    //                 menuHref: 'PBMtTask',
    //             },
    //         ]
    //     },
    //     {
    //         menuName: '物业经理-统计分析',
    //         menuId:18,
    //         // path:'PBSaList',
    //         hashChidArr:['PBSaList'],
    //         list: [{
    //             menuName: '统计分析',
    //             menuHref: 'PBSaList',
    //         }]
    //     },
    // ]
}

export default state
/*

{
    menuName: '首页',
    path:'index',
},
{
    menuName: '用户管理',
    path: 'usermanage',
}]
},
//    医院主管
{
    menuName: '医院主管-我的事项',
    id:3,
    list: [{
        menuName: '我的报修',
        path: 'HSMyWarranty',
    }]
},{
    menuName: '医院主管-设备管理',
        list: [{
        menuName: '设备列表',
        path: 'HSMtList',
    },{
        menuName: '设备管理员',
        path: 'HSMtmanage',
    },{
        menuName: '维保公司管理',
        path: 'HSGdManage',
    },{
        menuName: '延期记录',
        path: 'HSEtList',
    },{
        menuName: '报废记录',
        path: 'HSSpList',
    },{
        menuName: '质保到期处理记录',
        path: 'HSDlList',
    },{
        menuName: '管理任务分配',
        path: 'HSTaList',
    },]
},{
    menuName: '医院主管-维保管理',
        list: [{
        menuName: '计划任务',
        path: 'HSPlanTask',
    },{
        menuName: '维修工单',
        path: 'HSWorkOrder',
    },{
        menuName: '保养任务',
        path: 'HSMtTask',
    }]
},{
    menuName: '医院主管-统计分析',
        list: [{
        menuName: '统计分析',
        path: 'HSSaList',
    }]
},
//    医院设备管理
{
    menuName: '医院设备-我的事项',
    list: [
    {
        menuName: '待办工作',
        path: 'HMWaitTask',
    },
    {
        menuName: '计划审核',
        path: 'HMPlanReview',
    },
    {
        menuName: '寿命到期',
        path: 'HMLifeEx',
    },
    {
        menuName: '质保到期',
        path: 'HMWarrEx',
    },
    {
        menuName: '我的报修',
        path: 'HMMyRepair',
    },
]
},
{
    menuName: '医院设备-设备管理',
    list: [
    {
        menuName: '设备列表',
        path: 'HMMtList',
    },
    {
        menuName: '维保公司管理',
        path: 'HMGdManage',
    },
    {
        menuName: '延期记录',
        path: 'HMEtList',
    },
    {
        menuName: '报废记录',
        path: 'HMSpList',
    },
    {
        menuName: '质保到期处理记录',
        path: 'HMDlList',
    },
    {
        menuName: '责任归属分配',
        path: 'HMTaList',
    },
    {
        menuName: '到期提醒设置',
        path: 'HMExRemind',
    },
]
},
{
    menuName: '医院设备-维保管理',
    list: [
    {
        menuName: '计划任务',
        path: 'HMPlanTask',
    },
    {
        menuName: '维修工单',
        path: 'HMWorkOrder',
    },
    {
        menuName: '保养任务',
        path: 'HMMtTask',
    },
]
},
{
    menuName: '医院设备-统计分析',
    list: [{
    menuName: '统计分析',
    path: 'HMSaList',
}]
},
//    物业主管
{
    menuName: '物业主管-我的事项',
    list: [
    {
        menuName: '我的报修',
        path: 'PMMyRepair',
    },
]
},
{
    menuName: '物业主管-设备管理',
    list: [
    {
        menuName: '设备列表',
        path: 'PMMtList',
    },
]
},
{
    menuName: '物业主管-维保管理',
    list: [
    {
        menuName: '计划任务',
        path: 'PMPlanTask',
    },
    {
        menuName: '维修工单',
        path: 'PMWorkOrder',
    },
    {
        menuName: '保养任务',
        path: 'PMMtTask',
    },
]
},
{
    menuName: '物业主管-统计分析',
    list: [{
    menuName: '统计分析',
    path: 'PMSaList',
}]
},
//    物业业务经理
{
    menuName: '物业经理-我的事项',
    list: [
    {
        menuName: '保养计划',
        path: 'PBMtPlan',
    },
    {
        menuName: '保养项目',
        path: 'PBMtItem',
    },
    {
        menuName: '我的报修',
        path: 'PBMyRepair',
    },
]
},
{
    menuName: '物业经理-设备管理',
    list: [
    {
        menuName: '设备列表',
        path: 'PBMtList',
    },
    {
        menuName: '班组管理',
        path: 'PBTeamManage',
    },
]
},
{
    menuName: '物业经理-维保管理',
    list: [
    {
        menuName: '计划任务',
        path: 'PBPlanTask',
    },
    {
        menuName: '维修工单',
        path: 'PBWorkOrder',
    },
    {
        menuName: '保养任务',
        path: 'PBMtTask',
    },
]
},
{
    menuName: '物业经理-统计分析',
    list: [{
    menuName: '统计分析',
    path: 'PBSaList',
}]
*/
