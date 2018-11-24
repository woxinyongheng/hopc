<template>
    <div class="jihua">
        <div class="dialogcontent">
            <p class="label" @click="show1=!show1">计划任务详情<i class="el-icon-arrow-down"></i></p>
            <div v-if="show1" class="list">
                <table class="dialogtablebox">
                    <tbody>
                    <tr>
                        <td class="table-title">计划编号</td>
                        <td class="table-content">{{planData.taskDetail.planTaskCode}}</td>
                        <td class="table-title">计划名称</td>
                        <td class="table-content">{{planData.taskDetail.planName}}</td>
                        <td class="table-title">设备类别</td>
                        <td class="table-content">{{planData.taskDetail.facilityTypeName}}</td>
                    </tr>
                    <tr>
                        <td class="table-title">保养类型</td>
                        <td class="table-content">{{planData.taskDetail.maintainType==0?'质保':'维保'}}</td>
                        <td class="table-title">保养项目</td>
                        <td class="table-content">{{planData.taskDetail.maintainName}}</td>
                        <td class="table-title">设备数量</td>
                        <td class="table-content">{{planData.taskDetail.facilityNum}}</td>
                    </tr>
                    <tr>
                        <td class="table-title">周期类型</td>
                        <td class="table-content">
                            <span v-if="planData.taskDetail.cycleType==0">周</span>
                            <span v-if="planData.taskDetail.cycleType==1">半月</span>
                            <span v-if="planData.taskDetail.cycleType==2">月</span>
                            <span v-if="planData.taskDetail.cycleType==3">季度</span>
                            <span v-if="planData.taskDetail.cycleType==4">半年</span>
                            <span v-if="planData.taskDetail.cycleType==5">年</span>

                        </td>
                        <td class="table-title">开始时间</td>
                        <td class="table-content">{{planData.taskDetail.startTime}}</td>
                        <td class="table-title">要求完成时间</td>
                        <td class="table-content">{{planData.taskDetail.endTime}}</td>
                    </tr>
                    <tr>
                        <td class="table-title">负责单位</td>
                        <td class="table-content">{{planData.taskDetail.responsibleCompany==0?'本部':'外包'}}</td>
                        <td class="table-title"></td>
                        <td class="table-content"></td>
                        <td class="table-title"></td>
                        <td class="table-content"></td>
                    </tr>
                    <tr>
                        <td class="table-title">维保单位</td>
                        <td class="table-content">{{planData.taskDetail.company}}</td>
                        <td class="table-title">联系人</td>
                        <td class="table-content">{{planData.taskDetail.linkman}}</td>
                        <td class="table-title">联系人电话</td>
                        <td class="table-content">{{planData.taskDetail.linkphone}}</td>
                    </tr>
                    <tr>
                        <td class="table-title">备注</td>
                        <td class="table-content" colspan="5">{{planData.taskDetail.remarks}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <p @click="sho2=!show2" class="label">保养项目作业书<i class="el-icon-arrow-down"></i></p>
            <div v-if="show2" class="list">
                <table class="dialogtablebox">
                    <tbody>
                        <tr>
                            <td class="table-title">序号</td>
                            <td class="table-title" colspan="5">保养内容</td>
                        </tr>
                        <tr v-for="(item,index) in planData.maintainDetail">
                            <td class="table-title">{{index+1}}</td>
                            <td class="table-content" colspan="5">{{item.content}}</td>
                        </tr>
                        <!--<tr>-->
                            <!--<td class="table-title">2</td>-->
                            <!--<td class="table-content" colspan="5"></td>-->
                        <!--</tr>-->
                    </tbody>
                </table>
            </div>
            <p class="label" @click="show3=!show3">保养任务<i class="el-icon-arrow-down"></i></p>
            <div v-if="show3" class="list">
                <el-table
                        :data="planData.maintainTaskList"
                        stripe
                        align="center"
                        style="width: 100%">
                    <el-table-column
                            type="index"
                            label="序号">
                    </el-table-column>
                    <el-table-column
                            prop="maintainTaskCode"
                            label="任务编号">
                    </el-table-column>
                    <el-table-column
                            prop="brandName"
                            label="设备品牌">
                    </el-table-column>
                    <el-table-column
                            prop="areaName"
                            label="所处区域">
                    </el-table-column>
                    <el-table-column
                            prop="maintenanceCompany"
                            label="责任归属">
                    </el-table-column>
                    <el-table-column
                            prop="category"
                            label="状态">
                        <template slot-scope="scope">
                            <span v-if="scope.row.state==0">未派工</span>
                            <span v-if="scope.row.state==1">已挂单</span>
                            <span v-if="scope.row.state==2">已派工</span>
                            <span v-if="scope.row.state==3">已完成</span>
                        </template>
                    </el-table-column>
                </el-table>
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
        props:['planData'],
        data:function () {
            return{
                show1:true,
                show2:true,
                show3:true
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