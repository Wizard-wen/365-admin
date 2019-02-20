<template>
    <div class="staff">
        <div class="container-box">
            <el-form :inline="true" :model="typeSearch" class="staff-form">
                <div >
                    <el-form-item>
                        <el-input v-model="typeSearch.phone" placeholder="请输入员工id或姓名"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="searchType">查询</el-button>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="createType">添加</el-button>
                    </el-form-item>
                </div>
                
                <div>
                    <el-form-item label="订单类型">
                        <el-select v-model="typeSearch.region" placeholder="订单类型">
                            <el-option label="待处理" value="shanghai"></el-option>
                            <el-option label="处理中" value="beijing"></el-option>
                            <el-option label="已完成" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="订单来源">
                        <el-select v-model="typeSearch.origin" placeholder="订单来源">
                            <el-option label="线上" value="shanghai"></el-option>
                            <el-option label="线下" value="beijing"></el-option>
                            <el-option label="渠道" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="搜索途径">
                        <el-select v-model="typeSearch.type" placeholder="搜索途径">
                            <el-option label="按订单号搜索" value="shanghai"></el-option>
                            <el-option label="按手机号搜索" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                
                

            </el-form>
            
            <el-table
                :data="typeTable" 
                class="type-table">
                <el-table-column
                    label="员工id"
                    prop="id"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="姓名"
                    prop="name"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="年龄"
                    prop="age"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="手机号"
                    prop="phone"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="是否添加技能信息"
                    prop="state"
                    align="center">
                </el-table-column>

                <el-table-column
                    label="操作"
                    align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="editType(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" @click="deleteType(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        
    </div>
</template>
<script>
    import hrService from '../../../../common/service/hrService.js'
    export default {
        data() {
            return {
                //技能列表
                typeTable: [],
                //用户列表搜索条件
                typeSearch: {
                    phone: '',
                    region: '',
                    type: '',
                    origin: ''
                }
            }
        },
        methods: {
            /**
             * 查找技能
             */
            searchType(){

            },
            /**
             * 创建新技能
             */
            createType(){
                this.$router.push({
                    path: "/staff/staffItem",
                    query: {
                        type: 0
                    }
                })
            },
            /**
             * 编辑技能信息
             */
            editType(index, row){
                this.$router.push({
                    path: "/staff/staffItem",
                    query: {
                        type: 1, //编辑为1
                        id: row.id
                    }
                })
            },
        },
        async mounted(){

            
            store.commit('setLoading',true)
            try{
                /**
                 * 获取技能信息
                 */
                await hrService.getStaffSkillList()
                    .then(data =>{
                        console.log(data)
                        // this.typeTable = data.data.data
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
    .staff{
        
        
        .container-box{
            padding: 30px;
            .staff-form{
                width:80%;
                min-width:1100px;
                margin: 0 auto;
            }
            .staff-table{
                width: 80%;
                min-width: 1100px;
                margin: 0 auto;
            }
        }
    }
</style>
