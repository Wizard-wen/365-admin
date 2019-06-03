<?php

namespace App\Console\Commands;

use GatewayWorker\BusinessWorker;
use GatewayWorker\Gateway;
use GatewayWorker\Register;
use Illuminate\Console\Command;
use Workerman\Worker;

class WorkermanCommand extends Command
{

    protected $signature = 'workman {action} {--d}';

    protected $description = 'Start a Workerman server.';

    /*
     * 操作参数
     * 注意只能在
     * start 启动
     * stop 停止
     * relaod  只能重启逻辑代码，核心workerman_init无法重启，注意看官方文档
     * status 查看状态
     * connections 查看连接状态（需要Workerman版本>=3.5.0）
     * 
     * 库 composer require workerman/workerman
     */
    protected $action = array('start', 'stop', 'reload', 'status', 'connections');

    public function handle()
    {
        // 检查OS
        if (strpos(strtolower(PHP_OS), 'win') === 0) {
            $this->error("Sorry, not support for windows.\n");
            exit;
        }

        global $argv;
        $action = $this->argument('action');
        if (!in_array($action, $this->action)) {
            $this->error('Error Action');
            exit;
        }
        $argv[0] = 'wk';
        $argv[1] = $action;
        $argv[2] = $this->option('d') ? '-d' : '';

        $this->start();
    }

    private function start()
    {
        $this->startGateWay();
        $this->startBusinessWorker();
        $this->startRegister();
        Worker::runAll();
    }

    private function startBusinessWorker()
    {
        $worker                  = new BusinessWorker();
        $worker->name            = 'BusinessWorker';
        $worker->count           = 1;
        $worker->registerAddress = '127.0.0.1:1236';
        $worker->eventHandler    = \App\Common\Events::class;
    }

    private function startGateWay()
    {
        $gateway = new Gateway("websocket://0.0.0.0:2346");
        $gateway->name                 = 'Gateway';
        $gateway->count                = 1;
        $gateway->lanIp                = '127.0.0.1';
        $gateway->startPort            = 2300;
        $gateway->pingInterval         = 30;
        $gateway->pingNotResponseLimit = 0;
        $gateway->pingData             = '{"type":"@heart@"}';
        $gateway->registerAddress      = '127.0.0.1:1236';
    }

    private function startRegister()
    {
        new Register('text://0.0.0.0:1236');
    }
}