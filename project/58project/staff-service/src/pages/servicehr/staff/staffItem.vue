<template>
    <div class="staff-box">
        <el-form class="staff-form" ref="form" :model="staffForm" :rules="staffRules" label-width="120px">
            <el-tabs v-model="activeName" :tab-position="'left'" @tab-click="tabChange">
                <el-tab-pane label="必填信息" name="require">
                    
                    <el-form-item label="员工姓名" prop="name">
                        <el-input size="small" v-model="staffForm.name" placeholder="请输入服务人员姓名"></el-input>
                    </el-form-item>

                    <el-form-item label="性别" prop="sex">
                        <el-radio-group v-model="staffForm.sex">
                            <el-radio :label="1">男</el-radio>
                            <el-radio :label="2">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    
                    <el-form-item label="年龄" prop="age">
                        <el-input-number v-model="staffForm.age"></el-input-number>
                    </el-form-item>                   
                    
                    <el-form-item label="手机号" prop="phone">
                        <el-input v-model="staffForm.phone" placeholder="请输入手机号"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="身份证号" prop="identify">
                        <el-input v-model="staffForm.identify" placeholder="请输入身份证号"></el-input>
                    </el-form-item>

                    <el-form-item label="住址" prop="address">
                        <el-input v-model="staffForm.address" placeholder="请输入现住址"></el-input>
                    </el-form-item>
                
                    <el-form-item label="银行卡号" prop="bank_card">
                        <el-input v-model="staffForm.bank_card" placeholder="数字"></el-input>
                    </el-form-item>
                </el-tab-pane>
                
                <el-tab-pane label="基本信息" name="base">
                    
                    <el-form-item label="员工头像">
                        <el-upload
                            class="avatar-uploader"
                            action="/api/admin/common/uploadImage"
                            :show-file-list="true"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="staffForm.imageUrl" :src="staffForm.imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>

                    <el-form-item label="民族" prop="nation">
                        <el-input v-model="staffForm.nation" placeholder="请键入"></el-input>
                    </el-form-item>

                    <el-form-item label="微信号" prop="wechat">
                        <el-input v-model="staffForm.wechat" placeholder="请输入微信号"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="教育程度" prop="education">
                        <el-select v-model="staffForm.education" placeholder="请选择教育程度">
                            <el-option
                                v-for="(item, index) in educationList"
                                :key="index"
                                :label="item.name"
                                :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-tab-pane>

                <el-tab-pane label="技能证书" name="skill">
                    
                    <el-form-item label="服务地区" prop="region">
                        <tags-component
                        :set-props="setCascaderProps"
                        v-model="staffForm.region"
                        :optionList="areaList"
                        :tagName="'地区'"
                        :idkey="'region_id'"></tags-component>
                    </el-form-item>

                    <el-form-item label="能力标签" prop="label">
                        <tags-component
                        :set-props="setCascaderProps"
                        v-model="staffForm.label"
                        :optionList="labelList"
                        :tagName="'技能标签'"
                        :idkey="'ability_id'"></tags-component>
                    </el-form-item>

                    <el-form-item label="技能" prop="skill">
                        <tags-component
                        :set-props="setCascaderProps"
                        v-model="staffForm.skill"
                        :optionList="skillList"
                        :tagName="'技能'"
                        :idkey="'service_category_id'"></tags-component>
                    </el-form-item>

                    <el-form-item label="证书" prop="paper">
                        <el-button style="margin-bottom:15px;" icon="el-icon-plus"  @click="openPaperDialog('new', {})">添加证书</el-button>
                        <el-row>
                            <el-col :span="24" v-for="(item, index) in staffForm.paper" :key="index">
                                <el-card :body-style="{ padding: '0px' }">
                                    <div class="paper-imgs">
                                        <img 
                                            class="paper-item-img" 
                                            v-for="(it, inds) in item.images" 
                                            :key="inds" 
                                            :src="it.url">
                                    </div>
                                    <div class="image-messsage">
                                        <p>{{item.paper_category_name}}</p>
                                        <div>
                                            <el-button @click="deleteFormPaper(item)" class="el-icon-delete" type="text" size="small">删除</el-button>
                                            <el-button @click="openPaperDialog('edit', item)" class="el-icon-edit" type="text" size="small">编辑</el-button>
                                        </div>
                                    </div>
                                </el-card>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-tab-pane>
            </el-tabs>

            <el-form-item>
                <el-button type="primary" @click="onSubmit('form')">{{$route.query.id? '确认编辑' : '立即创建'}}</el-button>
                <el-button @click="goback">取消</el-button>
            </el-form-item>
        </el-form>
        <paper-dialog 
            :isEditPaper="paperDialog.isEditPaper"
            :paperDialogVisible="paperDialog.paperDialogVisible"
            v-if="paperDialog.paperDialogVisible"
            :paperProps="paperDialog.paperAddModel"
            :selectedPapers="staffForm.paper"
            @changePaper="changePaper"
            @closePaper="cancelPaperFn"></paper-dialog>
    </div>
</template>

<script>

/**
 * type 0 新建  1 编辑
 */
import {hrService} from '../../../../common'
import {hrRequest} from '../../../../common'

import paperDialog from './paperDialog.vue'
import tagsComponent from './tagsComponent.vue'


export default {
    components: {
        paperDialog,
        tagsComponent
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
            /***************************非必填********************************* */
            //民族
            nationValidate(rule, value, callback){
                if (value != '' && !(/^[\u4e00-\u9fa5]+$/.test(value))) {
                    callback(new Error('只能是汉字'));
                } else {
                    callback();
                }
            },
        }
        return {
            //员工信息表单
            staffForm: {
                id: '',//员工id

                imageUrl: '',
                name: '',//员工姓名
                identify: '',//身份证号
                sex: 1,//员工性别
                nation: '',//民族
                phone: '',//员工联系方式
                wechat: '',//微信号
                region: [],//地区
                age: '',//员工年龄
                address: '',//员工住址
                education: 0,//教育程度
                bank_card: '',//银行卡号
                icon: '',//头像
                version: '',//操作版本号,两个人同时操作

                label: [],//能力标签
                paper: [],//证书
                skill: [],//技能
            },
            //表单验证规则
            staffRules: {
                //姓名
                name: [
                    { validator: validator.nameValidate, trigger: 'blur' }
                ],
                //年龄
                age: [
                    {validator: validator.ageValidate, trigger: 'blur'}
                ],
                //手机号
                phone: [
                    {validator: validator.phoneValidate, trigger: 'blur'}
                ],
                //身份证
                identify: [
                    {validator: validator.identifyValidate, trigger: 'blur'}
                ],
                //住址
                address: [
                    {validator: validator.addressValidate, trigger: 'blur'}
                ],
                //银行卡号
                bank_card: [
                    {validator: validator.bankCardValidate, trigger: 'blur'}
                ],
                //民族
                nation: [
                    {validator: validator.nationValidate, trigger: 'blur'}
                ],
            },
            //证书弹出框
            paperDialog: {
                isEditPaper: false,
                paperDialogVisible: false,
                paperAddModel:{
                    paper_category_name: null,
                    paper_category_id: null,
                    images: [],
                }
            },

            region: [],//地区信息
            areaList: [],//地区数组

            skill: [],//技能级联选择器筛选信息
            skillList: [],//技能级联选择器渲染数组

            label: [],//能力标签级联选择器筛选信息
            labelList: [],//能力标签级联选择器渲染数组

            //地区级联选择字段
            setCascaderProps: {
                label: 'name',
                value: 'id'
            },
            //tab
            activeName: 'require',
            ceshi: []
        }
    },
    computed: {
        //受教育程度数组
        educationList(){
            return this.$store.state.hrModule.educationList
        }
    },
    methods: {
        /**
         * 提交表单
         * 区分新建和编辑
         */
        async onSubmit(formName) {
            await this.$refs[formName].validate((valid, fileds) => {
                if (valid) {
                    hrService.editStaff(this.staffForm)
                    .then(data =>{
                        if(data.code == '0'){
                            this.$message({
                                type:"success",
                                message: "修改成功"
                            })
                            this.$router.push('/staff/staffList')
                        }
                    }).catch(error =>{
                        this.$message({
                            type:'error',
                            message: error.message
                        })
                    })
                } else {
                    let require = ["name", "sex", "phone", "identify", "address", "bank_card"],
                        base = ["nation", "wechat", "education"];
                    let errorKeys = Object.keys(fileds),
                        i = 0
                    while( i< errorKeys.length){
                        if(require.includes(errorKeys[i])){
                            this.activeName = "require"
                            break;
                        }
                        if(base.includes(errorKeys[i])){
                            this.activeName = "base"
                            break;
                        }
                        i++;
                    }
                    return false;
                }
            });
        },
        handleAvatarSuccess(res, file) {
            this.staffForm.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isLt2M;
        },
        /**
         * 删除一条证书数据
         */
        deleteFormPaper(paperItem){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.staffForm.paper.forEach((item, index) =>{
                    if(item.paper_category_id == paperItem.paper_category_id){
                        this.staffForm.paper.splice(index, 1)
                    }
                })
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });

        },

        /**
         * 新建 或 编辑 证书信息----打开弹窗
         */
        openPaperDialog(state, paperItem){
            if(state == 'edit'){
                this.paperDialog.isEditPaper = true
                this.paperDialog.paperAddModel = {
                    paper_category_name: paperItem.paper_category_name,
                    paper_category_id: paperItem.paper_category_id,
                    images: [...paperItem.images],
                }
            } else {
                this.paperDialog.isEditPaper = false
                this.paperDialog.paperAddModel = {
                    paper_category_name: '',
                    paper_category_id: '',
                    images: [],
                }
            }
            this.paperDialog.paperDialogVisible = true
        },
        /**
         * 添加证书，改变证书信息
         */
        changePaper(paperItem, isEdit){
            //若是编辑，替换证书
            if(isEdit){
                 this.staffForm.paper.forEach((item, index) =>{
                     if(paperItem.paper_category_id == item.paper_category_id){
                         this.staffForm.paper.splice(index, 1, paperItem)
                     }
                 })
            } else {
                //新建证书，直接插入
                this.staffForm.paper.push(paperItem)
            }
            //关闭弹窗
            this.paperDialog.paperDialogVisible = false
        },
        /**
         * 关闭证书编辑弹窗
         */
        cancelPaperFn(item){
            this.paperDialog.paperDialogVisible = false
        },
        /**
         * 返回
         */
        goback(){
            this.$router.push("/staff/staffList")
        },
        /**
         * 切换tab
         */
        tabChange(tab, event) {

        }
    },
    async mounted(){
        store.commit('setLoading',true)
        try{
            let data = await Promise.all([
                hrService.getAreaTree(),
                hrService.getSkillTree('enable'), //获取技能树
                hrService.getAbilityTree('enable'), //获取能力标签树
            ])
            //promise.all 赋值
            this.areaList = data[0].data
            this.skillList = data[1].data
            this.labelList = data[2].data

            //如果是编辑则请求接口
            if(this.$route.query.type == 1){
                await hrService.getStaff(this.$route.query.id)
                    .then(data =>{
                        if(data.code == "0"){
                            this.staffForm = data.data
                        }
                    }).catch(err =>{
                        throw err
                    })
            }
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
    .staff-box{
        width: 80%;
        padding-top: 30px; 
        .staff-form{
            max-width: 750px; 
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
    .avatar {
        width:65px;
        height: 65px;
        display: block;
    }
</style>


