//我的事项
import PMMyRepair from '@/components/pmanager/pmmb/MyRepair'; //我的报修

//设备管理 em
import PMMtList from '@/components/pmanager/pmem/MtList'; //设备列表


//维保管理 mm
import PMPlanTask from '@/components/pmanager/pmmm/PlanTask'; //计划任务
import PMWorkOrder from '@/components/pmanager/pmmm/WorkOrder'; //维修工单
import PMMtTask from '@/components/pmanager/pmmm/MtTask'; //保养任务

//统计分析sa
import PMSaList from '@/components/pmanager/pmsa/SaList'; //统计分析


export default [
    {name:'PMMyRepair',path:'/PMMyRepair',component:PMMyRepair},

    {name:'PMMtList',path:'/PMMtList',component:PMMtList},

    {name:'PMPlanTask',path:'/PMPlanTask',component:PMPlanTask},
    {name:'PMWorkOrder',path:'/PMWorkOrder',component:PMWorkOrder},
    {name:'PMMtTask',path:'/PMMtTask',component:PMMtTask},
    //
    //
    {name:'PMSaList',path:'/PMSaList',component:PMSaList},

]

