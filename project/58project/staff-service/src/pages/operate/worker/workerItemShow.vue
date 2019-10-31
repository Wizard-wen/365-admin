<template>
    <page-edit-component
        v-loading="is_loading"
        :title="workerForm.name">
        <template slot="icon">
            <icon-component
                :iconUrl="workerForm.icon"
                :height="120"
                :width="120"></icon-component>
        </template>
        <template slot="detail">
            <div class="detail-left">
                <div class="detail-left-box">
                    <div class="detail-left-line">创建人：{{workerForm.manager_name}}</div>
                    <div class="detail-left-line">创建时间：{{workerForm.created_at | formDate}}</div>
                    <div class="detail-left-line">更新时间：{{workerForm.updated_at | formDate}}</div>
                </div>
            </div>
        </template>
        <template slot="control">
            <el-button size="mini" type="primary" @click="openMakeImageDialog">生成名片</el-button>
            <el-button size="mini" @click="goback">返回</el-button>
        </template>

        <!-- 生成服务人员名片组件 -->
        <template>
            <make-image-component
                :makeImageDialogVisible="makeImageDialogVisible"
                v-if="makeImageDialogVisible"
                @closeMakeImageDialog="makeImageDialogVisible = false"
                :width="800"
                :height="565">
                <template slot="pictureContains">
                    <worker-picture-component
                        :pictureForm="workerForm"></worker-picture-component>
                </template>
            </make-image-component>
        </template>
        <div class="detail-show-box" slot="form">
            <div class="detail-show-title" >基本信息</div>
            <div class="detail-show-module">
                <div class="detail-item-box line-three-list">
                    <div class="detail-item">
                        <p class="detail-title">姓名: </p>
                        <p class="detail-type-text">{{workerForm.name ? workerForm.name : '-'}}</p>
                    </div>
                </div>
                <div class="detail-item-box line-three-list">
                    <div class="detail-item">
                        <p class="detail-title">年龄: </p>
                        <p class="detail-type-text">{{workerForm.age ? workerForm.age : '-'}}</p>
                    </div>
                </div>
                <div class="detail-item-box line-three-list">
                    <div class="detail-item">
                        <p class="detail-title">电话: </p>
                        <p class="detail-type-text">{{workerForm.phone ? workerForm.phone : '-'}}</p>
                    </div>
                </div>
                <div class="detail-item-box line-three-list">
                    <div class="detail-item">
                        <p class="detail-title">出生日期: </p>
                        <p class="detail-type-text">{{workerForm.birthday | formDate }}</p>
                    </div>
                </div>
                <div class="detail-item-box line-three-list">
                    <div class="detail-item">
                        <p class="detail-title">民族: </p>
                        <select-tag-component
                            v-if="workerForm.nation"
                            :propTagList="workerConfigList.nation"
                            v-model="workerForm.nation"
                            :isSingle="true"
                            :isEdit="false"></select-tag-component>
                        <p class="detail-type-text" v-else>-</p>
                    </div>
                </div>
                <div class="detail-item-box line-three-list">
                    <div class="detail-item">
                        <p class="detail-title">身份证号: </p>
                        <p class="detail-type-text">{{workerForm.identify ? workerForm.identify : '-'}}</p>
                    </div>
                </div>
                <div class="detail-item-box line-three-list">
                    <div class="detail-item">
                        <p class="detail-title">学历: </p>
                        <select-tag-component
                            v-if="workerForm.education"
                            :propTagList="workerConfigList.education"
                            v-model="workerForm.education"
                            :isSingle="true"
                            :isEdit="false"></select-tag-component>
                        <p class="detail-type-text" v-else>-</p>
                    </div>
                </div>
                <div class="detail-item-box line-three-list">
                    <div class="detail-item">
                        <p class="detail-title">工龄: </p>
                        <select-tag-component
                            v-if="workerForm.working_age"
                            :propTagList="workerConfigList.working_age"
                            v-model="workerForm.working_age"
                            :isSingle="true"
                            :isEdit="false"></select-tag-component>
                        <p class="detail-type-text" v-else>-</p>
                    </div>
                </div>
                <div class="detail-item-box line-three-list">
                    <div class="detail-item">
                        <p class="detail-title">籍贯: </p>
                        <p class="detail-type-text">{{workerForm.birthplace ? workerForm.birthplace : '-'}}</p>
                    </div>
                </div>
                <div class="detail-item-box line-three-list">
                    <div class="detail-item">
                        <p class="detail-title">紧急联系人: </p>
                        <p class="detail-type-text">{{workerForm.urgent_phone ? workerForm.urgent_phone : '-'}}</p>
                    </div>
                </div>
                <div class="detail-item-box line-three-list">
                    <div class="detail-item">
                        <p class="detail-title">银行卡号: </p>
                        <p class="detail-type-text">{{workerForm.bank_card ? workerForm.bank_card : '-'}}</p>
                    </div>
                </div>
                <div class="detail-item-box line-three-list">
                    <div class="detail-item">
                        <p class="detail-title">性别: </p>
                        <select-tag-component
                            v-if="workerForm.sex"
                            :propTagList="sexList"
                            v-model="workerForm.sex"
                            :isSingle="true"
                            :isEdit="false"></select-tag-component>
                        <p class="detail-type-text" v-else>-</p>
                    </div>
                </div>
                <div class="detail-item-box line-list">
                    <div class="detail-item">
                        <p class="detail-title">地址: </p>
                        <p class="detail-type-text">{{workerForm.address ? workerForm.address : '-'}}</p>
                    </div>
                </div>
                
                
            </div>
            <div class="detail-show-line"></div>
            <div class="detail-show-title" >业务信息</div>
            <div class="detail-show-module">
                
                <div class="detail-item-box line-three-list">
                    <div class="detail-item">
                        <p class="detail-title">认证状态: </p>
                        <select-tag-component
                            v-if="workerForm.authentication"
                            :propTagList="workerConfigList.authentication"
                            v-model="workerForm.authentication"
                            :isSingle="true"
                            :isEdit="false"></select-tag-component>
                        <p class="detail-type-text" v-else>-</p>
                    </div>
                </div>
                <div class="detail-item-box line-three-list">
                    <div class="detail-item">
                        <p class="detail-title">接单状态: </p>
                        <select-tag-component
                            v-if="workerForm.working_status"
                            :propTagList="workerConfigList.working_status"
                            v-model="workerForm.working_status"
                            :isSingle="true"
                            :isEdit="false"></select-tag-component>
                        <p class="detail-type-text" v-else>-</p>
                    </div>
                </div>
                <div class="detail-item-box line-three-list">
                    <div class="detail-item">
                        <p class="detail-title">服务类型: </p>
                        <select-tag-component
                            v-if="workerForm.service_type"
                            :propTagList="workerConfigList.service_type"
                            v-model="workerForm.service_type"
                            :isSingle="false"
                            :isEdit="false"></select-tag-component>
                        <p class="detail-type-text" v-else>-</p>
                    </div>
                </div>
                <div class="detail-item-box line-list">
                    <div class="detail-item">
                        <p class="detail-title">职业类型: </p>
                        <select-tag-component
                            v-if="workerForm.skill"
                            :propTagList="workerConfigList.service_category"
                            v-model="workerForm.skill"
                            :isSingle="false"
                            :isEdit="false"></select-tag-component>
                        <p class="detail-type-text" v-else>-</p>
                    </div>
                </div>
                <div class="detail-item-box line-list">
                    <div class="detail-item">
                        <p class="detail-title">可服务人群: </p>
                        <select-tag-component
                            v-if="workerForm.service_crowd"
                            :propTagList="workerConfigList.service_crowd"
                            v-model="workerForm.service_crowd"
                            :isSingle="false"
                            :isEdit="false"></select-tag-component>
                        <p class="detail-type-text" v-else>-</p>
                    </div>
                </div>
                <div class="detail-item-box line-list">
                    <div class="detail-item">
                        <p class="detail-title">服务区域: </p>
                        <select-tag-component
                            v-if="workerForm.region"
                            :propTagList="workerConfigList.service_region"
                            v-model="workerForm.region"
                            :isSingle="false"
                            :isEdit="false"></select-tag-component>
                        <p class="detail-type-text" v-else>-</p>
                    </div>
                </div>
                <div class="detail-item-box line-list">
                    <div class="detail-item">
                        <p class="detail-title">参加培训: </p>
                        <select-tag-component
                            v-if="workerForm.course"
                            :propTagList="workerConfigList.course"
                            v-model="workerForm.course"
                            :isSingle="false"
                            :isEdit="false"></select-tag-component>
                        <p class="detail-type-text" v-else>-</p>
                    </div>
                </div>
                <div class="detail-item-box line-list">
                    <div class="detail-item">
                        <p class="detail-title">技能证书标签: </p>
                        <select-tag-component
                            v-if="workerForm.paper"
                            :propTagList="workerConfigList.paper_category"
                            v-model="workerForm.paper"
                            :isSingle="false"
                            :isEdit="false"></select-tag-component>
                        <p class="detail-type-text" v-else>-</p>
                    </div>
                </div>
                <div class="detail-item-box line-list">
                    <div class="detail-item">
                        <p class="detail-title">回访信息: </p>
                        <p class="detail-type-text">{{workerForm.return_msg ? workerForm.return_msg : '-'}}</p>
                    </div>
                </div>
                <div class="detail-item-box line-list">
                    <div class="detail-item">
                        <p class="detail-title">备注（商家情况）: </p>
                        <p class="detail-type-text">{{workerForm.remarks ? workerForm.remarks : '-'}}</p>
                    </div>
                </div>
                <div class="detail-item-box line-list">
                    <div class="detail-item">
                        <p class="detail-title">工作经验（备注）: </p>
                        <p class="detail-type-text">{{workerForm.working_experience ? workerForm.working_experience : '-'}}</p>
                    </div>
                </div>
                <div class="detail-item-box line-list">
                    <div class="detail-item">
                        <p class="detail-title">教师评语: </p>
                        <p class="detail-type-text">{{workerForm.teacher_comment ? workerForm.teacher_comment : '-'}}</p>
                    </div>
                </div>
                <div class="detail-item-box line-list">
                    <div class="detail-item">
                        <p class="detail-title">信息来源: </p>
                        <select-tag-component
                            v-if="workerForm.source"
                            :propTagList="workerConfigList.source"
                            v-model="workerForm.source"
                            :isSingle="true"
                            :isEdit="false"></select-tag-component>
                        <p class="detail-type-text" v-else>-</p>
                    </div>
                </div>
                <div class="detail-item-box line-list">
                    <div class="detail-item">
                        <p class="detail-title">来源名称: </p>
                        <p class="detail-type-text">{{workerForm.source_name ? workerForm.source_name : '-'}}</p>
                    </div>
                </div>
            </div>
            <div class="detail-show-line"></div>
            <div class="detail-show-title" >图片信息</div>
            <div class="detail-show-module">
                <div class="detail-item-box line-list">
                    <div class="detail-item">
                        <p class="detail-title">证件照: </p>
                        <div class="detail-photo-list">
                            <photo-component
                                :pictureUrlArrtibute="'path'"
                                :isEdit="false"
                                v-model="id_photo_fileList"
                                :title="'证件照'"></photo-component>
                        </div>
                    </div>
                </div>
                <div class="detail-item-box line-list">
                    <div class="detail-item">
                        <p class="detail-title">照片: </p>
                        <div class="detail-photo-list">
                            <photo-component
                                :pictureUrlArrtibute="'path'"
                                :isEdit="false"
                                v-model="photo_fileList"
                                :title="'照片'"></photo-component>
                        </div>
                    </div>
                </div>
                <div class="detail-item-box line-list">
                    <div class="detail-item">
                        <p class="detail-title">技能证书: </p>
                        <div class="detail-photo-list">
                            <paper-component 
                                :pictureUrlArrtibute="'path'"
                                :isShow="true"
                                v-model="workerForm.certificate" ></paper-component>
                        </div>
                    </div>
                </div>
            </div>
            <picture-detail-dialog
                :pictureDetailDialogVisible="pictureDetailDialogVisible"
                v-if="pictureDetailDialogVisible"
                :imageUrl="pictureDetailUrl"
                @closePictureDetailDialog="pictureDetailDialogVisible = false"></picture-detail-dialog>
        </div>
    </page-edit-component>
</template>

<script>

/**
 * type 0 新建  1 编辑
 */
import {operateService, $utils} from '../../../../common'

import {
    paperComponent,
    photoComponent,
    workerPictureComponent,
    } from './workerItem/index.js'

import {
    pictureDetailDialog,
    selectTagComponent,
    makeImageComponent,
    pageEditComponent} from '@/pages/components/index.js'

export default {
    components: {
        paperComponent,//证书组件
        photoComponent,//照片组件
        selectTagComponent,//单选、多选框组件
        makeImageComponent, //创建图片组件
        pageEditComponent,
        workerPictureComponent,
        pictureDetailDialog,
    },
    data() {
        return {
            is_loading: false,
            sexList: [{id: 1, name: '男'},{id: 2, name: '女'},],
            //生成名片弹窗显示隐藏
            makeImageDialogVisible:false,//是否打开创建图片弹窗
            //查看图片详情弹窗显示隐藏
            pictureDetailDialogVisible: false,
            //图片详情url
            pictureDetailUrl: '',

            //头像数组
            icon_fileList: [],
            //照片数组
            photo_fileList: [],
            //证件照片数组
            id_photo_fileList: [],
            //员工信息表单
            workerForm: {
                /************逻辑字段******************/
                id:null,//员工id
                staff_code:null,//员工号
                version:null,//操作版本号
                created_at:null,//创建时间
                type:null,//签约状态
                sex:1,//性别
                log: [],//日志
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
                service_type:[],//服务类型
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
                manager_name:'',//创建人姓名
            },
            //图片上传header
            uploadHeader:{
                accessToken: this.$store.state.loginModule.token.access_token
            }
        }
    },
    computed: {
        //服务人员表单配置项
        workerConfigList(){
            return this.$store.state.operateModule.workerConfigForm
        },
    },
    filters: {
        //时间格式转换
        formDate(timestamp){
           return $utils.formatDate(new Date(timestamp), 'yyyy-MM-dd')
        }
    },
    methods: {
        setFormItem(){
            
            //提交前，拷贝出一份数据做字段转换
            let workerFormSend = {
                ...this.workerForm
            }
            workerFormSend.photo = this.photo_fileList
            workerFormSend.id_photo = this.id_photo_fileList
            //字段转换
            workerFormSend.service_crowd = this.setCommitAttr(
                workerFormSend.service_crowd,
                this.workerConfigList.service_crowd,
                'service_crowd_id'
            );

            workerFormSend.region = this.setCommitAttr(
                workerFormSend.region,
                this.workerConfigList.service_region,
                'region_id'
            );

            workerFormSend.skill = this.setCommitAttr(
                workerFormSend.skill,
                this.workerConfigList.service_category,
                'service_category_id'
            );

            workerFormSend.course = this.setCommitAttr(
                workerFormSend.course,
                this.workerConfigList.course,
                'course_id'
            );

            workerFormSend.service_type = this.setCommitAttr(
                workerFormSend.service_type,
                this.workerConfigList.service_type,
                'service_type_id'
            );

            workerFormSend.paper = this.setCommitAttr(
                workerFormSend.paper,
                this.workerConfigList.paper_category,
                'paper_category_id'
            );
            return workerFormSend
        },

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
        /**
         * 返回
         */
        goback(){
            if(this.$route.query.from == 1){
                //从服务人员信息库
                this.$router.push(`/worker/workerList`)
            } else if(this.$route.query.from == 2){
                //从订单配置备选服务人员列表
                this.$router.push({
                    path: `/operate/operateOrderConfig`,
                    query: {
                        order_id: this.$route.query.order_id,
                        order_type:this.$route.query.from,
                    }
                })
            } 
        },
        /**
         * 生成图片
         */
        openMakeImageDialog(){
            this.makeImageDialogVisible = true
        },
        /**
         * 打开图片详情弹窗
         */
        openPictureDetailDialog(item, name){
            this.pictureDetailUrl = `./resource/${item.path}`
            this.pictureDetailDialogVisible = true;
        }
    },
    async mounted(){
        let _this = this;

        try{
            
            this.is_loading = true
            await Promise.all([
                operateService.getStaff(this.$route.query.id),
                operateService.getWorkerFormConfig('edit'),
            ]).then(data =>{
                //转换数据格式
                var workerForm = data[0].data

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
                if(workerForm.birthday == 0){
                    workerForm.birthday = null
                }
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
                this.workerForm = workerForm
                

                // 将表单配置数据存入 vuex
                this.$store.commit('setWorkerConfigForm',data[1].data)

                this.is_loading = false
            }).catch(error =>{
                this.$message({
                    type:'error',
                    message: error.message
                })
                this.is_loading = false
            }).finally(() =>{
                this.is_loading = false
            })
        }catch(error){
            this.$message({
                type:'error',
                message: error.message
            })
            this.is_loading = false
        }
    }
}
</script>
<style lang="scss" scoped>

.detail-left{
    flex:1;
    .detail-left-box{
        display: flex;
        flex-wrap: wrap;
        .detail-left-line{
            width: 50%;
            color: rgba(0,0,0,.65);
            line-height: 20px;
            padding-bottom: 8px;
        }
    }
}
.detail-right{
    min-width: 400px;
    display: flex;
    .right-box{
        height: 80px;
        width: 50%;
        .title{
            color: rgba(0,0,0,.45);
            font-size: 14px;
            line-height: 1.5;
        }
        .value{
            font-size: 20px;
            color: rgba(0,0,0,.85);
            line-height: 1.5;
        }
    }
}


.detail-show-box{
    .detail-show-title{
        width:100%;
        margin-bottom: 20px;
        color: rgba(0,0,0,.85);
        font-weight: 700;
        font-size: 16px;
        line-height: 1.5;
    }
    .detail-show-module{
        width: 100%;
        display: flex;
        flex-wrap:  wrap;
        justify-content: space-between;
        margin-bottom: 32px;
        .detail-item-box {
            .detail-item{
                display: flex;
                margin-bottom: 16px;
                .detail-title{
                    width: 120px;
                    text-align: right;
                    line-height: 30px;
                    margin-right: 20px;
                    color: rgba(0,0,0,.85);
                }
                .detail-type-text{
                    line-height: 30px;
                    color: rgba(0,0,0,.85);
                }
                .detail-photo-list{
                    display: flex;
                    flex-wrap: wrap;
                    .icon-box{
                        height: 150px;
                        margin-right: 20px;
                        .icon-style{
                            height: 150px;
                        }
                    }
                }
            }
        }
        .line-three-list{
            width: 33%;
        }
        .line-two-list{
            width: 50%;
        }
        .line-list{
            width: 100%;
        }
    }
    .detail-show-line{
        display: block;
        clear: both;
        width: 100%;
        min-width: 100%;
        height: 1px;
        margin: 24px 0;
        background: #e8e8e8;
    }
}

</style>
