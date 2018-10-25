<template>
    <!--管理任务分配-->
    <div class="talist">
        <div class="righttitle">
            <p>管理任务分配</p>
        </div>
        <div class="buttonbox">
            <div class="pullleft">
                <el-tag type="success">同步</el-tag>
                <el-button type="warning" size="mini">导出</el-button>
            </div>
            <div class="pullright">
                <el-button type="success" size="mini" icon="el-icon-search">检索</el-button>
            </div>
        </div>
        <div class="filterbox">
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
                        prop="status"
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="address"
                        show-overflow-tooltip
                        label="设备类别">
                    <template slot-scope="scope">
                        <span  @click="showshebeiInfo(scope.row)" class="tableactive">{{scope.row.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="address"
                        show-overflow-tooltip
                        label="设备管理员">
                </el-table-column>
                <el-table-column
                        prop="address"
                        show-overflow-tooltip
                        label="备注">
                </el-table-column>
                <el-table-column
                        prop="address"
                        show-overflow-tooltip
                        label="操作">
                    <template slot-scope="scope">
                        <span  class="tablebtn tablebtn-c1" @click="feipeiguanliyuanshowClick(scope.row)">管理任务分配</span>
                        <span  @click="editClick(scope.row)" class="tablebtn tablebtn-c2">编辑</span>

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
        </div>
        <el-dialog
                title="设备查看"
                :visible.sync="shebeichakanShow"
                @close="shebeichakanShow=false"
                width="1000px">
            <span slot="title" class="dialogtitle">
                设备查看
              </span>
            <shebeichakan @editHandle="editHandle"  @closeShebeiHandle="shebeichakanShow=false" ></shebeichakan>
        </el-dialog>
        <el-dialog
                title="分配任务管理员"
                :visible.sync="feipeiguanliyuanshow"
                @close="feipeiguanliyuanshow=false"
                width="1000px">
            <span slot="title" class="dialogtitle">
                分配任务管理员
              </span>
            <feipeiguanliyuan :judgeUser="judgeUser"  @closeShebeiHandle="feipeiguanliyuanshow=false" ></feipeiguanliyuan>
        </el-dialog>
        <el-dialog
                title="编辑页面"
                :visible.sync="editShow"
                @close="editShow=false"
                width="1000px">
            <span slot="title" class="dialogtitle">
                编辑页面
              </span>
            <feipeiguanliyuan :judgeUser="judgeUser"  @closeShebeiHandle="editShow=false" ></feipeiguanliyuan>
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
                judgeUser:'person',
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
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    status:'延期使用',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }],
                shebeichakanShow:false,
                feipeiguanliyuanshow:false,
                editShow:false
            }
        },
        methods:{
            showshebeiInfo(){
                this.shebeichakanShow =true
            },
            feipeiguanliyuanshowClick(){
                this.feipeiguanliyuanshow =true
            },
            editClick(){
                this.editShow = true
            },
            editHandle(){
                this.shebeichakanShow = false
                this.editShow = true

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