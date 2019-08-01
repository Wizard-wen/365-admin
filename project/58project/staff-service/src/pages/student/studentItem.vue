<template>
    <div class="staff-box">
        <el-form class="staff-form" ref="form" :model="originRequireForm" :rules="originRequireRules" label-width="100px">
            
            <el-form-item label="创建人" prop="initiatorName" class="form-item-size">
                <el-input v-model="originRequireForm.initiatorName" disabled></el-input>
            </el-form-item> 
            
            <el-form-item label="创建人id" prop="initiatorCode" class="form-item-size">
                <el-input v-model="originRequireForm.initiatorCode" disabled></el-input>
            </el-form-item>           
            
            <el-form-item label="创建时间" prop="init_create_at" class="form-item-size">
                <el-input v-model="originRequireForm.init_create_at" disabled></el-input>
            </el-form-item>  
            
            <!-- <el-form-item label="提交时间" prop="init_submit_at" class="form-item-size">
                <el-input v-model="originRequireForm.init_submit_at" disabled></el-input>
            </el-form-item>            -->
            
            <el-form-item label="需求名称" prop="requireName" class="form-item-size">
                <el-input v-model="originRequireForm.requireName" :maxlength="20" placeholder="请输入服务人员姓名"></el-input>
            </el-form-item>
            
            <el-form-item label="需求描述" prop="description" class="form-item-size">
                <el-input autosize type="textarea" v-model="originRequireForm.description" :maxlength="20" placeholder="请输入服务人员姓名"></el-input>
            </el-form-item>
            
            <el-form-item label="需求优先级" prop="priority" class="form-item-size">
                <el-rate v-model="originRequireForm.priority"></el-rate>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit('form')">{{$route.query.id? '确认编辑' : '立即创建'}}</el-button>
                <el-button @click="goback">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

// import {operateService} from '../../../common'


export default {
    components: {

    },
    data() {
        //表单验证
        const validator = {
            //姓名
            nameValidate(rule, value, callback){
                if (value === '') {
                    callback(new Error('请输入服务人员姓名'));
                } else {
                    if (!/^[\u4e00-\u9fa5]+$/.test(value)) {
                        callback(new Error('只能输入汉字'));
                    }
                    callback();
                }
            },
            //年龄
            ageValidate(rule, value, callback){
                if (!value) {
                    callback(new Error('请输入年龄'));
                } else {
                    if (!(/^\d+$/.test(value))) {
                        callback(new Error('请输入数字'));
                    }
                    callback();
                }
            },
            //手机号
            phoneValidate(rule, value, callback){
                if (value === '') {
                    callback(new Error('请输入手机号'));
                } else {
                    if (!(/^1[34578]\d{9}$/.test(value))) {
                        callback(new Error('请输入正确格式的手机号'));
                    }
                    callback();
                }
            },
            //身份证号
            identifyValidate(rule, value, callback){
                if (value === '') {
                    callback(new Error('请输入身份证号'));
                } else {
                    if (!(value.length == 18)) {
                        callback(new Error('请输入18位有效身份证号'));
                    }
                    callback();
                }
            },
            //住址
            addressValidate(rule, value, callback){
                if (value === '') {
                    callback(new Error('请输入住址'));
                } else {
                    callback();
                }
            },
            //银行卡号
            bankCardValidate(rule, value, callback){
                if (value === '') {
                    callback(new Error('请输入银行卡号'));
                }else if (!(/^[0-9]+$/.test(value))) {
                    callback(new Error('银行卡号只能是数字'));
                } else {
                    callback();
                }
            },
        }
        return {
            icon_fileList: [],
            //员工信息表单
            originRequireForm: {
                id:0,//原始需求id，创建时生成
                initiatorName:'',//原始需求的提出者姓名
                initiatorCode:0,//原始需求的提出者id，有疑惑时便于追溯
                init_create_at:0,//原始需求的创建时间
                init_submit_at:0,//原始需求的提交时间

                requireName:'',//需求名
                description:'',//需求描述

                priority:0,//优先级element 五星
            },
            //表单验证规则
            originRequireRules: {
                //需求名
                requireName: [
                    { required: true, message: '请填写需求名', trigger: 'blur' }
                ],
                //需求描述
                description: [
                    { required: true, message: '请描述需求', trigger: 'blur' }
                ],
                //优先级
                priority: [
                    { required: true, message: '请选择需求优先级', trigger: 'change' }
                ],
            },
        }
    },
    computed: {

    },
    methods: {
        /**
         * 提交表单
         * 区分新建和编辑
         */
        async onSubmit(formName) {
            await this.$refs[formName].validate((valid, fileds) => {
                if (valid) {
                    operateService.editStaff(this.originRequireForm).then(data =>{
                            if(data.code == '0'){
                                this.$message({
                                    type:"success",
                                    message: "修改成功"
                                })
                                this.$router.push('/develop/requireList')
                            }
                        }).catch(error =>{
                            this.$message({
                                type:'error',
                                message: error.message
                            })
                        })
                } else {
                    return false;
                }
            });
        },
        /**
         * 返回需求列表
         */
        goback(){
            this.$router.push("/develop/requireList")
        },
    },
    async mounted(){

        
        try{

            //如果是编辑则请求接口
            if(this.$route.query.type == 1){
                store.commit('setLoading',true)
                await operateService.getStaff(this.$route.query.id).then(data =>{
                    if(data.code == "0"){
                        this.originRequireForm = data.data
                    }

                }).catch(error =>{
                    this.$message({
                        type:'error',
                        message: error.message
                    })
                }).finally(() =>{
                    store.commit('setLoading',false)
                })
            }
        }catch(error){
            this.$message({
                type:'error',
                message: error.message
            })
        }

    }
}
</script>
<style lang="scss" scoped>
    .staff-box{
        width: 100%;
        padding-top: 30px;
        .staff-form{
            width: 100%;
            .form-item-size{
                width: 30%;
                & /deep/ .el-input{
                    min-width: 260px;
                }
            }
        }
        .paper-imgs{
            height: 110px!important;
            padding: 5px 0;
            .paper-item-img{
                display: inline-block;
                height:100px;
                width: 100px;
                margin : 0 10px;
            }
        }
        .image-messsage{
            line-height: 40px;
            display: flex;
            justify-content: space-between;
            padding: 0 20px;
        }
    }
    //图片上传
    .avatar-uploader /deep/ .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader /deep/ .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 16px;
        color: #8c939d;
        width: 65px;
        height: 65px;
        line-height: 65px;
        text-align: center;
    }
    .avatar-box{
        width:65px;
        height: 65px;
        position: relative;
        .avatar {
            width:65px;
            height: 65px;
            display: block;
        }
        .avatar-back{
            position: absolute;
            height: 65px;
            width: 65px;
            top: 0;
            z-index: 4;
            background: rgba(0,0,0,.5)
        }
    }

</style>


