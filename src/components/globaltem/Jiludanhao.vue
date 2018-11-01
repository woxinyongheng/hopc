<template>
    <div class="jilu">
        <div class="dialogcontent">
            <p class="label">编号  wx201808290001</p>
            <div class="list">
                <el-steps :active="1" align-center>
                    <el-step title="报修时间" :description="data.reportTime"></el-step>
                    <el-step title="派工时间" :description="data.assignTime"></el-step>
                    <el-step :title="type=='guadan'?'挂单时间':'维修时间'" :description="data.repairTime"></el-step>
                    <el-step :title="type=='guadan'?'维修时间':'结束时间'" :description="data.repairTime"></el-step>

                </el-steps>
            </div>
            <p class="label">任务信息<i class="el-icon-question"></i></p>
                <div class="list">
                    <table class="dialogtablebox">
                        <tbody>
                            <tr>
                                <td class="table-title">{{type=='guadan'?'资产编号':'报修时间'}}</td>
                                <td class="table-content">{{data.reportTime}}</td>
                                <td class="table-title">{{type=='guadan'?'资产类别':'报修人'}}</td>
                                <td class="table-content">{{data.reportPersonName}}</td>
                                <td class="table-title">{{type=='guadan'?'资产名称':'报修人电话'}}</td>
                                <td class="table-content">{{reportPersonPhone}}</td>
                            </tr>
                            <tr>
                                <td class="table-title">保养说明</td>
                                <td class="table-content" colspan="5">{{data.repairExplain}}</td>
                            </tr>
                            <tr>
                                <td class="table-title">语音附件</td>
                                <td class="table-content" colspan="5">{{data.repairContentAttachmentUrl}}</td>
                            </tr>
                            <tr>
                                <td class="table-title">相关组件</td>
                                <td class="table-content" colspan="5">{{data.repairAttachmentUrl}}</td>
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
                            <td class="table-content">{{data.assignTime}}</td>
                            <td class="table-title">派工人</td>
                            <td class="table-content">{{data.assignPersonName}}</td>
                            <td class="table-title">执行人</td>
                            <td class="table-content">{{data.implementPersonName}}</td>
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
            <p class="label">完工信息<i class="el-icon-question"></i></p>
            <div class="list">
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
                        <td class="table-title" rowspan="4">配件使用</td>
                    </tr>
                    <tr>
                        <td class="table-content">空天滤芯</td>
                        <td class="table-content"></td>
                        <td class="table-content"></td>
                        <td class="table-content" colspan="2"></td>
                    </tr>
                    <tr>
                        <td class="table-content">空天滤芯</td>
                        <td class="table-content"></td>
                        <td class="table-content"></td>
                        <td class="table-content" colspan="2"></td>
                    </tr>
                    <tr>
                        <td class="table-content"></td>
                        <td class="table-title">配件支出</td>
                        <td class="table-content">{{data.partsPay}}</td>
                        <td class="table-title">维修服务支出</td>
                        <td class="table-content">{{data.servicePay}}</td>
                    </tr>
                    <tr>
                        <td class="table-title">语音附件</td>
                        <td class="table-content" colspan="5"></td>
                    </tr>
                    <tr>
                        <td class="table-title">相关组件</td>
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
        name: "Jiludanhao",
        props:['type','orderData'],
        data:function () {
            return{
                data:''
            }
        },
        mounted(){
          this.requestInfo()
        },
        methods:{
            closeHandle(){
                this.$emit('closeOrderHandle')
            },
            requestInfo(){
                let vm =this
                vm.$http.post('equipmentListController/getRepairDetailById',{
                    id:vm.orderData.id,
                }).then(res=>{
                    debugger
                    if(res.code=='200'){
                        vm.data=res.data.repair
                    }
                })
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