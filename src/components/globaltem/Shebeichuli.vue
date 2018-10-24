<template>
    <div class="shebei">
        <div class="dialogcontent">
            <div class="list">
                <el-tabs v-model="activeName">
                    <el-tab-pane label="基本信息" name="first">
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
                                    <td class="table-title">使用部门</td>
                                    <td class="table-content"></td>
                                    <td class="table-title">使用人</td>
                                    <td class="table-content"></td>
                                </tr>
                                <tr>
                                    <td class="table-title">管理员</td>
                                    <td class="table-content"></td>
                                    <td class="table-title">所在区域</td>
                                    <td class="table-content"></td>
                                    <td class="table-title">存放地点</td>
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
                                    <td class="table-title">折旧后金额(元)</td>
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
                    </el-tab-pane>
                    <el-tab-pane label="处理记录" name="second">
                        <el-table
                                :data="tableData"
                                stripe
                                align="center"
                                style="width: 100%">
                            <el-table-column
                                    prop="date"
                                    label="处理时间">
                            </el-table-column>
                            <el-table-column
                                    prop="name"
                                    label="处理方式">
                            </el-table-column>
                            <el-table-column
                                    prop="address"
                                    label="处理人">
                            </el-table-column>
                        </el-table>
                        <div class="page">
                            <el-pagination
                                    :current-page="1"
                                    :page-sizes="[100, 200, 300, 400]"
                                    :page-size="100"
                                    layout="total, sizes, prev, pager, next, jumper"
                                    :total="400">
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
</template>

<script>
    export default {
        name: "Shebeichuli",
        data:function () {
            return{
                activeName:'first',
                tableData:[
                    {
                        date: '2016-05-04',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1517 弄'
                    },{
                        date: '2016-05-04',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1517 弄'
                    },{
                        date: '2016-05-04',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1517 弄'
                    },
                ]
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