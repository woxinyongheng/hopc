<template>
    <div class="shebei">
        <div class="dialogcontent">
            <div class="list">
                <table class="dialogtablebox">
                    <tbody>
                    <tr>
                        <td class="table-title">记录单号</td>
                        <td class="table-content">{{orderData.recordCode}}</td>
                        <td class="table-title">处理时间</td>
                        <td class="table-content">{{orderData.processTime}}</td>
                        <td class="table-title">处理人</td>
                        <td class="table-content">{{orderData.processPersonName}}</td>
                    </tr>
                    <tr>
                        <td class="table-title">确认人</td>
                        <td class="table-content">{{orderData.confirmPersonName}}</td>
                        <td class="table-title">延期时间(月)</td>
                        <td class="table-content">{{orderData.delayTime}}</td>
                        <td class="table-title"></td>
                        <td class="table-content"></td>
                    </tr>
                    <tr>
                        <td class="table-title">处理说明</td>
                        <td class="table-content" colspan="5">{{orderData.remarks}}</td>
                    </tr>
                    <tr>
                        <td class="table-title">相关附件</td>
                        <td class="table-content" colspan="5">
                            <img style="width: 80px;height: 80px;padding: 20px;" v-if="orderData.contentAttachmentUrl && orderData.contentAttachmentUrl.length" v-for="item in orderData.contentAttachmentUrl" :src="item" alt="">
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
        name: "YanqiChakan",
        props:['orderData'],
        data:function () {
            return{
                data:''
            }
        },
        mounted(){
            // this.requesInfo()
        },
        methods:{
            closeHandle(){
                this.$emit('closeShebeiHandle')
            },

        },

    }
</script>

<style scoped lang="scss">
    .shebei{
        height: 600px;
        .dialogcontent{
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