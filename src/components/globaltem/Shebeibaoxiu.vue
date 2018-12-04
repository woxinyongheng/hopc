<template>
    <div class="shebei">
        <div class="dialogcontent">
            <div class="list">
                <el-form :inline="true" :model="formInline" class="demo-form-inline" style="display: flex;justify-content: space-between;margin-left: 10px">
                    <el-form-item label="报修日期" required>
                        <el-date-picker
                                v-model="formInline.reportTime"
                                type="date"
                                format="yyyy-MM-dd"
                                @change="changeTime"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="报修人" required>
                        <el-input v-model="formInline.reportPersonName"></el-input>
                        <!--<el-select v-model="formInline.reportPersonCode" placeholder="报修人">-->
                            <!--<el-option v-for="item in customList" :label="item.name" :value="item.staffId"></el-option>-->
                        <!--</el-select>-->
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
                        <vueaudio v-if="audiourl" :audiourl="audiourl"></vueaudio>
                        <span style="display:inline-block;width: 148px;height: 148px;vertical-align: middle;position: relative;" v-for="(item,index) in imgurl">
                           <img style="width: 148px;height: 148px;vertical-align: middle"   :src="item" alt="">
                            <img @click="deleteImg(index)" style="width: 30px;height: 30px;position: absolute;top: 0px;right: 0px;z-index: 999;background-color:#fff;" src="../../../static/images/close.png" alt="">
                        </span>
                        <upload style="display: inline-block;vertical-align: middle" @uploadHandle="uploadHandle"></upload>
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
    import vueaudio  from '@/components/globaltem/Audio'
    export default {
        name: "Shebeibaoxiu",
        props:['selectData','clear'],
        data:function () {
            return{
                activeName:'first',
                formInline: {
                    reportTime:'',
                    reportPersonCode:JSON.parse(localStorage.getItem('LOGINDATA')).id,
                    reportPersonName:JSON.parse(localStorage.getItem('LOGINDATA')).name,
                    reportPersonPhone:JSON.parse(localStorage.getItem('LOGINDATA')).phone,
                    repairExplain:'',
                    repairContentAttachmentUrl:'',
                    repairAttachmentUrl:[],
                },
                customList:[],
                imgurl:[],
                audiourl:''
            }
        },
        mounted(){
            this.imgurl=[]
            this.audiourl=''
            this.formInline={
                reportTime:'',
                reportPersonCode:JSON.parse(localStorage.getItem('LOGINDATA')).id,
                reportPersonName:JSON.parse(localStorage.getItem('LOGINDATA')).name,
                reportPersonPhone:JSON.parse(localStorage.getItem('LOGINDATA')).phone,
                repairExplain:'',
                repairContentAttachmentUrl:'',
                repairAttachmentUrl:[],
            }
        },
        watch:{
            clear:function () {
                this.imgurl=[]
                this.audiourl=''
                this.formInline={
                    reportTime:'',
                    reportPersonCode:JSON.parse(localStorage.getItem('LOGINDATA')).id,
                    reportPersonName:JSON.parse(localStorage.getItem('LOGINDATA')).name,
                    reportPersonPhone:JSON.parse(localStorage.getItem('LOGINDATA')).phone,
                    repairExplain:'',
                    repairContentAttachmentUrl:'',
                    repairAttachmentUrl:[],
                }
            }
        },
        methods:{
            deleteImg(i){
                this.imgurl.splice(i,1)
                this.formInline.repairAttachmentUrl.splice(i,1)
            },
            changeTime(val){
                this.formInline.reportTime=val
            },
            uploadHandle(file,url,type){
                if(type=='image'){
                    this.formInline.repairAttachmentUrl.push(file)
                    this.imgurl.push(url)
                }else{
                    this.formInline.repairContentAttachmentUrl=file
                    this.audiourl = url
                }
            },
            closeHandle(){
                this.$emit('closeShebeiHandle')
            },
            sureRepair(){
                let vm =this
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
                    equipmentId:vm.selectData[0].equipmentId,
                    flagkuayu:true
                }).then(res=>{
                    if(res.code==200){
                        vm.$message({
                            message: res.message,
                            type: 'success'
                        });
                        vm.$emit('closeShebeiHandle',true)
                    }
                })
            }
        },
        components:{
            upload,vueaudio
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