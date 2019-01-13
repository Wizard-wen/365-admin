window.config = Object.assign(
    {
        //系统名称，是系统的命名空间
        namespace: 'staff',

        // apiPath: typeof location != 'undefined' ? location.origin + '/' : 'http://localhost:8080/',
        apiPath: 'http://www.magicheart.win/'

    },
    //集成当前生产模式的配置
    window.config,
)