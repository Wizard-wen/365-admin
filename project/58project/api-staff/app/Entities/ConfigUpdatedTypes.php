<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;

class ConfigUpdatedTypes extends Model
{
    /**
     * 与模型关联的数据表
     *
     * @var string
     */
    protected $table = 'config_updated_types';

    /**
     * 该模型是否被自动维护时间戳
     *
     * @var bool
     */
    public $timestamps = false;
}
