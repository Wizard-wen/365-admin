<template>
    <div class="orderConfig" v-loading="is_loading">
        <div class="order-header">
            <div class="order-name">
                <h4>订单号：{{orderBase.order_code}}</h4>
            </div>
            <div class="btn-group">
                <el-button size="mini" @click="goback">返回</el-button>
            </div>
            <div class="order-detail">
                <div class="detail-left">
                    <div class="detail-left-box">
                        <div class="detail-left-line">订单经纪人：{{ orderBase.agent_manager_name }}</div>
                        <div class="detail-left-line">订单经纪门店：{{ orderBase.agent_store_name }}</div>
                        <div class="detail-left-line">创建人：{{ orderBase.created_manager_name }}</div>
                        <div class="detail-left-line">创建时间：{{orderBase.created_at | timeFomatter}}</div>
                        <div class="detail-left-line">来源门店：{{orderBase.apply_store_name}}</div>
                        <div class="detail-left-line">来源人：{{orderBase.apply_manager_name? orderBase.apply_manager_name : '门店'}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="order-down">
            <div class="order-message">
                <div class="title">
                    <div class="title-contains">
                        <div class="left">订单基本信息</div>
                        <el-button type="primary" size="mini" @click="makeOrderImage">生成订单图片</el-button>
                    </div>
                </div>
                <div class="order-list">
                    <div class="line-two-list">
                        经纪人：<span>{{orderBase.agent_manager_name}}</span>
                    </div>
                    <div class="line-two-list">
                        经纪人电话：<span>{{orderBase.agent_manager_phone}}</span>
                    </div>
                    <div class="line-list">
                        工种：<span>{{orderBase.work_type}}</span>
                    </div>
                    <div class="line-list">
                        工作时间：<span>{{orderBase.service_duration}}</span>
                    </div>
                    <div class="line-list">
                        工资：<span>{{orderBase.wage}}</span>
                    </div>
                    <div class="line-list">
                        服务地址： <span>{{orderBase.service_address}}</span>
                    </div>
                    <div class="line-list">
                        订单详情：<span>{{orderBase.order_details}}</span>
                    </div>
                </div>
            </div>
            <div class="order-message" v-if="orderBase.type == 1 || orderBase.type == 3">
                <div class="title">
                    <div class="title-contains">
                        <div class="left">服务人员匹配</div>
                    </div>
                </div>
                <div class="order-list">
                    <match-service-list @updateOrderConfig="getOrder"></match-service-list>
                </div>
            </div>

            <div class="order-message" v-if="orderBase.type == 1 || orderBase.type == 3">
                <div class="title">
                    <div class="title-contains">
                        <div class="left">备选服务人员</div>
                    </div>
                </div>
                <div class="order-list">
                    <!-- 匹配劳动者列表 -->
                    <el-table :data="order_staff" class="person-table" :header-cell-style="{height: '48px',background: '#fafafa'}">
                        <el-table-column label="工号" prop="staff_code" align="center"></el-table-column>

                        <el-table-column label="姓名" prop="staff_name" align="center"></el-table-column>

                        <el-table-column label="头像" prop="staff_icon" align="center">
                            <template slot-scope="scope">
                                <el-popover trigger="click" placement="top">
                                    <img :src="scope.row.icon?'./resource/'+scope.row.icon:''" alt="" style="height: 200px; width: 200px;">
                                    <div slot="reference" style="height: 30px;width: 30px;margin: 0 auto;">
                                        <img :src="scope.row.icon?'./resource/'+scope.row.icon:''" alt="" style="height: 30px;width: 30px;">
                                    </div>
                                </el-popover>
                            </template>
                        </el-table-column>

                        <el-table-column label="电话" prop="staff_phone" align="center"></el-table-column>

                        <el-table-column label="签约状态" prop="type" align="center">
                            <template slot-scope="scope">
                                <table-tag-component :propList="matchStaffSignList" :tableOriginData="scope.row.type"></table-tag-component>
                            </template>
                        </el-table-column>

                        <el-table-column label="添加人" prop="created_manager_name" align="center"></el-table-column>

                        <el-table-column label="操作" align="center" width="300">
                            <template slot-scope="scope">
                                <el-button type="primary" @click="goStaffDetail(scope.row)" size="mini">详情</el-button>
                                <!-- 只有添加人才能删除 -->
                                <el-button 
                                    type="danger" 
                                    size="mini"
                                    @click="deleteMatchStaff(scope.row)" 
                                    v-if="presentUser.id == scope.row.created_manager_id">删除</el-button>
                            </template>
                        </el-table-column>
                        
                    </el-table>
                </div>
            </div>  
                     
        </div>
    </div>
</template>
<script>
    import {operateService, $utils, saleService} from '../../../common'
    import {
        matchServiceList,} from './orderConfig/index.js'
    import {
        tableTagComponent} from '@/pages/components'
export default {
    data(){
        return {
            is_loading: false,//
            order_id: '',//订单id
            matchStaffSignList: [
                {id: 1, name: '未签约'},
                {id: 2, name: '已签约'},
                {id: 3, name: '已拒绝'},
            ],
            matched_staff: null,//备选服务人员信息对象
        }
    },
    filters: {
        timeFomatter(value){
            if(value == 0){
                return '-'
            }
            return $utils.formatDate(new Date(value), 'yyyy-MM-dd')
        }
    },
    components: {
        matchServiceList,
        tableTagComponent
    },
    computed:{
        /**
         * 当前用户信息
         */
        presentUser(){
            return this.$store.state.loginModule.user
        },
        /**
         * 订单基本信息
         */
        orderBase(){
            return this.$store.state.saleModule.order
        },
        /**
         * 备选服务人员列表
         */
        order_staff(){
            return this.$store.state.saleModule.order_staff
        }
    },
    methods: {
        /**
         * 获取订单信息
         */
        async getOrder(){
            try{
                this.is_loading = true
                await saleService.getOrder(this.order_id).then((data) =>{
                    if(data.code == "0"){
                        store.commit('configOrderData',data.data)
                    }
                    this.is_loading = false
                }).catch(e =>{
                    this.$message({
                        type:'error',
                        message: e.message
                    })
                    this.is_loading = false
                }).finally(() =>{
                    this.is_loading = false
                })
            } catch(error){
                this.$message({
                    type:'error',
                    message: error.message
                })
                store.commit('setLoading',false)
            }
        },
        /**
         * 切换页码
         */
        async handleContractCurrentPage(val){
            // this.pagination.currentPage = val
            //设置page查询参数
            this.$store.commit('setContractList', {
                queryKey: 'page', 
                queryedList: val
            })
            await this.getTableList()
        },
        /**
         * 跳转至服务人员详情
         * @param paramObj 匹配服务人员信息对象
         */
        goStaffDetail(paramObj){
            this.$router.push({
                path: "/sale/saleNewWorkerShow",
                query: {
                    id: paramObj.id,
                    from: 3,
                    order_id: this.$route.query.id
                }
            })
        },
        /**
         * 删除备选服务人员
         */
        async deleteMatchStaff(){
            let _this= this;

            let response = await this.$confirm(`确定删除该备选服务人员吗?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: `已取消删除`
                });
            });

            if(response == "confirm"){
                store.commit('setLoading',true)

                try{
                    // await operateService.addReturnStaffSingle(row.id)
                    //     .then(data =>{
                    //         if(data.code == "0"){
                    //             this.$message({
                    //                 type:'success',
                    //                 message: `导入成功`
                    //             })
                    //         }
                    //     }).catch(e =>{
                    //         this.$message({
                    //             type:'error',
                    //             message: e.message
                    //         })
                    //     })
                } catch(error){
                    this.$message({
                        type:'error',
                        message: error.message
                    })
                }

                await _this.getTableList()
                store.commit('setLoading',false)
            }
        },
        /**
         * 返回
         */
        goback(){
            this.$router.push('/sale/orderList')
        },
        /**
         * 生成订单图片
         */
        makeOrderImage(){
            
        },
    },
    async mounted(){
        this.order_id = this.$route.query.id;//订单id
        await this.getOrder()
        
    }    
}
</script>
<style lang="scss" scoped>
    .orderConfig{
        width: 100%;
        min-height: calc(100vh - 50px);
        background:#f0f2f5;
        .order-header{
            background: #fff;
            padding: 30px 24px 24px 24px;
            position: relative;
            .order-name{
                line-height: 28px;
                font-size: 20px;
                font-weight: 700;
            }
            .btn-group{
                & /deep/ .el-button{
                    margin-left: 0px;
                }
                position: absolute;
                right: 24px;
                top: 20px;
            }
            .order-detail{
                padding-top: 12px;
                display: flex;
                .detail-left{
                    flex:1;
                    .detail-left-box{
                        display: flex;
                        flex-wrap: wrap;
                        .detail-left-line{
                            width: 50%;
                            color: rgba(0,0,0,.65);
                            line-height: 20px;
                            padding-bottom: 8px;
                        }
                    }
                }
                .detail-right{
                    min-width: 400px;
                    display: flex;
                    .right-box{
                        height: 80px;
                        width: 50%;
                        .title{
                            color: rgba(0,0,0,.45);
                            font-size: 14px;
                            line-height: 1.5;
                        }
                        .value{
                            font-size: 20px;
                            color: rgba(0,0,0,.85);
                            line-height: 1.5;
                        }
                    }
                }
            }
        }
        .order-down{
            margin: 24px;
            .order-message{

                width: 100%;
                // height: 285px;
                background: #fff;
                margin-bottom: 24px; 
                .title{
                    min-height: 48px;
                    margin-bottom: -1px;
                    padding: 0 24px;
                    color: rgba(0,0,0,.85);
                    font-weight: 500;
                    font-size: 16px;
                    background: transparent;
                    border-bottom: 1px solid #e8e8e8;
                    border-radius: 2px 2px 0 0;
                    zoom: 1;
                    .title-contains{
                        display: flex;
                        align-items: center;
                        .left{
                            display: inline-block;
                            flex: 1 1;
                            padding: 16px 0;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }
                    }

                }
                .order-list{
                    box-sizing: border-box;
                    padding: 24px;
                    &:after{
                        content: '';
                        display: block;
                        clear: both;
                    }
                    .line-three-list{
                        float: left;
                        width: 33%;
                        line-height: 30px;
                    }
                    .line-two-list{
                        float: left;
                        width: 50%;
                        line-height: 30px;
                    }
                    .line-list{
                        float: left;
                        width: 100%;
                        line-height: 30px;
                    }
                    .change{
                        margin-left: 15px;
                        display: inline-block;
                        color: #1890ff;
                        line-height: 30px;
                        height: 30px;
                        font-size: 12px;
                        cursor: pointer;
                        & img{
                            height: 30px;
                            width: 30px;
                            vertical-align: middle;
                        }
                    }
                }
            }
        }
    }
</style>


