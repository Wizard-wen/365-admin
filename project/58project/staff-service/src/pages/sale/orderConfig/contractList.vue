<template>
    <div class="staff">
        <contract-table-component
            :staffTable="order_contract"
            :maxLength="maxLength"
            :controlScopeLength="200">

            <template slot="control" slot-scope="controler">
                <el-button size="mini" type="text" @click="showStaff(controler.scoper.$index, controler.scoper.row)">查看</el-button>
                <el-button size="mini" type="text" @click="sendErrorMessage(controler.scoper.row)">结算工资</el-button>
                <el-button size="mini" type="text" @click="sendErrorMessage(controler.scoper.row)">终止合同</el-button>
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
import {saleService, $utils} from '../../../../common'
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
         * 请求表格数据
         * des 表格查询参数存储在vuex中，刷新，参数重置
         */
        async getTableList(){                
            try{
                this.isLoaded = true

                await Promise.all([
                    // saleService.getWorkerFormConfig('edit'), //获取表单配置字段
                    // saleService.getStaffList(4) //获取列表数据
                ]).then((data) =>{
                    // 将表单配置数据存入 vuex 
                    // this.$store.commit('setWorkerConfigForm',data[0].data)

                    // let tableList = data[1].data.data

                    // tableList.forEach((item, index) =>{
                        
                    //     this.computeStringLength(item.authentication, 'authentication', 'authentication')
                    //     this.computeStringLength(item.working_status, 'working_status', 'working_status')
                    //     this.computeStringLength(item.skill_ids, 'skill_ids', 'service_category')
                    //     this.computeStringLength(item.service_type, 'service_type', 'service_type')
                    //     this.computeStringLength(item.service_crowd, 'service_crowd', 'service_crowd')
                    //     this.computeStringLength(item.working_age, 'working_age', 'working_age')
                    //     this.computeStringLength(item.nation, 'nation', 'nation')
                    //     this.computeStringLength(item.region_ids, 'region_ids', 'service_region')
                    //     this.computeStringLength(item.course, 'course', 'course')
                    //     this.computeStringLength(item.paper_ids, 'paper_ids', 'paper_category')
                    //     this.computeStringLength(item.source, 'source', 'source')
                    // })  

                    // this.contractTable = data[1].data.data
                    
                    // //分页信息
                    // this.pagination.currentPage = data[1].data.current_page //当前页码
                    // this.pagination.total = data[1].data.total //列表总条数
                }).catch(error =>{
                    this.$message({
                        type:'error',
                        message: error.message
                    })
                }).finally(() =>{
                    this.isLoaded = false
                })

            } catch(error){
                this.$message({
                    type:'error',
                    message: error.message
                })
            }
        },
        // 由查询组件触发的更新表格事件
        async updateTable(){
            await this.getTableList()
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
            await this.getTableList()
        },        
    },
    async mounted(){
        await this.getTableList()
    }
}
</script>

