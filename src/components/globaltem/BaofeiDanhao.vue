<template>
    <div class="shebei">
        <div class="dialogcontent">
            <div class="list">
                <table class="dialogtablebox">
                    <tbody>
                    <tr>
                        <td class="table-title">记录单号</td>
                        <td class="table-content"></td>
                        <td class="table-title">处理时间</td>
                        <td class="table-content"></td>
                        <td class="table-title">处理人</td>
                        <td class="table-content"></td>
                    </tr>
                    <tr>
                        <td class="table-title">确认人</td>
                        <td class="table-content"></td>
                        <td class="table-title"></td>
                        <td class="table-content"></td>
                        <td class="table-title"></td>
                        <td class="table-content"></td>
                    </tr>
                    <tr>
                        <td class="table-title">处理说明</td>
                        <td class="table-content" colspan="5"></td>
                    </tr>
                    <tr>
                        <td class="table-title">相关附件</td>
                        <td class="table-content" colspan="5"></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <p class="label">报废详情</p>
            <div class="list">
                <table class="dialogtablebox">
                    <tbody>
                    <tr>
                        <td class="table-title">报废确定人</td>
                        <td class="table-content"></td>
                        <td class="table-title">报废原因</td>
                        <td class="table-content" colspan="3"></td>
                    </tr>
                    <tr>
                        <td class="table-title">相关附件</td>
                        <td class="table-content" colspan="5"></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <p class="label">报废处理详情</p>
            <div class="list">
                <table class="dialogtablebox">
                    <tbody>
                    <tr>
                        <td class="table-title">报废处理人</td>
                        <td class="table-content"></td>
                        <td class="table-title">处理方式</td>
                        <td class="table-content" colspan="3"></td>
                    </tr>
                    <tr>
                        <td class="table-title">相关附件</td>
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
        name: "BaofeiDanhao",
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