import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

import saleRequest from '../service/request/saleRequest.js'
import { Message } from 'element-ui';

var order_status = [
    {name: '匹配中',id: 1},
    {name: '已签约',id: 2},
    {name: '售后匹配中',id: 3},
    {name: '已终止',id: 4},
]
var order_service_level = [
    {id: 1,name: '自理'},
    {id: 2,name: '不自理'},
]
var order_service_type = [
    {id: 1,name: '全日住家型'},
    {id: 2,name: '日间照料型'},
    {id: 3,name: '计时服务型'},
    {id: 4,name: '其他'},
]
var order_service_contains = [
    {id: 1,name: '普通家务劳动'},
    {id: 2,name: '婴幼儿照护'},
    {id: 3,name: '婴幼儿教育'},
    {id: 4,name: '产妇与新生儿护理'},
    {id: 5,name: '老人照护'},
    {id: 6,name: '病人陪护'},
    {id: 7,name: '计时服务'},
    {id: 8,name: '家庭餐制作'},
    {id: 9,name: '其他'},
]

export const saleModule = {
    state: {
        order: [],//订单基本信息
        order_staff: [],//待匹配服务人员
        order_contract: [], //合同列表
        order_logs: [],//订单日志

        order_status: order_status,//订单状态类型
        order_service_contains:order_service_contains,//订单服务内容
        order_service_level:order_service_level,//订单护理依赖程度
        order_service_type:order_service_type,//订单服务方式
        
        orderConfigForm: {
            ...order_status,
        },
        /**
         *  服务人员信息库 查询字段 
         */
        saleWorkerList: {
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
         * 备选服务人员列表 查询字段
         */
        matchServiceList: {
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
         * 订单列表查询参数
         */
        orderList: {
            page: 1, //请求页码
            pageNumber: 20,//单页信息数量
            order_code: '',//订单编号
            order_user_phone:'',//下单客户电话
            order_user_name: '',//下单客户姓名
            agent_store_id: '',//经纪门店id
            agent_manager_id: '', //经纪人id
            type: '',          //订单状态 
        },
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
        configOrderData(state, data){
            state.order = data.order
            state.order_staff = data.order_staff //候选人员
            state.order_contract = data.order_contract //合同信息
            state.order_logs = data.order_logs //订单日志
        },
        /** 
        * @param queryKey queryList 键名 
        * @param queryedList 键值，可能是数组，也可能是字符串
        */
        saleSetWorkerList(state,payload){
            state.saleWorkerList[payload.queryKey] = payload.queryedList
        },
        /** 
        * @param queryKey queryList 键名 
        * @param queryedList 键值，可能是数组，也可能是字符串
        */
        saleSetMatchSerivceList(state,payload){
            state.matchServiceList[payload.queryKey] = payload.queryedList
        },
        /** 
        * @param queryKey queryList 键名 
        * @param queryedList 键值，可能是数组，也可能是字符串
        */
       saleSetOrderList(state,payload){
            state.orderList[payload.queryKey] = payload.queryedList
        },
        /** */
        /** 
        * @param queryKey queryList 键名 
        * @param queryedList 键值，可能是数组，也可能是字符串
        */
        saleSetContractList(state,payload){
            state.contractList[payload.queryKey] = payload.queryedList
        },
    },
}



