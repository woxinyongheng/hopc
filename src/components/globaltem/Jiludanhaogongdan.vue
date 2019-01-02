<template>
    <div class="jilu">
        <div class="dialogcontent">
            <p class="label">编号 {{data.repairCode}}</p>
            <div class="list">
                <el-steps :active="data.repairTime?4:(data.paymentTime?3:(data.assignTime?2:1))" align-center>
                    <el-step title="报修时间" :description="data.reportTime"></el-step>
                    <el-step title="派工时间" :description="data.assignTime"></el-step>
                    <el-step title="挂单时间" :description="data.paymentTime"></el-step>
                    <el-step title="维修时间" :description="data.repairTime"></el-step>

                </el-steps>
            </div>
            <p @click="show1=!show1" class="label">任务信息<i class="el-icon-arrow-down"></i></p>
                <div v-if="show1" class="list">
                    <table class="dialogtablebox">
                        <tbody>
                            <tr>
                                <td class="table-title">报修时间</td>
                                <td class="table-content">{{data.reportTime}}</td>
                                <td class="table-title">报修人</td>
                                <td class="table-content">{{data.reportPersonName}}</td>
                                <td class="table-title">报修人电话</td>
                                <td class="table-content">{{data.reportPersonPhone}}</td>
                            </tr>
                            <tr>
                                <td class="table-title">报修说明</td>
                                <td class="table-content" colspan="5">{{data.repairExplain}}</td>
                            </tr>
                            <tr>
                                <td class="table-title">语音附件</td>
                                <td class="table-content" colspan="5">
                                    <audio v-if="data.repairContentAttachmentUrl" :src="data.repairContentAttachmentUrl" controls="controls"></audio>
                                </td>
                            </tr>
                            <tr>
                                <td class="table-title">相关组件</td>
                                <td class="table-content" colspan="5">
                                    <img style="width: 80px;height: 80px;padding: 20px;" v-for="item in data.repairAttachmentUrl" :src="item" alt="">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            <p class="label" @click="show2=!show2" v-if="data.assignTime">派工信息<i class="el-icon-arrow-down"></i></p>
            <div v-if="show2 && data.assignTime" class="list">
                <table class="dialogtablebox">
                    <tbody>
                        <tr>
                            <td class="table-title">派工时间</td>
                            <td class="table-content">{{data.assignTime}}</td>
                            <td class="table-title">派工人</td>
                            <td class="table-content">{{data.assignPersonName}}</td>
                            <td class="table-title">执行人</td>
                            <td class="table-content">{{data.implementPersonName}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p class="label" @click="show3=!show3" v-if="data.paymentTime">挂单信息<i class="el-icon-arrow-down"></i></p>
            <div v-if="show3 && data.paymentTime" class="list">
                <table class="dialogtablebox">
                    <tbody>
                        <tr>
                            <td class="table-title">挂单时间</td>
                            <td class="table-content">{{data.paymentTime}}</td>
                            <td class="table-title">挂单原因</td>
                            <td class="table-content">{{data.paymentCause}}</td>
                            <td class="table-title"></td>
                            <td class="table-content"></td>
                        </tr>
                        <tr>
                            <td class="table-title">其他说明</td>
                            <td class="table-content" colspan="5">{{data.otherExplain}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p class="label" @click="show4=!show4">完工信息<i class="el-icon-arrow-down"></i></p>
            <div v-if="show4" class="list">
                <table class="dialogtablebox">
                    <tbody>
                    <tr>
                        <td class="table-title">维修日期</td>
                        <td class="table-content">{{data.repairTime}}</td>
                        <td class="table-title">维修人</td>
                        <td class="table-content">{{data.repairPersonName}}</td>
                        <td class="table-title">维修人电话</td>
                        <td class="table-content">{{data.repairPersonPhone}}</td>
                    </tr>
                    <tr>
                        <td class="table-title">损坏原因</td>
                        <td class="table-content" colspan="5">{{data.damageCause}}</td>
                    </tr>
                    <tr>
                        <td class="table-title">维修说明</td>
                        <td class="table-content" colspan="5">{{data.repairFinishExplain}}</td>
                    </tr>
                    <tr>
                        <td class="table-title" :rowspan="data.partsEmploy.length+1">配件使用</td>
                    </tr>
                    <tr v-for="item in data.partsEmploy">
                        <td class="table-content">{{item.partsName}}</td>
                        <td class="table-content">{{item.partsSum}}件</td>
                        <td class="table-content">{{item.partsPay}}</td>
                        <td class="table-content" colspan="2"></td>
                    </tr>
                    <tr>
                        <td class="table-title">维修总支出</td>
                        <td class="table-content">{{data.repairPay}}</td>
                        <td class="table-title">配件支出</td>
                        <td class="table-content">{{data.partsPay}}</td>
                        <td class="table-title">其他支出</td>
                        <td class="table-content">{{data.servicePay}}</td>
                    </tr>
                    <tr>
                        <td class="table-title">语音附件</td>
                        <td class="table-content" colspan="5">
                            <audio v-if="data.finishContentAttachmentUrl" :src="data.finishContentAttachmentUrl" controls="controls"></audio>

                        </td>
                    </tr>
                    <tr>
                        <td class="table-title">相关组件</td>
                        <td class="table-content" colspan="5">
                            <img style="width: 80px;height: 80px;padding: 20px;" v-for="item in data.finishAttachmentUrl" :src="item" alt="">

                        </td>
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
        name: "Jiludanhao",
        props:['type','data'],
        data:function () {
            return{
                show1:true,
                show2:true,
                show3:true,
                show4:true
            }
        },
        mounted(){

        },
        methods:{
            closeHandle(){
                this.$emit('closeOrderHandle')
            },

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