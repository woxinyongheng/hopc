<template>
    <div class="warrex">
        <div class="righttitle">
            <p>质保到期</p>
        </div>
        <div class="buttonbox">
            <div class="pullleft">
                <el-button size="mini" plain @click="stateClick('all')">全部</el-button>
                <el-button size="mini" plain type="danger" @click="stateClick('0')">未处理</el-button>
                <el-button size="mini" plain type="success" @click="stateClick('1')">已处理</el-button>
                <el-button size="mini" plain type="warning" @click="stateClick('2')">已超时</el-button>
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
                            <el-form-item label="设备编号">
                                <el-input v-model="formInline.assetsCode" placeholder="设备编号"></el-input>
                            </el-form-item>
                            <el-form-item label="设备名称">
                                <el-input v-model="formInline.assetsName" placeholder="设备名称"></el-input>
                            </el-form-item>
                            <el-form-item label="设备类别">
                                <el-select v-model="formInline.assetsTypeId" placeholder="设备类别">
                                    <el-option v-for="(item,index) in typeList" :label="item.typeName" :value="item.typeId"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="设备品牌">
                                <el-select v-model="formInline.brandName" placeholder="设备品牌">
                                    <el-option v-for="(item,index) in brandList" :label="item.typeName" :value="item.typeCode"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="规格型号">
                                <el-input v-model="formInline.model" placeholder="规格型号"></el-input>
                            </el-form-item>
                            <el-form-item label="到期日期">
                                <el-date-picker
                                        v-model="formInline.lifeExpectancyStarts"
                                        format="yyyy-MM-dd"
                                        value-format="yyyy-MM-dd"
                                        @change="changeTimestart"
                                        type="date"
                                        placeholder="">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="至">
                                <el-date-picker
                                        v-model="formInline.lifeExpectancyEnd"
                                        format="yyyy-MM-dd"
                                        value-format="yyyy-MM-dd"
                                        @change="changeTimeend"
                                        type="date"
                                        placeholder="">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="责任归属">
                                <el-select v-model="formInline.liabilityName" placeholder="责任归属">
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
        </div >
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
                        label="状态"
                        prop="state"
                        width="80">
                </el-table-column>
                <el-table-column
                        label="照片"
                        show-overflow-tooltip
                        width="80">
                    <template slot-scope="scope">
                        <img class="tebleimg" :src="scope.row.picture" alt="">
                    </template>
                </el-table-column>
                <el-table-column
                        prop="assetsCode"
                        label="设备编号"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        prop="assetsName"
                        show-overflow-tooltip
                        label="设备名称">
                    <template slot-scope="scope">
                        <span  @click="showshebeiInfo(scope.row)" class="tableactive">{{scope.row.assetsName}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="classifyName"
                        show-overflow-tooltip
                        label="设备类别">
                </el-table-column>
                <el-table-column
                        prop="brandName"
                        show-overflow-tooltip
                        label="设备品牌">
                </el-table-column>
                <el-table-column
                        prop="model"
                        show-overflow-tooltip
                        label="规格型号">
                </el-table-column>
                <el-table-column
                        prop="propertyCompanyName"
                        show-overflow-tooltip
                        label="质保到期日期">
                </el-table-column>
                <el-table-column
                        prop="company"
                        show-overflow-tooltip
                        label="物业归属">
                </el-table-column>
                <el-table-column
                        prop="address"
                        width="140px"
                        label="操作">
                    <template slot-scope="scope">
                        <span  @click="warrInfo(scope.row)" class="tablebtn tablebtn-c1">处理</span>

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
                title="设备查看"
                :visible.sync="deviceInfoShow"
                @close="deviceInfoShow=false"
                width="1000px">
            <span slot="title" class="dialogtitle">
                设备查看
              </span>
            <DeviceInfo :deviceData="deviceData" :operateRow="operateRow" @closeHandle="deviceInfoShow=false" :type="3"  ></DeviceInfo>
        </el-dialog>
        <!--质保到期弹框-->
        <el-dialog
                title="质保到期处理"
                :visible.sync="warrType"
                @close="warrType=false"
                width="1000px"
                append-to-body>
            <span slot="title" class="dialogtitle">质保到期处理</span>
            <warrTem :clear="clear" :operateRow="operateRow" @closeHandle="warrType=false"></warrTem>
        </el-dialog>

    </div>
</template>

<script>
    import DeviceInfo from './tem/DeviceInfo'
    import warrTem from './tem/warrTem'
    export default {
        name: "WarrEx",
        data:function () {
            return{
                clear:0,
                //分页
                total:0,
                pageSize:10,
                currentPage:1,
                typeList:[],
                brandList:[],
                componyList:[],
                filterShow:false,
                formInline:{
                    state:'',
                    assetsCode:'',
                    assetsName:'',
                    assetsTypeId:'',
                    brandName:'',
                    model:'',
                    lifeExpectancyStarts:'',
                    lifeExpectancyEnd:'',
                    liabilityName:''
                },
                tableData: [],
                deviceInfoShow:false,
                deviceData:[],
                warrType:false,
                selectData:[],
                operateRow:[]


            }
        },
        mounted(){
            this.requestList()
            this.requestComponeny()
            this.requestType()
        },
        methods:{
            changeTimestart(val){
                this.formInline.lifeExpectancyStarts=val
            },
            changeTimeend(val){
                this.formInline.lifeExpectancyEnd=val
            },
            //筛选
            resetSearch(){
                var state = this.formInline.state
                this.formInline={
                    state:state,
                        assetsCode:'',
                        assetsName:'',
                        assetsTypeId:'',
                        brandName:'',
                        model:'',
                        lifeExpectancyStarts:'',
                        lifeExpectancyEnd:'',
                        liabilityName:''
                }
                this.requestList()
            },
            //    列表选择
            handleSelectionChange(val){
                this.selectData=val
            },
            //状态
            stateClick(str){
                if(str=='all'){
                    this.formInline.state = ''
                }else{
                    this.formInline.state = str
                }
                this.requestList()
            },
            //列表
            requestList(){
                let vm =this
                vm.$http.post('assetsinfoController/getLifetimeExpiration',{
                    interfaceNum:'2',
                    pageSize:vm.pageSize,
                    currentPage:vm.currentPage,
                    state:vm.formInline.state,
                    assetsCode:vm.formInline.assetsCode,
                    assetsName:vm.formInline.assetsName,
                    assetsTypeId:vm.formInline.assetsTypeId,
                    brandName:vm.formInline.brandName,
                    model:vm.formInline.model,
                    lifeExpectancyStarts:vm.formInline.lifeExpectancyStarts,
                    lifeExpectancyEnd:vm.formInline.lifeExpectancyEnd,
                    propertyCompanyCode:vm.formInline.liabilityName,
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
            //    wuye
            requestComponeny(){
                let vm = this
                vm.$http.post(__PATH.BASEPATH+'outsourcedController/getOutsourcedCompanyList',{}).then(res=>{
                    if(res.code==200){
                        vm.componyList = res.data
                    }
                })
            },
            showshebeiInfo(row){
                this.operateRow =row
                let vm =this
                vm.$http.post('equipmentListController/GetEquipmentById',{
                    id:row.id
                }).then(res=>{
                    if(res.code==200){
                        vm.deviceData = res.data.list
                        vm.deviceInfoShow =true
                    }
                })
            },
            warrInfo(row){
                this.operateRow=row
                this.clear++
                this.warrType =true
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
            DeviceInfo,warrTem
        }
    }
</script>

<style scoped lang="scss">
    .warrex {

    }
</style>