/**
 * 登陆模块
 */
import axios from 'axios'

import store from '../store'

import {Login} from '../store/login/logGlobal.js'

export default {
    //登录，获取、设置token 
    getToken(account, password){

        // return axios.post({
        //     url: '',
        //     data: {
        //         username : account,
        //         password : password
        //     },
        // }).then((data) =>{
        //     // 将登录信息存入 vuex sessionStorage
        //     store.commit('login',true,'123')
            
        // }).catch(err =>{
        //     throw err
        // })
        
        return Promise.resolve().then(() =>{
            let arr = [
                {
                    title : '首页',
                    router: '/homePage'
                },
                {
                    router: '/',
                    title : '超级管理员',
                    children :[
                        {
                            title : '仪表盘',
                            router: '/superAdmin/dashboard'
                        },
                        {
                            title : '权限管理',
                            router: '/superAdmin/accountList'
                        },
                    ]
                },
                {
                    router: '/',
                    title : '人力资源管理',
                    children :[
                        {
                            title : '服务类型管理',
                            router: '/hrAdmin/serviceList'
                        },
                        {
                            title : '服务人员管理',
                            router: '/hrAdmin/staffList'
                        },
                    ]
                },
            ]
            store.commit('login',{
                accessToken: 'accessToken',
                refreshToken: 'refreshToken'
            })
            
            let routerobject = {}
            this.visitTree(arr,'')
            Object.keys(this.routerobject).forEach(key =>{
                this.routerobject[key] = this.routerobject[key].split("-")
            })
            console.log(this.routerobject)
            store.commit('setUser', {
                menu: arr,
                routerNavigator: this.routerobject
            })
        })
    },
    routerobject: {

    },
    /**
     * 遍历目录树
     * @param Treelist 树形结构
     * @param valuenode 叶子结点信息
     */
    visitTree(Treelist, valuenode, routerobject){
        if(Array.isArray(Treelist)){
            Treelist.forEach((item, index) =>{
                if(item.children){
                    this.visitTree(item.children, (valuenode == ''? '' : (valuenode+'-'))+item.title)
                }else{

                    this.routerobject[item.router] =  (valuenode == ''? '' : (valuenode+'-'))+item.title
                }
            })
        }else{
            throw new Error("expect array structure")
        }
    },
    /**
     * 刷新token 
     */
    refreshToken(){
        let refreshToken = Login.token.refreshToken;

        return axios.post({

        }).then(data => {
            //将信息存入 vuex sessionStorage
        }).catch(err =>{
            throw err
        })
    },
    /**
     * 退出登录
     */
    logout(){
        return axios.post({
            
        }).then(() => {
          
            store.commit('logout');
        
        })
    }
}

