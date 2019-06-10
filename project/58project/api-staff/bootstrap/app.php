<?php
require_once __DIR__.'/../vendor/autoload.php';

try {
    (new Dotenv\Dotenv(__DIR__.'/../'))->load();
} catch (Dotenv\Exception\InvalidPathException $e) {
    die('can not get .env');
}

/*
|--------------------------------------------------------------------------
| Create The Application
|--------------------------------------------------------------------------
|
| Here we will load the environment and create the application instance
| that serves as the central piece of this framework. We'll use this
| application as an "IoC" container and router for this framework.
|
*/

$app = new Laravel\Lumen\Application(
    realpath(__DIR__.'/../')
);

$app->withFacades();

$app->withEloquent();
// 常规配置
$app->configure('config');
// 添加错误码
$app->configure('code');
// 邮件配置
$app->configure('mail');
// excel配置
$app->configure('excel');

$app->singleton('mailer', function () use ($app) {
    return $app->loadComponent('mail', Illuminate\Mail\MailServiceProvider::class, 'mailer');
});

/*
|--------------------------------------------------------------------------
| Register Container Bindings
|--------------------------------------------------------------------------
|
| Now we will register a few bindings in the service container. We will
| register the exception handler and the console kernel. You may add
| your own bindings here if you like or you can make another file.
|
*/

$app->singleton(
    Illuminate\Contracts\Debug\ExceptionHandler::class,
    App\Exceptions\Handler::class
);

$app->singleton(
    Illuminate\Contracts\Console\Kernel::class,
    App\Console\Kernel::class
);

/*
|--------------------------------------------------------------------------
| Register Middleware
|--------------------------------------------------------------------------
|
| Next, we will register the middleware with the application. These can
| be global middleware that run before and after each request into a
| route or middleware that'll be assigned to some specific routes.
|
*/

$app->routeMiddleware([
    'user' => App\Http\Middleware\User::class,
    'admin' => App\Http\Middleware\Admin::class,
    'staff' => App\Http\Middleware\Staff::class,
]);

/*
|--------------------------------------------------------------------------
| Register Service Providers
|--------------------------------------------------------------------------
|
| Here we will register all of the application's service providers which
| are used to bind services into the container. Service providers are
| totally optional, so you are not required to uncomment this line.
|
*/

$app->register(App\Providers\AppServiceProvider::class);
// $app->register(App\Providers\AuthServiceProvider::class);
// $app->register(App\Providers\EventServiceProvider::class);
// 注入PHPExcel
$app->register(Maatwebsite\Excel\ExcelServiceProvider::class);
/*
|--------------------------------------------------------------------------
| Load The Application Routes
|--------------------------------------------------------------------------
|
| Next we will include the routes file so that they can all be added to
| the application. This will provide all of the URLs the application
| can respond to, as well as the controllers that may handle them.
|
*/
// 后台路由配置
$app->router->get('/', function () use ($app) {
    // return $app->version();
    return "Hello boy~";
});
// 后台管理路由配置
$app->router->group([
    'namespace' => 'App\Http\Controllers\Admin',
    'prefix' => 'admin'
], function ($router) {
    require __DIR__.'/../routes/admin.php';
});
// 客户端路由配置
$app->router->group([
    'namespace' => 'App\Http\Controllers\User',
    'prefix' => 'user'
], function ($router) {
    require __DIR__.'/../routes/user.php';
});
// 服务人员路由配置
$app->router->group([
    'namespace' => 'App\Http\Controllers\Staff',
    'prefix' => 'staff',
], function ($router) {
    require __DIR__.'/../routes/staff.php';
});

return $app;
