<template>
    <card-box-component
        :title="title">
        <template slot="control">
            <el-button v-if="isEdit" type="primary" size="mini" @click="openLogDialog">{{`添加${title}`}}</el-button>
        </template>
        <template slot="contains">
            <!-- 日志列表 -->
            <el-table 
                :data="productStandardList" 
                max-height="500"
                :header-cell-style="{height: '48px',background: '#fafafa'}">
                <el-table-column label="创建时间" :formatter="created_atFormatter" prop="created_at" width="200" align="center"></el-table-column>

                <el-table-column label="管理员姓名" prop="manager_name" width="200" align="center"></el-table-column>

                <el-table-column :label="title" prop="message" align="center"></el-table-column>

            </el-table>
        </template>  
        <template>
            <log-dialog
                :title="title"
                :logDialogVisible="logDialogVisible"
                v-if="logDialogVisible"
                @closeLogDialog="closeLogDialog"
                @submitLogDialog="submitLogDialog"></log-dialog>
        </template>  
    </card-box-component>
</template>

<script>
//日志弹窗
import logDialog from './logComponent/logDialog.vue'
export default {
    components: {
        logDialog,
    },
    props: {
        /**
         * 日志列表
         * order_logs
         */
        productStandardList: {
            type: Array,
            default: function(){return []}
        },
        /**
         * 控制日志弹窗显示隐藏
         */
        logDialogVisible: {
            type: Boolean,
            default: false,
        },
        /**
         * 标题
         */
        title: {
            type: String,
            default: '日志'
        },
        /**
         * 是否可以添加日志
         */
        isEdit: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        /**
         * 创建时间字段转换
         */
        created_atFormatter(row, column){
            if(row.created_at == 0){
                return '0000-00-00'
            }
            return this.$utils.formatDate(new Date(row.created_at), 'yyyy-MM-dd hh:mm:ss')
        },
        /**
         * 打开日志弹窗
         */
        openLogDialog(){
            this.$emit('openLogDialog')
        },  
        /**
         * 关闭日志弹窗
         */
        closeLogDialog(){
            this.$emit('closeLogDialog')
        },
        /**
         * 提交日志信息
         */
        submitLogDialog(param){
            this.$emit('submitLogDialog',param)
        }
    }
}
</script>

<style lang="scss" scoped>
    .log-table{
        
    }
</style>