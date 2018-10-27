<template>
    <div class="addplan">
        <div class="dialogcontent">
            <div class="list">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item label="计划名称" required>
                        <el-input v-model="formInline.user"></el-input>
                    </el-form-item>
                    <el-form-item label="设备类别" style="margin-left: 50px">
                        <el-cascader
                                :options="options"
                                v-model="formInline.tree"
                                :props="props">
                        </el-cascader>
                    </el-form-item>
                    <el-form-item label="保养类型" required style="margin-left: 60px">
                        <el-select v-model="formInline.region" placeholder="保养类型">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item label="保养项目" required>
                        <el-select v-model="formInline.region" placeholder="保养项目">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="开始日期" required style="margin-left: 25px">
                        <el-date-picker
                                v-model="formInline.user"
                                type="date"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="结束日期" required style="margin-left: 35px">
                        <el-date-picker
                                v-model="formInline.user"
                                type="date"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-form>
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item label="周期类型" required>
                        <el-select v-model="formInline.region" placeholder="保养项目">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="开始日期" required style="margin-left: 25px">
                        <el-date-picker
                                v-model="formInline.user"
                                type="date"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="完成期限" required style="margin-left: 35px">
                        <el-input v-model="formInline.user">
                            <template slot="append">天</template>
                        </el-input>
                    </el-form-item>
                </el-form>
                <el-form style="margin-left: 10px">
                    <el-form-item label="负责单位" prop="resource">
                        <el-radio-group>
                            <el-radio label="本部"></el-radio>
                            <el-radio label="外包"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
                <el-form :inline="true" :model="formInline" class="demo-form-inline" >

                    <el-form-item label="维保单位" required>
                        <el-input v-model="formInline.user"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人" required style="margin-left: 55px">
                        <el-input v-model="formInline.user"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话" required style="margin-left: 75px">
                        <el-input v-model="formInline.user"></el-input>
                    </el-form-item>
                </el-form>
                <el-form ref="form" :model="formInline" label-width="80px"  style="padding-right: 10px">

                    <el-form-item label="备注">
                        <el-input type="textarea" v-model="formInline.user"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <p class="label">选择设备
                <span @click="selectDeviceShow=true">选择</span>
                <span @click="deleteDevice">删除</span>
            </p>
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
            <el-button type="primary" size="small" @click="closeHandle">确认</el-button>
            <el-button  size="small" @click="closeHandle">取消</el-button>
        </div>
        <el-dialog
                title="选择设备"
                :visible.sync="selectDeviceShow"
                @close="selectDeviceShow=false"
                append-to-body
                width="1000px">
            <span slot="title" class="dialogtitle">
                选择设备
              </span>
            <selectDevice @closeHandle="selectCloseHandle" ></selectDevice>
        </el-dialog>
    </div>
</template>

<script>
    import selectDevice from './selectDevice'
    export default {
        name: "addPlan",
        data:function () {
            return{
                activeName:'first',
                tableData:[
                    {
                        date: '2016-05-04',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1517 弄'
                    },{
                        date: '2016-05-04',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1517 弄'
                    },{
                        date: '2016-05-04',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1517 弄'
                    },
                ],
                formInline: {
                    user: '',
                    region: '',
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
                selectDeviceShow:false
            }
        },
        methods:{
            closeHandle(){
                this.$emit('closeHandle')
            },
            deleteDevice(){
                this.$confirm('确定要删除这些选中的设备吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            selectCloseHandle(){
                this.selectDeviceShow=false
            }
        },
        components:{
            selectDevice
        }
    }
</script>

<style scoped lang="scss">
    .addplan{
        height: 600px;
        .dialogcontent{
            height: 580px;
            overflow-y: scroll;
            .label{
                background-color: #E9EEF3;
                height: 40px;
                line-height: 40px;
                padding-left: 10px;
                position: relative;
                span{
                    position: absolute;
                    cursor: pointer;

                }
                span:nth-of-type(1){
                    right: 60px;
                    color: #0c7ff2;

                }
                span:nth-of-type(2){
                    right: 10px;
                    color: #e6a23c;

                }
            }
            .list{
                padding: 10px 0;
            }
        }
        .dialogfooter{

        }
    }


</style>