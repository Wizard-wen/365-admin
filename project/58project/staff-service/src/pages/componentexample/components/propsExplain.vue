<template>
    <div class="propsExplain">
        <table class="mydoc_api_table">
            <tr>
                <th>props名</th><th>props类型</th><th>默认值</th><th>参数说明</th>
            </tr>
            <tr v-for="(param, index) in calcPropsData" :key="index">
                <td>{{param.name || ''}}</td>
                <td>{{param.type || ''}}</td>
                <td>{{param.default || ''}}</td>
                <td><pre>{{param.describe || ''}}</pre></td>
            </tr>
        </table>
    </div>
</template>

<script>
    import codeStyle from './codeStyle.vue';
    import getComment from './getComment';

    export default {
        props: {
            //props的数据，是控件的props处的源码，例如：
            //控件为{props:{text1:{type: Number, default: 1},text1:{type: String, default: 'test'}}，应该传入：
            //“text1:{type: Number, default: 1},
            //text1:{type: String, default: 'test'}”
            //注意“,”和换行不能省略
            propsData: {
                type: String,
                default: ''
            },
            data: {
                type: String,
                default: ''
            },
        },
        components: {
            'v-codeStyle': codeStyle,
        },
        computed: {
            calcPropsData(){
                try{
                    //将json字符串转为json
                    var functionStr = (this.propsData || this.data).trim()
                    // console.log(functionStr)

                    //如果json字符串以“,”为结尾，将“,”去除
                    functionStr = functionStr.endsWith(",") ? functionStr.slice(0, -1) : functionStr
                    // console.log(functionStr)


                    //如果json字符串外部没有“{}”，将“{}”补充上，并购造function内部的代码，用于生成json对象
                    if((this.propsData || this.data).startsWith("{")){
                        functionStr = 'return (' + (this.propsData || this.data) + ')'
                    } else {
                        functionStr = 'return ({' + (this.propsData || this.data) + '})'
                    }
                    var json = new Function(functionStr)()

                    return Object.keys(json).map((name)=>{
                        var type =  json[name].type
                        if(Array.isArray(type)){
                            type = type.map(type=>type.name).join(" | ")
                        } else {
                            type = type.name
                        }
                        return {
                            name,
                            default: JSON.stringify(json[name].default),
                            type: type,
                            describe: this._getComment(name),
                        }
                    })
                } catch(e) {
                    console.error(e)
                    console.error('calcProps 计算错误：' + e)
                    return []
                }

            },
        },
        components: {
            'v-codeStyle': codeStyle,
        },
        watch:{
            propsData(){
                this._getComment = getComment((this.propsData || this.data))
            }
        },
        created(){
            this._getComment = getComment((this.propsData || this.data))
        }
    };

</script>


<style scoped>
    .propsExplain {
        width: 100%;
        line-height: 40px;
        text-align: left;
        margin-top: 20px;
    }


    .mydoc_api_describe {
        box-sizing : border-box ;
        position : relative ;
        padding : 24px 15px ;
        margin : 0px 0px 15px ;
        border-color : rgb(0,0,0) ;
        border-style : solid ;
        border-width : 1px ;
        box-shadow : none ;
        background-color : rgb(255,255,255) ;
        border-radius : 4px 4px 0px 0px ;
        color : rgb(51, 51, 51) ;
    }
    .mydoc_api_content {
        box-sizing : border-box ;
        margin : -16px 0px 15px ;
        padding : 9px 14px ;
        background-color : rgb(255,255,255) ;
        border : 1px solid rgb(0,0,0) ;
        border-radius : 0px 0px 4px 4px ;
        color : rgb(51, 51, 51) ;
    }

    .mydoc_api_table{
        margin : 15px 0px 0px ;
        padding : 0px ;
        border : 1px solid rgb(170, 170, 170) ;
        border-collapse : collapse ;
        width : 100% ;
        color : rgb(0, 0, 0) ;
        font-size : 14px ;
        background-color : rgb(253, 252, 248) ;
        margin-top: -1px;
        margin-bottom: 8px;
    }

    .mydoc_api_table tr{
        margin : 0px ;
        padding : 0px ;
        border : 0px ;
        background-color : rgb(255, 255, 255) ;
    }
    .mydoc_api_table tr:nth-child(odd){
        background-color : rgb(245, 245, 245) ;
    }
    .mydoc_api_table tr:nth-child(1){
        background-color : rgb(63, 63, 63);
    }

    .mydoc_api_table th{
        margin : 0px ;
        padding : 0px 15px 0px 6px ;
        border: 1px solid #e9e9e9;
        vertical-align : baseline ;
        text-align : left ;
        width : 123px ;
        word-break: break-all;
        background: #f7f7f7;
        white-space: nowrap;
        color: #5c6b77;
        font-weight: 600;
    }

    .mydoc_api_table td{
        line-height: 1.5;
        margin : 0px ;
        padding : 3px 15px 3px 6px ;
        border: 1px solid #e9e9e9;
        vertical-align : text-top ;
        word-break: break-all;
        font-size: 12px;
        color: #495060;
    }

</style>
