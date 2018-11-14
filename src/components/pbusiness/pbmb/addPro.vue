<template>
    <div class="addpro">
        <div class="dialogcontent">
            <div class="list">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item label="计划名称" required>
                        <el-input v-model="formInline.projectName"></el-input>
                    </el-form-item>
                    <el-form-item label="设备类别" style="margin-left: 50px" required>
                        <el-select v-model="formInline.equipmentTypeId" placeholder="设备类别">
                            <el-option v-for="(item,index) in typeList" :label="item.typeName" :value="item.typeId"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <el-form ref="form" :model="formInline" label-width="80px"  style="padding-right: 10px">

                    <el-form-item label="项目说明">
                        <el-input type="textarea" v-model="formInline.projectExplain"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <p class="label">保养项目设置</p>
            <div class="list">
                <table class="dialogtablebox">
                    <tbody>
                    <tr>
                        <td class="table-title">序号</td>
                        <td class="table-title" colspan="4">保养内容</td>
                        <td class="table-title">操作</td>
                    </tr>
                    <tr v-for="(item,index) in addItemList">
                        <td class="table-title">{{index+1}}</td>
                        <td class="table-content" colspan="4">
                            <el-input v-model="item.content" placeholder="请填写保养内容"></el-input>
                        </td>
                        <td class="table-content"><span class="btnadd" @click="addList(index)">添加行</span><span @click="deleteList(index)" v-if="index!=0" class="btndelete">删除</span></td>
                    </tr>



                    </tbody>
                </table>
            </div>
        </div>
        <div class="dialogfooter" style="text-align: right">
            <el-button type="primary" size="small" @click="sureClick">确认</el-button>
            <el-button  size="small" @click="closeHandle">取消</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "addPro",
        props:['typeList'],
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
            sureClick(){
              let vm =this
              vm.$http.post('maintainProjectController/addMaintainProject',{
                  projectName:vm.formInline.projectName,
                  equipmentTypeId:vm.formInline.equipmentTypeId,
                  projectExplain:vm.formInline.projectExplain,
                  content:JSON.stringify(vm.addItemList)
              }).then(res=>{
                  debugger
              })
            },
            closeHandle(){
                this.$emit('closeHandle')
            },
            addList(i){
                this.addItemList.splice(i+1, 0, {content:''});
            },
            deleteList(i){
                this.addItemList.splice(i, 1);
            }
        },

    }
</script>

<style scoped lang="scss">
    .addpro{
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