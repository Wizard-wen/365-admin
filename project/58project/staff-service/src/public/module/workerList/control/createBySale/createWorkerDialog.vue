<template>
    <el-dialog
        v-loading="is_loading"
        :title="createWorkerDialogTitle"
        :visible.sync="openCreateWorkerDialog"
        :show-close="false"
        :close-on-press-escape="false"
        :close-on-click-modal="false">
        <el-form :model="createWorkerForm" :label-width="'120px'" ref="createWorkerForm" :rules="createWorkerRules">
            <el-form-item label="服务人员姓名" prop="name">
                <el-input v-model="createWorkerForm.name" :maxlength="10" placeholder="请输入姓名"></el-input>
            </el-form-item>

            <el-form-item label="手机号" prop="phone">
                <el-input v-model="createWorkerForm.phone" :maxlength="11" placeholder="请输入手机号"></el-input>
            </el-form-item>

            <el-form-item label="职业类型" prop="skill" class="form-item-size form-item-2-size" size="small">
                <el-cascader
                    v-model="createWorkerForm.skill"
                    :props="{
                        label: 'name',
                        value: 'id',
                        multiple: true
                    }"
                    :options="workerConfigForm.skill"
                    :show-all-levels="false"></el-cascader>
            </el-form-item>

            <el-form-item label="备注" prop="seller_remarks">
                <el-input placeholder="请最多输入200字符" :maxlength="100" autosize v-model="createWorkerForm.seller_remarks" type="textarea"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closeCreateWorkerDialog">取 消</el-button>
            <el-button type="primary" @click="submitSaleCreateWorker('createWorkerForm')">提交</el-button>
        </div>
    </el-dialog>
</template>
<script>
import {saleService,operateService} from '@common/index.js'
import {operateWorkerService} from '@/service/operateWorker'
export default {
    props: {
        //是否打弹出框
        openCreateWorkerDialog: {
            type: Boolean,
            default: false,
        },
        //弹窗title
        createWorkerDialogTitle: {
            type: String,
            default: "申请添加服务人员"
        },
        workerConfigForm: {
            type: Object,
            default(){return {}}
        }
    },
    data(){
        let _this = this;
        //手机号
        const phoneValidate = async (rule, value, callback) => {
            if (value == '') {
                _this.phoneCheck = false
                _this.phoneCheckObject = {}
                callback(new Error('请输入手机号'));
            } else {
                try{
                    await operateService.checkStaffPhone(0, value).then((data) =>{
                        if(data.code == '0'){
                            callback()
                            _this.phoneCheck = false
                            _this.phoneCheckObject = {}
                        } else {
                            callback(new Error(data.message))
                        }
                    })
                } catch(error){
                    _this.phoneCheck = true
                    _this.phoneCheckObject = error.data
                    callback(error.message)
                }
            }
        };
        return {
            is_loading:false,
            //申请创建劳动者信息
            createWorkerForm : {
                name: '',//服务人员姓名
                phone: '',//服务人员电话
                skill:[],
                seller_remarks: '',//备注信息
            },
            //手机号检测
            phoneCheck: false,
            phoneCheckObject: {},
            //申请创建劳动者表单验证
            createWorkerRules: {
                name: [
                    { required:true,message:'请输入姓名',trigger: 'blur' },
                ],
                //电话
                phone: [
                    { required:true,message:'请输入电话',trigger: 'blur'},
                    { validator: phoneValidate, trigger: 'blur'}
                ],
                seller_remarks: [
                    { required:true,message:'请输入备注信息',trigger: 'blur'},
                ]
            }
        }
    },
    methods: {
        /**
         * 提交创建服务人员信息
         */
        async submitSaleCreateWorker(formName){
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    let staffFormSend = {
                        ...this.createWorkerForm
                    }
                    staffFormSend.skill = operateWorkerService.sendCascanderData(staffFormSend.skill) 
                    try{    
                        this.is_loading = true
                        await saleService.createWorkerBySeller(staffFormSend).then(data =>{
                            if(data.code == "0"){
                                this.$message({
                                    type:'success',
                                    message: data.message
                                })
                            }
                            this.is_loading = false
                            //关闭日志弹出框
                            this.$emit('closeCreateWorkerDialog')
                        }).catch(error =>{
                            this.$message({
                                type:'error',
                                message: error.message
                            })
                            this.is_loading = false
                        })
                    } catch(error){
                        this.$message({
                            type:'error',
                            message: error.message
                        })
                        this.is_loading = false
                    }  
                } else {
                    return false;
                }
            });

        },
        //关闭日志弹框
        closeCreateWorkerDialog(){
            //关闭日志弹出框
            this.$emit('closeCreateWorkerDialog')
        }
    }
}
</script>
<style lang="scss" scoped>
  .select-tag /deep/ .tag-edit-box {
    width: 100%;
  }
</style>


