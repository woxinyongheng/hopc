<template>
    <div class="shebei">
        <div class="dialogcontent">
            <div class="list">
                <el-form :inline="true" label-width="120px" :model="formInline" class="demo-form-inline" style="display: flex;justify-content: left;margin-left: 10px">
                    <el-form-item label="设备类型" >
                        <el-input disabled :value="selectData.typeName"></el-input>
                    </el-form-item>
                    <el-form-item label="设备管理员" >
                        <el-input disabled :value="selectData.eqAdminName"></el-input>
                    </el-form-item>
                    <el-form-item label="提醒方式" required>
                        <el-select v-model="formInline.remindWay" placeholder="提醒方式" required>
                            <el-option label="系统/短息" value="0,1"></el-option>
                            <el-option label="系统" value="0"></el-option>
                            <el-option label="短信" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <el-form :inline="true" label-width="120px" :model="formInline" class="demo-form-inline" style="display: flex;justify-content: left;margin-left: 10px">
                    <el-form-item label="寿命到期提醒" required class="houzhui">
                        <el-input type="number" v-model="formInline.lifetimeExpiration" >
                            <template slot="append">天</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="质保到期提醒" required class="houzhui">
                        <el-input type="number"   v-model="formInline.qualityExpiration">
                            <template slot="append">天</template>
                        </el-input>
                    </el-form-item>
                </el-form>
                <el-form ref="form" label-width="120px" :model="formInline"   style="margin-left: 10px;padding-right: 40px">
                    <el-form-item label="备注">
                        <el-input type="textarea" v-model="formInline.remindRemarks"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="dialogfooter" style="text-align: right">
            <el-button type="primary" size="small" @click="sureClick">确认</el-button>
            <el-button  size="small" @click="closeHandle">取消</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Tixingbianji",
        props:['selectData','id'],
        data:function () {
            return{
                formInline: {
                    remindWay: '',
                    lifetimeExpiration: '',
                    qualityExpiration:'',
                    remindRemarks:''
                }
            }
        },
        mounted(){
            let vm =this
            this.formInline={
                remindWay: vm.selectData.remindWay,
                lifetimeExpiration: vm.selectData.lifetimeExpiration,
                qualityExpiration:vm.selectData.qualityExpiration,
                remindRemarks:vm.selectData.remindRemarks,
            }
        },
        methods:{
            closeHandle(){
                this.$emit('closeHandle')
            },
            sureClick(){
                let vm =this
                if(!vm.formInline.remindWay){
                    vm.$message({
                        message:"请选择提醒方式",
                        type:'warning'
                    })
                    return
                }
                if(!vm.formInline.lifetimeExpiration){
                    vm.$message({
                        message:"请输入寿命到期提醒",
                        type:'warning'
                    })
                    return
                }
                if(!vm.formInline.qualityExpiration){
                    vm.$message({
                        message:"请输入质保到期提醒",
                        type:'warning'
                    })
                    return
                }
                vm.$http.post('equipmentConfigController/updateEquipmentOfRemind ',{
                    id:vm.selectData.id,
                    remindWay:vm.formInline.remindWay,
                    lifetimeExpiration: vm.formInline.lifetimeExpiration,
                    qualityExpiration:vm.formInline.qualityExpiration,
                    remindRemarks:vm.formInline.remindRemarks,
                }).then(res=>{
                    if(res.code==200){
                        vm.$message({
                            message:res.message,
                            type:'success'
                        })
                        this.$emit('closeHandle',true)
                    }
                })
            }
        },
        watch:{
            id:function () {
                let vm =this
                this.formInline={
                    remindWay: vm.selectData.remindWay,
                    lifetimeExpiration: vm.selectData.lifetimeExpiration,
                    qualityExpiration:vm.selectData.qualityExpiration,
                    remindRemarks:vm.selectData.remindRemarks,
                }

            }
        }
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