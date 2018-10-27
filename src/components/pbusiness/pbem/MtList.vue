<template>
    <!--医院运保主管 设备列表-->
    <div class="mtlist">
        <div class="righttitle">
            <p>设备列表</p>
        </div>
        <div class="buttonbox">
            <div class="pullleft">
                <el-tag>全部</el-tag>
                <el-tag type="success">正常</el-tag>
                <el-tag type="danger">延期</el-tag>
                <el-tag type="warning">待维修</el-tag>
                <el-button type="danger" size="mini" @click="shebeibaoxiuShow=true">设备报修</el-button>
                <el-button type="warning" size="mini" @click="renwufenpeiShow=true">任务分配</el-button>
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
                            <el-form-item label="设备编号">
                                <el-input v-model="formInline.user" placeholder="设备编号"></el-input>
                            </el-form-item>
                            <el-form-item label="设备名称">
                                <el-input v-model="formInline.user" placeholder="设备名称"></el-input>
                            </el-form-item>
                            <el-form-item label="设备类别">
                                <el-cascader
                                        :options="options"
                                        v-model="formInline.tree"
                                        :props="props">
                                </el-cascader>
                            </el-form-item>
                            <el-form-item label="设备品牌">
                                <el-cascader
                                        :options="options"
                                        v-model="formInline.tree"
                                        :props="props">
                                </el-cascader>
                            </el-form-item>
                            <el-form-item label="规格型号">
                                <el-input v-model="formInline.user" placeholder="规格型号"></el-input>
                            </el-form-item>
                            <el-form-item label="维修次数" class="selectinputmini">
                                <el-input v-model="formInline.user" placeholder="维修次数"  class="input-with-select ">
                                    <el-select slot="prepend" v-model="formInline.user" placeholder="" class="miniselect">
                                        <el-option v-for="(item,index) in frequencyData" :label="item.label" :value="item.label"></el-option>
                                    </el-select>
                                </el-input>
                            </el-form-item>
                            <el-form-item label="累计支出" class="selectinputmini">
                                <el-input v-model="formInline.user" placeholder="累计支出"  class="input-with-select">
                                    <el-select slot="prepend" v-model="formInline.user" placeholder="" class="miniselect">
                                        <el-option v-for="(item,index) in frequencyData" :label="item.label" :value="item.label"></el-option>
                                    </el-select>
                                </el-input>
                            </el-form-item>
                            <el-form-item label="保养次数" class="selectinputmini">
                                <el-input v-model="formInline.user" placeholder="保养次数"  class="input-with-select">
                                    <el-select slot="prepend" v-model="formInline.user" placeholder="" class="miniselect">
                                        <el-option v-for="(item,index) in frequencyData" :label="item.label" :value="item.label"></el-option>
                                    </el-select>
                                </el-input>
                            </el-form-item>


                            <el-form-item label="设备管理员">
                                <el-cascader
                                        :options="options"
                                        v-model="formInline.tree"
                                        :props="props">
                                </el-cascader>
                            </el-form-item>
                            <el-form-item label="责任归属">
                                <el-select v-model="formInline.region" placeholder="责任归属">
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
                        label="状态"
                        prop="status"
                        width="80">
                </el-table-column>
                <el-table-column
                        label="照片"
                        show-overflow-tooltip
                        width="80">
                    <template slot-scope="scope">
                        <img class="tebleimg" src="../../../../static/images/avatar.png" alt="">
                    </template>
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="设备编号"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        prop="address"
                        show-overflow-tooltip
                        label="设备名称">
                    <template slot-scope="scope">
                        <span  @click="showshebeiInfo(scope.row)" class="tableactive">{{scope.row.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="address"
                        show-overflow-tooltip
                        label="设备类别">
                </el-table-column>
                <el-table-column
                        prop="address"
                        show-overflow-tooltip
                        label="设备品牌">
                </el-table-column>
                <el-table-column
                        prop="address"
                        show-overflow-tooltip
                        label="规格型号">
                </el-table-column>
                <el-table-column
                        prop="address"
                        show-overflow-tooltip
                        label="维修次数(次)">
                </el-table-column>
                <el-table-column
                        prop="address"
                        show-overflow-tooltip
                        label="累计支出">
                </el-table-column>
                <el-table-column
                        prop="address"
                        show-overflow-tooltip
                        label="保养次数(次)">
                </el-table-column>
                <el-table-column
                        prop="address"
                        show-overflow-tooltip
                        label="设备管理员">
                </el-table-column>
                <el-table-column
                        prop="address"
                        show-overflow-tooltip
                        label="责任归属">
                </el-table-column>
                <el-table-column
                        prop="address"
                        show-overflow-tooltip
                        label="任务归属">
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
            <shebeichuli @closeShebeiHandle="shebeichakanShow=false" ></shebeichuli>
        </el-dialog>
        <el-dialog
                title="设备报修"
                :visible.sync="shebeibaoxiuShow"
                @close="shebeibaoxiuShow=false"
                width="1000px">
            <span slot="title" class="dialogtitle">
                设备报修
              </span>
            <shebeibaoxiu @closeShebeiHandle="shebeibaoxiuShow=false" ></shebeibaoxiu>
        </el-dialog>
        <el-dialog
                title="任务分配"
                :visible.sync="renwufenpeiShow"
                @close="renwufenpeiShow=false"
                width="1000px">
            <span slot="title" class="dialogtitle">
                任务分配
              </span>
            <renwufenpei @closeShebeiHandle="renwufenpeiShow=false" ></renwufenpei>
        </el-dialog>
    </div>
</template>

<script>
    import shebeichuli from '@/components/globaltem/Shebeichuli'
    import shebeibaoxiu from '@/components/globaltem/Shebeibaoxiu'
    import renwufenpei from '@/components/globaltem/Renwufenpei'

    export default {
        name: "MtList",
        data:function () {
            return{
                formInline:{
                    user:'',
                    region:'1',
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
                shebeibaoxiuShow:false,
                renwufenpeiShow:false
            }
        },
        methods:{
            showshebeiInfo(){
                this.shebeichakanShow =true
            }
        },
        components:{
            shebeichuli,shebeibaoxiu,renwufenpei
        }
    }
</script>

<style scoped lang="scss">
    .mtlist {

    }
</style>