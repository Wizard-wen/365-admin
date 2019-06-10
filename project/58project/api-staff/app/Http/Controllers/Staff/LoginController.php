<?php

namespace App\Http\Controllers\Staff;

use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller;
use App\Services\Staff\LoginService;

class LoginController extends Controller
{
    /**
     * 会员注册
     *
     * @param Request $request
     * @return string
     */
    public function register(Request $request)
    {
        $loginService = new LoginService;
        // 昵称
        $name = $request->input('name','');
        // 电话号
        $phone = $request->input('phone','');
        // 密码
        $password = $request->input('password','');
        // 二次输入密码
        $rePassword = $request->input('rePassword','');
        // 验证码，暂时没有
        $captcha = $request->input('captcha','');
        if ($name == '') {
            send_msg_json(10000,"请输入姓名");
        }
        if ($phone == '') {
            send_msg_json(10001,"请输入手机号");
        }
        // 验证手机号格式
        if (!verify_phone($phone)) {
            send_msg_json(ERROR_RETURN, "手机号格式错误");
        }
        if ($password == '') {
            send_msg_json(10002,"请输入密码");
        }
        if ($rePassword == '') {
            send_msg_json(10003,"请再次确认密码");
        }
        if ($password != $rePassword) {
            send_msg_json(10004,"确认密码错误");
            return '确认密码错误';
        }
        if ($loginService->hasRegisterByPhone($phone)) {
            send_msg_json(10005,"该电话已经被注册");
        }

        $loginService->register($name, $phone, $password);

        send_msg_json(0,"注册成功");
    }

    /**
     * 
     * 管理员登陆
     *
     * @param Request $request
     * @return string
     */
    public function login(Request $request)
    {
        $loginService = new LoginService;
        // 电话号
        $phone = $request->input('phone','');
        // 密码
        $password = $request->input('password','');
        if ($phone == '') {
            send_msg_json(10001,"请输入手机号");
        }
        // 验证手机号格式
        if (!verify_phone($phone)) {
            send_msg_json(ERROR_RETURN, "手机号格式错误");
        }
        if ($password == '') {
            send_msg_json(10002,"请输入密码");
        }
        if (!$loginService->hasRegisterByPhone($phone)) {
            send_msg_json(10006,"该电话号未注册");
        }
        $token = $loginService->login($phone, $password);
        
        send_msg_json(0,"登录成功",["token" => $token]);
    }
}
