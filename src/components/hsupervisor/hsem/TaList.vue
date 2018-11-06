<template>
    <!--管理任务分配-->
    <div class="talist">
        <div class="righttitle">
            <p>管理任务分配</p>
        </div>
        <div class="buttonbox">
            <div class="pullleft">
                <el-button type="success" plain size="mini" @click="syncDevice">同步</el-button>
                <el-button type="warning" size="mini">导出</el-button>
            </div>
            <div class="pullright">
                <el-button type="success" size="mini" icon="el-icon-search" @click="filterShow=!filterShow">检索</el-button>
            </div>
        </div>
        <div class="filterbox" v-if="filterShow">
            <el-row>
                <el-col :span="21">
                    <div class="grid-content">
                        <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
                            <el-form-item label="类别编号">
                                <el-input v-model="formInline.user" placeholder="设备编号"></el-input>
                            </el-form-item>
                            <el-form-item label="设备类别">
                                <el-cascader
                                        :options="options"
                                        v-model="formInline.tree"
                                        :props="props">
                                </el-cascader>
                            </el-form-item>
                            <!--<el-form-item label="设备管理员">-->
                                <!--<el-cascader-->
                                        <!--:options="options"-->
                                        <!--v-model="formInline.tree"-->
                                        <!--:props="props">-->
                                <!--</el-cascader>-->
                            <!--</el-form-item>-->

                            <el-form-item label="设备管理员">
                                <el-select v-model="formInline.region" placeholder="设备管理员">
                                    <el-option label="区域一" value="1"></el-option>
                                    <el-option label="区域二" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-col>
                <el-col :span="3">
                    <div class="grid-content searchbox">
                        <el-button type="primary" size="mini" icon="el-icon-search">搜索</el-button>
                        <el-button size="mini" icon="el-icon-refresh">重置</el-button>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="contentbox">
            <div class="batchSelectLabel">
                <i class="el-icon-warning"></i>
                已选择<span>0</span>项
            </div>
            <el-table
                    :data="tableData"
                    stripe
                    border
                    style="width: 100%">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        type="index"
                        label="序号"
                        width="55">
                </el-table-column>
                <el-table-column
                        label="设备编号"
                        prop="typeCode"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        prop="typeName"
                        show-overflow-tooltip
                        label="设备类别">
                    <template slot-scope="scope">
                        <span  @click="showshebeiInfo(scope.row)" class="tableactive">{{scope.row.typeName}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="eqAdminName"
                        show-overflow-tooltip
                        label="设备管理员">
                </el-table-column>
                <el-table-column
                        prop="eqAdminRemarks"
                        show-overflow-tooltip
                        label="备注">
                </el-table-column>
                <el-table-column
                        prop="address"
                        show-overflow-tooltip
                        label="操作">
                    <template slot-scope="scope">
                        <span  v-if="!scope.row.eqAdminName" class="tablebtn tablebtn-c1" @click="feipeiguanliyuanshowClick(scope.row)">管理任务分配</span>
                        <span v-if="scope.row.eqAdminName" @click="editClick(scope.row)" class="tablebtn tablebtn-c2">编辑</span>

                    </template>
                </el-table-column>
            </el-table>
            <div class="page">
                <el-pagination
                        :current-page="1"
                        :page-sizes="[10, 20, 30, 50]"
                        :page-size="100"
                        layout="total, sizes, prev, pager, next, jumper"
                        @size-change="pageSizeChange"
                        @current-change="pageCurrentChange"
                        :total="total">
                </el-pagination>
            </div>
        </div>
        <el-dialog
                title="设备查看"
                :visible.sync="shebeichakanShow"
                @close="shebeichakanShow=false"
                width="1000px">
            <span slot="title" class="dialogtitle">
                设备查看
              </span>
            <shebeichakan :deviceData="deviceData" @editHandle="editHandle"  @closeShebeiHandle="shebeichakanShow=false" ></shebeichakan>
        </el-dialog>
        <el-dialog
                title="分配任务管理员"
                :visible.sync="feipeiguanliyuanshow"
                @close="feipeiguanliyuanshow=false"
                width="1000px">
            <span slot="title" class="dialogtitle">
                分配任务管理员
              </span>
            <feipeiguanliyuan :deviceData="deviceData" :adminList="adminList" @closeShebeiHandle="feipeiguanliyuanshow=false" ></feipeiguanliyuan>
        </el-dialog>
        <el-dialog
                title="编辑页面"
                :visible.sync="editShow"
                @close="editShow=false"
                width="1000px">
            <span slot="title" class="dialogtitle">
                编辑页面
              </span>
            <feipeiguanliyuan :deviceData="deviceData" :adminList="adminList" @closeShebeiHandle="editShow=false" ></feipeiguanliyuan>
        </el-dialog>
    </div>
</template>

<script>
    import shebeichakan from '@/components/globaltem/Shebeileibie'
    import feipeiguanliyuan from '@/components/globaltem/Fenpeiguanliyuan'
    import Guanlirenwubianji from '@/components/globaltem/Guanlirenwubianji'

    export default {
        name: "TaList",
        data:function () {
            return{
                //分页
                total:0,
                pageSize:10,
                currentPage:1,
                filterShow:false,
                formInline:{
                    user:'',
                    region:'',
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
                frequencyData:[{label:'='},{label:'!='},{label:'>='},{label:'=<'},{label:'>'},{label:'<'}],
                tableData: [],
                shebeichakanShow:false,
                feipeiguanliyuanshow:false,
                editShow:false,
                deviceData:{},
                adminList:[]
            }
        },
        mounted(){
          this.requestList()
            this.requestAdmin()
        },
        methods:{
            requestList(){
                let vm =this
                vm.$http.post('/equipmentConfigController/getEquipmentOfCompanyList',{
                    pageSize:vm.pageSize,
                    currentPage:vm.currentPage,
                }).then(res=>{
                    if(res.code==200){
                        vm.tableData = res.data.deviceConfigList
                        vm.total = res.data.sum
                    }
                })
            },
            //获取设备管理员
            requestAdmin(){
              let vm =this
              vm.$http.post('/userControl/getDeviceManagerList',{}).then(res=>{
                  if(res.code==200){
                      vm.adminList = res.data.userList
                  }
              })
            },
            //同步
            syncDevice(){
                debugger
                let vm =this
                vm.$http.post('/equipmentConfigController/synchronousDeviceType',{}).then(res=>{
                    if(res.code==200){
                        vm.$message({
                            message: res.message,
                            type: 'success'
                        });
                    }
                })
            },
            showshebeiInfo(row){
                this.deviceData = row
                this.shebeichakanShow =true
            },
            feipeiguanliyuanshowClick(row){
                this.deviceData = row
                this.feipeiguanliyuanshow =true
            },
            editClick(row){
                debugger
                this.deviceData = row
              this.editShow = true
            },
            editHandle(){
                this.shebeichakanShow = false
                this.editShow = true

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
            shebeichakan,feipeiguanliyuan,Guanlirenwubianji
        }
    }
</script>

<style scoped lang="scss">
    .talist{

    }

</style>