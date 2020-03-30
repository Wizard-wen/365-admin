<template>
    <!-- 订单申请 -->
    <el-dialog
        v-loading="is_loading"
        title="创建新门店"
        :visible.sync="createStoreDialogVisible"
        :show-close="false"
        :close-on-press-escape="false"
        :close-on-click-modal="false">
        <el-form :model="createStoreForm" label-width="120px" :rules="storeRules" ref="createStoreForm">
            <el-form-item prop="name">
                <el-tooltip slot="label" class="item" effect="dark" content="店铺命名规则，地域+门店名，例如，大东旗舰店。" placement="top-start">
                    <span>店铺名<i class="el-icon-info"></i></span>
                </el-tooltip>
                <el-input v-model="createStoreForm.name" placeholder="请填写店铺名"></el-input>
            </el-form-item>
            <el-form-item prop="address">
                <el-tooltip slot="label" class="item" effect="dark" content="请详细填写门店地址，细化至门牌号。" placement="top-start">
                    <span>门店地址<i class="el-icon-info"></i></span>
                </el-tooltip>
                <el-input v-model="createStoreForm.address" placeholder="请填写门店地址"></el-input>
            </el-form-item>
            <el-form-item prop="is_third">
                <el-tooltip slot="label" class="item" effect="dark" content="请妥善选择，一旦确定，不能轻易更改。" placement="top-start">
                    <span>门店类型<i class="el-icon-info"></i></span>
                </el-tooltip>
                <el-radio-group v-model="createStoreForm.is_third">
                    <el-radio :label="1">直营店</el-radio>
                    <el-radio :label="2">加盟店</el-radio>
                    <!-- <el-radio :label="3">商家店铺</el-radio> -->
                </el-radio-group>
			</el-form-item>
            <el-form-item label="店铺备注信息" prop="remarks">
                <el-input v-model="createStoreForm.remarks" type="textarea" placeholder="请填写店铺备注信息"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closeAddStoreDialog">取 消</el-button>
            <el-button type="primary" @click="onSubmit('createStoreForm')">确定</el-button>
        </div>
    </el-dialog>
</template>

<script>

import {storeService} from '@/service/store'
export default {
    props:{
        /**
         * 控制组件的显示隐藏
         */
        createStoreDialogVisible:{
            default:false,
            type: Boolean,
        },
    },
    data() {
        return {
            is_loading: false,
            //改变的字段内容
            createStoreForm: {
                name: "",//门店名
				address: "",//门店地址
				is_third: 1,//门店类型 直营 加盟
				remarks: "",//备注信息
            },
            //店铺规则
			storeRules: {
				name: [{ required: true, message: '请填写店铺名称', trigger: "blur" }],
                address: [{ required: true, message: '请填写门店地址', trigger: "blur" }],
			},
            //店铺类型列表
			typeList: [{ id: 1, name: "直营店" }, { id: 2, name: "加盟店" }],
        }
    },
    methods: {
        closeAddStoreDialog(){
            this.createStoreForm.name = ''
            this.createStoreForm.address = ''
            this.createStoreForm.remarks = ''

            this.$emit('closeAddStoreDialog')
        },
        async onSubmit(formName){
            await this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    try{
                        this.is_loading = true
                        let createStoreForm = {
                            ...this.createStoreForm,
                        }
                        await storeService.editStore(createStoreForm).then(data => {
                            if (data.code == "0") {
                                this.$message({
                                    type: "success",
                                    message: data.message
                                });
                            }
                            this.is_loading = false
                            this.closeAddStoreDialog()
                        }).catch(error => {
                            this.$message({
                                type: "error",
                                message: error.message
                            });
                            this.is_loading = false
                        }).finally( () =>{
                            this.is_loading = false
                        })
                    } catch(error) {
                        this.$message({
                            type: "error",
                            message: error.message
                        });
                    }        
                } else {
                    return false;
                }
            });
        }
    },
}
</script>


