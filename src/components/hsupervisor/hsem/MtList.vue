<template>
    <!--医院运保主管 设备列表-->
    <div class="mtlist">
        <div class="righttitle">
            <p>设备列表</p>
        </div>
        <div class="buttonbox">
            <div class="pullleft">
                <el-button plain @click="normalStateClick" size="mini" >全部</el-button>
                <el-button plain type="success" @click="commonStateClick" size="mini" >正常</el-button>
                <el-button plain type="danger" @click="pullStateClick" size="mini" >延期</el-button>
                <el-button plain type="warning" @click="repairStateClick" size="mini" >待维修</el-button>
                <el-button  type="danger" size="mini" @click="deviceRepairClick">设备报修</el-button>
                <el-button type="warning" size="mini" @click="exportHandle">导出</el-button>
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
                                <el-select v-model="formInline.assetsTypeId" placeholder="设备类别" @change="changeBrand">
                                    <el-option v-for="(item,index) in typeList" :label="item.typeName" :value="item.typeId"></el-option>
                                </el-select>
                                <!--<el-cascader-->
                                        <!--:options="options"-->
                                        <!--v-model="formInline.tree"-->
                                        <!--:props="props">-->
                                <!--</el-cascader>-->
                            </el-form-item>
                            <el-form-item label="设备品牌">
                                <el-select v-model="formInline.brandId" placeholder="设备品牌">
                                    <el-option v-for="(item,index) in brandList" :label="item.brandName" :value="item.id"></el-option>
                                </el-select>
                                <!--<el-input v-model="formInline.brandId" placeholder="设备品牌"></el-input>-->

                                <!--<el-cascader-->
                                        <!--:options="options"-->
                                        <!--v-model="formInline.tree"-->
                                        <!--:props="props">-->
                                <!--</el-cascader>-->
                            </el-form-item>
                            <el-form-item label="规格型号">
                                <el-input v-model="formInline.model" placeholder="规格型号"></el-input>
                            </el-form-item>
                            <el-form-item label="维修次数" class="selectinputmini">
                                <el-input v-model="formInline.repairNumber" placeholder="维修次数"  class="input-with-select ">
                                    <el-select slot="prepend" v-model="formInline.repairNumberSymbol" placeholder="" class="miniselect">
                                        <el-option v-for="(item,index) in frequencyData" :label="item.label" :value="item.label"></el-option>
                                    </el-select>
                                </el-input>
                            </el-form-item>
                            <el-form-item label="累计支出" class="selectinputmini">
                                <el-input v-model="formInline.repairExpenditure" placeholder="累计支出"  class="input-with-select">
                                    <el-select slot="prepend" v-model="formInline.repairExpenditureSymbol" placeholder="" class="miniselect">
                                        <el-option v-for="(item,index) in frequencyData" :label="item.label" :value="item.label"></el-option>
                                    </el-select>
                                </el-input>
                            </el-form-item>
                            <el-form-item label="保养次数" class="selectinputmini">
                                <el-input v-model="formInline.maintainNumber" placeholder="保养次数"  class="input-with-select">
                                    <el-select slot="prepend" v-model="formInline.maintainNumberSymbol" placeholder="" class="miniselect">
                                        <el-option v-for="(item,index) in frequencyData" :label="item.label" :value="item.label"></el-option>
                                    </el-select>
                                </el-input>
                            </el-form-item>


                            <el-form-item label="设备管理员">
                                <el-select v-model="formInline.equipmentAdminCode" placeholder="设备管理员">
                                    <el-option v-for="(item,index) in adminList" :label="item.name" :value="item.id"></el-option>
                                </el-select>
                                <!--<el-cascader  adminList-->
                                        <!--:options="options"-->
                                        <!--v-model="formInline.tree"-->
                                        <!--:props="props">-->
                                <!--</el-cascader>-->
                            </el-form-item>
                            <el-form-item label="责任归属">
                                <el-select v-model="formInline.propertyCompanyCode" placeholder="责任归属">
                                    <el-option v-for="item in componyList" :label="item.companyName" :value="item.companyCode"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-col>
                <el-col :span="3">
                    <div class="grid-content searchbox">
                        <el-button type="primary" size="mini" icon="el-icon-search" @click="searchClick">搜索</el-button>
                        <el-button size="mini" icon="el-icon-refresh" @click="resetSearch">重置</el-button>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="contentbox">
            <div class="batchSelectLabel">
                <i class="el-icon-warning"></i>
                已选择<span>{{selectData.length}}</span>项
            </div>
            <el-table
                    :data="tableData"
                    stripe
                    border
                    @selection-change="handleSelectionChange"
                    style="width: 100%">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        label="状态"
                        prop="status"
                        width="80">
                    <template slot-scope="scope">
                        <span v-if="scope.row.equipmentState==0">正常</span>
                        <span v-if="scope.row.equipmentState==1">延期</span>
                        <span v-if="scope.row.equipmentState==2">报废</span>
                    </template>
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
                        prop="repairNumber"
                        show-overflow-tooltip
                        width="100px"
                        label="维修次数(次)">
                </el-table-column>
                <el-table-column
                        prop="repairExpenditure"
                        show-overflow-tooltip
                        label="累计支出">
                </el-table-column>
                <el-table-column
                        prop="maintainNumber"
                        show-overflow-tooltip
                        width="100px"
                        label="保养次数(次)">
                </el-table-column>
                <el-table-column
                        prop="equipmentAdminName"
                        show-overflow-tooltip
                        label="设备管理员">
                </el-table-column>
                <el-table-column
                        prop="propertyCompanyName"
                        show-overflow-tooltip
                        label="责任归属">
                </el-table-column>
                <el-table-column
                        prop="taskName"
                        show-overflow-tooltip
                        label="任务归属">
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
                :visible.sync="shebeichakanShow"
                @close="shebeichakanShow=false"
                width="1000px">
            <span slot="title" class="dialogtitle">
                设备查看
              </span>
            <shebeichuli :deviceData="deviceData" @closeShebeiHandle="shebeichakanShow=false" ></shebeichuli>
        </el-dialog>
        <el-dialog
                title="设备报修"
                :visible.sync="shebeibaoxiuShow"
                @close="shebeibaoxiuShow=false"
                width="1000px">
            <span slot="title" class="dialogtitle">
                设备报修
              </span>
            <shebeibaoxiu :clear="clear" :selectData="selectData" @closeShebeiHandle="repairhandle" ></shebeibaoxiu>
        </el-dialog>
    </div>
</template>

<script>
    import shebeichuli from '@/components/globaltem/Shebeichuli'
    import shebeibaoxiu from '@/components/globaltem/Shebeibaoxiu'
    export default {
        name: "MtList",
        data:function () {
            return{
                //分页
                total:0,
                pageSize:10,
                currentPage:1,
                filterShow:false,
                //filter
                typeList:[],
                adminList:[],
                componyList:[],
                brandList:[],
                //状态控制
                equipmentState:'',
                repirState:'',
                formInline:{
                    assetsCode:'',
                    assetsName:'',
                    assetsTypeId:'',
                    brandId:'',
                    model:'',
                    repairNumberSymbol:'',
                    repairNumber:'',
                    repairExpenditureSymbol:'',
                    repairExpenditure:'',
                    maintainNumberSymbol:'',
                    maintainNumber:'',
                    equipmentAdminCode:'',
                    propertyCompanyCode:''
                },
                frequencyData:[{label:'='},{label:'!='},{label:'>='},{label:'=<'},{label:'>'},{label:'<'}],
                tableData: [],
                shebeichakanShow:false,
                shebeibaoxiuShow:false,
                selectData:[],
                deviceData:{},
                clear:0

            }
        },
        mounted(){
          this.requestList()
          this.requestType()
            this.requestAdmin()
            this.requestComponeny()
        },
        methods:{
            searchClick(){
                this.requestList()
            },
            resetSearch(){
                this.formInline = {
                        assetsCode:'',
                        assetsName:'',
                        assetsTypeId:'',
                        brandId:'',
                        model:'',
                        repairNumberSymbol:'',
                        repairNumber:'',
                        repairExpenditureSymbol:'',
                        repairExpenditure:'',
                        maintainNumberSymbol:'',
                        maintainNumber:'',
                        equipmentAdminCode:'',
                        propertyCompanyCode:''
                }
                this.requestList()
            },
            showshebeiInfo(row){
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
        //    获取列表
            requestList(){
                let vm =this
                vm.$http.post('equipmentListController/equipmentList',{
                    InterfaceNum:'1',
                    pageSize:vm.pageSize,
                    currentPage:vm.currentPage,
                    equipmentState:vm.equipmentState,
                    repirState:vm.repirState,
                    assetsCode:vm.formInline.assetsCode,
                    assetsName:vm.formInline.assetsName,
                    assetsTypeId:vm.formInline.assetsTypeId,
                    brandId:vm.formInline.brandId,
                    model:vm.formInline.model,
                    repairNumberSymbol:vm.formInline.repairNumberSymbol,
                    repairNumber:vm.formInline.repairNumber,
                    repairExpenditureSymbol:vm.formInline.repairExpenditureSymbol,
                    repairExpenditure:vm.formInline.repairExpenditure,
                    maintainNumberSymbol:vm.formInline.maintainNumberSymbol,
                    maintainNumber:vm.formInline.maintainNumber,
                    equipmentAdminCode:vm.formInline.equipmentAdminCode,
                    propertyCompanyCode:vm.formInline.propertyCompanyCode
                }).then(res=>{
                    if(res.code=='200'){
                        vm.total = res.data.count
                        vm.tableData = res.data.list
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
            changeBrand(val){
               // let _i = vm.typeList.findIndex(function (item) {
               //     return item.typeCode == val
               // })
                this.requestBrand(val)
            },
        //    获取设备品牌
            requestBrand(val){
                let vm =this
                vm.$http.post(__PATH.OTHPATH+'assetsBrand/listData',{
                    pageSize:100,
                    currentPage:1,
                    classifyId:val
                }).then(res=>{
                    if(res.code==200){
                        vm.brandList = res.data
                    }
                })
            },
        //    获取设备管理员
            requestAdmin(){
              let vm =this
              vm.$http.post('userControl/getDeviceManagerList',{}).then(res=>{
                  if(res.code==200){
                      vm.adminList = res.data.userList
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
        //    设备报修
            deviceRepairClick(){
                if(this.selectData.length!=1){
                    this.$message({
                        message:'请选择一条设备',
                        type:'warning'
                    })
                    return
                }
                this.clear++
                this.shebeibaoxiuShow=true
            },
            repairhandle(dtr){
                this.shebeibaoxiuShow=false
                if(dtr){
                    this.requestList()
                }
            },
        //    状态控制
            normalStateClick(){
                this.repirState = ''
                this.equipmentState=''
                this.requestList()
            },
            commonStateClick(){
                this.repirState = '0'
                this.equipmentState='0'
                this.requestList()
            },
            pullStateClick(){
                this.equipmentState='1'
                this.requestList()
            },
            repairStateClick(){

                this.repirState = '1'
                this.requestList()

            },
            //导出
            exportHandle(){
                let vm =this
                let _id =[]
                vm.selectData.forEach(function (item) {
                    _id.push(item.equipmentId)
                })
                vm.$http.post('equipmentExportController/equipmentExport',{
                    equipmentState:vm.equipmentState,
                    repirState:vm.repirState,
                    assetsCode:vm.formInline.assetsCode,
                    assetsName:vm.formInline.assetsName,
                    assetsTypeId:vm.formInline.assetsTypeId,
                    brandId:vm.formInline.brandId,
                    model:vm.formInline.model,
                    repairNumberSymbol:vm.formInline.repairNumberSymbol,
                    repairNumber:vm.formInline.repairNumber,
                    repairExpenditureSymbol:vm.formInline.repairExpenditureSymbol,
                    repairExpenditure:vm.formInline.repairExpenditure,
                    maintainNumberSymbol:vm.formInline.maintainNumberSymbol,
                    maintainNumber:vm.formInline.maintainNumber,
                    equipmentAdminCode:vm.formInline.equipmentAdminCode,
                    propertyCompanyCode:vm.formInline.propertyCompanyCode,
                    equipmentid:_id.join(',')
                }).then(res=>{
                    if(res.code==200){
                        debugger
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
            shebeichuli,shebeibaoxiu
        }
    }
</script>

<style scoped lang="scss">
    .mtlist {

    }
</style>