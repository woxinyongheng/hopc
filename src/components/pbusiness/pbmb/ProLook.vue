<template>
    <div class="prolook">
        <div class="dialogcontent">
            <div class="list">
                <table class="dialogtablebox">
                    <tbody>
                    <tr>
                        <td class="table-title">项目编号</td>
                        <td class="table-content" >{{editData.data.number}}</td>
                        <td class="table-title">项目名称</td>
                        <td class="table-content" >{{editData.data.projectName}}</td>
                        <td class="table-title">设备类别</td>
                        <td class="table-content" colspan="5" >{{editData.data.equipmentType}}</td>
                    </tr>
                    <tr>
                        <td class="table-title">项目说明</td>
                        <td class="table-content" colspan="5">{{editData.data.projectExplain}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <p class="label">保养项目设置</p>
            <div class="list">
                <table class="dialogtablebox">
                    <tbody>
                    <tr>
                        <td class="table-title">序号</td>
                        <td class="table-title" colspan="5">保养内容</td>
                    </tr>
                    <tr v-for="(item,index) in editData.details">
                        <td class="table-title">{{index+1}}</td>
                        <td class="table-content" colspan="4">
                            {{item.content}}
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="dialogfooter" style="display: flex;justify-content: space-between">
            <el-button type="primary" size="small" @click="closeHandle('edit')">编辑</el-button>
            <el-button  size="small" @click="closeHandle">关闭</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ProLook",
        props:['editData'],
        data:function () {
            return{
                formInline: {
                    user: '',
                    region: '',
                    tree:[]
                },
                options: [{
                    label: '江苏',
                    cities: []
                }, {
                    label: '浙江',
                    cities: []
                }],
                props: {
                    value: 'label',
                    children: 'cities'
                },
                addItemList:[{content:''}]
            }
        },
        methods:{
            closeHandle(str){
                this.$emit('closeHandle',str)
            },
            addList(i){
                this.addItemList.splice(i, 0, {content:''});
            },
            deleteList(i){
                this.addItemList.splice(i, 1);
            }
        },

    }
</script>

<style scoped lang="scss">
    .prolook{
        height: 600px;
        .btnadd{
            color: #0c7ff2;
            cursor: pointer;
            margin-right: 10px;
        }
        .btndelete{
            color: #e6a23c;
            cursor: pointer;


        }
        .dialogcontent{
            height: 580px;
            overflow-y: scroll;
            .label{
                background-color: #E9EEF3;
                height: 40px;
                line-height: 40px;
                padding-left: 10px;
                position: relative;
                span{
                    position: absolute;
                    cursor: pointer;

                }
                span:nth-of-type(1){
                    right: 60px;
                    color: #0c7ff2;

                }
                span:nth-of-type(2){
                    right: 10px;
                    color: #e6a23c;

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