<template>
    <el-card class="box-card">
        <div slot="header" class="card-header">
            <h3>服务人员详情</h3>
            <div class="control">
                <el-button 
                    type="text" 
                    :icon="isShow? 'el-icon-arrow-up' : 'el-icon-arrow-down'" 
                    circle size="small" 
                    @click="changeLogState">{{isShow?`收起`:`展开`}}</el-button>
            </div>
        </div>
        <div v-if="isShow">
            <div
                class="base-line"
                :style="{width: item.size == 2? '100%' : '50%'}"
                v-for="(item, index) in staffDetailList"
                :key="index">
                <div class="base-word" v-if="item.key">
                    <div class="base-key">{{item.key+'：'}}</div>
                    <div class="base-value" v-if="item.value" :style="{color: item.key=='是否已签约'? '#F56C6C' : ''}">{{item.value}}</div>
                    <div class="base-value" style="color: #F56C6C" v-else>暂无数据</div>
                </div>
                <div class="base-word" v-else>
                    <div class="base-key"></div>
                    <div class="base-value"></div>
                </div>
            </div>
            <div class="base-line base-array-line">
                <div class="base-word" >
                    <div class="base-key">地区：</div>
                    <div class="base-value" v-if="staffDetailForm.region.length">
                        <el-tag v-for="(item, index) in staffDetailForm.region" :key="index">{{item.name}}</el-tag>
                    </div>
                    <div v-else style="color: #F56C6C">暂无数据</div>
                </div>
            </div>
            <div class="base-line base-array-line">
                <div class="base-word" >
                    <div class="base-key">标签：</div>
                    <div class="base-value" v-if="staffDetailForm.label.length">
                        <el-tag style="margin-right:10px;" v-for="(item, index) in staffDetailForm.label" :key="index">{{item.name}}</el-tag>
                    </div>
                    <div v-else style="color: #F56C6C">暂无数据</div>
                </div>
            </div>
            <div class="base-line base-array-line">
                <div class="base-word" >
                    <div class="base-key">技能：</div>
                    <div class="base-value" v-if="staffDetailForm.skill.length">
                        <el-tag v-for="(item, index) in staffDetailForm.skill" :key="index">{{item.name}}</el-tag>
                    </div>
                    <div v-else style="color: #F56C6C">暂无数据</div>
                </div>
            </div>
        </div>

    </el-card>  
</template>
<script>
import {hrService} from '../../../../common'
import {orderService, $utils} from '../../../../common'
export default {
    props: {
        staffId: {
            type:Number,
            default: 0,
        }
    },
    data(){
        return{
            /**
             * 字段对应
             */
            staffKeyName: {
                address: "地址",
                age: "年龄",
                name: "姓名",
                identify: "身份证号",
                bank_card: "银行卡号",
                phone: "手机号",
                sex: "性别",
                wechat: "微信",
                education: "教育程度",
                type: "是否已签约",
                staff_code: "员工号"
            },
            /**
             * 服务人员详情数组
             * des 经过包装后的数据
             */
            staffDetailList: [],
            /**
             * 服务人员详情对象
             * des 接口请求后得到的数据
             */
            staffDetailForm: {
                region: [],
                label: [],
                skill: [],
            },
            isShow: false,//是否展示
            sizeLong: 0,
        }
    },
    methods: {
        setList(staffDetail){
            let _this = this,
                formArray = [],//渲染的数组
                sizeLong1 = 0;//所占行数
            
            /**
             * key 为渲染字段的属性名
             * value 为某个属性名的值
             * size 该条信息所占位数
             */
            Object.keys(staffDetail).forEach((item, index) =>{
                if(_this.staffKeyName.hasOwnProperty(item)){
                    
                    let itemObj = {
                            key: _this.staffKeyName[item], //属性名
                            value: staffDetail[item],//属性值
                            size: 1,//该条信息所占位数  1 代表只占半行 2 代表占一行 
                        }, //原始对象
                        realValue = itemObj.value; //包装后的value值
                    
                    //性别转文字
                    if(item == "sex"){
                        realValue = staffDetail[item] == 1? "男" : "女"
                    }

                    //是否已签约转文字
                    if(item == "type"){
                        realValue = staffDetail[item] == 'sign'? "已签约" : "未签约"
                    }

                    //学历转文字
                    if(item == "education"){
                        let educationList = _this.$store.state.hrModule.educationList
                        let education = educationList.find((it, index) =>{
                            return it.id == staffDetail[item]
                        })
                        realValue = education.name
                    } 
                    
                    //判断处理后的值的长度，决定占半行还是一行
                    if($utils.getByteLen(realValue) > 20){
                        itemObj.size = 2 //长字段，独占一行
                    } else {
                        itemObj.size = 1//短字段，占半行
                    }

                    itemObj.value =  realValue //将处理后的value重新赋值

                    formArray.push(itemObj)
                }
            })

            this.sizeLong = 0;


            let sizeNumber = 0;
            for(let i = 0; i<formArray.length; i++){
                sizeNumber += formArray[i].size
                if(i < formArray.length -1){
                    let j = i+1,
                        nextObject = formArray[j]
                    if(sizeNumber%2 == 1 && nextObject.size == 2){
                        this.sizeLong += 2
                        formArray[i].size = 2
                        sizeNumber += 1
                    }
                    this.sizeLong += formArray[i].size
                } else {
                    this.sizeLong += formArray[i].size
                }
            }
            //size总数若为奇数个，添加一个元素占行
            if(this.sizeLong%2 == 1){
                formArray.push({
                    key:  "",
                    value: "",
                    size:1,
                })
                this.sizeLong++;
            }
            
            return formArray
        },
        //改变表单的显示隐藏状态
        changeLogState(){
            this.isShow = !this.isShow
        },
        /**
         * 备选人员
         */
        selectService(){
            this.$emit('sign',this.staffDetailForm)
        },
        cancelDetail(){
            this.$emit('closeDetailDialog')
        }
    },
    async mounted(){
        let _this = this
        
        try{
            await hrService.getStaff(this.staffId).then(data =>{
                if(data.code == "0"){

                    _this.staffDetailForm = data.data
                    _this.staffDetailList = _this.setList(data.data)
                }
            }).catch(e =>{
                this.$message({
                    type:'error',
                    message: e.message
                })
            }).finally(() =>{
            })
        } catch(error){
            this.$message({
                type:'error',
                message: e.message
            })
        }

    }
}
</script>
<style lang="scss" scoped>
    .line-bottom-1px{
        &:after{
            position: absolute;
            content: '';
            display: block;
            height: 1px;
            width: 100%;
            background: #ccc; 
            bottom: 0;
        }
    }
    .box-card{
        margin: 10px 0 10px 10px;
        & /deep/ .el-card__header{
            padding: 0 30px;
        }
        & /deep/ .el-card__body{
            padding: 20px;
        }
        .card-header{
            height:50px;
            width:100%;
            padding-right: 30px;
            display: flex;
            justify-content: space-between;
            & h3{
                line-height: 50px;
            }
            .control{
                padding: 9px 0;
            }
        }
        .service-box{

        }
    }

        .base-line{
            float: left;
            display: flex;
            line-height: 40px;
            height:40px;
            margin-bottom: 0px;
            .base-word{
                display: flex;
                .base-key{
                    width: 120px;
                    padding-right: 10px;
                    text-align: right;
                }
                .base-value{
                    flex: 1;
                }
            }
        }
        .base-array-line{
            width:100%;
        }
</style>


