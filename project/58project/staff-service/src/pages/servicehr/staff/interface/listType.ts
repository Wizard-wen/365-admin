


/**
 * 当列表进入编辑页面后，控制当前页面的编辑、提交按钮等状态
 */
export const workerItemType = [
    {
        id: 0,
        type:'运营人员-全部服务人员-创建',
    },
    {
        id: 1,
        type: "运营人员-全部服务人员-编辑"
    },
    {
        id: 2,
        type: "运营人员-回访-编辑"
    },
    {
        id: 3,
        type: "运营人员-异常处理-编辑"
    },
    {
        id: 4,
        type: '运营人员-处理新建申请-编辑'
    }
]



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

