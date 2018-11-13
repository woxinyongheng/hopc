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
                                @select="selectOffice"
                                active-text-color="#409EFF">
                            <el-submenu :index="item.id" v-for="(item,index) in roleTree" v-if="item.children">
                                <template slot="title">
                                    <span>{{item.name}}</span>
                                </template>
                                <el-menu-item-group >
                                    <el-menu-item v-if="item.children" :index="index+'-'+ii" v-for="(it,ii) in item.children">{{it.name}}</el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-menu-item :index="item.id" v-for="(item,index) in roleTree" v-if="!item.children">
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
                                            <el-input v-model="formInline.name" placeholder="用户名"></el-input>
                                        </el-form-item>
                                    </el-form>
                                </div></el-col>
                                <el-col :span="9" ><div class="grid-content" style="text-align: right;">
                                    <el-button type="primary"  size="mini" @click="searchClick">查询</el-button>
                                    <el-button  size="mini" @click="resetSearchClick">重置</el-button>
                                </div></el-col>
                            </el-row>
                        </div>
                        <el-table
                                ref="multipleTable"
                                align="center"
                                @selection-change="handleSelectionChange"
                                :data="roleData"
                                tooltip-effect="dark"
                                style="width: 100%">
                            <el-table-column
                                    type="selection"
                                    show-overflow-tooltip

                                    width="55">
                            </el-table-column>
                            <el-table-column
                                    label="序号"
                                    align="center"
                                    type="index">
                            </el-table-column>
                            <el-table-column
                                    prop="userName"
                                    align="center"
                                    label="登录名">
                            </el-table-column>
                            <el-table-column
                                    prop="name"
                                    align="center"
                                    label="用户名">
                            </el-table-column>
                            <el-table-column
                                    prop="sex"
                                    align="center"
                                    label="性别">
                            </el-table-column>
                            <el-table-column
                                    prop="officeName"
                                    align="center"
                                    label="所属科室">
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
        </div>
        <div class="dialogfooter" style="text-align: right">
            <el-button type="primary" size="small" @click="sureHandle">确认</el-button>
            <el-button  size="small" @click="closeHandle">取消</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Renwufenpei",
        props:['roleTree','selectData'],
        data:function () {
            return{
                roleData:[],
                formInline:{
                    name:''
                },
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                id:'',
                currentPage:1,
                pageSize:10,
                total:0,
                selectStraff:[]

            }
        },
        mounted(){
        },
        methods:{
            //分配
            sureHandle(){
                let vm =this
                debugger
                if(!vm.selectStraff.length){
                    vm.$message({
                        message: '请选择至少一个用户',
                        type: 'warning'
                    });
                    return
                }
                let arr=[]
                vm.selectStraff.forEach(function (item) {
                    arr.push(item.id)
                })

                vm.$http.post('userControl/insertRoleByStaffs',{
                    staffIds:arr.join(','),
                    staffRole:vm.selectData[0].roleCode,
                }).then(res=>{
                    if(res.code==200){
                        vm.$message({
                            message: res.message,
                            type: 'success'
                        });
                        vm.$emit('closeHandle',true)
                    }
                })
            },
            searchClick(){
                this.requestStraff()
            },
            resetSearchClick(){
                this.formInline.name=''
                this.requestStraff()
            },
            closeHandle(){
                this.$emit('closeHandle')
            },
            selectOffice(arr){
                let vm =this
                vm.id = arr
                vm.requestStraff()

            },
            requestStraff(){
                let vm =this
                vm.$http.post(__PATH.BASEPATH+'outsourcedController/getStaffListByOfficeOrTeam',{
                    id:vm.id,
                    type:1,
                    pageSize:vm.pageSize,
                    currentPage:vm.currentPage,
                    name:vm.formInline.name
                }).then(res=>{
                    if(res.code==200){
                        vm.roleData = res.data.staffList
                        vm.total = res.data.sum*1
                    }
                })
            },
        //    选择职工
            handleSelectionChange(val){
                this.selectStraff=val
            },
            //    分页
            pageSizeChange(val){
                this.pageSize =val
                this.requestStraff()
            },
            pageCurrentChange(val){
                this.currentPage =val
                this.requestStraff()
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