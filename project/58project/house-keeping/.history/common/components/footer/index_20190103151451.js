/**
 * 配置footer的数据
 */

 //footer图片
import homeActive from './img/home-active.svg'
import home from './img/home.svg'
import classifyActive from './img/classify-active.svg'
import classify from './img/classify.svg'
import cartActive from './img/cart-active.svg'
import cart from './img/cart.svg'
import mineActive from './img/mine-active.svg'
import mine from './img/mine.svg'

export const items = [
    {
        name: '首页',
        router: '/',
        highIcon: homeActive,
        icon: home,
    },
    {
        name: '分类',
        router: '/classify',
        highIcon: classifyActive,
        icon: classify,
    },
    {
        name: '订单',
        router: '/order',
        highIcon: cartActive,
        icon: cart,
    },
    {
        name: '我的',
        router: '/userpage',
        highIcon: mineActive,
        icon: mine, 
    },
]