<template>
    <div class="planreview">
        <div class="righttitle">
            <p>计划审核</p>
        </div>
        <div class="buttonbox">
            <div class="pullleft">
                <el-button size="mini" plain @click="statusHandle('')">全部</el-button>
                <el-button size="mini" plain type="danger" @click="statusHandle('1')">待审核</el-button>
                <el-button size="mini" plain type="success" @click="statusHandle('2')">已通过</el-button>
                <el-button size="mini" plain type="warning" @click="statusHandle('3')">已退回</el-button>

                <el-button size="mini" plain type="danger" @click="usestate('1')">禁用</el-button>
                <el-button size="mini" plain type="success" @click="usestate('0')">启用</el-button>
            </div>
            <div class="pullright">
                <el-button type="success" size="mini" icon="el-icon-search" @click="filterShow=!filterShow">检索</el-button>
            </div>
        </div>
        <div class="filterbox" v-if="filterShow">
            <el-row>
                <el-col :span="21">
                    <div class="grid-content">
                        <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
                            <el-form-item label="计划编号">
                                <el-input v-model="formInline.planCode" placeholder="计划编号"></el-input>
                            </el-form-item>
                            <el-form-item label="设备类别">
                                <el-select v-model="formInline.facilityTypeCode" placeholder="设备类别">
                                    <el-option v-for="(item,index) in typeList" :label="item.typeName" :value="item.typeCode"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="保养类型">

                                <el-select v-model="formInline.maintainType" placeholder="保养类型">
                                    <el-option label="质保" value="0"></el-option>
                                    <el-option label="维保" value="1"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="周期类型">
                                <el-select v-model="formInline.cycleType" placeholder="周期类型">
                                    <el-option label="周" value="0"></el-option>
                                    <el-option label="半月" value="1"></el-option>
                                    <el-option label="月" value="2"></el-option>
                                    <el-option label="季度" value="3"></el-option>
                                    <el-option label="半年" value="4"></el-option>
                                    <el-option label="年" value="5"></el-option>

                                </el-select>
                            </el-form-item>
                            <el-form-item label="保养项目">
                                <el-input v-model="formInline.maintainName" placeholder="保养项目"></el-input>
                            </el-form-item>
                            <el-form-item label="开始日期">
                                <el-date-picker
                                        v-model="formInline.startTime"
                                        format="yyyy-MM-dd"
                                        value-format="yyyy-MM-dd"
                                        @change="formatTime"
                                        type="date"
                                        placeholder="">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="至">
                                <el-date-picker
                                        v-model="formInline.endTime"
                                        format="yyyy-MM-dd"
                                        value-format="yyyy-MM-dd"

                                        @change="formatTime1"
                                        type="date"
                                        placeholder="">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="结束日期">
                                <el-date-picker
                                        v-model="formInline.endBeginTime"
                                        @change="formatTime2"
                                        value-format="yyyy-MM-dd"

                                        format="yyyy-MM-dd"
                                        type="date"
                                        placeholder="">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="至">
                                <el-date-picker
                                        v-model="formInline.endOverTime"
                                        @change="formatTime3"
                                        format="yyyy-MM-dd"
                                        value-format="yyyy-MM-dd"

                                        type="date"
                                        placeholder="">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="责任归属">
                                <el-select v-model="formInline.companys" placeholder="责任归属">
                                    <el-option v-for="item in componyList" :label="item.companyName" :value="item.companyCode"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-col>
                <el-col :span="3">
                    <div class="grid-content searchbox">
                        <el-button type="primary" size="mini" icon="el-icon-search" @click="requestList">搜索</el-button>
                        <el-button size="mini" icon="el-icon-refresh" @click="resetSearch">重置</el-button>
                    </div>
                </el-col>
            </el-row>

        </div>
        <div class="contentbox">
            <el-table
                    :data="tableData"
                    @selection-change="handleSelectionChange"

                    stripe
                    border
                    style="width: 100%">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        type="index"
                        label="序号"
                        width="50">
                </el-table-column>
                <el-table-column
                        prop="planCode"
                        label="计划编号"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        prop="planName"
                        label="计划名称"
                        show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span @click="showPlanInfo(scope.row)" class="tableactive">{{scope.row.planName}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="maintainType"
                        label="保养类型"
                        show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span>{{scope.row.maintainType==0?'质保':'维保'}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="cycleType"
                        show-overflow-tooltip

                        label="周期类型">
                    <template slot-scope="scope">
                        <span v-if="scope.row.cycleType==0">周</span>
                        <span v-if="scope.row.cycleType==1">半月</span>
                        <span v-if="scope.row.cycleType==2">月</span>
                        <span v-if="scope.row.cycleType==3">季度</span>
                        <span v-if="scope.row.cycleType==4">半年</span>
                        <span v-if="scope.row.cycleType==5">年</span>

                    </template>
                </el-table-column>
                <el-table-column
                        prop="maintainName"
                        show-overflow-tooltip
                        label="保养项目">
                </el-table-column>
                <el-table-column
                        prop="facilityTypeName"
                        show-overflow-tooltip

                        label="设备类型">
                </el-table-column>
                <el-table-column
                        prop="facilityNum"
                        show-overflow-tooltip

                        label="设备数量">
                </el-table-column>
                <el-table-column
                        prop="startTime"
                        show-overflow-tooltip
                        label="开始日期">
                </el-table-column>
                <el-table-column
                        prop="endTime"
                        show-overflow-tooltip

                        label="结束日期">
                </el-table-column>
                <el-table-column
                        prop="company"
                        show-overflow-tooltip

                        label="责任归属">
                </el-table-column>
                <el-table-column
                    prop="planAuditState"
                    show-overflow-tooltip

                    label="审核状态">
                <template slot-scope="scope">
                    <span v-if="scope.row.planAuditState==1" class="tablebtn-c3">待审核</span>
                    <span v-if="scope.row.planAuditState==2" class="tablebtn-c4">已通过</span>
                    <span v-if="scope.row.planAuditState==3" class="tablebtn-c2">已退回</span>

                </template>
            </el-table-column>
                <el-table-column
                        prop="planAuditState"
                        show-overflow-tooltip

                        label="在用状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.useState=='0'" class="tablebtn-c4">启用</span>
                        <span v-if="scope.row.useState==1" class="tablebtn-c3">禁用</span>

                    </template>
                </el-table-column>
            </el-table>
            <div class="page">
                <el-pagination
                        :current-page="1"
                        :page-sizes="[10, 20, 30, 50]"
                        :page-size="100"
                        @size-change="pageSizeChange"
                        @current-change="pageCurrentChange"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </div>
        </div>
        <el-dialog
                title="计划审核"
                :visible.sync="checkPlanShow"
                @close="checkPlanShow=false"
                width="1000px">
            <span slot="title" class="dialogtitle">
                计划审核
              </span>
            <checkPlan :hideOperate="hideOperate" :planData="planData" @closeHandle="closeHandleCheck"></checkPlan>
        </el-dialog>
    </div>
</template>

<script>
    import checkPlan from './tem/checkPlan'
    export default {
        name: "PlanReview",
        data:function () {
            return{
                pageSize:'10',
                currentPage:'1',
                total:0,
                planAuditState:'',
                typeList:[],
                componyList:[],
                filterShow:false,
                formInline:{
                    planCode:'',
                    facilityTypeCode:'',
                    maintainType:'',
                    cycleType:'',
                    maintainName:'',
                    startTime:'',
                    endTime:'',
                    endBeginTime:'',
                    endOverTime:'',
                    companys:''
                },
                tableData: [],
                checkPlanShow:false,
                planData:[],
                selectData:[],
                hideOperate:''

            }
        },
        mounted(){
            this.requestList()
            this.requestType()
            this.requestComponeny()
        },
        methods:{
            //禁用启用
            usestate(str){
                let vm =this
                if(!vm.selectData.length){
                    vm.$message({
                        type:'warning',
                        message:'请选择要'+(str==1?'禁用':"启用")+'的计划'
                    })
                    return
                }
                let _idarr = []
                vm.selectData.forEach(function (item) {
                    _idarr.push(item.id)
                })
                let _s = '确定要'+(str==1?'禁用':"启用")+'这些计划吗？'
                vm.$confirm(_s, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    vm.$http.post('maintainPlanAudit/updateUseState',{
                        planIds:_idarr.join(','),
                        useState:str
                    }).then(res=>{
                        if(res.code==200){
                            vm.$message({
                                type:'success',
                                message:res.message
                            })
                            vm.requestList()
                        }
                    })
                }).catch(() => {

                });

            },
            //    列表选择
            handleSelectionChange(val) {
                this.selectData = val
            },

            //重置筛选
            resetSearch(){
                this.formInline={
                        planCode:'',
                        facilityTypeCode:'',
                        maintainType:'',
                        cycleType:'',
                        maintainName:'',
                        startTime:'',
                        endTime:'',
                        endBeginTime:'',
                        endOverTime:'',
                        companys:''
                }
                this.requestList()
            },
            //获取列表
            requestList(){
              let vm =this
              vm.$http.post('maintainPlanAudit/getMaintainPlanList',{
                  pageSize:vm.pageSize,
                  currentPage:vm.currentPage,
                  planAuditState:vm.planAuditState,
                  planCode:vm.formInline.planCode,
                  facilityTypeCode:vm.formInline.facilityTypeCode,
                  maintainType:vm.formInline.maintainType,
                  cycleType:vm.formInline.cycleType,
                  maintainName:vm.formInline.maintainName,
                  startTime:vm.formInline.startTime,
                  endTime:vm.formInline.endTime,
                  endBeginTime:vm.formInline.endBeginTime,
                  endOverTime:vm.formInline.endOverTime,
                  companys:vm.formInline.companys,
              }).then(res=>{
                 if(res.code==200){
                     vm.tableData = res.data.list
                     vm.total = res.data.count*1
                 }
              })
            },
            //    获取设备分类列表
            requestType() {
                let vm = this
                vm.$http.post('equipmentConfigController/getDeviceTypeList', {}).then(res => {
                    if (res.code == '200') {
                        vm.typeList = res.data
                    }
                })
            },
            //    wuye
            requestComponeny(){
                let vm = this
                vm.$http.post(__PATH.BASEPATH+'outsourcedController/getOutsourcedCompanyList',{}).then(res=>{
                    if(res.code==200){
                        vm.componyList = res.data
                    }
                })
            },
            //状态切换
            statusHandle(str){
                this.planAuditState = str
                this.requestList()
            },
            showPlanInfo(row){//计划
                let vm =this
                vm.$http.post('maintainPlanAudit/getMaintainPlanDetail',{
                    pageSize:10,
                    currentPage:1,
                    id:row.id
                }).then(res=>{
                    if(res.code==200){
                        vm.planData=res.data
                        vm.planData.maintainPlanDetail.cycleRole = JSON.parse(vm.planData.maintainPlanDetail.cycleRole)
                        vm.planData.id=row.id
                        vm.checkPlanShow = true
                        if(row.planAuditState==2){
                            vm.hideOperate = true
                        }else{
                            vm.hideOperate = false
                        }
                    }
                })

            },
            closeHandleCheck(str){
                this.checkPlanShow = false
                if(str){
                    this.requestList()
                }
            },
            formatTime(val){
                this.formInline.startTime =val
            },
            formatTime1(val){
                this.formInline.endTime =val

            },
            formatTime2(val){
                this.formInline.endBeginTime =val

            },
            formatTime3(val){
                this.formInline.endOverTime =val

            },
            //    分页
            pageSizeChange(val){
                this.pageSize =val
                this.requestList()
            },
            pageCurrentChange(val){
                this.currentPage =val
                this.requestList()
            }

        },
        components:{
            checkPlan
        }
    }
</script>

<style scoped lang="scss">
.planreview{

}
</style>