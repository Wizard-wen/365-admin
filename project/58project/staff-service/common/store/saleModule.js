import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


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
/**
 * 合同状态
 */
export const contract_type = [
    {name: '待执行',id: 1},
    {name: '执行中',id: 2},
    {name: '已终止',id: 3},
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
        
        orderworkerConfigForm: {
            ...order_status,
        },

        saleContractConfigForm: {
            type: contract_type,
            sign_at: created_at,//签约时间 
            sign_manager_id: [],//签约经纪人
            sign_store_id: [],//签约经纪门店
        },

        //门店工作台
        saleWorkstation: {
            dynamic_information: [],//动态信息
            processing_order: [],//待处理订单
        },
        /**
         *  服务人员信息库查询字段 
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
            source_name: '',//来源名城
            manager: [],//创建人
            updated_type: [],//更新时间
        },
        /**
         * 我创建的服务人员列表
         */
        saleOwnWorkerList: {
            page: 1, //请求页码
            pageNumber: 20,//单页信息数量
            manager: [],
        },
        /**
         * 备选服务人员列表查询字段
         */
        matchServiceList: {
            /*********************表格字段查询******************************/
            get_for: 'match',
            page: 1, //请求页码
            pageNumber: 20,//单页信息数量
            /*********************逻辑字段查询*****************************/
            
            // staff_code: '',//员工号
            // sex: '',//性别
            // create_at: '', //创建时间

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
            source_name: '',//来源名称
            manager: [],//创建人
            updated_type: [],//更新时间
        }, 
        /**
         * 订单列表查询参数
         */
        saleOrderList: {
            page: 1, //请求页码
            pageNumber: 20,//单页信息数量
            order_code: '',//订单编号
            type: [],//订单状态 
            order_at: [],//客户下单时间
            order_user_phone:'',//下单客户电话
            order_user_name: '',//下单客户姓名
            apply_store_id: [],//来源门店
            apply_manager_id: [],//来源人
            sign_user_name: '',//签约客户名
            sign_user_phone: '',//签约客户电话
            sign_staff_name: '',//签约服务人员姓名
            sign_staff_code: '',//签约服务人员编号
            sign_staff_phone: '',//签约服务人员电话
            created_at: [],//订单创建时间
            created_manager_id: [],//订单创建人
            agent_store_id: [],//经纪门店id
            agent_manager_id: [], //经纪人id
        },
        /**
         * 订单列表查询参数
         */
        publicOrderList: {
            get_for: 'public',
            page: 1, //请求页码
            pageNumber: 20,//单页信息数量
            order_code: '',//订单编号
            order_at: [],//客户下单时间
            agent_store_id: [],//经纪门店id
            agent_manager_id: [], //经纪人id
        },
        /**
         *  合同列表查询字段 
         */
        saleContractList: {
            /*********************表格字段查询******************************/
            page: 1, //请求页码
            pageNumber: 10,//单页信息数量
            contract_code:'',//合同流水号
            contract_number:'',//合同编号


            type: [],//合同状态
            sign_at: [],//签约时间 
            sign_manager_id: [],//签约经纪人
            sign_store_id: [],//签约经纪门店

            sign_user_name: '',//雇主
            sign_user_phone:'',//雇主电话

            sign_staff_name:'',//签约家政服务员
            sign_staff_code: '',//签约家政服务员员工号
        }, //全部查询参数
    },
    mutations: {
        /**
         * 初始化订单数据
         */
        configOrderData(state, data){
            state.order = data.order
            state.order_staff = data.order_staff //候选人员
            state.order_contract = data.order_contract //合同信息
            state.order_logs = data.order_logs //订单日志
        },
        /**
         * 初始化门店工作台数据
         */
        configSaleWorkstation(state, data){
            state.saleWorkstation.dynamic_information = data.dynamic_information
            state.saleWorkstation.processing_order = data.processing_order
        },
        /** 
         * 列表查询函数公共键值说明
         * @param queryKey queryList 键名 
         * @param queryedList 键值，可能是数组，也可能是字符串
         */
        //设置全部服务人员查询字段
        saleSetWorkerList(state,payload){
            state.saleWorkerList[payload.queryKey] = payload.queryedList
        },
        //设置我创建的服务人员查询字段
        saleSetOwnWorkerList(state,payload){
            state.saleOwnWorkerList.manager = payload
        },
        //设置备选服务人员查询字段
        saleSetMatchSerivceList(state,payload){
            state.matchServiceList[payload.queryKey] = payload.queryedList
        },
        //设置订单列表查询字段
        saleSetOrderList(state,payload){
            state.saleOrderList[payload.queryKey] = payload.queryedList
        },
        //设置公共订单列表查询字段
        saleSetPublicOrderList(state,payload){
            state.publicOrderList[payload.queryKey] = payload.queryedList
        },
        //设置合同列表查询字段
        saleSetContractList(state,payload){
            state.saleContractList[payload.queryKey] = payload.queryedList
        },
        //设置合同相关搜索接口
        setSaleContractConfigForm(state,saleContractConfigForm){
            state.saleContractConfigForm.sign_manager_id = saleContractConfigForm.apply_manager_id
            state.saleContractConfigForm.sign_store_id = saleContractConfigForm.apply_store_id
        },
    },
}




