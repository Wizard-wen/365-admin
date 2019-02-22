<template>
    <div>
        <el-form ref="staffForm" :model="staffForm" :rules="staffRules" label-width="120px">
            <el-form-item label="员工姓名" prop="name">
                <el-input v-model="staffForm.name" placeholder="只能是汉字"></el-input>
            </el-form-item>

            <el-form-item label="身份证号" prop="identify">
                <el-input v-model="staffForm.identify" placeholder="只能是汉字"></el-input>
            </el-form-item>

            <el-form-item label="性别" prop="sex">
                <el-radio-group v-model="staffForm.sex">
                    <el-radio label="男">男</el-radio>
                    <el-radio label="女">女</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="民族" prop="nation">
                <el-input v-model="staffForm.nation" placeholder="只能是汉字"></el-input>
            </el-form-item>

            <el-form-item label="手机号" prop="phone">
                <el-input v-model="staffForm.phone" placeholder="请输入手机号"></el-input>
            </el-form-item>

            <el-form-item label="微信号" prop="wechat">
                <el-input v-model="staffForm.wechat" placeholder="请输入微信号"></el-input>
            </el-form-item>

            <el-form-item label="地区" prop="region">
                <el-cascader
                    :options="areaList"
                    v-model="staffForm.region"
                    :props="areaProps"
                    placeholder="请选择服务地区">
                </el-cascader>
            </el-form-item>

            <el-form-item label="年龄" prop="age">
                <el-input v-model="staffForm.age" placeholder="只能是数字"></el-input>
            </el-form-item>

            <el-form-item label="住址" prop="address">
                <el-input v-model="staffForm.address" placeholder=""></el-input>
            </el-form-item>

            <el-form-item label="教育程度" prop="education">
                <el-input v-model="staffForm.education" placeholder="将来是下拉选择"></el-input>
            </el-form-item>

            <el-form-item label="银行卡号" prop="bank_card">
                <el-input v-model="staffForm.bank_card" placeholder="数字"></el-input>
            </el-form-item>
        
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
        const nameValidate = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入服务人员姓名'));
            } else {
                if (this.ruleForm2.checkPass !== '') {
                    
                }
                callback();
            }
        }
        return {
            textObject: {
                name: '/^[\u4e00-\u9fa5]+$/',

            },
            //员工信息表单
            staffForm: {
                id: '',//员工id

                name: '',//员工姓名
                identify: '',//身份证号
                sex: '',//员工性别
                nation: '',//民族
                phone: '',//员工联系方式
                wechat: '',//微信号
                region: [],//地区
                age: '',//员工年龄
                address: '',//员工住址
                education: '',//教育程度
                bank_card: '',//银行卡号

                version: '',//操作版本号
                labels: [],//能力标签
                papers: [],//证书
                skills: [],//技能
            },
            areaList: [],//地区数组
            //地区级联选择字段
            areaProps: {
                label: 'name',
                value: 'code'
            },
            //表单验证规则
            staffRules: {
                
            }
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
            // await hrService.getPermission(this.$route.query.id)
            //     .then(data =>{

            //         //权限表单字段
            //         this.staffForm = data.data.permission

            //         //下拉菜单列表
            //         this.selectionList = data.data.selection

            //     }).catch(error =>{
            //         this.$message({
            //             type:'error',
            //             message: error.message
            //         })
            //     })
            await hrService.getAreaTree()
                .then(data =>{
                    console.log(data)
                    this.areaList = data.data
                })
        }catch(e){

        }
        
        store.commit('setLoading',false)
    }
}
</script>

