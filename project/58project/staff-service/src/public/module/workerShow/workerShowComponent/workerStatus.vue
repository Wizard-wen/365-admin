<template>
    <div class="detail-right">
        <div class="right-box">
            <div class="title">
                签约状态
                <el-tooltip class="item" effect="dark" content="是否正在平台执行合同" placement="top-start">
                    <i class="el-icon-info"></i>
                </el-tooltip>
            </div>
            <div class="value" :style="{color: workerForm.sign_status == 1? '#F56C6C': '#67C23A'}">
                {{ workerForm.sign_status == 1? '未签约': '已签约'}}
            </div>
        </div>
        <div class="right-box" >
            <div class="title" >
                是否启用
                <el-tooltip class="item" effect="dark" content="平台是否对外展示该劳动者" placement="top-start">
                    <i class="el-icon-info"></i>
                </el-tooltip>
            </div>
            <div class="value" :style="{color: workerForm.status == 1? '#67C23A': '#F56C6C'}">
                {{ workerForm.status == 1? '启用': '停用'}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        workerForm: {
            type: Object,
            default(){return{}}
        }
    }
}
</script>

<style lang="scss" scoped>
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
</style>