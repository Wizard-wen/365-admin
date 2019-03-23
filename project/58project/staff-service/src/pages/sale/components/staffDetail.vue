<template>
    <el-dialog 
        title="服务人员详情" 
        :visible.sync="openDetailDialog"
        :show-close="false"
        :close-on-press-escape="false"
        :close-on-click-modal="false">
        <div
            class="base-line"
            :style="{
                width: item.size == 1? '100%' : '50%'}"
            v-for="(item, index) in staffDetailList"
            :key="index">
            <div class="base-word">
                <div class="base-key">{{`${item.key}：`}}</div>
                <div class="base-value">{{item.value}}</div>
            </div>
        </div>
        <div class="base-line base-array-line">
            <div class="base-word" >
                <div class="base-key">地区：</div>
                <div class="base-value">
                    <el-tag v-for="(item, index) in staffDetailForm.region" :key="index">{{item.name}}</el-tag>
                </div>
            </div>
        </div>
        <div class="base-line base-array-line">
            <div class="base-word" >
                <div class="base-key">标签：</div>
                <div class="base-value">
                    <el-tag style="margin-right:10px;" v-for="(item, index) in staffDetailForm.label" :key="index">{{item.name}}</el-tag>
                </div>
            </div>
        </div>
        <div class="base-line base-array-line">
            <div class="base-word" >
                <div class="base-key">技能：</div>
                <div class="base-value">
                    <el-tag v-for="(item, index) in staffDetailForm.skill" :key="index">{{item.name}}</el-tag>
                </div>
            </div>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelDetail">取消</el-button>
            <el-button type="primary"  @click="selectService">备选</el-button>
        </div>
    </el-dialog>
</template>
<script>
import {hrService} from '../../../../common'
import {orderService} from '../../../../common'
export default {
    props: {
        //打开服务人员详情弹框
        openDetailDialog: {
            type: Boolean,
            default: false
        },
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
            orderKeyName: {
                address: "地址",
                age: "年龄",
                name: "姓名",
                identify: "身份证号",
                bank_card: "银行卡号",
                phone: "手机号",
                sex: "性别",
                wechat: "微信",
                
                // region: "地区",
                education: "教育程度",
                // label: "能力标签",
                // paper: "证书",
                // skill: "技能"
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
            staffDetailForm: {}
        }
    },
    methods: {
        //获取字符串长度（汉字算两个字符，字母数字算一个）
        getByteLen(val) {
            var len = 0;
            for (var i = 0; i < val.length; i++) {
                var a = val.charAt(i);
                if (a.match(/[^\x00-\xff]/ig) != null) {//\x00-\xff→GBK双字节编码范围
                    len += 2;
                }
                else {
                    len += 1;
                }
            }
            return len;
        },
        /**
         * 表单数据样式包装
         */
        changeBaseList(baseForm){
            let obj = this.orderKeyName,
            renderArr = [],
            _this = this;
            /**
             * key 为渲染字段的属性名
             * value 为某个属性名的值
             */
            Object.keys(baseForm).forEach((item, index) =>{
                if(obj.hasOwnProperty(item) && (typeof baseForm[item] == "number" || typeof baseForm[item] == "string" )  ){
                    
                    
                    let itemObj = {
                        key: obj[item],
                    }
                    
                    //转换为文字
                    if(item == "sex"){
                        itemObj.value = baseForm[item] == 1? "男" : "女"
                    } else if(item == "education"){
                        let educationList = _this.$store.state.hrModule.educationList
                        let education = educationList.find((it, index) =>{
                            return it.id == baseForm[item]
                        })
                        itemObj.value = education.name
                    } else {
                        itemObj.value= baseForm[item]
                    }

                    renderArr.push(itemObj)
                }

            })
            renderArr = renderArr.map((item, index) =>{

                if(_this.getByteLen(item.value) > 20){
                    return {
                        ...item,
                        size: 1, //长字段，独占一行
                    }
                } else {
                    return {
                        ...item,
                        size: 2,//短字段，占半行
                    }
                }
            })
            if(renderArr.length%2 == 1){
                renderArr.push({
                    key:  "",
                    value: ""
                })
            }
            return renderArr
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
        store.commit('setLoading',true)
        let _this = this
        await hrService.getStaff(this.staffId)
            .then(data =>{
                if(data.code == "0"){

                    _this.staffDetailForm = data.data
                    _this.staffDetailList = _this.changeBaseList(data.data)
                    // store.commit('setLoading',false)
                }
            })
            .catch(e =>{
                this.$message({
                    type:'error',
                    message: e.message
                })
            })
        store.commit('setLoading',false)
    }
}
</script>
<style lang="scss" scoped>

        .base-line{
            float: left;
            display: flex;
            line-height: 40px;
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


