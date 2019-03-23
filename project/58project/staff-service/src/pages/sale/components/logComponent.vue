<template>
    <el-card class="box-card">
        <div slot="header" class="card-header">
            <h3>订单日志</h3>
            <div class="control">
                <el-button type="text" size="small" @click="showLogDialog">添加日志</el-button>
                <el-button 
                    type="text" 
                    :icon="isShow? 'el-icon-arrow-up' : 'el-icon-arrow-down'" 
                    circle size="small" 
                    @click="changeLogState">{{isShow?`收起`:`展开`}}</el-button>
            </div>
        </div>
        <div class="service-box" v-if="isShow">
            <div v-if="logList.length">
                <el-table
                    :data="logList"
                    style="width: 100%">
                    <el-table-column
                        prop="created_at"
                        label="创建日期">
                    </el-table-column>
                    <el-table-column
                        prop="staff_name"
                        label="服务人员">
                    </el-table-column>
                    <el-table-column
                        prop="manager_name"
                        label="操作人">
                    </el-table-column>
                    <el-table-column
                        prop="message"
                        label="日志事由">
                    </el-table-column>
                    </el-table>
            </div>
            <div v-else>暂无内容</div>
        </div>
        <!-- 添加日志 -->
        <log-dialog
            v-if="logDialogVisible"
            :openLogDialog="logDialogVisible"
            @closeLogDialog="logDialogVisible=false"
            :logType="'normal'"></log-dialog>

    </el-card>  
</template>
<script>
import {orderService} from '../../../../common'
import logDialog from './logDialog.vue'
export default {
    components: {
        logDialog,
    },
    data(){
        //日志信息
        const messageValidator = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请填写日志信息'));
            } else {
                callback();
            }
        };
        return {
            //是否展示日志
            isShow:true,

            //日志对话框
            logDialogVisible: false,
        }
    },
    computed:{
        /**
         * 日志列表
         */
        logList(){
            return this.$store.state.orderModule.order_logs
        },
    },
    methods: {
        //改变表单的显示隐藏状态
        changeLogState(){
            this.isShow = !this.isShow
        },
        /**
         * 打开日志对话框
         */
        showLogDialog(){
            this.logDialogVisible = true
        },
    }
}
</script>
<style lang="scss" scoped>
    .line-bottom-1px{
        &:after{
            position: absolute;
            content: '';
            display: block;
            height: 1px;
            width: 100%;
            background: #ccc; 
            bottom: 0;
        }
    }
    .box-card{
        margin: 10px 0;
        & /deep/ .el-card__header{
            padding: 0 30px;
        }
        & /deep/ .el-card__body{
            padding: 20px;
        }
        .card-header{
            height:50px;
            width:100%;
            padding-right: 30px;
            display: flex;
            justify-content: space-between;
            & h3{
                line-height: 50px;
            }
            .control{
                padding: 9px 0;
            }
        }
        .service-box{

        }
    }

</style>


