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
                        prop="typeCode"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        prop="typeName"
                        show-overflow-tooltip
                        label="设备类别">
                    <template slot-scope="scope">
                        <span  @click="showtixingInfo(scope.row)" class="tableactive">{{scope.row.typeName}}</span>
                    </template>
                </el-table-column>

                <el-table-column
                        prop="qualityExpiration"
                        label="质保到期提醒"
                        show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span v-if="scope.row.qualityExpiration.indexOf('0')>-1">系统</span>
                        <span v-if="scope.row.qualityExpiration.indexOf('1')>-1">短信</span>

                    </template>
                </el-table-column>
                <el-table-column
                        prop="lifetimeExpiration"
                        show-overflow-tooltip
                        label="寿命到期提醒">
                </el-table-column>
                <el-table-column
                        prop="remindWay"
                        show-overflow-tooltip
                        label="提醒方式">
                    <template slot-scope="scope">
                        <span v-if="scope.row.remindWay.indexOf('0')>-1">系统</span>
                        <span v-if="scope.row.remindWay.indexOf('1')>-1">短信</span>

                    </template>
                </el-table-column>
                <el-table-column
                        prop="remindRemarks"
                        show-overflow-tooltip
                        label="备注">
                </el-table-column>
                <el-table-column
                        prop="remindStatus"
                        show-overflow-tooltip
                        label="状态">
                    <template slot-scope="scope">
                        <span>{{scope.row.remindStatus==0?'禁用':'启用'}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="address"
                        show-overflow-tooltip
                        width="100"
                        label="启用/禁用">
                    <template slot-scope="scope">
                        <el-switch
                                @change="switchHandle(scope.row)"
                                v-model="scope.row.remindStatus==1">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="address"
                        show-overflow-tooltip
                        label="操作">
                    <template slot-scope="scope">
                        <span  v-if="!scope.row.qualityExpiration" class="tablebtn tablebtn-c1" @click="setClick(scope.row)">设置</span>
                        <span v-if="scope.row.qualityExpiration"  @click="editClick(scope.row)" class="tablebtn tablebtn-c2">编辑</span>
                    </template>
                </el-table-column>
            </el-table>
            <div class="page">
                <el-pagination
                        :current-page="1"
                        :page-sizes="[10, 20, 30, 50]"
                        :page-size="100"
                        @size-change="pageSizeChange"
                        @current-change="pageCurrentChange"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
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
            <tixingchakan :selectData="selectData" @editHandle="editHandle" @closeHandle="tixingchakanShow=false" ></tixingchakan>
        </el-dialog>
        <el-dialog
                title="到期提醒设置"
                :visible.sync="tixingshezhiShow"
                @close="tixingshezhiShow=false"
                width="1000px">
            <span slot="title" class="dialogtitle">
                到期提醒设置
              </span>
            <tixingshezhi :selectData="selectData" @closeHandle="closeHandleSet" ></tixingshezhi>
        </el-dialog>
        <el-dialog
                title="编辑页面"
                :visible.sync="tixingbianjiShow"
                @close="tixingbianjiShow=false"
                width="1000px">
            <span slot="title" class="dialogtitle">
                编辑页面
              </span>
            <tixingbianji :selectData="selectData" :id="selectData.id" @closeHandle="closeHandleEdit" ></tixingbianji>
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
                //分页
                total:0,
                pageSize:10,
                currentPage:1,
                filterShow:false,
                tableData: [],
                selectData:[],
                tixingchakanShow:false,
                tixingshezhiShow:false,
                tixingbianjiShow:false
            }
        },
        mounted(){
          this.requestList()
        },
        methods:{
            requestList(){
              let vm =this
              vm.$http.post('equipmentConfigController/getEquipmentOfCompanyList',{
                  pageSize:vm.pageSize,
                  currentPage:vm.currentPage
              }).then(res=>{
                  if(res.code==200){
                      vm.total = res.data.sum
                      vm.tableData = res.data.deviceConfigList
                  }
              })

            },
            showtixingInfo(row){
                this.selectData = row
                this.tixingchakanShow =true
            },
            setClick(row){
                this.selectData = row
                this.tixingshezhiShow =true
            },
            closeHandleSet(str){
                this.tixingshezhiShow =false
                if(str){
                    this.requestList()
                }
            },
            editClick(row){
                this.selectData = row
                this.tixingbianjiShow = true
            },
            closeHandleEdit(str){
                this.tixingbianjiShow = false
                if(str){
                    this.requestList()
                }
            },
            editHandle(row){
                this.tixingchakanShow = false
                this.tixingbianjiShow = true
            },
            //启用禁用
            switchHandle(row){
                let vm =this
                vm.$http.post('equipmentConfigController/updateEquipmentOfRemindStates',{
                    id:row.id,
                    remindStates:row.remindStatus==0?'1':'0'
                }).then(res=>{
                    if(res.code==200){
                        vm.$message({
                            message:res.message,
                            type:'success'
                        })
                        vm.requestList()

                    }
                })
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
            tixingchakan,tixingshezhi,tixingbianji
        }
    }
</script>

<style scoped lang="scss">
.exremind{

}
</style>