<template>
    <div class="match-box">

        <el-card class="match-message">
            <div class="match-box" slot="header">
                <!-- <div class="head-title line-bottom-1px">
                    <h3>服务人员查询</h3>
                </div> -->
                <div class="head-input">
                    <el-input placeholder="请输入员工姓名或id" v-model="searchForm.name" class="input-with-select">
                        <el-select v-model="select" slot="prepend" placeholder="请选择搜索方式">
                            <el-option label="按姓名搜索" value="1"></el-option>
                            <el-option label="按id搜索" value="2"></el-option>
                        </el-select>
                        <el-button slot="append" style="width:120px;">搜索</el-button>
                    </el-input>
                </div>
                <div class="head-cascader">
                    <el-form :inline="true" :model="staffSearch" class="cascader-form">
                        <el-form-item  class="form-item-style">
                            <el-cascader
                                class="cascader"
                                size="medium"
                                :options="areaList"
                                v-model="region"
                                :props="areaProps"
                                @change="changeRegion"
                                clearable
                                placeholder="服务地区">
                            </el-cascader>
                        </el-form-item>
                        
                        <el-form-item  class="form-item-style">
                            <el-cascader
                                class="cascader"
                                size="medium"
                                :options="skillList"
                                v-model="skill"
                                :props="skillProps"
                                @change="changeSkill"
                                clearable
                                placeholder="技能分类">
                            </el-cascader>
                        </el-form-item>
                        
                        <el-form-item  class="form-item-style">
                            <el-cascader
                                class="cascader"
                                size="medium"
                                :options="labelList"
                                v-model="label"
                                :props="labelProps"
                                @change="changeLabel"
                                clearable
                                placeholder="能力标签">
                            </el-cascader>
                        </el-form-item>
                        <el-form-item  class="form-item-style">
                            <el-cascader
                                class="cascader"
                                size="medium"
                                :options="labelList"
                                v-model="label"
                                :props="labelProps"
                                @change="changeLabel"
                                clearable
                                placeholder="能力标签">
                            </el-cascader>
                        </el-form-item>
                    </el-form>
                    <div class="icon" @click="spread" :title="'下拉展开更多搜索项'">
                        <i class="el-icon-arrow-down" v-if="!showSearchBox"></i>
                        <i class="el-icon-arrow-up" v-else></i>
                    </div>
                </div>
                <transition name="el-zoom-in-top">
                    <div v-if="showSearchBox" class="head-more-cascader" :style="{top: 120+`px`}">
                        <el-form :inline="true" :model="staffSearch" class="more-cascader-form">
                            <el-form-item v-for="(n, index) in 8" :key="index" class="form-item-style">
                                <el-cascader
                                    class="cascader"
                                    size="medium"
                                    :options="areaList"
                                    v-model="region"
                                    :props="areaProps"
                                    @change="changeRegion"
                                    clearable
                                    placeholder="服务地区">
                                </el-cascader>
                            </el-form-item>
                        </el-form>
                    </div>
                </transition>
            </div>

            <div class="match-content">
                <el-card
                    class="match-service-item"
                    v-for="(item, index) in 20"
                    :key="index">

                </el-card>
            </div>
        </el-card>
    </div>
</template>
<script>
export default {
    data(){
        return{
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
                    name:'标签'
                },
                {
                    name:'服务类型'
                },
                {
                    name:'区域'
                },
            ],
            select: '',
            showSearchBox:false,
            //表单搜索项
            staffSearch: {
                name: '', //姓名
                region_ids: [],//服务地区
                service_category_id: '',//技能分类
                ability_ids: [],//能力标签
                paper_ids: [],//证书
            },
            region: [],//地区级联选择器筛选信息
            areaList: [],//地区级联选择器渲染数组
            skill: [],//技能级联选择器筛选信息
            skillList: [],//技能级联选择器渲染数组
            paper: [],//证书级联选择器筛选信息
            paperList: [],//证书级联选择器渲染数组
            label: [],//能力标签级联选择器筛选信息
            labelList: [],//能力标签级联选择器渲染数组
            //地区级联选择字段
            areaProps: {
                label: 'name',
                value: 'id'
            },
            //技能级联选择字段
            skillProps: {
                label: 'name',
                value: 'id'
            },
            //能力标签级联选择字段
            labelProps: {
                label: 'name',
                value: 'id'
            },
            //证书级联选择字段
            paperProps: {
                label: 'name',
                value: 'id'
            },
        }
    },
    methods: {
        spread(){
            this.showSearchBox = !this.showSearchBox
        },
                    /**
             * 地区级联选择器更改时
             */
            changeRegion(val){
                let length = val.length
                this.staffSearch.region_ids.push(val[length - 1])
            },
            /**
             * 技能级联选择器更改时
             */
            changeSkill(val){
                let length = val.length
                this.staffSearch.service_category_id = val[length - 1]
            },
            /**
             * 能力标签级联选择器更改时
             */
            changeLabel(val){
                let length = val.length
                this.staffSearch.ability_ids.push(val[length - 1])
            },
    }
}
</script>
<style lang="scss" scoped>
    .line-bottom-1px{
        &:after{
            position: absolute;
            bottom: 0;
            content: '';
            display: block;
            height: 1px;
            width: 100%;
            background: #ccc; 
        }
    }
    .match-box{
        height: 100%;
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
        .match-message{
            & /deep/ .el-card__header{
                padding: 0;
            }
            & /deep/ .el-card__body{
                padding: 0 20px;
                height:calc(100% - 120px);
                width: 100%;  
                overflow: scroll;
                padding-bottom: 80px;
            }
            height: 100%;
            width: 100%;
            background: #fff;
            //搜索项
            .match-box{
                height: 100px;
                width: 100%;
                background: #fff;
                border-bottom: 1px solid #e8e8e8;
                position: relative;
                //标题
                .head-title{
                    position: relative;
                    height: 50px;
                    width: 100%;
                    line-height: 50px;
                    h3{
                        padding: 0 30px;
                    }
                }
                //表单搜索框
                .head-input{
                    width: 100%;
                    height: 60px;
                    display: flex;
                    padding:12px 30px;
                    & /deep/ .el-select{
                        width: 150px;
                    }
                    & /deep/ .input-with-select{
                        height:36px;
                    }
                }
                //级联选择器
                .head-cascader{
                    height: 40px;
                    width:100%;
                    padding: 0 30px;
                    display: flex;
                    justify-content: space-between;
                    //级联选择器表单
                    .cascader-form{
                        // padding: 10px 0;
                        width:calc(100% - 30px);
                        & /deep/ .el-form-item{
                            margin-bottom:0;
                            width:120px;
                        }
                        & /deep/ .el-input__inner{
                            border: none;
                        }
                        .form-item-style{

                        }
                    }
                    //展开图标
                    .icon{
                        width:30px;
                        line-height: 60px;
                        text-align: center;
                        cursor: pointer;
                        font-size: 20px;
                    }
                }
                //更多级联选择器
                .head-more-cascader{
                    position: absolute;
                    height:120px;
                    width:100%;
                    padding: 0 30px;
                    background:#fafafa;
                    border-bottom: 1px solid #e8e8e8;
                    //更多级联选择器表单
                    .more-cascader-form{
                        padding-top: 12px;
                        & /deep/ .el-form-item{
                            
                            margin-bottom: 12px;
                            width:calc(25% - 13px);
                        }
                    }
                }
            }
            //匹配员工信息列表
            .match-content{
                .match-service-item{
                    // height: 80px;
                    width: 100%;
                    // border: 1px solid #ccc;
                    // border-radius: 6px;
                    margin: 20px 0;
                }
            }
            

        }
    }
    
</style>


