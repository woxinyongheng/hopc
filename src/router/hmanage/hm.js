//我的事项
import HMWaitTask from '@/components/hmanage/hmmb/WaitTask'; //待办工作
import HMPlanReview from '@/components/hmanage/hmmb/PlanReview'; //计划审核
import HMLifeEx from '@/components/hmanage/hmmb/LifeEx'; //寿命到期
import HMWarrEx from '@/components/hmanage/hmmb/WarrEx'; //质保到期
import HMMyRepair from '@/components/hmanage/hmmb/MyRepair'; //我的报修

//设备管理 em
import HMMtList from '@/components/hmanage/hmem/MtList'; //设备列表
import HMGdManage from '@/components/hmanage/hmem/GdManage'; //维保公司管理
import HMEtList from '@/components/hmanage/hmem/EtList'; //延期记录
import HMSpList from '@/components/hmanage/hmem/SpList'; //报废记录
import HMDlList from '@/components/hmanage/hmem/DlList'; //质保到期记录
import HMTaList from '@/components/hmanage/hmem/TaList'; //管理任务分配
import HMExRemind from '@/components/hmanage/hmem/ExRemind'; //到期提醒  ExRemind


//维保管理 mm
import HMPlanTask from '@/components/hmanage/hmmm/PlanTask'; //计划任务
import HMWorkOrder from '@/components/hmanage/hmmm/WorkOrder'; //维修工单
import HMMtTask from '@/components/hmanage/hmmm/MtTask'; //保养任务

//统计分析sa
import HMSaList from '@/components/hmanage/hmsa/SaList'; //统计分析


export default [
    {name:'HMWaitTask',path:'/HMWaitTask',component:HMWaitTask},
    {name:'HMPlanReview',path:'/HMPlanReview',component:HMPlanReview},
    {name:'HMLifeEx',path:'/HMLifeEx',component:HMLifeEx},
    {name:'HMWarrEx',path:'/HMWarrEx',component:HMWarrEx},
    {name:'HMMyRepair',path:'/HMMyRepair',component:HMMyRepair},

    {name:'HMMtList',path:'/HMMtList',component:HMMtList},
    {name:'HMGdManage',path:'/HMGdManage',component:HMGdManage},
    {name:'HMEtList',path:'/HMEtList',component:HMEtList},
    {name:'HMSpList',path:'/HMSpList',component:HMSpList},
    {name:'HMDlList',path:'/HMDlList',component:HMDlList},
    {name:'HMTaList',path:'/HMTaList',component:HMTaList},
    {name:'HMExRemind',path:'/HMExRemind',component:HMExRemind},

    {name:'HMPlanTask',path:'/HMPlanTask',component:HMPlanTask},
    {name:'HMWorkOrder',path:'/HMWorkOrder',component:HMWorkOrder},
    {name:'HMMtTask',path:'/HMMtTask',component:HMMtTask},
    //
    //
    {name:'HMSaList',path:'/HMSaList',component:HMSaList},
]

