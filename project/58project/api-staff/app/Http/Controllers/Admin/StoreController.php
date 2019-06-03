<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller;
use App\Services\Admin\StoreService;

class StoreController extends Controller
{
    public function getStoreList(Request $request)
    {
        $storeService = new StoreService;
        // 门店名称，搜索项
        $params['name'] = trim($request->input('name', ''));

        $params['is_third'] = (int)trim($request->input('is_third', 0));

        $pageNumber = (int)trim($request->input('pageNumber', 15));
        
        $list = $storeService->getStoreList($params, $pageNumber);

        return send_msg_json(SUCCESS_RETURN, "success", $list);
    }

    /**
     * 获取门店信息
     *
     * @param Request $request
     * @return string
     */
    public function getStore(Request $request)
    {
        $storeService = new StoreService;
        // 管理员id
        $id = (int)trim($request->input('id', 0));
        if (empty($id)) {
            // 表单形式
            $data['method'] = "add";

            $data['store'] = array();
            $data['manager_ids'] = array();
        } else {
            // 表单形式
            $data['method'] = "edit";
            // 门店
            $data['store'] = $storeService->getStoreById($id);
            if (empty($data['store'])) {
                send_msg_json(ERROR_RETURN, '该门店不存在');
            }
            $data['store']['created_at'] = $data['store']['created_at']*1000;
            $data['manager_ids'] = array_column($storeService->getStoreManagerIds($id), 'id');
        }

        $data['store_manager'] = $storeService->getStoreManagerArray($id);
        
        return send_msg_json(SUCCESS_RETURN, "success", $data);
    }

    public function getStoreManagerList(Request $request)
    {
        $storeService = new StoreService;
        // 门店id
        $params['id'] = (int)trim($request->input('id', 0));

        $pageNumber = (int)trim($request->input('pageNumber', 15));

        if (empty($params['id'])) {
            send_msg_json(ERROR_RETURN, '请传入门店id');
        }
        if (empty($storeService->getStoreById($params['id']))) {
            send_msg_json(ERROR_RETURN, '该门店不存在');
        }
        $list = $storeService->getStoreManagerList($params, $pageNumber);

        return send_msg_json(SUCCESS_RETURN, "success", $list);
    }

    public function editStore(Request $request)
    {
        $storeService = new StoreService;
        // 门店id
        $params['id'] = (int)trim($request->input('id', 0));
        // 门店名
        $params['name'] = trim($request->input('name', ''));
        // 地址
        $params['address'] = trim($request->input('address', ''));
        // 是否为第三方
        $params['is_third'] = (int)trim($request->input('is_third', 1));
        // 电话
        $params['phone'] = trim($request->input('phone',''));
        // 角色组
        $params['manager_ids'] = $request->input('manager_ids', array());
        // 开始时间
        $params['start_time'] = (int)trim($request->input('start_time', 0));
        // 结束时间
        $params['end_time'] = (int)trim($request->input('end_time', 0));
        // 状态
        $params['type'] = trim($request->input('type', 'enable'));
        // 备注
        $params['remarks'] = trim($request->input('remarks', ''));
        // 成功时回传信息
        $returnMsg = '添加成功';
        if (!empty($params['id'])) {
            // 门店
            $store = $storeService->getStoreById($params['id']);
            if (empty($store)) {
                send_msg_json(ERROR_RETURN, '该门店不存在');
            }
            $returnMsg = '编辑成功';
        }
        if ($params['name'] == '') {
            send_msg_json(ERROR_RETURN, "请传入门店名");
        }
        if ($params['address'] == '') {
            send_msg_json(ERROR_RETURN, "请传入门店地址");
        }
        $storeService->saveStore($params);

        return send_msg_json(SUCCESS_RETURN, $returnMsg);
    }
}
