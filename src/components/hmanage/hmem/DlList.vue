<template>
    <!--质保到期处理-->
    <div class="dllist">
        <div class="righttitle">
            <p>质保到期处理记录</p>
        </div>
        <div class="buttonbox">
            <div class="pullleft">
                <el-button type="warning" size="mini" @click="exportHandle">导出</el-button>
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
                            <el-input v-model="formInline.recordCode" placeholder="记录单号"></el-input>
                        </el-form-item>
                        <el-form-item label="处理时间">
                            <el-date-picker
                                    v-model="formInline.starTime"
                                    type="date"
                                    format="yyyy-MM-dd"
                                    value-format="yyyy-MM-dd"
                                    @change="changeTimestart"
                                    placeholder="开始日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="至">
                            <el-date-picker
                                    v-model="formInline.endTime"
                                    format="yyyy-MM-dd"
                                    value-format="yyyy-MM-dd"
                                    @change="changeTimeEnd"
                                    type="date"
                                    placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="处理人">
                            <el-input v-model="formInline.createPersonName" placeholder="处理人"></el-input>
                        </el-form-item>
                        <el-form-item label="确认人">
                            <el-input v-model="formInline.confirmPersonName" placeholder="确认人"></el-input>
                        </el-form-item>
                        <el-form-item label="设备编号">
                            <el-input v-model="formInline.equipmentNumber" placeholder="设备编号"></el-input>
                        </el-form-item>
                        <el-form-item label="设备名称">
                            <el-input v-model="formInline.equipmentName" placeholder="设备名称"></el-input>
                        </el-form-item>
                        <el-form-item label="设备类别">
                            <el-select v-model="formInline.equipmentTypeId" placeholder="设备类别" @change="changeBrand">
                                <el-option v-for="(item,index) in typeList" :label="item.typeName" :value="item.typeId"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="设备品牌">
                            <el-select v-model="formInline.brandName" placeholder="设备品牌">
                                <el-option v-for="(item,index) in brandList" :label="item.brandName" :value="item.brandName"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="规格型号">
                            <el-input v-model="formInline.model" placeholder="规格型号"></el-input>
                        </el-form-item>

                    </el-form>
                </div></el-col>
                <el-col :span="3"><div class="grid-content searchbox">
                    <el-button type="primary" size="mini" icon="el-icon-search" @click="searchClick">搜索</el-button>
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
                        prop="recordCode"
                        label="记录单号"
                        show-overflow-tooltip
                        width="180">
                    <template slot-scope="scope">
                        <span  @click="showOrderInfo(scope.row)" class="tableactive">{{scope.row.recordCode}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="createTime"
                        label="处理时间"
                        show-overflow-tooltip
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="createPersonName"
                        show-overflow-tooltip
                        label="处理人">
                </el-table-column>
                <el-table-column
                        prop="remarks"
                        show-overflow-tooltip
                        label="处理说明">
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
                        prop="equipmentNumber"
                        show-overflow-tooltip
                        label="设备编号">
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
                :visible.sync="zhibaochulishow"
                @close="closeHandle"
                width="1000px">
            <span slot="title" class="dialogtitle">
                查看页面
              </span>
            <zhibaochuli :orderData="orderData" @closeShebeiHandle="zhibaochulishow=false"></zhibaochuli>
        </el-dialog>
        <el-dialog
                title="设备查看"
                :visible.sync="shebeichakanShow"
                @close="closeShebeiHandle"
                width="1000px">
            <span slot="title" class="dialogtitle">
                设备查看
              </span>
            <shebeichuli  :deviceData="deviceData" @closeShebeiHandle="shebeichakanShow=false" ></shebeichuli>
        </el-dialog>
    </div>
</template>

<script>
    import zhibaochuli from '@/components/globaltem/Zhibaochuli'
    import shebeichuli from '@/components/globaltem/Shebeichakan'

    export default {
        name: "DlList",
        data:function () {
            return{
                //分页
                total:0,
                pageSize:10,
                currentPage:1,
                filterShow:false,
                selectData:[],
                typeList:[],
                brandList:[],
                orderData:'',
                formInline:{
                    recordCode:'',
                    starTime:'',
                    endTime:'',
                    createPersonName:'',
                    confirmPersonName:'',
                    equipmentNumber:'',
                    equipmentName:'',
                    equipmentTypeId:'',
                    brandName:'',
                    model:''
                },
                tableData: [],
                zhibaochulishow:false,
                shebeichakanShow:false,
                deviceData:{list:[]}

            }
        },
        mounted(){
            this.requestList()
            this.requestType()
        },
        methods:{
            changeTimestart(val){
                this.formInline.starTime=val
            },
            changeTimeEnd(val){
                this.formInline.endTime=val
            },
            //列表筛选
            searchClick(){
                this.requestList()
            },
            resetSearch(){
                this.formInline = {
                    recordCode:'',
                    starTime:'',
                    endTime:'',
                    createPersonName:'',
                    confirmPersonName:'',
                    equipmentNumber:'',
                    equipmentName:'',
                    equipmentTypeId:'',
                    brandName:'',
                    model:''
                }
                this.requestList()
            },
            //    列表选择
            handleSelectionChange(val){
                this.selectData=val
            },
            showOrderInfo(row){//记录单号
                let vm =this
                vm.$http.post('equipmentRecordController/findRecord',{
                    id:row.id,
                    category:'2'
                }).then(res=>{
                    if(res.code=='200'){
                        vm.orderData=res.data[0]
                        vm.zhibaochulishow = true
                    }
                })

            },
            closeHandle(){
                this.zhibaochulishow = false

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
                vm.$http.post('equipmentRecordController/findList',{
                    pageSize:vm.pageSize,
                    currentPage:vm.currentPage,
                    category:'2',
                    recordCode:vm.formInline.recordCode,
                    starTime:vm.formInline.starTime,
                    endTime:vm.formInline.endTime,
                    createPersonName:vm.formInline.createPersonName,
                    confirmPersonName:vm.formInline.confirmPersonName,
                    equipmentNumber:vm.formInline.equipmentNumber,
                    equipmentName:vm.formInline.equipmentName,
                    equipmentTypeId:vm.formInline.equipmentTypeId,
                    brandName:vm.formInline.brandName,
                    model:vm.formInline.model,
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
            //导出
            exportHandle(){
                let vm =this
                let _id =[]
                vm.selectData.forEach(function (item) {
                    _id.push(item.equipmentId)
                })
                vm.$http.post('equipmentRecordController/importQualityTimeOutRecordList',{
                    recordCode:vm.formInline.recordCode,
                    starTime:vm.formInline.starTime,
                    endTime:vm.formInline.endTime,
                    createPersonName:vm.formInline.createPersonName,
                    confirmPersonName:vm.formInline.confirmPersonName,
                    equipmentNumber:vm.formInline.equipmentNumber,
                    equipmentName:vm.formInline.equipmentName,
                    equipmentTypeId:vm.formInline.equipmentTypeId,
                    brandName:vm.formInline.brandName,
                    model:vm.formInline.model,
                    recordIds:_id.join(',')
                }).then(res=>{
                    if(res.code==200){
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
            zhibaochuli,shebeichuli
        }
    }
</script>

<style scoped lang="scss">
    .dllist{

    }
</style>