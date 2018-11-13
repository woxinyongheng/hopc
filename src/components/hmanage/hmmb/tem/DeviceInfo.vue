<template>
    <div class="shebei">
        <div class="dialogcontent">
            <div class="list">
                <table class="dialogtablebox">
                    <tbody>
                    <tr>
                        <td class="table-title">设备编码</td>
                        <td class="table-content">{{deviceData.assetsCode}}</td>
                        <td class="table-title">设备类别</td>
                        <td class="table-content">{{deviceData.classifyName}}</td>
                        <td class="table-title">设备名称</td>
                        <td class="table-content">{{deviceData.assetsName}}</td>
                    </tr>
                    <tr>
                        <td class="table-title">请购批号</td>
                        <td class="table-content">{{deviceData.batchNumber}}</td>
                        <td class="table-title">设备品牌</td>
                        <td class="table-content">{{deviceData.brandName}}</td>
                        <td class="table-title">规格型号</td>
                        <td class="table-content">{{deviceData.model}}</td>
                    </tr>
                    <tr>
                        <td class="table-title">SN号</td>
                        <td class="table-content">{{deviceData.snNumber}}</td>
                        <td class="table-title">计量单位</td>
                        <td class="table-content">{{deviceData.unit}}</td>
                        <td class="table-title">金额(元)</td>
                        <td class="table-content">{{deviceData.money}}</td>
                    </tr>
                    <tr>
                        <td class="table-title">购入时间</td>
                        <td class="table-content">{{deviceData.buyDate}}</td>
                        <td class="table-title">所在区域</td>
                        <td class="table-content">{{deviceData.areaName}}</td>
                        <td class="table-title">存放位置</td>
                        <td class="table-content">{{deviceData.storageLocation}}</td>
                    </tr>
                    <tr>
                        <td class="table-title">管理员</td>
                        <td class="table-content">{{deviceData.adminName}}</td>
                        <td class="table-title">使用部门</td>
                        <td class="table-content">{{deviceData.useDepartmentName}}</td>
                        <td class="table-title">使用人</td>
                        <td class="table-content">{{deviceData.usePersonName}}</td>
                    </tr>
                    <tr>
                        <td class="table-title">使用期限(月)</td>
                        <td class="table-content">{{deviceData.serviceLife}}</td>
                        <td class="table-title">残值率(%)</td>
                        <td class="table-content">{{deviceData.residualRatio}}</td>
                        <td class="table-title">来源</td>
                        <td class="table-content">{{deviceData.source}}</td>
                    </tr>
                    <tr>
                        <td class="table-title">折后金额(元)</td>
                        <td class="table-content">{{deviceData.residualValue}}</td>
                        <td class="table-title"></td>
                        <td class="table-content"></td>
                        <td class="table-title"></td>
                        <td class="table-content"></td>
                    </tr>
                    <tr>
                        <td class="table-title">备注</td>
                        <td class="table-content" colspan="5">{{deviceData.remarks}}</td>
                    </tr>
                    <tr>
                        <td class="table-title">照片</td>
                        <td class="table-content" colspan="5">
                            <img style="width: 80px;height: 80px;padding: 20px;" :src="deviceData.picture" alt="">
                        </td>
                    </tr>
                    <tr>
                        <td class="table-title">供应商</td>
                        <td class="table-content">{{deviceData.supplier}}</td>
                        <td class="table-title">联系人</td>
                        <td class="table-content">{{deviceData.contacts}}</td>
                        <td class="table-title">联系电话</td>
                        <td class="table-content">{{deviceData.phone}}</td>
                    </tr>
                    <tr>
                        <td class="table-title">维保到期</td>
                        <td class="table-content"></td>
                        <td class="table-title"></td>
                        <td class="table-content"></td>
                        <td class="table-title"></td>
                        <td class="table-content"></td>
                    </tr>
                    <tr>
                        <td class="table-title">维修次数</td>
                        <td class="table-content">{{deviceData.repairNumber}}</td>
                        <td class="table-title">累计支出(元)</td>
                        <td class="table-content">{{deviceData.repairExpenditure}}</td>
                        <td class="table-title">保养次数</td>
                        <td class="table-content">{{deviceData.maintainNumber}}</td>
                    </tr>
                    <tr>
                        <td class="table-title">设备管理员</td>
                        <td class="table-content">{{deviceData.equipmentAdminName}}</td>
                        <td class="table-title">责任归属</td>
                        <td class="table-content">{{deviceData.propertyCompanyName}}</td>
                        <td class="table-title">任务归属</td>
                        <td class="table-content">{{deviceData.taskName}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="dialogfooter" style="text-align: right">
            <el-button  size="small" @click="closeHandle">关闭</el-button>
            <el-button v-if="type==2" type="primary" size="small" @click="extendType=true">延期使用</el-button>
            <el-button v-if="type==2" type="primary" size="small" @click="scrapType=true">报废处理</el-button>
            <el-button v-if="type==3" type="primary" size="small" @click="warrType=true">质保到期处理</el-button>
        </div>
        <!--延期弹框-->
        <el-dialog
                title="延期使用"
                :visible.sync="extendType"
                @close="extendType=false"
                width="1000px"
                append-to-body>
            <span slot="title" class="dialogtitle">延期使用</span>
            <extendTem :operateRow="operateRow" :adminList="adminList" @closeHandle="extendType=false"></extendTem>

        </el-dialog>
        <!--报废弹框-->
        <el-dialog
                title="报废处理"
                :visible.sync="scrapType"
                @close="scrapType=false"
                width="1000px"
                append-to-body>
            <span slot="title" class="dialogtitle">报废处理</span>
            <scrapTem :operateRow="operateRow" :adminList="adminList" @closeHandle="scrapType=false"></scrapTem>
        </el-dialog>
        <!--质保到期弹框-->
        <el-dialog
                title="质保到期处理"
                :visible.sync="warrType"
                @close="warrType=false"
                width="1000px"
                append-to-body>
            <span slot="title" class="dialogtitle">质保到期处理</span>
            <warrTem :operateRow="operateRow" @closeHandle="warrType=false"></warrTem>
        </el-dialog>
    </div>
</template>

<script>
    import extendTem from './extendTem'
    import scrapTem from './scrapTem'
    import warrTem from './warrTem'

    export default {
        name: "shebeichakan",
        props:['type','deviceData','adminList','operateRow'],
        data:function () {
            return{
                extendType:false,
                scrapType:false,
                warrType:false,
                formInline: {
                    user: '',
                    region: ''
                }
            }
        },
        methods:{
            closeHandle(){
                this.$emit('closeHandle')
            },
        },
        components:{
            extendTem,scrapTem,warrTem
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