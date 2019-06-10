<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller;
use App\Services\Admin\LoginService;
use App\Services\Admin\PermissionService;

class LoginController extends Controller
{
    /**
     * 
     * 管理员登录
     *
     * @param Request $request
     * @return string
     */
    public function login(Request $request)
    {
        $loginService = new LoginService;

        $permissionService = new PermissionService;
        // 电话号
        $account = trim($request->input('account',''));
        // 密码
        $password = trim($request->input('password',''));
        if ($account == '') {
            send_msg_json(ERROR_RETURN, "请输入账号");
        }
        if ($password == '') {
            send_msg_json(ERROR_RETURN, "请输入密码");
        }
        $manager = $loginService->login($account, $password);
        if ($manager->type == 'disable') {
            send_msg_json(ERROR_RETURN, "该账户已经停用，请联系超管");
        }
        // 获取管理员id
        $id = $manager->id;
        // 根据用户id查询角色id组
        $permissions = $permissionService->getPermissionByManagerId($id);
        // 生成侧拉菜单
        $tree = getTree($permissions, true);
        $data = array(
            "manager" => $manager,
            "tree" => $tree
        );
        $data['manager']['role_name'] = $permissionService->getRoleNamesByManagerId($id);
        send_msg_json(SUCCESS_RETURN,"登录成功",$data);
    }

    /**
     * 更换accesstoken
     *
     * @param Request $request
     * @return string
     */
    public function changeToken(Request $request)
    {
        $loginService = new LoginService;
        // 接收accessToken
        $refreshToken = trim($request->input('refreshToken',''));
        // 检查token是否传入
        if ($refreshToken == '') {
            send_msg_json(REFRESH_TOKEN_IS_ERROR,"请传入刷新令牌");
        }
        $data = $loginService->changeToken($refreshToken);

        send_msg_json(SUCCESS_RETURN,"刷新令牌成功",$data);
    }
}
