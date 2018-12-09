<template>
    <div class="lifeex">
        <div class="righttitle">
            <p>寿命到期</p>
        </div>
        <div class="buttonbox">
            <div class="pullleft">
                <el-button size="mini" plain @click="stateClick('all')">全部</el-button>
                <el-button size="mini" plain type="danger" @click="stateClick('0')">未处理</el-button>
                <el-button size="mini" plain type="success" @click="stateClick('1')">已处理</el-button>
                <el-button size="mini" plain type="danger" @click="stateClick('3')">延期</el-button>
                <el-button size="mini" plain type="warning" @click="stateClick('2')">已超时</el-button>
            </div>
            <div class="pullright">
                <el-button type="success" size="mini" icon="el-icon-search" @click="filterShow=!filterShow">检索</el-button>
            </div>
        </div>
        <div class="filterbox" v-if="filterShow">
            <el-row>
                <el-col :span="21">
                    <div class="grid-content">
                        <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
                            <el-form-item label="设备编号">
                                <el-input v-model="formInline.assetsCode" placeholder="设备编号"></el-input>
                            </el-form-item>
                            <el-form-item label="设备名称">
                                <el-input v-model="formInline.assetsName" placeholder="设备名称"></el-input>
                            </el-form-item>
                            <el-form-item label="设备类别">
                                <el-select v-model="formInline.assetsTypeId" placeholder="设备类别">
                                    <el-option v-for="(item,index) in typeList" :label="item.typeName" :value="item.typeCode"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="设备品牌">
                                <el-select v-model="formInline.brandName" placeholder="设备品牌">
                                    <el-option v-for="(item,index) in brandList" :label="item.typeName" :value="item.typeCode"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="规格型号">
                                <el-input v-model="formInline.model" placeholder="规格型号"></el-input>
                            </el-form-item>
                            <el-form-item label="维修次数" class="selectinputmini">
                                <el-input v-model="formInline.repairNumber" placeholder="维修次数"  class="input-with-select ">
                                    <el-select slot="prepend" v-model="formInline.repairNumberSymbol" placeholder="" class="miniselect">
                                        <el-option v-for="(item,index) in frequencyData" :label="item.label" :value="item.label"></el-option>
                                    </el-select>
                                </el-input>
                            </el-form-item>
                            <el-form-item label="累计支出" class="selectinputmini">
                                <el-input v-model="formInline.repairExpenditure" placeholder="累计支出"  class="input-with-select">
                                    <el-select slot="prepend" v-model="formInline.repairExpenditureSymbol" placeholder="" class="miniselect">
                                        <el-option v-for="(item,index) in frequencyData" :label="item.label" :value="item.label"></el-option>
                                    </el-select>
                                </el-input>
                            </el-form-item>
                            <el-form-item label="保养次数" class="selectinputmini">
                                <el-input v-model="formInline.maintainNumber" placeholder="保养次数"  class="input-with-select">
                                    <el-select slot="prepend" v-model="formInline.maintainNumberSymbol" placeholder="" class="miniselect">
                                        <el-option v-for="(item,index) in frequencyData" :label="item.label" :value="item.label"></el-option>
                                    </el-select>
                                </el-input>
                            </el-form-item>
                            <el-form-item label="到期日期">
                                <el-date-picker
                                        v-model="formInline.lifeExpectancyStarts"
                                        format="yyyy-MM-dd"
                                        value-format="yyyy-MM-dd"
                                        @change="changeTimestart"
                                        type="date"
                                        placeholder="">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="至">
                                <el-date-picker
                                        v-model="formInline.lifeExpectancyEnd"
                                        format="yyyy-MM-dd"
                                        value-format="yyyy-MM-dd"
                                        @change="changeTimeend"
                                        type="date"
                                        placeholder="">
                                </el-date-picker>
                            </el-form-item>


                        </el-form>
                    </div>
                </el-col>
                <el-col :span="3">
                    <div class="grid-content searchbox">
                        <el-button type="primary" size="mini" icon="el-icon-search" @click="requestList">搜索</el-button>
                        <el-button size="mini" icon="el-icon-refresh" @click="resetSearch">重置</el-button>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="contentbox">
            <div class="batchSelectLabel">
                <i class="el-icon-warning"></i>
                已选择<span>{{selectData.length}}</span>项
            </div>
            <el-table
                    :data="tableData"
                    @selection-change="handleSelectionChange"

                    stripe
                    border
                    style="width: 100%">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        label="状态"
                        prop="state"
                        width="80">
                </el-table-column>
                <el-table-column
                        label="照片"
                        show-overflow-tooltip
                        width="80">
                    <template slot-scope="scope">
                        <img class="tebleimg" :src="scope.row.picture" alt="">
                    </template>
                </el-table-column>
                <el-table-column
                        prop="assetsCode"
                        label="设备编号"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        prop="assetsName"
                        show-overflow-tooltip
                        label="设备名称">
                    <template slot-scope="scope">
                        <span  @click="showshebeiInfo(scope.row)" class="tableactive">{{scope.row.assetsName}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="classifyName"
                        show-overflow-tooltip
                        label="设备类别">
                </el-table-column>
                <el-table-column
                        prop="brandName"
                        show-overflow-tooltip
                        label="设备品牌">
                </el-table-column>
                <el-table-column
                        prop="model"
                        show-overflow-tooltip
                        label="规格型号">
                </el-table-column>
                <el-table-column
                        prop="repairNumber"
                        show-overflow-tooltip
                        label="维修次数(次)">
                </el-table-column>
                <el-table-column
                        prop="repairPay"
                        show-overflow-tooltip
                        label="累计支出">
                </el-table-column>
                <el-table-column
                        prop="maintainNumber"
                        show-overflow-tooltip
                        label="保养次数(次)">
                </el-table-column>
                <el-table-column
                        prop="lifetimeExpiration"
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
                title="设备查看"
                :visible.sync="deviceInfoShow"
                @close="deviceInfoShow=false"
                width="1000px">
            <span slot="title" class="dialogtitle">
                设备查看
              </span>
            <DeviceInfo :adminList="adminList" :operateRow="operateRow" :deviceData="deviceData" @closeHandle="deviceInfoShow=false" :type="2"  ></DeviceInfo>
        </el-dialog>
        <!--延期弹框-->
        <el-dialog
                title="延期使用"
                :visible.sync="extendType"
                @close="extendType=false"
                width="1000px"
                append-to-body>
            <span slot="title" class="dialogtitle">延期使用</span>
            <extendTem :adminList="adminList" :operateRow="operateRow" @closeHandle="extendType=false"></extendTem>

        </el-dialog>
        <!--报废弹框-->
        <el-dialog
                title="报废处理"
                :visible.sync="scrapType"
                @close="scrapType=false"
                width="1000px"
                append-to-body>
            <span slot="title" class="dialogtitle">报废处理</span>
            <scrapTem :ltyArr="ltyArr" :scrapeReason="scrapeReason" :operateRow="operateRow" :adminList="adminList" @closeHandle="scrapType=false"></scrapTem>
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
                clear:0,
                //分页
                total:0,
                pageSize:10,
                currentPage:1,
                typeList:[],
                brandList:[],
                adminList:[],
                filterShow:false,
                formInline:{
                    state:'',
                    assetsCode:'',
                    assetsName:'',
                    assetsTypeId:'',
                    brandName:'',
                    model:'',
                    repairNumberSymbol:'',
                    repairNumber:'',
                    repairExpenditureSymbol:'',
                    repairExpenditure:'',
                    maintainNumberSymbol:'',
                    maintainNumber:'',
                    lifeExpectancyStarts:'',
                    lifeExpectancyEnd:''
                },
                frequencyData:[{label:'='},{label:'!='},{label:'>='},{label:'=<'},{label:'>'},{label:'<'}],
                tableData: [],
                deviceInfoShow:false,
                extendType:false,
                scrapType:false,
                selectData:[],
                deviceData:[],
                operateRow:'',
                scrapeReason:'',
                ltyArr:''


            }
        },
        mounted(){
          this.requestList()
            this.requestType()
            this.requestAdmin()
            this.requestscr()
            this.requestLty()
            this.initSocket()
            this.threadPoxi(JSON.parse(localStorage.getItem('LOGINDATA')).id)
        },
        methods:{
            threadPoxi(agentData) {  // 实际调用的方法
                let vm = this
                //参数
                // const agentData = "mymessage";
                //若是ws开启状态
                if (this.websock.readyState === this.websock.OPEN) {

                }
                // 若是 正在开启状态，则等待300毫秒
                else if (this.websock.readyState === this.websock.CONNECTING) {
                    let that = this;//保存当前对象this
                    setTimeout(function () {
                        that.websocketsend(agentData)
                    }, 300);
                }
                // 若未开启 ，则等待500毫秒
                else {
                    this.initWebSocket();
                    let that = this;//保存当前对象this
                    setTimeout(function () {
                        that.websocketsend(agentData)
                    }, 500);
                }
            },
            initSocket() {
                let vm = this
                //ws地址
                const wsuri = 'wss://imasdev.logimis.com/webSocket';
                this.websock = new WebSocket(wsuri);
                this.websock.onmessage = this.websocketonmessage;
                this.websock.onclose = this.websocketclose;

            },
            websocketonmessage(e) { //数据接收
                let vm = this
                debugger
            },
            websocketsend(agentData) {//数据发送
                this.websock.send(agentData);
            },
            websocketclose(e) {  //关闭
                let vm =this
                vm.linkstatus = 'off'  //状态链接
            },
            requestscr(){
              let vm =this
              vm.$http.post('maintainPlan/getDictValue',{
                  dictType:'scrap_reason'
              }).then(res=>{
                  if(res.code>0){
                      vm.scrapeReason=res.data
                  }
              })
            },
            requestLty(){
                let vm =this
                vm.$http.post('maintainPlan/getDictValue',{
                    dictType:'process_mode'
                }).then(res=>{
                    if(res.code>0){
                        vm.ltyArr=res.data
                    }
                })
            },
            changeTimestart(val){
                this.formInline.lifeExpectancyStarts=val
            },
            changeTimeend(val){
                this.formInline.lifeExpectancyEnd=val
            },
            //重置
            resetSearch(){
                this.formInline={
                    state:'',
                        assetsCode:'',
                        assetsName:'',
                        assetsTypeId:'',
                        brandName:'',
                        model:'',
                        repairNumberSymbol:'',
                        repairNumber:'',
                        repairExpenditureSymbol:'',
                        repairExpenditure:'',
                        maintainNumberSymbol:'',
                        maintainNumber:'',
                        lifeExpectancyStarts:'',
                        lifeExpectancyEnd:''
                }
                this.requestList()
            },
            //    列表选择
            handleSelectionChange(val){
                this.selectData=val
            },
            //状态
            stateClick(str){
                if(str=='all'){
                    this.formInline.state = ''
                }else{
                    this.formInline.state = str
                }
                this.requestList()
            },
            //列表
            requestList(){
                let vm =this
                vm.$http.post('assetsinfoController/getLifetimeExpiration',{
                    interfaceNum:'1',
                    pageSize:vm.pageSize,
                    currentPage:vm.currentPage,
                    state:vm.formInline.state,
                    assetsCode:vm.formInline.assetsCode,
                    assetsName:vm.formInline.assetsName,
                    assetsTypeId:vm.formInline.assetsTypeId,
                    brandName:vm.formInline.brandName,
                    model:vm.formInline.model,
                    repairNumberSymbol:vm.formInline.repairNumberSymbol,
                    repairNumber:vm.formInline.repairNumber,
                    repairExpenditureSymbol:vm.formInline.repairExpenditureSymbol,
                    repairExpenditure:vm.formInline.repairExpenditure,
                    maintainNumberSymbol:vm.formInline.maintainNumberSymbol,
                    maintainNumber:vm.formInline.maintainNumber,
                    lifeExpectancyStarts:vm.formInline.lifeExpectancyStarts,
                    lifeExpectancyEnd:vm.formInline.lifeExpectancyEnd,
                }).then(res=>{
                    if(res.code==200){
                        vm.tableData = res.data.list
                        vm.total = res.data.count
                    }
                })
            },
            //    获取设备分类列表
            requestType(){
                let vm =this
                vm.$http.post('equipmentConfigController/getDeviceTypeList',{}).then(res=>{
                    if(res.code=='200'){
                        vm.typeList = res.data
                    }
                })
            },
            showshebeiInfo(row){
                this.operateRow=row
                let vm =this
                vm.$http.post('equipmentListController/GetEquipmentById',{
                    id:row.id
                }).then(res=>{
                    if(res.code==200){
                        vm.deviceData = res.data.list
                        vm.deviceInfoShow =true
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
            extendInfo(row){
                this.operateRow=row
                this.extendType =true
                this.clear++
            },
            scrapInfo(row){
                this.operateRow=row
                this.clear++
                this.scrapType=true
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
            DeviceInfo,extendTem,scrapTem
        }
    }
</script>

<style scoped lang="scss">
    .lifeex {

    }
</style>