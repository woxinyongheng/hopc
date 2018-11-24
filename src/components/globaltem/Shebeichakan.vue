<template>
    <div class="shebei">
        <div class="dialogcontent">
            <div class="list">
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
                            <td class="table-title">所在区域</td>
                            <td class="table-content">{{deviceData.list.areaName}}</td>
                            <td class="table-title">存放位置</td>
                            <td class="table-content">{{deviceData.list.storageLocation}}</td>
                        </tr>
                        <tr>
                            <td class="table-title">管理员</td>
                            <td class="table-content">{{deviceData.list.adminName}}</td>
                            <td class="table-title">使用部门</td>
                            <td class="table-content">{{deviceData.list.useDepartmentName}}</td>
                            <td class="table-title">使用人</td>
                            <td class="table-content">{{deviceData.list.usePersonName}}</td>
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
                            <td class="table-title">折后金额(元)</td>
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
                                <img :src="deviceData.list.picture" alt="">
                            </td>
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
                            <td class="table-content">{{deviceData.list.assetsName}}</td>
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
            </div>
        </div>
        <div class="dialogfooter" style="text-align: right">
            <el-button type="primary" size="small" @click="closeHandle">确定</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "shebeichakan",
        props:['deviceData'],
        data:function () {
            return{
            }
        },
        methods:{
            closeHandle(){
                this.$emit('closeShebeiHandle')
            }
        },

    }
</script>

<style scoped lang="scss">
    .shebei{
        height: 600px;
        .dialogcontent{
            height: 580px;
            overflow-y: scroll;
            .list{
                padding: 10px 0;
            }
        }
        .dialogfooter{

        }
    }
</style>