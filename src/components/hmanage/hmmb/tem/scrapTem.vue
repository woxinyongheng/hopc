

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
                            <el-option label="彻底损坏" value="0"></el-option>
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
                            <el-option label="拍卖" value="0"></el-option>
                            <el-option label="废品处理" value="1"></el-option>
                            <el-option label="其他处理" value="2"></el-option>

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
        props:['operateRow','adminList'],
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
        methods:{
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
                vm.$http.post('equipmentListController/equipmentScrapDisposition',{
                    equipmentId:vm.operateRow.assetsCode,
                    businessTime:vm.formInline.businessTime,
                    scrapConfirmPersonName:vm.formInline.scrapConfirmPersonName,
                    scrapHandlePersonName:vm.formInline.scrapConfirmPersonName,
                    confirmPersonCode:vm.formInline.scrapConfirmPersonName,

                    confirmPersonName:vm.formInline.scrapConfirmPersonName,

                    scrapConfirmPersonCode:vm.formInline.scrapConfirmPersonName,

                    scrapReasonCode:vm.formInline.scrapConfirmPersonName,

                    scrapReason:vm.formInline.scrapConfirmPersonName,

                    monitoringContentAttachmentUrl:vm.formInline.scrapConfirmPersonName,
                    scrapHandlePersonCode:vm.formInline.scrapConfirmPersonName,
                    processModeCode:vm.formInline.scrapConfirmPersonName,
                    processModeName:vm.formInline.scrapConfirmPersonName,
                    handleContentAttachmentUrl:vm.formInline.scrapConfirmPersonName,
                    remarks:vm.formInline.scrapConfirmPersonName,
                    contentAttachmentUrl:vm.formInline.scrapConfirmPersonName,
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
    .scrap{

    }
</style>