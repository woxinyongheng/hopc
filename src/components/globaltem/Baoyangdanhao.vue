
<template>
    <div class="jilu">
        <div class="dialogcontent">
            <p class="label">编号  wx201808290001</p>
            <div class="list">
                <el-steps :active="1" align-center>
                    <el-step title="任务生成时间" description="2018-08-29 0：30"></el-step>
                    <el-step title="派工时间" description="2018-08-29 0：30"></el-step>
                    <el-step title="完工时间" description="2018-08-29 0：30"></el-step>
                    <el-step title="要求完成时间" description="2018-08-29 0：30"></el-step>

                </el-steps>
            </div>
            <p class="label">任务信息<i class="el-icon-question"></i></p>
            <div class="list">
                <table class="dialogtablebox">
                    <tbody>
                    <tr>
                        <td class="table-title">计划名称</td>
                        <td class="table-content"></td>
                        <td class="table-title">设备类别</td>
                        <td class="table-content"></td>
                        <td class="table-title">保养类型</td>
                        <td class="table-content"></td>
                    </tr>
                    <tr>
                        <td class="table-title">保养项目</td>
                        <td class="table-content"></td>
                        <td class="table-title">周期类型</td>
                        <td class="table-content"></td>
                        <td class="table-title">负责单位</td>
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
            <p class="label">派工信息<i class="el-icon-question"></i></p>
            <div class="list">
                <table class="dialogtablebox">
                    <tbody>
                    <tr>
                        <td class="table-title">派工时间</td>
                        <td class="table-content"></td>
                        <td class="table-title">派工人</td>
                        <td class="table-content"></td>
                        <td class="table-title">执行人</td>
                        <td class="table-content"></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <p class="label">挂单信息<i class="el-icon-question"></i></p>
            <div class="list">
                <table class="dialogtablebox">
                    <tbody>
                    <tr>
                        <td class="table-title">挂单时间</td>
                        <td class="table-content"></td>
                        <td class="table-title">挂单原因</td>
                        <td class="table-content"></td>
                        <td class="table-title"></td>
                        <td class="table-content"></td>
                    </tr>
                    <tr>
                        <td class="table-title">其他说明</td>
                        <td class="table-content" colspan="5"></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <p class="label">完工信息<i class="el-icon-question"></i></p>
            <div class="list">
                <table class="dialogtablebox">
                    <tbody>
                    <tr>
                        <td class="table-title">完工时间</td>
                        <td class="table-content"></td>
                        <td class="table-title">保养人</td>
                        <td class="table-content"></td>
                        <td class="table-title">联系电话</td>
                        <td class="table-content"></td>
                    </tr>
                    <tr>
                        <td class="table-title">保养说明</td>
                        <td class="table-content" colspan="5"></td>
                    </tr>
                    <tr>
                        <td class="table-title">语音相关附件</td>
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
                            <td class="table-title">保养内容</td>
                            <td class="table-title">完成情况</td>
                            <td class="table-title" colspan="3">备注</td>
                        </tr>
                        <tr>
                            <td class="table-title">1</td>
                            <td class="table-content"></td>
                            <td class="table-content"></td>
                            <td class="table-content" colspan="3"></td>
                        </tr>
                        <tr>
                            <td class="table-title">1</td>
                            <td class="table-content"></td>
                            <td class="table-content"></td>
                            <td class="table-content" colspan="3"></td>
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
        name: "Baoyangdanhao",
        props:['orderData'],
        data:function () {
            return{
            }
        },
        methods:{
            closeHandle(){
                this.$emit('closeOrderHandle')
            }
        },

    }
</script>

<style scoped lang="scss">
    .jilu{
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