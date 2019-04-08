<template>
    <el-cascader
        class="cascader"
        v-loading="loading"
        v-model="cascaderData"
        :options="optionList"
        :props="setProps"
        @visible-change="getList"
        @change="changeCascader"
        clearable
        size=""
        :show-all-levels="false"
        :placeholder="cascaderName">
    </el-cascader>
</template>
<script>
import axios from 'axios'
export default {
    props: {
        /**
         * v-model传入的数据
         */
        value: {
            default: function(){
                return []
            },
            type: [Number, Array]
        },
        /**
         * 级联选择器prop字段
         */
        setProps: {
            default : function(){
                return {
                    label: 'name',
                    value: 'id'
                }
            },
            type: Object
        },
        /**
         * 请求地址
         */
        requestUrl: {
            default: "",
            type: String
        },
        /**
         * placaholder名称
         */
        cascaderName: {
            type: String,
            default: ""
        },
        /**
         * v-model数据格式
         */
        modelType: {
            default: "Array",
            type: String
        }
    },
    watch: {
        value: function(val){
            //为了实现重置效果
            if(val.length == 0){
                this.cascaderData = []
            } else if(val == 0){
                this.cascaderData = []
            }
        }
    },
    data(){
        return {
            optionList: [],//级联选择器渲染字段
            cascaderData: [],
            loading: false
        }
    },
    methods: {
        changeCascader(val, type){
            let length = val.length,
                modelData = [];

            if(length){
                modelData.push(val[length - 1])
            } 

            if(this.modelType == "int"){
                modelData = modelData[0]
            }
            this.$emit('input', modelData)
        },
        /**
         * 异步获取级联选择器渲染数组
         */
        async getList(state){
            let url = this.requestUrl,
                _this = this;
            
            //如果是打开数组
            if(state){
                
                _this.optionList = [] //渲染数组清空
                _this.loading = true //loading

                await axios.get(url).then(data =>{
                    
                    _this.optionList = data.data
                    
                }).catch(err =>{
                    this.$message({
                        type:'error',
                        message: err.message
                    })
                }).finally(() =>{
                    _this.loading = false
                })
            }

        }
    },
    mounted(){

    }
}
</script>

