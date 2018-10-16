//我的事项
import PBMyRepair from '@/components/pbusiness/pbmb/MyRepair'; //我的报修
import PBMtPlan from '@/components/pbusiness/pbmb/MtPlan'; //保养计划
import PBMtItem from '@/components/pbusiness/pbmb/MtItem'; //保养项目




//设备管理 em
import PBMtList from '@/components/pbusiness/pbem/MtList'; //设备列表
import PBTeamManage from '@/components/pbusiness/pbem/TeamManage'; //班组管理



//维保管理 mm
import PBPlanTask from '@/components/pbusiness/pbmm/PlanTask'; //计划任务
import PBWorkOrder from '@/components/pbusiness/pbmm/WorkOrder'; //维修工单
import PBMtTask from '@/components/pbusiness/pbmm/MtTask'; //保养任务

//统计分析sa
import PBSaList from '@/components/pbusiness/pbsa/SaList'; //统计分析


export default [
    {name:'PBMyRepair',path:'/PBMyRepair',component:PBMyRepair},
    {name:'PBMtPlan',path:'/PBMtPlan',component:PBMtPlan},
    {name:'PBMtItem',path:'/PBMtItem',component:PBMtItem},

    {name:'PBMtList',path:'/PBMtList',component:PBMtList},
    {name:'PBTeamManage',path:'/PBTeamManage',component:PBTeamManage},

    {name:'PBPlanTask',path:'/PBPlanTask',component:PBPlanTask},
    {name:'PBWorkOrder',path:'/PBWorkOrder',component:PBWorkOrder},
    {name:'PBMtTask',path:'/PBMtTask',component:PBMtTask},
    //
    //
    {name:'PBSaList',path:'/PBSaList',component:PBSaList},
]
