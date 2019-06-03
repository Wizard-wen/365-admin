<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;

class StaffPapers extends Model
{
    /**
     * 与模型关联的数据表
     *
     * @var string
     */
    protected $table = 'staff_papers';

    /**
     * 该模型是否被自动维护时间戳
     *
     * @var bool
     */
    public $timestamps = false;
}
