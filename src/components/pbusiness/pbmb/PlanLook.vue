<template>
    <div class="planlook">
        <div class="dialogcontent">
            <p class="label" @click="show1=!show1">保养计划详情<i class="el-icon-arrow-down"></i></p>
            <div v-if="show1" class="list">
                <table class="dialogtablebox">
                    <tbody>
                    <tr>
                        <td class="table-title">计划编号</td>
                        <td class="table-content">{{planData.maintainPlanDetail.planCode}}</td>
                        <td class="table-title">计划名称</td>
                        <td class="table-content">{{planData.maintainPlanDetail.planName}}</td>
                        <td class="table-title">设备类别</td>
                        <td class="table-content">{{planData.maintainPlanDetail.facilityTypeName}}</td>
                    </tr>
                    <tr>
                        <td class="table-title">保养类型</td>
                        <td class="table-content">{{planData.maintainPlanDetail.maintainType==0?'质保':'维保'}}</td>
                        <td class="table-title"></td>
                        <td class="table-content"></td>
                        <td class="table-title"></td>
                        <td class="table-content"></td>
                    </tr>
                    <tr>
                        <td class="table-title">保养项目</td>
                        <td class="table-content">{{planData.maintainPlanDetail.maintainName}}</td>
                        <td class="table-title">开始日期</td>
                        <td class="table-content">{{planData.maintainPlanDetail.startTime}}</td>
                        <td class="table-title">结束日期</td>
                        <td class="table-content">{{planData.maintainPlanDetail.endTime}}</td>
                    </tr>
                    <tr>
                        <td class="table-title">周期类型</td>
                        <td class="table-content">
                            <span v-if="planData.maintainPlanDetail.cycleType==0">周</span>
                            <span v-if="planData.maintainPlanDetail.cycleType==1">半月</span>
                            <span v-if="planData.maintainPlanDetail.cycleType==2">月</span>
                            <span v-if="planData.maintainPlanDetail.cycleType==3">季度</span>
                            <span v-if="planData.maintainPlanDetail.cycleType==4">半年</span>
                            <span v-if="planData.maintainPlanDetail.cycleType==5">年</span>
                        </td>
                        <td class="table-title"></td>
                        <td class="table-content"></td>
                        <td class="table-title"></td>
                        <td class="table-content"></td>
                    </tr>
                    <tr>
                        <td class="table-title">{{titlenStart(planData.maintainPlanDetail.cycleType)}}</td>
                        <td class="table-content">{{contentStart(planData.maintainPlanDetail.cycleType,planData.maintainPlanDetail.cycleRole.aTime)}}</td>
                        <td class="table-title" v-if="planData.maintainPlanDetail.cycleRole.bTime">{{titleEnd(planData.maintainPlanDetail.cycleType)}}</td>
                        <td class="table-content" v-if="planData.maintainPlanDetail.cycleRole.bTime">{{contentEnd(planData.maintainPlanDetail.cycleType,planData.maintainPlanDetail.cycleRole.bTime)}}</td>
                        <td class="table-title">完成期限(天)</td>
                        <td class="table-content">{{planData.maintainPlanDetail.finalTime}}</td>
                        <td class="table-title" v-if="!planData.maintainPlanDetail.cycleRole.bTime"></td>
                        <td class="table-content" v-if="!planData.maintainPlanDetail.cycleRole.bTime"></td>
                    </tr>
                    <tr>
                        <td class="table-title">负责单位</td>
                        <td class="table-content">{{planData.maintainPlanDetail.responsibleCompany==0?'本部':'外包'}}</td>
                        <td class="table-title"></td>
                        <td class="table-content"></td>
                        <td class="table-title"></td>
                        <td class="table-content"></td>
                    </tr>
                    <tr>
                        <td class="table-title">维保单位</td>
                        <td class="table-content">{{planData.maintainPlanDetail.company}}</td>
                        <td class="table-title">联系人</td>
                        <td class="table-content">{{planData.maintainPlanDetail.linkman}}</td>
                        <td class="table-title">联系人电话</td>
                        <td class="table-content">{{planData.maintainPlanDetail.phone}}</td>
                    </tr>
                    <tr>
                        <td class="table-title">备注</td>
                        <td class="table-content" colspan="5">{{planData.maintainPlanDetail.reamrks}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <p class="label" @click="show2=!show2">保养项目作业书<i class="el-icon-arrow-down"></i></p>
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
                    </tbody>
                </table>
            </div>
            <p class="label" @click="show3=!show3">审核信息<i class="el-icon-arrow-down"></i></p>
            <div v-if="show3" class="list">
                <table class="dialogtablebox" v-for="tt in planData.planAuditList">
                    <tbody>
                    <tr>
                        <td class="table-title">审核时间</td>
                        <td class="table-content">{{tt.auditTime}}</td>
                        <td class="table-title">审核人</td>
                        <td class="table-content">{{tt.auditPersonName}}</td>
                        <td class="table-title">审核结果</td>
                        <td class="table-content">{{tt.auditResult==1?'退回':'通过'}}</td>
                    </tr>
                    <tr>
                        <td class="table-title">退回原因</td>
                        <td class="table-content" colspan="5">{{tt.callbackReason}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <p class="label" @click="show4=!show4">保养设备详情<i class="el-icon-arrow-down"></i></p>
            <div v-if="show4" class="list">
                <el-table
                        :data="planData.assetsList.list"
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
                            <img class="tebleimg" :src="scope.row.picture" alt="">
                        </template>
                    </el-table-column>

                    <el-table-column
                            prop="assetsCode"
                            label="设备编号"
                            show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                            prop="brandName"
                            label="品牌"
                            show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                            prop="model"
                            label="规格型号"
                            show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                            prop="areaName"
                            label="所处区域"
                            show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                            prop="storageLocation"
                            label="存放位置"
                            show-overflow-tooltip>
                    </el-table-column>
                </el-table>
                <div class="page">
                    <el-pagination
                            :current-page="1"
                            :page-sizes="[10, 20, 30, 50]"
                            :page-size="100"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="planData.assetsList.count">
                    </el-pagination>
                </div>
            </div>
        </div>
        <div class="dialogfooter" style="display: flex;justify-content: space-between">
            <el-button v-if="lookData.planAuditState!=1 && lookData.planAuditState!=2" type="primary" size="small" @click="closeHandle('edit')">编辑</el-button>
            <span v-if="!(lookData.planAuditState!=1 && lookData.planAuditState!=2)"></span>
            <el-button  size="small" @click="closeHandle">关闭</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PlanLook",
        props:['planData','lookData'],
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
                show1:true,
                show2:true,
                show3:true,
                show4:true
            }
        },
        methods:{
            closeHandle(str){
                this.$emit('closeHandle',str)
            },
            titlenStart(num){
                switch (num * 1) {
                    case 0:
                        return '开始日期'
                        break
                    case 1:
                        return '上半月日期'
                        break
                    case 2:
                        return '开始日期'
                        break
                    case 3:
                        return '开始月份'
                        break
                    case 4:
                        return '开始月份'
                        break
                    case 5:
                        return '开始日期'
                        break
                    default:
                        break
                }
            },
            titleEnd(num){
                switch (num * 1) {
                    case 0:
                        return ''
                        break
                    case 1:
                        return '下半月日期'
                        break
                    case 2:
                        return ''
                        break
                    case 3:
                        return '开始日期'
                        break
                    case 4:
                        return '开始日期'
                        break
                    case 5:
                        return ''
                        break
                    default:
                        break
                }
            },
            contentStart(num,atime){
                let vm =this
                switch (num * 1) {
                    case 0:
                        return '每周'+vm.timeFilter(atime)
                        break
                    case 1:
                        return '每月'+atime+'日'
                        break
                    case 2:
                        return '每月'+atime+'号'
                        break
                    case 3:
                        return '第'+atime+'月'
                        break
                    case 4:
                        return '第'+atime+'月'
                        break
                    case 5:
                        return atime
                        break
                    default:
                        return atime
                        break
                }
            },
            contentEnd(num,btime){
                switch (num * 1) {
                    case 0:
                        return ''
                        break
                    case 1:
                        return '每月'+btime+'日'
                        break
                    case 2:
                        return ''
                        break
                    case 3:
                        return '每月'+btime+'日'
                        break
                    case 4:
                        return '每月'+btime+'日'
                        break
                    case 5:
                        return ''
                        break
                    default:
                        return ''
                        break
                }
            },
            timeFilter(num){
                switch (num * 1) {
                    case 1:
                        return '一'
                        break
                    case 2:
                        return '二'
                        break
                    case 3:
                        return '三'
                        break
                    case 4:
                        return '四'
                        break
                    case 5:
                        return '五'
                        break
                    case 6:
                        return '六'
                        break
                    case 7:
                        return '七'
                        break
                    default:
                        return ''
                        break
                }
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