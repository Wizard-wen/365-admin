<template>
    <div class="order-edit">
        <el-form ref="orderForm" :model="orderForm" :rules="orderRules" label-width="120px" class="order-edit-form">

            <el-form-item label="服务类型" prop="skill">
                <el-tag
                @close="handleClose"
                v-if="orderForm.service_category_id"
                closable>{{orderForm.name}}</el-tag>

                <el-cascader
                    v-if="orderForm.service_category_id == ''"
                    clearable
                    :options="skillList"
                    v-model="skill"
                    :props="areaProps"
                    placeholder="请选择技能">
                </el-cascader>
                <el-button
                    icon="el-icon-plus"
                    circle
                    v-if="orderForm.service_category_id == ''"
                    @click="addSkill(skill, 'skill')">
                </el-button>
            </el-form-item>

            <el-form-item label="客户名称" prop="user_name">
                <el-input v-model="orderForm.user_name"></el-input>
            </el-form-item>

            <el-form-item label="客户联系方式" prop="phone">
                <el-input v-model="orderForm.phone"></el-input>
            </el-form-item>

            <el-form-item label="服务地址" class="area-form">
                <el-cascader
                    :options="areaList"
                    v-model="region_id"
                    :props="areaProps"
                    @change="getAreaName"
                    clearable
                    placeholder="省市区">
                </el-cascader>
                <el-input placeholder="详细地址" v-model="region_string"></el-input>
            </el-form-item>
            <p class="address-details">
                <span
                    v-for="(item,index) in regionArea_string"
                    :key="index">{{item}}</span>
                <span>{{region_string}}</span>
            </p>

            <el-form-item label="服务周期">
                <el-date-picker
                    v-model="cycleTime"
                    type="datetimerange"
                    @change="changeCycleTime"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"></el-date-picker>
            </el-form-item>

            <el-form-item label="订单来源" prop="source">
                <el-select v-model="orderForm.source" placeholder="订单来源">
                    <el-option label="全部" value="0"></el-option>
                    <el-option label="线上" value="2"></el-option>
                    <el-option label="线下" value="1"></el-option>
                    <el-option label="渠道" value="3"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="备注信息">
                <el-input type="textarea" v-model="orderForm.remark"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit('orderForm')">立即创建</el-button>
                <el-button @click="goback">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import {hrService} from '../../../common'
import {orderService} from '../../../common'
export default {
    data(){
        const validator = {
            user_name(rule, value, callback){
                if (!value) {
                    callback(new Error('客户名不能为空'));
                } else if (!/^[a-zA-Z\u4e00-\u9fa5]+$/.test(value)){
                    callback(new Error('只能是中、英文及其组合'));
                } else {
                    callback()
                }
            },
            phone(rule, value, callback){
                if (!value) {
                    callback(new Error('手机号不能为空'));
                } else if (!(/^1[34578]\d{9}$/.test(value ))){
                    callback(new Error('请输入正确的手机号'));
                } else {
                    callback()
                }
            },
            service_address(rule, value, callback){
                if (!value) {
                    callback(new Error('服务地址不能为空'));
                } else {
                    callback()
                }
            },
            source(rule, value, callback){
                if (value == '0') {
                    callback(new Error('请选择订单来源'));
                } else {
                    callback()
                }
            },
        }
        return {
            orderRules: {
                user_name: [
                    { validator: validator.user_name, trigger: 'blur' }
                ],
                phone: [
                    { validator: validator.phone, trigger: 'blur' }
                ],
                source: [
                    { validator: validator.source, trigger: 'change' }
                ],
            },
            orderForm: {
                manager_id: this.$store.state.loginModule.user.id, //创建人
                manager_name: this.$store.state.loginModule.user.username, //创建人
                user_name: '',//客户名
                phone: '',//客户手机号
                service_category_id: "",//服务分类id
                name: '',//服务名称
                service_address: '',//服务地址
                service_start_time: '',//服务开始时间
                service_end_time: '',//服务终止时间
                source: '0',//订单来源
                remark: '',//备注信息
            },
            cycleTime: [],//时间周期
            region_id: [], //省市区联动
            areaList: [],//地区数组
            skill: [],//技能级联选择器筛选信息
            skillList: [],//技能级联选择器渲染数组
            regionArea_string: [],//省市区 汉字数组
            region_string: '',//具体的街道信息
            //地区级联选择字段
            areaProps: {
                label: 'name',
                value: 'id'
            },
        }
    },
    methods: {
        async onSubmit(formName) {
            let str = "",
                arr = this.regionArea_string;

            for(let i = 0; i<arr.length; i++){
                str += arr[i]
            }
            this.orderForm.service_address = str + this.region_string

            //校验服务类型
            if(this.orderForm.service_category_id == '' || this.orderForm.name ==''){
                this.$message({
                    type:'error',
                    message: '请选择服务类型'
                })
                return false;
            }

            //校验服务地址
            if(this.orderForm.service_address == '' || this.region_string =='' || arr.length == 0){
                this.$message({
                    type:'error',
                    message: '请填写服务地址'
                })
                return false;
            }

            //校验服务起止时间
            if(this.orderForm.service_start_time == '' || this.orderForm.service_start_time == ''){
                this.$message({
                    type:'error',
                    message: '请选择服务起止时间'
                })
                return false ;
            }
            //校验并提交
            await this.$refs[formName].validate((valid) => {
                if (valid) {
                    orderService.createOrder(this.orderForm)
                    .then(data =>{

                        if(data.code == '0'){
                            this.$message({
                                type:"success",
                                message: "修改成功"
                            })
                            this.$router.push('/sale/orderList')
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
        /**
         * 改变周期时间
         */
        changeCycleTime(param){
            this.orderForm.service_start_time = param[0].getTime()
            this.orderForm.service_end_time = param[1].getTime()
        },
        /**
         * 得到级联选择器的名字
         */
        getAreaName(){
            let num = 0,
                arr = [],
                regionArr = this.region_id;

            function findAreaName(areaList){
                areaList.forEach((item, index) =>{
                    if(item.id == regionArr[num]){
                        arr.push(item.name)
                    }
                })

                areaList.forEach((item, index) =>{
                    if(num < 2 && item.id == regionArr[num]){
                        num++
                        findAreaName(item.children)
                    }
                })
            }

            findAreaName(this.areaList)
            this.regionArea_string = arr;
        },
        /**
         * 给级联选择器添加标签
         * @param cascaderData Array 级联选择器选出的三级地区数组
         * @param type String 当前级联选择器所属表单字段
         */
        addSkill(cascaderData, type){
            if(cascaderData.length == 0){
                this.$message({
                    type:'error',
                    message: `请选择服务类型`
                })
                return
            }

            let _this = this,
                levelArr = this.skillList //级联选择数组

            //向tag数组添加一条数据
            findAreaObj(levelArr, cascaderData)

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
                        if(item.id == region[region.length-1]){
                            _this.orderForm.service_category_id = item.id
                            _this.orderForm.name = item.name
                            _this.skill = []
                        }
                    }
                })
            }
        },
        /**
         * tag数组删除一条
         */
        handleClose(){

            this.orderForm.service_category_id = ""
        },
        /**
         * 返回列表
         */
        goback(){
            this.$router.push('/sale/orderList')
        }
    },
    async mounted(){
        store.commit('setLoading',true)
        try{
            let data = await Promise.all([
                hrService.getAreaTree(), //省市区数据获取
                hrService.getSkillTree('enable'), //获取技能树
            ])
            this.areaList = data[0].data
            this.skillList = data[1].data
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
    .order-edit{
        padding: 30px 0 0 30px;
        .order-edit-form{
            max-width: 750px;
            width: 80%;
            .area-form{
                & /deep/ .el-form-item__content{
                    display: flex;
                    & /deep/ .el-cascader{
                        margin-right: 20px;
                        width: 200px;
                    }
                }
            }
            .address-details{
                line-height: 40px;
                padding-left: 120px;
            }
        }
    }
</style>


