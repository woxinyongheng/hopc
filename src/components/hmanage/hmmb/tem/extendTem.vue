<template>
    <div class="extend">
        <div class="dialogcontent">
            <div class="dialogcontent">
                <div class="list">
                    <el-form :inline="true" :model="formInline" class="demo-form-inline" style="display: flex;justify-content: space-between;margin-left: 25px">
                        <el-form-item label="记录号">
                            <el-input disabled :value="operateRow.assetsCode"></el-input>
                        </el-form-item>
                        <el-form-item label="处理人" >
                            <el-input disabled v-model="formInline.user"></el-input>
                        </el-form-item>
                        <el-form-item label="业务日期" required>
                            <el-date-picker
                                    v-model="formInline.businessTime"
                                    type="date"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-form>
                    <el-form :inline="true" :model="formInline" class="demo-form-inline" style="display: flex;justify-content: left;margin-left: 25px">
                        <el-form-item label="确认人">
                            <el-select v-model="formInline.equipmentAdminCode" placeholder="确认人">
                                <el-option v-for="(item,index) in adminList" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="延期时间" style="margin-left: 60px" required>
                            <el-input v-model="formInline.delayTime" type="number">
                                <template slot="append">月</template>
                            </el-input>
                        </el-form-item>
                    </el-form>
                    <el-form ref="form" :model="formInline" label-width="80px"  style="padding-right: 10px">
                        <el-form-item label="处理说明">
                            <el-input type="textarea" v-model="formInline.remarks"></el-input>
                        </el-form-item>
                    </el-form>
                    <el-form :model="formInline" label-width="80px">
                        <el-form-item label="相关附件">
                            <img style="width: 148px;height: 148px;vertical-align: middle"  :src="imgurl" alt="">
                            <upload v-if="!imgurl" style="display: inline-block;vertical-align: middle" @uploadHandle="uploadHandle"></upload>
                        </el-form-item>
                    </el-form>

                </div>
            </div>
            <div class="dialogfooter" style="text-align: right;margin-top: 20px">
                <el-button  size="small" @click="cancleExtend">取消</el-button>
                <el-button type="primary" size="small" @click="sureExtend">确认</el-button>
            </div>

        </div>
    </div>
</template>

<script>
    import upload from '@/components/globaltem/UpLoad'

    export default {
        name: "extendTem",
        props:['operateRow','adminList'],
        data:function () {
            return{
                formInline: {
                    user: JSON.parse(localStorage.getItem('LOGINDATA')).name,
                    businessTime: '',
                    delayTime:'',
                    remarks:'',
                    contentAttachmentUrl:'',
                    equipmentAdminCode:''
                },
                imgurl:''
            }
        },
        methods:{
            uploadHandle(file,url,type){
                    this.formInline.contentAttachmentUrl=file
                    this.imgurl=url
            },
            //延期
            cancleExtend(){
                this.$emit('closeHandle')

            },
            sureExtend(){
                let vm =this
                if(!vm.formInline.businessTime){
                    vm.$message({
                        message:'请选择业务日期',
                        type:'warning'
                    })
                    return
                }
                if(!vm.formInline.delayTime){
                    vm.$message({
                        message:'请输入延期时间',
                        type:'warning'
                    })
                    return
                }
                debugger
                vm.$http.post('equipmentListController/equipmentDelay',{
                    equipmentId:vm.operateRow.assetsCode,
                    businessTime:vm.formInline.businessTime,
                    delayTime:vm.formInline.delayTime,
                    remarks:vm.formInline.remarks,
                    contentAttachmentUrl:vm.formInline.contentAttachmentUrl,
                    equipmentAdminCode:vm.formInline.equipmentAdminCode,
                    flagkuayu:true
                }).then(res=>{
                    if(res.code==200){
                        vm.$message({
                            message:res.message,
                            type:'success'
                        })
                        vm.$emit('closeHandle')
                    }
                })


            },
        },
        components:{
            upload
        }
    }
</script>

<style scoped lang="scss">
.extend{

}
</style>