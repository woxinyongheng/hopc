<template>
    <div class="warr">
        <div class="dialogcontent">
            <div class="list">
                <el-form :inline="true" :model="formInline" class="demo-form-inline" style="display: flex;justify-content: space-between;margin-left: 25px">
                    <el-form-item label="记录号">
                        <el-input v-model="formInline.user"></el-input>
                    </el-form-item>
                    <el-form-item label="处理人" >
                        <el-input v-model="formInline.user"></el-input>
                    </el-form-item>
                    <el-form-item label="处理日期" required>
                        <el-date-picker
                                v-model="formInline.user"
                                type="date"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-form>
                <el-form ref="form" :model="formInline" label-width="80px"  style="padding-right: 10px">
                    <el-form-item label="处理说明">
                        <el-input type="textarea" v-model="formInline.user"></el-input>
                    </el-form-item>
                </el-form>
                <el-form :model="formInline" label-width="80px">
                    <el-form-item label="相关附件">

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
    export default {
        name: "warrTem",
        data:function () {
            return{
                formInline: {
                    user: '',
                    region: ''
                }
            }
        },
        methods:{
            //    质保到期
            cancleWarr(){
               this.$emit('closeHandle')
            },
            sureWarr(){
                this.$emit('closeHandle')
            },
        }
    }
</script>

<style scoped lang="scss">
    .warr{

    }
</style>