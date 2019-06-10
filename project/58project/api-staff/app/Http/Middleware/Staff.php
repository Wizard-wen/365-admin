<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\DB;

class Staff
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
        $token = $request->input('token','');
        if ($token == '') {
            die('请传入token');
        }
        $user = DB::table('workers')->select(['id','name','phone','token','icon'])->where('token', $token)->first();
        dd($user);
        if (empty($user)) {
            die('token不存在');
        }
        if (time() > $user->expire) {
            die('token已过期');
        }
        return $next($request);
    }
}
