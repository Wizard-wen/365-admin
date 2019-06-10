<?php

namespace App\Common;

// use GatewayWorker\Lib\Gateway as GatewayServer;

class Events
{

    public static function onWorkerStart($businessWorker)
    {

    }

    /**
     * 当客户端连接时触发
     * 如果业务不需此回调可以删除onConnect
     */
    public static function onConnect($client_id)
    {

    }

    public static function onWebSocketConnect($client_id, $data)
    {

    }

    public static function onMessage($client_id, $message)
    {

    }

    /**
     * 当用户断开连接时触发
     * @param int $client_id 连接id
     */
    public static function onClose($client_id)
    {
        GatewayServer::closeClient($client_id);
    }
}