<template>
    <div class="skill-config">
        <el-form class="skill-form" ref="form" :model="skillForm" label-width="120px">
            <el-form-item label="技能名称">
                <el-input v-model="skillForm.name"></el-input>
            </el-form-item>
            <el-form-item label="技能所属层级">
                <el-select v-model="skillForm.parent_id" placeholder="权限父级id">
                    <el-option 
                        v-for="(item, index) in selectionList" 
                        :key="index" 
                        :label="item.names" 
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否启用">
                <el-switch v-model="skillForm.type"></el-switch>
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
            skillForm: {
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
                let type = this.skillForm.type
                
                //判断type的类型，转换为enable字段
                if(type){
                    this.skillForm.type = "enable"
                } else {
                    this.skillForm.type = "disable"
                }
                console.log(this.skillForm)
                // debugger
                await hrService.editCategory(this.skillForm)
                    .then(data =>{
                        debugger
                        if(data.code == '0'){
                            this.$message({
                                type:"success",
                                message: "修改成功"
                            })
                            this.$router.push('/serviceType/skillList')
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
            //id
            let categoryId = this.$route.query.id? this.$route.query.id : '';

            await hrService.getCategory(categoryId)
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
                        if(data.data.category.type == "disable"){
                            obj.type = false
                        } 

                        //混入obj数据
                        this.skillForm = {
                            ...data.data.category,
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

