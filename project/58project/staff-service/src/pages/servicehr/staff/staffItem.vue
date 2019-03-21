<template>
    <div class="staff-box">
        
        <el-form class="staff-form" ref="form" :model="staffForm" :rules="staffRules" label-width="120px">
            <el-form-item label="员工头像">
                <el-upload
                    class="avatar-uploader"
                    action="/api/admin/common/uploadImage"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="staffForm.imageUrl" :src="staffForm.imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="员工姓名" prop="name">
                <el-input v-model="staffForm.name" placeholder="只能是汉字"></el-input>
            </el-form-item>

            <el-form-item label="身份证号" prop="identify">
                <el-input v-model="staffForm.identify" placeholder="只能是汉字"></el-input>
            </el-form-item>

            <el-form-item label="性别" prop="sex">
                <el-radio-group v-model="staffForm.sex">
                    <el-radio :label="1">男</el-radio>
                    <el-radio :label="2">女</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="民族" prop="nation">
                <el-input v-model="staffForm.nation" placeholder="请键入"></el-input>
            </el-form-item>

            <el-form-item label="手机号" prop="phone">
                <el-input v-model="staffForm.phone" placeholder="请输入手机号"></el-input>
            </el-form-item>

            <el-form-item label="微信号" prop="wechat">
                <el-input v-model="staffForm.wechat" placeholder="请输入微信号"></el-input>
            </el-form-item>

            <el-form-item label="服务地区" prop="region">
                <el-tag
                v-for="(tag, index) in staffForm.region"
                :key="index"
                @close="handleClose(tag,'area')"
                closable>{{tag.name}}</el-tag>

                <el-cascader
                    :options="areaList"
                    v-model="region"
                    :props="areaProps"
                    clearable
                    placeholder="请选择服务地区">
                </el-cascader>
                <el-button icon="el-icon-plus" circle @click="addRegion(region, 'area')"></el-button>
            </el-form-item>


            <el-form-item label="能力标签" prop="label">
                <el-tag
                v-for="(tag, index) in staffForm.label"
                :key="index"
                @close="handleClose(tag, 'label')"
                closable>{{tag.name}}</el-tag>

                <el-cascader
                    :options="labelList"
                    v-model="label"
                    :props="areaProps"
                    clearable
                    placeholder="请选择能力标签">
                </el-cascader>
                <el-button icon="el-icon-plus" circle @click="addRegion(label,'label')"></el-button>
            </el-form-item>

            <el-form-item label="技能" prop="skill">
                <el-tag
                v-for="(tag, index) in staffForm.skill"
                :key="index"
                @close="handleClose(tag, 'skill')"
                closable>{{tag.name}}</el-tag>

                <el-cascader
                    clearable
                    :options="skillList"
                    v-model="skill"
                    :props="areaProps"
                    placeholder="请选择技能">
                </el-cascader>
                <el-button icon="el-icon-plus" circle @click="addRegion(skill, 'skill')"></el-button>
            </el-form-item>

            <el-form-item label="证书" prop="paper">
                <el-button icon="el-icon-plus"  @click="openPaperDialog('new', {})">添加证书</el-button>
                <div class="paper-list">
                    <div 
                        class="paper-item"
                        v-for="(item, index) in staffForm.paper" 
                        :key="index">
                        <div class="paper-name">
                            <p>{{item.paper_category_name}}</p>
                            <div>
                                <el-button @click="deleteFormPaper(item)" class="el-icon-delete" circle size="small"></el-button>
                                <el-button @click="openPaperDialog('edit', item)" class="el-icon-edit" circle size="small"></el-button>
                            </div>
                        </div>
                        <div class="paper-imgs">
                            <img class="paper-item-img" v-for="(it, inds) in item.images" :key="inds" :src="it.url" alt="">
                        </div>
                    </div>
                </div>
            </el-form-item>

            <el-form-item label="年龄" prop="age">
                <el-input-number v-model="staffForm.age"></el-input-number>
            </el-form-item>

            <el-form-item label="住址" prop="address">
                <el-input v-model="staffForm.address" placeholder="请输入现住址"></el-input>
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

            <el-form-item label="银行卡号" prop="bank_card">
                <el-input v-model="staffForm.bank_card" placeholder="数字"></el-input>
            </el-form-item>

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
export default {
    components: {
        paperDialog
    },
    data() {
        //表单验证
        const validator = {
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

            addressValidate(rule, value, callback){
                if (value === '') {
                    callback(new Error('请输入住址'));
                } else {
                    callback();
                }
            },

            bankCardValidate(rule, value, callback){
                if (value === '') {
                    callback(new Error('请输入银行卡号'));
                } else {
                    callback();
                }
            },
            ageValidate(rule, value, callback){
                if (!value) {
                    callback(new Error('请输入年龄'));
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

                version: '',//操作版本号,两个人同时操作

                label: [],//能力标签
                paper: [],//证书
                skill: [],//技能
            },
            //表单验证规则
            staffRules: {
                name: [
                    { validator: validator.nameValidate, trigger: 'blur' }
                ],
                identify: [
                    {validator: validator.identifyValidate, trigger: 'blur'}
                ],
                phone: [
                    {validator: validator.phoneValidate, trigger: 'blur'}
                ],
                address: [
                    {validator: validator.addressValidate, trigger: 'blur'}
                ],
                bank_card: [
                    {validator: validator.bankCardValidate, trigger: 'blur'}
                ],
                age: [
                    {validator: validator.ageValidate, trigger: 'blur'}
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
            areaProps: {
                label: 'name',
                value: 'id'
            },
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
            await this.$refs[formName].validate((valid) => {
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
                    return false;
                }
            });
        },
        handleAvatarSuccess(res, file) {
            this.staffForm.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        /**
         * 给级联选择器添加标签
         * @param cascaderData Array 级联选择器选出的三级地区数组
         * @param type String 当前级联选择器所属表单字段
         */
        addRegion(cascaderData, type){

            let _this = this

            var levelArr = [], //级联选择数组
                selectedArr = [],//当前被选中数组
                dangerWord = "",//警告词
                idkey= "";//该标签id的属性值----分类id和分类所属标签的id不一致

            //判断类型
            if(type == "area"){
                levelArr = this.areaList
                selectedArr = [..._this.staffForm.region]
                dangerWord = "地区"
                idkey = "region_id"
            } else if(type == "skill"){
                levelArr = this.skillList
                selectedArr = [..._this.staffForm.skill]
                dangerWord = "技能"
                idkey = "service_category_id"
            } else if (type == "label"){
                levelArr = this.labelList
                selectedArr = [..._this.staffForm.label]
                dangerWord = "技能标签"
                idkey = "ability_id"
            }

            //判断是否已经存在这个字段
            let isHave = selectedArr.some((item, index) =>{
                let length = cascaderData.length
                return item[idkey] == cascaderData[length-1]
            })

            //如果标签已经存在
            if(isHave){
                this.$message({
                    type:'error',
                    message: `当前${dangerWord}已存在，请重新选择`
                })
                return
            }

            //向tag数组添加一条数据
            findAreaObj(levelArr, cascaderData)

            //重新给表单字段赋值
            if(type == "area"){
                _this.staffForm.region = selectedArr
            } else if(type == "skill"){
                _this.staffForm.skill = selectedArr
            } else if (type == "label"){
                _this.staffForm.label = selectedArr
            }

            /**
             * Tag数组添加方法
             * des 级联选择器控件拿到的格式是一个包含三级选项id的数组， [1000, 10001, 10002]
             *  该函数通过最后一级的id值，递归树，找到这个匹配的叶节点选项，并插入tag数组中
             * @param areaList Array  树形列表
             * @param region Array 级联选择器选出的三级数组
             */
            function findAreaObj(areaList, region){

                areaList.forEach((item, index) =>{

                    if(item.children){

                        findAreaObj(item.children, region)

                    } else {

                        //未添加时属性名还是id!!!!!
                        if(item.id == region[region.length-1]){
                            /**
                             * {id: '', name: '', parant_id: ''}
                             * 将id属性转换成以下四种之一
                             * 删除parant_id属性
                             */
                            let idvalue = region[region.length-1]; //取出id值

                            //删除原有的两个字段
                            delete item['id']
                            delete item['parent_id']

                            //赋给id新的属性名
                            item[idkey] = idvalue

                            //混入数组
                            selectedArr = [
                                item,
                                ...selectedArr
                            ]
                        }
                    }
                })
            }
        },
        /**
         * tag数组删除一条
         */
        handleClose(tag, type){

            if(tag.hasOwnProperty("region_id")){
                //删除地区tag
                this.staffForm.region.forEach((item, index) =>{
                    if(item.region_id == tag.region_id){
                        this.staffForm.region.splice(index, 1)
                    }
                })
            } else if(tag.hasOwnProperty("service_category_id")){
                //删除技能tag
                this.staffForm.skill.forEach((item, index) =>{
                    if(item.service_category_id == tag.service_category_id){
                        this.staffForm.skill.splice(index, 1)
                    }
                })
            } else if (tag.hasOwnProperty("ability_id")){
                //删除能力标签tag
                this.staffForm.label.forEach((item, index) =>{
                    if(item.ability_id == tag.ability_id){
                        this.staffForm.label.splice(index, 1)
                    }
                })
            } else {
                return
            }
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
        goback(){
            this.$router.push("/staff/staffList")
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
            max-width: 650px; 
        }
        .paper-list{
            width:100%;
            .paper-item{
                position: relative;
                display: flex;
                justify-content: flex-start;
                height:100px;
                &:after{
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    height: 1px;
                    background: #ccc;
                    content: '';
                }
                .paper-name{
                    height:100px;
                    width: 100px;
                    text-align: center;
                    font-size: 14px;
                    line-height: 40px;
                }
                .paper-imgs{
                    .paper-item-img{
                        display: inline-block;
                        height:100px;
                        width: 100px;
                        margin : 0 10px;
                    }
                }
            }
            
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
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>


