

<template>
    <div class="scrap">
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
                                format="yyyy-MM-dd"
                                value-format="yyyy-MM-dd"
                                @change="changeTimestart"
                                type="date"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-form>
                <el-form :inline="true" :model="formInline" class="demo-form-inline" style="display: flex;justify-content: space-between;margin-left: 25px">
                    <el-form-item label="确认人">
                        <el-select v-model="formInline.confirmPersonCode" placeholder="确认人">
                            <el-option v-for="(item,index) in adminList" :label="item.name" :value="item.id"></el-option>
                        </el-select>
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
                        <upload v-if="!imgurl" style="display: inline-block;vertical-align: middle" @uploadHandle="uploadHandleone"></upload>
                    </el-form-item>
                </el-form>
            </div>
            <div class="label" style="margin: 20px 0">报废详情</div>
            <div class="list">
                <el-form :inline="true" :model="formInline" class="demo-form-inline" style="display: flex;justify-content: left;margin-left: 10px">
                    <el-form-item label="报废确认人" required>
                        <el-input v-model="formInline.scrapConfirmPersonName"></el-input>

                        <!--<el-select v-model="formInline.user" placeholder="报废确认人">-->
                            <!--<el-select v-model="formInline.scrapConfirmPersonName" placeholder="确认人">-->
                                <!--<el-option v-for="(item,index) in adminList" :label="item.name" :value="item.id"></el-option>-->
                            <!--</el-select>-->
                        <!--</el-select>-->
                    </el-form-item>
                    <el-form-item label="报废原因" required>
                        <el-select v-model="formInline.scrapReasonCode" placeholder="报废原因">
                            <el-option v-for="item in scrapeReason" :label="item.dictLabel" :value="item.dictValue"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <el-form :model="formInline" label-width="80px">
                    <el-form-item label="监测报告">
                        <img style="width: 148px;height: 148px;vertical-align: middle"  :src="imgurltwo" alt="">
                        <upload v-if="!imgurltwo" style="display: inline-block;vertical-align: middle" @uploadHandle="uploadHandletwo"></upload>
                    </el-form-item>
                </el-form>
            </div>
            <div class="label" style="margin: 20px 0">报废详处理情</div>
            <div class="list">
                <el-form :inline="true" :model="formInline" class="demo-form-inline" style="display: flex;justify-content: left;margin-left: 10px">
                    <el-form-item label="报废处理人" required>
                        <el-input v-model="formInline.scrapHandlePersonCode"></el-input>

                        <!--<el-select v-model="formInline.scrapHandlePersonCode" placeholder="报废确认人">-->
                            <!--<el-option label="区域一" value="shanghai"></el-option>-->
                            <!--<el-option label="区域二" value="beijing"></el-option>-->
                        <!--</el-select>-->
                    </el-form-item>
                    <el-form-item label="处理方式" required>
                        <el-select v-model="formInline.processModeCode" placeholder="处理方式">
                            <el-option v-for="item in ltyArr" :label="item.dictLabel" :value="item.dictValue"></el-option>
                            <!--<el-option label="废品处理" value="1"></el-option>-->
                            <!--<el-option label="其他处理" value="2"></el-option>-->

                        </el-select>
                    </el-form-item>
                </el-form>
                <el-form :model="formInline" label-width="80px">
                    <el-form-item label="处理文件">
                        <img style="width: 148px;height: 148px;vertical-align: middle"  :src="imgurlthree" alt="">
                        <upload v-if="!imgurlthree" style="display: inline-block;vertical-align: middle" @uploadHandle="uploadHandlethree"></upload>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="dialogfooter" style="text-align: right;margin-top: 20px">
            <el-button  size="small" @click="cancleScrap">取消</el-button>
            <el-button type="primary" size="small" @click="sureScrap">确认</el-button>
        </div>
    </div>
</template>

<script>
    import upload from '@/components/globaltem/UpLoad'

    export default {
        name: "scrapTem",
        props:['operateRow','adminList','clear','scrapeReason','ltyArr'],
        data:function () {
            return{
                formInline: {
                    user: JSON.parse(localStorage.getItem('LOGINDATA')).name,
                    businessTime: '',
                    confirmPersonCode:'', //confirmPersonName
                    remarks:'',
                    scrapConfirmPersonName:'',
                    scrapReasonCode:'',//scrapReason
                    monitoringContentAttachmentUrl:'',
                    scrapHandlePersonCode:'',
                    handleContentAttachmentUrl:''
                },
                imgurl:'',
                imgurltwo:'',
                imgurlthree:''
            }
        },
        mounted(){
            this.formInline={
                user: JSON.parse(localStorage.getItem('LOGINDATA')).name,
                    businessTime: '',
                    confirmPersonCode:'', //confirmPersonName
                    remarks:'',
                    scrapConfirmPersonName:'',
                    scrapReasonCode:'',//scrapReason
                    monitoringContentAttachmentUrl:'',
                    scrapHandlePersonCode:'',
                    handleContentAttachmentUrl:''
            }
            this.imgurl=''
                this.imgurltwo=''
                this.imgurlthree=''
        },
        methods:{
            changeTimestart(val){
                this.formInline.businessTime=val
            },
            uploadHandleone(file,url,type){
                this.formInline.contentAttachmentUrl=file
                this.imgurl=url
            },
            uploadHandletwo(file,url,type){
                this.formInline.monitoringContentAttachmentUrl=file
                this.imgurltwo=url
            },
            uploadHandlethree(file,url,type){
                this.formInline.handleContentAttachmentUrl=file
                this.imgurlthree=url
            },

            //    报废
            cancleScrap(){
                this.$emit('closeHandle')

            },
            sureScrap(){
                let vm =this
                let _i = vm.adminList.findIndex(function (item) {
                    return item.id==vm.formInline.confirmPersonCode
                })
                if(_i>-1){
                    vm.formInline.confirmPersonName = vm.adminList[_i].name
                }
                let _r = vm.scrapeReason.findIndex(function (item) {
                    return item.dictValue == vm.formInline.scrapReasonCode
                })
                if(_r>-1){
                    debugger
                    vm.formInline.scrapReason = vm.scrapeReason[_r].dictLabel
                }

                let _j = vm.ltyArr.findIndex(function (item) {
                    return item.dictValue == vm.formInline.processModeCode
                })
                if(_j>-1){
                    vm.formInline.processModeName = vm.ltyArr[_r].dictLabel
                }


                vm.$http.post('equipmentListController/equipmentScrapDisposition',{
                    equipmentId:vm.operateRow.assetsCode,
                    businessTime:vm.formInline.businessTime,
                    scrapConfirmPersonName:vm.formInline.scrapConfirmPersonName,
                    scrapHandlePersonName:vm.formInline.scrapHandlePersonName,
                    confirmPersonCode:vm.formInline.confirmPersonCode,

                    confirmPersonName:vm.formInline.confirmPersonName,

                    scrapConfirmPersonCode:vm.formInline.scrapConfirmPersonCode,

                    scrapReasonCode:vm.formInline.scrapReasonCode,

                    scrapReason:vm.formInline.scrapReason,

                    monitoringContentAttachmentUrl:vm.formInline.monitoringContentAttachmentUrl,
                    scrapHandlePersonCode:vm.formInline.scrapHandlePersonCode,
                    processModeCode:vm.formInline.processModeCode,
                    processModeName:vm.formInline.processModeName,
                    handleContentAttachmentUrl:vm.formInline.handleContentAttachmentUrl,
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

            },
        },
        components:{
            upload
        },
        watch:{
            clear:function () {
                this.formInline={
                    user: JSON.parse(localStorage.getItem('LOGINDATA')).name,
                    businessTime: '',
                    confirmPersonCode:'', //confirmPersonName
                    remarks:'',
                    scrapConfirmPersonName:'',
                    scrapReasonCode:'',//scrapReason
                    monitoringContentAttachmentUrl:'',
                    scrapHandlePersonCode:'',
                    handleContentAttachmentUrl:''
                }
                this.imgurl=''
                this.imgurltwo=''
                this.imgurlthree=''
            }
        }
    }
</script>

<style scoped lang="scss">
    .scrap{

    }
</style>