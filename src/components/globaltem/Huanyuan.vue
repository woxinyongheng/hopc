<template>
    <div class="shebei">
        <div class="dialogcontent">
            <p>确认还原此设备吗？</p>
        </div>
        <div class="dialogfooter" style="text-align: right">
            <el-button type="primary" size="small" @click="sureHandle">确定</el-button>
            <el-button  size="small" @click="closeHandle">关闭</el-button>

        </div>
    </div>
</template>

<script>
    export default {
        name: "Huanyuan",
        data:function () {
            return{
            }
        },
        methods:{
            closeHandle(){
                this.$emit('closeHuanyuanHandle')
            },
            sureHandle(){
                let vm = this
                vm.$http.post().then(res=>{
                    if(res.code==200){
                        vm.$message({
                            message:res.message,
                            type:'success'
                        })
                        vm.$emit('closeHuanyuanHandle',true)
                    }
                })
            }
        },

    }
</script>

<style scoped lang="scss">
    .shebei{
        height: 300px;
        .dialogcontent{
           p{
               text-align: center;
               font-size: 18px;
               height: 280px;
               line-height: 280px;
           }
        }
        .dialogfooter{

        }
    }
</style>