<template>
    <div class="picture-contains">
        <div class="base">
            <div class="item">
                <div class="label ">姓名</div>:
                <div class="value">{{pictureForm.name}}</div>
            </div>
            <div class="item">
                <div class="label ">性别</div>:
                <div class="value">{{pictureForm.sex == 1?'男': '女'}}</div>
            </div>
            <div class="item">
                <div class="label ">年龄</div>:
                <div class="value">{{pictureForm.age || ''}}</div>
            </div>
            <div class="item">
                <div class="label ">属相</div>:
                <div class="value">{{pictureForm.zodiac_sign | zodiac_signFormat}}</div>
            </div>
            <div class="item">
                <div class="label ">身高</div>:
                <div class="value">{{pictureForm.body_height + 'cm'}}</div>
            </div>
            <div class="item">
                <div class="label ">体重</div>:
                <div class="value">{{pictureForm.body_weight + 'kg'}}</div>
            </div>
            <div class="item">
                <div class="label ">婚姻状况</div>:
                <div class="value">{{pictureForm.is_married==1?'是':'否'}}</div>
            </div>

            <div class="item">
                <div class="label ">学历</div>:
                <div class="value">
                    <span>{{pictureForm.education | educationFormat}}</span>
                </div>
            </div>
            <div class="item item-long-line">
                <div class="label ">现住址</div>:
                <div class="value">{{pictureForm.address}}</div>
            </div>

            <div class="item item-double-line">
                <div class="label ">职业类型</div>:
                <div class="value long">
                    <table-tag-component 
                        v-if="workerConfigForm.skill" 
                        :propList="workerConfigForm.skill" 
                        :tableOriginData="pictureForm.skill"></table-tag-component>
                </div>
            </div>

            
            <!-- <div class="item item-double-line">
                <div class="label ">工作经历</div>:
                <div class="value">{{pictureForm.working_experience || ''}}</div>
            </div> -->
            <div class="item">
                <div class="label ">技能证书</div>:
                <div class="value long">
                    <span v-for="(item, index) in paper" :key="index">{{`${item.name}&nbsp;/&nbsp;`}}</span>
                </div>
            </div>
        </div>
        <div class="icon">
            <img v-if="pictureForm.icon" style="height:140px;width:100px;" :src="'./resource/'+pictureForm.icon" alt="">
            <div v-else class="no-img">暂无头像</div>
        </div>
    </div>
</template>

<script>
import {
    zodiac_signList,
    educationList,

} from '@/pages/operateWorker/workerList/IworkerList.ts'
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
    data(){
        return {
            // zodiac_signList,
            // educationList,
        }
    },
    computed: {
        paper(){
            if(!this.pictureForm.paper_ids.length){
                return []
            }
            if(this.workerConfigForm){
                return this.pictureForm.paper_ids.reduce((arr,item,index) =>{
                    return this.workerConfigForm.paper_category.some(it => it.id == item)? 
                        arr.concat({
                            ...this.workerConfigForm.paper_category.find(it => it.id == item),
                        }) : arr
                },[])
            } else {
                return []
            }
        },
        education(){
            return this.workerConfigForm.education.find(it => it.id == this.pictureForm.education)
        }
    },
    filters: {
        educationFormat(target){
            return educationList.find(item => item.id == target ).name
        },
        zodiac_signFormat(target){
            return zodiac_signList.find(item => item.id == target ).name
        },
        formDate(timestamp){
            return $utils.formatDate(new Date(timestamp), 'yyyy-MM-dd')
        }
    },

    methods: {

    }
}
</script>

<style lang="scss" scoped>
.picture-contains{
    position: relative;
    height: 565px;
    width: 800px;
    background: url(./workerPictureComponent/images/workerImage.png) no-repeat;
    background-size: 800px 565px; 
    padding: 40px 33px 20px 50px;
    .base{
        // height: 200px;
        width: 586px;
        display: flex;
        flex-wrap: wrap;
        -content: space-between;
        .item{
            height: 50px;
            line-height: 50px;
            width: 293px;
            display: flex;
            font-size: 20px;
            font-weight: 400;
            .label{
                width: 100px;
                text-align: right;
            }
            .value{
                margin-left: 10px;
                width: 177px;
                color: #333;
            }
            
        }
        .item-double-line{
            height: 100px;
            line-height: 50px;
            width: 586px;
            display: flex;
            font-size: 20px;
            font-weight: 400;
            .label{
                height: 50px;
                width: 100px;
                text-align: right;
                float: left;
                
            }
            .value{
                color: #333;
                margin-left: 10px;
                width: 470px;
                height: 100px;
            }
        }
        .item-long-line {
            width: 586px;
        }
    }
    .icon{
        position:absolute;
        right:43px;
        top: 85px;
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