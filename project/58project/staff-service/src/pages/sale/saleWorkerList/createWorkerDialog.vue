<template>
    <el-dialog
        :title="createWorkerDialogTitle"
        :visible.sync="openCreateWorkerDialog"
        :show-close="false"
        :close-on-press-escape="false"
        :close-on-click-modal="false">
        <el-form :model="createWorkerForm" :label-width="'120px'" ref="createWorkerForm" :rules="createWorkerRules">
            <el-form-item label="服务人员姓名" prop="name">
                <el-input v-model="createWorkerForm.name" :maxlength="10" placeholder="请输入姓名"></el-input>
            </el-form-item>

            <el-form-item label="年龄" prop="age">
                <el-input v-model="createWorkerForm.age" :maxlength="2" placeholder="请输入年龄"></el-input>
            </el-form-item>

            <el-form-item label="手机号" prop="phone">
                <el-input v-model="createWorkerForm.phone" :maxlength="11" placeholder="请输入手机号"></el-input>
            </el-form-item>

            <el-form-item label="职业类型">
                <select-tag-component
                  class="select-tag"
                  :propTagList="workerConfigList.service_category"
                  v-model="createWorkerForm.skill"
                  :isSingle="false">
                </select-tag-component>
            </el-form-item>

            <el-form-item label="服务类型">
                <select-tag-component
                  class="select-tag"
                  :propTagList="workerConfigList.service_type"
                  v-model="createWorkerForm.service_type"
                  :isSingle="false">
                </select-tag-component>
            </el-form-item>

            <el-form-item label="备注" prop="seller_remarks">
                <el-input placeholder="请最多输入200字符" :maxlength="100" autosize v-model="createWorkerForm.seller_remarks" type="textarea"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closeCreateWorkerDialog">取 消</el-button>
            <el-button type="primary" @click="commitLog('createWorkerForm')">提交</el-button>
        </div>
    </el-dialog>
</template>
<script>
import {saleService,operateService} from '@common/index.js'
// import selectTagComponent from '../../components/selectTagComponent'
export default {
    // components: {
    //     selectTagComponent//单选、多选框组件
    // },
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
    },
    computed:{
        /**
         *
         */
        workerConfigList(){
            return this.$store.state.operateModule.workerConfigForm
        }
    },
    data(){
        let _this = this;
        const remarksValidator = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请填写日志信息'));
            } else {
                callback();
            }
        };
        const ageValidate = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请输入年龄'));
            } else {
                if (!(/^\d+$/.test(value))) {
                    callback(new Error('年龄只能是数字'));
                }
                callback();
            }
        };
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
            //申请创建劳动者信息
            createWorkerForm : {
                name: '',//服务人员姓名
                age: 0,
                phone: '',//服务人员电话
                skill:[],
                service_type:[],//服务类型
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
                age: [
                    { required:true,message:'请输入年龄',trigger: 'blur' },
                    { validator: ageValidate, trigger: 'blur' }
                ],
                //电话
                phone: [
                    { required:true,message:'请输入电话',trigger: 'blur'},
                    { validator: phoneValidate, trigger: 'blur'}
                ],
                seller_remarks: [
                    { validator: remarksValidator, trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        /**
         * 拼接service_crowd（服务人群）字段
         */
        setCommitAttr(selectedArr, originArr, keyName){
            return originArr.reduce((arr, item, index)=>{
                var serviceItem = null
                selectedArr.forEach((it, index) =>{

                    if(it == item.id){
                        serviceItem = {}
                        serviceItem[keyName] = item.id;
                        serviceItem['name'] = item.name;
                    }
                })
                return serviceItem == null ? arr : arr.concat(serviceItem)
            },[])
        },
        setFormItem(){
            //提交前，拷贝出一份数据做字段转换
            let staffFormSend = {
                ...this.createWorkerForm
            }
            staffFormSend.skill = this.setCommitAttr(
                staffFormSend.skill,
                this.workerConfigList.service_category,
                'service_category_id'
            );

            staffFormSend.service_type = this.setCommitAttr(
                staffFormSend.service_type,
                this.workerConfigList.service_type,
                'service_type_id'
            );

            return staffFormSend
        },
        /**
         * 提交日志信息
         */
        async commitLog(formName){
            this.$refs[formName].validate(async (valid) => {
                if (valid) {

                    store.commit('setLoading',true)
                    let staffFormSend = this.setFormItem()

                    await saleService.createWorkerBySeller(staffFormSend)
                        .then(data =>{
                            if(data.code == "0"){
                                this.$message({
                                    type:'success',
                                    message: data.message
                                })
                            }
                        })
                        .catch(e =>{
                            this.$message({
                                type:'error',
                                message: e.message
                            })
                        })

                    store.commit('setLoading',false)

                    //关闭日志弹出框
                    this.$emit('closeCreateWorkerDialog')
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


