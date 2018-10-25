<template>
    <div class="shebei">
        <div class="dialogcontent">
            <div class="list">
                <el-form :inline="true" label-width="120px" :model="formInline" class="demo-form-inline" style="display: flex;justify-content: left;margin-left: 10px">
                    <el-form-item label="设备类型" >
                        <el-input v-model="formInline.user"></el-input>
                    </el-form-item>
                    <el-form-item label="设备管理员" >
                        <el-input v-model="formInline.user"></el-input>
                    </el-form-item>
                    <el-form-item label="提醒方式" required>
                        <el-select v-model="formInline.region" placeholder="提醒方式" required>
                            <el-option label="系统/短息" value="1"></el-option>
                            <el-option label="系统" value="2"></el-option>
                            <el-option label="短息" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <el-form :inline="true" label-width="120px" :model="formInline" class="demo-form-inline" style="display: flex;justify-content: left;margin-left: 10px">
                    <el-form-item label="寿命到期提醒" required class="houzhui">
                        <el-input type="number" v-model="formInline.user" >
                            <template slot="append">天</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="质保到期提醒" required class="houzhui">
                        <el-input type="number"   v-model="formInline.user">
                            <template slot="append">天</template>
                        </el-input>
                    </el-form-item>
                </el-form>
                <el-form ref="form" label-width="120px" :model="formInline"   style="margin-left: 10px;padding-right: 40px">
                    <el-form-item label="备注">
                        <el-input type="textarea" v-model="formInline.user"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="dialogfooter" style="text-align: right">
            <el-button type="primary" size="small" @click="closeHandle">确认</el-button>
            <el-button  size="small" @click="closeHandle">取消</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Tixingshezhi",
        data:function () {
            return{
                activeName:'first',
                tableData:[
                    {
                        date: '2016-05-04',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1517 弄'
                    },{
                        date: '2016-05-04',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1517 弄'
                    },{
                        date: '2016-05-04',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1517 弄'
                    },
                ],
                formInline: {
                    user: '',
                    region: ''
                }
            }
        },
        methods:{
            closeHandle(){
                this.$emit('closeHandle')
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