<?php

namespace App\Services\Admin;

use App\Entities\Orders;
use App\Entities\Users;
use App\Entities\Staff;
use App\Entities\OrderStaff;
use App\Entities\OrderFiles;
use App\Entities\OrderLogs;
use App\Entities\Managers;
use Illuminate\Support\Facades\DB;

class OrderService 
{
    /**
     * 订单列表字段
     *
     * @var array
     */
    private $orderList = [
        'id as order_id',
        'code',
        'phone',
        'source',
        'created_at',
        'type',
        'service_category_id',
        'hold_manager_id',
        'hold_manager_name',
        'name'
    ];

    /**
     * 获取订单列表
     *
     * @param array $params
     * @param integer $pageNumber
     * @return array
     */
    public function getOrderList($params, $pageNumber = 15)
    {
        $manager = Managers::select('id as manager_id', 'name as manager_name')->where('access_token', $params['accessToken'])->first();

        $list = Orders::select($this->orderList)
            ->where(function ($query) use ($params, $manager){
                // 逻辑删除判断
                if ($params['purpose'] == 'deal') {
                    $query->where('hold_manager_id', $manager['manager_id']);
                }
                // 如果有姓名搜索项
                if ($params['code']) {
                    $query->where('code','like','%'.$params['code'].'%');
                }
                // 如果有手机号搜索项
                if ($params['phone']) {
                    $query->where('phone','like','%'.$params['phone'].'%');
                }
                // 如果有技能id搜索项
                if ($params['service_category_id']) {
                    $query->where('service_category_id',$params['service_category_id']);
                }
                // 如果有姓名搜索项
                if ($params['source']) {
                    $query->where('source', $params['source']);
                }
                // 如果有订单类型
                if ($params['type']) {
                    $query->where('type', $params['type']);
                }
            })
            ->paginate($pageNumber)
            ->toArray();
        return $list;
    }

    /**
     * 根据订单id获取需求订单
     *
     * @param int $id
     * @return object
     */
    public function getOrderById($id)
    {
        $order = Orders::select(['id as order_id','code','create_manager_id','create_manager_name','sign_manager_id','sign_manager_name','hold_manager_id','hold_manager_name','maintain_manager_id','maintain_manager_name','user_id','user_name','phone','service_category_id','name','service_address','service_start_time','service_end_time','source','remark','unit','service_count','unit_price','total_price','pay_wage','wage_count','wage_price','type','created_at','version'])->where('id', $id)->first();
        
        if (empty($order)) {
            send_msg_json(ERROR_RETURN, "该订单不存在");
        }
        return $order->toArray();
    }

    public function getOrderStaffById($id)
    {
        return $orderStaff = OrderStaff::select(['id as order_staff_id','order_id','staff_id','staff_code','staff_name','type'])->where('order_id', $id)->where('type','!=','refuse')->get()->toArray();
    }

    public function getOrderFileByid($id)
    {
        return $orderFile = OrderFiles::select(['id as order_file_id','order_id','name','url as path'])->where('order_id', $id)->get()->toArray();
    }

    public function getOrderLogById($id)
    {
        $orderLog = OrderLogs::select(['id as order_log_id','order_id','manager_id','manager_name','staff_id','staff_name','message','created_at','type'])->where(['order_id'=>$id])->get()->toArray();
        return $orderLog;
    }

    public function createOrder($params, $accessToken)
    {
        // 新增订单
        $user = $this->getUserByPhone($params['phone']);
        if (empty($user)) {
            $params['user_id'] = $this->saveUser(array(
                'phone' => $params['phone'],
                'name' => $params['user_name']
            ), $accessToken);
        } else {
            $params['user_id'] = $user->id;
        }
        // 通过accessToken获取管理员信息
        $manager = $this->getManagerByToken($accessToken);

        $order = new Orders;
        $order->created_at = time();
        $order->create_manager_id = $manager['manager_id'];
        $order->create_manager_name = $manager['manager_name'];
        $order->hold_manager_id = $manager['manager_id'];
        $order->hold_manager_name = $manager['manager_name'];
        $order->user_id = $params['user_id'];
        $order->user_name = $params['user_name'];
        $order->phone = $params['phone'];
        $order->service_category_id = $params['service_category_id'];
        $order->name = $params['name'];
        $order->service_start_time = $params['service_start_time']/1000;
        $order->service_end_time = $params['service_end_time']/1000;
        $order->service_address = $params['service_address'];
        $order->source = $params['source'];
        $order->remark = $params['remark'];
        // 待匹配状态
        $order->type = 1;
        DB::transaction(function () use ($order) {
            $order->save();
            // 根据订单id设置订单号
            $code = date("Ymd").sprintf("%04d", rand(0,9999)).sprintf("%07d", $order->id);
            $order->code = $code;
            $order->save();
        });
        
        return $order->id;
    }

    /**
     * 根据用户手机查询用户
     *
     * @param string $phone
     * @return object
     */
    private function getUserByPhone($phone)
    {
        $user = Users::where(['phone'=>$phone])->first();

        return $user;
    }

    /**
     * 新增或编辑用户
     *
     * @param array $params
     * @return int
     */
    private function saveUser($params, $accessToken)
    {
        $user = new Users;

        $user->phone = $params['phone'];
        $user->name = $params['name'];

        $user->save();
        return $user->id;
    }

    public function createOrderStaff($params)
    {
        $orderStaff = OrderStaff::where(['order_id'=>$params['order_id'], 'staff_id'=>$params['staff_id'], 'type'=> 'unsign'])->first();
        if (!empty($orderStaff)) {
            send_msg_json(ERROR_RETURN, "该服务人员已匹配");
        }
        DB::transaction(function () use ($params) {
            // 添加订单服务人员
            OrderStaff::insert(['order_id'=>$params['order_id'], 'staff_id'=>$params['staff_id'], 'staff_name'=>$params['staff_name'], 'staff_code'=>$params['staff_code']]);
            // 修改订单为已匹配状态
            Orders::where('id', $params['order_id'])->update(['type'=>2]);
        });
        
        return true;
    }

    /**
     * 删除匹配人员
     *
     * @param array $params
     * @return string
     */
    public function deleteOrderStaff($params)
    {
        DB::transaction(function () use ($params){
            // 删除订单匹配人员
            OrderStaff::where('id', $params['order_staff_id'])->delete();
            // 计算改订单有几个匹配人员,如果为0，则把订单改为待匹配
            if (empty(OrderStaff::where('order_id', $params['order_id']))) {
                Orders::where('id', $params['order_id'])->update(['type'=>1]);
            }
        });
        
        return true;
    }

    /**
     * 签约
     *
     * @param [type] $params
     * @return void
     */
    public function sign($params, $accessToken)
    {
        $order = Orders::find($params['order_id']);
        if (empty($order)) {
            send_msg_json(ERROR_RETURN, "该订单不存在");
        }
        if ($order->version != $params['version']) {
            send_msg_json(ERROR_RETURN, "数据错误，请刷新页面");
        }
        // 获取备选人员信息
        $staff = Staff::where('id', $params['staff_id'])->first();
        if ($staff->type == 'disable') {
            send_msg_json(ERROR_RETURN, "该服务人员已经停用");
        }
        $total_price = sprintf("%.2f", $params['service_count'] * $params['unit_price']);
        if ($total_price != $params['total_price']) {
            send_msg_json(ERROR_RETURN, "价格计算有误，请重新填写");
        }
        // 通过accessToken获取管理员信息
        $manager = $this->getManagerByToken($accessToken);
        // 签约人id
        $order->sign_manager_id = $manager['manager_id'];
        // 签约姓名
        $order->sign_manager_name = $manager['manager_name'];
        $order->unit = $params['unit'];
        $order->service_count = $params['service_count'];
        $order->unit_price = $params['unit_price'];
        $order->total_price = $params['total_price'];
        $order->pay_wage = $params['pay_wage'];
        $order->wage_count = $params['wage_count'];
        $order->wage_price = $params['wage_price'];
        $order->type = 3;
        $order->version = $params['version']+1;
        // 如果时间修改了则修改时间
        if (!(empty($params['service_start_time']) || empty($params['service_end_time']))) {
            $order->service_start_time = $params['service_start_time']/1000;
            $order->service_end_time = $params['service_end_time']/1000;
        }
        DB::transaction(function () use ($order, $params,$manager, $accessToken) {
            // 保存订单
            $order->save();
            // 修改订单服务人员
            OrderStaff::where('id', $params['order_staff_id'])->update(['type'=>'sign']);
            // 修改服务人员表变为正常
            Staff::whereRaw('`id` in (SELECT `staff_id` FROM `order_staff` WHERE `order_id` = (?))', [$params['order_id']])->update(['status'=>'normal']);
            // 把服务人员表中该id的服务人员改为:已签约
            Staff::where('id', $params['staff_id'])->update(['type'=>'sign']);
            // 订单合同文件上传
            $this->saveOrderFile($params['paper'], $params['order_id']);
            // 写日志
            $this->writeOrderLog(array(
                'order_id'=>$params['order_id'],
                'message'=>'订单已签约，操作者：'.$manager['manager_id'].'|'.$manager['manager_name'],
                'staff_id'=>$params['staff_id'],
                'staff_name'=>$params['staff_name'],
                'type'=>'sign'
            ), $accessToken);
        });

        return true;
    }

    /**
     * 订单合同文件上传
     *
     * @param [type] $paper
     * @param [type] $order_id
     * @return booleon
     */
    private function saveOrderFile($paper, $order_id)
    {
        if (!empty($paper)) {
            array_walk($paper, function (&$item) use ($order_id){
                // 移动图片
                if ($item['path'] != '') {
                    $url = move_upload_file($item['path'], 'order');
                    
                    DB::table('order_files')->insert(['order_id'=>$order_id,'name'=>$item['name'],'url'=>$url]);
                }
                
            });
        }
        return true;
    }

    /**
     * 拒签
     *
     * @param [type] $params
     * @return void
     */
    public function refuse($params, $accessToken){

        DB::transaction(function () use ($params, $accessToken) {
            OrderStaff::where('id', $params['order_staff_id'])->update(['type'=>'refuse']);
            // 写入签约日志
            if ($params['message'] != '') {
                $this->writeOrderLog(array(
                    'order_id'=>$params['order_id'],
                    'message'=>$params['message'],
                    'staff_id'=>$params['staff_id'],
                    'staff_name'=>$params['staff_name'],
                    'type'=>'sign'
                ), $accessToken);
            }
        });

        return true;
    }

    public function writeOrderLog($params, $accessToken)
    {
        $created_at = time();

        $manager = $this->getManagerByToken($accessToken);
        if (!array_key_exists('staff_id', $params)) {
            $params['staff_id'] = 0;
        }
        if (!array_key_exists('staff_name', $params)) {
            $params['staff_name'] = '无';
        }
        OrderLogs::insert(['order_id'=>$params['order_id'], 'manager_id'=>$manager['manager_id'], 'manager_name'=>$manager['manager_name'], 'message'=>$params['message'],'staff_id'=>$params['staff_id'],'staff_name'=>$params['staff_name'], 'created_at'=>$created_at, 'type'=>$params['type']]);

        return true;
    }
    /**
     * 取消订单
     *
     * @param [type] $params
     * @return boolean
     */
    public function cancelOrderById($params, $accessToken)
    {
        DB::transaction(function () use ($params, $accessToken){

            Orders::where('id', $params['order_id'])->update(['type'=>4]);

            $this->writeOrderLog(array(
                'order_id'=>$params['order_id'],
                'message'=>$params['message'],
                'type'=>'normal'
            ), $accessToken);
        });

        return true;
    }

    public function completeOrderById($params, $accessToken)
    {
        DB::transaction(function () use ($params, $accessToken){
            
            Orders::where('id', $params['order_id'])->update(['type'=>5]);
            
            $this->writeOrderLog(array(
                'order_id'=>$params['order_id'],
                'message'=>$params['message'],
                'type'=>'normal'
            ), $accessToken);
        });

        return true;
    }

    /**
     * 派发订单
     *
     * @param [type] $accessToken
     * @return array
     */
    public function assignOrder($params, $accessToken)
    {
        $order = Orders::find($params['order_id']);
        if (empty($order)) {
            send_msg_json(ERROR_RETURN, "该订单不存在");
        }
        if ($order->version != $params['version']) {
            send_msg_json(ERROR_RETURN, "数据错误，请刷新页面");
        }
        // 原订单持有者id
        $original_hold_manager_id = $order->hold_manager_id;
        // 原订单持有者姓名
        $original_hold_manager_name = $order->hold_manager_name;
        
        $order->hold_manager_id = $params['manager_id'];
        $order->hold_manager_name = $params['manager_name'];
        $order->version = $params['version']+1;

        DB::transaction(function () use ($params, $order, $accessToken, $original_hold_manager_id, $original_hold_manager_name){
            // 订单更新
            $order->save();
            // 填写流转日志
            $this->writeOrderLog(array(
                'order_id'=>$params['order_id'],
                'message'=>'管理员派单，原持有者：'.$original_hold_manager_id.'|'.$original_hold_manager_name.'=>现持有者：'.$params['manager_id'].'|'.$params['manager_name'],
                'type'=>'assign'
            ), $accessToken);
        });

        return true;
    }

    /**
     * 通过token获取manager
     *
     * @param string $accessToken
     * @return array array
     */
    private function getManagerByToken($accessToken)
    {
        $manager = Managers::select('id as manager_id', 'name as manager_name')->where('access_token', $accessToken)->first();
        if (empty($manager)) {
            send_msg_json(ERROR_RETURN, "该管理员不存在");
        }

        return $manager->toArray();
    }
}
