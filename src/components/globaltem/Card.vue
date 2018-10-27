<template>
    <div class="card" @mouseover="maskShow=true" @mouseleave="maskShow=false">
        <p class="cardtitle" :class="type==1?'':(type==2?'bgco2':'bgco3')">{{type==1?'计划审核':(type==2?'寿命到期':'质保到期')}}</p>
        <ul v-if="type==1">
            <li>计划名称</li>
            <li>设备类别</li>
            <li>保养项目</li>
            <li>周期类型</li>
            <li>设备数量</li>
            <li>送达时间</li>
        </ul>
        <ul v-if="type==2" class="bgcol2">
            <li>设备名称</li>
            <li>设备类别</li>
            <li>所在区域</li>
            <li>使用部门</li>
            <li>送达时间</li>
        </ul>
        <ul v-if="type==3" class="bgcol3">
            <li>设备名称</li>
            <li>设备类别</li>
            <li>所在区域</li>
            <li>使用部门</li>
            <li>送达时间</li>
        </ul>
        <div class="mask" v-if="maskShow" @click.stop="operateHandle">
            内容详情
        </div>
    </div>
</template>

<script>
    export default {
        name: "Card",
        props:['type'],
        data:function () {
            return{
                maskShow:false
            }
        },
        methods:{
            operateHandle(){
                this.$emit('operateHandle',this.type)
            }
        }

    }
</script>

<style scoped lang="scss">
.card{
    vertical-align: middle;
    min-width: 250px;
    box-shadow: 4px 2px 12px 5px rgba(0,0,0,.1);
    margin: 0px 20px;
    position: relative;

    color: #666;
    .cardtitle{
        height: 48px;
        line-height: 48px;
        padding: 0 10px;
        color: #ffffff;
        background-color: #409eff;
        font-weight: bold;

    }
    .bgco2{
        background-color: #67c23a;
    }
    .bgco3{
        background-color: #e6a23c;
    }
    .bgcol2{
        background: rgba(103,194,58,0.2);
    }
    .bgcol3{
        background: rgba(230,162,60,0.2);
    }
    ul{
        padding: 20px;
        background: rgba(64,158,255,0.2);
        li{
            height: 40px;
            line-height: 40px;
            font-size: 14px;
        }
    }
    .mask{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: rgba(0,0,0,0.5);
        color: #ffffff;
        text-align: center;
        line-height: 328px;
        font-size: 24px;
        cursor: pointer;
    }
}
</style>