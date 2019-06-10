<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\DB;

class Admin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        // 接收accessToken
        $accessToken = trim($request->header('accessToken',''));
        // 检查token是否传入
        if ($accessToken == '') {
            send_msg_json(ERROR_RETURN, "请传入访问令牌");
        }
        // 根据accessToken查询管理员信息
        $manager = DB::table('managers')->select(['id','name','account','access_token','expire'])->where('access_token', $accessToken)->first();
        if (empty($manager)) {
            send_msg_json(ACCESS_TOKEN_IS_ERROR, "访问令牌错误");
        }
        // 判断token是否过期
        if (time() > $manager->expire) {
            send_msg_json(ACCESS_TOKEN_IS_EXPIRE, '访问令牌已过期');
        }
        // // 获取路由信息
        // $router = $request->path();
        // // 该用户所有权限
        // $permissions = $this->getPermissionByManagerId($manager->id);
        // // 判断是否有该路由权限
        // if (!in_array($router, $permissions)) {
        //     send_msg_json(ERROR_RETURN, "没有".$router."权限");
        // }
        
        return $next($request);
    }

    /**
     * 根据管理员id查询所有权限
     *
     * @param int $id
     * @return array
     */
    private function getPermissionByManagerId($id)
    {
        $data = DB::select("SELECT `router` FROM `permissions` WHERE `id` IN (SELECT `permission_id` FROM `permission_role` WHERE `role_id` IN (SELECT `role_id` FROM `role_manager` WHERE `manager_id` = $id)) ORDER BY sort_order ASC");
        
        $permissions = array_column($data, 'router');

        return $permissions;
    }
}
