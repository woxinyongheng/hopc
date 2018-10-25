<template>
    <!--质保到期处理-->
    <div class="dllist">
        <div class="righttitle">
            <p>质保到期处理记录</p>
        </div>
        <div class="buttonbox">
            <div class="pullleft">
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
                        <el-form-item label="处理时间">
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
                        <el-form-item label="处理人">
                            <el-input v-model="formInline.user" placeholder="处理人"></el-input>
                        </el-form-item>
                        <el-form-item label="处理说明">
                            <el-input v-model="formInline.user" placeholder="确认人"></el-input>
                        </el-form-item>
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
                            <el-input v-model="formInline.user" placeholder="设备品牌"></el-input>
                        </el-form-item>
                        <el-form-item label="规格型号">
                            <el-input v-model="formInline.user" placeholder="规格型号"></el-input>
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
                        label="处理时间"
                        show-overflow-tooltip
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="address"
                        show-overflow-tooltip
                        label="处理人">
                </el-table-column>
                <el-table-column
                        prop="address"
                        show-overflow-tooltip
                        label="处理说明">
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
                        prop="address"
                        show-overflow-tooltip
                        label="设备编号">
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
                :visible.sync="zhibaochulishow"
                @close="closeHandle"
                width="1000px">
            <span slot="title" class="dialogtitle">
                查看页面
              </span>
            <zhibaochuli @closeShebeiHandle="zhibaochulishow=false"></zhibaochuli>
        </el-dialog>
        <el-dialog
                title="设备查看"
                :visible.sync="shebeichakanShow"
                @close="closeShebeiHandle"
                width="1000px">
            <span slot="title" class="dialogtitle">
                设备查看
              </span>
            <shebeichuli @closeShebeiHandle="shebeichakanShow=false" ></shebeichuli>
        </el-dialog>
    </div>
</template>

<script>
    import zhibaochuli from '@/components/globaltem/Zhibaochuli'
    import shebeichuli from '@/components/globaltem/Shebeichakan'

    export default {
        name: "DlList",
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
                zhibaochulishow:false,
                shebeichakanShow:false

            }
        },
        methods:{
            showOrderInfo(){//记录单号
                this.zhibaochulishow = true
            },
            closeHandle(){
                this.zhibaochulishow = false

            },
            showshebeiInfo(){//设备编号
                this.shebeichakanShow=true
            },
            closeShebeiHandle(){
                this.shebeichakanShow=false

            }
        },
        components:{
            zhibaochuli,shebeichuli
        }
    }
</script>

<style scoped lang="scss">
    .dllist{

    }
</style>