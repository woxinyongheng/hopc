<template>
    <div class="shebei">
        <div class="dialogcontent">
            <div class="list">
                <el-form ref="form" :model="formInline" label-width="100px"  style="padding-right: 10px">
                    <el-form-item label="设备类别">
                        <el-input disabled v-model="formInline.typeName"></el-input>
                    </el-form-item>
                    <el-form-item :label="judgeUser?'责任归属':'设备管理员'" required v-if="!judgeUser">
                        <el-select v-model="formInline.eqAdminCode" :placeholder="judgeUser?'责任归属':'设备管理员'">
                            <el-option v-for="item in adminList" :label="item.name" :value="item.id">{{item.name}}</el-option>

                        </el-select>
                    </el-form-item>
                    <el-form-item :label="judgeUser?'责任归属':'设备管理员'" required v-if="judgeUser">
                        <el-select v-model="formInline.companyCode" :placeholder="judgeUser?'责任归属':'设备管理员'">
                            <el-option v-for="item in componyList" :label="item.companyName" :value="item.companyCode">{{item.companyName}}</el-option>

                        </el-select>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input type="textarea" v-model="formInline.remarks"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="dialogfooter" style="text-align: right">
            <el-button type="primary" size="small" @click="submit">确认</el-button>
            <el-button  size="small" @click="closeHandle">取消</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Fenpeiguanliyuan",
        props:['judgeUser','deviceData','adminList','componyList','clear'],
        data:function () {
            return{
                formInline: {
                    eqAdminCode:'',
                    eqAdminName:'',
                    remarks: '',
                    typeName:'',
                    companyCode:'',
                    companyName:''
                }
            }
        },
        watch:{
            clear:function () {
                this.formInline= {
                    eqAdminCode:'',
                        eqAdminName:'',
                        remarks: '',
                        typeName:'',
                        companyCode:'',
                        companyName:''
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
                if(vm.judgeUser){
                    let _index = vm.componyList.findIndex(function (item) {
                        return item.companyCode == vm.formInline.companyCode
                    })
                    vm.formInline.companyName = vm.componyList[_index].companyName
                    vm.$http.post('/equipmentConfigController/updateEequipmentOfCompany',{
                        companyName:vm.formInline.companyName,
                        companyCode:vm.formInline.companyCode,
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




                    return
                }
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