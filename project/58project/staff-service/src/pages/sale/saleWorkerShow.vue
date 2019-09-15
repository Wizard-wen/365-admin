<template>
    <div class="staff-box">
        <el-form class="staff-form"  ref="form" :model="workerForm" label-width="140px">
            <!-- 等同于更新时间 -->
            <el-form-item label="登记日期" prop="register_at" class="form-item-size" size="small">
                {{created_atFormatter}}
            </el-form-item>

            <el-form-item label="更新日期" prop="updated_at" class="form-item-size" size="small">
                {{updated_atFormatter}}
            </el-form-item>

            <el-form-item label="认证状态" prop="authentication" class="form-item-size" size="small">
                <select-tag-component :isEdit="false" :propTagList="workerConfigList.authentication" v-model="workerForm.authentication" :isSingle="true"></select-tag-component>
            </el-form-item>

            <el-form-item label="姓名" prop="name" class="form-item-size" size="small">
                {{workerForm.name}}
            </el-form-item>

            <el-form-item label="年龄" prop="age" class="form-item-size" size="small">
                {{workerForm.age}}
            </el-form-item>

            <el-form-item label="出生日期" prop="birthday" class="form-item-size" size="small">
                {{birthdayFormatter}}
            </el-form-item>

            <el-form-item label="电话" prop="phone" class="form-item-size" size="small">
                {{workerForm.phone}}
            </el-form-item>

            <el-form-item label="回访信息" prop="return_msg" class="form-item-size" size="small">
                {{workerForm.return_msg}}
            </el-form-item>

            <el-form-item label="接单状态" prop="working_status" class="form-item-size" size="small">
                <select-tag-component :isEdit="false" :propTagList="workerConfigList.working_status" v-model="workerForm.working_status" :isSingle="true"></select-tag-component>
            </el-form-item>

            <el-form-item label="备注（商家情况）" prop="remarks" class="form-item-size" size="small">
                {{workerForm.remarks}}
            </el-form-item>

            <el-form-item label="职业类型" prop="skill" class="form-item-size" size="small">
                <select-tag-component :isEdit="false" :propTagList="workerConfigList.service_category" v-model="workerForm.skill" :isSingle="false"></select-tag-component>
            </el-form-item>

            <el-form-item label="服务类型" prop="service_type" class="form-item-size" size="small">
                <select-tag-component :isEdit="false" :propTagList="workerConfigList.service_type" v-model="workerForm.service_type" :isSingle="false"></select-tag-component>
            </el-form-item>

            <el-form-item label="可服务人群" prop="service_crowd" class="form-item-size" size="small">
                <select-tag-component :isEdit="false" :propTagList="workerConfigList.service_crowd" v-model="workerForm.service_crowd" :isSingle="false"></select-tag-component>
            </el-form-item>

            <el-form-item label="工龄" prop="working_age" class="form-item-size" size="small">
                <select-tag-component :isEdit="false" :propTagList="workerConfigList.working_age" v-model="workerForm.working_age" :isSingle="true"></select-tag-component>
            </el-form-item>

            <el-form-item label="工作经验（备注）" prop="working_experience" class="form-item-size" size="small">
                {{workerForm.working_experience}}
            </el-form-item>

            <el-form-item label="民族" prop="nation" class="form-item-size" size="small">
                <select-tag-component :isEdit="false" :propTagList="workerConfigList.nation" v-model="workerForm.nation" :isSingle="true"></select-tag-component>
            </el-form-item>

            <el-form-item label="籍贯" prop="birthplace" class="form-item-size" size="small">
                {{workerForm.birthplace}}
            </el-form-item>

            <el-form-item label="身份证号码" prop="identify" class="form-item-size" size="small">
                {{workerForm.identify}}
            </el-form-item>

            <el-form-item label="证件照" class="form-item-size">
                <div class="picture-box" v-if="id_photo_fileList.length">
                    <div v-for="(item,index) in id_photo_fileList" :key="index" class="avatar-box">
                        <img :src="item.url" class="avatar">
                    </div>
                </div>
            </el-form-item>

            <el-form-item label="地址" prop="address" class="form-item-size" size="small">
                {{workerForm.address}}
            </el-form-item>

            <el-form-item label="区域" prop="region" class="form-item-size" size="small">
                <select-tag-component :isEdit="false" :propTagList="workerConfigList.service_region" v-model="workerForm.region" :isSingle="false"></select-tag-component>
            </el-form-item>

            <el-form-item label="学历" prop="education" class="form-item-size" size="small">
                <select-tag-component :isEdit="false" :propTagList="workerConfigList.education" v-model="workerForm.education" :isSingle="true"></select-tag-component>
            </el-form-item>

            <el-form-item label="紧急联系人电话" prop="urgent_phone" class="form-item-size" size="small">
                {{workerForm.urgent_phone}}
            </el-form-item>

            <el-form-item label="银行卡号" prop="bank_card" class="form-item-size" size="small">
                {{workerForm.bank_card}}
            </el-form-item>

            <el-form-item label="头像" class="form-item-size">
                <div v-if="workerForm.icon!=''" class="avatar-box">
                    <img  :src="workerForm.icon == '' ? '' : `./resource/${workerForm.icon}`" class="avatar">
                </div>
            </el-form-item>

            <el-form-item label="照片" class="form-item-size">
                <div class="picture-box" v-if="photo_fileList.length">
                    <div v-for="(item,index) in photo_fileList" :key="index" class="avatar-box">
                        <img :src="item.url" class="avatar">
                        <div class="avatar-back" v-if="item.isBack" @click="deletePhoto">
                            <i class="el-icon-delete avatar-uploader-icon" style=""></i>
                        </div>
                    </div>
                </div>
            </el-form-item>

            <el-form-item label="参加培训" prop="course" class="form-item-size" size="small">
                <select-tag-component :isEdit="false" :propTagList="workerConfigList.course" v-model="workerForm.course" :isSingle="false"></select-tag-component>
            </el-form-item>

            <el-form-item label="教师评语" prop="teacher_comment" class="form-item-size" size="small">
                {{workerForm.teacher_comment}}
            </el-form-item>

            <el-form-item label="技能证书" prop="certificate" class="form-item-size">
                <paper-component :isEdit="false" v-model="workerForm.certificate" ></paper-component>
            </el-form-item>

            <el-form-item label="技能证书标签" prop="paper" class="form-item-size">
                <select-tag-component :isEdit="false" :propTagList="workerConfigList.paper_category" v-model="workerForm.paper" :isSingle="false"></select-tag-component>
            </el-form-item>

            <el-form-item label="信息来源" prop="source" class="form-item-size" size="small">
                <select-tag-component :isEdit="false" :propTagList="workerConfigList.source" v-model="workerForm.source" :isSingle="true"></select-tag-component>
            </el-form-item>

            <el-form-item label="来源名称" prop="source_name" class="form-item-size" size="small">
                {{workerForm.source_name}}
            </el-form-item>

            <el-form-item label="创建人姓名" prop="manager_name" class="form-item-size" size="small">
                {{workerForm.manager_name}}
            </el-form-item>

            <el-form-item label="性别" prop="sex" class="form-item-size" v-if="workerForm.sex">
                {{workerForm.sex == 1? '男' : '女'}}
            </el-form-item>
        </el-form>
        <div class="control">
            <el-button type="primary" @click="makeImage">生成名片</el-button>
            <el-button @click="goback">返回</el-button>
        </div>
        <!-- 生成服务人员名片组件 -->
        <make-image-component
            :openMakeImageDialog="openMakeImageDialog"
            v-if="openMakeImageDialog"
            @closeMakeImageDialog="openMakeImageDialog = false"
            :openMakeImage="openMakeImage">
        </make-image-component>
    </div>
</template>

<script>

/**
 * type 0 新建  1 编辑
 */
import {operateService, $utils} from '../../../common'

import {
    paperComponent,
    makeImageComponent} from '../operate/staff/workerItem/index.js'

import {
    pictureDetailDialog,
    selectTagComponent} from '@/pages/components'

export default {
    components: {
        paperComponent,
        selectTagComponent,
        makeImageComponent, //创建图片组件
    },
    data() {
        return {
            openMakeImageDialog:false,//是否打开创建图片弹窗
            openMakeImage: {},//创建图片传入的渲染字段
            icon_fileList: [],//头像数组
            photo_fileList: [],//照片数组
            id_photo_fileList: [],//证件照片数组
            //员工信息表单
            workerForm: {
                /************逻辑字段******************/
                id:null,//员工id
                staff_code:null,//员工号
                version:null,//操作版本号
                created_at:null,//创建时间
                type:null,//签约状态
                sex:1,//性别
                /************业务字段******************/
                register_at:null,//登记时间
                updated_at:null,//更新时间
                authentication:0,//认证状态
                name:'',//姓名
                age:null,//年龄
                birthday:null,//出生日期
                phone:'',//电话
                return_msg:'',//回访信息
                working_status:0,//接单状态
                remarks:'',//备注（商家情况）
                skill:[],//职业类型
                service_type:0,//服务类型
                service_crowd:[],//可服务人群
                working_age:0,//工龄
                working_experience:'',//工作经验（备注）
                nation:0,//民族
                birthplace:'',//籍贯
                identify:'',//身份证号码
                id_photo: [],//证件照
                address:'',//地址
                region:[],//服务区域
                education:0,//学历
                urgent_phone:'',//紧急联系人电话
                bank_card:'',//银行卡号
                photo: [],//照片
                icon:'',//头像
                course:[],//参加培训
                teacher_comment:'',//教师评语
                paper:[],//技能证书标签
                certificate: [],//技能证书图片
                source:0,//信息来源
                source_name:'',//来源名称
                manager_id:0,//创建人id
                manager_name:this.$store.state.loginModule.user.username,//创建人姓名
            },
        }
    },
    computed: {
        //服务人员表单配置项
        workerConfigList(){
            return this.$store.state.operateModule.workerConfigForm
        },
        //创建时间字段转换
        created_atFormatter(){
            return $utils.formatDate(new Date(this.workerForm.created_at), 'yyyy-MM-dd')
        },
        //登记时间字段转换
        register_atFormatter(){
            return $utils.formatDate(new Date(this.workerForm.register_at), 'yyyy-MM-dd')
        },
        //更新时间字段转换
        updated_atFormatter(){
            return $utils.formatDate(new Date(this.workerForm.updated_at), 'yyyy-MM-dd')
        },
        //出生日期字段转换
        birthdayFormatter(){
            return $utils.formatDate(new Date(this.workerForm.birthday), 'yyyy-MM-dd')
        },
    },
    methods: {
        /**
         * 返回
         */
        goback(){
            console.log(this.$route.query)
            if(this.$route.query.from == 1){
                debugger
                this.$router.push("/sale/saleWorkerList")
            } else {
                this.$router.push(`/sale/orderConfig?id=${this.$route.query.orderId}`)
            }
            
        },
        /**
         * 生成图片
         */
        makeImage(){
            this.openMakeImageDialog = true
            this.openMakeImage = this.workerForm
            var _workerConfigList = this.workerConfigList;
            var _type = _workerConfigList.service_type.map(val=>{
              let _item = [];
              if(val.isSelected){
                _item.push(val.name)
              }
              return _item
            })
            var _service_category = _workerConfigList.service_category.map(val=>{
            let _item = [];
            if(val.isSelected){
              _item.push(val.name)
            }
            return _item
          })
            var _service_region = _workerConfigList.service_region.map(val=>{
            let _item = [];
            if(val.isSelected){
              _item.push(val.name)
            }
            return _item
          })
            var _paper_category = _workerConfigList.paper_category.map(val=>{
            let _item = [];
            if(val.isSelected){
              _item.push(val.name)
            }
            return _item
          })
           var _working_age_val = _workerConfigList.working_age.map(val=>{
            let _item = [];
            if(val.isSelected){
              _item.push(val.name)
            }
            return _item
          })
           var _education_val = _workerConfigList.education.map(val=>{
            let _item = [];
            if(val.isSelected){
              _item.push(val.name)
            }
            return _item
          })
            this.openMakeImage.type = _type.length?_type.join(' '):'';
            this.openMakeImage.service_category = _service_category.length?_service_category.join(' '):'';
            this.openMakeImage.service_region =_service_region.length? _service_region.join(' '):'';
            this.openMakeImage.paper_category = _paper_category.length?_paper_category.join(' '):'';
            this.openMakeImage.working_age_val = _working_age_val.length?_working_age_val.join(' '):'';
            this.openMakeImage.education_val = _education_val.length?_education_val.join(' '):'';
        },

    },
    async mounted(){
        let _this = this;


        try{
            await store.commit('setLoading',true)
            //如果是编辑则请求接口
            if(this.$route.query.type != 0){
                await operateService.getStaff(this.$route.query.id).then(data =>{
                    if(data.code == "0"){

                        var workerForm = data.data

                        //技能证书
                        workerForm.certificate.forEach((item, index) =>{
                            item.images.forEach((it, index) =>{
                                it.url = './resource/'+it.path
                            })
                        })
                        //技能证书标签
                        workerForm.paper = workerForm.paper.reduce((arr, item, index) =>{
                            return arr.concat(item.paper_category_id)
                        },[])
                        //服务地区
                        workerForm.region = workerForm.region.reduce((arr, item, index) =>{
                            return arr.concat(item.region_id)
                        },[])
                        //可服务人群
                        workerForm.service_crowd = workerForm.service_crowd.reduce((arr, item, index) =>{
                            return arr.concat(item.service_crowd_id)
                        },[])
                        // 职业类型
                        workerForm.skill = workerForm.skill.reduce((arr, item, index) =>{
                            return arr.concat(item.service_category_id)
                        },[])
                        // 参加培训
                        workerForm.course = workerForm.course.reduce((arr, item, index) =>{
                            return arr.concat(item.course_id)
                        },[])
                        // 服务类型
                        workerForm.service_type = workerForm.service_type.reduce((arr, item, index) =>{
                            return arr.concat(item.service_type_id)
                        },[])
                        //头像
                        this.icon_fileList = workerForm.icon == ''? [] : [{
                            url: `./resource/${workerForm.icon}`,
                            name: 'head'
                        }]
                        //照片
                        this.photo_fileList =  workerForm.photo.map((item, index) =>{
                            return {
                                ...item,
                                url: `./resource/${item.path}`,
                                isBack: false,
                            }
                        })
                        //证件照片
                        this.id_photo_fileList =  workerForm.id_photo.map((item, index) =>{
                            return {
                                ...item,
                                url: `./resource/${item.path}`,
                                isBack: false,
                            }
                        })
                        workerForm.id_photo = []
                        this.workerForm = workerForm
                    }
                }).catch(error =>{
                    this.$message({
                        type:'error',
                        message: error.message
                    })
                })
            }
            await operateService.getWorkerFormConfig('edit').then((data) =>{
                if(data.code == '0'){
                    // 将表单配置数据存入 vuex
                    this.$store.commit('setWorkerConfigForm',data.data)
                }
            })

        }catch(error){
            this.$message({
                type:'error',
                message: error.message
            })
        }
    await store.commit('setLoading',false)
    }
}
</script>
<style lang="scss" scoped>
    .staff-box{
        width: 100%;
        padding-top: 30px;
        .staff-form{
            width: 100%;
            margin-bottom: 30px;
            & /deep/ .el-form-item{
                margin-bottom: 15px;
            }
            .form-item-size{
                width: 900px;
                & /deep/ .el-input{
                    min-width: 260px;
                }
                .picture-box{
                    border: 1px dashed #ccc;
                    padding: 0 10px 10px 10px;
                    display: flex;
                    flex-wrap: wrap;
                        .avatar-box{
                            margin: 10px 10px 0 0;
                            width:100px;
                            height: 100px;
                            position: relative;
                            .avatar {
                                width:100px;
                                height: 100px;
                                display: block;
                            }
                            .avatar-back{
                                position: absolute;
                                height: 100px;
                                width: 100px;
                                line-height: 100px;
                                text-align: center;
                                top: 0;
                                z-index: 4;
                                cursor: pointer;
                                background: rgba(0,0,0,.5);
                                .avatar-uploader-icon{
                                    color: #fff;font-size: 20px;
                                }
                            }
                        }
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
        .control{
            // position: fixed;
            height: 60px;
            padding: 10px 0;
            width: 100%;
            // bottom: 0;
            background: rgba(0,0,0,.2);
            // opacity: .1;
            // z-index: 3;
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
