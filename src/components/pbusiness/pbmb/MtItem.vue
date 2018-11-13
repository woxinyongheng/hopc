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
                        已选择<span>0</span>项
                    </div>
                    <div class="contentheader">
                        保养项目
                    </div>
                    <el-table
                            ref="multipleTable"
                            :data="roleData"
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
            <addPro :typeList="typeList" @closeHandle="addproShow=false"></addPro>
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
            <ProLook @closeHandle="planlookShowHandle"></ProLook>
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
                addOrEdit:''
            }
        },
        mounted(){
            this.requestType()
        },
        methods:{
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
                this.addOrEdit = 'add'
                this.addproShow = true
            },
            editPro(){
                this.addOrEdit = 'edit'
                this.addproShow = true
            },
            //删除
            deletePro(){
                this.$confirm('确定要删除这个保养项目吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '复制成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消复制'
                    });
                });
            },

            //复制
            copyPro(){
                this.$confirm('确定要复制此保养项目吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '复制成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消复制'
                    });
                });
            },
            //查看
            planLookHandle(){
                this.prolookShow =true
            },
            //查看内部编辑
            planlookShowHandle(){
                this.prolookShow =false
                this.addOrEdit = 'edit'
                this.addproShow = true
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