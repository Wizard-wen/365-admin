<template>
    <div>
        <el-form ref="form" :model="staffForm" label-width="120px">
            <div class="">
                <div>基本信息</div>
                <el-form-item label="员工姓名">
                    <el-input v-model="staffForm.name" placeholder="只能是汉字"></el-input>
                </el-form-item>

                <el-form-item label="员工联系方式" placeholder="只能是手机号">
                    <el-input v-model="staffForm.phone"></el-input>
                </el-form-item>

                <el-form-item label="年龄">
                    <el-input v-model="staffForm.age" placeholder="只能是数字"></el-input>
                </el-form-item>

                <el-form-item label="学历">
                    <el-input v-model="staffForm.graduate" placeholder="将来是下拉选择"></el-input>
                </el-form-item>

                <el-form-item label="员工住址">
                    <el-input v-model="staffForm.address" placeholder=""></el-input>
                </el-form-item>

                <el-form-item label="员工服务地址">
                    <el-input v-model="staffForm.serviceAddress" placeholder=""></el-input>
                </el-form-item>

                <el-form-item label="银行卡号">
                    <el-input v-model="staffForm.bank_card" placeholder="数字"></el-input>
                </el-form-item>
            </div>
            <div>
                <div>技能信息</div>
            </div>
            
            <el-form-item>
                <el-button type="primary" @click="onSubmit">{{$route.query.id? '确认编辑' : '立即创建'}}</el-button>
                <el-button @click="goback">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>




<script>

/**
 * type 0 新建  1 编辑 
 */
import {hrService} from '../../../../common'

export default {
    data() {
        return {
            //员工信息表单
            staffForm: {
                id: '',//员工id
                name: '',//员工姓名
                phone: '',//员工联系方式
                age: '',//员工年龄
                graduate: '',//学历
                address: '',//员工住址
                serviceAddress: '',//员工服务地址
                bank_card: '',//银行卡号
                version: '',//操作版本号
                labels: [],//能力标签
                papers: [],//证书
                skills: [],//技能
            },
        }
    },
    methods: {
        /**
         * 提交表单
         * 区分新建和编辑
         */
        async onSubmit() {
            let obj = {}
            if(this.$route.query.type == 0){
                Object.keys(this.staffForm).forEach((item) =>{
                    if(item != 'id'){
                        obj.item = this.staffForm.item
                    }
                })
            } else {
                obj = {
                    ...this.staffForm
                }
            }
            try{
                await authService.editPermission(obj)
                    .then(data =>{
                        console.log(data)
                    }).catch(error =>{
                        this.$message({
                            type:'error',
                            message: error.message
                        })
                    })
            } catch(e){

            }
            
        },
        goback(){
            this.$router.push("/staff/staffList")
        }
    },
    async mounted(){
        store.commit('setLoading',true)
        try{
            await hrService.getPermission(this.$route.query.id)
                .then(data =>{

                    //权限表单字段
                    this.staffForm = data.data.permission

                    //下拉菜单列表
                    this.selectionList = data.data.selection

                }).catch(error =>{
                    this.$message({
                        type:'error',
                        message: error.message
                    })
                })
        }catch(e){

        }
        
        store.commit('setLoading',false)
    }
}
</script>

