<template>
    <div>
        <el-form ref="form" :model="form" label-width="120px">

            <el-form-item label="创建人">
                <el-input v-model="form.createMan"></el-input>
            </el-form-item>
            <el-form-item label="服务类型" placeholder="月嫂">
                <el-input v-model="form.serviceType"></el-input>
            </el-form-item>
            <el-form-item label="客户名称" >
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="客户联系方式">
                <el-input v-model="form.number"></el-input>
            </el-form-item>
            <el-form-item label="服务地址">
                <el-input v-model="form.address"></el-input>
            </el-form-item>

            <el-form-item label="服务周期">
                <el-date-picker
                    v-model="form.cycle"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"></el-date-picker>
            </el-form-item>


            <el-form-item label="订单来源">
                <el-select v-model="form.origin" placeholder="请选择订单来源">
                    <el-option label="线上" value="shanghai"></el-option>
                    <el-option label="线下" value="beijing"></el-option>
                    <el-option label="渠道" value="beijing"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="订单备注信息">
                <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>


            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data(){
        return {
            form: {
                createMan: '',//创建人
                serviceType: '',//服务类型
                name: '',//客户称呼
                number: '',//客户联系方式
                address: '',//服务地址
                cycle: '',//订单周期
                origin: '',//订单来源
                desc: '', //订单备注信息
                value6: ''
            }
        }
    },
    methods: {
        onSubmit() {
            console.log('submit!');
        }
    }
}
</script>
<style lang="scss" scoped>

</style>


