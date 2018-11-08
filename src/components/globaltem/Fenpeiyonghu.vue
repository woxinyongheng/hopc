<template>
    <div class="yonghu">
        <div class="dialogcontent">
            <div class="list">
                <el-row :gutter="40">
                    <el-col :span="6"><div class="grid-content" style="height: 560px;overflow-y: scroll;background-color:#545c64;">
                        <el-menu
                                default-active="0"
                                class="el-menu-vertical-demo"
                                background-color="#545c64"
                                text-color="#fff"
                                active-text-color="#409EFF">
                            <el-submenu :index="index+''" v-for="(item,index) in roleTree" v-if="item.children">
                                <template slot="title">
                                    <span>{{item.name}}</span>
                                </template>
                                <el-menu-item-group >
                                    <el-menu-item v-if="item.children" :index="index+'-'+ii" v-for="(it,ii) in item.children">{{it.name}}</el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-menu-item :index="index+''" v-for="(item,index) in roleTree" v-if="!item.children">
                                <i class="el-icon-menu"></i>
                                <span slot="title">{{item.name}}</span>
                            </el-menu-item>

                        </el-menu>
                        <!--<el-tree :data="distributionUserdata" :props="defaultProps"></el-tree>-->
                    </div></el-col>
                    <el-col :span="18"><div class="grid-content">
                        <div class="filter">
                            <el-row style="border-bottom: 10px solid #E9EEF3">
                                <el-col :span="15"><div class="grid-content">
                                    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
                                        <el-form-item label="用户名">
                                            <el-input v-model="formInline.user" placeholder="用户名"></el-input>
                                        </el-form-item>
                                    </el-form>
                                </div></el-col>
                                <el-col :span="9" ><div class="grid-content" style="text-align: right;">
                                    <el-button type="primary" @click="searchClick" size="mini">查询</el-button>
                                    <el-button  @click="searchClick" size="mini">重置</el-button>
                                </div></el-col>
                            </el-row>
                        </div>
                        <el-table
                                ref="multipleTable"
                                align="center"
                                :data="roleData"
                                tooltip-effect="dark"
                                style="width: 100%">
                            <el-table-column
                                    label="序号"
                                    align="center"
                                    type="index">
                            </el-table-column>
                            <el-table-column
                                    prop="name"
                                    align="center"
                                    label="登录名">
                            </el-table-column>
                            <el-table-column
                                    prop="name"
                                    align="center"
                                    label="用户名">
                            </el-table-column>
                            <el-table-column
                                    prop="name"
                                    align="center"
                                    label="性别">
                            </el-table-column>
                            <el-table-column
                                    prop="name"
                                    align="center"
                                    label="所属科室">
                            </el-table-column>
                        </el-table>
                    </div></el-col>
                </el-row>

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
        name: "Renwufenpei",
        props:['roleTree'],
        data:function () {
            return{
                roleData:[{name:'运保主管',id:1,status:0},{name:'运保主管',id:2,status:1},{name:'运保主管',id:3,status:0}],
                formInline:{
                    user:'',
                    region:''
                },
                defaultProps: {
                    children: 'children',
                    label: 'name'
                }

            }
        },
        mounted(){
          let vm =this
        },
        methods:{
            searchClick(){

            },
            closeHandle(){
                this.$emit('closeHandle')
            },
        },
    }
</script>

<style scoped lang="scss">
    .yonghu{
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