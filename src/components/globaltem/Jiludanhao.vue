<template>
    <div class="jilu">
        <div class="dialogcontent">
            <p class="label">编号  wx201808290001</p>
            <div class="list">
                <el-steps :active="1" align-center>
                    <el-step title="报修时间" description="2018-08-29 0：30"></el-step>
                    <el-step title="派工时间" description="2018-08-29 0：30"></el-step>
                    <el-step title="维修时间" description="2018-08-29 0：30"></el-step>
                    <el-step title="结束时间" description="2018-08-29 0：30"></el-step>

                </el-steps>
            </div>
            <p class="label">任务信息<i class="el-icon-question"></i></p>

            <p class="label">派工信息<i class="el-icon-question"></i></p>
            <p class="label">挂单信息<i class="el-icon-question"></i></p>
            <p class="label">完工信息<i class="el-icon-question"></i></p>
        </div>
        <div class="dialogfooter">

        </div>
    </div>
</template>

<script>
    export default {
        name: "Jiludanhao",
        data:function () {
            return{
            }
        },
        methods:{

        },

    }
</script>

<style scoped lang="scss">
.jilu{
    height: 600px;
    .dialogcontent{
        height: 500px;
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
            padding: 10px;
        }
    }
    .dialogfooter{

    }
}
</style>