<template>
    <div class="planlook">
        <div class="dialogcontent">
            <p class="label">保养计划详情<i class="el-icon-question"></i></p>
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
                        <td class="table-title"></td>
                        <td class="table-content"></td>
                        <td class="table-title"></td>
                        <td class="table-content"></td>
                    </tr>
                    <tr>
                        <td class="table-title">保养项目</td>
                        <td class="table-content"></td>
                        <td class="table-title">开始日期</td>
                        <td class="table-content"></td>
                        <td class="table-title">结束日期</td>
                        <td class="table-content"></td>
                    </tr>
                    <tr>
                        <td class="table-title">周期类型</td>
                        <td class="table-content"></td>
                        <td class="table-title"></td>
                        <td class="table-content"></td>
                        <td class="table-title"></td>
                        <td class="table-content"></td>
                    </tr>
                    <tr>
                        <td class="table-title">开始日期</td>
                        <td class="table-content"></td>
                        <td class="table-title">完成期限(天)</td>
                        <td class="table-content"></td>
                        <td class="table-title"></td>
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
            <p class="label">审核信息<i class="el-icon-question"></i></p>
            <div class="list">
                <table class="dialogtablebox">
                    <tbody>
                    <tr>
                        <td class="table-title">审核时间</td>
                        <td class="table-content"></td>
                        <td class="table-title">审核人</td>
                        <td class="table-content"></td>
                        <td class="table-title">审核结果</td>
                        <td class="table-content"></td>
                    </tr>
                    <tr>
                        <td class="table-title">退回原因</td>
                        <td class="table-content" colspan="5"></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <p class="label">保养设备详情<i class="el-icon-question"></i></p>
            <div class="list">
                <el-table
                        :data="tableData"
                        stripe
                        border
                        style="width: 100%">
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
                            <img class="tebleimg" src="../../../../static/images/avatar.png" alt="">
                        </template>
                    </el-table-column>

                    <el-table-column
                            prop="date"
                            label="设备编号"
                            show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                            prop="date"
                            label="品牌"
                            show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                            prop="date"
                            label="规格型号"
                            show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                            prop="date"
                            label="所处区域"
                            show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                            prop="date"
                            label="存放位置"
                            show-overflow-tooltip>
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
            </div>
        </div>
        <div class="dialogfooter" style="display: flex;justify-content: space-between">
            <el-button type="primary" size="small" @click="closeHandle('edit')">编辑</el-button>

            <el-button  size="small" @click="closeHandle">关闭</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PlanLook",
        data:function () {
            return{
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
                ],
            }
        },
        methods:{
            closeHandle(str){
                this.$emit('closeHandle',str)
            }
        },

    }
</script>

<style scoped lang="scss">
    .planlook{
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