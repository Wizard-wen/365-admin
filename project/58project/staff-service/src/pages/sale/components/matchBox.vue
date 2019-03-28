<template>
    <div class="match-box" v-loading="loading">
        <el-card class="match-message">
            <div class="match-search-box" slot="header">
                <div class="head-input">
                    <div class="head-input-left">
                        <el-input  placeholder="请输入员工姓名" v-model="staffSearch.name" class="input-with-select" ></el-input>
                        <el-input  placeholder="请输入员工号" v-model="staffSearch.staff_code" class="input-with-select"></el-input>
                        <el-button type="primary"  @click="searchReset" >重置</el-button>
                        <el-button type="primary"  @click="searchStaff">搜索</el-button>
                    </div>
                    
                </div>
                <div class="head-cascader">

                    <cascader-component
                        v-model="staffSearch.region_ids"
                        :cascaderName="'服务地区'"
                        :setProps="cascaderOption.cascaderProps"
                        :requestUrl="'./admin/common/getAreaTree'"></cascader-component>
                    <cascader-component
                        v-model="staffSearch.service_category_id"
                        :cascaderName="'技能分类'"
                        :modelType="'int'"
                        :setProps="cascaderOption.cascaderProps"
                        :requestUrl="'./admin/common/getServiceTree'"></cascader-component>
                    <cascader-component
                        v-model="staffSearch.ability_ids"
                        :cascaderName="'能力标签'"
                        :setProps="cascaderOption.cascaderProps"
                        :requestUrl="'./admin/common/getLabelTree'"></cascader-component>

                    <div class="spread-icon" @click="spread" :title="'下拉展开更多搜索项'">
                        <el-button icon="el-icon-arrow-down"  type="text" size="medium"  v-if="!showSearchBox">更多</el-button>
                        <el-button icon="el-icon-arrow-up"  type="text" size="medium"  v-else>收起</el-button>
                    </div>
                </div>

                <transition name="el-zoom-in-top">
                    <div v-if="showSearchBox" class="head-more-cascader" :style="{top: 100+`px`}"></div>
                </transition>
            </div>

            <div class="match-content">
                <div class="match-list" v-if="staffMatchTable.length" >
                    <div
                        class="match-service-item"
                        v-for="(item, index) in staffMatchTable"
                        :key="index">
                        <div class="service-pic">
                            <img class="head-icon" v-if="item.icon != ''" :src="`./resource/${item.icon}`" alt="">
                            <img class="head-icon" v-else :src="headIcon" alt="">
                        </div>
                        <div class="service-message">
                            <div class="service-message-line">
                                <p class="label">姓名：</p>
                                <p class="value">{{item.name}}</p>
                            </div>
                            <div class="service-message-line">
                                <p class="label">年龄：</p>
                                <p class="value">{{item.age}}</p>
                            </div>
                            <div class="service-message-line">
                                <p class="label">地址：</p>
                                <p class="value">{{item.address}}</p>
                            </div>
                            <div class="service-message-line">
                                <p class="label">联系方式：</p>
                                <p class="value">{{item.phone}}</p>
                            </div>
                            <div class="control">
                                <el-button type="text" size="small" @click="sureSelect(item)">备选</el-button>
                                <el-button type="text" size="small" @click="showDetail(item.id)">详情</el-button>
                            </div>

                        </div>
                    </div>
                    <!-- 分页 -->
                    <el-pagination
                        style="margin-top:30px;"
                        @current-change="handleCurrentPage"
                        @prev-click="handleCurrentPage"
                        @next-click="handleCurrentPage"
                        :current-page.sync="pagination.currentPage"
                        :page-size="10"
                        layout="prev, pager, next, jumper"
                        :total="pagination.total"></el-pagination>
                </div>
                <div v-else>暂无数据</div>
            </div>
        </el-card>

        <staff-detail-dialog
            :staffId="detailStaffId"
            v-if="dialogFormVisible"
            :openDetailDialog="dialogFormVisible"
            @sign="createOrderStaff"
            @closeDetailDialog="dialogFormVisible = false"></staff-detail-dialog>
    </div>
</template>
<script>
import {hrService} from '../../../../common'
import {orderService} from '../../../../common'

import staffDetailDialog from './staffDetailDialog.vue'
import cascaderComponent from './cascaderComponent.vue'

import headIcon from '../../../assets/head-icon.jpg'
export default {
    components: {
        staffDetailDialog,
        cascaderComponent
    },
    data(){
        return{
            /**
             * 服务人员列表查找字段
             */
            staffSearch: {
                name: '',
                staff_code: null,
                region_ids: [],//服务地区
                service_category_id: 0,//技能分类
                ability_ids: [],//能力标签
            },

            //下拉展开字段
            showSearchBox:false,

            //级联选择器配置数据
            cascaderOption: {
                //级联选择器prop字段
                cascaderProps: {
                    label: 'name',
                    value: 'id'
                },
            },

            //员工列表
            staffMatchTable: [],
            /**
             * 分页信息
             */
            pagination: {
                total: 0,
                currentPage: 1,
                pageNumber: 10,
            },

            //弹出框显示隐藏字段

            dialogFormVisible: false,
            detailStaffId: 0,
            loading:false,
            headIcon,//头像
        }
    },
    computed:{
        /**
         * 全部已添加搜索字段
         */
        searchArray(){
            let arr = [],
            _this = this;

            Object.keys(this.staffSearch).forEach((item, index) =>{
                //如果搜索字段是数组的话
                if(Array.isArray(_this.staffSearch[item])){
                    if(_this.staffSearch[item].length){
                        let obj = {}
                        obj[item] = [..._this.staffSearch[item]]
                        obj = {
                            ...obj,
                            key: item
                        }
                        arr.push(obj)
                    }
                }
                //如果搜索字段是字符串的话
                else if(_this.staffSearch[item] != ''){
                    let obj = {}
                    obj[item] = _this.staffSearch[item]
                    obj = {
                        ...obj,
                        key: item
                    }
                    arr.push(obj)
                }
            })
            return arr
        },
    },
    methods: {
        /**
         * 请求表格数据
         * @param tableOption 表格配置项
         * @param tableOption.currentPage 当前页
         * @param tableOption.searchSelect Array 页面筛选项
         * [{searchkey: '', searchValue: ''}]
         */
        async getTableList(){

            let tableOption = {
                searchSelect: this.searchArray,
                get_for: "order",
                currentPage: this.pagination.currentPage,
                pageNumber: this.pagination.pageNumber,
            }

            this.loading = true

            try{
                await hrService.getStaffList(tableOption)
                    .then(data =>{
                        //匹配的服务人员列表
                        this.staffMatchTable = data.data.data

                        //分页信息
                        this.pagination.currentPage = data.data.current_page //当前页码
                        this.pagination.total = data.data.total //列表总条数

                    }).catch(error =>{
                        this.$message({
                            type:'error',
                            message: error.message
                        })
                    }).finally(() =>{
                        this.loading = false
                    })
            }catch(error){
                this.$message({
                    type:'error',
                    message: error.message
                })
            }   
        },
        /**
         * 切换页码
         */
        async handleCurrentPage(val){
            this.pagination.currentPage = val
            await this.getTableList()
        },
        /**
         * 展开更多搜索选项 ---- 一期不上
         */
        spread(){
            this.showSearchBox = !this.showSearchBox
        },
        /**
         * 查找服务人员
         */
        async searchStaff(){
            await this.getTableList()
        },
        /**
         * 重置搜索信息
         */
        async searchReset(){
            this.staffSearch.name= ''
            this.staffSearch.staff_code= null
            this.staffSearch.region_ids= []//服务地区
            this.staffSearch.service_category_id= 0//技能分类
            this.staffSearch.ability_ids= []//能力标签

            await this.getTableList()
        },
        /**
         * 显示服务人员详情
         */
        async showDetail(id){
            this.dialogFormVisible = true
            this.detailStaffId = id;
        },
        /**
         * 询问是否确定备选
         */
        async sureSelect(item){
            let _this = this
            this.$confirm('确定匹配该服务人员吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                
                await _this.createOrderStaff(item)

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消匹配'
                });          
            })
        },
        /**
         * 添加候选人
         */
        async createOrderStaff(item){
            //取出所有备选人员
            let order_staff_list = store.state.orderModule.order_staff

            //该服务人员是否已经备选
            let isHave = order_staff_list.some((it, index) =>{
                return it.staff_code == item.staff_code
            })

            //如果已经匹配
            if(isHave){ 
                this.$message({
                    type:'error',
                    message: `该人员已经匹配`
                })
                return false;
            }

            //在弹出框中备选
            let order_staff_item = {
                order_id: this.$route.query.order_id,
                staff_id: item.id ,
                staff_code: item.staff_code,
                staff_name: item.name,
            }

            store.commit('setLoading',true)

            //添加服务人员接口
            await orderService.createOrderStaff(order_staff_item).then(data =>{
                if(data.code == "0"){
                    this.$message({
                        type:'success',
                        message: `匹配成功`
                    })
                    //关闭详情弹出框
                    this.dialogFormVisible = false
                }
            }).catch(e =>{
                this.$message({
                    type:'error',
                    message: e.message
                })
            }).finally(async () =>{
                //刷新订单配置页
                await orderService.getOrder(this.$route.query.order_id)
                
                store.commit('setLoading',false)
            })


        }
    },
    async mounted(){
        await this.getTableList()
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
            .match-search-box{
                height: 100px;
                width: 100%;
                background: #fff;
                position: relative;
                //表单搜索框
                .head-input{
                    width: 100%;
                    height: 60px;
                    display: flex;
                    justify-content: space-between;
                    padding:12px 15px;
                    .head-input-left{
                        display: flex;
                        justify-content: space-between;
                        min-width: 550px;
                    }
                    & /deep/ .el-input__inner{
                        width: 200px;
                        height: 36px;
                    }
                }
                //级联选择器
                .head-cascader{
                    height: 40px;
                    width:100%;
                    padding: 0 30px;
                    float: left;
                    //级联选择器表单
                    .cascader{
                        & /deep/ .el-input{
                            width: 120px;
                        }
                        & /deep/ .el-input__inner{
                            border: none;
                            width: 100px;
                            padding-right: 20px;
                        }
                    }
                }
                //展开图标
                .spread-icon{
                    float: right;
                    width:50px;
                    height: 40px;
                    padding: 2px 0;
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
                //匹配的员工列表框
                .match-list{
                    //每条员工信息
                    .match-service-item{
                        margin: 20px 0;
                        display: flex;
                        height: 160px;
                        width: 100%;
                        //员工头像
                        .service-pic{
                            height: 160px;
                            width: 160px;
                            .head-icon{
                                display: block;
                                height: 160px;
                                width: 160px;
                            }
                        }
                        .service-message{
                            height: 160px;
                            padding: 5px 15px;
                            width: calc(100% - 160px);
                            background: #f5f5f5;
                            .service-message-line{
                                height: 30px;
                                line-height: 30px;
                                width: 100%;
                                display: flex;
                                .label{
                                    width: 80px;
                                    text-align: right;
                                    padding-right: 10px;
                                }
                            }
                            .control{
                                display: flex;
                                justify-content: flex-end;
                            }
                        }
                    }
                }

            }


        }
    }

</style>


