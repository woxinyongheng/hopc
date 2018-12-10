<template>
    <div class="mtitem">
        <div class="righttitle">
            <p>保养项目管理</p>
        </div>
        <div class="buttonbox" style="margin-bottom: 20px">
            <div class="pullleft">
                <el-button type="primary" size="mini" @click="addplanClick">增加</el-button>
                <el-button type="warning" size="mini" @click="copyPro">复制</el-button>
            </div>
        </div>

        <div class="contentbox">
            <el-row :gutter="40">
                <el-col :span="gridspan"><div class="grid-content">

                    <div class="contentheader">
                        设备类别
                    </div>
                    <el-table
                            ref="multipleTable"
                            :data="typeList"
                            stripe
                            border
                            style="width: 100%">
                        <el-table-column
                                prop="typeCode"
                                show-overflow-tooltip
                                label="编号">
                        </el-table-column>
                        <el-table-column
                                prop="typeName"
                                show-overflow-tooltip
                                label="设备类型">
                            <template slot-scope="scope">
                                <span @click="lookUser(scope.row)" class="tablebtn tablebtn-c1">{{scope.row.typeName}}</span>

                            </template>
                        </el-table-column>
                    </el-table>
                </div></el-col>
                <el-col :span="24-gridspan"><div class="grid-content">
                    <div class="batchSelectLabel">
                        <i class="el-icon-warning"></i>
                        已选择<span>{{selectData.length}}</span>项
                    </div>
                    <div class="contentheader">
                        保养项目
                    </div>
                    <el-table
                            ref="multipleTable"
                            :data="roleData"
                            @selection-change="handleSelectionChange"

                            stripe
                            border
                            style="width: 100%">
                        <el-table-column
                                show-overflow-tooltip
                                width="55"
                                type="selection">
                        </el-table-column>
                        <el-table-column
                                prop="number"
                                show-overflow-tooltip

                                label="编号">
                        </el-table-column>
                        <el-table-column
                                prop="projectName"
                                show-overflow-tooltip
                                label="项目名称">
                            <template slot-scope="scope">
                                <span class="tableactive" @click="planLookHandle(scope.row)">{{scope.row.projectName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="projectExplain"
                                show-overflow-tooltip
                                label="项目说明">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                show-overflow-tooltip
                                width="180px"
                                label="操作">
                            <template slot-scope="scope">
                                <span @click="editPro(scope.row)" class="tablebtn tablebtn-c1">编辑</span>
                                <span @click="deletePro(scope.row)" class="tablebtn tablebtn-c2">删除</span>

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

        <!--新增-->
        <el-dialog
                title="新增页面"
                :visible.sync="addproShow"
                @close="addproShow=false"
                width="1000px">
            <span slot="title" class="dialogtitle">
                {{addOrEdit=='edit'?'编辑':'新增'}}页面
              </span>
            <addPro :clear="clear" :editData="editData" :addeditid="addeditid"  :typeList="typeList" @closeHandle="closeAddHandle"></addPro>
        </el-dialog>
        <!--查看-->
        <el-dialog
                title="查看页面"
                :visible.sync="prolookShow"
                @close="prolookShow=false"
                width="1000px">
            <span slot="title" class="dialogtitle">
                查看页面
              </span>
            <ProLook :editData="editData" @closeHandle="planlookShowHandle"></ProLook>
        </el-dialog>
    </div>
</template>

<script>
    import addPro from './addPro'
    import ProLook from './ProLook'

    export default {
        name: "MtItem",
        data:function(){
            return{
                clear:0,
                //分页
                total:0,
                pageSize:10,
                currentPage:1,
                filterShow:false,
                //filter
                typeList:[],
                selectData:[],
                gridspan:24,
                lookId:'',
                roleData:[],
                formInline:{
                    user:'',
                    region:''
                },
                addproShow:false,
                prolookShow:false,
                addOrEdit:'',
                editData:'',
                addeditid:''
            }
        },
        mounted(){
            this.requestType()
        },
        methods:{
            closeAddHandle(str){
                this.addproShow=false
                if(str){
                    this.requestList()
                }
            },
            //    列表选择
            handleSelectionChange(val){
                this.selectData=val
            },
            //    获取设备分类列表
            requestType(){
                let vm =this
                vm.$http.post('equipmentConfigController/getDeviceTypeList',{}).then(res=>{
                    if(res.code=='200'){
                        vm.typeList = res.data
                    }
                })
            },

            //列表
            requestList(){
                let vm =this
                vm.$http.post('maintainProjectController/findMaintainProjectList',{
                    pageSize:vm.pageSize,
                    currentPage:vm.currentPage,
                    equipmentTypeId:vm.lookId
                }).then(res=>{
                    if(res.code==200){
                        vm.total = res.data.count*1
                        vm.roleData = res.data.list
                    }
                })
            },
            lookUser(row){
                let vm =this
                vm.gridspan = 8
                this.pageSize=10
                this.currentPage=1
                vm.lookId = row.typeId
                this.requestList()
            },
            addplanClick(){
                this. addeditid=''
                this.addOrEdit = 'add'
                this.addproShow = true
                this.clear++
            },
            editPro(row){
                let vm =this
                vm.addeditid = row.id
                vm.$http.post('maintainProjectController/findMaintainProjectById',{
                    id:row.id
                }).then(res=>{
                    if(res.code==200){
                        vm.addOrEdit = 'edit'
                        vm.addproShow = true
                        vm.editData=res.data
                        vm.clear++
                    }
                })

            },
            //删除
            deletePro(row){
                let vm =this
                this.$confirm('确定要删除这个保养项目吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    vm.$http.post('maintainProjectController/deleteProjectAndDetails',{
                        id:row.id
                    }).then(res=>{
                        if(res.code==200){
                            vm.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            vm.requestList()
                        }
                    })

                }).catch(() => {

                });
            },

            //复制
            copyPro(){
                let vm =this
                if(vm.selectData.length!=1){
                    vm.$message({
                        message:'请选择一个项目',
                        type:'warning'
                    })
                    return
                }
                this.$confirm('确定要复制此保养项目吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    vm.$http.post('maintainProjectController/copyMaintainProject',{
                        id:vm.selectData[0].id
                    }).then(res=>{
                        if(res.code==200){
                            vm.$message({
                                type: 'success',
                                message: res.message
                            });
                            vm.requestList()
                        }
                    })
                }).catch(() => {

                });
            },
            //查看
            planLookHandle(row){
                let vm =this
                vm.addeditid = row.id
                vm.$http.post('maintainProjectController/findMaintainProjectById',{
                    id:row.id
                }).then(res=>{
                    if(res.code==200){
                        vm.addOrEdit = 'edit'
                        // vm.addproShow = true
                        vm.editData=res.data
                        vm.prolookShow =true
                        vm.clear++
                    }
                })
            },
            //查看内部编辑
            planlookShowHandle(str){
                this.prolookShow =false
                if(str=='edit'){
                    this.addOrEdit = 'edit'
                    this.addproShow = true
                    this.clear++
                }

            },
            //    分页
            pageSizeChange(val){
                this.pageSize =val
                this.requestList()
            },
            pageCurrentChange(val){
                this.currentPage =val
                this.requestList()
            },

        },
        components:{
            addPro,ProLook
        }

    }
</script>

<style scoped lang="scss">
    .mtitem{
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