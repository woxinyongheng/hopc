<template>
    <div class="shebei">
        <div class="dialogcontent">
            <div class="list">
                <table class="dialogtablebox">
                    <tbody>
                    <tr>
                        <td class="table-title">设备编码</td>
                        <td class="table-content"></td>
                        <td class="table-title">设备管理员</td>
                        <td class="table-content"></td>
                        <td class="table-title"></td>
                        <td class="table-content"></td>
                    </tr>
                    <tr>
                        <td class="table-title">备注</td>
                        <td class="table-content" colspan="5"></td>
                    </tr>

                    </tbody>
                </table>
            </div>
        </div>
        <div class="dialogfooter" style="display: flex;justify-content: space-between">
            <el-button type="primary" size="small" @click="editHandle">编辑</el-button>
            <el-button  size="small" @click="closeHandle">关闭</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Shebeileibie",
        data:function () {
            return{
            }
        },
        methods:{
            closeHandle(){
                this.$emit('closeShebeiHandle')
            },
            editHandle(){
                this.$emit('editHandle')
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
            .list{
                padding: 10px 0;
            }
        }
        .dialogfooter{

        }
    }
</style>