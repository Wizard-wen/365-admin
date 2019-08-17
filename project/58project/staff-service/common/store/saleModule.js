import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

import saleRequest from '../service/request/saleRequest.js'
import { Message } from 'element-ui';
/**
 * 订单状态类型
 */
var order_status = [
    {
        label: '匹配中',
        value: 1
    },
    {
        label: '已签约',
        value: 2
    },
    {
        label: '售后匹配中',
        value: 3
    },
    {
        label: '已终止',
        value: 4
    },
]

/**
 * 订单来源
 */
var order_source = [
    {
        label: "请选择",
        value: 0
    },
    {
        label: "线上",
        value: 1
    },
    {
        label: "线下",
        value: 2
    },
    {
        label: "渠道",
        value: 3
    },
]


export const saleModule = {
    state: {
        order: [],//订单基本信息
        order_staff: [],//待匹配服务人员
        order_files: [], //合同列表
        order_logs: [],//订单日志

        order_status: order_status,//订单状态类型
        order_source: order_source,//订单来源
        /**
         *  服务人员信息库 查询字段 
         */
        sellerList: {
            /*********************表格字段查询******************************/
            get_for: 'seller',
            page: 1, //请求页码
            pageNumber: 20,//单页信息数量
            /*********************逻辑字段查询*****************************/
            
            // staff_code: '',//员工号
            // sex: '',//性别
            // create_at: '', //创建时间

            /*********************业务字段查询*****************************/
            
            // register_at:'',//登记时间
            // updated_at:'',更新时间
            authentication_ids: [],//认证状态
            name: '', //姓名
            // age: null,//年龄--按年龄段搜索
            phone: '',//电话
            return_msg: '',//回访信息
            working_status_ids: [],//接单状态 ------
            remarks: '',//备注（商家情况）
            service_category_ids: [],//职业类型
            service_type_ids: [],//服务类型
            service_crowd_ids: [],//可服务人群
            working_age_ids: [],//工龄
            working_experience: '',//工作经验
            nation_ids: [],//民族
            birthplace: '',//籍贯
            identify: '',//身份证号
            address: '',//地址
            service_region_ids: [],//服务地区
            education: '',//教育程度
            urgent_phone: '',//紧急联系人电话
            bank_card: '',//银行卡号
            course_ids: [],//参加培训
            teacher_comment:'',//教师评语
            paper_category_ids: [],//证书标签
            source_ids: [],//信息来源
            manager_ids: [],//创建人
            updated_type_ids: [],//更新时间
        }, //全部查询参数
        /**
         *  合同列表 查询字段 
         */
        contractList: {
            /*********************表格字段查询******************************/
            page: 1, //请求页码
            pageNumber: 10,//单页信息数量
            contact_code:'',//合同编号
            created_at:'',//印制时间
            manageDepartment:'',//责任部门
            manager:'',//责任人
            contract_status:'',// 合同状态
            isSign:'',//是否签约
            firstParty:'',//甲方签约人
            firstPartyId:'',//甲方签约人id
            secondParty:'',//乙方签约人
            secondPartyId:'',//乙方签约人id
            signManager:'',// 签约管家
            signManagerId:'',// 签约管家id
            signed_at:'',// 签约时间  
        }, //全部查询参数
    },
    mutations: {
        /**
         * 初始化shuju
         */
        configData(state, data){
            state.order = data.data.order
            state.order_staff = data.data.order_staff //候选人员
            state.order_files = data.data.order_files //合同信息
            state.order_logs = data.data.order_logs //订单日志
        },
        /** 
        * @param queryKey queryList 键名 
        * @param queryedList 键值，可能是数组，也可能是字符串
        */
        setSellerList(state,payload){
            state.sellerList[payload.queryKey] = payload.queryedList
        },
        /** 
        * @param queryKey queryList 键名 
        * @param queryedList 键值，可能是数组，也可能是字符串
        */
        setContractList(state,payload){
            state.sellerList[payload.queryKey] = payload.queryedList
        },
    },
    actions: {
        async setData(context, order_id){
            await saleRequest.getOrder(order_id)
                .then(data =>{
                    context.commit('configData',data)
                })
                .catch(e =>{
                    Message({
                        type:'error',
                        message: e.message
                    })
                })

        }
    }
}



