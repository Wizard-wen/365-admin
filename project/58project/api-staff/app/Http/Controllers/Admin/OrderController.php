<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller;
use App\Services\Admin\OrderService;

class OrderController extends Controller
{
    /**
     * 获取订单列表
     *
     * @param Request $request
     * @return string
     */
    public function getOrderList(Request $request)
    {
        $orderService = new OrderService;

        $params['accessToken'] = trim($request->header('accessToken',''));
        // 服务分类id
        $params['service_category_id'] = (int)trim($request->input('service_category_id', 0));
        // 获取订单的目的
        $params['purpose'] = trim($request->input('purpose', 'deal'));
        // 订单来源
        $params['source'] = (int)trim($request->input('source', 0));
        // 订单号
        $params['code'] = trim($request->input('code', ''));
        // 手机号
        $params['phone'] = trim($request->input('phone', ''));

        $params['type'] = (int)trim($request->input('type', 0));
        // 一页几条，默认15条
        $pageNumber = (int)trim($request->input('pageNumber', 15));

        $list = $orderService->getOrderList($params, $pageNumber);

        return send_msg_json(SUCCESS_RETURN, "success", $list);
    }

    /**
     * 创建订单
     *
     * @param Request $request
     * @return string
     */
    public function createOrder(Request $request)
    {
        $orderService = new OrderService;

        $accessToken = trim($request->header('accessToken',''));

        $params['user_name'] = trim($request->input('user_name', ''));

        $params['phone'] = trim($request->input('phone', ''));

        $params['service_category_id'] = (int)trim($request->input('service_category_id', 0));

        $params['name'] = trim($request->input('name', ''));

        $params['service_address'] = trim($request->input('service_address', ''));

        $params['service_start_time'] = (int)trim($request->input('service_start_time', 0));
        
        $params['service_end_time'] = (int)trim($request->input('service_end_time', 0));

        $params['source'] = (int)trim($request->input('source', 0));

        $params['remark'] = trim($request->input('remark', ''));

        if (empty($params['service_category_id'])) {
            send_msg_json(ERROR_RETURN, "请选择服务项目");
        }
        if ($params['name'] == '') {
            send_msg_json(ERROR_RETURN, "请传入服务项目名");
        }
        if ($params['user_name'] == '') {
            send_msg_json(ERROR_RETURN, "请填写客户名");
        }
        if ($params['phone'] == '') {
            send_msg_json(ERROR_RETURN, "请填写客户手机号");
        }
        if ($params['service_address'] == '') {
            send_msg_json(ERROR_RETURN, "请填写服务地址");
        }
        if (empty($params['service_start_time']) || empty($params['service_end_time'])) {
            send_msg_json(ERROR_RETURN, "请选择服务时间");
        }
        if (empty($params['source'])) {
            send_msg_json(ERROR_RETURN, "请选择订单渠道");
        }
        // 保存需求订单
        $order_id = $orderService->createOrder($params, $accessToken);
        
        return send_msg_json(SUCCESS_RETURN, "添加成功");
    }

    /**
     * 根据id获取订单
     *
     * @param Request $request
     * @return string
     */
    public function getOrder(Request $request)
    {
        $orderService = new OrderService;
        // 订单id
        $order_id = (int)trim($request->input('order_id', 0));
        if (empty($order_id)) {
            send_msg_json(ERROR_RETURN, "请传入订单id");
        }
        
        $data['order'] = $orderService->getOrderById($order_id);

        $data['order_staff'] = $orderService->getOrderStaffById($order_id);

        $data['order_files'] = $orderService->getOrderFileByid($order_id);

        $data['order_logs'] = $orderService->getOrderLogById($order_id);

        return send_msg_json(SUCCESS_RETURN, "success", $data);
    }

    /**
     * 添加订单候选人
     *
     * @param Request $request
     * @return string
     */
    public function createOrderStaff(Request $request)
    {
        $orderService = new OrderService;

        $accessToken = trim($request->header('accessToken',''));
        // 订单id
        $params['order_id'] = (int)trim($request->input('order_id', 0));

        $params['staff_id'] = (int)trim($request->input('staff_id', 0));
        
        $params['staff_name'] = trim($request->input('staff_name', ''));

        $params['staff_code'] = trim($request->input('staff_code', ''));

        if (empty($params['order_id'])) {
            send_msg_json(ERROR_RETURN, "请选择订单id");
        }
        if (empty($params['staff_id'])) {
            send_msg_json(ERROR_RETURN, "请选择服务人员id");
        }
        if ($params['staff_name'] == '') {
            send_msg_json(ERROR_RETURN, "请填写服务人员姓名");
        }
        if ($params['staff_code'] == '') {
            send_msg_json(ERROR_RETURN, "请填写服务人员编号");
        }
    
        $orderService->createOrderStaff($params);

        return send_msg_json(SUCCESS_RETURN, "添加成功");
    }

    /**
     * 删除候选人
     *
     * @param Request $request
     * @return string
     */
    public function deleteOrderStaff(Request $request)
    {
        $orderService = new OrderService;
        // 订单id
        $params['order_id'] = (int)trim($request->input('order_id', 0));

        $params['order_staff_id'] = (int)trim($request->input('order_staff_id', 0));

        if (empty($params['order_id'])) {
            send_msg_json(ERROR_RETURN, "请传入该订单id");
        }
        if (empty($params['order_staff_id'])) {
            send_msg_json(ERROR_RETURN, "请传入该服务人员id");
        }

        $orderService->deleteOrderStaff($params);

        return send_msg_json(SUCCESS_RETURN, "删除成功");
    }

    public function sign(Request $request)
    {
        $orderService = new OrderService;

        $accessToken = trim($request->header('accessToken',''));
        // 订单id
        $params['order_id'] = (int)trim($request->input('order_id', 0));
        // 候选人员id
        $params['order_staff_id'] = (int)trim($request->input('order_staff_id', 0));
        // 服务人员id
        $params['staff_id'] = (int)trim($request->input('staff_id', 0));
        // 服务人员姓名
        $params['staff_name'] = trim($request->input('staff_name', ''));
        // 服务周期单位
        $params['unit'] = trim($request->input('unit', ''));
        // 服务次数
        $params['service_count'] = (int)trim($request->input('service_count', 0));
        // 单价
        $params['unit_price'] = sprintf("%.2f", trim($request->input('unit_price', 0)));
        // 总价
        $params['total_price'] = sprintf("%.2f", trim($request->input('total_price', 0)));
        // 是否代发工资
        $params['pay_wage'] = (int)trim($request->input('pay_wage', 0));
        // 代发工资次数
        $params['wage_count'] = (int)trim($request->input('wage_count', 0));
        // 代发工资金额
        $params['wage_price'] = sprintf("%.2f", trim($request->input('wage_price', 0)));

        $params['version'] = (int)trim($request->input('version', 0));
        // 合同图片
        $params['paper'] = $request->input('paper', array());

        if (empty($params['order_id'])) {
            send_msg_json(ERROR_RETURN, "请传入订单id");
        }
        if (empty($params['order_staff_id'])) {
            send_msg_json(ERROR_RETURN, "请传入候选人员id");
        }
        if (empty($params['staff_id'])) {
            send_msg_json(ERROR_RETURN, "请传入服务人员id");
        }
        if ($params['unit'] == '') {
            send_msg_json(ERROR_RETURN, "请选择服务周期");
        }
        $orderService->sign($params, $accessToken);


        return send_msg_json(SUCCESS_RETURN, "签约成功");
    }

    /**
     * 拒签
     *
     * @param Request $request
     * @return void
     */
    public function refuse(Request $request)
    {
        $orderService = new OrderService;

        $accessToken = trim($request->header('accessToken',''));
        // 订单id
        $params['order_id'] = (int)trim($request->input('order_id', 0));
        // 候选人员id
        $params['order_staff_id'] = (int)trim($request->input('order_staff_id', 0));
        // 服务人员id
        $params['staff_id'] = (int)trim($request->input('staff_id', 0));
        // 服务人员姓名
        $params['staff_name'] = trim($request->input('staff_name', 0));
        // 拒签日志
        $params['message'] = trim($request->input('message', ''));
        if (empty($params['order_id'])) {
            send_msg_json(ERROR_RETURN, "请传入订单id");
        }
        if (empty($params['order_staff_id'])) {
            send_msg_json(ERROR_RETURN, "请传入候选人员id");
        }
        if (empty($params['staff_id'])) {
            send_msg_json(ERROR_RETURN, "请传入服务人员id");
        }
        if ($params['staff_name'] == '') {
            send_msg_json(ERROR_RETURN, "请传入候选人员姓名");
        }
        $orderService->refuse($params, $accessToken);

        
        return send_msg_json(SUCCESS_RETURN, "拒签成功");
    }

    /**
     * 写签约日志
     *
     * @param Request $request
     * @return string
     */
    public function writeOrderLog(Request $request)
    {
        $orderService = new OrderService;

        $accessToken = trim($request->header('accessToken',''));
        // 订单id
        $params['order_id'] = (int)trim($request->input('order_id', 0));

        $params['message'] = trim($request->input('message', ''));

        $params['type'] = 'normal';
        
        if (empty($params['order_id'])) {
            send_msg_json(ERROR_RETURN, "请传入订单id");
        }
        if ($params['message'] == '') {
            send_msg_json(ERROR_RETURN, "请传入日志");
        }
        
        $orderService->writeOrderLog($params, $accessToken);

        return send_msg_json(SUCCESS_RETURN, "添加成功");
    }

    /**
     * 取消订单
     *
     * @param Request $request
     * @return boolean
     */
    public function cancelOrder(Request $request)
    {
        $orderService = new OrderService;

        $accessToken = trim($request->header('accessToken',''));
        // 订单id
        $params['order_id'] = (int)trim($request->input('order_id', 0));

        $params['message'] = trim($request->input('message', ''));
        
        if (empty($params['order_id'])) {
            send_msg_json(ERROR_RETURN, "请传入订单id");
        }
        $orderService->cancelOrderById($params, $accessToken);


        return send_msg_json(SUCCESS_RETURN, "取消成功");
    }

    /**
     * 完成订单
     *
     * @param Request $request
     * @return string
     */
    public function completeOrder(Request $request)
    {
        $orderService = new OrderService;

        $accessToken = trim($request->header('accessToken',''));
        // 订单id
        $params['order_id'] = (int)trim($request->input('order_id', 0));

        $params['message'] = trim($request->input('message', ''));
        if (empty($params['order_id'])) {
            send_msg_json(ERROR_RETURN, "请传入订单id");
        }

        $orderService->completeOrderById($params, $accessToken);

        
        return send_msg_json(SUCCESS_RETURN, "操作成功");
    }

    /**
     * 分配订单给指定管理员
     *
     * @param Request $request
     * @return string
     */
    public function assignOrder(Request $request)
    {
        $orderService = new OrderService;

        $accessToken = trim($request->header('accessToken',''));

        $params['order_id'] = (int)trim($request->input('order_id', 0));

        $params['manager_id'] = (int)trim($request->input('manager_id', 0));

        $params['manager_name'] = trim($request->input('manager_name', 0));

        $params['version'] = (int)trim($request->input('version', 0));

        if (empty($params['order_id'])) {
            send_msg_json(ERROR_RETURN, "请传入订单id");
        }
        if (empty($params['manager_id'])) {
            send_msg_json(ERROR_RETURN, "请传入管理员id");
        }
        if ($params['manager_name'] == '') {
            send_msg_json(ERROR_RETURN, "请传入管理员名");
        }
        $orderService->assignOrder($params, $accessToken);

        return send_msg_json(SUCCESS_RETURN, "分配成功");
    }
}