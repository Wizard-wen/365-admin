<template>
    <el-button size="mini" type="primary" @click="submitStaff" v-if="submitText != ''">{{submitText}}</el-button>
</template>

<script>
export default {
    props: {

    },
    methods: {
        /**
         * 提交信息
         */
        async submitStaff(){
            let type = this.$route.query.type,
                module_type = '';
            if(type == 2){
                module_type = 'return'
            } else if(type == 3){
                module_type = 'warning'
            } else if(type == 4){
                module_type = 'apply'
            }
            let workerFormSend = this.setFormItem()

            try{
                this.is_loading = true
                await operateService.agreeStaffSingle(module_type, 'edit',workerFormSend).then(data =>{
                    if(data.code == '0'){
                        this.$message({
                            type:"success",
                            message: "提交成功"
                        })
                        this.is_loading = false

                        this.goback()
                    }
                }).catch(error =>{
                    this.$message({
                        type:'error',
                        message: error.message
                    })
                }).finally(() =>{
                    this.is_loading = false
                })
            } catch(error){
                this.$message({
                    type:'error',
                    message: error.message
                })
            }
        },
        async agreeStaffSingle(module_type, workerFormSend){
            try{
                this.is_loading = true
                await operateService.agreeStaffSingle(module_type, 'edit',workerFormSend).then(data =>{
                    if(data.code == '0'){
                        this.$message({
                            type:"success",
                            message: "提交成功"
                        })
                        this.is_loading = false

                        this.goback()
                    }
                }).catch(error =>{
                    this.$message({
                        type:'error',
                        message: error.message
                    })
                }).finally(() =>{
                    this.is_loading = false
                })
            } catch(error){
                this.$message({
                    type:'error',
                    message: error.message
                })
            }
        }
    }
}
</script>

<style>

</style>