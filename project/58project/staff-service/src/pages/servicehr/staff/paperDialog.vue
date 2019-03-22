<template>
    <!-- 添加证书 -->
    <el-dialog 
        title="添加证书" 
        :visible.sync="paperDialogVisible" 
        :show-close="false"
        :close-on-press-escape="false"
        :close-on-click-modal="false">
        <el-form :model="paperForm" label-width="120px" :rules="paperRules" ref="paperForm">
            <el-form-item label="证书" prop="paper_category_id">
                <el-select v-model="paperForm.paper_category_id" placeholder="请选择" :disabled="isEditPaper">
                    <el-option
                    v-for="item in paperList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="上传图片">
                <el-upload
                    action="/api/admin/common/uploadImage"
                    :on-success="uploadSuccess"
                    :on-remove="removePic"
                    :file-list="paperForm.images"
                    list-type="picture-card">
                    <i class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelPaper">取 消</el-button>
            <el-button type="primary" @click="surePaper('paperForm')">确定</el-button>
        </div>
    </el-dialog>
</template>

<script>

/**
 * type 0 新建  1 编辑
 */
import {hrService} from '../../../../common'
import {hrRequest} from '../../../../common'


export default {
    props:{
        /**
         * 控制组件的显示隐藏
         */
        paperDialogVisible:{
            default:false,
            type: Boolean,
        },
        /**
         * 是新建还是编辑
         * true 编辑 false 新建
         */
        isEditPaper: {
            default: false,
            type: Boolean,
        },
        /**
         * 传入数据
         */
        paperProps: {
            type: Object,
            default: function(){
                return {
                    paper_category_name: "",
                    paper_category_id: "",
                    images: [],
                }
            }
        },
        /**
         * 已经选择的证书
         */
        selectedPapers: {
            type: Array,
            default: function(){
                return []
            }
        },
    },
    data() {
        var _this = this;
        const validator = {
            validateTag(rule, value, callback){
                //判断是否已经存在这个证书
                let isHave = _this.selectedPapers.some((item, index) =>{
                    return item.paper_category_id == value
                })
                if (!value) {
                    callback(new Error('请选择证书'));
                } else if(isHave && !_this.isEditPaper){
                    callback(new Error('当前证书已选择'));
                } else {
                    callback();
                }
            },
        }
        return {
            //表单校验
            paperRules: {
                paper_category_id: [
                    {validator: validator.validateTag, trigger:'change'}
                ],
            },
            //props传入的证书信息
            paperForm: {
                paper_category_name: this.paperProps.paper_category_name,
                paper_category_id: this.paperProps.paper_category_id,
                images: this.paperProps.images,
            },
            paperView: [],//证书级联选择器筛选信息
            paperList: [],//证书级联选择器渲染数组

            //地区级联选择字段
            setPaperProps: {
                label: 'name',
                value: 'id'
            },
        }
    },
    methods: {
        /**
         * 上传成功后，接收图片数据，送入图片回显数组
         */
        uploadSuccess(response, file, fileList) {
            let picItem = {
                path: response.data.path,
                url: './api/resource/'+response.data.path,
                name: response.data.name
            }
            this.paperForm.images.push(picItem)
        },
        /**
         * 移出图片
         */
        removePic(file, fileList){
            this.paperForm.images.forEach((item, index) =>{
                if(item.name == file.name){
                    this.paperForm.images.splice(index,1)
                }
            })
        },
        /**
         * 提交修改
         */
        surePaper(formName){

            let paperItem = {
                ...this.paperForm
            }
            
            let name = this.paperList.find((item, index) =>{
                return item.id == paperItem.paper_category_id
            })
            
            paperItem.paper_category_name = name.name

            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$emit('changePaper',paperItem, this.isEditPaper)
                } else {
                    this.$message({
                        type:'error',
                        message: '请选择证书'
                    })
                    return false;
                }
            });
        },
        /**
         * 关闭弹出框---单向数据
         */
        cancelPaper(){
            this.$emit('closePaper')
        }
    },
    async mounted(){
        store.commit('setLoading',true)
        try{
            let data = await Promise.all([
                hrService.getPaperSelection('enable'), //获取证书列表
            ])
            //promise.all 赋值
            this.paperList = data[0].data

        }catch(e){
            this.$message({
                type:'error',
                message: e.message
            })
        }
        store.commit('setLoading',false)
    }
}
</script>
<style lang="scss" scoped>


    //弹出框-上传图片边框
    // .avatar-uploader {
    //     & /deep/ .el-upload {
    //     border: 1px dashed #d9d9d9;
    //     border-radius: 6px;
    //     cursor: pointer;
    //     position: relative;
    //     overflow: hidden;
    //     }
    // }
    // .avatar-uploader .el-upload:hover {
    //     border-color: #409EFF;
    // }
    // .avatar-uploader-icon {
    //     font-size: 28px;
    //     color: #8c939d;
    //     width: 178px;
    //     height: 178px;
    //     line-height: 178px;
    //     text-align: center;
    // }
    // .avatar {
    //     width: 178px;
    //     height: 178px;
    //     display: block;
    // }
</style>


