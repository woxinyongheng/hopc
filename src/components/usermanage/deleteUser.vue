<template>
    <div class="deleteuser">
        <div class="dialogcontent">
            <div class="list">
                <span>确认要删除该用户吗？</span>
            </div>

        </div>

        <div class="dialogfooter" style="text-align: right">
            <el-button type="primary" size="small" @click="closeHandle">取 消</el-button>
            <el-button type="primary" size="small" @click="sureDeleteClick">确 定</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "deleteUser",
        data:function () {
            return{
            }
        },
        methods:{
            closeHandle(){
                this.$emit('closeHandle')
            },
            sureDeleteClick(){

            }
        },

    }
</script>

<style scoped lang="scss">
    .deleteuser{
        height: 200px;
        .dialogcontent{
            height: 180px;
            text-align: center;
            line-height: 160px;
            font-size: 20px;
            font-weight: bold;
            overflow-y: scroll;
            .list{
                padding: 10px 0;
            }
        }
        .dialogfooter{

        }
    }
</style>