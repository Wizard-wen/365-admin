<template>
    <div class="authority">

        
        <div class="search box-style">
            <div class="deal-content">

            </div>
            <div class="order-pull" @click="pullSearch">
                <i class="el-icon-arrow-left pull-icon"></i>
            </div>
        </div>
        <div class="order" v-show="isSearch">
            <div class="order-message">
                <div class="search-head">
                    <div class="header">
                        <el-input 
                            v-model="searchForm.name" 
                            prefix-icon="el-icon-search"
                            placeholder="请输入"></el-input>
                        <div class="cancel">搜索</div>
                    </div>
                    <div class="search">
                        <div 
                            class="search-type"
                            v-for="(item, index) in typeList"
                            :key="index">
                            {{item.name}}
                            <i class="el-icon-arrow-down"></i>
                        </div>
                        <div class="icon" @click="spread">
                            <i class="el-icon-menu"></i>
                        </div>
                    </div>
                </div>
                <transition name="el-zoom-in-top">
                    <div v-if="showSearchBox" class="order-search" >
                    </div>
                </transition>
                
                
                <div class="order-content box-style">

                </div>
            </div>
        </div>

    </div>
</template>
<script>
    export default {
        data(){
            return {
                input:'',
                options2: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶',
                }],
                /**
                 * 订单查找字段
                 */
                searchForm:{
                    region:''
                },
                typeList: [
                    {
                        name:'区域'
                    },
                    {
                        name:'区域'
                    },
                    {
                        name:'区域'
                    },
                    {
                        name:'区域'
                    },
                ],
                showSearchBox:false,
                isSearch: true,
            }
        },
        methods:{   
            onSubmit(){

            },
            spread(){
                this.showSearchBox = !this.showSearchBox
            },
            pullSearch(){
                this.isSearch = !this.isSearch;
            }
        }
    }
</script>
<style lang="scss" scoped>
    .box-style{
        padding: 16px 16px;
        background: #fff;
    }

    .authority{
        background: #eaedf1;
        height:100%;
        width:100%;
        display: flex;
        
        .search{
            flex:1;
            height:100%;
            position: relative;
            .deal-content{
                height:100%;
                width: 100%;
                overflow-y: auto;
            }
            .order-pull{
                position: absolute;
                right: 0px;
                top:calc(50% - 60px);
                height: 100px;
                line-height: 100px;
                width: 16px;
                text-align: center;
                background: #333;
                border-top-left-radius: 6px;
                border-bottom-left-radius: 6px;
                cursor: pointer;
                .pull-icon{
                    color: #fff;
                    font-size: 14px;
                }
            }
        }
        
        .order{
            height: 100%;
            width: 375px;
            position: relative;
            &:after{
                position: absolute;
                content:'';
                height:100%;
                width:1px;
                background:#e8e8e8;
                left:0;
                top:0;
            }
            .order-message{
                position:relative;
                height: 100%;
                width: 100%;
                .search-head{
                    height: 85px;
                    width: 375px;
                    background: #fff;
                    border-bottom: 1px solid #e8e8e8;
                    .header{
                        width: 375px;
                        height: 50px;
                        display: flex;
                        padding:10px 0px 5px 25px;
                        & /deep/ .el-input{
                            width:285px;
                        }
                        & /deep/ .el-input__inner{
                            height: 35px;
                            line-height: 35px;
                            border-radius: 8px;
                        }
                        & /deep/ .el-input__icon{
                            line-height:35px;
                        }
                        .cancel{
                            margin-left:10px;
                            line-height: 35px;
                            cursor: pointer;
                        }
                    }
                    .search{
                        height: 35px;
                        width:100%;
                        display: flex;
                        .search-type{
                            width:25%;
                            line-height: 35px;
                            text-align: center;
                            font-size: 12px;
                            cursor: pointer;
                        }
                        .icon{
                            width:35px;
                            line-height: 35px;
                            text-align: center;
                            cursor: pointer;
                        }
                    }
                }
                
                .order-content{
                    height:calc(100% - 85px);
                    width: 100%;  
                    overflow: auto;
                    padding-bottom: 80px;
                }
                
                .order-search{
                    position: absolute;
                    height:300px;
                    width:100%;
                    top: 85px;
                    background:#fafafa;
                    border-bottom: 1px solid #e8e8e8;
                    // box-shadow: 1px 3px 3px rgba(0,0,0,.3);
                }
            }
        }
    }

</style>
