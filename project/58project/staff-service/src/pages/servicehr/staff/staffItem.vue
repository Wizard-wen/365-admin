<template>
    <div>
        <el-form ref="staffForm" :model="staffForm" :rules="staffRules" label-width="120px">
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

            <el-form-item label="地区" prop="region">
                <el-tag
                v-for="tag in staffForm.region"
                :key="tag.name"
                @close="handleClose(tag,'area')"
                closable
                :type="tag.type">{{tag.name}}</el-tag>
                
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
                v-for="tag in staffForm.label"
                :key="tag.name"
                @close="handleClose(tag, 'label')"
                closable
                :type="tag.type">{{tag.name}}</el-tag>
                
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
                v-for="tag in staffForm.skill"
                :key="tag.name"
                @close="handleClose(tag, 'skill')"
                closable
                :type="tag.type">{{tag.name}}</el-tag>
                
                <el-cascader
                    clearable
                    :options="skillList"
                    v-model="skill"
                    :props="areaProps"
                    placeholder="请选择技能">
                </el-cascader>
                <el-button icon="el-icon-plus" circle @click="addRegion(skill, 'skill')"></el-button>
            </el-form-item>

            <el-form-item label="年龄" prop="age">
                <el-input v-model="staffForm.age" placeholder="请输入年龄"></el-input>
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
                <el-button type="primary" @click="onSubmit">{{$route.query.id? '确认编辑' : '立即创建'}}</el-button>
                <el-button @click="goback">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

/**
 * type 0 新建  1 编辑 
 */
import {hrService} from '../../../../common'
import {hrRequest} from '../../../../common'


export default {
    data() {
        const nameValidate = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入服务人员姓名'));
            } else {
                if (!/^[\u4e00-\u9fa5]+$/.test(value)) {
                    callback(new Error('只能输入汉字'));
                }
                callback();
            }
        }
        const identifyValidate = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入身份证号'));
            } else {
                if (!(value.length == 18)) {
                    callback(new Error('请输入18位有效身份证号'));
                }
                callback();
            }
        }
        
        const phoneValidate = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入手机号'));
            } else {
                if (!(/^1[34578]\d{9}$/.test(value))) {
                    callback(new Error('请输入正确格式的手机号'));
                }
                callback();
            }
        }
        return {
            //员工信息表单
            staffForm: {
                id: '',//员工id

                name: '',//员工姓名
                identify: '',//身份证号
                sex: '',//员工性别
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
            region: [],//地区信息
            areaList: [],//地区数组

            skill: [],//技能级联选择器筛选信息
            skillList: [],//技能级联选择器渲染数组
            
            paper: [],//证书级联选择器筛选信息
            paperList: [],//证书级联选择器渲染数组
            
            label: [],//能力标签级联选择器筛选信息
            labelList: [],//能力标签级联选择器渲染数组
            
            //地区级联选择字段
            areaProps: {
                label: 'name',
                value: 'id'
            },
            //表单验证规则
            staffRules: {
                name: [
                    { validator: nameValidate, trigger: 'blur' }
                ],
                identify: [
                    {validator: identifyValidate, trigger: 'blur'}
                ],
                phone: [
                    {validator: phoneValidate, trigger: 'blur'}
                ],
            },
            /**
             * 受教育程度数组
             */
            educationList: [
                {
                    id : 0,
                    name: "全部"
                },
                {
                    id : 1,
                    name: "博士"
                },
                {
                    id : 2,
                    name: "硕士"
                },
                {
                    id : 3,
                    name: "本科"
                },
                {
                    id : 4,
                    name: "大专"
                },
                {
                    id : 5,
                    name: "中专"
                },
                {
                    id : 6,
                    name: "高中"
                },
                {
                    id : 7,
                    name: "初中"
                },
                {
                    id : 8,
                    name: "小学"
                },
            ]
        }
    },
    methods: {
        /**
         * 提交表单
         * 区分新建和编辑
         */
        async onSubmit() {

            try{
                await hrService.editStaff(this.staffForm)
                    .then(data =>{
                        console.log(data)
                    }).catch(error =>{
                        this.$message({
                            type:'error',
                            message: error.message
                        })
                    })
            } catch(e){

            }
        },
        /**
         * 添加地区
         * @param cascaderData Array 级联选择器选出的三级地区数组
         */
        addRegion(cascaderData, type){

            let _this = this

            var levelArr = [], //级联选择数组
                selectedArr = [],//当前被选中数组
                dangerWord = "";//警告词
            
            //判断类型
            if(type == "area"){
                levelArr = this.areaList
                selectedArr = [..._this.staffForm.region]
                dangerWord = "地区"
            } else if(type == "skill"){
                levelArr = this.skillList
                selectedArr = [..._this.staffForm.skill]
                dangerWord = "技能"
            } else if (type == "label"){
                levelArr = this.labelList
                selectedArr = [..._this.staffForm.label]
                dangerWord = "技能标签"
            }

            //判断是否已经存在这个字段
            let isHave = selectedArr.some((item, index) =>{
                let length = cascaderData.length
                return item.id == cascaderData[length-1]
            })

            if(isHave){
                this.$message({
                    type:'error',
                    message: `当前${dangerWord}已存在，请重新选择`
                })
                return
            }

            findAreaObj(levelArr, cascaderData)

            /**
             * Tag数组添加地区
             * des 地区控件拿到的格式是一个包含三级选项id的数组， [1000, 10001, 10002]
             *  该函数通过最后一级的code值，递归树，找到这个匹配的 区县信息 叶节点选项，并插入tag数组中
             * @param areaList Array  树形地区列表
             * @param region Array 级联选择器选出的三级地区数组
             */
            function findAreaObj(areaList, region){

                areaList.forEach((item, index) =>{
                    
                    if(item.children){

                        findAreaObj(item.children, region)
                    
                    } else {

                        if(item.id == region[region.length-1]){

                            selectedArr = [
                                item,
                                ...selectedArr
                            ]
                        }
                    
                    }
                })
            }
            
            //重新赋值
            if(type == "area"){
                _this.staffForm.region = selectedArr
            } else if(type == "skill"){
                _this.staffForm.skill = selectedArr
            } else if (type == "label"){
                _this.staffForm.label = selectedArr
            }
        },
        /**
         * tag数组删除一条
         */
        handleClose(tag, type){
            if(type == "area"){
                this.staffForm.region.forEach((item, index) =>{
                    if(item.code == tag.code){
                        this.staffForm.region.splice(index, 1)
                    }
                })
            } else if(type == "skill"){
                this.staffForm.skill.forEach((item, index) =>{
                    if(item.code == tag.code){
                        this.staffForm.region.splice(index, 1)
                    }
                })
            } else if (type == "label"){
                this.staffForm.label.forEach((item, index) =>{
                    if(item.code == tag.code){
                        this.staffForm.region.splice(index, 1)
                    }
                })
            }
            
        },
        goback(){
            this.$router.push("/staff/staffList")
        }
    },
    async mounted(){
        store.commit('setLoading',true)
        try{
            let data = await Promise.all([
                hrService.getStaff(this.$route.query.id),
                hrService.getAreaTree(),
                hrService.getSkillTree(), //获取技能树
                // hrService.getPaperSelection(), //获取证书列表
                hrService.getAbilityTree(), //获取能力标签树
            ])
            this.staffForm = data[0].data
            this.areaList = data[1].data
            this.skillList = data[2].data
            // this.paperList = data[2].data
            this.labelList = data[3].data
            
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

