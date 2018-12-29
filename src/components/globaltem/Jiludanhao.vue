<template>
    <div class="jilu">
        <div class="dialogcontent">
            <p class="label">编号  wx201808290001</p>
            <div class="list">
                <el-steps :active="orderData.repairTime?4:(orderData.assignTime?2:1)" align-center>
                    <el-step title="报修时间" :description="orderData.reportTime"></el-step>
                    <el-step title="派工时间" :description="orderData.assignTime"></el-step>
                    <el-step :title="type=='guadan'?'挂单时间':'维修时间'" :description="orderData.repairTime"></el-step>
                    <el-step :title="type=='guadan'?'维修时间':'结束时间'" :description="orderData.repairTime"></el-step>

                </el-steps>
            </div>
            <p class="label"  @click="show1=!show1">任务信息<i class="el-icon-arrow-down"></i></p>
                <div class="list" v-if="show1">
                    <table class="dialogtablebox">
                        <tbody>
                            <tr>
                                <td class="table-title">{{type=='guadan'?'资产编号':'报修时间'}}</td>
                                <td class="table-content">{{orderData.reportTime}}</td>
                                <td class="table-title">{{type=='guadan'?'资产类别':'报修人'}}</td>
                                <td class="table-content">{{orderData.reportPersonName}}</td>
                                <td class="table-title">{{type=='guadan'?'资产名称':'报修人电话'}}</td>
                                <td class="table-content">{{orderData.reportPersonPhone}}</td>
                            </tr>
                            <tr>
                                <td class="table-title">报修说明</td>
                                <td class="table-content" colspan="5">{{orderData.repairExplain}}</td>
                            </tr>
                            <tr>
                                <td class="table-title">语音附件</td>
                                <td class="table-content" colspan="5">
                                    <audio v-if="orderData.repairContentAttachmentUrl" :src="orderData.repairContentAttachmentUrl" controls="controls"></audio>

                                </td>
                            </tr>
                            <tr>
                                <td class="table-title">相关组件</td>
                                <td class="table-content" colspan="5">
                                    <img style="width: 80px;height: 80px;padding: 20px;" v-for="item in orderData.repairAttachmentUrl" :src="item" alt="">

                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            <p class="label"  @click="show2=!show2" v-if="orderData.assignTime">派工信息<i class="el-icon-arrow-down"></i></p>
            <div class="list" v-if="show2 && orderData.assignTime">
                <table class="dialogtablebox">
                    <tbody>
                        <tr>
                            <td class="table-title">派工时间</td>
                            <td class="table-content">{{orderData.assignTime}}</td>
                            <td class="table-title">派工人</td>
                            <td class="table-content">{{orderData.assignPersonName}}</td>
                            <td class="table-title">执行人</td>
                            <td class="table-content">{{orderData.implementPersonName}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p class="label"  @click="show3=!show3" v-if="orderData.paymentTime">挂单信息<i class="el-icon-arrow-down"></i></p>
            <div class="list" v-if="show3 && orderData.paymentTime">
                <table class="dialogtablebox">
                    <tbody>
                        <tr>
                            <td class="table-title">挂单时间</td>
                            <td class="table-content">{{orderData.paymentTime}}</td>
                            <td class="table-title">挂单原因</td>
                            <td class="table-content">{{orderData.paymentCause}}</td>
                            <td class="table-title"></td>
                            <td class="table-content"></td>
                        </tr>
                        <tr>
                            <td class="table-title">其他说明</td>
                            <td class="table-content" colspan="5">{{orderData.otherExplain}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p class="label"  @click="show4=!show4 && orderData.repairTime">完工信息<i class="el-icon-arrow-down"></i></p>
            <div class="list" v-if="show4 && orderData.repairTime">
                <table class="dialogtablebox">
                    <tbody>
                    <tr>
                        <td class="table-title">维修日期</td>
                        <td class="table-content">{{orderData.repairTime}}</td>
                        <td class="table-title">维修人</td>
                        <td class="table-content">{{orderData.repairPersonName}}</td>
                        <td class="table-title">维修人电话</td>
                        <td class="table-content">{{orderData.repairPersonPhone}}</td>
                    </tr>
                    <tr>
                        <td class="table-title">损坏原因</td>
                        <td class="table-content" colspan="5">{{orderData.damageCause}}</td>
                    </tr>
                    <tr>
                        <td class="table-title">维修说明</td>
                        <td class="table-content" colspan="5">{{orderData.repairFinishExplain}}</td>
                    </tr>
                    <tr>
                        <td class="table-title" :rowspan="orderData.partsEmploy.length+1">配件使用</td>
                    </tr>
                    <tr v-for="item in orderData.partsEmploy">
                        <td class="table-content">{{item.partsName}}</td>
                        <td class="table-content">{{item.partsSum}}件</td>
                        <td class="table-content">{{item.partsPay}}</td>
                        <td class="table-content" colspan="2"></td>
                    </tr>
                    <tr>
                        <td class="table-title">维修总支出</td>
                        <td class="table-content">{{orderData.repairPay}}{{orderData.repairPay?'元':''}}</td>
                        <td class="table-title">配件支出</td>
                        <td class="table-content">{{orderData.partsPay}}{{orderData.partsPay?'元':''}}</td>
                        <td class="table-title">其他支出</td>
                        <td class="table-content">{{orderData.servicePay}}{{orderData.servicePay?'元':''}}</td>
                    </tr>
                    <tr>
                        <td class="table-title">语音附件</td>
                        <td class="table-content" colspan="5">
                            <audio v-if="orderData.finishContentAttachmentUrl" :src="orderData.finishContentAttachmentUrl" controls="controls"></audio>

                        </td>
                    </tr>
                    <tr>
                        <td class="table-title">相关组件</td>
                        <td class="table-content" colspan="5">
                            <img style="width: 80px;height: 80px;padding: 20px;" v-for="item in orderData.finishAttachmentUrl" :src="item" alt="">

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
        props:['type','orderData'],
        data:function () {
            return{
                data:'',
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