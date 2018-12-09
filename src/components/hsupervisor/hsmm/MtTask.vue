<template>
    <div class="mttask">
        <div class="righttitle">
            <p>保养任务</p>
        </div>
        <div class="buttonbox">
            <div class="pullleft">
                <el-button plain size="mini" @click="stateClick('all')">全部</el-button>
                <el-button plain size="mini" type="warning" @click="stateOverClick('1')">已超时</el-button>
                <el-button plain size="mini" type="danger" @click="stateClick('0')">未派工</el-button>
                <el-button plain size="mini" type="success" @click="stateClick('2')">已派工</el-button>
                <el-button plain size="mini" type="info" @click="stateClick('1')">已挂单</el-button>
                <el-button plain size="mini" type="warning" @click="stateClick('3')">已完成</el-button>
                <el-button type="warning" size="mini">导出</el-button>
            </div>
            <div class="pullright">
                <el-button type="success" size="mini" icon="el-icon-search" @click="filterShow=!filterShow">检索</el-button>
            </div>
        </div>
        <div class="filterbox" v-if="filterShow">
            <el-row>
                <el-col :span="21"><div class="grid-content">
                    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
                        <el-form-item label="任务编号">
                            <el-input v-model="formInline.maintainCode" placeholder="任务编号"></el-input>
                        </el-form-item>
                        <el-form-item label="设备类别">
                            <el-select v-model="formInline.assetsTypeId" placeholder="设备类别">
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
                            <el-input v-model="formInline.maintainItem" placeholder="保养项目"></el-input>
                        </el-form-item>
                        <el-form-item label="要求完成时间">
                            <el-date-picker
                                    v-model="formInline.starTime"
                                    format="yyyy-MM-dd"
                                    value-format="yyyy-MM-dd"
                                    @change="changeTimestart"
                                    type="date"
                                    placeholder="开始日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="至">
                            <el-date-picker
                                    v-model="formInline.endTime"
                                    format="yyyy-MM-dd"
                                    value-format="yyyy-MM-dd"
                                    @change="changeTimeend"
                                    type="date"
                                    placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="责任归属">
                            <el-select v-model="formInline.propertyCompanyCode" placeholder="责任归属">
                                <el-option v-for="item in componyList" :label="item.companyName" :value="item.companyCode"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="设备编号">
                            <el-input v-model="formInline.assetsCode" placeholder="设备编号"></el-input>
                        </el-form-item>
                        <el-form-item label="设备名称">
                            <el-input v-model="formInline.assetsName" placeholder="设备名称"></el-input>
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
            <div class="batchSelectLabel">
                <i class="el-icon-warning"></i>
                已选择<span>{{selectData.length}}</span>项
            </div>
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
                        prop="maintainCode"
                        label="记录单号"
                        show-overflow-tooltip
                        width="180">
                    <template slot-scope="scope">
                        <span  @click="showOrderInfo(scope.row,scope.row.id)" class="tableactive">{{scope.row.maintainCode}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="classifyName"
                        label="设备类别"
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
                        prop="maintainItem"
                        show-overflow-tooltip

                        label="保养项目">
                </el-table-column>
                <el-table-column
                        prop="requirementPlanTime"
                        show-overflow-tooltip

                        label="要求完成时间">
                </el-table-column>
                <el-table-column
                        prop="propertyCompanyName"
                        show-overflow-tooltip

                        label="责任归属">
                </el-table-column>
                <el-table-column
                        prop="assetsCode"
                        show-overflow-tooltip
                        label="设备编号">
                    <template slot-scope="scope">
                        <span  @click="showshebeiInfo(scope.row)" class="tableactive">{{scope.row.assetsCode}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="assetsName"
                        show-overflow-tooltip

                        label="设备名称">
                </el-table-column>
                <el-table-column
                        prop="state"
                        show-overflow-tooltip
                        label="状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.state==3" type="success" class="tablebtn-c4">已完成</span>
                        <span v-if="scope.row.state==2"  type="info" class="tablebtn-c1">已派工</span>
                        <span v-if="scope.row.state==1"  type="warning" class="tablebtn-c2">已挂单</span>
                        <span v-if="scope.row.state==0"  type="danger" class="tablebtn-c3">未派工</span>
                    </template>
                </el-table-column>
            </el-table>
            <div class="page">
                <el-pagination
                        :current-page="1"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="100"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </div>
        </div>
        <el-dialog
                title="查看页面"
                :visible.sync="jiludanhaoShow"
                @close="closeHandle"
                width="1000px">
            <span slot="title" class="dialogtitle">
                查看页面
              </span>
            <baoyangdanhao :type="'guadan'" :orderData="orderData" @closeOrderHandle="jiludanhaoShow=false"></baoyangdanhao>
        </el-dialog>
        <el-dialog
                title="设备查看"
                :visible.sync="shebeichakanShow"
                @close="closeShebeiHandle"
                width="1000px">
            <span slot="title" class="dialogtitle">
                查看页面
              </span>
            <shebeichakan :deviceData="deviceData" @closeShebeiHandle="shebeichakanShow=false" ></shebeichakan>
        </el-dialog>
    </div>
</template>

<script>
    import baoyangdanhao from '@/components/globaltem/Baoyangdanhao'
    import shebeichakan from '@/components/globaltem/Shebeichakan'
    export default {
        name: "MtTask",
        data:function () {
            return{
                //分页
                total:0,
                pageSize:10,
                currentPage:1,
                typeList:[],
                componyList:[],
                state:'',
                overTime:'',
                filterShow:false,
                formInline:{
                    maintainCode:'',
                    assetsTypeId:'',
                    maintainType:'',
                    cycleType:'',
                    maintainItem:'',
                    propertyCompanyCode:'',
                    assetsCode:'',
                    assetsName:'',
                    starTime:'',
                    endTime:''

                },
                tableData: [],
                jiludanhaoShow:false,
                shebeichakanShow:false,
                selectData:[],
                deviceData:[],
                orderData:[]


            }
        },
        mounted(){
            this.requestList()
            this.requestType()
            this.requestComponeny()
        },
        methods:{
            changeTimestart(val){
                this.formInline.starTime=val
            },
            changeTimeend(val){
                this.formInline.endTime=val
            },
            //重置筛选
            resetSearch(){
                this.formInline={
                    maintainCode:'',
                        assetsTypeId:'',
                        maintainType:'',
                        cycleType:'',
                        maintainItem:'',
                        propertyCompanyCode:'',
                        assetsCode:'',
                        assetsName:'',
                    starTime:'',
                    endTime:''
                }
                this.requestList()
            },
            //状态
            stateClick(num){
                this.overTime = ''
                if(num=='all'){
                    this.state=''
                }else{
                    this.state=num

                }
                this.requestList()
            },
            stateOverClick(num){
                this.overTime = num
                this.requestList()
            },
            //获取列表
            requestList(){
              let vm =this
              vm.$http.post('/maintainController/findMaintainList',{
                  pageSize:vm.pageSize,
                  currentPage:vm.currentPage,
                  maintainCode:vm.formInline.maintainCode,
                  assetsTypeId:vm.formInline.assetsTypeId,
                  maintainType:vm.formInline.maintainType,
                  cycleType:vm.formInline.cycleType,
                  maintainItem:vm.formInline.maintainItem,
                  propertyCompanyCode:vm.formInline.propertyCompanyCode,
                  assetsCode:vm.formInline.assetsCode,
                  assetsName:vm.formInline.assetsName,
                  overTime:vm.overTime,
                  state:vm.state,
                  starTime:vm.formInline.starTime,
                  endTime:vm.formInline.endTime
              }).then(res=>{
                  if(res.code==200){
                      vm.total = res.data.count
                      vm.tableData = res.data.data

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
            //    列表选择
            handleSelectionChange(val){
                this.selectData=val
            },
            showOrderInfo(row){//记录单号
                let vm =this
                vm.$http.post('maintainController/MaintainView',{
                    id:row.id
                }).then(res=>{
                    if(res.code==200){
                        vm.orderData = res.data
                        vm.jiludanhaoShow = true
                    }
                })

            },
            closeHandle(){
                this.jiludanhaoShow = false

            },
            showshebeiInfo(row){//设备编号
                let vm =this
                vm.$http.post('equipmentListController/GetEquipmentById',{
                    id:row.equipmentid,
                }).then(res=>{
                    if(res.code==200){
                        vm.deviceData = res.data
                        vm.shebeichakanShow =true
                    }
                })
                // this.shebeichakanShow=true
            },
            closeShebeiHandle(){
                this.shebeichakanShow=false

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
            baoyangdanhao,shebeichakan
        }
    }
</script>

<style scoped lang="scss">
    .mttask{

    }
</style>