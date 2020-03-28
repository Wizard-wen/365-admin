<template>
    <div class="funExplain">
        <p v-if="calcFunData.describeText">{{calcFunData.describeText}}</p>
        <template v-if="calcFunData.paramsText && calcFunData.paramsText.length">
            <p ><strong>参数列表：</strong></p>
            <table class="mydoc_api_table">
                <tr>
                    <th>参数名</th><th>参数类型</th><th>参数说明</th>
                </tr>
                <tr v-for="(param, index) in calcFunData.paramsText" :key="index">
                    <td>{{param.name || ''}}</td><td>{{param.type || ''}}</td><td>{{param.describe || ''}}</td>
                </tr>
            </table>
        </template>

        <template v-if="calcFunData.returnText">
            <p ><strong>返回值：</strong></p>
            <table class="mydoc_api_table">
                <tr>
                    <th>返回值类型</th><th>返回值说明</th>
                </tr>
                <tr>
                    <td>{{calcFunData.returnText.type || ''}}</td><td><pre>{{calcFunData.returnText.describe || ''}}</pre></td>
                </tr>
            </table>
        </template>
    </div>
</template>

<script>
    import codeStyle from './codeStyle.vue';

    //查找参数的正则
    const paramRegex = /@params?\s+({.*})?(\s+\S+)?(\s+.*)?$/

    //查找返回值的正则
    const returnRegex = /@returns?\s+({.*})?(\s+.*)?$/

    export default {
        props: {
            funData: {
                type: String,
                default: ''
            },
            //需要输入函数在vscode里面的注释，如：
            // /**
            //  * 自定义校验函数
            //  * @param {object}  rule        当前规则对象
            //  * @param {any}     value       验证的值
            //  * @param {any}     callback    回调对象，如果验证成功，执行callback()；如果验证失败，执行callback('错误提示')
            //  */
            data: {
                type: String,
                default: ''
            },
        },
        components: {
            'v-codeStyle': codeStyle,
        },
        computed: {
            calcFunData(){
                //将注释代码以“*”分割，因为每个个“*”是一行
                let rows = (this.data || this.funData).split("*").map(str=>str.trim()).filter(str=> str != '<br/>')

                //获取全部描述文本，描述文本是不以@开头的所有文本
                let describeText = rows.filter(str=> str[0] != '@').filter(str=>str).join('\n')

                //参数
                let paramsText = rows.filter(str => paramRegex.test(str)).map(str=>{
                    var paramInfo = paramRegex.exec(str).slice(1, 4).map(str=>str && str.trim());
                    return {
                        name: paramInfo[1],
                        type: paramInfo[0] && /{(.*)}/.exec(paramInfo[0])[1],
                        describe: paramInfo[2]
                    }
                })

                //返回值
                let returnText = rows.filter(str => returnRegex.test(str)).map(str=>{
                    var paramInfo = returnRegex.exec(str).slice(1, 3).map(str=>str && str.trim());
                    return {
                        type: paramInfo[0] && /{(.*)}/.exec(paramInfo[0])[1],
                        describe: paramInfo[1]
                    }
                })[0]

                return {
                    describeText,
                    paramsText,
                    returnText,
                }

            },
        }
    };

</script>


<style scoped>
    .funExplain {
        width: 100%;
        line-height: 40px;
        text-align: left;
        margin-top: 5px;
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
