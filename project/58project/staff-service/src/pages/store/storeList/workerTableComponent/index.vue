<template>
    <div class="table-contains">
        <div class="btn-contains">
            <el-button type="primary" @click="openCreateStoreDialog">创建门店</el-button>
        </div>
        <el-table 
            :data="tableData" 
            class="table-list" 
            border
            :header-cell-style="{height: '54px',background: '#fafafa'}">
            <el-table-column fixed="left" label="门店编号" prop="store_code" align="center" ></el-table-column>

            <el-table-column label="门店名" prop="name" align="center" ></el-table-column>

            <el-table-column label="店长" prop="store_manager_name" align="center" ></el-table-column>

            <el-table-column label="门店类型" prop="is_third" align="center" >
                <template slot-scope="scope">
                    <el-tag :type="scope.is_third==1?'success':'danger'">
                        {{scope.type==1?'加盟店':'直营店'}}
                    </el-tag>
                </template>
            </el-table-column>

            <el-table-column label="员工数量" prop="agent_count" align="center" ></el-table-column>

            <el-table-column label="经营状态" prop="status" align="center" >
                <template slot-scope="scope">
                    <el-tag :type="scope.status==1?'success':'danger'">
                        {{scope.status==1?'营业':'停业'}}
                    </el-tag>
                </template>
            </el-table-column>

            <el-table-column label="地区" prop="address" align="center"  width="280"></el-table-column>
            
            <el-table-column label="成立时间" prop="created_at" align="center" :formatter="created_atFormatter" width="120"></el-table-column>

            <el-table-column label="创建人" prop="created_manager_name" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="editstore(scope.row)">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <create-store-dialog
			:createStoreDialogVisible="createStoreDialogVisible"
			v-if="createStoreDialogVisible"
			@closeAddStoreStaffDialog="closeAddStoreStaffDialog"></create-store-dialog>
    </div>
    
</template>
<script>
    import {operateService, $utils} from '@common/index.js'
    import {is_thirdList,runTypeList} from '../IStoreList'
    import createStoreDialog from '../createStoreDialog.vue'
    import {
        tableTagComponent
    } from '@/public/components/index.js'
    
    export default {
        components: {
            tableTagComponent,
            createStoreDialog,
        },
        data(){
            return {
                is_thirdList,
                runTypeList,
                createStoreDialogVisible: false,//创建新门店弹窗
            }
        },
        filters: {
            /**
             * 接单状态
             */
            signStatusFilter(status) {
                const statusMap = {
                    '1': 'success',
                    '2': 'danger',
                }
                return statusMap[status]
            },
        },
        props: {
            //列表数据
            tableData: {
                type: Array,
                default:function(){return []}
            },
            workerConfigList: {
                type: Object,
                default: function(){return {}}
            },
        },
        methods: {
            /**
             * 创建时间字段转换
             */
            created_atFormatter(row){
                if(row.created_at == 0){
                    return '0000-00-00'
                }
                return $utils.formatDate(new Date(row.created_at), 'yyyy-MM-dd')
            },
            /**
             * 打开创建门店弹窗
             */
            openCreateStoreDialog(){
                this.createStoreDialogVisible = true
			},
			/**
			 * 关闭创建门店弹窗
			 */
			async closeAddStoreStaffDialog(){
				this.createStoreDialogVisible = false
				this.$emit('updateTable')
            },
            /**
             * 编辑门店
             */
            editstore(row){
                this.$router.push({
                    path: "/store/storeItem",
                    query: {
                        type: 1, //编辑为1
                        id: row.id
                    }
                })
            },
        },
    }
</script>
<style lang="scss" scoped>
.table-contains{
    background: #fff;
    .btn-contains{
        padding: 10px 50px;
        display: flex;
        justify-content: flex-end;
    }
    .table-list{
        min-height: 800px;
    }  
}
            
        
        


</style>
