<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller;
use App\Services\Admin\LogService;
use Illuminate\Support\Facades\DB;


use Maatwebsite\Excel\Facades\Excel;


class LogController extends Controller
{
    public function getLogList(Request $request)
    {
        $logService = new LogService;
        // 开始时间戳
        $startTime = trim($request->input('startTime',''));
        // 结束时间戳
        $endTime = trim($request->input('endTime',''));
        // 名字
        $params['name'] = trim($request->input('name',''));

        $pageNumber = (int)trim($request->input('pageNumber', 15));
        // 当不传时间时按当天计算
        if ($startTime == '' || $endTime == '') {
            // 该月第一天时间戳
            $startTime = strtotime(date("Y-m-01"));
            // 当天时间戳
            $endTime = time();
        }
        // 判断是否可以跨月份
        if (date("m", $startTime) != date("m", $endTime)) {
            send_msg_json(ERROR_RETURN, "查询日期不能跨月");
        }
        // 指定查询表
        $table = 'log_'.date('Ym',$startTime);
        
        $list = $logService->getLogList($startTime, $endTime, $table, $params, $pageNumber);
        // 开始时间
        $list['startTime'] = $startTime;
        // 结束时间
        $list['endTime'] = $endTime;

        return send_msg_json(SUCCESS_RETURN, "success", $list);
    }
}
