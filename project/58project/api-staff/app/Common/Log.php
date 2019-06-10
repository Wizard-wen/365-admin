<?php
/**
 * User: 唐朝
 * Date: 2018/9/5
 * Time: 13:30
 */

namespace App\Common;

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

/**
 * 操作日志
 * Class Log
 * @package App\Services
 */
class Log
{
    /**
     * 单例模式
     * @var object
     */
    private static $_instance;
    /**
     * @var 日志数据库当前操作表名称
     */
    /**
     *
     * @var string
     */
    private $tableName;
    /**
     * @var 日志数据库当前链接
     */
    private $conn;

    /**
     * 日志数据名称
     */
    const LOG_DB_DATABASE = "framework_log";

    /**
     * 初始化函数
     * OperateLog constructor.
     */
    private function __construct()
    {
        $this->createTable();
    }

    /**
     * 禁止克隆
     */
    private function __clone()
    {
    }

    /**
     * 单例模式
     * @return OperateLog
     */
    public static function getInstance()
    {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    /**
     * 创建日志表
     */
    private function createTable()
    {
        //日志表名
        $this->tableName = "log_" . date("Ym");
        //数据库链接
        $this->conn = Schema::connection(self::LOG_DB_DATABASE);
        //是否存在此表
        if (!$this->conn->hasTable($this->tableName)) {
            //创建表
            $this->conn->create($this->tableName, function (Blueprint $table) {
                // 指定表存储引擎
                $table->engine = 'InnoDB';
                // 指定数据表的默认字符集
                $table->charset = 'utf8mb4';
                // 指定数据表默认的排序规则
                $table->collation = 'utf8mb4_general_ci';
                //主键
                $table->increments('id');
                // 操作者id
                $table->integer('manager_id')->default(0);
                //操作者
                $table->string('name', 50)->default('');
                // ip
                $table->string('ip', 20)->default('');
                //操作信息
                $table->string('message',200)->default('');
                //时间
                $table->integer('created_at')->default(0);
            });
        }
    }

    /**
     * 记录日志
     * @param array $data 备注
     * @return boolean true 成功
     */
    public function writeLog($params = [])
    {
        //当前路由
        DB::connection(self::LOG_DB_DATABASE)->table($this->tableName)->insert([
            [
                //金额
                'manager_id' => $params['manager_id'],
                //标题
                'name' => $params['name'],
                // ip
                'ip' => $params['ip'],
                //描述
                'message' => $params['message'],
                // 操作者id
                'created_at' => $params['created_at'],
            ]
        ]);
        
        return true;
    }
}
