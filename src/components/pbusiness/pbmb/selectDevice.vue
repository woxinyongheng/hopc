<template>
    <div class="selectdevice">
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
                            <el-form-item label="设备品牌">
                                <el-select v-model="formInline.region" placeholder="设备品牌">
                                    <el-option label="区域一" value="1"></el-option>
                                    <el-option label="区域二" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="规格型号">
                                <el-input v-model="formInline.user" placeholder="规格型号"></el-input>
                            </el-form-item>
                            <el-form-item label="所在区域">
                                <el-cascader
                                        :options="options"
                                        v-model="formInline.tree"
                                        :props="props">
                                </el-cascader>
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
                        label="照片"
                        show-overflow-tooltip
                        width="80">
                    <template slot-scope="scope">
                        <img class="tebleimg" src="../../../../static/images/avatar.png" alt="">
                    </template>
                </el-table-column>

                <el-table-column
                        prop="date"
                        label="设备编号"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        prop="date"
                        label="品牌"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        prop="date"
                        label="规格型号"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        prop="date"
                        label="所处区域"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        prop="date"
                        label="存放位置"
                        show-overflow-tooltip>
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
        <div class="dialogfooter" style="text-align: right">
            <el-button type="primary" size="small" @click="selectDevice">选择</el-button>
            <el-button  size="small" @click="closeHandle">取消</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "selectDevice",
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
            }
        },
        methods:{
            selectDevice(obj){
                this.$emit('closeHandle',obj)
            },
            closeHandle(){
                this.$emit('closeHandle')
            }
        }

    }
</script>

<style scoped lang="scss">
.selectdevice{
    .contentbox{
        min-width: 1000px !important;
    }
}
</style>