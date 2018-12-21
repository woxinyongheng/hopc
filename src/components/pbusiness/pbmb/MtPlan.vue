<template>
    <div class="mtplan">
        <div class="righttitle">
            <p>保养计划</p>
        </div>
        <div class="buttonbox">
            <div class="pullleft">
            <el-button type="primary" size="mini" @click="addplanClick">增加</el-button>
            <el-button type="warning" size="mini" @click="copyPlan">复制</el-button>
        </div>
            <div class="pullright">
                <el-button type="primary" size="mini" @click="filterShow=!filterShow">检索</el-button>
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
                            <el-input v-model="formInline.planName" placeholder="姓名"></el-input>
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
                                <el-option label="年" value="4"></el-option>
                                <el-option label="半年" value="5"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="状态">
                            <el-select v-model="formInline.planAuditState" placeholder="状态">
                                <el-option label="未提交" value="0"></el-option>
                                <el-option label="已提交" value="1"></el-option>
                                <el-option label="通过" value="2"></el-option>
                                <el-option label="未通过" value="3"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="开始日期">
                            <el-date-picker
                                    v-model="formInline.startTime"
                                    format="yyyy-MM-dd"
                                    value-format="yyyy-MM-dd"
                                    @change="changeTimestart"
                                    type="date"
                                    placeholder="">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="至">
                            <el-date-picker
                                    v-model="formInline.endTime"
                                    format="yyyy-MM-dd"
                                    value-format="yyyy-MM-dd"
                                    @change="changeTimeend"
                                    type="date"
                                    placeholder="">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="维保单位">
                            <el-input v-model="formInline.company" placeholder="维保单位"></el-input>
                        </el-form-item>
                    </el-form>
                </div></el-col>
                <el-col :span="3"><div class="grid-content searchbox">
                    <el-button type="primary" size="mini" icon="el-icon-search" @click="requestList">搜索</el-button>
                    <el-button  size="mini" icon="el-icon-refresh" @click="resetSearch">重置</el-button>
                </div></el-col>
            </el-row>

        </div>

        <div class="contentbox">
            <el-row :gutter="40">
                <el-col :span="gridspan"><div class="grid-content">

                    <div class="contentheader">
                        设备类别
                    </div>
                    <el-table
                            ref="multipleTable"
                            :data="typeList"
                            stripe
                            border
                            style="width: 100%">
                        <el-table-column
                                prop="typeCode"
                                show-overflow-tooltip
                                label="编号">
                        </el-table-column>
                        <el-table-column
                                prop="typeName"
                                show-overflow-tooltip
                                label="设备类型">
                            <template slot-scope="scope">
                                <span @click="lookUser(scope.row)" class="tablebtn tablebtn-c1">{{scope.row.typeName}}</span>

                            </template>
                        </el-table-column>
                    </el-table>
                </div></el-col>
                <el-col :span="24-gridspan"><div class="grid-content">
                    <div class="batchSelectLabel">
                        <i class="el-icon-warning"></i>
                        已选择<span>{{selectData.length}}</span>项
                    </div>
                    <div class="contentheader">
                        保养计划
                    </div>
                    <el-table
                            ref="multipleTable"
                            :data="roleData"
                            @selection-change="handleSelectionChange"
                            stripe
                            border
                            style="width: 100%">
                        <el-table-column
                                show-overflow-tooltip
                                width="55"
                                type="selection">
                        </el-table-column>
                        <el-table-column
                                prop="planCode"
                                show-overflow-tooltip

                                label="计划编号">
                        </el-table-column>
                        <el-table-column
                                prop="planAuditState"
                                show-overflow-tooltip

                                label="状态">
                            <template slot-scope="scope">
                                <span v-if="scope.row.planAuditState==0">未提交</span>
                                <span v-if="scope.row.planAuditState==1">已提交</span>
                                <span v-if="scope.row.planAuditState==2">通过</span>
                                <span v-if="scope.row.planAuditState==3">未通过</span>

                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="planName"
                                show-overflow-tooltip
                                label="计划名称">
                            <template slot-scope="scope">
                                <span class="tableactive" @click="planLookHandle(scope.row)">{{scope.row.planName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                show-overflow-tooltip
                                label="保养类型">
                            <template slot-scope="scope">
                                <span>{{scope.row.maintainType==0?'质保':'维保'}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="maintainType"
                                show-overflow-tooltip
                                label="周期类型">
                            <!--cycleType-->
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
                                prop="facilityNum"
                                show-overflow-tooltip
                                label="设备数量">
                        </el-table-column>
                        <el-table-column
                                prop="company"
                                show-overflow-tooltip
                                label="维保单位">
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
                                prop="maintainType"
                                show-overflow-tooltip
                                label="在用状态">
                            <!--cycleType-->
                            <template slot-scope="scope">
                                <span v-if="scope.row.useState==0" class="tablebtn-c4">启用</span>
                                <span v-if="scope.row.useState==1" class="tablebtn-c3">停用</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                show-overflow-tooltip
                                width="180px"
                                label="操作">
                            <template slot-scope="scope">
                                <!--<span @click="editPlan(scope.row)" class="tablebtn tablebtn-c1">编辑</span>-->
                                <!--<span @click="deletePlan(scope.row)" class="tablebtn tablebtn-c2">删除</span>-->
                                <!--<span  @click="submitPlan(scope.row)" class="tablebtn tablebtn-c1">提交</span>-->
                                <span v-if="scope.row.planAuditState!=1 && scope.row.planAuditState!=2" @click="editPlan(scope.row)" class="tablebtn tablebtn-c1">编辑</span>
                                <span v-if="scope.row.planAuditState!=1 && scope.row.planAuditState!=2" @click="deletePlan(scope.row)" class="tablebtn tablebtn-c2">删除</span>
                                <span v-if="scope.row.planAuditState==0" @click="submitPlan(scope.row)" class="tablebtn tablebtn-c1">提交</span>

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
                </div></el-col>
            </el-row>
        </div>

        <!--新增-->
        <el-dialog
                title="新增页面"
                :visible.sync="addplanShow"
                @close="addplanShow=false"
                width="1000px">
            <span slot="title" class="dialogtitle">
                {{addOrEdit=='edit'?'编辑':'新增'}}页面
              </span>
            <addPlan :clear="clear" :editData="editData" :addeditid="addeditid" :areaList="areaList" :typeList="typeList" @closeHandle="closeAdd"></addPlan>
        </el-dialog>
        <!--查看-->
        <el-dialog
                title="查看页面"
                :visible.sync="planlookShow"
                @close="planlookShow=false"
                width="1000px">
            <span slot="title" class="dialogtitle">
                查看页面
              </span>
            <PlanLook :planData="planData" @closeHandle="planlookShowHandle"></PlanLook>
        </el-dialog>
    </div>
</template>

<script>
    import addPlan from './addPlan'
    import PlanLook from './PlanLook'

    export default {
        name: "MtPlan",
        data:function(){
            return{
                lookData:'',
                clear:0,
                //分页
                total:0,
                pageSize:10,
                currentPage:1,
                filterShow:false,
                //filter
                typeList:[],
                selectData:[],
                gridspan:8,
                lookId:'',
                roleData:[],
                formInline:{
                    planCode:'',
                    planName:'',
                    maintainType:'',
                    cycleType:'',
                    planAuditState:'',
                    startTime:'',
                    endTime:'',
                    company:'',
                    facilityTypeCode:''
                },
                addplanShow:false,
                planlookShow:false,
                addOrEdit:'',
                areaList:[],
                planData:[],
                addeditid:'',
                editData:''
            }
        },
        mounted(){
            this.requestType()
            this.requestArea()
        },
        methods:{
            changeTimestart(val){
                this.formInline.starTime=val
            },
            changeTimeend(val){
                this.formInline.endTime=val
            },
            closeAdd(str){
              this.addplanShow=false
              if(str){
                  this.requestList()
              }
            },
            //筛选
            resetSearch(){
                this.formInline={
                    planCode:'',
                        planName:'',
                        maintainType:'',
                        cycleType:'',
                        planAuditState:'',
                        startTime:'',
                        endTime:'',
                        company:''
                }
                this.requestList()
            },
            handleSelectionChange(val){
                this.selectData=val

            },
            //    获取设备分类列表
            requestType(){
                let vm =this
                vm.$http.post('equipmentConfigController/getDeviceTypeList',{}).then(res=>{
                    if(res.code=='200'){
                        vm.typeList = res.data
                        if(vm.typeList[0]){
                            vm.formInline.facilityTypeCode = vm.typeList[0].typeCode
                            vm.requestList()
                        }

                    }
                })
            },

            //列表
            requestList(){
              let vm =this
              vm.$http.post('maintainPlan/getMaintainPlanList',{
                  pageSize:vm.pageSize,
                  currentPage:vm.currentPage,
                  planCode:vm.formInline.planCode,
                  planName:vm.formInline.planName,
                  maintainType:vm.formInline.maintainType,
                  cycleType:vm.formInline.cycleType,
                  planAuditState:vm.formInline.planAuditState,
                  startTime:vm.formInline.startTime,
                  endTime:vm.formInline.endTime,
                  company:vm.formInline.company,
                  facilityTypeCode:vm.formInline.facilityTypeCode,
                  userCompanyCode:JSON.parse(localStorage.getItem('LOGINDATA')).companyCode
              }).then(res=>{
                  if(res.code==200){
                      vm.total = res.data.count*1
                      vm.roleData = res.data.list
                  }
              })
            },
            //区域
            requestArea(){
                var vm = this
                vm.$http.post(__PATH.BASEPATH+'hospitalController/getHospitalGridInfo',{
                    unitCode:'ZXYSZGDW',
                    hospitalCode:'zkzxysyy',
                }).then(res=>{
                    if(res.code=='200'){
                        var arrData = res.data
                        vm.areaListCommon = res.data
                        var arr=[]
                        var arrChild =[]
                        arrData.forEach(function (item) {
                            if(item.parentId=='#'){
                                arr.push(item)
                            }else{
                                arrChild.push(item)
                            }
                        })
                        var _arr = vm.recursiveFun(arr,arrChild)
                        vm.areaList = _arr
                    }
                })
            },
            lookUser(arr){
                let vm =this
                vm.gridspan = 8
                // vm.lookId = id
                vm.formInline.facilityTypeCode = arr.typeCode
                vm.requestList()
            },
            addplanClick(){
                this.addeditid = ''
                this.addOrEdit = 'add'
                this.addplanShow = true
                this.clear++
            },
            editPlan(row){
                this.addeditid=row.id
                let vm =this
                vm.$http.post('maintainPlan/maintainPlanDetailOrUpdate',{
                    id:row.id,
                    pageSize:'100',
                    currentPage:'1'
                }).then(res=>{
                    if(res.code==200){
                        vm.addOrEdit = 'edit'
                        vm.addplanShow = true
                        this.clear++
                        vm.editData = res.data
                    }
                })

            },
            deletePlan(row){
                debugger
                let vm =this
                this.$confirm('确定要删除这个保养计划吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    vm.$http.post('maintainPlan/deleteMaintainPlan',{
                        id:row.id,
                        planAuditState:row.planAuditState
                    }).then(res=>{
                        if(res.code==200){
                            vm.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            vm.requestList()
                    }
                    })

                }).catch(() => {

                });
            },
            submitPlan(row){
                let vm=this
                this.$confirm('确定要提交这个保养计划吗，提交后无法编辑和删除', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    vm.$http.post('maintainPlan/submitMaintainPlan',{
                        id:row.id,
                        planAuditState:row.planAuditState
                    }).then(res=>{
                        if(res.code==200){
                            vm.$message({
                                type: 'success',
                                message: '提交成功!'
                            });
                            vm.requestList()
                        }
                    })
                }).catch(() => {

                });
            },
            //复制
            copyPlan(){
                let vm =this
                if(vm.selectData.length !=1){
                    vm.$message({
                        type: 'warning',
                        message: '请选择一条计划复制!'
                    });
                    return
                }
                this.$confirm('确定要复制此保养计划吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    vm.$http.post('maintainPlan/copyMaintainPlanData',{
                        id:vm.selectData[0].id
                    }).then(res=>{
                        if(res.code==200){
                            vm.$message({
                                type: 'success',
                                message: '复制成功!'
                            });
                            vm.requestList()
                        }
                    })
                }).catch(() => {

                });
            },
            //查看
            planLookHandle(row){
                let vm =this
                vm.lookData=row
                vm.$http.post('maintainPlan/maintainPlanDetailOrUpdate',{
                    id:row.id,
                    pageSize:'10',
                    currentPage:'1'
                }).then(res=>{
                   if(res.code==200){
                       vm.planlookShow =true
                       vm.planData=res.data
                       vm.planData.maintainPlanDetail.cycleRole = JSON.parse(vm.planData.maintainPlanDetail.cycleRole)
                   }
                })
            },
            //查看内部编辑
            planlookShowHandle(str){
                this.planlookShow =false
                if(str=='edit'){ //lookData
                    this.editPlan(this.lookData)
                    // this.addOrEdit = 'edit'
                    // this.addplanShow = true
                    // this.clear++
                }
            },
            //    分页
            pageSizeChange(val){
                this.pageSize =val
                this.requestList()
            },
            pageCurrentChange(val){
                this.currentPage =val
                this.requestList()
            },
            //递归处理函数，联级使用
            recursiveFun(arr,arrData){
                var vm =this
                arr.forEach(function (item) {

                    arrData.forEach(function (arritem) {
                        if(arritem.parentId==item.id){
                            if(!item.children){
                                item.children=[]
                            }
                            item.children.push(arritem)
                        }
                    })
                    if(item.children && item.children.length){
                        vm.recursiveFun(item.children,arrData)
                    }
                })
                return arr
            },

        },
        components:{
            addPlan,PlanLook
        }

    }
</script>

<style scoped lang="scss">
    .mtplan{
        .contentheader{
            height: 48px;
            line-height: 48px;
            padding-left: 10px;
            text-align: left;
            background-color: #66a3ff;
            color: #fff;
        }
    }
</style>