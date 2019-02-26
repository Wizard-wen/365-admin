export let menuArr = [
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
                router: '/auth/accountList',
                contains: [
                    {
                        title : '账户编辑',
                        router: '/auth/accountEdit'
                    },
                    {
                        title : '角色配置',
                        router: '/auth/accountConfig'
                    },
                ]
            },
            {
                title : '账户配置',
                router: '/auth/accountConfig',
                isShow: false
            },
            {
                title : '角色列表',
                router: '/auth/roleList',
                contains: [
                    {
                        title : '角色权限配置',
                        router: '/auth/roleConfig'
                    },
                    {
                        title : '角色编辑',
                        router: '/auth/roleEdit'
                    },
                ]
            },
            {
                title : '权限配置',
                router: '/auth/authList',
                contains: [
                    {
                        title : '权限信息配置',
                        router: '/auth/authConfig'
                    },
                ]
            },
            
        ]
    },
    {
        router: '/',
        title : '人力资源管理',
        children :[
            {
                title : '服务人员列表',
                router: '/staff/staffList',

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
        ]
    },
];