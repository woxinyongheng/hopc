<template>
    <div class="shebei">
        <div class="dialogcontent">
            <div class="list">
                <el-form :inline="true" :model="formInline" class="demo-form-inline" style="display: flex;justify-content: space-between;margin-left: 10px">
                    <el-form-item label="报修日期" required>
                        <el-date-picker
                                v-model="formInline.reportTime"
                                type="date"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="报修人" required>
                        <el-select v-model="formInline.reportPersonCode" placeholder="报修人">
                            <el-option v-for="item in customList" :label="item.name" :value="item.staffId"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="报修人电话" >
                        <el-input v-model="formInline.reportPersonPhone"></el-input>
                    </el-form-item>
                </el-form>
                <el-form ref="form" :model="formInline" label-width="80px"  style="padding-right: 10px">

                    <el-form-item label="报修说明">
                        <el-input type="textarea" v-model="formInline.repairExplain"></el-input>
                    </el-form-item>
                </el-form>
                <el-form :model="formInline" label-width="80px">
                    <el-form-item label="相关附件">
                        <upload></upload>
                    </el-form-item>
                </el-form>



            </div>
        </div>
        <div class="dialogfooter" style="text-align: right">
            <el-button type="primary" size="small" @click="sureRepair">确认</el-button>
            <el-button  size="small" @click="closeHandle">取消</el-button>
        </div>
    </div>
</template>

<script>
    import upload from '@/components/globaltem/UpLoad'
    export default {
        name: "Shebeibaoxiu",
        props:['selectData'],
        data:function () {
            return{
                activeName:'first',
                formInline: {
                    reportTime:'',
                    reportPersonCode:'',
                    reportPersonName:'',
                    reportPersonPhone:'',
                    repairExplain:'',
                    repairContentAttachmentUrl:'',
                    repairAttachmentUrl:'',
                },
                customList:[]
            }
        },
        mounted(){
            let vm =this
            debugger
            vm.$http.post('http://218.247.12.42:8196/staffController/getHospitalStaffList',{}).then(res=>{
                if(res.code==200){
                    vm.customList = res.data
                }
            })

        },
        methods:{
            closeHandle(){
                this.$emit('closeShebeiHandle')
            },
            sureRepair(){
                let vm =this
                let _index = vm.customList.findIndex(function (item) {
                    return item.staffId == vm.formInline.reportPersonCode
                })
                vm.formInline.reportPersonName = vm.customList[_index].name
                vm.$http.post('equipmentListController/equipmentRepair',{
                    createPersonCode:JSON.parse(localStorage.getItem('LOGINDATA')).id,
                    createPersonName:JSON.parse(localStorage.getItem('LOGINDATA')).name,
                    createPersonPhone:'13267898877',
                    reportTime:vm.formInline.reportTime,
                    reportPersonCode:vm.formInline.reportPersonCode,
                    reportPersonName:vm.formInline.reportPersonName,
                    reportPersonPhone:vm.formInline.reportPersonPhone,
                    repairExplain:vm.formInline.repairExplain,
                    repairContentAttachmentUrl:vm.formInline.repairContentAttachmentUrl,
                    repairAttachmentUrl:vm.formInline.repairAttachmentUrl,
                    equipmentId:vm.selectData[0].equipmentId
                }).then(res=>{
                    if(res.status==200){
                        vm.$message({
                            message: res.message,
                            type: 'success'
                        });
                        vm.$emit('closeShebeiHandle')
                    }
                })
            }
        },
        components:{
            upload
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