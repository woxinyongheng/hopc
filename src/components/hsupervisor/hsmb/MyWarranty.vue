<template>
    <div class="mywarranty">
        <div class="righttitle">
            <p>我的报修</p>
        </div>
        <div class="buttonbox">
            <div class="pullleft">
                <el-tag>全部</el-tag>
                <el-tag type="danger">未派工</el-tag>
                <el-tag type="success">已派工</el-tag>
                <el-tag type="info">已挂单</el-tag>
                <el-tag type="warning">已完成</el-tag>
                <el-button type="warning" size="mini">导出</el-button>
            </div>
            <div class="pullright">
                <el-button type="success" size="mini" icon="el-icon-search">检索</el-button>
            </div>
        </div>
        <div class="filterbox">
            <el-row>
                <el-col :span="21"><div class="grid-content">
                    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
                        <el-form-item label="记录单号">
                            <el-input v-model="formInline.user" placeholder="记录单号"></el-input>
                        </el-form-item>
                        <el-form-item label="保修时间">
                            <el-date-picker
                                    v-model="formInline.user"
                                    type="date"
                                    placeholder="开始日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="至">
                            <el-date-picker
                                    v-model="formInline.user"
                                    type="date"
                                    placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="设备编号">
                            <el-input v-model="formInline.user" placeholder="记录单号"></el-input>
                        </el-form-item>
                        <el-form-item label="报修人">
                            <el-input v-model="formInline.user" placeholder="报修人"></el-input>
                        </el-form-item>
                        <el-form-item label="设备名称">
                            <el-input v-model="formInline.user" placeholder="记录单号"></el-input>
                        </el-form-item>
                        <el-form-item label="设备类别">
                            <el-cascader
                                    :options="options"
                                    v-model="formInline.tree"
                                    :props="props">
                            </el-cascader>
                        </el-form-item>
                        <el-form-item label="所在区域">
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
                </div></el-col>
                <el-col :span="3"><div class="grid-content searchbox">
                    <el-button type="primary" size="mini" icon="el-icon-search">搜索</el-button>
                    <el-button  size="mini" icon="el-icon-refresh">重置</el-button>
                </div></el-col>
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
                        width="50">
                </el-table-column>
                <el-table-column
                        prop="date"
                        label="记录单号"
                        show-overflow-tooltip
                        width="180">
                    <template slot-scope="scope">
                        <span  @click="showOrderInfo(scope.row,scope.row.id)" class="tableactive">{{scope.row.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="保修时间"
                        show-overflow-tooltip

                        width="180">
                </el-table-column>
                <el-table-column
                        prop="address"
                        show-overflow-tooltip

                        label="报修人">
                </el-table-column>
                <el-table-column
                        prop="address"
                        show-overflow-tooltip
                        label="设备编号">
                    <template slot-scope="scope">
                        <span  @click="showshebeiInfo(scope.row)" class="tableactive">{{scope.row.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="address"
                        show-overflow-tooltip

                        label="设备名称">
                </el-table-column>
                <el-table-column
                        prop="address"
                        show-overflow-tooltip

                        label="设备类别">
                </el-table-column>
                <el-table-column
                        prop="address"
                        show-overflow-tooltip

                        label="所在区域">
                </el-table-column>
                <el-table-column
                        prop="address"
                        show-overflow-tooltip

                        label="存放地点">
                </el-table-column>
                <el-table-column
                        prop="address"
                        show-overflow-tooltip

                        label="责任归属">
                </el-table-column>
                <el-table-column
                        prop="address"
                        show-overflow-tooltip

                        label="状态">
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
                title="查看页面"
                :visible.sync="jiludanhaoShow"
                @close="closeHandle"
                width="1000px">
            <span slot="title" class="dialogtitle">
                查看页面
              </span>
            <jiludanhao @closeOrderHandle="jiludanhaoShow=false"></jiludanhao>
        </el-dialog>
        <el-dialog
                title="设备查看"
                :visible.sync="shebeichakanShow"
                @close="closeShebeiHandle"
                width="1000px">
            <span slot="title" class="dialogtitle">
                查看页面
              </span>
            <shebeichakan @closeShebeiHandle="shebeichakanShow=false" ></shebeichakan>
        </el-dialog>
    </div>
</template>

<script>
    import jiludanhao from '@/components/globaltem/Jiludanhao'
    import shebeichakan from '@/components/globaltem/Shebeichakan'
    export default {
        name: "MyWarranty",
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
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
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
                jiludanhaoShow:false,
                shebeichakanShow:false

            }
        },
        methods:{
            showOrderInfo(){//记录单号
                this.jiludanhaoShow = true
            },
            closeHandle(){
                this.jiludanhaoShow = false

            },
            showshebeiInfo(){//设备编号
                this.shebeichakanShow=true
            },
            closeShebeiHandle(){
                this.shebeichakanShow=false

            }
        },
        components:{
            jiludanhao,shebeichakan
        }
    }
</script>

<style scoped lang="scss">
.mywarranty{

}
</style>