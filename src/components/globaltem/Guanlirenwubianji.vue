
<template>
    <div class="shebei">
        <div class="dialogcontent">
            <div class="list">
                <el-form ref="form" :model="formInline" label-width="100px"  style="padding-right: 10px">
                    <el-form-item label="资产类别">
                        <el-input disabled >{{deviceData.typeName}}</el-input>
                    </el-form-item>
                    <el-form-item :label="judgeUser?'责任归属':'设备管理员'" required>
                        <el-select v-model="formInline.user" :placeholder="judgeUser?'责任归属':'设备管理员'">
                            <el-option v-for="item in adminList" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input type="textarea" v-model="formInline.user"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="dialogfooter" style="text-align: right">
            <el-button type="primary" size="small" @click="closeHandle">确认</el-button>
            <el-button  size="small" @click="closeHandle">取消</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Guanlirenwubianji",
        props:['judgeUser','deviceData','adminList'],
        data:function () {
            return{
                formInline: {
                    eqAdminCode:'',
                    eqAdminName:'',
                    remarks: '',
                    typeName:''
                }
            }
        },
        created(){
            this.formInline.typeName = this.deviceData.typeName
            this.formInline.eqAdminCode =this.deviceData.eqAdminCode
        },
        methods:{
            closeHandle(){
                this.$emit('closeShebeiHandle')
            },
            submit(){
                let vm = this
                let _index = vm.adminList.findIndex(function (item) {
                    return item.id == vm.formInline.eqAdminCode
                })
                vm.formInline.eqAdminName = vm.adminList[_index].name
                vm.$http.post('/equipmentConfigController/updateEequipmentOfAdmin',{
                    eqAdminCode:vm.formInline.eqAdminCode,
                    eqAdminName:vm.formInline.eqAdminName,
                    remarks: vm.formInline.remarks,
                    id:vm.deviceData.id
                }).then(res=>{
                    if(res.code==200){
                        vm.$message({
                            message: res.message,
                            type: 'success'
                        });
                        this.$emit('closeShebeiHandle',true)
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