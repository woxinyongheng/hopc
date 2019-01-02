<template>
    <div class="selectdevice">
        <div class="filterbox">
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
                            <el-form-item label="设备品牌">
                                <el-select v-model="formInline.brandId" placeholder="设备品牌">
                                    <el-option v-for="item in brandList" :label="item" :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="规格型号">
                                <el-input v-model="formInline.model" placeholder="规格型号"></el-input>
                            </el-form-item>
                            <el-form-item label="所在区域">
                                <el-cascader
                                        :options="areaList"
                                        v-model="areaSelect"
                                        :change-on-select="true"
                                        :props="props">
                                </el-cascader>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-col>
                <el-col :span="3">
                    <div class="grid-content searchbox">
                        <el-button type="primary" size="mini" icon="el-icon-search" @click="requestList">搜索</el-button>
                        <el-button size="mini" icon="el-icon-refresh" @click="resetClick">重置</el-button>
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
                        prop="brandName"
                        label="品牌"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        prop="model"
                        label="规格型号"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        prop="areaName"
                        label="所处区域"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        prop="storageLocation"
                        label="存放位置"
                        show-overflow-tooltip>
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
        <div class="dialogfooter" style="text-align: right">
            <el-button type="primary" size="small" @click="selectDevice">选择</el-button>
            <el-button  size="small" @click="closeHandle">取消</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "selectDevice",
        props:['facilityTypeCode','areaList','typeList'],
        data:function () {
            return{
                brandList:[],
                pageSize:10,
                currentPage:1,
                total:0,
                formInline:{
                    assetsCode:'',
                    assetsName:'',
                    brandId:'',
                    model:'',


                },
                areaSelect:[],
                props: {
                    label:'gridName',
                    value:'gridName',
                    children:'children'
                },
                tableData: [],
                selectData:[]
            }
        },
        mounted(){
            this.requestList()
        },
        methods:{
            //    列表选择
            handleSelectionChange(val){
                this.selectData=val
            },
            resetClick(){
                this.formInline={
                    assetsCode:'',
                     assetsName:'',
                }
                this.areaSelect=[]
                this.requestList()
            },
            //设备列表
            requestList(){
                let vm =this
                let _i = vm.typeList.findIndex(function (item) {
                    return item.typeCode == vm.facilityTypeCode
                })
                let typeid=''
                if(_i>-1){
                    typeid = vm.typeList[_i].typeId
                }
                vm.$http.post('equipmentListController/equipmentList',{
                    interfaceNum:'1',
                    pageSize:vm.pageSize,
                    currentPage:vm.currentPage,
                    assetsTypeId:vm.typeid,
                    assetsCode:vm.formInline.assetsCode,
                    assetsName:vm.formInline.assetsName,
                    brandId:vm.formInline.brandId,
                    model:vm.formInline.model,
                    areaName:vm.areaSelect.length?vm.areaSelect[vm.areaSelect.length-1]:''
                    // areaName:vm.tableData.length?vm.tableData[vm.tableData.length-1]:'',
                }).then(res=>{
                    if(res.code==200){
                        vm.total = res.data.count
                        vm.tableData = res.data.list
                    }
                })
            },
            selectDevice(){
                let vm =this
                if(!vm.selectData.length){
                    return
                }
                this.$emit('closeHandle',vm.selectData)
            },
            closeHandle(){
                this.$emit('closeHandle')
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
        watch:{
            facilityTypeCode:function () {
                this.requestList()
            }
        }

    }
</script>

<style scoped lang="scss">
.selectdevice{
    .contentbox{
        min-width: 1000px !important;
    }
}
</style>