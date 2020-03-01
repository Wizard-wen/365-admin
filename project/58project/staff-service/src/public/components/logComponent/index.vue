<template>
    <card-box-component
        :title="'日志'">
        <template slot="control">
            <el-button type="primary" size="mini" @click="openLogDialog">添加日志</el-button>
        </template>
        <template slot="contains">
            <!-- 日志列表 -->
            <el-table 
                :data="order_logs" 
                class="person-table" 
                :header-cell-style="{height: '48px',background: '#fafafa'}">
                <el-table-column label="创建时间" :formatter="created_atFormatter" prop="created_at" width="200" align="center"></el-table-column>

                <el-table-column label="管理员姓名" prop="manager_name" width="200" align="center"></el-table-column>

                <el-table-column label="日志内容" prop="message" align="center"></el-table-column>

            </el-table>
        </template>  
        <template>
            <log-dialog
                :logDialogVisible="logDialogVisible"
                v-if="logDialogVisible"
                @closeLogDialog="closeLogDialog"
                @submitLogDialog="submitLogDialog"></log-dialog>
        </template>  
    </card-box-component>
</template>

<script>
//日志弹窗
import logDialog from './logDialog.vue'
import {$utils} from '@common/index.js'
export default {
    components: {
        logDialog,
    },
    props: {
        /**
         * 日志列表
         */
        order_logs: {
            type: Array,
            default: function(){return []}
        },
        /**
         * 控制日志弹窗显示隐藏
         */
        logDialogVisible: {
            type: Boolean,
            default: false,
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
            return $utils.formatDate(new Date(row.created_at), 'yyyy-MM-dd hh:mm:ss')
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

<style>

</style>