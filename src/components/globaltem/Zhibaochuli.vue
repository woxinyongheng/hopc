<template>
    <div class="shebei">
        <div class="dialogcontent">
            <div class="list">
                <table class="dialogtablebox">
                    <tbody>
                    <tr>
                        <td class="table-title">记录单号</td>
                        <td class="table-content">{{data.recordCode}}</td>
                        <td class="table-title">处理时间</td>
                        <td class="table-content">{{data.processTime}}</td>
                        <td class="table-title">处理人</td>
                        <td class="table-content">{{data.processPersonName}}</td>
                    </tr>
                    <tr>
                        <td class="table-title">处理说明</td>
                        <td class="table-content" colspan="5">{{data.remarks}}</td>
                    </tr>
                    <tr>
                        <td class="table-title">相关附件</td>
                        <td class="table-content" colspan="5">{{data.contentAttachmentUrl}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="dialogfooter" style="text-align: right">
            <el-button type="primary" size="small" @click="closeHandle">确定</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Zhibaochuli",
        props:['orderData'],
        data:function () {
            return{
                data:''
            }
        },
        mounted(){
            this.requesInfo()
        },
        methods:{
            closeHandle(){
                this.$emit('closeShebeiHandle')
            },
            requesInfo(){
                let vm =this
                vm.$http.post('equipmentRecordController/findRecord',{
                    id:vm.orderData.id,
                    category:'2'
                }).then(res=>{
                    if(res.code=='200'){
                        vm.data=res.data[0]
                    }
                })
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
            .list{
                padding: 10px 0;
            }
        }
        .dialogfooter{

        }
    }
</style>