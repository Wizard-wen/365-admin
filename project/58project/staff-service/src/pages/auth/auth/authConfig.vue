<template>
    <div class="auth-config">
        <el-form class="auth-form" ref="form" :model="authForm" label-width="120px" :rules="authRules">

            <el-form-item label="权限路由" prop="router">
                <el-input v-model="authForm.router" :maxlength="100"></el-input>
            </el-form-item>

            <el-form-item label="权限名字" prop="title">
                <el-input v-model="authForm.title" :maxlength="20"></el-input>
            </el-form-item>

            <el-form-item label="权限描述" prop="description">
                <el-input v-model="authForm.description" :maxlength="20"></el-input>
            </el-form-item>

            <el-form-item label="权限排序顺序" prop="sort_order">
                <el-input-number v-model="authForm.sort_order"></el-input-number>
            </el-form-item>

            <el-form-item label="权限父级id">
                <el-select v-model="authForm.parent_id" placeholder="权限父级id">
                    <el-option v-for="(item, index) in selectionList" :key="index" :label="item.titles" :value="item.id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="是否展示">
                <!-- <el-switch v-model="authForm.is_display"></el-switch> -->
                <select-tag-component
                    :propTagList="is_displayList"
                    v-model="authForm.is_display"
                    :isSingle="true"></select-tag-component>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit('form')">{{$route.query.id? '确认编辑' : '立即创建'}}</el-button>
                <el-button @click="goback">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>

/**
 * type 0 新建  1 编辑
 */
import {authService} from '@common/index.js'
export default {
    data() {
        return {
            //权限表单
            authForm: {
                id: 0,//id
                router: '',//权限路由
                title: '',//权限名字
                description: '',//权限描述
                sort_order: 0,//权限排序顺序
                parent_id: 0,//权限父级id
                is_display: 1,//是否展示，是否在列表中展示 1 显示 2 不显示
            },
            authRules: {
                router: [
                    { required: true, message: '请输入路由地址', trigger: 'blur' },
                ],
                title: [
                    { required: true, message: '请输入权限名', trigger: 'blur' },
                ],
                description: [
                    { required: true, message: '请输入权限描述', trigger: 'blur' },
                ],
            },
            //权限父级id下拉列表
            selectionList: [],
            //是否展示
            is_displayList: [
                {name: '展示', id: 1},
                {name: '不展示', id: 2},
            ]
        }
    },
    methods: {
        /**
         * 提交表单
         * 区分新建和编辑
         */
        async onSubmit(formName) {

            await this.$refs[formName].validate((valid) => {
                if (valid) {
                    authService.editPermission(this.authForm).then(data =>{
                        if(data.code == '0'){
                            this.$message({
                                type:"success",
                                message: data.message
                            })
                            this.$router.push('/auth/authList')
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
        goback(){
            console.log(this.$route.query.fromPage)
            this.$router.push({
                path: "/auth/authList",
                query: {
                    page: this.$route.query.fromPage
                }
            })
        }
    },
    async mounted(){
        store.commit('setLoading',true)
        try{
            await authService.getPermission(this.$route.query.id)
                .then(data =>{
                    if(data.data.method == "add"){

                    } else {
                        //权限表单字段
                        this.authForm = data.data.permission
                    }

                    //下拉菜单列表
                    this.selectionList = data.data.selection

                }).catch(error =>{
                    this.$message({
                        type:'error',
                        mexternal
                    })
                })

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
    .auth-config{
        padding: 30px;
        .auth-form{
            width: 760px;
        }
    }
</style>

