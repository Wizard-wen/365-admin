<?php

namespace App\Services\Admin;

use App\Entities\Stores;
use App\Entities\Managers;

use Illuminate\Support\Facades\DB;

class StoreService 
{    
    /**
     * 获取门店列表
     *
     * @param integer $pageNumber
     * @return array
     */
    public function getStoreList($params, $pageNumber = 15)
    {
        return Stores::select(['id','name','address','is_third'])
                ->where(function ($query) use ($params){
                    // 如果有姓名搜索项
                    if ($params['name']) {
                        $query->where('name','like','%'.$params['name'].'%');
                    }
                    // 如果有姓名搜索项
                    if ($params['is_third']) {
                        $query->where('is_third', $params['is_third']);
                    }
                })
                ->paginate($pageNumber)
                ->toArray();
    }

    public function getStoreSelection()
    {
        return Stores::select(['id','name'])->get()->keyBy('id')->toArray();
    }

    /**
     * 根据id获取门店
     *
     * @param integer $pageNumber
     * @return array
     */
    public function getStoreById($id)
    {
        $store = Stores::select(['id','name','address','is_third','phone','start_time','end_time','remarks','type','manager_id','manager_name','created_at'])->find($id)->toArray();
        $store['staff_count'] = Managers::select('id')->where('store_id', $id)->count();
        return $store;
    }
    
    /**
     * 根据id获得门店的人员
     *
     * @param integer $id
     * @return array
     */
    public function getStoreManagerArray($id)
    {
        return Managers::select(['id','name'])->whereIn('store_id', [0, $id])->where('id','!=',1)->get()->toArray();
    }

    public function getStoreManagerIds($id)
    {
        return Managers::select(['id','name'])->where('store_id', $id)->get()->toArray();
    }

    /**
     * 保存门店信息
     *
     * @param array $params
     * @return boolean
     */
    public function saveStore($params)
    {
        if ($params['id'] == 0) {
            $store = new Stores;
            if (!empty($this->getStoreByName($params['name']))) {
                send_msg_json(ERROR_RETURN, "该门店已存在");
            }
        } else {
            $store = Stores::find($params['id']);
            if (empty($store)) {
                send_msg_json(ERROR_RETURN, "该门店不存在");
            }
        }

        $store->name = $params['name'];
        $store->address = $params['address'];
        $store->is_third = $params['is_third'];
        $store->phone = $params['phone'];
        $store->start_time = $params['start_time'];
        $store->end_time = $params['end_time'];
        $store->type = $params['type'];
        $store->remarks = $params['remarks'];
        $store->created_at = time();
        
        DB::transaction(function () use ($store, $params){
            $store->save();
            // 保存后的id
            $saveId = $store->id;
            // 保存账号和角色
            $this->saveStoreManager($saveId, $params['name'], $params['manager_ids']);
        });

        return true;
    }

    /**
     * 根据门店名获取门店信息
     *
     * @param string $name
     * @return array
     */
    public function getStoreByName($name)
    {
        return Stores::select(['id','name','address','is_third','type'])->where('name',$name)->first();
    }

    /**
     * 保存门店信息
     *
     * @param array $params
     * @return boolean
     */
    public function saveStoreManager($id, $name, $manager_ids)
    {
        DB::transaction(function () use ($id, $name, $manager_ids){
            // 先清零
            Managers::where('store_id', $id)->update(['store_id'=>0,'store_name'=>'']);
            // 再赋值
            Managers::whereIn('id', $manager_ids)->update(['store_id'=>$id,'store_name'=>$name]);
        });
        return true;
    }

    public function getStoreManagerList($params, $pageNumber)
    {
        return Managers::select(['id','name','phone'])
                ->where(function ($query) use ($params){
                    $query->where('store_id', $params['id']);
                })
                ->paginate($pageNumber)
                ->toArray();
    }
}
