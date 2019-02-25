/**
 * 登陆模块
 */
import axios from 'axios'

import store from '../store'

import {Login} from '../store/login/logGlobal.js'
import loginRequest from './request/loginRequest.js'
import authRequest from './request/authRequest.js'

export default {
    //登录，获取、设置token 
    async getToken(username, password){
        let arr = [
            {
                title : '我的',
                router: '/homePage'
            },
            {
                router: '/',
                title : '权限管理',
                children :[
                    {
                        title : '账户列表',
                        router: '/auth/accountList'
                    },
                    {
                        title : '账户配置',
                        router: '/auth/accountConfig',
                        isShow: false
                    },
                    {
                        title : '角色列表',
                        router: '/auth/roleList'
                    },
                    {
                        title : '权限配置',
                        router: '/auth/authList'
                    },
                ]
            },
            {
                router: '/',
                title : '人力资源管理',
                children :[
                    {
                        title : '服务人员列表',
                        router: '/staff/staffList'
                    },
                    {
                        title : '服务类型列表',
                        router: '/serviceType/typeList'
                    },
                ]
            },
            {
                router: '/',
                title : '销售管理',
                children :[
                    {
                        title : '订单列表',
                        router: '/sale/orderList'
                    },
                    {
                        title : '服务人员列表',
                        router: '/staff/staffList'
                    },
                ]
            },
        ];

        let routerObj = this.getRouterLeaf(arr,'');

        await loginRequest.login(username, password)
            .then(data =>{
                let manager = data.data.manager,
                    tree = data.data.tree
                // 登录信息存入 vuex sessionStorage
                store.commit('login',{
                    access_token: manager.access_token,
                    refresh_token: manager.refresh_token
                })
                //用户信息存入 vuex sessionStorage
                store.commit('setUser', {
                    menu: arr,
                    routerNavigator: routerObj,
                    username: manager.name,
                    id: manager.id,
                    account: manager.account,
                    expire: manager.expire,
                    tree: tree,
                })
            }).catch(err =>{
                throw err
            })     
    },
    /**
     * des 提取树形路由数组的叶节点
     *     将叶节点路由作为对象键名
     *     将从根路由开始的逐级菜单名称，组成一个数组作为键值
     * @param {路由数组} Treelist 
     * @param {初始值} valuenode 
     */
    getRouterLeaf(Treelist, valuenode){
        var routerobject = {}
        
        function visitTree(Treelist, valuenode){
            if(Array.isArray(Treelist)){
                Treelist.forEach((item, index) =>{
                    if(item.children){
                        visitTree(item.children, (valuenode == ''? '' : (valuenode+'-'))+item.title)
                    }else{
    
                        routerobject[item.router] =  (valuenode == ''? '' : (valuenode+'-'))+item.title
                    }
                })
            }else{
                throw new Error("expect array structure")
            }
        }

        visitTree(Treelist, valuenode)

        Object.keys(routerobject).forEach(key =>{
            routerobject[key] = routerobject[key].split("-")
        })

        return routerobject
    },
    /**
     * 刷新token 
     * @param refresh_token 刷新token
     */
    async refreshToken(refresh_token){
        await loginRequest.refreshToken(refresh_token)
            .then(data =>{
                let manager = data.data
                // 登录信息存入 vuex sessionStorage
                store.commit('login',{
                    access_token: manager.access_token,
                    refresh_token: manager.refresh_token
                })

            }).catch(error =>{

            })
    },
    /**
     * 退出登录
     */
    logout(){
        store.commit('logout')
    }
}

