<template>
    <el-form label-position="right" label-width="150px" inline class="demo-table-expand">
        <div style="display: flex;">
            <el-form-item label="头像：">
                <img 
                    v-if="currentWorker.icon" 
                    :src="currentWorker.icon?'./resource/'+currentWorker.icon:''" 
                    alt="" 
                    style="height: 30px;width: 30px;">
                <icon-component
                    :iconUrl="currentWorker.icon"
                    :height="60"
                    :width="60"></icon-component>
            </el-form-item>
            <div>
                <el-form-item  label="现住址：" prop="address" >
                    <p>{{ currentWorker.address }}</p>
                </el-form-item>
                <el-form-item  label="身份证号：" prop="identify" >
                    <p>{{ currentWorker.identify }}</p>
                </el-form-item>
            </div>
        </div>
        
        
        <el-form-item label="紧急联系人：" prop="urgent_phone">
            <p>{{ currentWorker.urgent_phone }}</p>
        </el-form-item>
        <el-form-item label="民族：" prop="nation">
            <p>{{ currentWorker.nation }}</p>
        </el-form-item>
        <el-form-item label="教育程度：" prop="education">
            <p>{{ currentWorker.education }}</p>
        </el-form-item>
        <el-form-item label="创建时间：" prop="created_at">
            <p>{{ currentWorker.created_at }}</p>
        </el-form-item>
        <el-form-item label="出生日期：" prop="birthday">
            <p>{{ currentWorker.birthday }}</p>
        </el-form-item>
        <el-form-item label="工龄：" prop="working_age">
            <p>{{ currentWorker.working_age }}</p>
        </el-form-item>
        <el-form-item label="学历：" prop="education">
            <p>{{ currentWorker.education }}</p>
        </el-form-item>
        <el-form-item  label="更新时间" prop="updated_at" >
            <p>{{ currentWorker.updated_at }}</p>
        </el-form-item>
        <el-form-item  label="创建人" prop="manager_name" >
            <p>{{ currentWorker.manager_name }}</p>
        </el-form-item>
        <el-form-item  label="接单状态" prop="working_status">
            <p>{{ currentWorker.working_status }}</p>
        </el-form-item>
        <el-form-item >
            <show-button :currentWorkerItem="currentWorker"></show-button>
            <edit-button :currentWorker="currentWorker"></edit-button>
            <change-status-button @updateTable="$emit('updateTable')" :currentWorker="currentWorker"></change-status-button>
        </el-form-item>
    </el-form>
    
</template>

<script>
import {
    showButton,
    changeStatusButton,
    createButton,
    editButton,
} from './control/index.js'
import {
    iconComponent
} from '@/public/components/index.js'
export default {
    components: {
        showButton,
        changeStatusButton,
        createButton,
        editButton,
        iconComponent,
    },
    props: {
        currentWorker: {
            type: Object,
            default: function(){return {}}
        }
    }
}
</script>

<style lang="scss" scoped>
.demo-table-expand {
    font-size: 0;
    width: 1000px;
}
.demo-table-expand label {
    width: 120px;
    color: #99a9bf;
}
.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}  
</style>