
//已签约订单处理流程
import signedOrderProcess from './signedOrderProcess.vue'
//
import orderLife from './orderLife.vue'


export {
    signedOrderProcess,
    orderLife,
}
//文章对应数组

export const noticeArticleList =[
    {
        id: 1,
        articleName: '365已签约订单处理流程',
        tagList:["订单", "用例"],
        des: '365已签约订单处理流程列举了大量的业务用例，帮助大家解决业务场景中的难题。',
        created_at: '2019-10-20 19:00:00',
        created_manager: '宋希文',
        componentName: 'signedOrderProcess',
        component: signedOrderProcess
    },
    {
        id: 2,
        articleName: '订单来源、分派、处理流程',
        tagList:["订单", "流程", "来源", "分派", "处理"],
        des: '365订单来源、分派、处理流程说明了整个公司业务体系中的订单的来源渠道，帮助大家做好订单的分类。',
        created_at: '2019-10-21 19:34:51',
        created_manager: '宋希文',
        componentName: 'orderLife',
        component: orderLife
    },
]