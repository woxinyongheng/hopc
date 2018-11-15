<template>
    <div class="plantask">
        <div class="righttitle">
            <p>计划任务</p>
        </div>
        <div class="buttonbox">
            <div class="pullleft">
                <el-button plain size="mini" @click="statusHandle('')">全部</el-button>
                <el-button plain size="mini" type="danger" @click="statusHandle('0')">进行中</el-button>
                <el-button plain size="mini" type="info" @click="statusHandle('1')">未完成</el-button>
                <el-button plain size="mini" type="success" @click="statusHandle('2')">已完成</el-button>
            </div>
            <div class="pullright">
                <el-button type="success" size="mini" icon="el-icon-search" @click="filterShow=!filterShow">检索</el-button>
            </div>
        </div>
        <div class="filterbox" v-if="filterShow">
            <el-row>
                <el-col :span="21"><div class="grid-content">
                    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
                        <el-form-item label="计划编号">
                            <el-input v-model="formInline.planCode" placeholder="计划编号"></el-input>
                        </el-form-item>
                        <el-form-item label="计划名称">
                            <el-input v-model="formInline.planName" placeholder="计划名称"></el-input>
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
                        <el-form-item label="设备类别">
                            <el-select v-model="formInline.facilityTypeCode" placeholder="设备类别">
                                <el-option v-for="(item,index) in typeList" :label="item.typeName" :value="item.typeCode"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="保养项目">
                            <el-input v-model="formInline.maintainName" placeholder="保养项目"></el-input>
                        </el-form-item>
                        <el-form-item label="开始日期">
                            <el-date-picker
                                    v-model="formInline.startDateTime"
                                    type="date"
                                    placeholder="开始日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="至">
                            <el-date-picker
                                    v-model="formInline.endDateTime"
                                    type="date"
                                    placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="责任归属">
                            <el-input v-model="formInline.outsourced" placeholder="维保单位"></el-input>

                        </el-form-item>
                    </el-form>
                </div></el-col>
                <el-col :span="3"><div class="grid-content searchbox">
                    <el-button type="primary" size="mini" icon="el-icon-search" @click="searchClick">搜索</el-button>
                    <el-button  size="mini" icon="el-icon-refresh"  @click="resetSearch">重置</el-button>
                </div></el-col>
            </el-row>

        </div>
        <div class="contentbox">
            <el-table
                    :data="tableData"
                    stripe
                    border
                    style="width: 100%">
                <el-table-column
                        type="index"
                        label="序号"
                        width="50">
                </el-table-column>
                <el-table-column
                        prop="planTaskCode"
                        label="计划编号"
                        show-overflow-tooltip
                        width="180">
                    <template slot-scope="scope">
                        <span  @click="showPlanInfo(scope.row)" class="tableactive">{{scope.row.planTaskCode}}</span>
                    </template>
                </el-table-column>

                <el-table-column
                        prop="planName"
                        label="计划名称"
                        show-overflow-tooltip
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="maintainType"
                        show-overflow-tooltip

                        label="保养类型">
                    <template slot-scope="scope">
                        <span>{{scope.row.maintainType==0?'质保':'维保'}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="address"
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
                        label="维保单位">
                </el-table-column>
                <el-table-column
                        prop="address"
                        show-overflow-tooltip
                        label="状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.taskState==0" class="tablebtn-c1">进行中</span>
                        <span v-if="scope.row.taskState==1"  class="tablebtn-c2">未完成</span>
                        <span v-if="scope.row.taskState==2" class="tablebtn-c1">已完成</span>


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
                title="计划任务"
                :visible.sync="planInfoShow"
                @close="planInfoShow=false"
                width="1000px">
            <span slot="title" class="dialogtitle">
                计划任务
              </span>
            <jihuarenwu :planData="planData" @closeHandle="planInfoShow=false"></jihuarenwu>
        </el-dialog>
    </div>
</template>

<script>
    import jihuarenwu from '@/components/globaltem/Jihuarenwu'
    export default {
        name: "PlanTask",
        data:function () {
            return{
                //分页
                total:0,
                pageSize:10,
                currentPage:1,
                filterShow:false,
                typeList:[],
                componyList:[],
                formInline:{
                    planCode:'',
                    planName:'',
                    maintainType:'',
                    cycleType:'',
                    facilityTypeCode:'',
                    maintainName:'',
                    startDateTime:'',
                    endDateTime:'',
                    company:'',
                    columnName:'',
                    sort:'',
                    taskState:'',
                    outsourced:''
                },
                tableData: [],
                planInfoShow:false,
                planData:[]

            }
        },
        mounted(){
            this.requestList()
            this.requestType()
            // this.requestComponeny()
        },
        methods:{
            //筛选
            searchClick(){
                this.requestList()
            },
            resetSearch(){
                this.formInline = {
                    planCode:'',
                    planName:'',
                    maintainType:'',
                    cycleType:'',
                    facilityTypeCode:'',
                    maintainName:'',
                    startDateTime:'',
                    endDateTime:'',
                    company:'',
                    columnName:'',
                    sort:'',
                    taskState:'',
                    outsourced:''
                }
                this.requestList()
            },
            //状态切换
            statusHandle(str){
                this.formInline.taskState = str
                this.requestList()
            },
            showPlanInfo(row){//记录单号
                let vm =this
                vm.$http.post('/planTask/getPlanTaskDetail',{
                    id:row.id
                }).then(res=>{
                    if(res.code==200){
                        vm.planData=res.data
                        vm.planInfoShow = true
                    }
                })

            },
            requestList(){
                let vm =this
                vm.$http.post('planTask/getPlanTaskList',{
                    pageSize:vm.pageSize,
                    currentPage:vm.currentPage,
                    planCode:vm.formInline.planCode,
                    planName:vm.formInline.planName,
                    maintainType:vm.formInline.maintainType,
                    cycleType:vm.formInline.cycleType,
                    facilityTypeCode:vm.formInline.facilityTypeCode,
                    maintainName:vm.formInline.maintainName,
                    startDateTime:vm.formInline.startDateTime,
                    endDateTime:vm.formInline.endDateTime,
                    company:JSON.parse(localStorage.getItem('LOGINDATA')).companyCode,
                    columnName:vm.formInline.columnName,
                    sort:vm.formInline.sort,
                    taskState:vm.formInline.taskState,
                    outsourced:vm.formInline.outsourced
                }).then(res=>{
                    if(res.code=='200'){
                        vm.tableData = res.data.list
                        vm.total = res.data.count*1
                    }
                })
            },
            //    获取设备分类列表
            requestType(){
                let vm =this
                vm.$http.post('equipmentConfigController/getDeviceTypeList',{}).then(res=>{
                    if(res.code=='200'){
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
            jihuarenwu
        }
    }
</script>

<style scoped lang="scss">
    .plantask{

    }

</style>