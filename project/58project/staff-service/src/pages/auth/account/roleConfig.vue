<template>
    <div class="roleConfig">
        <div 
            v-for="(item, index) in roleList"
            :key="index">
            <p>{{item.name}}</p>
            <el-switch
            v-model="item.ischosen"
            active-color="#13ce66"
            inactive-color="#ff4949"></el-switch>
        </div>
        <div>
            <el-button type="primary" @click="editRole">修改</el-button>
            <el-button @click="goback">返回</el-button>
        </div>
    </div>
</template>
<script>
import {authService} from '../../../../common'
export default {
    data(){
        return {
            roleIds: [], //当前已绑定数组 
            roleList:[], //全部角色信息
        }
    },
    methods: {
        /**
         * 编辑用户角色
         */
        async editRole(){
            await authService.editManagerRole(this.$route.query.id, this.commitIds)
                .then(data =>{
                    if(data.code == '0'){
                        this.$message({
                            type:"success",
                            message: "修改成功"
                        })
                        this.$router.push('/auth/accountList')
                    }
                }).catch(error =>{
                    this.$message({
                        type:'error',
                        message: error.message
                    })
                })
        },
        goback(){
            this.$router.go(-1)
        }
    },
    computed: {
        /**
         * 提交的id数组
         */
        commitIds(){
            let commitIds = []
            this.roleList.forEach((item, index) =>{
                if(item.ischosen){
                    commitIds.push(item.id)
                }
            })
            return commitIds
        }
    },
    async mounted(){
        store.commit('setLoading',true)
        try{
             //获取管理员角色绑定信息
            await authService.getManagerRole(this.$route.query.id)
                .then(data =>{
                    console.log(data)
                    let roleIds = data.data.roleIds; //当前已具备角色
                    
                    this.roleList = data.data.roleList.reduce((arr, item, index) =>{
                        let chosenObj = {
                            ischosen: false
                        }
                        if(roleIds.includes(item.id)){
                            chosenObj.ischosen = true
                        }

                        return arr = [...arr, {
                            ...item,
                            ...chosenObj
                        }]
                    },[])
                    console.log(this.roleList)
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
