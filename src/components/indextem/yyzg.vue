<template>
    <div class="yyzg">
        <el-row :gutter="20">
            <el-col :span="7"><div class="grid-content">
                <p class="title">设备状态</p>
                <div class="chart" id="myChart1"></div>
            </div></el-col>
            <el-col :span="7"><div class="grid-content">
                <p class="title">管理统计</p>
                <div class="chart" id="myChart2"></div>

            </div></el-col>
            <el-col :span="10"><div class="grid-content">
                <p class="title">报修趋势</p>
                <div class="chart3" id="myChart3"></div>

            </div></el-col>
        </el-row>
        <el-row :gutter="20" class="bottom">
            <el-col :span="7"><div class="grid-content">
                <p class="title">保养任务统计</p>
                <div class="chart" id="myChart4"></div>

            </div></el-col>
            <el-col :span="7"><div class="grid-content">
                <p class="title">维修任务统计</p>
                <div class="chart" id="myChart5"></div>

            </div></el-col>
            <el-col :span="10"><div class="grid-content">
                <p class="title">类型统计 TOP 10</p>
                <div class="chart" id="myChart6"></div>


            </div></el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "yyzg",
        data:function () {
            return{
                options1: {
                    tooltip: {
                        show:true,
                        trigger: 'item',
                        formatter: "{b}: {c} ({d}%)"
                    },
                    //环形颜色
                    color: ['#38C7C4', '#FCB635','#FFB6C1','#9932CC','0000FF','00008B','#778899','#7FFFAA','#FFFF00','#FF0000'],
                    legend: {
                        x : 'center',
                        y : 'bottom',
                        itemGap: 40
                    },
                    // graphic 是原生图形元素组件。可以支持的图形元素包括：image, text, circle, sector, ring, polygon, polyline, rect, line, bezierCurve, arc, group,
                    graphic: {
                        type: 'text',               // [ default: image ]用 setOption 首次设定图形元素时必须指定。image, text, circle, sector, ring, polygon, polyline, rect, line, bezierCurve, arc, group,
                        top: 'center',              // 描述怎么根据父元素进行定位。top 和 bottom 只有一个可以生效。如果指定 top 或 bottom，则 shape 里的 y、cy 等定位属性不再生效。『父元素』是指：如果是顶层元素，父元素是 echarts 图表容器。如果是 group 的子元素，父元素就是 group 元素。
                        left: 'center',             // 同上
                        style: {
                            text: '设备数量',       // 文本块文字。可以使用 \n 来换行。[ default: '' ]
                            fill: '#999',           // 填充色。
                            fontSize: 16,           // 字体大小
                            fontWeight: 'bold'		// 文字字体的粗细，可选'normal'，'bold'，'bolder'，'lighter'
                        }
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: ['45%', '65%'],
                            labelLine: {
                                normal: {
                                    show:false,
                                    length: 0,
                                    length2: 20,
                                    lineStyle: {
                                        color: '#999999'
                                    }
                                }
                            },
                            label: {
                                normal: {
                                    show:false,
                                    // \n\n可让文字居于牵引线上方，很关键
                                    //  {b}  代表显示的内容标题
                                    // {c}代表数据
                                    formatter: '{c}\n{b|{b}}',
                                    borderWidth: 0,
                                    borderRadius: 4,
                                    rich: {
                                        a: {
                                            color: '#333',
                                            fontSize: 12,
                                            lineHeight: 20,
                                            left: 'center'
                                        },
                                        b: {
                                            fontSize: 12,
                                            lineHeight: 20,
                                            color: '#333',
                                            left: 'center'
                                        }
                                    }
                                }
                            },
                            data: []
                        }
                    ]
                },
                option2:{

                    tooltip : {
                        trigger: 'item',
                        formatter: "{b} : {c} ({d}%)"
                    },
                    color: ['#38C7C4', '#FCB635','#FFB6C1','#9932CC','0000FF','00008B','#778899','#7FFFAA','#FFFF00','#FF0000'],

                    legend: {
                        x : 'center',
                        y : 'bottom',
                        data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
                    },
                    series : [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius : '65%',
                            center: ['50%', '50%'],
                            data:[],
                            labelLine: {
                                normal: {
                                    show:false,
                                    length: 0,
                                    length2: 20,
                                    lineStyle: {
                                        color: '#999999'
                                    }
                                }
                            },
                            label: {
                                normal: {
                                    show:false,
                                    // \n\n可让文字居于牵引线上方，很关键
                                    //  {b}  代表显示的内容标题
                                    // {c}代表数据
                                    formatter: '{c}\n{b|{b}}',
                                    borderWidth: 0,
                                    borderRadius: 4,
                                    rich: {
                                        a: {
                                            color: '#333',
                                            fontSize: 12,
                                            lineHeight: 20,
                                            left: 'center'
                                        },
                                        b: {
                                            fontSize: 12,
                                            lineHeight: 20,
                                            color: '#333',
                                            left: 'center'
                                        }
                                    }
                                }
                            },
                            // itemStyle: {
                            //     show:false,
                            //     emphasis: {
                            //         shadowBlur: 10,
                            //         shadowOffsetX: 0,
                            //         shadowColor: 'rgba(0, 0, 0, 0.5)'
                            //     }
                            // }
                        }
                    ]
                },

            option3:{
                    color: ['#3398DB'],
                    xAxis: {
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        axisLabel: {
                            interval: 0,
                            rotate: 40
                        }
                        },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                        type: 'line'
                    }]
                },
                option4:{
                    tooltip : {
                        trigger: 'item',
                        formatter: "{b} : {c} ({d}%)"
                    },
                    legend: {
                        x : 'center',
                        y : 'bottom',
                        data:['rose1','rose2','rose3','rose4','rose5','rose6','rose7','rose8']
                    },
                    color: ['#38C7C4', '#FCB635','#FFB6C1','#9932CC','0000FF','00008B','#778899','#7FFFAA','#FFFF00','#FF0000'],
                    series : [
                        {
                            name:'半径模式',
                            type:'pie',
                            radius : '65%',
                            center : ['50%', '50%'],
                            roseType : 'radius',
                            label: {
                                normal: {
                                    show: false
                                },
                                emphasis: {
                                    show: false
                                }
                            },
                            lableLine: {
                                normal: {
                                    show: false
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            data:[
                                {value:10, name:'rose1'},
                                {value:5, name:'rose2'},
                                {value:15, name:'rose3'},
                                {value:25, name:'rose4'},
                                {value:20, name:'rose5'},
                                {value:35, name:'rose6'},
                                {value:30, name:'rose7'},
                                {value:40, name:'rose8'}
                            ].sort(function (a, b) { return a.value - b.value; }),
                        },
                    ]
                },
                option5:{
                    tooltip : {
                        trigger: 'item',
                        formatter: "{b} : {c} ({d}%)"
                    },
                    legend: {
                        x : 'center',
                        y : 'bottom',
                        data:['rose1','rose2','rose3','rose4','rose5','rose6','rose7','rose8']
                    },
                    color: ['#38C7C4', '#FCB635','#FFB6C1','#9932CC','0000FF','00008B','#778899','#7FFFAA','#FFFF00','#FF0000'],

                    series : [
                        {
                            name:'半径模式',
                            type:'pie',
                            radius : '65%',
                            center : ['50%', '50%'],
                            roseType : 'radius',
                            label: {
                                normal: {
                                    show: false
                                },
                                emphasis: {
                                    show: false
                                }
                            },
                            lableLine: {
                                normal: {
                                    show: false
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            data:[
                                {value:10, name:'rose1'},
                                {value:5, name:'rose2'},
                                {value:15, name:'rose3'},
                                {value:25, name:'rose4'},
                                {value:20, name:'rose5'},
                                {value:35, name:'rose6'},
                                {value:30, name:'rose7'},
                                {value:40, name:'rose8'}
                            ].sort(function (a, b) { return a.value - b.value; }),
                        },
                    ]
                },
                option6:{
                    color: ['#3398DB'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    // legend: {
                    //     data: ['2011年', '2012年']
                    // },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value',
                        boundaryGap: [0, 0.01]
                    },
                    yAxis: {
                        type: 'category',
                        data: ['巴西','印尼','美国','印度','中国','世界人口(万)']
                    },
                    series: [
                        {
                            type: 'bar',
                            data: [18203, 23489, 29034, 104970, 131744, 630230]
                        },

                    ]
                }
            }
        },
        mounted(){
            this.requestBaoyang()
            this.requestRepai()
            this.requestTop()
            this.requestQushi()
            this.requestState()
            this.requestManage()
        },
        methods:{
            //    保养任务统计
            requestBaoyang(){
                let vm =this
                vm.$http.post('maintainController/countMaintain',{}).then(res=>{
                    if(res.code==200){
                        vm.option4.legend.data = res.data.legenddata.split(',')
                        vm.option4.series[0].data = res.data.seriesdata
                        let mycharts = vm.$echarts.init(document.getElementById('myChart4'));
                        mycharts.setOption(vm.option4)
                    }
                })
            },
        //    维修任务
            requestRepai(){
                let vm =this
                vm.$http.post('repair/countRepair',{}).then(res=>{
                    if(res.code==200){
                        vm.option5.legend.data = res.data.legenddata.split(',')
                        vm.option5.series[0].data = res.data.seriesdata
                        let mycharts = vm.$echarts.init(document.getElementById('myChart5'));
                        mycharts.setOption(vm.option5)
                    }
                })
            },
        //    前10
            requestTop(){
                let vm =this
                vm.$http.post('equipmentRecordController/getCountEquipment',{}).then(res=>{
                    if(res.code==200){
                        // vm.option6.yAxis.data = "制冷设备,测试的分类0202,测试分类1,测试,二级类,一般设备类,测试目录".split(',')
                        // vm.option6.series[0].data = "17,13,7,7,5,5,5".split(',')
                        vm.option6.yAxis.data = res.data.legenddata.split(',')
                        vm.option6.series[0].data = res.data.seriesdata.split(',')
                        let mycharts = vm.$echarts.init(document.getElementById('myChart6'));
                        mycharts.setOption(vm.option6)
                    }
                })
            },
        //    报修趋势
            requestQushi(){
                let vm =this
                vm.$http.post('repair/repairsTendency',{}).then(res=>{
                    if(res.code==200){
                        vm.option3.xAxis.data = res.data.xData
                        vm.option3.series[0].data = res.data.yData
                        let mycharts = vm.$echarts.init(document.getElementById('myChart3'));
                        mycharts.setOption(vm.option3)
                    }
                })
            },
        //    设备状态
            requestState(){
                let vm =this
                vm.$http.post('statisticsController/equipmentExport',{}).then(res=>{
                    if(res.code==200){
                        vm.options1.series[0].data=res.data.seriesdata
                        let num = 0
                        res.data.seriesdata.forEach(function (item) {
                            num = num +item.value*1
                        })
                        vm.options1.graphic.style.text = '设备数量'+num
                        let mycharts1 = vm.$echarts.init(document.getElementById('myChart1'));
                        mycharts1.setOption(vm.options1)
                    }
                })
            },
        //    管理统计
            requestManage(){
                let vm =this

                let mycharts = vm.$echarts.init(document.getElementById('myChart2'));
                mycharts.setOption(vm.option2)
                vm.$http.post('statisticsController/managementStatistics',{}).then(res=>{
                    if(res.code==200){
                        vm.option2.legend.data = res.data.legenddata
                        vm.option2.series[0].data = res.data.seriesdata
                        let mycharts = vm.$echarts.init(document.getElementById('myChart2'));
                        mycharts.setOption(vm.option2)
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .yyzg{
        min-height: 600px;
        .bottom{
            margin-top: 20px;
        }
        .grid-content{
            background-color: #fff;
            min-height: 300px;
            height: 40vh;
        }
        .title{
            height: 40px;
            line-height: 40px;
            padding-left: 20px;
            border-bottom: 1px solid #dcdcdc;
            font-weight: 400;
            color: #666666;
        }
        .chart{
            width: 90%;
            height: 80%;
            text-align: center;
        }
        .chart3{
            width: 90%;
            height: 80%;
        }
    }

</style>