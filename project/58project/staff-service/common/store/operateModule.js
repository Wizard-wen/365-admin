


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
/**
 * 合同状态
 */
export const contract_type = [
    {name: '待执行',id: 1},
    {name: '执行中',id: 2},
    {name: '已终止',id: 3},
]
/**
 * 空合同状态
 */
export const voidContractType = [
    {id: 1, name: '空合同'},
    {id: 2, name: '未签约'},
    {id: 3, name: '已签约'},
]
export const operateModule = {
    mutations:{
        //设置服务人员搜索配置字段
        // setWorkerConfigForm(state, workerConfigForm){
        //     state.workerConfigForm = workerConfigForm
        // },
        /**
         * 初始化运营工作台数据
         */
        configOperateWorkstation(state, data){
            state.operateWorkstation.staff_application = data.staff_application
            state.operateWorkstation.store_order_application = data.store_order_application
            state.operateWorkstation.user_order_application = data.user_order_application

            state.operateWorkstation.return_staff_count = data.return_staff_count
            state.operateWorkstation.staff_count = data.staff_count
            state.operateWorkstation.user_count = data.user_count
        },
        //设置订单申请相关搜索配置字段
        // setOrderApplyConfigForm(state, orderApplyFormConfig){
        //     state.orderApplyFormConfig.apply_manager_id = orderApplyFormConfig.apply_manager_id
        //     state.orderApplyFormConfig.created_manager_id = orderApplyFormConfig.apply_manager_id
        //     state.orderApplyFormConfig.apply_store_id = orderApplyFormConfig.apply_store_id
        // },
        //设置订单相关搜索接口
        // setOrderConfigForm(state,orderFormConfig){
        //     state.orderFormConfig.apply_manager_id = orderFormConfig.apply_manager_id
        //     state.orderFormConfig.apply_store_id = orderFormConfig.apply_store_id
        //     state.orderFormConfig.agent_manager_id = orderFormConfig.apply_manager_id
        //     state.orderFormConfig.agent_store_id = orderFormConfig.apply_store_id
        //     state.orderFormConfig.created_manager_id = orderFormConfig.apply_manager_id
        // },
        //设置空合同搜索相关标签
        setVoidContractConfigForm(state, voidContractConfigForm){
            state.voidContractConfigForm.manager_id = voidContractConfigForm.apply_manager_id
        },
        /**
         * 列表查询函数公共键值说明
         * @param queryKey queryList 键名
         * @param queryedList 键值，可能是数组，也可能是字符串
         */
        //设置全部服务人员查询字段
        // setWorkerList(state,payload){
        //     state.workerList[payload.queryKey] = payload.queryedList
        // },
        //设置回访服务人员查询字段
        // setReturnWorkerList(state,payload){
        //     state.returnWorkerList[payload.queryKey] = payload.queryedList
        // },
        //设置申请新服务人员查询字段
    //    setNewWorkerList(state,payload){
    //         state.newWorkerList[payload.queryKey] = payload.queryedList
    //     },
        //设置异常服务人员查询字段
        // setErrorWorkerList(state,payload){
        //     state.errorWorkerList[payload.queryKey] = payload.queryedList
        // },
        //设置订单申请列表查询字段
        // setOrderApplyList(state,payload){
        //     state.orderApplyList[payload.queryKey] = payload.queryedList
        // },
        //设置订单列表查询字段
        // setOrderList(state,payload){
        //     state.orderList[payload.queryKey] = payload.queryedList
        // },
        //设置合同列表查询字段
        // setContractList(state,payload){
        //     state.contractList[payload.queryKey] = payload.queryedList
        // },
        //设置空合同列表查询字段
        setVoidContractList(state,payload){
            state.voidContractList[payload.queryKey] = payload.queryedList
        },
        //设置合同相关搜索接口
        // setContractConfigForm(state,contractConfigForm){
        //     state.contractConfigForm.sign_manager_id = contractConfigForm.apply_manager_id
        //     state.contractConfigForm.sign_store_id = contractConfigForm.apply_store_id
        // },
        //设置客户端订单申请相关搜索配置字段
        // setClientRequireConfigForm(state, clientRequireConfig){
        //     state.clientRequireConfig.order_apply_type = clientRequireConfig.order_apply_type
        //     state.clientRequireConfig.created_at = clientRequireConfig.created_at
        // },
        //设置客户端订单申请列表查询字段
        // setClientRequire(state,payload){
        //     state.clientRequire[payload.queryKey] = payload.queryedList
        // },
        //设置客户端订单申请列表查询字段
        // setClientList(state,payload){
        //     state.clientList[payload.queryKey] = payload.queryedList
        // },

    },
    state: {
        //服务人员相关列表配置
        // workerConfigForm: {

        // },
        //客户列表相关配置
        // clientConfigForm: {
            
        // },
        //运营工作台
        operateWorkstation: {
            staff_application: [],//新服务人员申请
            store_order_application: [],//门店订单申请
            user_order_application: [],//客户订单申请

            return_staff_count: {},//回访劳动者数量
            staff_count: {},//劳动者数量
            user_count: {},//用户数量
        },
        //订单申请相关列表筛选配置项
        // orderApplyFormConfig: {
        //     type: order_apply_type,//订单申请状态
        //     created_at,//创建时间
        //     apply_manager_id: [],//订单来源人
        //     created_manager_id: [],//订单申请创建人
        //     apply_store_id: [],//订单来源门店
        // },
        //订单相关列表筛选
        // orderFormConfig: {
        //     type: order_status,//订单状态
        //     order_at: created_at,//客户下单时间
        //     apply_manager_id: [],//来源人
        //     apply_store_id: [],//来源门店
        //     created_at: created_at,//订单创建时间
        //     created_manager_id: [],//订单创建人
        //     agent_store_id: [],//订单经纪门店
        //     agent_manager_id: [],//订单经纪人
        // },
        //合同搜索列表筛选
        // contractConfigForm: {
        //     type: contract_type,
        //     sign_at: created_at,//签约时间
        //     sign_manager_id: [],//签约经纪人
        //     sign_store_id: [],//签约经纪门店
        // },
        //空合同搜索列表筛选
        voidContractConfigForm: {
            type: voidContractType,
            created_at: created_at,
            assign_at: created_at,
            manager_id: [],
        },
        // 回访服务人员查询
        // returnWorkerList: {
        //     get_for: 'return',//查询原因
        //     page: 1, //请求页码
        //     pageNumber: 20,//单页信息数量
        //     name: '',
        //     phone: '',
        // },
        // 审核新服务人员查询
        // newWorkerList: {
        //     get_for: 'apply',//查询原因
        //     page: 1, //请求页码
        //     pageNumber: 20,//单页信息数量
        //     name: '',
        //     phone: '',
        // },
        // 异常服务人员查询
        // errorWorkerList: {
        //     get_for: 'warning',//查询原因
        //     page: 1, //请求页码
        //     pageNumber: 20,//单页信息数量
        //     name: '',
        //     phone: '',
        // },
        //全部服务人员查询字段
        // workerList: {
        //     /*********************表格字段查询******************************/
        //     get_for: 'total',//查询原因
        //     page: 1, //请求页码
        //     pageNumber: 20,//单页信息数量

        //     /*********************逻辑字段查询*****************************/

        //     // staff_code: '',//员工号
        //     // sex: '',//性别
        //     // created_at: '', //创建时间
        //     count: 0,//添加回访人员数量

        //     /*********************业务字段查询*****************************/

        //     // register_at:'',//登记时间
        //     // updated_at:'',更新时间
        //     authentication: [],//认证状态
        //     name: '', //姓名
        //     // age: null,//年龄--按年龄段搜索
        //     phone: '',//电话
        //     return_msg: '',//回访信息
        //     working_status: [],//接单状态 ------
        //     remarks: '',//备注（商家情况）
        //     service_category: [],//职业类型
        //     service_type: [],//服务类型
        //     service_crowd: [],//可服务人群
        //     working_age: [],//工龄
        //     working_experience: '',//工作经验
        //     nation: [],//民族
        //     birthplace: '',//籍贯
        //     identify: '',//身份证号
        //     address: '',//地址
        //     service_region: [],//服务地区
        //     education: [],//教育程度
        //     urgent_phone: '',//紧急联系人电话
        //     bank_card: '',//银行卡号
        //     course: [],//参加培训
        //     teacher_comment:'',//教师评语
        //     paper_category: [],//证书标签
        //     source: [],//信息来源
        //     manager: [],//创建人
        //     updated_type: [],//更新时间
        // },
        //订单申请查询字段
        // orderApplyList: {
        //     page: 1, //请求页码
        //     pageNumber: 20,//单页信息数量
            
        //     type: [],//订单申请类型
        //     apply_manager_id:[],//来源人id
        //     apply_store_id: [],//来源门店id
        //     apply_code: '',//订单申请编号
        //     created_manager_id: [],//申请创建人id
        //     user_phone: '',//客户电话
        //     user_name: '',//客户姓名
        //     created_at: [],//创建时间
        // },
        /**
         * 订单列表查询参数
         */
        // orderList: {
        //     page: 1, //请求页码
        //     pageNumber: 20,//单页信息数量
        //     order_code: '',//订单编号
        //     type: [],//订单状态
        //     order_at: [],//客户下单时间
        //     order_user_phone:'',//下单客户电话
        //     order_user_name: '',//下单客户姓名
        //     apply_store_id: [],//来源门店
        //     apply_manager_id: [],//来源人
        //     sign_user_name: '',//签约客户名
        //     sign_user_phone: '',//签约客户电话
        //     sign_staff_name: '',//签约服务人员姓名
        //     sign_staff_code: '',//签约服务人员编号
        //     sign_staff_phone: '',//签约服务人员电话
        //     created_at: [],//订单创建时间
        //     created_manager_id: [],//订单创建人
        //     agent_store_id: [],//经纪门店id
        //     agent_manager_id: [], //经纪人id
        // },
        /**
         *  合同列表查询字段
        //  */
        // contractList: {
        //     /*********************表格字段查询******************************/
        //     page: 1, //请求页码
        //     pageNumber: 10,//单页信息数量
        //     contract_code:'',//合同流水号
        //     contract_number:'',//合同编号


        //     type: [],//合同状态
        //     sign_at: [],//签约时间
        //     sign_manager_id: [],//签约经纪人
        //     sign_store_id: [],//签约经纪门店

        //     sign_user_name: '',//雇主
        //     sign_user_phone:'',//雇主电话

        //     sign_staff_name:'',//签约家政服务员
        //     sign_staff_code: '',//签约家政服务员员工号
        // }, //全部查询参数
        /**
         * 空合同查询字段
         */
        voidContractList: {
            page: 1, //请求页码
            pageNumber: 20,//单页信息数量
            contract_number:'',//空合同编号（筛选）
            created_at: [],//空合同创建时间（筛选）
            assign_at:[],//分派时间（筛选）
            type:[],//是否已经签约（筛选）
            manager_id:[],//经纪人id
        },
        //客户端订单申请相关列表筛选配置项
        // clientRequireConfig: {
        //     type: order_apply_type,//订单申请状态
        //     created_at,//创建时间
        // },
        //订单申请查询字段
        // clientRequire: {
        //   page: 1, //请求页码
        //   pageNumber: 20,//单页信息数量
        //   type: [],//订单申请类型
        //   require_code: '',//订单申请编号
        //   user_phone: '',//客户电话
        //   user_name: '',//客户姓名
        //   created_at: [],//创建时间
        // },
        // 运营客户列表
        clientList: {
            page: 1, //请求页码
            pageNumber: 20,//单页信息数量

            name: '',
            phone: '',
        }
    },
}

