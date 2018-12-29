
<template>
    <div class="jilu">
        <div class="dialogcontent">
            <p class="label" @click="show1=!show1">保养计划详情<i class="el-icon-arrow-down" @click="backClose"></i></p>
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
                        <td class="table-content">{{planData.maintainPlanDetail.responsibleCompany==0?'本部':(planData.maintainPlanDetail.responsibleCompany==1?'外包':'')}}</td>
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
                    </tbody>
                </table>
            </div>
            <p @click="show2=!show2" class="label">保养项目作业书<i class="el-icon-arrow-down"></i></p>
            <div v-if="show2" class="list">
                <table class="dialogtablebox">
                    <tbody>
                        <tr>
                            <td class="table-title">序号</td>
                            <td class="table-title" colspan="5">保养内容</td>
                        </tr>
                        <tr v-for="(itemms,index) in planData.maintainDetail">
                            <td class="table-title">{{index+1}}</td>
                            <td class="table-content" colspan="5">{{itemms.content}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p class="label" @click="show3=!show3">保养设备详情<i class="el-icon-arrow-down"></i></p>
            <div v-if="show3" class="list">
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
                            prop="date"
                            label="照片"
                            show-overflow-tooltip
                            width="50">
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
                            prop="assetsName"
                            show-overflow-tooltip

                            label="设备名称">
                    </el-table-column>
                    <el-table-column
                            prop="brandName"
                            show-overflow-tooltip
                            label="品牌">
                    </el-table-column>
                    <el-table-column
                            prop="model"
                            show-overflow-tooltip

                            label="规格型号">
                    </el-table-column>
                    <el-table-column
                            prop="areaName"
                            show-overflow-tooltip

                            label="所处区域">
                    </el-table-column>
                    <el-table-column
                            prop="storageLocation"
                            show-overflow-tooltip

                            label="存放位置">
                    </el-table-column>
                </el-table>
                <div class="page">
                    <el-pagination
                            :current-page="1"
                            :page-sizes="[10, 20, 30,50]"
                            :page-size="100"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="planData.assetsList.count">
                    </el-pagination>
                </div>
            </div>
            <p class="label" @click="show4=!show4">审核信息<i class="el-icon-arrow-down"></i></p>
            <div v-if="show4" class="list">
                <table class="dialogtablebox">
                    <tbody v-for="item in planData.planAuditList">
                    <tr>
                        <td class="table-title">审核时间</td>
                        <td class="table-content">{{item.auditTime}}</td>
                        <td class="table-title">审核人</td>
                        <td class="table-content">{{item.auditPersonName}}</td>
                        <td class="table-title">审核结果</td>
                        <td class="table-content">{{item.auditResult==0?'退回':'通过'}}</td>
                    </tr>
                    <tr>
                        <td class="table-title">退回原因</td>
                        <td class="table-content" colspan="5">{{item.callbackReason}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="dialogfooter" style="text-align: right" v-if="!hideOperate">
            <el-button type="primary" size="small" @click="closeHandle">通过</el-button>

            <el-button  size="small" @click="backcloseHandle">退回</el-button>
        </div>
        <el-dialog
                title="退回原因"
                :visible.sync="backShow"
                @close="backShow=false"
                width="1000px"
                append-to-body>
            <span slot="title" class="dialogtitle">
                退回原因
              </span>
            <el-input
                    type="textarea"
                    placeholder="请输入退回原因"
                    v-model="backinfo">
            </el-input>
            <div class="dialogfooter" style="text-align: right;margin-top: 20px">
                <el-button type="primary" size="small" @click="sureBack">确认</el-button>

                <el-button  size="small" @click="cancleBack">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "checkPlan",
        props:['planData','hideOperate'],
        data:function () {
            return{
                backShow:false,
                backinfo:'',
                tableData: [],
                show1:true,
                show2:true,
                show3:true,
                show4:true,
                ajaxSend:false
            }
        },
        methods:{
            backClose(){
                this.$emit('closeHandle',true)
            },
            closeHandle(){
                this.requestCheck('1')
            },
            backcloseHandle(){
                this.backShow = true
                this.backinfo=''
            },
            sureBack(){
                let vm =this
                this.backShow = false
                vm.requestCheck('0')
            },
            cancleBack(){
                this.backShow =false
            },
            requestCheck(num){
                let vm =this
                if(vm.ajaxSend){
                    return
                }
                vm.ajaxSend = true
                vm.$http.post('maintainPlanAudit/savePlanAudit',{
                    // auditTime:vm.getNowFormatDate(),
                    maintainPlanId:vm.planData.id,
                    auditPersonName:JSON.parse(localStorage.getItem('LOGINDATA')).name,
                    auditPersonCode:JSON.parse(localStorage.getItem('LOGINDATA')).id,
                    auditResult:num,
                    callbackReason:vm.backinfo
                }).then(res=>{
                    vm.ajaxSend = false
                    if(res.code==200){
                        vm.backShow = false
                        vm.$message({
                            message:res.message,
                            type:'success'
                        })
                        vm.$emit('closeHandle',true)
                    }
                })
            },
            getNowFormatDate() {
                var date = new Date();
                var seperator1 = "-";
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                var currentdate = year + seperator1 + month + seperator1 + strDate;
                return currentdate;
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