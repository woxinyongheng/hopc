<template>
    <div class="shebei">
        <div class="box" v-if="!yanqichakanShow && !baoyangShow && !zhibaochulishow && !weixiudanhaoshow">
            <div class="dialogcontent">
                <div class="list">
                    <el-tabs v-model="activeName" @tab-click="tabCliclk">
                        <el-tab-pane label="基本信息" name="first">
                            <table class="dialogtablebox">
                                <tbody>
                                <tr>
                                    <td class="table-title">设备编码</td>
                                    <td class="table-content">{{deviceData.list.assetsCode}}</td>
                                    <td class="table-title">设备类别</td>
                                    <td class="table-content">{{deviceData.list.classifyName}}</td>
                                    <td class="table-title">设备名称</td>
                                    <td class="table-content">{{deviceData.list.assetsName}}</td>
                                </tr>
                                <tr>
                                    <td class="table-title">请购批号</td>
                                    <td class="table-content">{{deviceData.list.batchNumber}}</td>
                                    <td class="table-title">设备品牌</td>
                                    <td class="table-content">{{deviceData.list.brandName}}</td>
                                    <td class="table-title">规格型号</td>
                                    <td class="table-content">{{deviceData.list.model}}</td>
                                </tr>
                                <tr>
                                    <td class="table-title">SN号</td>
                                    <td class="table-content">{{deviceData.list.snNumber}}</td>
                                    <td class="table-title">计量单位</td>
                                    <td class="table-content">{{deviceData.list.unit}}</td>
                                    <td class="table-title">金额(元)</td>
                                    <td class="table-content">{{deviceData.list.money}}</td>
                                </tr>



                                <tr>
                                    <td class="table-title">购入时间</td>
                                    <td class="table-content">{{deviceData.list.buyDate}}</td>
                                    <td class="table-title">使用部门</td>
                                    <td class="table-content">{{deviceData.list.useDepartmentName}}</td>
                                    <td class="table-title">使用人</td>
                                    <td class="table-content">{{deviceData.list.usePersonName}}</td>
                                </tr>
                                <tr>
                                    <td class="table-title">管理员</td>
                                    <td class="table-content">{{deviceData.list.adminName}}</td>
                                    <td class="table-title">所在区域</td>
                                    <td class="table-content">{{deviceData.list.areaName}}</td>
                                    <td class="table-title">存放地点</td>
                                    <td class="table-content">{{deviceData.list.storageLocation}}</td>
                                </tr>
                                <tr>
                                    <td class="table-title">使用期限(月)</td>
                                    <td class="table-content">{{deviceData.list.serviceLife}}</td>
                                    <td class="table-title">残值率(%)</td>
                                    <td class="table-content">{{deviceData.list.residualRatio}}</td>
                                    <td class="table-title">来源</td>
                                    <td class="table-content">{{deviceData.list.source}}</td>
                                </tr>
                                <tr>
                                    <td class="table-title">折旧后金额(元)</td>
                                    <td class="table-content">{{deviceData.list.residualValue}}</td>
                                    <td class="table-title"></td>
                                    <td class="table-content"></td>
                                    <td class="table-title"></td>
                                    <td class="table-content"></td>
                                </tr>
                                <tr>
                                    <td class="table-title">备注</td>
                                    <td class="table-content" colspan="5">{{deviceData.list.remarks}}</td>
                                </tr>
                                <tr>
                                    <td class="table-title">照片</td>
                                    <td class="table-content" colspan="5">
                                        <img style="width: 80px;height: 80px;padding: 20px;" :src="deviceData.list.picture" alt=""></td>
                                </tr>
                                <tr>
                                    <td class="table-title">供应商</td>
                                    <td class="table-content">{{deviceData.list.supplier}}</td>
                                    <td class="table-title">联系人</td>
                                    <td class="table-content">{{deviceData.list.contacts}}</td>
                                    <td class="table-title">联系电话</td>
                                    <td class="table-content">{{deviceData.list.phone}}</td>
                                </tr>
                                <tr>
                                    <td class="table-title">维保到期</td>
                                    <td class="table-content">{{deviceData.list.phone}}</td>
                                    <td class="table-title"></td>
                                    <td class="table-content"></td>
                                    <td class="table-title"></td>
                                    <td class="table-content"></td>
                                </tr>
                                <tr>
                                    <td class="table-title">维修次数</td>
                                    <td class="table-content">{{deviceData.list.repairNumber}}</td>
                                    <td class="table-title">累计支出(元)</td>
                                    <td class="table-content">{{deviceData.list.repairExpenditure}}</td>
                                    <td class="table-title">保养次数</td>
                                    <td class="table-content">{{deviceData.list.maintainNumber}}</td>
                                </tr>
                                <tr>
                                    <td class="table-title">设备管理员</td>
                                    <td class="table-content">{{deviceData.list.equipmentAdminName}}</td>
                                    <td class="table-title">责任归属</td>
                                    <td class="table-content">{{deviceData.list.propertyCompanyName}}</td>
                                    <td class="table-title">任务归属</td>
                                    <td class="table-content">{{deviceData.list.taskName}}</td>
                                </tr>
                                </tbody>
                            </table>
                        </el-tab-pane>
                        <el-tab-pane label="处理记录" name="second">
                            <el-table
                                    :data="tableData"
                                    stripe
                                    align="center"
                                    style="width: 100%">
                                <el-table-column
                                        prop="createTime"
                                        label="处理时间">
                                </el-table-column>
                                <el-table-column
                                        prop="category"
                                        label="处理方式">
                                    <template slot-scope="scope">
                                        <span  class="tableactive"  v-if="scope.row.category==0" @click="yanqiInfo(scope.row)">延期</span>
                                        <span v-if="scope.row.category==1">报废</span>
                                        <span  class="tableactive"  v-if="scope.row.category==2" @click="zhibaoInfo(scope.row)">质保到期</span>
                                        <span v-if="scope.row.category==3">还原</span>
                                        <span  class="tableactive"  v-if="scope.row.category==4" @click="baoyangInfo(scope.row)">保养</span>
                                        <span  class="tableactive"  v-if="scope.row.category==5" @click="weixiuInfo(scope.row)">维修</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="createPersonName"
                                        label="处理人">
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
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
            <div class="dialogfooter" style="text-align: right">
                <el-button type="primary" size="small" @click="closeHandle">关闭</el-button>
            </div>
        </div>
        <yanqichakan v-if="yanqichakanShow" :orderData="orderData" @closeShebeiHandle="yanqichakanShow=false"></yanqichakan>
        <baoyangdanhao v-if="baoyangShow" :orderData="orderData" @closeOrderHandle="baoyangShow=false"></baoyangdanhao>
        <zhibaochuli v-if="zhibaochulishow" :orderData="orderData" @closeShebeiHandle="zhibaochulishow=false"></zhibaochuli>
        <weixiudanhao v-if="weixiudanhaoshow" :type="'guadan'" :data="orderData" @closeOrderHandle="weixiudanhaoshow=false"></weixiudanhao>


    </div>
</template>

<script>
    import yanqichakan from '@/components/globaltem/YanqiChakan'
    import baoyangdanhao from '@/components/globaltem/Baoyangdanhao'
    import zhibaochuli from '@/components/globaltem/Zhibaochuli'
    import weixiudanhao from '@/components/globaltem/Jiludanhaogongdan'



    export default {
        name: "Shebeichuli",
        props:['deviceData'],
        data:function () {
            return{
                activeName:'first',
                tableData:[],
                //分页
                total:0,
                pageSize:10,
                currentPage:1,

                yanqichakanShow:false,
                baoyangShow:false,
                zhibaochulishow:false,
                weixiudanhaoshow:false,
                orderData:''
            }
        },
        methods:{
            closeHandle(){
                this.$emit('closeShebeiHandle')
            },
            tabCliclk(val){
                let vm =this
                if(val.name=='second' && !vm.tableData.length){
                    vm.requestList()
                }
            },
            requestList(){
                let vm =this
                vm.$http.post('equipmentListController/getEquipmentRecord',{
                    id:vm.deviceData.list.id,
                    pageSize:vm.pageSize,
                    currentPage:vm.currentPage
                }).then(res=>{
                    if(res.code==200){
                        vm.total = res.data.count
                        vm.tableData = res.data.record
                    }
                })
            },
            //二级页面
            yanqiInfo(row){//记录单号
                let vm =this
                vm.$http.post('equipmentRecordController/findRecord',{
                    id:row.id,
                    category:'0'
                }).then(res=>{
                    if(res.code=='200'){
                        vm.orderData=res.data[0]
                        vm.yanqichakanShow = true
                    }
                })

            },
            baoyangInfo(row){
                let vm =this
                vm.$http.post('maintainController/MaintainView',{
                    id:row.id
                }).then(res=>{
                    if(res.code==200){
                        vm.orderData = res.data
                        vm.baoyangShow = true
                    }
                })
            },
            zhibaoInfo(row){
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
            weixiuInfo(row){
                let vm =this
                vm.$http.post('equipmentListController/getRepairDetailById',{
                    id:row.id
                }).then(res=>{
                    if(res.code==200){
                        vm.orderData = res.data.repair
                        vm.weixiudanhaoshow = true
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
            yanqichakan,baoyangdanhao,zhibaochuli,weixiudanhao
        }
    }
</script>

<style scoped lang="scss">
    .shebei{
        height: 600px;
        .dialogcontent{
            height: 580px;
            overflow-y: scroll;
            .label{
                background-color: #E9EEF3;
                height: 30px;
                line-height: 30px;
                padding-left: 10px;
                position: relative;
                i{
                    position: absolute;
                    right: 10px;
                    display: inline-block;
                    top: 10px;
                }
            }
            .list{
                padding: 10px 0;
            }
        }
        .dialogfooter{

        }
    }

</style>