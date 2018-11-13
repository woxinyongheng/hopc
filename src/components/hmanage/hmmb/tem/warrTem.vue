<template>
    <div class="warr">
        <div class="dialogcontent">
            <div class="list">
                <el-form :inline="true" :model="formInline" class="demo-form-inline" style="display: flex;justify-content: space-between;margin-left: 25px">
                    <el-form-item label="记录号">
                        <el-input disabled v-model="operateRow.assetsCode"></el-input>
                    </el-form-item>
                    <el-form-item label="处理人" >
                        <el-input disabled v-model="formInline.user"></el-input>
                    </el-form-item>
                    <el-form-item label="处理日期" required>
                        <el-date-picker
                                v-model="formInline.businessTime"
                                type="date"
                                placeholder="选择日期">
                        </el-date-picker>
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
            <el-button  size="small" @click="cancleWarr">取消</el-button>
            <el-button type="primary" size="small" @click="sureWarr">确认</el-button>
        </div>
    </div>
</template>

<script>
    import upload from '@/components/globaltem/UpLoad'

    export default {
        name: "warrTem",
        props:['operateRow'],
        data:function () {
            return{
                formInline: {
                    user: JSON.parse(localStorage.getItem('LOGINDATA')).name,
                    businessTime: '',
                    remarks:'',
                    contentAttachmentUrl:''
                },
                imgurl:''
            }
        },
        methods:{
            uploadHandle(file,url,type){
                this.formInline.contentAttachmentUrl=file
                this.imgurl=url
            },
            //    质保到期
            cancleWarr(){
               this.$emit('closeHandle')
            },
            sureWarr(){
                let vm =this
                if(!vm.formInline.businessTime){
                    vm.$message({
                        message:'请选择业务日期',
                        type:'warning'
                    })
                    return
                }
                vm.$http.post('equipmentListController/equipmentWarrantyExpires',{
                    equipmentId:vm.operateRow.assetsCode,
                    businessTime:vm.formInline.businessTime,
                    remarks:vm.formInline.remarks,
                    contentAttachmentUrl:vm.formInline.contentAttachmentUrl,
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
                // this.$emit('closeHandle')
            },
        },
        components:{
            upload
        }
    }
</script>

<style scoped lang="scss">
    .warr{

    }
</style>