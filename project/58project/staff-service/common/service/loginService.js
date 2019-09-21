/**
 * 登陆模块
 */

import store from '../store'

import loginRequest from './request/loginRequest'



export default {
    //登录，获取、设置token 
    async getToken(username, password){

        let login = await loginRequest.login(username, password)
            .then(data =>{
                let manager = data.data.manager,
                    tree = data.data.tree

                let routerObj = this.getRouterLeaf(tree,'');
                // 登录信息存入 vuex sessionStorage
                store.commit('login',{
                    access_token: manager.access_token,
                    refresh_token: manager.refresh_token
                })
                //用户信息存入 vuex sessionStorage
                store.commit('setUser', {
                    routerNavigator: routerObj,//路由、地址对象
                    ...manager,
                    menuList: tree,
                })
                return data
            }).catch(err =>{
                throw err
            })    
        return login 
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
                        if(item.contains){
                            
                            let contains_arr = item.contains
                            
                            let father_router = item.router

                            contains_arr.forEach((it, index) => {
                                routerobject[it.router] = (valuenode == ''? '' : (valuenode+'-'))+it.title
                            })
                        }
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

