<template>
    <el-card class="box-card">
        <div slot="header" class="card-header">
            <h3>订单基本信息</h3>
            <div class="control">
                <el-button type="text" icon="el-icon-edit" circle size="small" >编辑</el-button>
                <el-button 
                    type="text" 
                    :icon="isShow? 'el-icon-arrow-up' : 'el-icon-arrow-down'" 
                    circle size="small" 
                    @click="changeFormState">{{isShow?`收起`:`展开`}}</el-button>
            </div>
        </div>
        <div class="base-form-box" v-if="isShow">
            <el-form size="small" class="baseForm" ref="baseForm" :model="baseForm" label-width="120px">

                <el-form-item label="创建人">
                    <el-input v-model="baseForm.createMan"></el-input>
                </el-form-item>
                <el-form-item label="服务类型" placeholder="月嫂">
                    <el-input v-model="baseForm.serviceType"></el-input>
                </el-form-item>
                <el-form-item label="客户名称" >
                    <el-input v-model="baseForm.name"></el-input>
                </el-form-item>
                <el-form-item label="客户联系方式">
                    <el-input v-model="baseForm.number"></el-input>
                </el-form-item>
                <el-form-item label="服务地址">
                    <el-input v-model="baseForm.address"></el-input>
                </el-form-item>

                <el-form-item label="服务周期">
                    <el-date-picker
                        v-model="baseForm.cycle"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"></el-date-picker>
                </el-form-item>


                <el-form-item label="订单来源">
                    <el-select v-model="baseForm.origin" placeholder="请选择订单来源">
                        <el-option label="线上" value="shanghai"></el-option>
                        <el-option label="线下" value="beijing"></el-option>
                        <el-option label="渠道" value="beijing"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="订单备注信息">
                    <el-input type="textarea" v-model="baseForm.desc"></el-input>
                </el-form-item>
            </el-form>
        </div>
        
    </el-card>
</template>
<script>
export default {
    data(){
        return {
            baseForm: {
                createMan: '',//创建人
                serviceType: '',//服务类型
                name: '',//客户称呼
                number: '',//客户联系方式
                address: '',//服务地址
                cycle: '',//订单周期
                origin: '',//订单来源
                desc: '', //订单备注信息
                value6: ''
            },
            //是否展示表单
            isShow:true
        }
    },
    methods: {
        //改变表单的显示隐藏状态
        changeFormState(){
            this.isShow = !this.isShow
        }
    }
}
</script>
<style lang="scss" scoped>
    .box-card{
        margin: 10px 0;
        & /deep/ .el-card__header{
            padding: 0 30px;;
        }
        & /deep/ .el-card__body{
            padding: 20px;
        }
        .card-header{
            height:50px;
            width:100%;
            padding-right:30px;
            display: flex;
            justify-content: space-between;
            & h3{
                line-height: 50px;
            }
            .control{
                padding: 9px 0;
            }
        }
        .base-form-box{

            .baseForm{
                width: 80%;
                min-width: 500px;
            }
        }
        
    }
</style>


