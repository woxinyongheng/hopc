<template>
    <div class="usermanage">
        <div class="righttitle">
            <p>用户管理</p>
        </div>
        <div class="buttonbox">
            <div class="pullleft">
                <el-button type="primary" size="mini" @click="distributionUserClick">分配用户</el-button>
                <el-button type="warning" size="mini">导出</el-button>
            </div>
            <div class="pullright">
                <el-button @click="filterShow=!filterShow" type="success" size="mini" icon="el-icon-search">检索</el-button>
            </div>
        </div>
        <div class="filterbox">
            <el-row>
                <el-col :span="21"><div class="grid-content">
                    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
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
                <el-col :span="3"><div class="grid-content searchbox">
                    <el-button type="primary" size="mini" icon="el-icon-search">搜索</el-button>
                    <el-button  size="mini" icon="el-icon-refresh">重置</el-button>
                </div></el-col>
            </el-row>

        </div>

        <div class="contentbox">
            <el-row :gutter="40">
                <el-col :span="gridspan"><div class="grid-content">
                    <div class="batchSelectLabel">
                        <i class="el-icon-warning"></i>
                        已选择<span>0</span>项
                    </div>
                    <div class="contentheader">
                        角色信息
                    </div>
                    <el-table
                            ref="multipleTable"
                            stripe
                            border
                            :data="roleData"
                            style="width: 100%">
                        <el-table-column
                                type="selection"
                                show-overflow-tooltip

                                width="55">
                        </el-table-column>
                        <el-table-column
                                label="序号"
                                show-overflow-tooltip

                                type="index">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                show-overflow-tooltip

                                label="角色名称">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                show-overflow-tooltip

                                label="操作">
                            <template slot-scope="scope">
                                <span @click="lookUser(scope.row.roleCode)" class="tablebtn tablebtn-c1">查看用户</span>

                            </template>
                        </el-table-column>
                    </el-table>
                </div></el-col>
                <el-col :span="24-gridspan"><div class="grid-content">
                    <div class="contentheader">
                        用户信息
                    </div>
                    <el-table
                            ref="multipleTable"
                            :data="userData"
                            stripe
                            border
                            style="width: 100%">
                        <el-table-column
                                label="序号"
                                show-overflow-tooltip
                                type="index">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                show-overflow-tooltip

                                label="登录名">
                        </el-table-column>
                        <el-table-column
                                prop="officeName"
                                show-overflow-tooltip

                                label="所属部门">
                        </el-table-column>
                        <el-table-column
                                prop="hospitalName"
                                show-overflow-tooltip

                                label="上级机构">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                show-overflow-tooltip

                                label="状态">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                show-overflow-tooltip

                                label="启用/禁用">
                            <template slot-scope="scope">
                                <el-switch
                                        v-model="scope.row.status==1">
                                </el-switch>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                show-overflow-tooltip

                                label="操作">
                            <template slot-scope="scope">
                                <span @click="deleteUser(scope.row.id)" class="tablebtn tablebtn-c2">删除</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="page">
                        <el-pagination
                                :current-page="1"
                                :page-sizes="[10, 20, 30, 50]"
                                :page-size="100"
                                @size-change="pageSizeChange"
                                @current-change="pageCurrentChange"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="total">
                        </el-pagination>
                    </div>
                </div></el-col>
            </el-row>
        </div>
        <!--删除对话框-->
        <el-dialog
                title="提示"
                :visible.sync="deleteDialogVisible"
                width="1000px">
                <span slot="title" class="dialogtitle">
                    提示
                  </span>
            <deleteUser @closeHandle="deleteDialogVisible=false"></deleteUser>
        </el-dialog>
        <!--分配用户-->
        <el-dialog
                title="分配用户"
                :visible.sync="distributionUser"
                @close="distributionUser=false"
                width="1000px">
            <span slot="title" class="dialogtitle">
                分配用户
              </span>
            <fenpeiyonghu @closeHandle="distributionUser=false"></fenpeiyonghu>

        </el-dialog>
    </div>
</template>

<script>
    import fenpeiyonghu from '@/components/globaltem/Fenpeiyonghu'
    import deleteUser from './deleteUser'

    export default {
        name: "UserManage",
        data:function(){
            return{
                gridspan:24,
                roleCode:'',
                roleData:[],
                userData:[],
                formInline:{
                    user:'',
                    region:''
                },
                deleteDialogVisible:false,
                deleteId:'',
                filterShow:false,
                // 分配用户
                distributionUser:false,
                currentPage:1,
                pageSize:10,
                total:0

            }
        },
        mounted(){
            this.requestList()
        },
        methods:{
            //筛选
            searchClick(){

            },
            lookUser(code){
                let vm =this
                vm.gridspan = 8
                vm.roleCode = code
                vm.requestList()
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

            },
        //    列表信息
            requestList(){
                let vm =this
                vm.$http.post('userControl/getRoleListAndStaffList',{
                    currentPage:vm.currentPage,
                    pageSize:vm.pageSize,
                    staffRole:vm.roleCode
                }).then(res=>{
                    if(res.code=='200'){
                        if(!vm.roleData.length){
                            vm.roleData =  res.data.roleList
                        }
                        vm.userData = res.data.userList
                        vm.total = res.data.userListCount
                    }
                })
            },
            //    分页
            pageSizeChange(val){
                this.pageSize =val
                this.requestList()
            },
            pageCurrentChange(val){
                this.currentPage =val
                this.requestList()
            }

        },
        components:{
            fenpeiyonghu,deleteUser
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