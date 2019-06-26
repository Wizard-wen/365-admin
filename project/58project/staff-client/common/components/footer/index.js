/**
 * 配置footer的数据
 */

 //footer图片
import homeActive from './img/home-active.svg'
import home from './img/home.svg'
import classifyActive from './img/classify-active.svg'
import classify from './img/classify.svg'
import mineActive from './img/mine-active.svg'
import mine from './img/mine.svg'

window.footerList = [
    {
        name: '首页',
        router: '/',
        highIcon: homeActive,
        icon: home,
    },
    {
        name: '订单',
        router: '/order',
        highIcon: classifyActive,
        icon: classify,
    },
    {
        name: '我的',
        router: '/userpage',
        highIcon: mineActive,
        icon: mine,
    },
]

export default footerList
