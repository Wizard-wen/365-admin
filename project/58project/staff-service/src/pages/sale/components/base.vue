<template>
    <el-card class="box-card">
        <div slot="header" class="card-header">
            <h3>订单基本信息</h3>
            <div class="control">
                <el-button 
                    type="text" 
                    :icon="isShow? 'el-icon-arrow-up' : 'el-icon-arrow-down'" 
                    circle size="small" 
                    @click="changeFormState">{{isShow?`收起`:`展开`}}</el-button>
            </div>
        </div>

        <div class="base-form-box" >
            <div class="base-message-box" v-if="isShow">
                <div v-if="baseList.length">
                    <div 
                        class="base-line"
                        :style="{
                            width: item.size == 1? '100%' : '50%',
                            marginBottom: index == baseList.length - 1? '20px': '0'}"
                        
                        v-for="(item, index) in baseList"
                        :key="index">
                        <div class="base-word" v-if="item.key">
                            <div class="base-key">{{item.key+'：'}}</div>
                            <div class="base-value" v-if="item.value">{{item.value}}</div>
                            <div class="base-value" style="color: #F56C6C" v-else>暂无数据</div>
                        </div>
                        <div class="base-word" v-else>
                            <div class="base-key"></div>
                            <div class="base-value"></div>
                        </div>
                    </div>
                </div>
                <div v-else> 暂无内容</div>
            </div>
        </div>
        
    </el-card>
</template>
<script>
export default {
    data(){
        return {
            orderKeyName: {
                manager_name: "创建人", //创建人
                user_name: '客户名',//客户名
                phone: '客户手机号',//客户手机号
                name: '服务名称',//服务名称
                service_address: '服务地址',//服务地址
                service_start_time: '服务开始时间',//服务开始时间
                service_end_time: '服务终止时间',//服务终止时间
                source: '订单来源',//订单来源
                remark: '备注信息',//备注信息
                create_manager_name: '创建人',
                hold_manager_name: "拥有人",
                // maintain_manager_name: "维护人",
                sign_manager_name: "签约人",
            },
            //是否展示表单
            isShow:true
        }
    },
    computed: {
        // baseForm(){
        //     return this.$store.state.orderModule.order
        // },
        baseList(){
            let obj = this.orderKeyName,
                baseForm = this.$store.state.orderModule.order,
                newArr = [];
            
            /**
             * key 为渲染字段的属性名
             * value 为某个属性名的值
             */
            Object.keys(baseForm).forEach((item, index) =>{
                if(obj.hasOwnProperty(item)){
                    let itemObj = {
                        key: obj[item],
                        value: baseForm[item]
                    }

                    //转换value格式
                    let realValue = itemObj.value,
                        realItemObj = {
                            value: ''
                        }
                    
                    //转化订单来源字段格式
                    if(item == "source"){
                        if(realValue == 1){
                            realItemObj.value = "线下"
                        } else if(realValue == 2){
                            realItemObj.value = "线上"
                        } else if(realValue == 3){
                            realItemObj.value = "渠道"
                        }

                        itemObj = {
                            ...itemObj,
                            ...realItemObj,
                        }
                    } 
                    //转化时间格式
                    if(item == "service_start_time" || item == "service_end_time"){
                        realItemObj.value = formatDate(new Date(realValue * 1000), 'yyyy-MM-dd hh:mm:ss')
                        itemObj = {
                            ...itemObj,
                            ...realItemObj,
                        }
                    }
                    newArr.push(itemObj)
                }

            })
            /**
             * 时间戳格式转换
             */
            function formatDate(date, fmt) {
                var o = {
                    "M+": date.getMonth() + 1,                 //月份
                    "d+": date.getDate(),                    //日
                    "h+": date.getHours(),                   //小时
                    "m+": date.getMinutes(),                 //分
                    "s+": date.getSeconds(),                 //秒
                    "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
                    "S": date.getMilliseconds()             //毫秒
                };
                if (/(y+)/.test(fmt))
                    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(fmt))
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
            }
            //获取字符串长度（汉字算两个字符，字母数字算一个）
            function getByteLen(val) {
                var len = 0;
                for (var i = 0; i < val.length; i++) {
                    var a = val.charAt(i);
                    if (a.match(/[^\x00-\xff]/ig) != null) {//\x00-\xff→GBK双字节编码范围
                        len += 2;
                    }
                    else {
                        len += 1;
                    }
                }
                return len;
            }
            newArr = newArr.map((item, index) =>{

                if(getByteLen(item.value) > 20){
                    return {
                        ...item,
                        size: 1, //长字段，独占一行
                    }
                } else {
                    return {
                        ...item,
                        size: 2,//短字段，占半行
                    }
                }
            })
            return newArr
        }
    },
    methods: {
        //改变表单的显示隐藏状态
        changeFormState(){
            this.isShow = !this.isShow
        }
    },
}
</script>
<style lang="scss" scoped>
    .box-card{
        margin: 10px 0 10px 10px;
        & /deep/ .el-card__header{
            padding: 0 30px;;
        }
        & /deep/ .el-card__body{
            padding: 20px;
        }
        .card-header{
            height:50px;
            width:100%;
            padding-right:30px;
            display: flex;
            justify-content: space-between;
            & h3{
                line-height: 50px;
            }
            .control{
                padding: 9px 0;
            }
        }
        .base-form-box{
            height: 100%;
            width: 100%;
            .base-message-box{
                width: 100%;
                .base-line{
                    float: left;
                    display: flex;
                    line-height: 40px;
                    .base-word{
                        display: flex;
                        .base-key{
                            width: 120px;
                            padding-right: 10px;
                            text-align: right;
                        }
                        .base-value{
                            flex: 1;
                        }
                    }
                }
            }
            
            .baseForm{
                width: 80%;
                min-width: 500px;
            }
        }
        
    }
</style>


