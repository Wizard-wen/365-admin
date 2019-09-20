<template>
    <!-- 订单申请 -->
    <el-dialog
        title="创建新门店"
        :visible.sync="createStoreDialogVisible"
        :show-close="false"
        :close-on-press-escape="false"
        :close-on-click-modal="false">
        <el-form :model="createStoreForm" label-width="120px" ref="createStoreForm">
            <el-form-item label="店铺名" prop="name">
                <el-input v-model="createStoreForm.name" placeholder="请填写店铺名"></el-input>
            </el-form-item>
            <el-form-item label="门店地址" prop="address">
                <el-input v-model="createStoreForm.address" placeholder="请填写门店地址"></el-input>
            </el-form-item>
            <el-form-item label="门店类型" prop="is_third">
				<select-tag-component :propTagList="typeList" v-model="createStoreForm.is_third" :isSingle="true"></select-tag-component>
			</el-form-item>
            <el-form-item label="店铺备注信息" prop="remarks">
                <el-input v-model="createStoreForm.remarks" placeholder="请填写店铺备注信息"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelCreateStore">取 消</el-button>
            <el-button type="primary" @click="onSubmit('createStoreForm')">确定</el-button>
        </div>
    </el-dialog>
</template>

<script>

/**
 * type 0 新建  1 编辑
 */
import {storeService} from '../../../../common'
import { selectTagComponent } from "@/pages/components";
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
            isLoading: false,
            //改变的字段内容
            createStoreForm: {
                name: "",//门店名
				address: "",//门店地址
				is_third: 0,//门店类型 直营 加盟
				remarks: "",//备注信息
            },
            //店铺规则
			storeRules: {
				name: [{ required: true, message: '请填写店铺名称', trigger: "blur" }],
				address: [{ required: true, message: '请填写门店地址', trigger: "blur" }]
			},
            //店铺类型列表
			typeList: [{ id: 1, name: "直营店" }, { id: 2, name: "加盟店" }],
        }
    },
    components: {
        selectTagComponent,
    },  
    methods: {
        cancelCreateStore(){
            this.createStoreForm.name = ''
            this.createStoreForm.address = ''
            this.createStoreForm.remarks = ''

            this.$emit('closeAddStoreStaffDialog')
        },
        async onSubmit(formName){
            await this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    try{
                        this.isLoading = true
                        await storeService.editStore(this.createStoreForm).then(data => {
                            if (data.code == "0") {
                                this.$message({
                                    type: "success",
                                    message: data.message
                                });
                                this.isLoading = false
                                this.$emit('closeAddStoreStaffDialog')
                            }
                        }).catch(error => {
                            this.$message({
                                type: "error",
                                message: error.message
                            });
                            this.isLoading = false
                        }).finally( () =>{
                            this.isLoading = false
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
    async mounted(){

    }
}
</script>


