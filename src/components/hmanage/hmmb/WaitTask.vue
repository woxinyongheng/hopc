<template>
    <div class="waittask">
        <div class="righttitle" style="margin-bottom: 20px">
            <p>待办工作</p>
        </div>
        <div class="contentbox">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="全部" name="0">
                    <el-row :gutter="20">
                        <el-col :span="6" v-for="item in dataList" v-if="item.state==3"><div class="grid-content collist">
                            <card :item="item"   @operateHandle="operateHandle(1,item.id)" type="1"></card>
                        </div></el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="6" v-for="item in dataList" v-if="item.state==1"><div class="grid-content collist">
                            <card   :item="item"  @operateHandle="operateHandle(2,item.id)" type="2"></card>
                        </div></el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="6" v-for="item in dataList"  v-if="item.state==2"><div class="grid-content collist">
                            <card   :item="item"   @operateHandle="operateHandle(3,item.id)" type="3"></card>
                        </div></el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="计划审核" name="1">
                    <el-row :gutter="20">
                        <el-col :span="6" v-for="item in dataList" v-if="item.state==3"><div class="grid-content collist">
                            <card   :item="item"  @operateHandle="operateHandle(1,item.id)"type="1"></card>
                        </div></el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="寿命到期" name="2">
                    <el-row :gutter="20">
                        <el-col :span="6" v-for="item in dataList" v-if="item.state==1"><div class="grid-content collist">
                            <card   :item="item"   @operateHandle="operateHandle(2,item.id)" type="2"></card>
                        </div></el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="质保到期" name="3">
                    <el-row :gutter="20">
                        <el-col :span="6" v-for="item in dataList"  v-if="item.state==2"><div class="grid-content collist">
                            <card   :item="item"   @operateHandle="operateHandle(3,item.id)" type="3"></card>
                        </div></el-col>
                    </el-row>
                </el-tab-pane>
            </el-tabs>
        </div>
        <el-dialog
                title="计划审核"
                :visible.sync="checkplanShow"
                @close="checkplanShow=false"
                width="1000px">
            <span slot="title" class="dialogtitle">
                计划审核
              </span>
            <checkPlan :planData="planData" @closeHandle="closeHandleCheck"></checkPlan>
        </el-dialog>
        <el-dialog
                title="设备查看"
                :visible.sync="deviceInfoShow"
                @close="deviceInfoShow=false"
                width="1000px">
            <span slot="title" class="dialogtitle">
                设备查看
              </span>
            <DeviceInfo :adminList="adminList" :type="typeNum" :operateRow="operateRow" :deviceData="deviceData" @closeHandle="deviceInfoShow=false"></DeviceInfo>
        </el-dialog>

    </div>
</template>

<script>
    import card from '@/components/globaltem/Card'
    import checkPlan from './tem/checkPlan'
    import DeviceInfo from './tem/DeviceInfo'
    export default {
        name: "WaitTask",
        data:function () {
            return{
                activeName:0,
                checkplanShow:false,
                typeNum:1,
                deviceInfoShow:false,
                typeList:[],
                dataList:[],
                adminList:[],
                deviceData:'',
                operateRow:{id:''},
                planData:'',
            }
        },
        mounted(){
            this.requestList()
            this.requestAdmin()
        },
        methods:{
            closeHandleCheck(str){
                this.checkplanShow=false
                if(str){
                    this.requestList()
                }
            },
            requestList(){
                let vm =this
                vm.$http.post('assetsinfoController/getTodoTheWork',{

                }).then(res=>{
                    if(res.code==200){
                        vm.dataList = res.data.list
                    }
                })
            },
            //    获取设备管理员
            requestAdmin(){
                let vm =this
                vm.$http.post('userControl/getDeviceManagerList',{}).then(res=>{
                    if(res.code==200){
                        vm.adminList = res.data.userList
                    }
                })
            },
            //切换tab选项
            handleClick(tab,event){

            },

            //点击操作选项
            operateHandle(type,id){
                let vm =this
                this.typeNum = type
                switch (type*1) {
                    case 1:
                        vm.$http.post('maintainPlanAudit/getMaintainPlanDetail',{
                            pageSize:10,
                            currentPage:1,
                            id:id
                        }).then(res=>{
                            if(res.code==200){
                                vm.planData=res.data
                                vm.planData.maintainPlanDetail.cycleRole = JSON.parse(vm.planData.maintainPlanDetail.cycleRole)
                                vm.planData.id = id
                                vm.checkplanShow = true
                            }
                        })
                        break;
                    case 2:
                        vm.$http.post('equipmentListController/GetEquipmentById',{
                            id:id
                        }).then(res=>{
                            if(res.code==200){
                                vm.deviceData = res.data.list
                                vm.operateRow= res.data.list
                                vm.deviceInfoShow =true
                            }
                        })
                        break;
                    case 3:
                        vm.$http.post('equipmentListController/GetEquipmentById',{
                            id:id
                        }).then(res=>{
                            if(res.code==200){
                                vm.deviceData = res.data.list
                                vm.operateRow= res.data.list
                                vm.deviceInfoShow =true
                            }
                        })
                        break;
                    default:
                        break;
                }

            }
        },
        components:{
            card,checkPlan,DeviceInfo
        }

    }
</script>

<style scoped lang="scss">
.waittask{
    .contentbox{
        background-color: #fff;
        padding: 10px;
        .collist{
            margin: 30px 0;
        }

    }
    
}
</style>