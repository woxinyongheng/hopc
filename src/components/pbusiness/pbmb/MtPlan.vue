<template>
    <div class="mtplan">
        <div class="righttitle">
            <p>保养计划</p>
        </div>
        <div class="buttonbox">
            <div class="pullleft">
            <el-button type="primary" size="mini" @click="addplanClick">增加</el-button>
            <el-button type="warning" size="mini" @click="copyPlan">复制</el-button>
        </div>
            <div class="pullright">
                <el-button type="primary" size="mini">检索</el-button>
            </div>
        </div>
        <div class="filterbox">
            <el-row>
                <el-col :span="21"><div class="grid-content">
                    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
                        <el-form-item label="计划编号">
                            <el-input v-model="formInline.user" placeholder="计划编号"></el-input>
                        </el-form-item>
                        <el-form-item label="计划名称">
                            <el-input v-model="formInline.user" placeholder="姓名"></el-input>
                        </el-form-item>
                        <el-form-item label="保养类型">
                            <el-select v-model="formInline.region" placeholder="保养类型">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="周期类型">
                            <el-select v-model="formInline.region" placeholder="周期类型">
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
                        <el-form-item label="开始日期">
                            <el-date-picker
                                    v-model="formInline.user"
                                    type="date"
                                    placeholder="">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="至">
                            <el-date-picker
                                    v-model="formInline.user"
                                    type="date"
                                    placeholder="">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="维保单位">
                            <el-input v-model="formInline.user" placeholder="维保单位"></el-input>
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

                    <div class="contentheader">
                        设备类别
                    </div>
                    <el-table
                            ref="multipleTable"
                            :data="roleData"
                            stripe
                            border
                            style="width: 100%">
                        <el-table-column
                                prop="name"
                                label="编号">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="设备类型">
                            <template slot-scope="scope">
                                <span @click="lookUser(scope.row.id)" class="tablebtn tablebtn-c1">制冷设备</span>

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
                        保养计划
                    </div>
                    <el-table
                            ref="multipleTable"
                            :data="roleData"
                            stripe
                            border
                            style="width: 100%">
                        <el-table-column
                                label="序号"
                                show-overflow-tooltip
                                width="55"
                                type="selection">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                show-overflow-tooltip

                                label="计划编号">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                show-overflow-tooltip

                                label="状态">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                show-overflow-tooltip
                                label="计划名称">
                            <template slot-scope="scope">
                                <span class="tableactive" @click="planLookHandle(scope.row)">{{scope.row.name}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                show-overflow-tooltip
                                label="保养类型">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                show-overflow-tooltip
                                label="周期类型">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                show-overflow-tooltip
                                label="设备数量">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                show-overflow-tooltip
                                label="维保单位">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                show-overflow-tooltip
                                label="开始日期">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                show-overflow-tooltip
                                label="结束日期">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                show-overflow-tooltip
                                width="180px"
                                label="操作">
                            <template slot-scope="scope">
                                <span @click="editPlan(scope.row.id)" class="tablebtn tablebtn-c1">编辑</span>
                                <span @click="deletePlan(scope.row.id)" class="tablebtn tablebtn-c2">删除</span>
                                <span @click="submitPlan(scope.row.id)" class="tablebtn tablebtn-c1">提交</span>

                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="page">
                        <el-pagination
                                :current-page="1"
                                :page-sizes="[100, 200, 300, 400]"
                                :page-size="100"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="400">
                        </el-pagination>
                    </div>
                </div></el-col>
            </el-row>
        </div>

        <!--新增-->
        <el-dialog
                title="新增页面"
                :visible.sync="addplanShow"
                @close="addplanShow=false"
                width="1000px">
            <span slot="title" class="dialogtitle">
                {{addOrEdit=='edit'?'编辑':'新增'}}页面
              </span>
            <addPlan @closeHandle="addplanShow=false"></addPlan>
        </el-dialog>
        <!--查看-->
        <el-dialog
                title="查看页面"
                :visible.sync="planlookShow"
                @close="planlookShow=false"
                width="1000px">
            <span slot="title" class="dialogtitle">
                查看页面
              </span>
            <PlanLook @closeHandle="planlookShowHandle"></PlanLook>
        </el-dialog>
    </div>
</template>

<script>
    import addPlan from './addPlan'
    import PlanLook from './PlanLook'

    export default {
        name: "MtPlan",
        data:function(){
            return{
                gridspan:24,
                lookId:'',
                roleData:[{name:'运保主管',id:1,status:0},{name:'运保主管',id:2,status:1},{name:'运保主管',id:3,status:0}],
                formInline:{
                    user:'',
                    region:''
                },
                addplanShow:false,
                planlookShow:false,
                addOrEdit:''
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
            addplanClick(){
                this.addOrEdit = 'add'
                this.addplanShow = true
            },
            editPlan(){
                this.addOrEdit = 'edit'
                this.addplanShow = true
            },
            deletePlan(){
                this.$confirm('确定要删除这个保养计划吗?', '提示', {
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
            submitPlan(){
                this.$confirm('确定要提交这个保养计划吗，提交后无法编辑和删除', '提示', {
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
            copyPlan(){
                this.$confirm('确定要复制此保养计划吗?', '提示', {
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
                this.planlookShow =true
            },
            //查看内部编辑
            planlookShowHandle(){
                this.planlookShow =false
                this.addOrEdit = 'edit'
                this.addplanShow = true
            }

        },
        components:{
            addPlan,PlanLook
        }

    }
</script>

<style scoped lang="scss">
    .mtplan{
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