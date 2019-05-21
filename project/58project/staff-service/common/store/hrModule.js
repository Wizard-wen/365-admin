/**
 * 处理全局的loading
 */


import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const hrModule = {
    mutations:{
        setConfigForm(state, configForm){
            state.configForm = configForm
        },
        /** 
        * @param key queryList 键名 
        * @param newValueArray 键值，可能是数组，也可能是字符串
        */
        setQueryList(state,payload){
            state.queryedList[payload.queryKey] = payload.queryedList
        }
    },

    state: {
        configForm: {}, //全部劳动者配置项
        /**
         * 服务人员列表 查询条件
         */
        queryedList: {
            /*********************表格字段查询******************************/
            get_for: 'staff',
            page: 1, //请求页码
            pageNumber: 20,//单页信息数量

            /*********************逻辑字段查询*****************************/
            
            // staff_code: '',//员工号
            // sex: '',//性别
            // create_at: '', //创建时间

            /*********************业务字段查询*****************************/
            authentication_ids: [],//认证状态
            course_ids: [],//参加培训
            nation_ids: [],//民族
            paper_category_ids: [],//证书
            service_category_ids: [],//职业类型
            service_crowd_ids: [],//可服务人群
            service_region_ids: [],//服务地区
            service_type_ids: [],//服务类型
            source_ids: [],//信息来源
            working_age_ids: [],//工龄
            working_status_ids: [],//接单状态 ------

            // 以下字段非配置项字段
            
            // register_at: '',//登记时间
            // updated_at: '',//更新时间
            
            // type: '',//签约状态
            
            
            
            name: null, //姓名
            age: null,//年龄
            // phone: '',//电话
            // return_msg: '',//回访信息
            
            // remarks: '',//备注（商家情况）
            // skill: '', //职业类型
            
            
            
            // working_experience: '',//工作经验
            
            // birthPlace: '',//籍贯
            // identify: '',//身份证号
            // address: '',//地址
            
            // education: '',//学历
            // urgent_phone: '',//紧急联系人电话
            // bank_card: '',//银行卡号
            
            // paper: '',//技能证书
            
            // manager_name: ''//创建人

        }, //全部查询参数
        educationList: [
            {
                id : 1,
                name: "本科及以上"
            },
            {
                id : 2,
                name: "本科"
            },
            {
                id : 3,
                name: "自考成人大专"
            },
            {
                id : 4,
                name: "专科"
            },
            {
                id : 5,
                name: "中专"
            },
            {
                id : 6,
                name: "职高"
            },
            {
                id : 7,
                name: "高中"
            },
            {
                id : 8,
                name: "初中"
            },
            {
                id : 9,
                name: "小学"
            },
        ],
        nation:[
            {"id":"11","name":"满族"},
            {"id":"01","name":"汉族"},
            {"id":"02","name":"蒙古族"},
            {"id":"03","name":"回族"},
            {"id":"38","name":"锡伯族"},
            {"id":"10","name":"朝鲜族"},
            {"id":"08","name":"壮族"},
            {"id":"52","name":"鄂伦春族"},
            {"id":"57","name":"其他"},
        ],
        allNationList:[
            {"id":'0',"name":"请选择"},
            {"id":"11","name":"满族"},
            {"id":"01","name":"汉族"},
            {"id":"02","name":"蒙古族"},
            {"id":"03","name":"回族"},
            {"id":"38","name":"锡伯族"},
            {"id":"10","name":"朝鲜族"},
            {"id":"08","name":"壮族"},
            {"id":"52","name":"鄂伦春族"},




            {"id":"04","name":"藏族"},{"id":"05","name":"维吾尔族"},{"id":"06","name":"苗族"},
            {"id":"07","name":"彝族"},{"id":"09","name":"布依族"},
            {"id":"12","name":"侗族"},
            {"id":"13","name":"瑶族"},{"id":"14","name":"白族"},{"id":"15","name":"土家族"},
            {"id":"16","name":"哈尼族"},{"id":"17","name":"哈萨克族"},{"id":"18","name":"傣族"},
            {"id":"19","name":"黎族"},{"id":"20","name":"傈僳族"},{"id":"21","name":"佤族"},
            {"id":"22","name":"畲族"},{"id":"23","name":"高山族"},{"id":"24","name":"拉祜族"},
            {"id":"25","name":"水族"},{"id":"26","name":"东乡族"},{"id":"27","name":"纳西族"},
            {"id":"28","name":"景颇族"},{"id":"29","name":"柯尔克孜族"},{"id":"30","name":"土族"},
            {"id":"31","name":"达斡尔族"},{"id":"32","name":"仫佬族"},{"id":"33","name":"羌族"},
            {"id":"34","name":"布朗族"},{"id":"35","name":"撒拉族"},{"id":"36","name":"毛难族"},
            {"id":"37","name":"仡佬族"},{"id":"39","name":"阿昌族"},
            {"id":"40","name":"普米族"},{"id":"41","name":"塔吉克族"},{"id":"42","name":"怒族"},
            {"id":"43","name":"乌孜别克族"},{"id":"44","name":"俄罗斯族"},{"id":"45","name":"鄂温克族"},
            {"id":"46","name":"崩龙族"},{"id":"47","name":"保安族"},{"id":"48","name":"裕固族"},
            {"id":"49","name":"京族"},{"id":"50","name":"塔塔尔族"},{"id":"51","name":"独龙族"},
            ,{"id":"53","name":"赫哲族"},{"id":"54","name":"门巴族"},
            {"id":"55","name":"珞巴族"},{"id":"56","name":"基诺族"}
        ]
    },
}

