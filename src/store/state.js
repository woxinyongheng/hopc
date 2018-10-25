const state = {
  isLogin:localStorage.getItem('LOGINDATA') ? true : false,
    leftShow:true,

    //#409eff
  // itemList:'',
  loadingShow:false,
    itemList:[
    {
        menuName: '首页',
      path:'index',
      icon:'index',
        id:1,
      hashChidArr:['index'],
      list: [{
          menuName: '首页',
        path: 'index',
        hashChidArr:['index'],
      }]
    },
        {
            menuName: '用户管理',
            hashChidArr:['usermanage'],
            id:2,
            list: [{
                menuName: '用户管理',
                path: 'usermanage',
                hashChidArr:['usermanage'],
            }]
        },
    //    医院主管
        {
            menuName: '医院主管-我的事项',
            // path:'HSMyWarranty',
            hashChidArr:['HSMyWarranty'],
            id:3,
            list: [{
                menuName: '我的报修',
                path: 'HSMyWarranty',
            }]
        },{
            menuName: '医院主管-设备管理',
            id:4,
            // path:'HSMtList',
            hashChidArr:['HSMtList','HSMtmanage','HSGdManage','HSEtList','HSSpList','HSDlList','HSTaList'],
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
            id:5,
            // path:'HSPlanTask',
            hashChidArr:['HSPlanTask','HSWorkOrder','HSMtTask'],
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
            id:6,
            // path:'HSSaList',
            hashChidArr:['HSSaList'],
            list: [{
                menuName: '统计分析',
                path: 'HSSaList',
            }]
        },
    //    医院设备管理
        {
            menuName: '医院设备-我的事项',
            id:7,
            // path:'HMWaitTask',
            hashChidArr:['HMWaitTask','HMPlanReview','HMLifeEx','HMWarrEx','HMMyRepair'],
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
            id:8,
            // path:'HMMtList',
            hashChidArr:['HMMtList','HMGdManage','HMEtList','HMSpList','HMDlList','HMTaList','HMExRemind'],
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
            id:9,
            // path:'HMPlanTask',
            hashChidArr:['HMPlanTask','HMWorkOrder','HMMtTask'],
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
            id:10,
            // path:'HMSaList',
            hashChidArr:['HMSaList'],
            list: [{
                menuName: '统计分析',
                path: 'HMSaList',
            }]
        },
    //    物业主管
        {
            menuName: '物业主管-我的事项',
            id:11,
            // path:'PMMyRepair',
            hashChidArr:['PMMyRepair'],
            list: [
                {
                    menuName: '我的报修',
                    path: 'PMMyRepair',
                },
            ]
        },
        {
            menuName: '物业主管-设备管理',
            id:12,
            // path:'PMMtList',
            hashChidArr:['PMMtList'],
            list: [
                {
                    menuName: '设备列表',
                    path: 'PMMtList',
                },
            ]
        },
        {
            menuName: '物业主管-维保管理',
            id:13,
            // path:'PMPlanTask',
            hashChidArr:['PMPlanTask','PMWorkOrder','PMMtTask'],
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
            hashChidArr:['PMSaList'],
            id:14,
            // path:'PMSaList',
            list: [{
                menuName: '统计分析',
                path: 'PMSaList',
            }]
        },
    //    物业业务经理
        {
            menuName: '物业经理-我的事项',
            id:15,
            // path:'PBMyRepair',
            hashChidArr:['PBMyRepair','PBMtPlan','PBMtItem'],
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
            // path:'PBMtList',
            id:16,
            hashChidArr:['PBMtList','PBTeamManage'],
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
            id:17,
            // path:'PBPlanTask',
            hashChidArr:['PBPlanTask','PBWorkOrder','PBMtTask'],
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
            id:18,
            // path:'PBSaList',
            hashChidArr:['PBSaList'],
            list: [{
                menuName: '统计分析',
                path: 'PBSaList',
            }]
        },
    ]
}

export default state
