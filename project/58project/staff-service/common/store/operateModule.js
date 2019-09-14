


import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
/**
 * 订单申请状态
 */
export const order_apply_type = [
    {name: '待处理',id: 1},
    {name: '已拒绝',id: 2},
    {name: '已通过',id: 3},
]
/**
 * 订单状态
 */
export const order_status = [
    {name: '匹配中',id: 1},
    {name: '已签约',id: 2},
    {name: '售后匹配中',id: 3},
    {name: '已终止',id: 4},
]
/**
 * 创建于
 */
export const created_at = [
    {id: 1, name: "今天"}, 
    {id: 2, name: "昨天"}, 
    {id: 3, name: "过去7天"}, 
    {id: 4, name: "过去30天"}, 
    {id: 5, name: "本周"}, 
    {id: 6, name: "上周"}, 
    {id: 7, name: "上个月"}, 
    {id: 8, name: "本季度"}, 
    {id: 9, name: "今年"}, 
    {id: 10, name: "去年"}, 
]
export const operateModule = {
    mutations:{
        //设置服务人员搜索配置字段
        setWorkerConfigForm(state, workerConfigForm){
            state.workerConfigForm = workerConfigForm
        },
        //设置订单申请相关搜索配置字段
        setOrderApplyConfigForm(state, orderApplyFormConfig){
            state.orderApplyFormConfig.apply_manager_id = orderApplyFormConfig.apply_manager_id
            state.orderApplyFormConfig.created_manager_id = orderApplyFormConfig.apply_manager_id
            state.orderApplyFormConfig.apply_store_id = orderApplyFormConfig.apply_store_id
        },
        //设置订单相关搜索接口
        setOrderConfigForm(state,orderFormConfig){
            state.orderFormConfig = orderFormConfig
        },
        /** 
         * 列表查询函数公共键值说明
         * @param queryKey queryList 键名 
         * @param queryedList 键值，可能是数组，也可能是字符串
         */
        //设置全部服务人员查询字段
        setWorkerList(state,payload){
            state.workerList[payload.queryKey] = payload.queryedList
        },
        //设置回访服务人员查询字段
        setReturnList(state,payload){
            state.returnWorkerList[payload.queryKey] = payload.queryedList
        },
        //设置申请新服务人员查询字段
       setNewWorkerList(state,payload){
            state.newWorkerList[payload.queryKey] = payload.queryedList
        },
        //设置异常服务人员查询字段
        setErrorWorkerList(state,payload){
            state.errorWorkerList[payload.queryKey] = payload.queryedList
        },
        //设置订单申请列表查询字段
        setOrderApplyList(state,payload){
            state.orderApplyList[payload.queryKey] = payload.queryedList
        },
    },
    state: {
        //服务人员相关列表配置
        workerConfigForm: {

        },
        //订单申请相关列表筛选配置项
        orderApplyFormConfig: {
            type: order_apply_type,//订单申请状态
            created_at,//创建时间
            apply_manager_id: [],//订单来源人
            created_manager_id: [],//订单申请创建人
            apply_store_id: [],//订单来源门店
            
        },
        //订单相关列表筛选
        orderFormConfig: {
            order_status,//订单状态
        },
        // 回访服务人员查询
        returnWorkerList: {
            get_for: 'return',//查询原因
            page: 1, //请求页码
            pageNumber: 20,//单页信息数量
            name: '',
            phone: '',
        },
        // 审核新服务人员查询
        newWorkerList: {
            get_for: 'apply',//查询原因
            page: 1, //请求页码
            pageNumber: 20,//单页信息数量
            name: '',
            phone: '',
        },
        // 异常服务人员查询
        errorWorkerList: {
            get_for: 'warning',//查询原因
            page: 1, //请求页码
            pageNumber: 20,//单页信息数量
            name: '',
            phone: '',
        },
        //全部服务人员查询字段 
        workerList: {
            /*********************表格字段查询******************************/
            get_for: 'total',//查询原因
            page: 1, //请求页码
            pageNumber: 20,//单页信息数量

            /*********************逻辑字段查询*****************************/
            
            // staff_code: '',//员工号
            // sex: '',//性别
            // created_at: '', //创建时间
            count: 0,//添加回访人员数量

            /*********************业务字段查询*****************************/
            
            // register_at:'',//登记时间
            // updated_at:'',更新时间
            authentication: [],//认证状态
            name: '', //姓名
            // age: null,//年龄--按年龄段搜索
            phone: '',//电话
            return_msg: '',//回访信息
            working_status: [],//接单状态 ------
            remarks: '',//备注（商家情况）
            service_category: [],//职业类型
            service_type: [],//服务类型
            service_crowd: [],//可服务人群
            working_age: [],//工龄
            working_experience: '',//工作经验
            nation: [],//民族
            birthplace: '',//籍贯
            identify: '',//身份证号
            address: '',//地址
            service_region: [],//服务地区
            education: [],//教育程度
            urgent_phone: '',//紧急联系人电话
            bank_card: '',//银行卡号
            course: [],//参加培训
            teacher_comment:'',//教师评语
            paper_category: [],//证书标签
            source: [],//信息来源
            manager: [],//创建人
            updated_type: [],//更新时间
        },
        //订单申请查询字段
        orderApplyList: {
            page: 1, //请求页码
            pageNumber: 20,//单页信息数量
            type: [],//订单申请类型
            apply_manager_id:[],//来源人id
            apply_store_id: [],//来源门店id
            apply_code: '',//订单申请编号
            created_manager_id: [],//申请创建人id
            user_phone: '',//客户电话
            user_name: '',//客户姓名
            created_at: [],//创建时间
        }
    },
}

