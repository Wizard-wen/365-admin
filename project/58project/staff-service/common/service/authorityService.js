/**
 * 权限管理模块
 * created by sxw 
 * 2019/1/9
 */


export default {
    /**
     * 获取所有账号列表
     */
    getAccountList(){

        let list = [{
            id: '0001',
            name: 'jack',
            type: '02',
            address: '浑南'
        }, {
            id: '0002',
            name: 'Frank',
            type: '02',
            address: '大东'
        }, {
            id: '0003',
            name: 'Sam',
            type: '01',
            address: '沈河'
        }, {
            id: '0004',
            name: 'Tom',
            type: '03',
            address: '铁西'
        }, ]
        return Promise.resolve(list)
    }
}