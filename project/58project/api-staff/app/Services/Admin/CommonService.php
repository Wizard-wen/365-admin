<?php

namespace App\Services\Admin;

use App\Entities\ConfigServiceCategories;
use App\Entities\ConfigServiceCrowds;
use App\Entities\ConfigPaperCategories;
use App\Entities\Managers;
use App\Entities\Permissions;

class CommonService 
{
    /**
     * 获取工种作为生成树结构前提
     *
     * @return void
     */
    public function getServiceSelection($type = '')
    {
        return ConfigServiceCategories::select(['id','name'])
                    ->where(function ($query) use ($type) {
                        // 只查询已经启用的
                        if ($type == 'enable') {
                            $query->where('type', 'enable');
                        }
                    })
                    ->get()
                    ->toArray();
    }

    /**
     * 获取标签作为生成树结构前提
     *
     * @return array
     */
    public function getLabelSelection($type = '')
    {
        return ConfigServiceCrowds::select(['id','name'])
                    ->where(function ($query) use ($type) {
                        // 只查询已经启用的
                        if ($type == 'enable') {
                            $query->where('type', 'enable');
                        }
                    })
                    ->get()
                    ->toArray();
    }

    /**
     * 获取证书类型
     *
     * @return array
     */
    public function getPaperSelection($type = '')
    {
        return ConfigPaperCategories::where(function ($query) use ($type){
            if ($type == 'enable') {
                $query->where('type', 'enable');
            }
        })
        ->get()
        ->toArray();
    }

    /**
     * 获取权限作为生成树结构前提
     *
     * @return array
     */
    public function getPermissionForTree()
    {
        return Permissions::select(['id','parent_id','title'])->get()->keyBy('id')->toArray();
    }

    /**
     * 获取管理员下拉数据
     *
     * @return array
     */
    public function getManagerSelection()
    {
        return Managers::select(['id as manager_id','name as manager_name'])->get()->toArray();
    }
}
