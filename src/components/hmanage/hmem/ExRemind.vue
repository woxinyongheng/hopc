<template>
    <div class="exremind">
        <div class="righttitle">
            <p>到期提醒设置</p>
        </div>
        <div class="contentbox" style="margin-top: 20px">
            <el-table
                    :data="tableData"
                    stripe
                    border
                    style="width: 100%">
                <el-table-column
                        label="序号"
                        type="index"
                        width="50">
                </el-table-column>
                <el-table-column
                        label="编号"
                        prop="name"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        prop="address"
                        show-overflow-tooltip
                        label="设备类别">
                    <template slot-scope="scope">
                        <span  @click="showtixingInfo(scope.row)" class="tableactive">{{scope.row.name}}</span>
                    </template>
                </el-table-column>

                <el-table-column
                        prop="name"
                        label="质保到期提醒"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        prop="address"
                        show-overflow-tooltip
                        label="寿命到期提醒">
                </el-table-column>
                <el-table-column
                        prop="address"
                        show-overflow-tooltip
                        label="提醒方式">
                </el-table-column>
                <el-table-column
                        prop="address"
                        show-overflow-tooltip
                        label="备注">
                </el-table-column>
                <el-table-column
                        prop="address"
                        show-overflow-tooltip
                        label="状态">
                    <template slot-scope="scope">
                        <span>启用</span>
                        <span>禁用</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="address"
                        show-overflow-tooltip
                        width="100"
                        label="启用/禁用">
                    <template slot-scope="scope">
                        <el-switch
                                v-model="scope.row.status==1">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="address"
                        show-overflow-tooltip
                        label="操作">
                    <template slot-scope="scope">
                        <span  class="tablebtn tablebtn-c1" @click="setClick(scope.row)">设置</span>
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
                title="提醒查看"
                :visible.sync="tixingchakanShow"
                @close="tixingchakanShow=false"
                width="1000px">
            <span slot="title" class="dialogtitle">
                提醒查看
              </span>
            <tixingchakan @editHandle="editHandle" @closeHandle="tixingchakanShow=false" ></tixingchakan>
        </el-dialog>
        <el-dialog
                title="到期提醒设置"
                :visible.sync="tixingshezhiShow"
                @close="tixingshezhiShow=false"
                width="1000px">
            <span slot="title" class="dialogtitle">
                到期提醒设置
              </span>
            <tixingshezhi @closeHandle="tixingshezhiShow=false" ></tixingshezhi>
        </el-dialog>
        <el-dialog
                title="编辑页面"
                :visible.sync="tixingbianjiShow"
                @close="tixingbianjiShow=false"
                width="1000px">
            <span slot="title" class="dialogtitle">
                编辑页面
              </span>
            <tixingbianji @closeHandle="tixingbianjiShow=false" ></tixingbianji>
        </el-dialog>
    </div>
</template>

<script>
    import tixingchakan from '@/components/globaltem/tixing/Tixingchakan'
    import tixingshezhi from '@/components/globaltem/tixing/Tixingshezhi'
    import tixingbianji from '@/components/globaltem/tixing/Tixingbianji'
    export default {
        name: "ExRemind",
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
                tixingchakanShow:false,
                tixingshezhiShow:false,
                tixingbianjiShow:false
            }
        },
        methods:{
            showtixingInfo(){
                this.tixingchakanShow =true
            },
            setClick(){
                this.tixingshezhiShow =true
            },
            editClick(){
                this.tixingbianjiShow = true
            },
            editHandle(){
                this.tixingchakanShow = false
                this.tixingbianjiShow = true
            }
        },
        components:{
            tixingchakan,tixingshezhi,tixingbianji
        }
    }
</script>

<style scoped lang="scss">
.exremind{

}
</style>