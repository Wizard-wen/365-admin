<template>
    <div class="table-contains">
        <el-table 
            :data="tableData" 
            class="table-list" 
            :header-cell-style="{height: '54px',background: '#fafafa'}">

            <el-table-column type="expand" fixed>
                <template slot-scope="props">
                    <!-- <el-form label-position="right" label-width="150px" inline class="demo-table-expand">
                        <el-form-item label="头像：">
                            <img 
                                v-if="props.row.icon" 
                                :src="props.row.icon?'./resource/'+props.row.icon:''" 
                                alt="" 
                                style="height: 30px;width: 30px;">
                        </el-form-item>
                        <el-form-item  label="回访信息：" prop="return_msg">
                            <p>{{ props.row.return_msg }}</p>
                        </el-form-item>
                        <el-form-item  label="备注：" prop="remarks" >
                            <p>{{ props.row.remarks }}</p>
                        </el-form-item>
                        <el-form-item  label="现住址：" prop="address" >
                            <p>{{ props.row.address }}</p>
                        </el-form-item>
                        <el-form-item  label="身份证号：" prop="identify" >
                            <p>{{ props.row.identify }}</p>
                        </el-form-item>
                        <el-form-item label="紧急联系人：" prop="urgent_phone">
                            <p>{{ props.row.urgent_phone }}</p>
                        </el-form-item>
                        <el-form-item label="民族：" prop="nation">
                            <p>{{ props.row.nation }}</p>
                        </el-form-item>
                        <el-form-item label="教育程度：" prop="education">
                            <p>{{ props.row.education }}</p>
                        </el-form-item>
                        <el-form-item label="创建时间：" prop="created_at">
                            <p>{{ props.row.created_at }}</p>
                        </el-form-item>
                        <el-form-item label="出生日期：" prop="birthday">
                            <p>{{ props.row.birthday }}</p>
                        </el-form-item>
                        <el-form-item label="工龄：" prop="working_age">
                            <p>{{ props.row.working_age }}</p>
                        </el-form-item>
                        <el-form-item label="学历：" prop="education">
                            <p>{{ props.row.education }}</p>
                        </el-form-item>
                        <el-form-item  label="更新时间" prop="updated_at" >
                            <p>{{ props.row.updated_at }}</p>
                        </el-form-item>
                        <el-form-item  label="创建人" prop="manager_name" >
                            <p>{{ props.row.updated_at }}</p>
                        </el-form-item>
                        <el-form-item  label="接单状态" prop="working_status">
                            <p>{{ props.row.working_status }}</p>
                        </el-form-item>
                        <el-form-item >
                            <show-button :currentWorkerItem="props.row"></show-button>
                            <edit-button :currentWorker="props.row"></edit-button>
                            <change-status-button :type="props.row"></change-status-button>
                        </el-form-item>
                    </el-form> -->
                    <table-item-form @updateTable="$emit('updateTable')" :currentWorker="props.row"></table-item-form>
                </template>
            </el-table-column>
            <el-table-column  label="员工号" prop="staff_code" align="center" width="110"></el-table-column>

            <el-table-column  label="姓名" prop="name" align="center"  width="120"></el-table-column>
            
            <el-table-column  label="年龄" prop="age" align="center" width="60"></el-table-column>

            <el-table-column  label="电话" prop="phone" align="center" width="120"></el-table-column>
                
            <el-table-column  label="职业类型" prop="skill_ids" :width="maxLength.skill_ids" align="center">
                <template slot-scope="scope">
                    <table-tag-component 
                    v-if="workerConfigList.service_category" 
                    :propList="workerConfigList.service_category" 
                    :tableOriginData="scope.row.skill_ids"></table-tag-component>
                </template>
            </el-table-column>

            <el-table-column  label="参加培训" prop="course" :width="maxLength.course" align="center">
                <template slot-scope="scope">
                    <table-tag-component 
                        v-if="workerConfigList.course" 
                        :propList="workerConfigList.course" 
                        :tableOriginData="scope.row.course"></table-tag-component>
                </template>
            </el-table-column>

            <el-table-column  label="技能证书" prop="paper_ids" align="center" :width="maxLength.paper_ids">
                <template slot-scope="scope">
                    <table-tag-component 
                        v-if="workerConfigList.paper_category" 
                        :propList="workerConfigList.paper_category" 
                        :tableOriginData="scope.row.paper_ids"></table-tag-component>
                </template>
            </el-table-column>
            
            <el-table-column  label="接单状态" prop="working_status" align="center" :width="maxLength.working_status">
                <template slot-scope="scope">
                    <table-tag-component 
                    v-if="workerConfigList.working_status" 
                    :propList="workerConfigList.working_status" 
                    :tableOriginData="scope.row.working_status"></table-tag-component>
                </template>
            </el-table-column>
        </el-table>
    </div>
    
</template>
<script>
    import {operateService, $utils} from '@common/index.js'
    import {
        iconComponent,
    } from './workerTableComponent/index.js'
    import tableItemForm from './tableItemForm.vue'
    import {
        tableTagComponent
    } from '@/public/components/index.js'
    
    export default {
        components: {
            iconComponent,
            tableTagComponent,
            tableItemForm,
        },
        props: {
            //列表数据
            tableData: {
                type: Array,
                default:function(){return []}
            },
            workerConfigList: {
                type: Object,
                default: function(){return {}}
            },
            //表格最大宽度
            maxLength: {
                type:Object,
                default:function(){
                    return {}
                }
            },
            /**
             * 表格操作栏插槽宽度
             */
            controlScopeLength: {
                default: 0,
                type: Number
            }
        },
        // computed:{
        //     //服务人员配置字段对象
        //     workerConfigList(){
        //         return this.$store.state.operateModule.workerConfigForm
        //     }
        // },
        methods: {
            /**
             * 创建时间字段转换
             */
            created_atFormatter(row, column){
                if(row.created_at == 0){
                    return '0000-00-00'
                }
                return $utils.formatDate(new Date(row.created_at), 'yyyy-MM-dd')
            },
            //登记时间字段转换
            register_atFormatter(row, column){
                if(row.register_at == 0){
                    return '0000-00-00'
                }
                return $utils.formatDate(new Date(row.register_at), 'yyyy-MM-dd')
            },
            //更新时间字段转换
            updated_atFormatter(row, column){
                if(row.updated_at == 0){
                    return '0000-00-00'
                }
                return $utils.formatDate(new Date(row.updated_at), 'yyyy-MM-dd')
            },
            //出生日期字段转换
            birthdayFormatter(row, column){
                if(row.birthday == 0){
                    return ''
                }
                return $utils.formatDate(new Date(row.birthday), 'yyyy-MM-dd')
            },
            //教育背景字段转换
            educationFomatter(row, column){
                let a =  this.$store.state.operateModule.educationList.filter(item => item.id == row.education)
                return a.length? a[0].name : ''
            },
            //计算单元格宽度
            computeStringLength(array, listKey, configKey){
                let string = 0
                if(Array.isArray(array)){
                    array.forEach((it, inds) =>{
                        if(this.workerConfigList[configKey].find(i => i.id == it)){
                            let baseLength = parseInt(this.workerConfigList[configKey].filter(i => i.id == it)[0].name.length *12 )
                            string += (baseLength + 27)
                        }
                    })
                } else {
                    if(this.workerConfigList[configKey].find(i => i.id == array)){
                        string = parseInt(this.workerConfigList[configKey].filter(i => i.id == array)[0].name.length * 12) + 27
                    } else {
                        string = 0
                    }

                }

                if(string > this.maxLength[listKey]){
                    this.maxLength[listKey] = (string + 20) > 80 ? (string + 20) : 80
                }
            },
        },
    }
</script>
<style lang="scss" scoped>
.table-contains{
    background: #fff;
}
            
          
        


</style>
