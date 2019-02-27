<template>
    <div class="skill-config">
        <el-form class="skill-form" ref="form" :model="abilityForm" label-width="120px">
            <el-form-item label="标签名称">
                <el-input v-model="abilityForm.name"></el-input>
            </el-form-item>
            <el-form-item label="标签所属层级">
                <el-select v-model="abilityForm.parent_id" placeholder="标签父级id">
                    <el-option 
                        v-for="(item, index) in selectionList" 
                        :key="index" 
                        :label="item.names" 
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否启用">
                <el-switch v-model="abilityForm.type"></el-switch>
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
            abilityForm: {
                id: '',//id
                name: '',//技能名称
                parent_id: 0,//所属层级
                version: 0,//所属版本号
                type : true,//
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
                let type = this.abilityForm.type
                
                //判断type的类型，转换为enable字段
                if(type){
                    this.abilityForm.type = "enable"
                } else {
                    this.abilityForm.type = "disable"
                }
                await hrService.editAbility(this.abilityForm)
                    .then(data =>{

                        if(data.code == '0'){
                            this.$message({
                                type:"success",
                                message: "修改成功"
                            })
                            this.$router.push('/serviceType/abilityList')
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
            this.$router.push("/serviceType/abilityList")
        }
    },
    async mounted(){
        store.commit('setLoading',true)
        try{
            //id
            let categoryId = this.$route.query.id? this.$route.query.id : '';

            await hrService.getAbility(categoryId)
                .then(data =>{
                    //若是编辑的话回显数据
                    if(this.$route.query.type == 1){
                        let obj = {
                            type: true
                        }
                        /**
                         *  转换是否启用字段，若字段名为
                         *  enable 启用 
                         *  disable 不启用
                         */ 
                        if(data.data.ability.type == "disable"){
                            obj.type = false
                        } 

                        //混入obj数据
                        this.abilityForm = {
                            ...data.data.ability,
                            ...obj,
                        }
                    }
                    
                    this.selectionList = data.data.selection
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

