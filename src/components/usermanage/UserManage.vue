<template>
    <div class="usermanage">
        <div class="banner">
            <el-row>
                <el-col :span="12"><div class="grid-content  bannerleft">
                    <el-button type="primary" @click="distributionUserClick">分配用户</el-button>
                    <el-button>导出</el-button>
                </div></el-col>
                <el-col :span="12" v-if="lookId"><div class="grid-content  bannerright">
                    <el-button @click="filterShow=!filterShow">检索</el-button>
                </div></el-col>
            </el-row>
        </div>
        <div class="content">
            <el-row :gutter="40">
                <el-col :span="gridspan"><div class="grid-content">
                    <div class="contentheader">
                        角色信息
                    </div>
                    <el-table
                            ref="multipleTable"
                            align="center"
                            :data="roleData"
                            tooltip-effect="dark"
                            style="width: 100%">
                        <el-table-column
                                type="selection"
                                align="center"
                                width="55">
                        </el-table-column>
                        <el-table-column
                                label="序号"
                                align="center"
                                type="index">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                align="center"
                                label="角色名称">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                align="center"
                                label="操作">
                            <template slot-scope="scope">
                                <el-button type="primary" @click="lookUser(scope.row.id)">查看用户</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div></el-col>
                <el-col :span="24-gridspan"><div class="grid-content">
                    <div class="filter" v-if="filterShow">
                        <el-row>
                            <el-col :span="18"><div class="grid-content">
                                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                                    <el-form-item label="登录名">
                                        <el-input v-model="formInline.user" placeholder="登录名"></el-input>
                                    </el-form-item>
                                    <el-form-item label="姓名">
                                        <el-input v-model="formInline.user" placeholder="姓名"></el-input>
                                    </el-form-item>
                                    <el-form-item label="所属部门">
                                        <el-select v-model="formInline.region" placeholder="所属部门">
                                            <el-option label="区域一" value="shanghai"></el-option>
                                            <el-option label="区域二" value="beijing"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="状态">
                                        <el-select v-model="formInline.region" placeholder="状态">
                                            <el-option label="启用" value="shanghai"></el-option>
                                            <el-option label="禁用" value="beijing"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-form>
                            </div></el-col>
                            <el-col :span="6"><div class="grid-content filterright">
                                <el-button type="primary" @click="searchClick">查询</el-button>
                                <el-button  @click="searchClick">重置</el-button>
                            </div></el-col>
                        </el-row>
                    </div>
                    <div class="contentheader">
                        用户信息
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
                                label="所属部门">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                align="center"
                                label="上级机构">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                align="center"
                                label="状态">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                align="center"
                                label="启用/禁用">
                            <template slot-scope="scope">
                                <el-switch
                                        v-model="scope.row.status==1">
                                </el-switch>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                align="center"
                                label="操作">
                            <template slot-scope="scope">
                                <el-button type="primary" @click="deleteUser(scope.row.id)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="paginationbox">
                        <el-pagination
                                layout="prev, pager, next"
                                :total="50">
                        </el-pagination>
                    </div>
                </div></el-col>
            </el-row>
        </div>
        <!--删除对话框-->
        <el-dialog
                title="提示"
                :visible.sync="deleteDialogVisible"
                width="30%"
                center>
            <span>确认要删除该用户吗？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deleteDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="sureDeleteClick">确 定</el-button>
              </span>
        </el-dialog>
        <!--分配用户-->
        <el-dialog
                title="分配用户"
                :visible.sync="distributionUser"
                width="50%">
            <div>
                <el-row :gutter="40">
                    <el-col :span="6"><div class="grid-content">
                        <el-tree :data="distributionUserdata" :props="defaultProps"></el-tree>
                    </div></el-col>
                    <el-col :span="18"><div class="grid-content">
                        <div class="filter">
                            <el-row>
                                <el-col :span="15"><div class="grid-content">
                                    <el-form :inline="true" :model="formInline" class="demo-form-inline">
                                        <el-form-item label="用户名">
                                            <el-input v-model="formInline.user" placeholder="用户名"></el-input>
                                        </el-form-item>
                                    </el-form>
                                </div></el-col>
                                <el-col :span="9"><div class="grid-content filterright">
                                    <el-button type="primary" @click="searchClick">查询</el-button>
                                    <el-button  @click="searchClick">重置</el-button>
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
            <span slot="footer" class="dialog-footer">
            <el-button @click="distributionUser = false">取 消</el-button>
            <el-button type="primary" @click="distributionUserClickSure">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "UserManage",
        data:function(){
            return{
                gridspan:24,
                lookId:'',
                roleData:[{name:'运保主管',id:1,status:0},{name:'运保主管',id:2,status:1},{name:'运保主管',id:3,status:0}],
                formInline:{
                    user:'',
                    region:''
                },
                deleteDialogVisible:false,
                deleteId:'',
                filterShow:false,
                // 分配用户
                distributionUser:false,
                distributionUserdata: [{
                    label: '一级 1',
                    children: [{
                        label: '二级 1-1',
                    }]
                }, {
                    label: '一级 2',
                    children: [{
                        label: '二级 2-1',
                    }, {
                        label: '二级 2-2',
                    }]
                }, {
                    label: '一级 3',
                    children: [{
                        label: '二级 3-1',
                    }, {
                        label: '二级 3-2',
                    }]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            }
        },
        mounted(){

        },
        methods:{
            //筛选
            searchClick(){

            },
            lookUser(id){
                let vm =this
                vm.gridspan = 8
                vm.lookId = id
            },

            deleteUser(id){
                this.deleteId = id
                this.deleteDialogVisible = true
            },
            sureDeleteClick(){
                this.deleteDialogVisible = false
            },
            //分配用户
            distributionUserClick(){
                this.distributionUser =true
            },
            distributionUserClickSure(){

            }

        }

    }
</script>

<style scoped lang="scss">
.usermanage{
    .contentheader{
        height: 48px;
        line-height: 48px;
        padding-left: 10px;
        text-align: left;
        background-color: #66a3ff;
        color: #fff;
    }
}
</style>