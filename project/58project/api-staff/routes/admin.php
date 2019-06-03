<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
// 管理员登录
Route::post('/login', 'LoginController@login');
// 刷新token
Route::post('/changeToken', 'LoginController@changeToken');
// 权限模块
Route::group(['prefix' => 'permission', 'middleware' => ['admin']], function () {
    // 获取菜单
    Route::get('/getMenu', 'PermissionController@getMenu');
    // 获取管理员列表
    Route::get('/getManagerList', 'PermissionController@getManagerList');
    // 获取管理员信息
    Route::get('/getManager', 'PermissionController@getManager');
    // 编辑管理员信息
    Route::post('/editManager', 'PermissionController@editManager');
    // 逻辑删除管理员
    Route::post('/changeManagerType', 'PermissionController@changeManagerType');
    // 获取角色列表
    Route::get('/getRoleList', 'PermissionController@getRoleList');
    // 获取角色信息
    Route::get('/getRole', 'PermissionController@getRole');
    // 编辑角色信息
    Route::post('/editRole', 'PermissionController@editRole');
    // 逻辑删除角色
    Route::post('/deleteRole', 'PermissionController@deleteRole');
    // 获取角色权限信息
    Route::get('/getRolePermission', 'PermissionController@getRolePermission');
    // 编辑角色权限信息
    Route::post('/editRolePermission', 'PermissionController@editRolePermission');
    // 获取权限列表
    Route::get('/getPermissionList', 'PermissionController@getPermissionList');
    // 获取权限信息
    Route::get('/getPermission', 'PermissionController@getPermission');
    // 编辑权限信息
    Route::post('/editPermission', 'PermissionController@editPermission');
    // 逻辑删除权限
    Route::post('/deletePermission', 'PermissionController@deletePermission');
});
// 服务人员模块
Route::group(['prefix' => 'staff', 'middleware' => ['admin']], function () {
    // 获取服务人员列表
    Route::post('/getStaffList', 'StaffController@getStaffList');
    // 获取服务人员信息
    Route::get('/getStaff', 'StaffController@getStaff');
    // 编辑服务人员信息
    Route::post('/editStaff', 'StaffController@editStaff');
    // 销售人员编辑人员信息
    Route::post('/createStaffBySeller', 'StaffController@createStaffBySeller');
    // 修改服务人员接单状态
    Route::post('/changeWorkingStatus', 'StaffController@changeWorkingStatus');
    // 物理删除申请记录
    Route::post('/deleteApplyStaff', 'StaffController@deleteApplyStaff');
    // 停用/启用服务人员
    Route::post('/changeStaffType', 'StaffController@changeStaffType');
    // 检测服务人员姓名是否重复
    Route::post('/checkStaffName', 'StaffController@checkStaffName');
    // 获取可添加回访的数量
    Route::post('/getReturnStaff', 'StaffController@getReturnStaff');
    // 同意单个申请
    Route::post('/agreeStaffSingle', 'StaffController@agreeStaffSingle');
    // 添加回访人员到工作列表
    Route::post('/addReturnStaff', 'StaffController@addReturnStaff');
    // 单个添加奥回访人列表
    Route::post('/addReturnStaffSingle', 'StaffController@addReturnStaffSingle');
    // 移除回访人员到总列表
    Route::post('/removeReturnStaff', 'StaffController@removeReturnStaff');
});
// 订单模块
Route::group(['prefix' => 'order', 'middleware' => ['admin']], function () {
    // 获取订单列表
    Route::get('/getOrderList', 'OrderController@getOrderList');
    // 获取订单
    Route::get('/getOrder', 'OrderController@getOrder');
    // 创建订单
    Route::post('/createOrder', 'OrderController@createOrder');
    // 添加候选人
    Route::post('/createOrderStaff', 'OrderController@createOrderStaff');
    // 删除候选人
    Route::post('/deleteOrderStaff', 'OrderController@deleteOrderStaff');
    // 签约
    Route::post('/sign', 'OrderController@sign');
    // 拒签
    Route::post('/refuse', 'OrderController@refuse');
    // 写普通日志
    Route::post('/writeOrderLog', 'OrderController@writeOrderLog');
    // 取消订单
    Route::post('/cancelOrder', 'OrderController@cancelOrder');
    // 完成订单
    Route::post('/completeOrder', 'OrderController@completeOrder');
    // 分配订单
    Route::post('/assignOrder', 'OrderController@assignOrder');
});
// 通用下拉框数据
Route::group(['prefix' => 'common', 'middleware' => ['admin']], function () {
    // 获取服务树
    Route::get('/getServiceSelection', 'CommonController@getServiceSelection');
    // 获取能力标签树
    Route::get('/getLabelSelection', 'CommonController@getLabelSelection');
    // 获取证书种类下拉数据
    Route::get('/getPaperSelection', 'CommonController@getPaperSelection');
    // 获取管理员下拉数据
    Route::get('/getManagerSelection', 'CommonController@getManagerSelection');
    // 获取权限标签树
    Route::get('/getPermissionTree', 'CommonController@getPermissionTree');
    // 上传图片
    Route::post('/uploadImage', 'CommonController@uploadImage');
});
// 获取日志模块
Route::group(['prefix' => 'log', 'middleware' => ['admin']], function () {
    // 获取日志列表
    Route::get('/getLogList', 'LogController@getLogList');

    Route::get('/excel', 'LogController@excel');
});
// 配置表单参数模块
Route::group(['prefix' => 'formConfig', 'middleware' => ['admin']], function () {
    // 获取所有可配表单项
    Route::get('/getFormConfig', 'FormConfigController@getFormConfig');
    // 编辑所有可配表单项
    Route::post('/editFormConfig', 'FormConfigController@editFormConfig');
});

Route::group(['prefix' => 'store', 'middleware' => ['admin']], function () {
    // 获取门店列表
    Route::get('/getStoreList', 'StoreController@getStoreList');
    // 获取门店信息
    Route::get('/getStore', 'StoreController@getStore');
    // 编辑门店信息
    Route::post('/editStore', 'StoreController@editStore');
    // 根据门店id获取门店绑定的账号分页列表
    Route::post('/getStoreManagerList', 'StoreController@getStoreManagerList');
});