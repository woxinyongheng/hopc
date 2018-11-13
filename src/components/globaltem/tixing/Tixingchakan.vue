<template>
    <div class="shebei">
        <div class="dialogcontent">
            <div class="list">
                <table class="dialogtablebox">
                    <tbody>
                    <tr>
                        <td class="table-title">设备类别</td>
                        <td class="table-content">{{selectData.typeName}}</td>
                        <td class="table-title">设备管理员</td>
                        <td class="table-content">{{selectData.eqAdminName}}</td>
                        <td class="table-title"></td>
                        <td class="table-content"></td>
                    </tr>
                    <tr>
                        <td class="table-title">寿命到期提醒(天)</td>
                        <td class="table-content">{{selectData.lifetimeExpiration}}</td>
                        <td class="table-title">质保到期提醒(天)</td>
                        <td class="table-content">{{selectData.qualityExpiration}}</td>
                        <td class="table-title">提醒方式</td>
                        <td class="table-content">
                            <span v-if="selectData.remindWay.indexOf('0')>-1">系统</span>
                            <span v-if="selectData.remindWay.indexOf('1')>-1">短信</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="table-title">备注</td>
                        <td class="table-content" colspan="5">{{selectData.typeName}}</td>
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
        name: "Tixingchakan",
        props:['selectData'],
        data:function () {
            return{
            }
        },
        methods:{
            closeHandle(){
                this.$emit('closeHandle')
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