<template>
    <div class="query-tag">
        <div class="tag-item" :class="'tag-color'+`${(index%5)}`" v-for="(item, index) in queryTag" :key="index">
            {{item.name}}
            <i class="el-icon-close" @click="closeTag(item)"></i>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    props: {
        /**
         * 查询来源
         */
        queryFrom: {
            default: 'staff',
            type: String,
        }
    },
    computed:{
        configForm(){
            return this.$store.state.hrModule.configForm
        },
        queryedList(){
            return this.$store.state.hrModule.queryedList
        },
        queryTag(){
            let arr = [],
                _this = this;
            Object.keys(this.queryedList).forEach((item, index) =>{
                if(Array.isArray(this.queryedList[item])){
                    if(this.queryedList[item].length){
                        this.queryedList[item].forEach((it, ind) =>{
                            let itemKey = item.substring(0,item.length-4) 
                            arr.push({
                                type: 'array',
                                key: item,
                                value: it,
                                name: _this.analysisValue(itemKey, it)
                            })
                        })
                    }
                } else {
                    if(this.queryedList[item] != ''&& this.filterString(item)){
                        arr.push({
                            type: 'string',
                            key: item,
                            value: this.queryedList[item],
                            name: this.queryedList[item]
                        })
                    }
                }
            })
            return arr
        },
    },
    methods: {
        /**
         * 判断是否需要采集这个字段
         */
        filterString(item){
            let arr = ['get_for', 'page', 'pageNumber', 'count']
            if(arr.includes(item)){
                return false
            } else {
                return true
            }
        },
        /**
         * 名字
         */
        analysisValue(item, key){    
            return this.configForm[item].find(item => item.id == key).name
        },
        closeTag(item){
            let configValue = this.queryedList[item.key], //取出queryedList中字段的值
                newValue = null; //新值
            //字段类型是数组还是输入框
            if(item.type == 'array'){
                newValue = configValue
                newValue.splice(newValue.indexOf(item.value), 1)
            } else {
                newValue = ''
            }
            // debugger
            //将查询组件数据变化存入vuex
            if(this.queryFrom == 'staff'){
                this.$store.commit('setQueryList', {
                    queryKey: item.key, 
                    queryedList: newValue
                })
            } else {
                this.$store.commit('setSellerList', {
                    queryKey: item.key, 
                    queryedList: newValue
                })
            }

            //更新表格数据
            this.$emit('updateTable')
        }
    }
}
</script>
<style lang="scss" scoped>
    .query-tag{
        // width: 100%;
        height: 40px;
        padding: 5px 0;
        display: flex;
        flex-wrap: wrap;
        .tag-item{
            margin-right: 5px;
            padding: 0 12px;
            height: 30px;
            line-height: 30px;
            font-size: 14px;
            border: 1px solid #fff;
            border-radius: 4px;
            box-sizing: border-box;
            white-space: nowrap;
            .el-icon-close{
                &:hover{
                    cursor: pointer;
                }
            }
        }
    }
    .tag-color0{
        color: #409eff;
        border: 1px solid rgba(64,158,255,.2);
        background-color: rgba(64,158,255,.1);           
    }
    .tag-color1{
        background-color: rgba(103,194,58,.1);
        border-color: rgba(103,194,58,.2);
        color: #67c23a;
    }
    .tag-color2{
        background-color: rgba(144,147,153,.1);
        border-color: rgba(144,147,153,.2);
        color: #909399;
    }
    .tag-color3{
        background-color: rgba(230,162,60,.1);
        border-color: rgba(230,162,60,.2);
        color: #e6a23c;
    }
    .tag-color4{
        background-color: rgba(245,108,108,.1);
        border-color: rgba(245,108,108,.2);
        color: #f56c6c;       
    }

    .tag-color5{
        background-color: rgba(8,103,81,.1);
        border-color: rgba(8,103,81,.2);
        color: #086751;       
    }
    .tag-color6{
        background-color: rgba(8,101,139,.1);
        border-color: rgba(8,101,139,.2);
        color: #08658B;       
    }
    .tag-color7{
        background-color: rgba(185,29,85,.1);
        border-color: rgba(185,29,85,.2);
        color: #b91d55;       
    }
</style>


