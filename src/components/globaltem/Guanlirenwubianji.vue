
<template>
    <div class="shebei">
        <div class="dialogcontent">
            <div class="list">
                <el-form ref="form" :model="formInline" label-width="100px"  style="padding-right: 10px">
                    <el-form-item label="报修说明">
                        <el-input disabled v-model="formInline.user"></el-input>
                    </el-form-item>
                    <el-form-item :label="judgeUser?'责任归属':'设备管理员'" required>
                        <el-select v-model="formInline.user" :placeholder="judgeUser?'责任归属':'设备管理员'">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
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
        name: "Guanlirenwubianji",
        props:['judgeUser'],
        data:function () {
            return{
                formInline: {
                    user: '',
                    region: ''
                }
            }
        },
        methods:{
            closeHandle(){
                this.$emit('closeShebeiHandle')
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