<?php

namespace App\Services\Admin;

use Illuminate\Support\Facades\DB;

class LogService 
{
    public function getLogList($startTime, $endTime, $table, $params, $pageNumber = 15)
    {
        // 分页查询
        try {
            $list = DB::connection('framework_log')
                ->table($table)
                ->select(['id','manager_id','name','ip','message','created_at'])
                ->where(function ($query) use ($startTime, $endTime, $params) {
                    // 指定时间范围
                    $query->whereBetween('created_at', [$startTime, $endTime]);
                    // 如果有搜索项
                    if ($params['name']) {
                        $query->where('name', $params['name']);
                    }
                })->orderBy('id','desc')
                ->paginate($pageNumber)
                ->toArray();
        } catch (\Exception $e) {
            $list['current_page'] = 1;
            $list['data'] = [];
            $list['from'] = null;
            $list['last_page'] = 1;
            $list['next_page_url'] = null;
            $list['per_page'] = 15;
            $list['prev_page_url'] = null;
            $list['to'] = null;
            $list['total'] = 0;
        }

        return $list;
    }
}
