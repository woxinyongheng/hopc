
import HSMyWarranty from '@/components/hsupervisor/hsmb/MyWarranty'; //我的事项--报修

//设备管理 em
import HSMtList from '@/components/hsupervisor/hsem/MtList'; //设备列表
import HSEtList from '@/components/hsupervisor/hsem/EtList'; //延期记录
import HSSpList from '@/components/hsupervisor/hsem/SpList'; //报废记录
import HSDlList from '@/components/hsupervisor/hsem/DlList'; //质保到期记录
import HSTaList from '@/components/hsupervisor/hsem/TaList'; //管理任务分配
import HSMtmanage from '@/components/hsupervisor/hsem/Mtmanage'; //设备管理员
import HSGdManage from '@/components/hsupervisor/hsem/GdManage'; //维保公司管理

//维保管理 mm
import HSPlanTask from '@/components/hsupervisor/hsmm/PlanTask'; //计划任务
import HSWorkOrder from '@/components/hsupervisor/hsmm/WorkOrder'; //维修工单
import HSMtTask from '@/components/hsupervisor/hsmm/MtTask'; //保养任务

//统计分析sa
import HSSaList from '@/components/hsupervisor/hssa/SaList'; //统计分析


export default [
    {name:'HSMyWarranty',path:'/HSMyWarranty',component:HSMyWarranty},

    {name:'HSMtList',path:'/HSMtList',component:HSMtList},
    {name:'HSEtList',path:'/HSEtList',component:HSEtList},
    {name:'HSSpList',path:'/HSSpList',component:HSSpList},
    {name:'HSDlList',path:'/HSDlList',component:HSDlList},
    {name:'HSTaList',path:'/HSTaList',component:HSTaList},
    {name:'HSMtmanage',path:'/HSMtmanage',component:HSMtmanage},
    {name:'HSGdManage',path:'/HSGdManage',component:HSGdManage},

    {name:'HSPlanTask',path:'/HSPlanTask',component:HSPlanTask},
    {name:'HSWorkOrder',path:'/HSWorkOrder',component:HSWorkOrder},
    {name:'HSMtTask',path:'/HSMtTask',component:HSMtTask},


    {name:'HSSaList',path:'/HSSaList',component:HSSaList},
]
