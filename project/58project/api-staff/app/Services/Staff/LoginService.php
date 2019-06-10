<?php

namespace App\Services\Staff;

use App\Entities\Workers;
use Illuminate\Support\Facades\DB;

class LoginService 
{
    public function hasRegisterByPhone($phone)
    {
        $data = Workers::where('phone', $phone)->first();

        if (empty($data)) {
            return false;
        } else {
            return true;
        }
    }

    public function register($name, $phone, $password)
    {
        // 加密后的密码
        $encryptPwd = md5('worker'.$password);
        
        $user = new Workers;
        $user->name = $name;
        $user->phone = $phone;
        $user->password = $encryptPwd;
        return $user->save();
    }

    public function login($phone, $password)
    {
        // 过期时间
        $expire = time() + 86400 * 3;
        // token
        $token = md5(time().$phone);
        // 加密后的密码
        $encryptPwd = md5('worker'.$password);

        $user = Workers::where(['phone'=>$phone, 'password'=>$encryptPwd])->first();
        if (empty($user)) {
            die('帐户名密码错误');
        } else {
            $user->expire = $expire;
            $user->token = $token;
            $user->save();
            return $user->token;
        }
    }
}
