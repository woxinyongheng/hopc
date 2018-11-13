<template>
    <div class="shebei">
        <div class="dialogcontent">
            <div class="list">
                <el-form :inline="true" :model="formInline" class="demo-form-inline" style="display: flex;justify-content: space-between;margin-left: 3px">
                    <el-form-item label="规格型号" required class="modelreg">
                        <el-input v-model="formInline.model"></el-input>
                    </el-form-item>
                    <el-form-item label="所在区域" required class="areareg">
                        <el-cascader
                                v-model="selectAreaarr"
                                change-on-select
                                :options="areaList"
                                @change="handleAreaChange"
                                :props="propsArea"
                        ></el-cascader>
                    </el-form-item>
                    <el-form-item label="存放位置" required class="localreg">
                        <el-input v-model="formInline.storageLocation"></el-input>
                    </el-form-item>
                </el-form>
                <el-form ref="form" :model="formInline" label-width="80px"  style="padding-right: 10px;">

                    <el-form-item label="备注">
                        <el-input type="textarea" v-model="formInline.remarks"></el-input>
                    </el-form-item>
                </el-form>
                <el-form :model="formInline" label-width="80px" >
                    <el-form-item label="照片" required class="picreg">
                        <img style="width: 80px;height: 80px;" v-if="imgurl" :src="imgurl" alt="">
                        <upload v-if="!imgurl" @uploadHandle="uploadHandle"></upload>
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
    import upload from '@/components/globaltem/UpLoad'
    export default {
        name: "Shebeibianji",
        props:['areaList','deviceData','id'],
        data:function () {
            return{
                propsArea:{
                    label:'gridName',
                    value:'id',
                    children:'children'
                },
                formInline: {
                    model: '',
                    areaCode:'',
                    storageLocation:'',
                    remarks:'',
                    picture:''
                },
                selectAreaarr:[],
                imgurl:''
            }
        },
        mounted(){
            this.imgurl = this.deviceData.picture
            this.formInline.model = this.deviceData.model
            this.formInline.areaCode = this.deviceData.areaCode
            this.formInline.storageLocation = this.deviceData.storageLocation
            this.formInline.remarks = this.deviceData.remarks
        },
        methods:{
            sureHandle(){
                let vm =this
                if(!this.formInline.model){
                    vm.$message.error('请输入规格型号')
                    document.querySelector('.modelreg').className = 'table-content modelreg el-form-item is-error'
                    return
                }
                if(!this.formInline.areaCode){
                    vm.$message.error('请选择所在区域')
                    document.querySelector('.areareg').className = 'table-content areareg el-form-item is-error'
                    return
                }
                if(!this.formInline.storageLocation){
                    vm.$message.error('请输入存放位置')
                    document.querySelector('.localreg').className = 'table-content localreg el-form-item is-error'
                    return
                }
                if(!this.formInline.picture){
                    vm.$message.error('请上传图片')
                    return
                }
                let params =vm.deviceData
                params.flagkuayu='true'
                vm.$http.post(__PATH.OTHPATH+'assetsInfo/save',params,true).then(res=>{
                    if(res.code=='200'){
                        vm.$message({
                            message: res.message,
                            type: 'success'
                        });
                        vm.$emit('closeShebeiHandle','add')
                    }
                })

            },
            uploadHandle(file,url,type){
                this.formInline.picture = file
                this.imgurl = url
            },
            closeHandle(){
                this.$emit('closeShebeiHandle')
            },
            //区域选择
            handleAreaChange(val){
                var vm =this
                this.formInline.areaCode = val[val.length-1]
            },
        },
        components:{
            upload
        },
        watch:{
            id:function () {
                this.imgurl = this.deviceData.picture
                this.formInline.model = this.deviceData.model
                this.formInline.areaCode = this.deviceData.areaCode
                this.formInline.storageLocation = this.deviceData.storageLocation
                this.formInline.remarks = this.deviceData.remarks
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