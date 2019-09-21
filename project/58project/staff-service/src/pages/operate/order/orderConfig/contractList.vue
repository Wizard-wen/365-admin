<template>
    <div class="worker">
        <contract-table-component
            :staffTable="order_contract"
            :maxLength="maxLength"
            :controlScopeLength="200">

            <template slot="control" slot-scope="controler">
                <el-button size="mini" type="text" @click="goContractPage(controler.scoper.$index, controler.scoper.row)">查看</el-button>
            </template>

            <template slot="pagination">
                <el-pagination
                    class="pagination"
                    @current-change="handleCurrentPage"
                    @prev-click="handleCurrentPage"
                    @next-click="handleCurrentPage"
                    :current-page.sync="pagination.currentPage"
                    :page-size="pagination.pageNumber"
                    layout="prev, pager, next, jumper"
                    :total="pagination.total"></el-pagination>
            </template>
        </contract-table-component>
    </div>
</template>
<script>
import {saleService, $utils} from '../../../../../common'
import {
    contractTableComponent,
} from './contractList/index.js'

export default {
    data(){
        return {
            //订单中包含的合同列表
            // contractTable: [],

            isLoaded:false,
            /**
             * 分页信息
             */
            pagination: {
                total: 0,
                currentPage: 1,
                pageNumber: 20,
            },
            //计算列表每一列的最大宽度
            maxLength: {
                authentication: 80, //认证状态
                working_status: 80,//接单状态
                skill_ids: 80,// 职业类型
                service_type: 80,//服务类型
                service_crowd: 100,//可服务人群
                working_age: 80,// 工龄
                nation: 80,// 民族
                region_ids:80,//服务地区
                course: 80,//参加培训
                paper_ids: 80, //技能证书
                source: 80,//信息来源
            },
        }
    },
    components: {
        contractTableComponent
    },
    computed:{
        /**
         * 
         */
        workerConfigList(){
            return this.$store.state.operateModule.workerConfigForm
        },
        /**
         * 合同数据
         */
        order_contract(){
            return this.$store.state.saleModule.order_contract
        }
    },
    methods: {
        computeStringLength(array, listKey, configKey){
            let string = 0
            if(Array.isArray(array)){
                array.forEach((it, inds) =>{
                    if(this.workerConfigList[configKey].find(i => i.id == it)){
                        let baseLength = parseInt(this.workerConfigList[configKey].filter(i => i.id == it)[0].name.length *12 )
                        string += (baseLength + 27)
                    }
                })
            } else {
                if(this.workerConfigList[configKey].find(i => i.id == array)){
                    string = parseInt(this.workerConfigList[configKey].filter(i => i.id == array)[0].name.length * 12) + 27
                } else {
                    string = 0
                }
                
            }
            
            if(string > this.maxLength[listKey]){
                this.maxLength[listKey] = (string + 20) > 80 ? (string + 20) : 80
            }
        },
        /**
         * 进入合同详情页
         */
        goContractPage(index, param){
            this.$router.push({
                path: `/operate/operateContractItem`,
                query: {
                    id: param.id,
                    from: 1,
                    fromId: this.$route.query.id
                }
            })
        },
 
        /**
         * 切换页码
         */
        async handleCurrentPage(val){
            //设置page查询参数
            this.$store.commit('setSellerList', {
                queryKey: 'page', 
                queryedList: val
            })
        },        
    },
    async mounted(){

    }
}
</script>

