<template>
    <el-card class="box-card">
        <div slot="header" class="card-header">
            <h3>备选日志</h3>
            <div class="control">
                <el-button type="text" size="small" @click="dialogFormVisible = true">添加日志</el-button>
                <el-button 
                    type="text" 
                    :icon="isShow? 'el-icon-arrow-up' : 'el-icon-arrow-down'" 
                    circle size="small" 
                    @click="changeFormState">{{isShow?`收起`:`展开`}}</el-button>
            </div>
        </div>
        <div class="service-box" v-if="isShow">
            <div v-if="matchList.length">
                <div class="service-line line-bottom-1px"
                    v-for="(item, index) in matchList"
                    :key="index">
                    <div class="service-name">{{item.staff_name}}</div>
                    <div class="service-message">{{item.message}}</div>
                    <div class="control">
                        <el-button type="text" size="small">面试</el-button>
                        <el-button type="text" size="small" @click="deleteService(item.id)">删除</el-button>
                    </div>
                </div>
            </div>
            <div v-else>暂无内容</div>
        </div>
        

        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="活动名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动区域" :label-width="formLabelWidth">
                    <el-select v-model="form.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </el-card>  
</template>
<script>
export default {
    data(){
        return {
            //是否展示表单
            isShow:true,
            dialogTableVisible: false,
            dialogFormVisible: false,
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            formLabelWidth: '120px'
        }
    },
    computed:{
        matchList(){
            return store.state.orderModule.order_sign_logs
        }
    },
    methods: {
        deleteService(id){
            store.commit('deleteMatchService', id)
        },
        //改变表单的显示隐藏状态
        changeFormState(){
            this.isShow = !this.isShow
        }
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

            .service-line{
                position: relative;
                height: 40px;
                line-height: 40px;
                width: 80%;
                min-width: 500px;
                margin: 10px 0;
                text-indent: 10px;
                margin: 0;
                &:hover{
                    background: #f5f7fa;
                    cursor: pointer;
                }
                .service-name{
                    float:left;
                    width: 150px;
                }
                .control{
                    float:right;
                    width: 200px;
                    padding-left: 100px;
                    
                }
            }
        }

    }

</style>


