<?php

namespace App\Services\Admin;

use App\Entities\Managers;
use App\Entities\RoleManager;
use App\Entities\Roles;
use App\Entities\PermissionRole;
use App\Entities\Permissions;
use Illuminate\Support\Facades\DB;

class PermissionService 
{
    /**
     * 获取管理员列表
     *
     * @param integer $pageNumber
     * @return array
     */
    public function getManagerList($params, $pageNumber = 15)
    {
        $list = Managers::select(['id','account','name','department_id','store_id','store_name','type'])
                        ->where(function ($query) use ($params){
                            // 如果有姓名搜索项
                            if ($params['name']) {
                                $query->where('name','like','%'.$params['name'].'%');
                            }
                            // 门店id
                            if (!empty($params['store_id'])) {
                                $query->where('store_id', $params['store_id']);
                            }
                            // 部门id
                            if (!empty($params['department_id'])) {
                                $query->where('department_id', $params['department_id']);
                            }
                        })
                        ->paginate($pageNumber)
                        ->toArray();

        return $list;
    }

    /**
     * 获取角色列表
     *
     * @param boolean $paginate 可带分页或不分页
     * @param integer $pageNumber
     * @return void
     */
    public function getRoleList($params, $paginate = true, $pageNumber = 15)
    {
        if ($paginate) {
            $data = Roles::where(function ($query) use ($params){
                if ($params['name']) {
                    $query->where('name','like','%'.$params['name'].'%');
                }
            })->paginate($pageNumber);
        } else {
            $data = Roles::get();
        }

        return $data->toArray();
    }

    /**
     * 根据用户id查询用户绑定的角色id
     *
     * @param int $id
     * @return array
     */
    public function getRoleIdsByManagerId($id)
    {
        return RoleManager::where('manager_id',$id)->pluck('role_id')->toArray();
        
    }

    /**
     * 根据用户id查询用户绑定的角色名称
     *
     * @param int $id
     * @return array
     */
    public function getRoleNamesByManagerId($id)
    {
        return Roles::select('name')->whereIn('id', function ($query) use ($id){
            $query->select('role_id')->from(with(new RoleManager)->getTable())->where('manager_id',$id);
        })->pluck('name')->toArray();
    }

    /**
     * 重新分配用户和角色关系
     *
     * @param [type] $id
     * @param [type] $role
     * @return boolean
     */
    public function saveManagerRole($id, $roleIds)
    {
        $original_roleIds = RoleManager::select('role_id')->where('manager_id', $id)->pluck('role_id')->toArray();
        // 原关系数组与新数组交集
        $array_intersect = array_intersect($roleIds, $original_roleIds);
        // 需要删除的角色id
        $delete_roleIds = implode(",", array_diff($original_roleIds, $array_intersect));
        // 需要添加的角色id
        $add_roleIds = array_diff($roleIds, $array_intersect);
        DB::transaction(function () use ($id, $delete_roleIds, $add_roleIds){
            // 如果存在删除的角色账号关系
            if (!empty($delete_roleIds)) {
                // 先把关系表中与需要删除的删除
                DB::delete("DELETE FROM `role_manager` WHERE `manager_id` = $id AND `role_id` IN ($delete_roleIds)");
            }
            // 重新生成新关系
            if (!empty($add_roleIds)) {
                foreach ($add_roleIds as $value) {
                    DB::table('role_manager')->insert([
                        'manager_id' => $id,
                        'role_id' => $value,
                    ]);
                }
            }
        });

        return true;
    }

    /**
     * 获取管理员信息
     *
     * @param int $id
     * @return array
     */
    public function getManagerById($id)
    {
        $manager = Managers::select(['id','store_id','store_name','department_id','account','clear_password','name','access_token','refresh_token','expire','is_administrator','type','real_name','phone','wechat'])->find($id);
        
        return $manager;
    }

    public function getManagerByAccount($account)
    {
        return Managers::select(['id','account','name','access_token','refresh_token'])->where('account', $account)->first();
    }

    /**
     * 编辑管理员信息
     *
     * @param int $id
     * @param string $params['name']
     * @param string $params['password']
     * @return boolean
     */
    public function saveManager($params)
    {
        if ($params['id'] == 0) {
            $manager = new Managers;
            if (!empty($this->getManagerByAccount($params['account']))) {
                send_msg_json(ERROR_RETURN, "该账号已存在");
            }
            $manager->account = $params['account'];
        } else {
            $manager = Managers::find($params['id']);
            if (empty($manager)) {
                send_msg_json(ERROR_RETURN, "该管理员不存在");
            }
        }

        $manager->name = $params['name'];
        
        $manager->department_id = $params['department_id'];
        $manager->real_name = $params['real_name'];
        $manager->phone = $params['phone'];
        $manager->wechat = $params['wechat'];

        if ($params['password'] != '' && $params['repassword'] != '') {
            if ($params['password'] != $params['repassword']) {
                send_msg_json(ERROR_RETURN, "确认密码输入错误");
            }
            // 加密后密码
            $encryptPwd = md5('manager'.$params['password']);
            // 新token
            $accessToken = md5(time().$manager->account);
            // 新刷新token
            $refreshToken = md5(time().'refresh'.$manager->account);

            $manager->password = $encryptPwd;
            $manager->clear_password = $params['password'];
            // 改密码后token会刷新
            $manager->access_token = $accessToken;
            $manager->refresh_token = $refreshToken;
        }

        DB::transaction(function () use ($manager, $params){
            $manager->save();
            // 保存后的id
            $saveId = $manager->id;
            // 保存账号和角色
            $this->saveManagerRole($saveId, $params['roleIds']);
        });

        return true;
    }

    /**
     * 物理删除管理员
     *
     * @param int $id
     * @return boolean
     */
    public function changeManagerType($id)
    {
        // 查询管理员对象
        $manager = Managers::find($id);
        // 如果启用则停用
        if ($manager->type == 'enable') {
            $manager->type = 'disable';
        // 如果停用则启用
        } elseif ($manager->type == 'disable') {
            $manager->type = 'enable';
        }
        return $manager->save();
    }

    /**
     * 根据roleId获取角色信息
     *
     * @param int $id
     * @return array
     */
    public function getRoleByRoleId($id)
    {
        $role = Roles::find($id);
        
        return $role;
    }

    public function checkRepeatName($id, $name)
    {
        $count = Roles::where(['name'=>$name])->where('id', '!=', $id)->count();
        
        return $count > 0 ? true : false;
    }
    /**
     * 编辑角色
     *
     * @param int $id
     * @param string $name
     * @return boolean
     */
    public function saveRole($id, $name)
    {
        if ($id == '') {
            $role = new Roles;
        } else {
            $role = Roles::find($id);
            if (empty($role)) {
                send_msg_json(ERROR_RETURN, "该角色不存在");
            }
        }
        
        $role->name = $name;

        return $role->save();
    }

    /**
     * 物理删除角色
     *
     * @param int $id
     * @return boolean
     */
    public function deleteRole($id)
    {
        DB::transaction(function () use ($id){
            // 逻辑删除角色表数据
            DB::table('roles')->where('id', $id)->delete();
            // 物理删除角色管理员关系表
            RoleManager::where('role_id', $id)->delete();
            // 物理删除角色权限关系表
            PermissionRole::where('role_id', $id)->delete();
        });
        return true;
    }

    /**
     * 获取权限列表，可分页，可所有
     *
     * @param boolean $paginate
     * @param integer $pageNumber
     * @return void
     */
    public function getPermissionList($params, $pageNumber = 15)
    {
        return $data = Permissions::where(function ($query) use ($params){
            if ($params['title']) {
                $query->where('title','like','%'.$params['title'].'%');
            }
        })->paginate($pageNumber);
    }

    /**
     * 根据角色id获取相对应的权限id
     *
     * @param int $id
     * @return array
     */
    public function getRolePermissionByRoleId($id)
    {
        $rolePermission = PermissionRole::where('role_id', $id)->pluck('permission_id')->toArray();

        return $rolePermission;
    }

    /**
     * 编辑角色权限
     *
     * @param int $id
     * @param array $permissions
     * @return string
     */
    public function saveRolePermission($id, $permissionIds)
    {
        $original_permissionIds = PermissionRole::select('permission_id')->where('role_id', $id)->pluck('permission_id')->toArray();
        // 原关系数组与新数组交集
        $array_intersect = array_intersect($permissionIds, $original_permissionIds);
        // 需要删除的角色id
        $delete_permissionIds = implode(",", array_diff($original_permissionIds, $array_intersect));
        // 需要添加的角色id
        $add_permissionIds = array_diff($permissionIds, $array_intersect);
        DB::transaction(function () use ($id, $delete_permissionIds, $add_permissionIds){
            // 如果存在删除的权限角色关系
            if (!empty($delete_permissionIds)) {
                // 先把关系表中需要删除的删除
                DB::delete("DELETE FROM `permission_role` WHERE `role_id` = $id AND `permission_id` IN ($delete_permissionIds)");
            }
            if (!empty($add_permissionIds)) {
                // 重新生成新关系
                foreach ($add_permissionIds as $value) {
                    DB::table('permission_role')->insert([
                        'role_id' => $id,
                        'permission_id' => $value,
                    ]);
                }
            }
        });
        return true;
    }

    /**
     * 根据权限id获取权限信息
     *
     * @param int $id
     * @return array
     */
    public function getPermissionById($id)
    {
        $data = Permissions::find($id);
        if (empty($data)) {
            send_msg_json(ERROR_RETURN, "该权限不存在");
        }
        return $data;
    }

    /**
     * 获取所有权限为树形结构做准备
     *
     * @return void
     */
    public function getPermissionForTree($selectAll = true)
    {
        $data = Permissions::select(['id','title','parent_id'])
                        ->where(function ($query) use ($selectAll) {
                            // if (!$selectAll) {
                            //     $query->where('is_api', 1);
                            // }
                        })
                        ->orderBy('sort_order','ASC')
                        ->get()
                        ->keyBy('id')
                        ->toArray();
        return $data;
    }

    /**
     * 遍历树结构每个节点，生成“父节点-子节点”结构
     *
     * @param array $items
     * @param integer $ids
     * @param string $titles
     * @return array
     */
    public function visitTree($items, $ids = 0, $titles = '')
    {
        // static $selection = array();
        static $selection = array(["id"=>0, "ids"=>"0", "titles"=>"基础"]);
        $temp = array();
        foreach ($items as $key => $value) {
            if ($ids == 0) {
                $temp['id'] = $value['id'];
                $temp['ids'] = (string)$value['id'];
                $temp['titles'] = $value['title'];
            } else {
                $temp['id'] = $value['id'];
                $temp['ids'] = $ids.'-'.$value['id'];
                $temp['titles'] = $titles.'>'.$value['title'];
            }
            array_push($selection, $temp);
            if (isset($value['children'])) {
                if ($ids == 0) {
                    $this->visitTree($items[$key]['children'], $value['id'], $value['title']);
                } else {
                    $this->visitTree($items[$key]['children'], $ids.'-'.$value['id'], $titles.'>'.$value['title']);
                }
            }
        }
        
        return $selection;
    }

    /**
     * 逻辑删除权限
     *
     * @param int $id
     * @return boolean
     */
    public function deletePermission($deleteIds)
    {
        
        DB::transaction(function () use ($deleteIds){
            // 物理删除权限表
            DB::table('permissions')->whereIn('id', $deleteIds)->delete();
            // 物理删除权限角色关系表
            PermissionRole::whereIn('permission_id', $deleteIds)->delete();
        });
        return true;
    }

    /**
     * 根据用户id获取相对应的权限数据
     *
     * @param int $id
     * @return array
     */
    public function getPermissionByManagerId($id)
    {
        $roleIds = RoleManager::where('manager_id',$id)->pluck('role_id')->toArray();

        $permissionIds = PermissionRole::whereIn('role_id',$roleIds)->pluck('permission_id');

        $data = Permissions::select(['id','title','router','parent_id','is_display'])
                        ->whereIn('id',$permissionIds)
                        ->orderBy('sort_order','ASC')
                        ->get()
                        ->keyBy('id')
                        ->toArray();
        return $data;
    }

    /**
     * 编辑权限
     *
     * @param array $params
     * @return boolean
     */
    public function savePermission($params)
    {
        if ($params['id'] == '') {
            $permission = new Permissions;
        } else {
            $permission = Permissions::find($params['id']);
            if (empty($permission)) {
                send_msg_json(ERROR_RETURN, "该权限不存在");
            }
        }
        $permission->router = $params['router'];
        $permission->title = $params['title'];
        $permission->description = $params['description'];
        // $permission->icon = $params['icon'];
        $permission->sort_order = $params['sort_order'];
        $permission->parent_id = $params['parent_id'];
        $permission->is_display = $params['is_display'];
        // $permission->is_api = $params['is_api'];

        return $permission->save();
    }

    /**
     * 根据accesstoken获取用户信息
     *
     * @param [type] $accessToken
     * @return void
     */
    public function getManagerByAccessToken($accessToken)
    {
        $manager = Managers::where(['access_token'=>$accessToken])->first();
        
        return $manager;
    }

    public function checkSameRouter($router, $id)
    {
        $count = Permissions::where(['router'=>$router])->where('id','!=',$id)->count();

        if (empty($count)) {
            return false;
        } else {
            return true;
        }
    }
}
