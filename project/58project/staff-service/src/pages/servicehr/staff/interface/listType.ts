


/**
 * 编辑、提交列表状态
 */
export const listType = [
    {
        id: 0,
        type:'',
    }
]
    // type1: 0, //运营人员创建 0
    // type2: 1,//运营人员编辑 1


    // type3: 2,//运营人员回访时编辑 2

    // type4: 3,//运营人员处理异常时编辑 3
    
    // type5: 4,//运营人员处理新建申请 4



/**
 * 请求列表状态
 */
export const get_forList = [
    {
        id: 0,
        key: 'total',
    },//全部服务人员,
    {
        id: 1,
        key: 'return',
    },//回访服务人员
    {
        id: 2,
        key: 'warning'
    },//异常服务人员
    {
        id: 3,
        key: 'apply'
    },//审核新服务人员
    {
        id: 4,
        key: 'seller'
    },//服务人员信息库
]

