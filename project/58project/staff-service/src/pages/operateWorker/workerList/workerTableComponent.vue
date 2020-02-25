<template>
    <div class="table-box">
        <!-- 模糊搜索插槽 -->
        <slot name="searchList"></slot>

        <div class="right-contains">

            <!-- 快速操作栏 -->
            <div class="searched-form">
                <slot name="searchedForm"></slot>
            </div>
            
            
            <el-table 
                :data="tableData" 
                class="table-list" 
                :stripe="true" 
                border 
                :fit="true"
                row-key="1233444"
                :header-cell-style="{height: '30px',padding: '0px',fontSize:'12px'}"
                :cell-style="{height: '30px',padding: 0,fontSize:'12px',}">

                <el-table-column  label="员工号" prop="staff_code" align="center" width="110"></el-table-column>

                <el-table-column  label="创建时间" prop="created_at" align="center" :formatter="created_atFormatter" width="110"></el-table-column>

                <el-table-column  label="更新时间" prop="updated_at" :formatter="updated_atFormatter" align="center" width="110"></el-table-column>
                
                <!-- <el-table-column  label="认证状态" prop="authentication" align="center" :width="maxLength.authentication">
                    <template slot-scope="scope">
                        <table-tag-component 
                        v-if="workerConfigList.authentication" 
                        :propList="workerConfigList.authentication" 
                        :tableOriginData="scope.row.authentication"></table-tag-component>
                    </template>
                </el-table-column> -->
                
                <el-table-column  label="姓名" prop="name" align="center" fixed="left" width="120"></el-table-column>
                
                <el-table-column  label="年龄" prop="age" align="center" width="60"></el-table-column>

                <el-table-column  label="出生日期" prop="birthday" :formatter="birthdayFormatter" align="center" width="110"></el-table-column>
                
                <el-table-column  label="电话" prop="phone" align="center" width="120"></el-table-column>
                
                <el-table-column  label="回访信息" prop="return_msg" align="center" width="150">
                    <template slot-scope="scope">
                        <el-popover trigger="click" placement="top">
                            <p>{{ scope.row.return_msg }}</p>
                            <div slot="reference" >
                                <p style=" overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 129px;">{{ scope.row.return_msg }}</p>
                            </div>
                        </el-popover>
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
                
                <el-table-column  label="备注（商家情况）" prop="remarks" align="center" width="150">
                    <template slot-scope="scope">
                        <el-popover trigger="click" placement="top">
                            <p>{{ scope.row.remarks }}</p>
                            <div slot="reference" >
                                <p style=" overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 129px;">{{ scope.row.remarks }}</p>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column  label="职业类型" prop="skill_ids" :width="maxLength.skill_ids" >
                    <template slot-scope="scope">
                        <table-tag-component 
                        v-if="workerConfigList.service_category" 
                        :propList="workerConfigList.service_category" 
                        :tableOriginData="scope.row.skill_ids"></table-tag-component>
                    </template>
                </el-table-column>
                <!-- <el-table-column  label="服务类型" prop="service_type" align="center" :width="maxLength.service_type">
                    <template slot-scope="scope">
                        <table-tag-component 
                        v-if="workerConfigList.service_type" 
                        :propList="workerConfigList.service_type" 
                        :tableOriginData="scope.row.service_type"></table-tag-component>
                    </template>
                </el-table-column> -->
                <!-- <el-table-column  label="可服务人群" prop="service_crowd" :width="maxLength.service_crowd">
                    <template slot-scope="scope">
                        <table-tag-component 
                        :width="maxLength.service_crowd" 
                        v-if="workerConfigList.service_crowd" 
                        :propList="workerConfigList.service_crowd" 
                        :tableOriginData="scope.row.service_crowd"></table-tag-component>
                    </template>
                </el-table-column> -->
                <el-table-column  label="工龄" prop="working_age" align="center" :width="maxLength.working_age">
                    <template slot-scope="scope">
                        <table-tag-component 
                        v-if="workerConfigList.working_age" 
                        :propList="workerConfigList.working_age" 
                        :tableOriginData="scope.row.working_age"></table-tag-component>
                    </template>
                </el-table-column>
                
                <el-table-column  label="工作经验" prop="working_experience" align="center" width="150">
                    <template slot-scope="scope">
                        <el-popover trigger="click" placement="top">
                            <p>{{ scope.row.working_experience }}</p>
                            <div slot="reference" >
                                <p style=" overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 129px;">{{ scope.row.working_experience }}</p>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>
                
                <el-table-column label="民族" prop="nation" align="center" :width="maxLength.nation">
                    <template slot-scope="scope">
                        <table-tag-component v-if="workerConfigList.nation" :propList="workerConfigList.nation" :tableOriginData="scope.row.nation"></table-tag-component>
                    </template>
                </el-table-column>

                <!-- <el-table-column  label="籍贯" prop="birthplace" align="center" width="150">
                    <template slot-scope="scope">
                        <el-popover trigger="click" placement="top">
                            <p>{{ scope.row.birthplace }}</p>
                            <div slot="reference" >
                                <p style=" overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 129px;">{{ scope.row.birthplace }}</p>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column> -->
                
                <el-table-column  label="身份证号" prop="identify" align="center" width="145"></el-table-column>
                
                <el-table-column  label="地址" prop="address" align="center" width="150">
                    <template slot-scope="scope">
                        <el-popover trigger="click" placement="top">
                            <p>{{ scope.row.address }}</p>
                            <p slot="reference" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 129px;">{{ scope.row.address }}</p>
                        </el-popover>
                    </template>
                </el-table-column>
                
                <!-- <el-table-column  label="服务区域" prop="region_ids" align="center" :width="maxLength.region_ids">
                    <template slot-scope="scope">
                        <table-tag-component v-if="workerConfigList.service_region" :propList="workerConfigList.service_region" :tableOriginData="scope.row.region_ids"></table-tag-component>
                    </template>
                </el-table-column> -->

                <el-table-column  label="学历" prop="education" align="center" :formatter="educationFomatter" width="120">
                    <template slot-scope="scope">
                        <table-tag-component 
                            v-if="workerConfigList.education" 
                            :propList="workerConfigList.education" 
                            :tableOriginData="scope.row.education"></table-tag-component>
                    </template>
                </el-table-column>

                <el-table-column  label="紧急联系人电话" prop="urgent_phone" align="center" width="150">
                    <template slot-scope="scope">
                        <el-popover trigger="click" placement="top">
                            <p>{{ scope.row.urgent_phone }}</p>
                            <p slot="reference" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 129px;">{{ scope.row.urgent_phone }}</p>
                        </el-popover>
                    </template>
                </el-table-column>
                
                <!-- <el-table-column  label="银行卡号" prop="bank_card" align="center" width="150">
                    <template slot-scope="scope">
                        <el-popover trigger="click" placement="top">
                            <p>{{ scope.row.bank_card }}</p>
                            <p slot="reference" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 129px;">{{ scope.row.bank_card }}</p>
                        </el-popover>
                    </template>
                </el-table-column> -->

                <el-table-column  label="头像" prop="icon" align="center">
                    <template slot-scope="scope">
                        <el-popover trigger="click" placement="top">
                            <img :src="scope.row.icon?'./resource/'+scope.row.icon:''" alt="" style="height: 200px; width: 200px;">
                            <div slot="reference" style="height: 30px;width: 30px;margin: 0 auto;">
                                <img v-if="scope.row.icon" :src="scope.row.icon?'./resource/'+scope.row.icon:''" alt="" style="height: 30px;width: 30px;">
                                <p v-else>无</p>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>

                <el-table-column  label="参加培训" prop="course" :width="maxLength.course" align="center">
                    <template slot-scope="scope">
                        <table-tag-component v-if="workerConfigList.course" :propList="workerConfigList.course" :tableOriginData="scope.row.course"></table-tag-component>
                    </template>
                </el-table-column>

                <!-- <el-table-column  label="教师评语" prop="teacher_comment" align="center" width="150">
                    <template slot-scope="scope">
                        <el-popover trigger="click" placement="top">
                            <p>{{ scope.row.teacher_comment }}</p>
                            <p slot="reference" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 129px;">{{ scope.row.teacher_comment }}</p>
                        </el-popover>
                    </template>
                </el-table-column> -->

                <el-table-column  label="技能证书" prop="paper_ids" align="center" :width="maxLength.paper_ids">
                    <template slot-scope="scope">
                        <table-tag-component v-if="workerConfigList.paper_category" :propList="workerConfigList.paper_category" :tableOriginData="scope.row.paper_ids"></table-tag-component>
                    </template>
                </el-table-column>

                <!-- <el-table-column  label="信息来源" prop="source" align="center" :width="maxLength.source">
                    <template slot-scope="scope">
                        <table-tag-component v-if="workerConfigList.source" :propList="workerConfigList.source" :tableOriginData="scope.row.source"></table-tag-component>
                    </template>
                </el-table-column> -->
                
                <!-- <el-table-column  label="来源名称" prop="source_name" align="center" width="150">
                    <template slot-scope="scope">
                        <el-popover trigger="click" placement="top">
                            <p>{{ scope.row.source_name }}</p>
                            <p slot="reference" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 129px;">{{ scope.row.source_name }}</p>
                        </el-popover>
                    </template>
                </el-table-column> -->
                
                <el-table-column  label="创建人" prop="manager_name" align="center" width="100">

                </el-table-column>

                <el-table-column label="操作" align="center" fixed="right" :width="controlScopeLength">
                    <template slot-scope="scope">
                        <slot name="control" v-bind:scoper="scope"></slot>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <div class="pagination-box">
                <slot name="pagination"></slot>
            </div>
        </div>
    </div>
</template>
<script>
    import {operateService, $utils} from '@common/index.js'

    export default {
        props: {
            //列表数据
            tableData: {
                type: Array,
                default:function(){return []}
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
        computed:{
            //服务人员配置字段对象
            workerConfigList(){
                return this.$store.state.operateModule.workerConfigForm
            }
        },
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
//表格
.table-box{
    height: calc(100vh - 50px);
    width:100%;
    display: flex;
    //左侧搜索模块
    .left-search-module{
        width: 200px;
        height: 100%;
        overflow-y: auto;
        background: #fff;
        margin-right: 5px;
        margin-left: 5px;
    }
    .right-contains{
        overflow: auto;
        flex:1;
        // width: 100%;
        width: calc(100% - 180px);
        height: calc(100vh - 50px);
        .searched-form{
            width: 100%;
            display: flex;
            justify-content: space-between;
            .search-tag-list{
                flex: 1;
            }
        }
        .table-list{
            height: calc(100% - 72px);
            width: 100%;
            margin: 0 auto;
        }
        .pagination-box{
            height:32px;
        }
    }
}
            
            
        


</style>
