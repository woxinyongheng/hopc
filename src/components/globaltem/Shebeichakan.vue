<template>
    <div class="shebei">
        <div class="dialogcontent">
            <div class="list">
                <table class="dialogtablebox">
                    <tbody>
                        <tr>
                            <td class="table-title">设备编码</td>
                            <td class="table-content"></td>
                            <td class="table-title">设备类别</td>
                            <td class="table-content"></td>
                            <td class="table-title">设备名称</td>
                            <td class="table-content"></td>
                        </tr>
                        <tr>
                            <td class="table-title">请购批号</td>
                            <td class="table-content"></td>
                            <td class="table-title">设备品牌</td>
                            <td class="table-content"></td>
                            <td class="table-title">规格型号</td>
                            <td class="table-content"></td>
                        </tr>
                        <tr>
                            <td class="table-title">SN号</td>
                            <td class="table-content"></td>
                            <td class="table-title">计量单位</td>
                            <td class="table-content"></td>
                            <td class="table-title">金额(元)</td>
                            <td class="table-content"></td>
                        </tr>
                        <tr>
                            <td class="table-title">购入时间</td>
                            <td class="table-content"></td>
                            <td class="table-title">所在区域</td>
                            <td class="table-content"></td>
                            <td class="table-title">存放位置</td>
                            <td class="table-content"></td>
                        </tr>
                        <tr>
                            <td class="table-title">管理员</td>
                            <td class="table-content"></td>
                            <td class="table-title">使用部门</td>
                            <td class="table-content"></td>
                            <td class="table-title">使用人</td>
                            <td class="table-content"></td>
                        </tr>
                        <tr>
                            <td class="table-title">使用期限(月)</td>
                            <td class="table-content"></td>
                            <td class="table-title">残值率(%)</td>
                            <td class="table-content"></td>
                            <td class="table-title">来源</td>
                            <td class="table-content"></td>
                        </tr>
                        <tr>
                            <td class="table-title">折后金额(元)</td>
                            <td class="table-content"></td>
                            <td class="table-title"></td>
                            <td class="table-content"></td>
                            <td class="table-title"></td>
                            <td class="table-content"></td>
                        </tr>
                        <tr>
                            <td class="table-title">备注</td>
                            <td class="table-content" colspan="5"></td>
                        </tr>
                        <tr>
                            <td class="table-title">照片</td>
                            <td class="table-content" colspan="5"></td>
                        </tr>
                        <tr>
                            <td class="table-title">供应商</td>
                            <td class="table-content"></td>
                            <td class="table-title">联系人</td>
                            <td class="table-content"></td>
                            <td class="table-title">联系电话</td>
                            <td class="table-content"></td>
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
                            <td class="table-content"></td>
                            <td class="table-title">累计支出(元)</td>
                            <td class="table-content"></td>
                            <td class="table-title">保养次数</td>
                            <td class="table-content"></td>
                        </tr>
                        <tr>
                            <td class="table-title">设备管理员</td>
                            <td class="table-content"></td>
                            <td class="table-title">责任归属</td>
                            <td class="table-content"></td>
                            <td class="table-title">任务归属</td>
                            <td class="table-content"></td>
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