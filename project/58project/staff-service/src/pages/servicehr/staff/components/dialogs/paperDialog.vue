<template>
    <!-- 添加证书 -->
    <el-dialog
        title="添加证书"
        :visible.sync="paperDialogVisible"
        :show-close="false"
        :close-on-press-escape="false"
        :close-on-click-modal="false">
        <el-form :model="paperForm" label-width="120px" :rules="paperRules" ref="paperForm">

            <el-form-item label="证书" prop="paper_category_id" style="margin-bottom:30px;">
                <el-select v-model="paperForm.paper_category_id" placeholder="请选择" :disabled="isEditPaper">
                    <el-option v-for="item in paperList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="上传图片" prop="images" ref="paper">
                <el-upload
                    accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
                    action="/admin/common/uploadImage"
                    :on-success="uploadSuccess"
                    :on-remove="removePic"
                    :file-list="paperForm.images"
                    list-type="picture-card"
                    :headers="uploadHeader">
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
import {hrRequest, hrService} from '../../../../../../common'

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
            validateImages(rule, value, callback){
                if (value.length == 0) {
                    callback(new Error('至少保存一张图片'));
                } else {
                    callback();
                }
            }
        }
        return {
            //表单校验
            paperRules: {
                paper_category_id: [
                    {validator: validator.validateTag, trigger:'change'}
                ],
                images: [
                    {validator: validator.validateImages, trigger:'change'}
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
            //图片上传header
            uploadHeader:{
                accessToken: this.$store.state.loginModule.token.access_token
            }
        }
    },
    methods: {
        /**
         * 上传成功后，接收图片数据，送入图片回显数组
         */
        uploadSuccess(response, file, fileList) {
            let picItem = {
                path: response.data.path,
                url: './resource/'+response.data.path,
                name: response.data.name
            }
            this.paperForm.images.push(picItem)
            //消除表单验证
            if(this.paperForm.images.length){
                this.$refs.paper.clearValidate()
            }
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
            let _this = this;

            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let name = _this.paperList.find((item, index) =>{
                        return item.id == paperItem.paper_category_id
                    })
                    paperItem.paper_category_name = name.name

                    this.$emit('changePaper', paperItem, this.isEditPaper)
                } else {
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


