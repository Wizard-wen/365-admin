<template>
    <div class="skill-config">
        <el-form class="skill-form" ref="form" :model="paperConfig" label-width="120px">
                <el-form-item label="技能名称">
                    <el-input v-model="paperConfig.name"></el-input>
                </el-form-item>
                <el-form-item label="技能所属层级">
                    <el-select v-model="paperConfig.parent_id" placeholder="权限父级id">
                        <el-option 
                            v-for="(item, index) in selectionList" 
                            :key="index" 
                            :label="item.titles" 
                            :value="item.id"></el-option>
                    </el-select>
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
        return {
            //权限表单
            paperConfig: {
                id: '',//id
                name: '',//技能名称
                parent_id: '0',//所属层级
                version: '',//所属版本号
            },
            //权限层级下拉列表
            selectionList: []
        }
    },
    methods: {
        /**
         * 提交表单
         * 区分新建和编辑
         */
        async onSubmit() {
            try{
                await authService.editCategory(this.paperConfig)
                    .then(data =>{
                        if(data.code == '0'){
                            this.$message({
                                type:"success",
                                message: "修改成功"
                            })
                            this.$router.push('/auth/authList')
                        }
                    }).catch(error =>{
                        this.$message({
                            type:'error',
                            message: error.message
                        })
                    })
            } catch(e){

            }
        },
        goback(){
            this.$router.push("/serviceType/skillList")
        }
    },
    async mounted(){
        store.commit('setLoading',true)
        try{
            await hrService.getCategory(this.$route.query.id)
                .then(data =>{
                    this.paperConfig = data.data
                }).catch(error =>{
                    this.$message({
                        type:'error',
                        message: error.message
                    })
                })
        }catch(e){

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

