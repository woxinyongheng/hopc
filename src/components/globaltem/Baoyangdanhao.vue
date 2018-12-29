
<template>
    <div class="jilu">
        <div class="dialogcontent">
            <p class="label">编号  {{orderData.view.maintainCode}}</p>
            <div class="list">
                <el-steps :active="1" align-center>
                    <el-step title="任务生成时间" :description="orderData.view.create_time"></el-step>
                    <el-step title="派工时间" :description="orderData.view.assign_time"></el-step>
                    <el-step title="完工时间" :description="orderData.view.maintain_time"></el-step>
                    <el-step title="要求完成时间" :description="orderData.view.requirementPlanTime"></el-step>

                </el-steps>
            </div>
            <p class="label" @click="show1=!show1">任务信息<i class="el-icon-arrow-down"></i></p>
            <div class="list" v-if="show1">
                <table class="dialogtablebox">
                    <tbody>
                    <tr>
                        <td class="table-title">计划名称</td>
                        <td class="table-content">{{orderData.view.planName}}</td>
                        <td class="table-title">设备类别</td>
                        <td class="table-content">{{orderData.view.classifyName}}</td>
                        <td class="table-title">保养类型</td>
                        <td class="table-content">{{orderData.view.maintainType==0?'质保':'维保'}}</td>
                    </tr>
                    <tr>
                        <td class="table-title">保养项目</td>
                        <td class="table-content">{{orderData.view.maintainItem}}</td>
                        <td class="table-title">周期类型</td>
                        <td class="table-content">
                            <span v-if="orderData.view.cycleType==0">周</span>
                            <span v-if="orderData.view.cycleType==1">半月</span>
                            <span v-if="orderData.view.cycleType==2">月</span>
                            <span v-if="orderData.view.cycleType==3">季度</span>
                            <span v-if="orderData.view.cycleType==4">半年</span>
                            <span v-if="orderData.view.cycleType==5">年</span>
                        </td>
                        <td class="table-title">负责单位</td>
                        <td class="table-content">{{orderData.view.responsibleCompany==0?'本部':'外包'}}</td>
                    </tr>
                    <tr>
                        <td class="table-title">维保单位</td>
                        <td class="table-content">{{orderData.view.maintenanceCompany}}</td>
                        <td class="table-title">联系人</td>
                        <td class="table-content">{{orderData.view.maintenancePersonName}}</td>
                        <td class="table-title">联系人电话</td>
                        <td class="table-content">{{orderData.view.maintenancePersonPhone}}</td>
                    </tr>
                    <tr>
                        <td class="table-title">备注</td>
                        <td class="table-content" colspan="5">{{orderData.view.remarks}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <p class="label" @click="show2=!show2">派工信息<i class="el-icon-arrow-down"></i></p>
            <div v-if="show2" class="list">
                <table class="dialogtablebox">
                    <tbody>
                    <tr>
                        <td class="table-title">派工时间</td>
                        <td class="table-content">{{orderData.view.assign_time}}</td>
                        <td class="table-title">派工人</td>
                        <td class="table-content">{{orderData.view.assign_person_name}}</td>
                        <td class="table-title">执行人</td>
                        <td class="table-content">{{orderData.view.implement_person_name}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <p class="label" @click="show3=!show3">挂单信息<i class="el-icon-arrow-down"></i></p>
            <div v-if="show3" class="list">
                <table class="dialogtablebox">
                    <tbody>
                    <tr>
                        <td class="table-title">挂单时间</td>
                        <td class="table-content">{{orderData.view.payment_time}}</td>
                        <td class="table-title">挂单原因</td>
                        <td class="table-content">{{orderData.view.payment_cause}}</td>
                        <td class="table-title"></td>
                        <td class="table-content"></td>
                    </tr>
                    <tr>
                        <td class="table-title">其他说明</td>
                        <td class="table-content" colspan="5">{{orderData.view.other_explain}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <p class="label" @click="show4=!show4">完工信息<i class="el-icon-arrow-down"></i></p>
            <div v-if="show4" class="list">
                <table class="dialogtablebox">
                    <tbody>
                    <tr>
                        <td class="table-title">完工时间</td>
                        <td class="table-content">{{orderData.view.maintain_time}}</td>
                        <td class="table-title">保养人</td>
                        <td class="table-content">{{orderData.view.maintain_person_name}}</td>
                        <td class="table-title">联系电话</td>
                        <td class="table-content">{{orderData.view.maintain_person_phone}}</td>
                    </tr>
                    <tr>
                        <td class="table-title">保养说明</td>
                        <td class="table-content" colspan="5">{{orderData.view.maintain_explain}}</td>
                    </tr>
                    <tr>
                        <td class="table-title">语音相关附件</td>
                        <td class="table-content" colspan="5">
                            <audio v-if="orderData.view.repair_content_attachment_url" :src="orderData.view.repair_content_attachment_url" controls="controls"></audio>

                        </td>
                    </tr>
                    <tr>
                        <td class="table-title">相关附件</td>
                        <td class="table-content" colspan="5">
                            <img style="width: 148px;" class="imglist" v-for="item in orderData.view.repair_attachment_url" :src="item" alt="">

                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <p class="label" @click="show5=!show5">保养项目作业书<i class="el-icon-arrow-down"></i></p>
            <div v-if="show5" class="list">
                <table class="dialogtablebox">
                    <tbody>
                        <tr>
                            <td class="table-title">序号</td>
                            <td class="table-title">保养内容</td>
                            <td class="table-title">完成情况</td>
                            <td class="table-title" colspan="3">备注</td>
                        </tr>
                        <tr v-for="(item,index) in orderData.work">
                            <td class="table-title">{{index+1}}</td>
                            <td class="table-content">{{item.content}}</td>
                            <td class="table-content">
                                <span v-if="item.state==0">未完成</span>
                                <span v-if="item.state==1">已完成</span>
                                <!--<span v-if="item.state==2">已派工</span>-->
                                <!--<span v-if="item.state==3">已完成</span>-->
                            </td>
                            <td class="table-content" colspan="3">{{item.remarks}}</td>
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
                show1:true,
                show2:true,
                show3:true,
                show4:true,
                show5:true,

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
        .imglist{
            width: 148px;
        }
    }
</style>