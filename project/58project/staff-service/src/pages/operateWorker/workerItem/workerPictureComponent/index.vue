<template>
    <div class="picture-contains">
        <div class="base">
            <div class="item">
                <div class="label ">姓名</div>:
                <div class="value">{{pictureForm.name || ''}}</div>
            </div>
            <div class="item">
                <div class="label ">性别</div>:
                <div class="value">{{sex}}</div>
            </div>
            <div class="item">
                <div class="label ">年龄</div>:
                <div class="value">{{pictureForm.age || ''}}</div>
            </div>
            <div class="item">
                <div class="label ">属相</div>:
                <div class="value">-</div>
            </div>
            <div class="item">
                <div class="label ">身高</div>:
                <div class="value">-</div>
            </div>
            <div class="item">
                <div class="label ">体重</div>:
                <div class="value">-</div>
            </div>
            <div class="item">
                <div class="label ">籍贯</div>:
                <div class="value">{{pictureForm.birthplace || ''}}</div>
            </div>

            <div class="item">
                <div class="label ">学历</div>:
                <div class="value">
                    <span>{{education.name}}</span>
                </div>
            </div>
            <div class="item item-long-line">
                <div class="label ">现住址</div>:
                <div class="value">-</div>
            </div>
            <div class="item">
                <div class="label ">服务类别</div>:
                <div class="value">
                    <span v-for="(item, index) in service_type" :key="index">{{`${item.name}&nbsp;/&nbsp;`}}</span>
                </div>
            </div>
            <div class="item">
                <div class="label ">技能证书</div>:
                <div class="value long">
                    <span v-for="(item, index) in paper" :key="index">{{`${item.name}&nbsp;/&nbsp;`}}</span>
                </div>
            </div>
            <div class="item item-double-line">
                <div class="label ">工作经历</div>:
                <div class="value">{{pictureForm.working_experience || ''}}</div>
            </div>
            <div class="item item-double-line">
                <div class="label ">自我评价</div>:
                <div class="value">-</div>
            </div>
        </div>
        <div class="icon">
            <img v-if="pictureForm.icon" style="height:100px;width:100px;" :src="'./resource/'+pictureForm.icon" alt="">
            <div v-else class="no-img">暂无头像</div>
        </div>
    </div>
</template>

<script>
export default {

    data(){
        return {

        }
    },
    computed: {
        //服务人员表单配置项
        workerConfigList(){
            return this.$store.state.operateModule.workerConfigForm
        },
        sex(){
            if(this.pictureForm.sex){
                return this.pictureForm.sex == 1 ? '男' : '女'
            } else {
                return '-'
            }
        },
        paper(){
            if(this.workerConfigList){
                return this.pictureForm.paper.reduce((arr,item,index) =>{
                    return this.workerConfigList.paper_category.some(it => it.id == item)? 
                        arr.concat({
                            ...this.workerConfigList.paper_category.find(it => it.id == item),
                        }) : arr
                },[])
            } else {
                return []
            }
        },
        service_type(){
            if(this.workerConfigList){
                return this.pictureForm.service_type.reduce((arr,item,index) =>{
                    return this.workerConfigList.service_type.some(it => it.id == item)? 
                        arr.concat({
                            ...this.workerConfigList.service_type.find(it => it.id == item),
                        }) : arr
                },[])
            } else {
                return []
            }
        },
        education(){
            return this.workerConfigList.education.find(it => it.id == this.pictureForm.education)
        }
    },
    filters: {

    },
    props: {
        pictureForm: {
            default: function(){return {}},
            type: Object
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
    background: url(./images/workerImage.png) no-repeat;
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
        right:33px;
        top: 65px;
        height: 200px;
        width: 130px;
        background: rgba(0,0,0,0.3);
        .no-img{
            height: 200px;
            width: 130px;
            line-height: 200px;
            font-size: 16px;
            text-align: center;
        }
    }
}
</style>