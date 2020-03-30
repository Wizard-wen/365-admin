<template>
    <div class="picture-contains">
        <div class="base">
            <div class="base-up">
                <div class="item">
                    <div class="label ">姓名</div>:
                    <div class="value">{{pictureForm.name}}</div>
                </div>
                <div class="item">
                    <div class="label ">性别</div>:
                    <div class="value">{{sex}}</div>
                </div>
                <div class="item">
                    <div class="label ">年龄</div>:
                    <div class="value">{{pictureForm.age? `${pictureForm.age}岁`: '不详'}}</div>
                </div>
                <div class="item">
                    <div class="label ">属相</div>:
                    <div class="value">{{zodiac_sign}}</div>
                </div>
                <div class="item">
                    <div class="label ">身高</div>:
                    <div class="value">{{pictureForm.body_height?  `${pictureForm.body_height}cm`: '不详'}}</div>
                </div>
                <div class="item">
                    <div class="label ">体重</div>:
                    <div class="value">{{pictureForm.body_weight?  `${pictureForm.body_weight}kg`:'不详'}}</div>
                </div>
                <div class="item">
                    <div class="label ">婚姻状况</div>:
                    <div class="value">{{is_married}}</div>
                </div>

                <div class="item">
                    <div class="label ">学历</div>:
                    <div class="value">
                        <span>{{education}}</span>
                    </div>
                </div>
            </div>
            <div class="base-down">
                <div class="item">
                    <div class="label">现住址</div>:
                    <div class="value">{{pictureForm.address?pictureForm.address: '不详'}}</div>
                </div>

                <div class="item">
                    <div class="label ">职业类型</div>:
                    <div class="value" v-if="showSkillList.length">
                        <span 
                            v-for="(item, index) in showSkillList"
                            :key="index" >{{`${item.name}&nbsp;&nbsp;&nbsp;&nbsp;`}}</span>
                    </div>
                    <div class="value" v-else>不详</div>
                </div>
                
                <div class="item">
                    <div class="label ">工作经历</div>:
                    <!-- <div class="value">{{pictureForm.working_experience || ''}}</div> -->
                    <div class="value">不详</div>
                </div>
                <div class="item">
                    <div class="label">技能证书</div>:
                    <div class="value" v-if="paper.length">
                        <span v-for="(item, index) in paper" :key="index">{{`${item.name}&nbsp;&nbsp;`}}</span>
                    </div>
                    <div class="value" v-else>不详</div>
                </div>
            </div>
        </div>
        <div class="icon">
            <img v-if="pictureForm.icon" style="height:140px;width:100px;" :src="pictureForm.icon" alt="">
            <div v-else class="no-img">暂无头像</div>
        </div>
    </div>
</template>

<script>
import {
    zodiac_signList,
    educationList,
} from '@/public/module/workerList/IworkerList.ts'
import {publicModuleService} from '@/service/publicModule'
export default {
    props: {
        pictureForm: {
            default: function(){return {}},
            type: Object
        },
        /**
         * 服务人员字段配置
         */
        workerConfigForm:{
            type: Object,
            default(){return {}}
        }
    },
    computed: {
        /**
         * 技能证书
         */
        paper(){
            if(!this.pictureForm.paper.length){
                return []
            }

            if(this.workerConfigForm.paper_category){
                return this.pictureForm.paper.reduce((arr,item,index) =>{
                    return this.workerConfigForm.paper_category.some(it => it.id == item)? 
                        [...arr,{
                            ...this.workerConfigForm.paper_category.find(it => it.id == item),
                        }] : arr
                },[])
            } else {
                return []
            }
        },
        sex(){
            if(this.pictureForm.sex){
                return this.pictureForm.sex == 1?'男': '女'
            } else {
                return '不详'
            }
        },
        /**
         * 教育程度
         */
        education(){
            if(this.pictureForm.education){
                return educationList.find(it => it.id == this.pictureForm.education).name
            } else {
                return '不详'
            }
        },
        /**
         * 属相
         */
        zodiac_sign(){
            if(this.pictureForm.zodiac_sign){
                return zodiac_signList.find(item => item.id == this.pictureForm.zodiac_sign ).name
            } else {
                return '不详'
            }
        },
        /**
         * 职业类型
         */
        showSkillList(){
            let showList = []
            if(this.pictureForm.skill && this.workerConfigForm.skill.length){
                
                var arr = this.changeOriginData(this.pictureForm.skill)
                arr.forEach((item, index) =>{
                    if(this.workerConfigForm.skill.length){
                        let a = this.findTargetId(item,this.workerConfigForm.skill)
                        if(a.hasOwnProperty('id')){
                            showList.push(a)
                        }
                    }
                })
                return showList
            } else {
                return []
            }
            
        },
        /**
         * 婚姻状况
         */
        is_married(){
            if(this.pictureForm.is_married){
                return this.pictureForm.is_married==1?'是':'否'
            } else {
                return '不详'
            }
        }
    },

    methods: {
        changeOriginData(val){
            if(Array.isArray(val)){return val}
            
            if(typeof val == 'number' || typeof val == 'string'){
                return [Number(val)]
            } 
        },
        findTargetId(targetId,arr){
            let targetObject = null;

            function findTagId(arr){
                for(var i = 0; i<arr.length; i++){
                    if(arr[i].id == targetId){
                        targetObject = arr[i]
                    } 
                    if(arr[i].children){
                        findTagId(arr[i].children)
                    }
                }
            }
            findTagId(arr)
            if(targetObject!=null){
                return targetObject
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.picture-contains{
    position: relative;
    height: 424px;
    width: 600px;
    background: url(./workerPictureComponent/images/workerImage.png) no-repeat;
    background-size: 600px 424px; 
    padding:  45px 20px 0 20px;
    .base{
        justify-content: space-between;
        .base-up{
            display: flex;
            flex-wrap: wrap;
            width: 440px;
            .item{
                line-height: 40px;
                width: 50%;
                display: flex;
                font-size: 14px;
                font-weight: 400;
                .label{
                    width: 80px;
                    text-align: right;
                }
                .value{
                    margin-left: 10px;
                    color: #333;
                }
                
            }
        }
        .base-down{
            display: flex;
            flex-wrap: wrap;
            width: 560px;
            .item {
                line-height: 40px;
                width: 100%;
                display: flex;
                font-size: 14px;
                font-weight: 400;
                .label{
                    width: 80px;
                    text-align: right;
                }
                .value{
                    margin-left: 10px;
                    color: #333;
                }
            }
        }
        
    }
    .icon{
        position:absolute;
        right:25px;
        top: 55px;
        height: 140px;
        width: 100px;
        background: rgba(0,0,0,0.3);
        .no-img{
            color: #fff;
            height: 140px;
            width: 100px;
            line-height: 140px;
            font-size: 16px;
            text-align: center;
        }
    }
}
</style>