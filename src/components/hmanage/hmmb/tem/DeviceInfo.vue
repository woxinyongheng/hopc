<template>
    <div class="shebei">
        <div class="dialogcontent">
            <div class="list">
                <table class="dialogtablebox">
                    <tbody>
                    <tr>
                        <td class="table-title">设备编码</td>
                        <td class="table-content"></td>
                        <td class="table-title">设备类别</td>
                        <td class="table-content"></td>
                        <td class="table-title">设备名称</td>
                        <td class="table-content"></td>
                    </tr>
                    <tr>
                        <td class="table-title">请购批号</td>
                        <td class="table-content"></td>
                        <td class="table-title">设备品牌</td>
                        <td class="table-content"></td>
                        <td class="table-title">规格型号</td>
                        <td class="table-content"></td>
                    </tr>
                    <tr>
                        <td class="table-title">SN号</td>
                        <td class="table-content"></td>
                        <td class="table-title">计量单位</td>
                        <td class="table-content"></td>
                        <td class="table-title">金额(元)</td>
                        <td class="table-content"></td>
                    </tr>
                    <tr>
                        <td class="table-title">购入时间</td>
                        <td class="table-content"></td>
                        <td class="table-title">所在区域</td>
                        <td class="table-content"></td>
                        <td class="table-title">存放位置</td>
                        <td class="table-content"></td>
                    </tr>
                    <tr>
                        <td class="table-title">管理员</td>
                        <td class="table-content"></td>
                        <td class="table-title">使用部门</td>
                        <td class="table-content"></td>
                        <td class="table-title">使用人</td>
                        <td class="table-content"></td>
                    </tr>
                    <tr>
                        <td class="table-title">使用期限(月)</td>
                        <td class="table-content"></td>
                        <td class="table-title">残值率(%)</td>
                        <td class="table-content"></td>
                        <td class="table-title">来源</td>
                        <td class="table-content"></td>
                    </tr>
                    <tr>
                        <td class="table-title">折后金额(元)</td>
                        <td class="table-content"></td>
                        <td class="table-title"></td>
                        <td class="table-content"></td>
                        <td class="table-title"></td>
                        <td class="table-content"></td>
                    </tr>
                    <tr>
                        <td class="table-title">备注</td>
                        <td class="table-content" colspan="5"></td>
                    </tr>
                    <tr>
                        <td class="table-title">照片</td>
                        <td class="table-content" colspan="5"></td>
                    </tr>
                    <tr>
                        <td class="table-title">供应商</td>
                        <td class="table-content"></td>
                        <td class="table-title">联系人</td>
                        <td class="table-content"></td>
                        <td class="table-title">联系电话</td>
                        <td class="table-content"></td>
                    </tr>
                    <tr>
                        <td class="table-title">维保到期</td>
                        <td class="table-content"></td>
                        <td class="table-title"></td>
                        <td class="table-content"></td>
                        <td class="table-title"></td>
                        <td class="table-content"></td>
                    </tr>
                    <tr>
                        <td class="table-title">维修次数</td>
                        <td class="table-content"></td>
                        <td class="table-title">累计支出(元)</td>
                        <td class="table-content"></td>
                        <td class="table-title">保养次数</td>
                        <td class="table-content"></td>
                    </tr>
                    <tr>
                        <td class="table-title">设备管理员</td>
                        <td class="table-content"></td>
                        <td class="table-title">责任归属</td>
                        <td class="table-content"></td>
                        <td class="table-title">任务归属</td>
                        <td class="table-content"></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="dialogfooter" style="text-align: right">
            <el-button  size="small" @click="closeHandle">关闭</el-button>
            <el-button v-if="type==2" type="primary" size="small" @click="extendType=true">延期使用</el-button>
            <el-button v-if="type==2" type="primary" size="small" @click="scrapType=true">报废处理</el-button>
            <el-button v-if="type==3" type="primary" size="small" @click="warrType=true">质保到期处理</el-button>
        </div>
        <!--延期弹框-->
        <el-dialog
                title="延期使用"
                :visible.sync="extendType"
                @close="extendType=false"
                width="1000px"
                append-to-body>
            <span slot="title" class="dialogtitle">延期使用</span>
            <div class="dialogcontent">
                <div class="list">
                    <el-form :inline="true" :model="formInline" class="demo-form-inline" style="display: flex;justify-content: space-between;margin-left: 10px">
                        <el-form-item label="记录号">
                            <el-input v-model="formInline.user"></el-input>
                        </el-form-item>
                        <el-form-item label="处理人" >
                            <el-input v-model="formInline.user"></el-input>
                        </el-form-item>
                        <el-form-item label="业务日期" required>
                            <el-date-picker
                                    v-model="formInline.user"
                                    type="date"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-form>
                    <el-form :inline="true" :model="formInline" class="demo-form-inline" style="display: flex;justify-content: space-between;margin-left: 10px">
                        <el-form-item label="确认人">
                            <el-select v-model="formInline.user" placeholder="确认人">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="延期时间">
                            <el-input v-model="formInline.user">
                                <template slot="append">月</template>
                            </el-input>
                        </el-form-item>
                    </el-form>
                    <el-form ref="form" :model="formInline" label-width="80px"  style="padding-right: 10px">
                        <el-form-item label="处理说明">
                            <el-input type="textarea" v-model="formInline.user"></el-input>
                        </el-form-item>
                    </el-form>
                    <el-form :model="formInline" label-width="80px">
                        <el-form-item label="相关附件">

                        </el-form-item>
                    </el-form>

                </div>
            </div>
            <div class="dialogfooter" style="text-align: right;margin-top: 20px">
                <el-button  size="small" @click="cancleExtend">取消</el-button>
                <el-button type="primary" size="small" @click="sureExtend">确认</el-button>
            </div>
        </el-dialog>
        <!--报废弹框-->
        <el-dialog
                title="报废处理"
                :visible.sync="scrapType"
                @close="scrapType=false"
                width="1000px"
                append-to-body>
            <span slot="title" class="dialogtitle">报废处理</span>
            <div class="dialogcontent">
                <div class="list">
                    <el-form :inline="true" :model="formInline" class="demo-form-inline" style="display: flex;justify-content: space-between;margin-left: 10px">
                        <el-form-item label="记录号">
                            <el-input v-model="formInline.user"></el-input>
                        </el-form-item>
                        <el-form-item label="处理人" >
                            <el-input v-model="formInline.user"></el-input>
                        </el-form-item>
                        <el-form-item label="业务日期" required>
                            <el-date-picker
                                    v-model="formInline.user"
                                    type="date"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-form>
                    <el-form :inline="true" :model="formInline" class="demo-form-inline" style="display: flex;justify-content: space-between;margin-left: 10px">
                        <el-form-item label="确认人">
                            <el-select v-model="formInline.user" placeholder="确认人">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <el-form ref="form" :model="formInline" label-width="80px"  style="padding-right: 10px">
                        <el-form-item label="处理说明">
                            <el-input type="textarea" v-model="formInline.user"></el-input>
                        </el-form-item>
                    </el-form>

                    <el-form :model="formInline" label-width="80px">
                        <el-form-item label="相关附件">

                        </el-form-item>
                    </el-form>
                </div>
                <div class="label" style="margin: 20px 0">报废详情</div>
                <div class="list">
                    <el-form :inline="true" :model="formInline" class="demo-form-inline" style="display: flex;justify-content: space-between;margin-left: 10px">
                        <el-form-item label="报废确认人" required>
                            <el-select v-model="formInline.user" placeholder="报废确认人">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="报废原因" required>
                            <el-select v-model="formInline.user" placeholder="报废原因">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <el-form :model="formInline" label-width="80px">
                        <el-form-item label="监测报告">

                        </el-form-item>
                    </el-form>
                </div>
                <div class="label" style="margin: 20px 0">报废详处理情</div>
                <div class="list">
                    <el-form :inline="true" :model="formInline" class="demo-form-inline" style="display: flex;justify-content: space-between;margin-left: 10px">
                        <el-form-item label="报废处理人" required>
                            <el-select v-model="formInline.user" placeholder="报废确认人">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="处理方式" required>
                            <el-select v-model="formInline.user" placeholder="报废原因">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <el-form :model="formInline" label-width="80px">
                        <el-form-item label="处理文件">

                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="dialogfooter" style="text-align: right;margin-top: 20px">
                <el-button  size="small" @click="cancleScrap">取消</el-button>
                <el-button type="primary" size="small" @click="sureScrap">确认</el-button>
            </div>
        </el-dialog>
        <!--质保到期弹框-->
        <el-dialog
                title="质保到期处理"
                :visible.sync="warrType"
                @close="warrType=false"
                width="1000px"
                append-to-body>
            <span slot="title" class="dialogtitle">质保到期处理</span>
            <div class="dialogcontent">
                <div class="list">
                    <el-form :inline="true" :model="formInline" class="demo-form-inline" style="display: flex;justify-content: space-between;margin-left: 10px">
                        <el-form-item label="记录号">
                            <el-input v-model="formInline.user"></el-input>
                        </el-form-item>
                        <el-form-item label="处理人" >
                            <el-input v-model="formInline.user"></el-input>
                        </el-form-item>
                        <el-form-item label="处理日期" required>
                            <el-date-picker
                                    v-model="formInline.user"
                                    type="date"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-form>
                    <el-form ref="form" :model="formInline" label-width="80px"  style="padding-right: 10px">
                        <el-form-item label="处理说明">
                            <el-input type="textarea" v-model="formInline.user"></el-input>
                        </el-form-item>
                    </el-form>
                    <el-form :model="formInline" label-width="80px">
                        <el-form-item label="相关附件">

                        </el-form-item>
                    </el-form>
                </div>

            </div>

            <div class="dialogfooter" style="text-align: right;margin-top: 20px">
                <el-button  size="small" @click="cancleWarr">取消</el-button>
                <el-button type="primary" size="small" @click="sureWarr">确认</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "shebeichakan",
        props:['type'],
        data:function () {
            return{
                extendType:false,
                scrapType:false,
                warrType:false,
                formInline: {
                    user: '',
                    region: ''
                }
            }
        },
        methods:{
            closeHandle(){
                this.$emit('closeHandle')
            },
            //延期
            cancleExtend(){
                this.extendType =false
            },
            sureExtend(){

            },
        //    报废
            cancleScrap(){
                this.scrapType =false
            },
            sureScrap(){

            },

        //    质保到期
            cancleWarr(){
                this.warrType =false
            },
            sureWarr(){

            }

        },

    }
</script>

<style scoped lang="scss">
    .shebei{
        height: 600px;
        .dialogcontent{
            height: 580px;
            overflow-y: scroll;
            .label{
                background-color: #E9EEF3;
                height: 30px;
                line-height: 30px;
                padding-left: 10px;
                position: relative;
                i{
                    position: absolute;
                    right: 10px;
                    display: inline-block;
                    top: 10px;
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