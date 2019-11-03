/**
 * 运营中心客户端订单接口
 */
export default {
	/**
	 * 客户端订单列表
	 */
	getClientRequireList(){
		return axios.post(`./admin/order/getRequireList`,{
			...store.state.operateModule.clientRequire
		})
	},
	/**
	 * 客户端订单详情
	 * @param id 订单id
	*/
	getClientRequire(id){
		return axios.get(`./admin/order/getRequire?id=${id}`)
	},
	/**
	 * 客户端订单编辑
	 * @param obj 编辑对象
	*/
	editClientRequire(obj){
		return axios.post(`./admin/order/editRequire`,{
			...obj
		})
	},
	/**
	 * 客户端改变客户意向动态
	*/
	changeRequireType(sendObj){
		return axios.post(`./admin/order/changeRequireType`,{
			...sendObj,
		})
	},
}