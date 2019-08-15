<template>
    <div class="list-table">
        <!-- 模糊搜索插槽 -->
        <slot name="searchList"></slot>

        <div class="table-list">
            <div class="search-form">
                <slot name="searchForm"></slot>
            </div>  
            <el-table 
                :data="staffTable" 
                class="staff-table" 
                :stripe="true" 
                border 
                :fit="true"
                height="calc(100vh-90px)"
                row-key="1233444"
                :header-cell-style="{height: '30px',padding: '0px',fontSize:'12px'}"
                :cell-style="{height: '30px',padding: 0,fontSize:'12px',}">

                <el-table-column  label="员工号" prop="staff_code" align="center" width="110"></el-table-column>

                <!-- <el-table-column  label="性别" prop="sex" align="center" width="70">
                    <template slot-scope="scope">
                        <el-tag class="tag-style" size="medium">{{ scope.row.sex == 1?'男':'女' }}</el-tag>
                    </template>
                </el-table-column> -->

                <!-- <el-table-column  label="是否启用" prop="type" align="center" width="100">
                    <template slot-scope="scope">
                        <el-tag class="tag-style" size="medium">{{ scope.row.sex == 'enable'?'停用':'启用' }}</el-tag>
                    </template>
                </el-table-column> -->

                <el-table-column  label="创建时间" prop="created_at" align="center" :formatter="created_atFormatter" width="110"></el-table-column>

                <!-- <el-table-column  label="登记时间" prop="register_at" :formatter="register_atFormatter" align="center" width="110"></el-table-column> -->

                <el-table-column  label="更新时间" prop="updated_at" :formatter="updated_atFormatter" align="center" width="110"></el-table-column>
                
                <el-table-column  label="认证状态" prop="authentication" align="center" :width="maxLength.authentication">
                    <template slot-scope="scope">
                        <table-tag-component 
                        v-if="workerConfigList.authentication" 
                        :propList="workerConfigList.authentication" 
                        :tableOriginData="scope.row.authentication"></table-tag-component>
                    </template>
                </el-table-column>
                
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
                <el-table-column  label="服务类型" prop="service_type_ids" align="center" :width="maxLength.service_type_ids">
                    <template slot-scope="scope">
                        <table-tag-component 
                        v-if="workerConfigList.service_type" 
                        :propList="workerConfigList.service_type" 
                        :tableOriginData="scope.row.service_type_ids"></table-tag-component>
                    </template>
                </el-table-column>
                <el-table-column  label="可服务人群" prop="service_crowd_ids" :width="maxLength.service_crowd_ids">
                    <template slot-scope="scope">
                        <table-tag-component 
                        :width="maxLength.service_crowd_ids" 
                        v-if="workerConfigList.service_crowd" 
                        :propList="workerConfigList.service_crowd" 
                        :tableOriginData="scope.row.service_crowd_ids"></table-tag-component>
                    </template>
                </el-table-column>
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

                <el-table-column  label="籍贯" prop="birthplace" align="center" width="150">
                    <template slot-scope="scope">
                        <el-popover trigger="click" placement="top">
                            <p>{{ scope.row.birthplace }}</p>
                            <div slot="reference" >
                                <p style=" overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 129px;">{{ scope.row.birthplace }}</p>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>
                
                <el-table-column  label="身份证号" prop="identify" align="center" width="145"></el-table-column>
                
                <el-table-column  label="地址" prop="address" align="center" width="150">
                    <template slot-scope="scope">
                        <el-popover trigger="click" placement="top">
                            <p>{{ scope.row.address }}</p>
                            <p slot="reference" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 129px;">{{ scope.row.address }}</p>
                        </el-popover>
                    </template>
                </el-table-column>
                
                <el-table-column  label="服务区域" prop="region_ids" align="center" :width="maxLength.region_ids">
                    <template slot-scope="scope">
                        <table-tag-component v-if="workerConfigList.service_region" :propList="workerConfigList.service_region" :tableOriginData="scope.row.region_ids"></table-tag-component>
                    </template>
                </el-table-column>

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
                
                <el-table-column  label="银行卡号" prop="bank_card" align="center" width="150">
                    <template slot-scope="scope">
                        <el-popover trigger="click" placement="top">
                            <p>{{ scope.row.bank_card }}</p>
                            <p slot="reference" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 129px;">{{ scope.row.bank_card }}</p>
                        </el-popover>
                    </template>
                </el-table-column>

                <el-table-column  label="头像" prop="icon" align="center">
                    <template slot-scope="scope">
                        <el-popover trigger="click" placement="top">
                            <img :src="scope.row.icon?'./resource/'+scope.row.icon:''" alt="" style="height: 200px; width: 200px;">
                            <div slot="reference" style="height: 30px;width: 30px;margin: 0 auto;">
                                <img :src="scope.row.icon?'./resource/'+scope.row.icon:''" alt="" style="height: 30px;width: 30px;">
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>

                <el-table-column  label="参加培训" prop="course_ids" :width="maxLength.course_ids" align="center">
                    <template slot-scope="scope">
                        <table-tag-component v-if="workerConfigList.course" :propList="workerConfigList.course" :tableOriginData="scope.row.course_ids"></table-tag-component>
                    </template>
                </el-table-column>

                <el-table-column  label="教师评语" prop="teacher_comment" align="center" width="150">
                    <template slot-scope="scope">
                        <el-popover trigger="click" placement="top">
                            <p>{{ scope.row.teacher_comment }}</p>
                            <p slot="reference" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 129px;">{{ scope.row.teacher_comment }}</p>
                        </el-popover>
                    </template>
                </el-table-column>

                <el-table-column  label="技能证书" prop="paper_ids" align="center" :width="maxLength.paper_ids">
                    <template slot-scope="scope">
                        <table-tag-component v-if="workerConfigList.paper_category" :propList="workerConfigList.paper_category" :tableOriginData="scope.row.paper_ids"></table-tag-component>
                    </template>
                </el-table-column>

                <el-table-column  label="信息来源" prop="source" align="center" :width="maxLength.source">
                    <template slot-scope="scope">
                        <table-tag-component v-if="workerConfigList.source" :propList="workerConfigList.source" :tableOriginData="scope.row.source"></table-tag-component>
                    </template>
                </el-table-column>
                
                <el-table-column  label="来源名称" prop="source_name" align="center" width="150">
                    <template slot-scope="scope">
                        <el-popover trigger="click" placement="top">
                            <p>{{ scope.row.source_name }}</p>
                            <p slot="reference" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 129px;">{{ scope.row.source_name }}</p>
                        </el-popover>
                    </template>
                </el-table-column>
                
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
    import {operateService, $utils} from '../../../../common'
    import {
        tableTagComponent} from '@/pages/components'
    
    export default {
        components: {
            tableTagComponent,
        },
        props: {
            //员工信息列表
            staffTable: {
                type: Array,
                default:function(){return []}
            },
            maxLength: {
                type:Object,
                default:function(){
                    return {
                        authentication: 80, //认证状态
                        working_status: 80,//接单状态
                        skill_ids: 80,// 职业类型
                        service_type_ids: 80,//服务类型
                        service_crowd_ids: 80,//可服务人群
                        working_age: 80,// 工龄
                        nation: 80,// 民族
                        region_ids: 80,//服务地区
                        course_ids: 80,//参加培训
                        paper_ids: 80, //技能证书
                        source: 80,//信息来源
                    }
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
                return this.$store.state.operateModule.configForm
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
            }
        },
    }
</script>
<style lang="scss" scoped>
    .tag-style{
        height:24px;
        line-height: 24px;
    }
    .staff{
        .list-table{
            height: 750px;
            width:100%;
            display: flex;
            .search-list{
                width: 200px;
                height: 100%;
                overflow-y: auto;
                background: #fff;
                margin-right: 5px;
                margin-left: 5px;
            }
            .table-list{
                overflow: auto;
                flex:1;
                width: calc(100% - 180px);
                height: 750px;
                .search-form{
                    height: 40px;
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    .search-tag-list{
                        flex: 1;
                    }
                }
                .staff-table{
                    height: calc(100% - 72px);
                    width: 100%;
                    margin: 0 auto;
                }
                .pagination-box{
                    height:32px;
                }
            }
        }
            
            
        


    }
</style>
