<template>
    <div class="jihua">
        <div class="dialogcontent">
            <p class="label">计划任务详情<i class="el-icon-question"></i></p>
            <div class="list">
                <table class="dialogtablebox">
                    <tbody>
                    <tr>
                        <td class="table-title">计划编号</td>
                        <td class="table-content"></td>
                        <td class="table-title">计划名称</td>
                        <td class="table-content"></td>
                        <td class="table-title">设备类别</td>
                        <td class="table-content"></td>
                    </tr>
                    <tr>
                        <td class="table-title">保养类型</td>
                        <td class="table-content"></td>
                        <td class="table-title">保养项目</td>
                        <td class="table-content"></td>
                        <td class="table-title">设备数量</td>
                        <td class="table-content"></td>
                    </tr>
                    <tr>
                        <td class="table-title">周期类型</td>
                        <td class="table-content"></td>
                        <td class="table-title">开始时间</td>
                        <td class="table-content"></td>
                        <td class="table-title">要求完成时间</td>
                        <td class="table-content"></td>
                    </tr>
                    <tr>
                        <td class="table-title">负责单位</td>
                        <td class="table-content"></td>
                        <td class="table-title"></td>
                        <td class="table-content"></td>
                        <td class="table-title"></td>
                        <td class="table-content"></td>
                    </tr>
                    <tr>
                        <td class="table-title">维保单位</td>
                        <td class="table-content"></td>
                        <td class="table-title">联系人</td>
                        <td class="table-content"></td>
                        <td class="table-title">联系人电话</td>
                        <td class="table-content"></td>
                    </tr>
                    <tr>
                        <td class="table-title">备注</td>
                        <td class="table-content" colspan="5"></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <p class="label">保养项目作业书<i class="el-icon-question"></i></p>
            <div class="list">
                <table class="dialogtablebox">
                    <tbody>
                        <tr>
                            <td class="table-title">序号</td>
                            <td class="table-title" colspan="5">保养内容</td>
                        </tr>
                        <tr>
                            <td class="table-title">1</td>
                            <td class="table-content" colspan="5"></td>
                        </tr>
                        <tr>
                            <td class="table-title">2</td>
                            <td class="table-content" colspan="5"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="dialogfooter" style="text-align: right">
            <el-button type="primary" size="small" @click="closeHandle">关闭</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Jihuarenwu",
        data:function () {
            return{
            }
        },
        methods:{
            closeHandle(){
                this.$emit('closeHandle')
            }
        },

    }
</script>

<style scoped lang="scss">
    .jihua{
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