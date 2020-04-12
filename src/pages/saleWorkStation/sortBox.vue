<template>
    <div class="sort-box">
        <div class="sort-title">
            {{title}}
        </div>
        <div class="sort-list">
            <div 
                class="sort-list-item"
                v-for="(item, index) in sortList" 
                :key="index">
                <div :class="['rank',index < 3?'rank-high': '']">{{index+1}}</div>
                <div class="sort-item-name">{{item.manager_name}}</div>
                <div class="sort-item-number">{{item[currentKey]}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: '',
        },  
        currentKey: {
            type: String,
            default: '',
        },
        sortList: {
            type: Array, 
            default(){
                return []
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.sort-box{
    // min-width:300px;
    width: 100%;
    height: 235px;
    padding: 0 20px;
    .sort-title{ 
        height: 30px;
        line-height: 30px;
        width: 100%;
        text-align: left;
        margin-bottom: 15px;
        color: rgba(0,0,0,.85);
        font-weight: 500;
    }
    .sort-list{
        .sort-list-item{
            display: flex;
            margin-bottom: 16px;
            .rank{
                line-height: 22px;
                text-align: center;
                height: 22px;
                width: 22px;
                border-radius: 50%;
                margin-right: 16px;
                color:rgba(0,0,0,.65);
            }
            .rank-high{
                background: #314659;
                color: #fff;
            }
            .sort-item-name{
                line-height: 22px;
                flex: 1;
                color: rgba(0,0,0,.65);
            }
            .sort-item-number{
                line-height: 22px;
                text-align: right;
                width:120px;
                color: rgba(0,0,0,.65);
            }
        }
        
    }
}
</style>