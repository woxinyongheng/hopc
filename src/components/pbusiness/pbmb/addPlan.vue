<template>
    <div class="addplan">
        <div class="dialogcontent">
            <div class="list">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item label="计划名称" required>
                        <el-input v-model="formInline.planName"></el-input>
                    </el-form-item>
                    <el-form-item label="设备类别" style="margin-left: 20px" required>
                        <el-select v-model="formInline.facilityTypeCode" placeholder="设备类别" @change="change">
                            <el-option v-for="(item,index) in typeList" :label="item.typeName"
                                       :value="item.typeCode"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="保养类型" required style="margin-left: 20px">
                        <el-select v-model="formInline.maintainType" placeholder="保养类型">
                            <el-option label="质保" value="0"></el-option>
                            <el-option label="维保" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>

            </div>
            <p class="label">选择设备
                <span @click="selectDeviceShow=true">选择</span>
                <span @click="deleteDevice">删除</span>
            </p>
            <el-table
                    :data="tableDataSelect"
                    @selection-change="handleSelectionChange"

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
                        <img class="tebleimg" :src="scope.row.picture" alt="">
                    </template>
                </el-table-column>

                <el-table-column
                        prop="assetsCode"
                        label="设备编号"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        prop="brandName"
                        label="品牌"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        prop="model"
                        label="规格型号"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        prop="areaName"
                        label="所处区域"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        prop="storageLocation"
                        label="存放位置"
                        show-overflow-tooltip>
                </el-table-column>
            </el-table>
            <div class="list">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item label="保养项目" required>
                        <el-select v-model="formInline.maintainCode" placeholder="保养项目" @change="changeMain">
                            <el-option v-for="item in mainList" :label="item.projectName" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="开始日期" required style="margin-left: 20px">
                        <el-date-picker
                                v-model="formInline.startTime"
                                format="yyyy-MM-dd"
                                value-format="yyyy-MM-dd"
                                @change="changeTimestart"
                                type="date"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="结束日期" required style="margin-left: 20px">
                        <el-date-picker
                                v-model="formInline.endTime"
                                format="yyyy-MM-dd"
                                value-format="yyyy-MM-dd"
                                @change="changeTimesend"
                                type="date"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-form>
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item label="周期类型" required>
                        <el-select v-model="formInline.cycleType" placeholder="周期类型" @change="changeCycle">
                            <el-option label="周" value="0"></el-option>
                            <el-option label="半月" value="1"></el-option>
                            <el-option label="月" value="2"></el-option>
                            <el-option label="季度" value="3"></el-option>
                            <el-option label="半年" value="4"></el-option>
                            <el-option label="年" value="5"></el-option>
                        </el-select>
                    </el-form-item>
                    <!--动态组合-->
                    <el-form-item v-if="formInline.cycleType==='0'" label="开始日期" required>
                        <el-select v-model="formInline.cycleRole.aTime" placeholder="开始日期">
                            <el-option label="每周一" value="1"></el-option>
                            <el-option label="每周二" value="2"></el-option>
                            <el-option label="每周三" value="3"></el-option>
                            <el-option label="每周四" value="4"></el-option>
                            <el-option label="每周五" value="5"></el-option>
                            <el-option label="每周六" value="6"></el-option>
                            <el-option label="每周天" value="7"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item v-if="formInline.cycleType==1" label="上半月日期" required>
                        <el-select v-model="formInline.cycleRole.aTime" placeholder="请选择">
                            <el-option v-for="i in 15" :label="i" :value="i"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item v-if="formInline.cycleType==1" label="下半月日期" required>
                        <el-select v-model="formInline.cycleRole.bTime" placeholder="请选择">
                            <el-option v-for="i in 15" :label="i+15" :value="i+15"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item v-if="formInline.cycleType==2" label="开始日期" required>
                        <el-select v-model="formInline.cycleRole.aTime" placeholder="请选择">
                            <el-option v-for="i in 30" :label="i" :value="i"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item v-if="formInline.cycleType==3" label="开始月份" required>
                        <el-select v-model="formInline.cycleRole.aTime" placeholder="开始月份">
                            <el-option label="第一个月" value="1"></el-option>
                            <el-option label="第二个月" value="2"></el-option>
                            <el-option label="第三个月" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item v-if="formInline.cycleType==3" label="开始日期" required>
                        <el-select v-model="formInline.cycleRole.bTime" placeholder="开始日期">
                            <el-option v-for="i in 30" :label="i" :value="i"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item v-if="formInline.cycleType==4" label="开始月份" required>
                        <el-select v-model="formInline.cycleRole.aTime" placeholder="开始月份">
                            <el-option label="第一个月" value="1"></el-option>
                            <el-option label="第二个月" value="2"></el-option>
                            <el-option label="第三个月" value="3"></el-option>
                            <el-option label="第四个月" value="4"></el-option>
                            <el-option label="第五个月" value="5"></el-option>
                            <el-option label="第六个月" value="6"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item v-if="formInline.cycleType==4" label="开始日期" required>
                        <el-select v-model="formInline.cycleRole.bTime" placeholder="开始日期">
                            <el-option v-for="i in 30" :label="i" :value="i"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item v-if="formInline.cycleType==5" label="开始日期" required>
                        <el-date-picker
                                v-model="formInline.cycleRole.aTime"
                                format="MM-dd"
                                value-format="MM-dd"
                                @change="changeTimeselect"
                                type="date"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="完成期限" required>
                        <el-input v-model="formInline.finalTime" type="number">
                            <template slot="append">天</template>
                        </el-input>
                    </el-form-item>
                </el-form>
                <el-form style="margin-left: 10px">
                    <el-form-item label="负责单位" prop="resource">
                        <el-radio-group v-model="formInline.responsibleCompany">
                            <el-radio label="0">本部</el-radio>
                            <el-radio label="1">外包</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
                <el-form :inline="true" :model="formInline" class="demo-form-inline"
                         v-if="formInline.responsibleCompany==1">

                    <el-form-item label="维保单位" required>
                        <el-input v-model="formInline.company"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人" required style="margin-left: 20px">
                        <el-input v-model="formInline.linkman"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话" required style="margin-left: 20px">
                        <el-input v-model="formInline.phone"></el-input>
                    </el-form-item>
                </el-form>
                <el-form ref="form" :model="formInline" label-width="80px" style="padding-right: 10px">

                    <el-form-item label="备注">
                        <el-input type="textarea" v-model="formInline.reamrks"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="dialogfooter" style="text-align: right">
            <el-button size="small" @click="zancun">暂存</el-button>
            <el-button type="primary" size="small" @click="sureClick">提交</el-button>
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
            <selectDevice :areaList="areaList" :typeList="typeList" :facilityTypeCode="formInline.facilityTypeCode"
                          @closeHandle="selectCloseHandle"></selectDevice>
        </el-dialog>
    </div>
</template>

<script>
    import selectDevice from './selectDevice'

    export default {
        name: "addPlan",
        props: ['typeList', 'areaList', 'editData', 'addeditid', 'clear'],
        data: function () {
            return {
                selectData: [],
                mainList: [],
                tableData: [],
                tableDataSelect: [],
                formInline: {
                    planName: '',
                    facilityTypeCode: '',
                    facilityTypeName: '',
                    maintainType: '',
                    maintainName: '',
                    maintainCode: '',
                    startTime: '',
                    endTime: '',
                    cycleType: '',
                    cycleRole: {
                        aTime: '',
                        bTime: ''
                    },
                    finalTime: '',
                    responsibleCompany: '',
                    company: '',
                    linkman: '',
                    phone: '',
                    remarks: '',
                    planAuditState:''
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
                selectDeviceShow: false
            }
        },
        mounted() {
            if (this.addeditid) {
                this.editNum()
            } else {
                this.mainList = []
                this.tableData = []
                this.tableDataSelect = []
                this.formInline = {
                    planName: '',
                    facilityTypeCode: '',
                    facilityTypeName: '',
                    maintainType: '',
                    maintainName: '',
                    maintainCode: '',
                    startTime: '',
                    endTime: '',
                    cycleType: '',
                    cycleRole: {
                        aTime: '',
                        bTime: ''
                    },
                    finalTime: '',
                    responsibleCompany: '',
                    company: '',
                    linkman: '',
                    phone: '',
                    remarks: '',
                    planAuditState:''
                }
            }
        },
        methods: {
            changeCycle(val) {
                this.formInline.cycleRole.aTime = ''
                this.formInline.cycleRole.bTime = ''
            },
            changeTimestart(val) {
                this.formInline.startTime = val
            },
            changeTimesend(val) {
                this.formInline.endTime = val
            },
            changeTimeselect(val) {
                this.formInline.cycleRole.aTime=val
            },
            //    列表选择
            handleSelectionChange(val) {
                this.selectData = val
            },
            //设备列表
            requestList() {
                let vm = this
                vm.$http.post('equipmentListController/equipmentList', {
                    interfaceNum: '1',
                    pageSize: vm.pageSize,
                    currentPage: vm.currentPage,
                    assetsTypeId: vm.formInline.facilityTypeCode
                }).then(res => {
                    if (res.code == 200) {
                        vm.total = res.data.count
                        vm.tableData = res.data.list
                    }
                })
            },
            //联动设备分类联动
            change(val) {
                let vm = this
                let _index = vm.typeList.findIndex(function (item) {
                    return item.typeCode == vm.formInline.facilityTypeCode
                })
                if (_index > -1) {
                    vm.formInline.facilityTypeName = vm.typeList[_index].typeName

                }
                this.tableDataSelect = []
                this.formInline.maintainCode = ''
                // this.requestList()
                this.requestmain()

            },
            changeMain(val) {
                let vm = this
                let _index = vm.mainList.findIndex(function (item) {
                    return item.id == vm.formInline.maintainCode
                })
                if (_index > -1) {
                    vm.formInline.maintainName = vm.mainList[_index].projectName

                }
            },
            //获取保养项目
            requestmain(str) {
                let vm = this
                let _i = vm.typeList.findIndex(function (item) {
                    return item.typeCode == vm.formInline.facilityTypeCode
                })
                let typeid = ''
                if (_i > -1) {
                    typeid = vm.typeList[_i].typeId
                }
                vm.$http.post('maintainProjectController/findMaintainProjectList', {
                    pageSize: '999',
                    currentPage: '1',
                    equipmentTypeId: typeid
                }).then(res => {
                    if (res.code == 200) {
                        vm.mainList = res.data.list
                        if (str) {
                            vm.mainList.forEach(function (item) {
                                if (item.projectName == vm.formInline.maintainName) {
                                    vm.formInline.maintainCode = item.id

                                }
                            })
                        }
                    }
                })
            },
            closeHandle() {
                this.$emit('closeHandle')
            },
            deleteDevice() {
                let vm = this
                this.$confirm('确定要删除这些选中的设备吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    if (!vm.selectData.length) {
                        return
                    }
                    vm.selectData.forEach(function (item) {
                        let _i = vm.tableDataSelect.findIndex(function (i) {
                            return i.equipmentId == item.equipmentId
                        })
                        vm.tableDataSelect.splice(_i, 1)
                    })
                }).catch(() => {

                });
            },
            selectCloseHandle(arr) {
                this.selectDeviceShow = false
                this.tableDataSelect = arr || []
                // this.requestmain()
            },
            sureClick() {
                this.save(1)
            },
            zancun() {
                this.save(0)
            },
            save(num) {
                let vm = this
                let _ids = []
                vm.tableDataSelect.forEach(function (item) {
                    _ids.push((item.equipmentId || item.id))
                })
                //验证
                if (!vm.formInline.planName) {
                    vm.$message({
                        message: '计划名称不能为空',
                        type: 'warning'
                    })
                    return
                }
                if (!vm.formInline.facilityTypeCode) {
                    vm.$message({
                        message: '设备类别不能为空',
                        type: 'warning'
                    })
                    return
                }
                if (!vm.formInline.maintainType) {
                    vm.$message({
                        message: '保养类型不能为空',
                        type: 'warning'
                    })
                    return
                }
                if (!_ids.length) {
                    vm.$message({
                        message: '必须选择设备',
                        type: 'warning'
                    })
                    return
                }
                if (!vm.formInline.maintainCode) {
                    vm.$message({
                        message: '必须选择保养项目',
                        type: 'warning'
                    })
                    return
                }
                if (!vm.formInline.startTime) {
                    vm.$message({
                        message: '开始日期不能为空',
                        type: 'warning'
                    })
                    return
                }
                if (!vm.formInline.endTime) {
                    vm.$message({
                        message: '结束日期不能为空',
                        type: 'warning'
                    })
                    return
                }
                if (!vm.formInline.cycleType) {
                    vm.$message({
                        message: '周期类型必须选择',
                        type: 'warning'
                    })
                    return
                }
                if (!vm.formInline.cycleType) {
                    vm.$message({
                        message: '周期类型必须选择',
                        type: 'warning'
                    })
                    return
                }
                let _cycleRole = vm.formInline.cycleRole
                if (!_cycleRole.aTime) {
                    vm.$message({
                        message: '周期类型说明必须选择',
                        type: 'warning'
                    })
                    return
                }
                if (!vm.formInline.finalTime) {
                    vm.$message({
                        message: '完成期限必须填写',
                        type: 'warning'
                    })
                    return
                }

                vm.$http.post('maintainPlan/addOrUpdateMaintainPlan', {
                    id: vm.addeditid,
                    planName: vm.formInline.planName,
                    facilityTypeCode: vm.formInline.facilityTypeCode,
                    facilityTypeName: vm.formInline.facilityTypeName,
                    maintainType: vm.formInline.maintainType,
                    assetId: _ids.join(','),
                    maintainName: vm.formInline.maintainName,
                    maintainCode: vm.formInline.maintainCode,
                    startTime: vm.formInline.startTime,
                    endTime: vm.formInline.endTime,
                    cycleType: vm.formInline.cycleType,
                    cycleRole: JSON.stringify(vm.formInline.cycleRole),
                    finalTime: vm.formInline.finalTime,
                    responsibleCompany: vm.formInline.responsibleCompany,
                    company: vm.formInline.responsibleCompany == 1 ? vm.formInline.company : JSON.parse(localStorage.getItem('LOGINDATA')).companyName,
                    linkman: vm.formInline.responsibleCompany == 1 ? vm.formInline.linkman : JSON.parse(localStorage.getItem('LOGINDATA')).name,
                    phone: vm.formInline.responsibleCompany == 1 ? vm.formInline.phone : JSON.parse(localStorage.getItem('LOGINDATA')).phone,
                    reamrks: vm.formInline.reamrks,
                    submitFlag: num,
                    planAuditState:vm.formInline.planAuditState
                }).then(res => {
                    if (res.code == 200) {
                        vm.$message({
                            message: res.message,
                            type: 'success'
                        })
                        vm.$emit('closeHandle', true)
                    }
                })
            },
            editNum() {
                let vm = this
                if (vm.addeditid) {
                    vm.formInline.planName = vm.editData.maintainPlanDetail.planName
                    vm.typeList.forEach(function (item) {
                        if (item.typeName == vm.editData.maintainPlanDetail.facilityTypeName) {
                            vm.formInline.facilityTypeCode = item.typeCode
                            vm.formInline.facilityTypeName = vm.editData.maintainPlanDetail.facilityTypeName
                        }
                    })
                    vm.formInline.maintainType = vm.editData.maintainPlanDetail.maintainType + ''
                    vm.tableDataSelect = vm.editData.assetsList.list

                    vm.formInline.maintainName = vm.editData.maintainPlanDetail.maintainName
                    vm.requestmain(true)

                    vm.formInline.planAuditState = vm.editData.maintainPlanDetail.planAuditState+''
                    vm.formInline.startTime = vm.editData.maintainPlanDetail.startTime
                    vm.formInline.endTime = vm.editData.maintainPlanDetail.endTime
                    vm.formInline.cycleType = vm.editData.maintainPlanDetail.cycleType + ''
                    vm.formInline.cycleRole = JSON.parse(vm.editData.maintainPlanDetail.cycleRole)
                    vm.formInline.finalTime = vm.editData.maintainPlanDetail.finalTime+''
                    vm.formInline.responsibleCompany = vm.editData.maintainPlanDetail.responsibleCompany + ''
                    vm.formInline.company = vm.editData.maintainPlanDetail.company

                    vm.formInline.linkman = vm.editData.maintainPlanDetail.linkman
                    vm.formInline.phone = vm.editData.maintainPlanDetail.phone
                    vm.formInline.remarks = vm.editData.maintainPlanDetail.remarks
                }
            }

        },
        components: {
            selectDevice
        },
        watch: {
            clear: function () {
                if (this.addeditid) {
                    this.editNum()
                } else {
                    this.mainList = []
                    this.tableData = []
                    this.tableDataSelect = []
                    this.formInline = {
                        planName: '',
                        facilityTypeCode: '',
                        facilityTypeName: '',
                        maintainType: '',
                        maintainName: '',
                        maintainCode: '',
                        startTime: '',
                        endTime: '',
                        cycleType: '',
                        cycleRole: {
                           aTime:'',
                            bTime:''
                        },
                        finalTime: '',
                        responsibleCompany: '',
                        company: '',
                        linkman: '',
                        phone: '',
                        remarks: '',
                        planAuditState:''
                    }
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .addplan {
        width: 100%;
        height: 600px;
        .dialogcontent {
            height: 580px;
            overflow-y: auto;
            .label {
                background-color: #E9EEF3;
                height: 40px;
                line-height: 40px;
                padding-left: 10px;
                position: relative;
                span {
                    position: absolute;
                    cursor: pointer;

                }
                span:nth-of-type(1) {
                    right: 60px;
                    color: #0c7ff2;

                }
                span:nth-of-type(2) {
                    right: 10px;
                    color: #e6a23c;

                }
            }
            .list {
                padding: 10px 0;
            }
        }
        .dialogfooter {

        }
    }


</style>