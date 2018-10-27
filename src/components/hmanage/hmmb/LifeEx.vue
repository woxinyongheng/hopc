<template>
    <div class="lifeex">
        <div class="righttitle">
            <p>寿命到期</p>
        </div>
        <div class="buttonbox">
            <div class="pullleft">
                <el-tag>全部</el-tag>
                <el-tag type="danger">未处理</el-tag>
                <el-tag type="success">已处理</el-tag>
                <el-tag type="danger">延期</el-tag>
                <el-tag type="warning">已超时</el-tag>
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
                            <el-form-item label="到期日期">
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
                        label="寿命到期">
                </el-table-column>
                <el-table-column
                        prop="address"
                        width="140px"
                        label="操作">
                    <template slot-scope="scope">
                        <span  @click="extendInfo(scope.row)" class="tablebtn tablebtn-c1">延期</span>
                        <span  @click="scrapInfo(scope.row)" class="tablebtn tablebtn-c2">报废</span>

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
                :visible.sync="deviceInfoShow"
                @close="deviceInfoShow=false"
                width="1000px">
            <span slot="title" class="dialogtitle">
                设备查看
              </span>
            <DeviceInfo @closeHandle="deviceInfoShow=false" :type="2"  ></DeviceInfo>
        </el-dialog>
        <!--延期弹框-->
        <el-dialog
                title="延期使用"
                :visible.sync="extendType"
                @close="extendType=false"
                width="1000px"
                append-to-body>
            <span slot="title" class="dialogtitle">延期使用</span>
            <extendTem @closeHandle="extendType=false"></extendTem>

        </el-dialog>
        <!--报废弹框-->
        <el-dialog
                title="报废处理"
                :visible.sync="scrapType"
                @close="scrapType=false"
                width="1000px"
                append-to-body>
            <span slot="title" class="dialogtitle">报废处理</span>
            <scrapTem @closeHandle="scrapType=false"></scrapTem>
        </el-dialog>

    </div>
</template>

<script>
    import DeviceInfo from './tem/DeviceInfo'
    import extendTem from './tem/extendTem'
    import scrapTem from './tem/scrapTem'
    export default {
        name: "LifeEx",
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
                deviceInfoShow:false,
                extendType:false,
                scrapType:false


            }
        },
        methods:{
            showshebeiInfo(){
                this.deviceInfoShow =true
            },
            extendInfo(){
                this.extendType =true
            },
            scrapInfo(){
                this.scrapType=true
            }
        },
        components:{
            DeviceInfo,extendTem,scrapTem
        }
    }
</script>

<style scoped lang="scss">
    .lifeex {

    }
</style>