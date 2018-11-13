<template>
    <div class="shebei">
        <div class="dialogcontent">
            <div class="list">
                <el-form ref="form" :model="formInline" label-width="80px" style="margin-top: 60px">
                    <el-form-item label="任务班组" required >
                        <el-select v-model="formInline.taskCode" placeholder="任务分配" style="width: 900px;">
                            <el-option v-for="item in teamList" :label="item.name" :value="item.id"></el-option>
                            <!--<el-option label="区域二" value="beijing"></el-option>-->
                        </el-select>
                    </el-form-item>

                </el-form>

            </div>
        </div>
        <div class="dialogfooter" style="text-align: right">
            <el-button type="primary" size="small" @click="sureHandle">确认</el-button>
            <el-button  size="small" @click="closeHandle">取消</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Renwufenpei",
        props:['selectData','teamList'],
        data:function () {
            return{
                formInline: {
                    taskCode: '',
                    taskName:''
                }
            }
        },
        methods:{
            closeHandle(){
                this.$emit('closeShebeiHandle')
            },
            sureHandle(){
                let vm =this
                if(!this.formInline.taskCode){
                    this.$message({
                        message: '请选择班组',
                        type: 'warning'
                    })
                    return
                }
                vm.teamList.forEach(function (item) {
                    if(item.id == vm.formInline.taskCode){
                        vm.formInline.taskName = item.name
                    }
                })
                let _id = []
                vm.selectData.forEach(function (item) {
                    _id.push(item.equipmentId)
                })
                vm.$http.post('equipmentListController/equipmentTaskDistribution',{
                    ids:_id.join(','),
                    taskCode: vm.formInline.taskCode,
                    taskName:vm.formInline.taskName,
                }).then(res=>{
                    if(res.code==200){
                        this.$message({
                            message: res.message,
                            type: 'success'
                        })
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