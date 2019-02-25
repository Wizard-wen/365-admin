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
                    @close="handleClose(tag)"
                    closable
                    :type="tag.type">{{tag.region_name}}</el-tag>
                <el-cascader
                    :options="areaList"
                    v-model="region"
                    :props="areaProps"
                    placeholder="请选择服务地区">
                </el-cascader>
                <el-button icon="el-icon-plus" circle @click="addRegion(region)"></el-button>
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
            textObject: {
                name: '/^[\u4e00-\u9fa5]+$/',

            },
            region: [],//地区信息
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


                labels: [],//能力标签
                papers: [],//证书
                skills: [],//技能
            },
            areaList: [],//地区数组
            //地区级联选择字段
            areaProps: {
                label: 'name',
                value: 'code'
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
            
            let obj = {}

            if(this.$route.query.type == 0){
                Object.keys(this.staffForm).forEach((item) =>{
                    if(item != 'id'){
                        obj.item = this.staffForm.item
                    }
                })
            } else {
                obj = {
                    ...this.staffForm
                }
            }

            try{
                await authService.editPermission(obj)
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
         */
        addRegion(region){
            let _this = this
            
            findAreaObj(this.areaList, region)

            function findAreaObj(areaList, region){

                areaList.forEach((item, index) =>{
                    
                    if(item.children){

                        findAreaObj(item.children, region)
                    
                    } else {

                        if(item.code == region[2]){
                            _this.staffForm.region.push(item)
                        }
                    
                    }
                })
            }
            
            
            // 
        },
        /**
         * tag删除一条
         */
        handleClose(tag){
            this.staffForm.region.forEach((item, index) =>{
                if(item.code == tag.code){
                    this.staffForm.region.splice(index, 1)
                }
            })
        },
        goback(){
            this.$router.push("/staff/staffList")
        }
    },
    async mounted(){
        store.commit('setLoading',true)
        try{
            // console.log(await hrService.getPermission(this.$route.query.id))
            await hrService.getStaff(this.$route.query.id)
                    .then(data =>{
                        //权限表单字段
                        this.staffForm = data.data
                    

                    }).catch(error =>{
                        this.$message({
                            type:'error',
                            message: error.message
                        })
                    })

            // debugger
            await hrService.getAreaTree()
                    .then(data =>{
                        console.log(data)
                        this.areaList = data.data
                    })


            await Promise.all([
                 hrService.getPermission(this.$route.query.id),
                 hrService.getAreaTree()
            ]).then(data =>{
                console.log(data)
            })
            
        }catch(e){

        }
        
        store.commit('setLoading',false)
    }
}
</script>

