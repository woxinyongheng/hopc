<template>
    <div class="workorder">
        <div class="righttitle">
            <p>维修工单</p>
        </div>
        <div class="buttonbox">
            <div class="pullleft">
                <el-button size="mini" plain @click="stateHandle('')">全部</el-button>
                <el-button size="mini" plain type="danger" @click="stateHandle('0')">未派工</el-button>
                <el-button size="mini" plain type="success" @click="stateHandle('1')">已派工</el-button>
                <el-button size="mini" plain type="info" @click="stateHandle('2')">已挂单</el-button>
                <el-button size="mini" plain type="warning" @click="stateHandle('3')">已完成</el-button>
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
                        <el-form-item label="记录单号">
                            <el-input v-model="formInline.repairCode" placeholder="记录单号"></el-input>
                        </el-form-item>
                        <el-form-item label="报修时间">
                            <el-date-picker
                                    v-model="formInline.reportTimeStart"
                                    format="yyyy-MM-dd"
                                    value-format="yyyy-MM-dd"
                                    @change="changeTimestart"
                                    type="date"
                                    placeholder="开始日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="至">
                            <el-date-picker
                                    v-model="formInline.reportTimeEnd"
                                    format="yyyy-MM-dd"
                                    value-format="yyyy-MM-dd"
                                    @change="changeTimeend"
                                    type="date"
                                    placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="报修人">
                            <el-input v-model="formInline.reportPersonName" placeholder="报修人"></el-input>
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
                                    v-model="formInline.areaName"
                                    change-on-select
                                    :options="areaList"
                                    :props="props"
                            ></el-cascader>
                        </el-form-item>
                        <el-form-item label="责任归属">
                            <el-select v-model="formInline.taskIdOrliabilityCode" placeholder="责任归属">
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
                        show-overflow-tooltip
                        width="180">
                    <template slot-scope="scope">
                        <span  @click="showOrderInfo(scope.row)" class="tableactive">{{scope.row.repairCode}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="reportTime"
                        label="报修时间"
                        show-overflow-tooltip

                        width="180">
                </el-table-column>
                <el-table-column
                        prop="reportPersonName"
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
                        prop="address"
                        show-overflow-tooltip
                        label="状态">
                    <template slot-scope="scope">
                        <span   class="tablebtn tablebtn-c2" v-if="scope.row.state==0">未派工</span>
                        <span   class="tablebtn tablebtn-c1" v-if="scope.row.state==1">已派工</span>
                        <span   class="tablebtn tablebtn-c2" v-if="scope.row.state==2">已挂单</span>
                        <span   class="tablebtn tablebtn-c1" v-if="scope.row.state==3">已完成</span>

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
            <jiludanhao :type="'guadan'" :data="repairData" @closeOrderHandle="jiludanhaoShow=false"></jiludanhao>
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
    import jiludanhao from '@/components/globaltem/Jiludanhaogongdan'
    import shebeichakan from '@/components/globaltem/Shebeichakan'
    export default {
        name: "WorkOrder",
        data:function () {
            return{
                state:'',
                //分页
                total:0,
                pageSize:10,
                currentPage:1,
                filterShow:false,
                typeList:[],
                areaList:[],
                componyList:[],
                formInline:{
                    repairCode:'',
                    reportTimeStart:'',
                    reportTimeEnd:'',
                    reportPersonName:'',
                    assetsCode:'',
                    assetsName:'',
                    assetsTypeId:'',
                    areaName:[],
                    taskIdOrliabilityCode:''
                },
                options: [{
                    label: '江苏',
                    cities: []
                }, {
                    label: '浙江',
                    cities: []
                }],
                props: {
                    label:'gridName',
                    value:'gridName',
                    children:'children'
                },
                tableData: [],
                jiludanhaoShow:false,
                shebeichakanShow:false,
                selectData:[],
                deviceData:[],
                repairData:[]

            }
        },
        mounted(){
          this.requestList()
            this.requestArea()
            this.requestType()
            this.requestComponeny()
        },
        methods:{
            changeTimestart(val){
                this.formInline.reportTimeStart=val
            },
            changeTimeend(val){
                this.formInline.reportTimeEnd=val
            },
            stateHandle(s){
                this.state =s
                this.requestList()
            },
            //    列表选择
            handleSelectionChange(val){
                this.selectData=val
            },
            //筛选
            searchClick(){
                this.requestList()
            },
            resetSearch(){
                this.formInline = {
                    repairCode:'',
                    reportTimeStart:'',
                    reportTimeEnd:'',
                    reportPersonName:'',
                    assetsCode:'',
                    assetsName:'',
                    assetsTypeId:'',
                    areaName:[],
                    taskIdOrliabilityCode:''
                }
                this.requestList()
            },
            //列表请求
            requestList(){
              let vm =this
              vm.$http.post('/repair/getMaintenanceOrder',{
                  pageSize:vm.pageSize,
                  currentPage:vm.currentPage,
                  repairCode:vm.formInline.repairCode,
                  reportTimeStart:vm.formInline.reportTimeStart,
                  reportTimeEnd:vm.formInline.reportTimeEnd,
                  reportPersonName:vm.formInline.reportPersonName,
                  assetsCode:vm.formInline.assetsCode,
                  assetsName:vm.formInline.assetsName,
                  assetsTypeId:vm.formInline.assetsTypeId,
                  areaName:vm.formInline.areaName.length ? vm.formInline.areaName[vm.formInline.areaName.length -1]: '',
                  taskIdOrliabilityCode:vm.formInline.taskIdOrliabilityCode,
                  state:vm.state
              }).then(res=>{
                    if(res.code==200){
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
            //    wuye
            requestComponeny(){
                let vm = this
                vm.$http.post(__PATH.BASEPATH+'outsourcedController/getOutsourcedCompanyList',{}).then(res=>{
                    if(res.code==200){
                        vm.componyList = res.data
                    }
                })
            },
            showOrderInfo(row){//记录单号
                let vm =this
                vm.$http.post('equipmentListController/getRepairDetailById',{
                    id:row.id
                }).then(res=>{
                    if(res.code==200){
                        vm.repairData = res.data.repair
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
                    id:row.equipmentId,
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
    .workorder{

    }
</style>