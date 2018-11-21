<template>
    <div class="myrepair">
        <div class="righttitle">
            <p>我的报修</p>
        </div>
        <div class="buttonbox">
            <div class="pullleft">
                <el-button size="mini" plain>全部</el-button>
                <el-button type="danger" plain size="mini">未派工</el-button>
                <el-button type="success" plain size="mini">已派工</el-button>
                <el-button type="info" plain size="mini">已挂单</el-button>
                <el-button type="warning" plain size="mini">已完成</el-button>
                <el-button type="warning" plain size="mini" @click="exportHandle">导出</el-button>
            </div>
            <div class="pullright">
                <el-button type="success" size="mini" icon="el-icon-search" @click="filterShow=!filterShow">检索</el-button>
            </div>
        </div>
        <div class="filterbox" v-if="filterShow">
            <el-row>
                <el-col :span="21"><div class="grid-content">
                    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
                        <el-form-item label="记录单号">
                            <el-input v-model="formInline.repairCode" placeholder="记录单号"></el-input>
                        </el-form-item>
                        <el-form-item label="报修时间">
                            <el-date-picker
                                    v-model="formInline.reportStartTime"
                                    type="date"
                                    placeholder="开始日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="至">
                            <el-date-picker
                                    v-model="formInline.reportEndTime"
                                    type="date"
                                    placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="设备编号">
                            <el-input v-model="formInline.assetsCode" placeholder="设备编号"></el-input>
                        </el-form-item>
                        <el-form-item label="设备名称">
                            <el-input v-model="formInline.assetsName" placeholder="设备名称"></el-input>
                        </el-form-item>
                        <el-form-item label="设备类别">
                            <el-select v-model="formInline.assetsTypeId" placeholder="设备类别">
                                <el-option v-for="(item,index) in typeList" :label="item.typeName" :value="item.typeCode"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="所在区域">
                            <el-cascader
                                    v-model="areaSelect"
                                    change-on-select
                                    :options="areaList"
                                    :props="props"
                            ></el-cascader>
                        </el-form-item>
                        <el-form-item label="责任归属">
                            <el-select v-model="formInline.liabilityName" placeholder="责任归属">
                                <el-option v-for="item in componyList" :label="item.companyName" :value="item.companyCode"></el-option>
                            </el-select>
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
                        prop="repairCode"
                        label="记录单号"
                        show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span  @click="showOrderInfo(scope.row)" class="tableactive">{{scope.row.repairCode}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="reportTime"
                        label="报修时间"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        prop="repairPersonName"
                        show-overflow-tooltip

                        label="报修人">
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
                        prop="classifyName"
                        show-overflow-tooltip

                        label="设备类别">
                </el-table-column>
                <el-table-column
                        prop="areaName"
                        show-overflow-tooltip

                        label="所在区域">
                </el-table-column>
                <el-table-column
                        prop="storageLocation"
                        show-overflow-tooltip

                        label="存放地点">
                </el-table-column>
                <el-table-column
                        prop="liabilityName"
                        show-overflow-tooltip

                        label="责任归属">
                </el-table-column>
                <el-table-column
                        prop="state"
                        show-overflow-tooltip
                        label="状态">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.status==3" type="success">已完成</el-tag>
                        <el-tag v-if="scope.row.status==2"  type="info">已派工</el-tag>
                        <el-tag v-if="scope.row.status==1"  type="warning">已挂单</el-tag>
                        <el-tag v-if="scope.row.status==0"  type="danger">未处理</el-tag>
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
                title="查看页面"
                :visible.sync="jiludanhaoShow"
                @close="closeHandle"
                width="1000px">
            <span slot="title" class="dialogtitle">
                查看页面
              </span>
            <jiludanhao :orderData="orderData" @closeOrderHandle="jiludanhaoShow=false"></jiludanhao>
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
    import jiludanhao from '@/components/globaltem/Jiludanhao'
    import shebeichakan from '@/components/globaltem/Shebeichakan'
    export default {
        name: "MyRepair",
        data:function () {
            return{
                workOrderState:'',
                //分页
                total:0,
                pageSize:10,
                currentPage:1,
                typeList:[],
                componyList:[],
                areaList:[],
                filterShow:false,
                deviceData:[],
                orderData:'',
                formInline:{
                    repairCode:'',
                    reportStartTime:'',
                    reportEndTime:'',
                    assetsCode:'',
                    assetsName:'',
                    assetsTypeId:'',
                    areaName:'',
                    liabilityName:''
                },
                props: {
                    label:'gridName',
                    value:'gridName',
                    children:'children'
                },
                areaSelect:[],
                tableData: [],
                jiludanhaoShow:false,
                shebeichakanShow:false,
                selectData:[]

            }
        },
        mounted(){
            this.requestList()
            this.requestType()
            this.requestComponeny()
            this.requestArea()

        },
        methods:{
            //    列表选择
            handleSelectionChange(val){
                this.selectData=val
            },
            //筛选
            searchClick(){
                this.requestList()
            },
            resetSearch(){
                this.formInline={
                    repairCode:'',
                    reportStartTime:'',
                    reportEndTime:'',
                    assetsCode:'',
                    assetsName:'',
                    assetsTypeId:'',
                    areaName:'',
                    liabilityName:''
                }
                this.areaSelect =[]
                this.requestList()
            },
            showOrderInfo(row){//记录单号
                let vm =this
                vm.$http.post('equipmentListController/getRepairDetailById',{
                    id:row.id,
                }).then(res=>{
                    debugger
                    if(res.code=='200'){
                        vm.orderData=res.data.repair
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
                    id:row.equipmentId
                }).then(res=>{
                    if(res.code==200){
                        vm.deviceData = res.data
                        vm.shebeichakanShow =true
                    }
                })
            },
            closeShebeiHandle(){
                this.shebeichakanShow=false

            },
            requestList(){
                let vm =this
                vm.$http.post('equipmentListController/getMyRepairs',{
                    pageSize:vm.pageSize,
                    currentPage:vm.currentPage,
                    reportStartTime:vm.formInline.reportStartTime,
                    reportEndTime:vm.formInline.reportEndTime,
                    assetsCode:vm.formInline.assetsCode,
                    assetsName:vm.formInline.assetsName,
                    assetsTypeId:vm.formInline.assetsTypeId,
                    areaName:vm.areaSelect.length?vm.areaSelect[vm.areaSelect.length-1]:'',
                    liabilityName:vm.formInline.liabilityName,
                    workOrderState:vm.workOrderState
                }).then(res=>{
                    if(res.code=='200'){
                        vm.tableData = res.data.list
                        vm.total = res.data.count
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
            //导出
            exportHandle(){
                let vm =this
                let _id =[]
                vm.selectData.forEach(function (item) {
                    _id.push(item.equipmentId)
                })
                vm.$http.post('equipmentListController/getExportMyRepairs',{
                    reportStartTime:vm.formInline.reportStartTime,
                    reportEndTime:vm.formInline.reportEndTime,
                    assetsCode:vm.formInline.assetsCode,
                    assetsName:vm.formInline.assetsName,
                    assetsTypeId:vm.formInline.assetsTypeId,
                    areaName:vm.areaSelect.length?vm.areaSelect[vm.areaSelect.length-1]:'',
                    liabilityName:vm.formInline.liabilityName,
                    workOrderState:vm.workOrderState,
                    state:vm.state,
                    ids:_id.join(',')
                }).then(res=>{
                    if(res.code==200){
                    }
                })
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
            jiludanhao,shebeichakan
        }
    }
</script>

<style scoped lang="scss">
    .myrepair{

    }
</style>