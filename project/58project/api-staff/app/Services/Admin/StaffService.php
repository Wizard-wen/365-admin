<?php

namespace App\Services\Admin;

use App\Entities\Staff;
use App\Entities\StaffSkills;
use App\Entities\StaffCourses;
use App\Entities\StaffPapers;
use App\Entities\StaffPhotos;
use App\Entities\StaffRegions;
use App\Entities\StaffServiceCrowds;
use App\Entities\StaffServiceTypes;
use App\Entities\StaffCertificateImages;
use App\Entities\StaffCertificates;
use App\Entities\Managers;
use App\Entities\StaffLogs;
use App\Entities\ConfigWorkingStatus;
use Illuminate\Support\Facades\DB;
use App\Entities\StaffIdPhotos;

class StaffService 
{
    /**
     * 员工列表查询字段
     *
     * @var array
     */
    private $staffList = [
        'id','updated_at','authentication','name','age','phone','return_msg','working_status','remarks','working_age','working_experience','nation','birthplace','identify','address','education','urgent_phone','bank_card','icon','source','manager_id','manager_name','code as staff_code','sex','version','created_at','type','status','return_id','data_status','birthday','register_at','teacher_comment','course_ids','region_ids','service_crowd_ids','service_type_ids','skill_ids','paper_ids','source_name'
    ];
    
    /**
     * 获取员工列表
     *
     * @param array $params
     * @return array
     */
    public function getStaffList($params, $format = 'paginate', $pageNumber = 15)
    {
        // DB::connection()->enableQueryLog();
        $modelObj = Staff::select($this->staffList)
            ->where(function ($query) use ($params){
                $this->getQuery($query, $params);
            })
            ->orderBy('updated_at', 'DESC');
        if ($format == 'paginate') {
            // 普通分页
            $list = $modelObj->paginate($pageNumber)->toArray();
            // print_r(DB::getQueryLog());exit;
        } else {
            // 设置最后一个id
            $lastId = isset($params['lastId']) ? $params['lastId'] : 0;
            // 获取数据
            $list['data'] = $modelObj->where('id','>', $lastId)->limit($pageNumber)->get()->toArray();
            // 如果不为空
            if (!empty($list['data'])) {
                // 设置新的最后id
                $lastId = end($list['data'])['id'];
            }
            // 查询是否还有数据
            $count = $modelObj->where('id','>', $lastId)->count();
            // 拼凑数据
            $list['lastId'] = $lastId;
            $list['isLast'] = $count > 0 ? true : false;
        }
            
        return $list;
    }

    /**
     * 根据服务人员id查询服务人员信息
     *
     * @param  $id
     * @return void
     */
    public function getStaffById($id)
    {
        $staff = Staff::select(['id','updated_at','authentication','name','age','phone','return_msg','working_status','remarks','working_age','working_experience','nation','birthplace','identify','address','education','urgent_phone','bank_card','icon','source','manager_id','manager_name','code as staff_code','sex','version','created_at','type','status','return_id','data_status','birthday','register_at','teacher_comment','source_name'])
                      ->where('id',$id)
                      ->first();
        if (empty($staff)) {
            send_msg_json(ERROR_RETURN, "该服务人员不存在");
        }
        // js和php时间戳差了1000
        $staff->updated_at = $staff->updated_at * 1000;
        $staff->created_at = $staff->created_at * 1000;
        $staff->register_at = $staff->register_at * 1000;
        $staff->birthday = $staff->birthday * 1000;

        return $staff->toArray();
    }

    public function getCourseById($id)
    {
        return StaffCourses::select(['id','course_id','name'])->where('staff_id',$id)->get()->toArray();
    }

    /**
     * 根据员工id获取证书
     *
     * @param int $id
     * @return object
     */
    public function getPaperById($id)
    {
        // 证书标签
        return StaffPapers::select(['id','paper_category_id','name'])->where('staff_id',$id)->get()->toArray();
    }

    public function getPhotoById($id)
    {
        // 证书标签
        return StaffPhotos::select(['id','url as path','name'])->where('staff_id',$id)->get()->toArray();
    }

    /**
     * 根据员工id获取服务地址
     *
     * @param int $id
     * @return array
     */
    public function getRegionById($id)
    {
        return StaffRegions::select(['id','region_id','name'])->where('staff_id', $id)->get()->toArray();
    }

    public function getServiceCrowdsById($id)
    {
        return StaffServiceCrowds::select(['id','service_crowd_id','name'])->where('staff_id', $id)->get()->toArray();
    }

    public function getServiceTypesById($id)
    {
        return StaffServiceTypes::select(['id','service_type_id','name'])->where('staff_id', $id)->get()->toArray();
    }

    /**
     * 根据员工id获取技能集合
     *
     * @param int $id
     * @return array
     */
    public function getSkillById($id)
    {
        return StaffSkills::select(['id','service_category_id','name'])->where('staff_id', $id)->get();
    }

    public function getCertificateById($id)
    {
        $certificate = StaffCertificates::select(['id','paper_category_id','name as paper_category_name'])->where('staff_id',$id)->get()->toArray();
        if (!empty($certificate)) {
            array_walk($certificate, function (&$item) {
                $item['images'] = DB::table('staff_certificate_images')->select(['id','name','url as path'])->where('staff_certificate_id',$item['id'])->get()->toArray();
            });
        }
        return $certificate;
    }

    public function getLogById($id)
    {
        $log = StaffLogs::select(['id','staff_id','manager_id','manager_name','message','created_at'])->where('staff_id', $id)->get()->toArray();
        
        if (!empty($log)) {
            array_walk($log, function (&$item) {
                $item['created_at'] = $item['created_at'] * 1000;
            });
        }
        return $log;
    }

    public function getIdPhotoById($id)
    {
        // 证书标签
        return StaffIdPhotos::select(['id','url as path','name'])->where('staff_id',$id)->get()->toArray();
    }

    

    /**
     * 根据手机号查询员工
     *
     * @param string $phone
     * @return object
     */
    public function getStaffByPhone($phone)
    {
        $staff = Staff::select(['id','name','phone','icon','age','address','version'])
            ->where('phone', $phone)->first();
        
        return $staff;
    }

    /**
     * 保存服务人员
     *
     * @param array $params
     * @return string
     */
    public function saveStaff($params, $accessToken)
    {
        // 根据token获取管理员姓名
        $manager = $this->getManagerByToken($accessToken);
        if (empty($params['id'])) {
            if (!empty($this->getStaffByPhone($params['phone']))) {
                send_msg_json(ERROR_RETURN, "该服务人员已存在");
            }
            $staff = new Staff;
            $staff->created_at = time();
            $logMsg = '管理员【'.$manager['manager_name'].'】添加服务人员信息';
        } else {
            $staff = Staff::find($params['id']);
            if (empty($staff)) {
                send_msg_json(ERROR_RETURN, "该服务人员不存在");
            }
            if ($staff->version != $params['version']) {
                send_msg_json(ERROR_RETURN, "数据错误，请刷新页面");
            }
            $staff->version = $params['version']+1;
            $logMsg = '管理员【'.$manager['manager_name'].'】编辑服务人员信息';
        }
        $staff->updated_at = time();
        $staff->authentication = $params['authentication'];
        $staff->name = $params['name'];
        $staff->age = $params['age'];
        $staff->phone = $params['phone'];
        $staff->return_msg = $params['return_msg'];
        $staff->working_status = $params['working_status'];
        $staff->remarks = $params['remarks'];
        $staff->working_age = $params['working_age'];
        $staff->working_experience = $params['working_experience'];
        $staff->nation = $params['nation'];
        $staff->birthplace = $params['birthplace'];
        $staff->identify = $params['identify'];
        $staff->address = $params['address'];
        $staff->education = $params['education'];
        $staff->urgent_phone = $params['urgent_phone'];
        $staff->bank_card = $params['bank_card'];
        $staff->source = $params['source'];
        $staff->sex = $params['sex'];
        $staff->education = $params['education'];
        $staff->birthday = $params['birthday']/1000;
        $staff->register_at = $params['register_at']/1000;
        $staff->teacher_comment = $params['teacher_comment'];
        $staff->source_name = $params['source_name'];
        // 课程集合
        if (!empty($params['course'])) {
            $course_ids = array_column($params['course'], 'course_id');
            $staff->course_ids = implode(',', $course_ids);
        } else {
            $staff->course_ids = '';
        }
        // 服务地区集合
        if (!empty($params['region'])) {
            $region_ids = array_column($params['region'], 'region_id');
            $staff->region_ids = implode(',', $region_ids);
        } else {
            $staff->region_ids = '';
        }
        // 服务人群集合
        if (!empty($params['service_crowd'])) {
            $service_crowd_ids = array_column($params['service_crowd'], 'service_crowd_id');
            $staff->service_crowd_ids = implode(',', $service_crowd_ids);
        } else {
            $staff->service_crowd_ids = '';
        }
        // 服务类型集合
        if (!empty($params['service_type'])) {
            $service_type_ids = array_column($params['service_type'], 'service_type_id');
            $staff->service_type_ids = implode(',', $service_type_ids);
        } else {
            $staff->service_type_ids = '';
        }
        // 技能集合
        if (!empty($params['skill'])) {
            $skill_ids = array_column($params['skill'], 'service_category_id');
            $staff->skill_ids = implode(',', $skill_ids);
        } else {
            $staff->skill_ids = '';
        }
        // 证书标签集合
        if (!empty($params['paper'])) {
            $paper_ids = array_column($params['paper'], 'paper_category_id');
            $staff->paper_ids = implode(',', $paper_ids);
        } else {
            $staff->paper_ids = '';
        }
        $staff->manager_id = $manager['manager_id'];
        $staff->manager_name = $manager['manager_name'];
        // 保存并获取操作id
        DB::transaction(function () use ($staff, $params, $logMsg, $accessToken){
            // 先移动图片，在更新数据库
            if ($params['icon'] != '') {
                $url = move_upload_file($params['icon'], 'icon');
                $staff->icon = $url;
            }
            $staff->save();
            // 如果为创建添加员工号
            if (empty($params['id'])) {
                // 根据订单id设置订单号
                $code = sprintf("%06d", $staff->id);
                $staff->code = $code;
                $staff->save();
            }
            // staff表操作id
            $staffId = $staff->id;
            $this->saveStaffIdPhoto($params['id_photo'], $params['id'], $staffId);
            $this->saveStaffCourse($params['course'], $params['id'], $staffId);
            // 编辑员工证件
            $this->saveStaffPaper($params['paper'], $params['id'], $staffId);
            $this->saveStaffPhoto($params['photo'], $params['id'], $staffId);
            // 编辑员工服务地区
            $this->saveStaffRegion($params['region'], $params['id'], $staffId);
            // 编辑员工能力标签
            $this->saveStaffServiceCrowd($params['service_crowd'], $params['id'], $staffId);
            // 保存员工服务类型
            $this->saveStaffServiceType($params['service_type'], $params['id'], $staffId);
            // 编辑员工技能
            $this->saveStaffSkill($params['skill'], $params['id'], $staffId);
            // 保存标签图片
            $this->saveStaffCertificates($params['certificate'], $params['id'], $staffId);
            // 如果为true写日志
            if ($params['write_log']) {
                $this->writeStaffLog(array(
                    'staff_id'=>$staffId,
                    'message'=>$logMsg,
                ), $accessToken);
            }
        });
        return true;
    }

    /**
     * 保存身份证正反面
     *
     * @param array $params
     * @return string
     */
    public function saveStaffIdPhoto($id_photo, $formId, $staffId)
    {
        // 如果为添加表单
        if (empty($formId)) {
            if (!empty($id_photo)) {
                array_walk($id_photo, function (&$item) use ($staffId){
                    // 移动图片
                    $url = move_upload_file($item['path'], 'identify');
                    // 更新数据库
                    DB::table('staff_id_photos')->insert(['staff_id'=>$staffId,'name'=>$item['name'],'url'=> $url]);
                });
            }
        // 如果为编辑表单
        } else {
            $id_photoIds = array_column($id_photo, 'id');
            // 原关系id集合
            $original_id_photoIds = DB::table('staff_id_photos')->select('id')->where('staff_id', $staffId)->pluck('id')->toArray();
            // 原关系数组与新数组交集
            $array_intersect = array_intersect($id_photoIds, $original_id_photoIds);
            // 需要删除的标签id
            $delete_id_photoIds = array_diff($original_id_photoIds, $array_intersect);
            // 物理删除员工标签表
            if (!empty($delete_id_photoIds)) {
                // 获取要删除的地址
                $delete_url = DB::table('staff_id_photos')->select('url')->whereIn('id', $delete_id_photoIds)->pluck('url')->toArray();
                // 逻辑删除员工标签表
                DB::table('staff_id_photos')->whereIn('id', $delete_id_photoIds)->delete();
                // 删除图片
                array_walk($delete_url, function ($item) {
                    if (file_exists(config('config.disks.resource.root') . '/' .$item) && $item != '') {
                        unlink(config('config.disks.resource.root') . '/' .$item);
                    }
                });
            }
            if (!empty($id_photo)) {
                // 添加
                array_walk($id_photo, function (&$item) use ($staffId, $array_intersect){
                    if (!isset($item['id'])) {
                        $item['id'] = 0;
                    }
                    // 添加
                    if (!in_array($item['id'], $array_intersect)) {
                        // 移动图片到指定位置
                        $url = move_upload_file($item['path'], 'identify');

                        DB::table('staff_id_photos')->insert(['staff_id'=>$staffId,'name'=>$item['name'],'url'=> $url]);
                    }
                });
            }
        }
        return true;
    }
    /**
     * 保存服务人员
     *
     * @param array $params
     * @return string
     */
    public function createStaffBySeller($params, $accessToken)
    {
        if (!empty($this->getStaffByPhone($params['phone']))) {
            send_msg_json(ERROR_RETURN, "该服务人员已存在");
        }
        $staff = new Staff;
        $staff->created_at = time();
        $staff->updated_at = time();
        $staff->name = $params['name'];
        $staff->phone = $params['phone'];
        $staff->seller_remarks = $params['seller_remarks'];
        $staff->created_at = time();
        // 根据token获取管理员姓名
        $manager = $this->getManagerByToken($accessToken);
        $staff->manager_id = $manager['manager_id'];
        $staff->manager_name = $manager['manager_name'];
        // 销售人员保存数据时，数据状态为申请
        $staff->data_status = 'apply';
        // 保存并获取操作id
        DB::transaction(function () use ($staff, $params, $accessToken, $manager){
            $staff->save();
            // 根据订单id设置订单号
            $code = sprintf("%06d", $staff->id);
            $staff->code = $code;
            $staff->save();
            // 写日志
            $this->writeStaffLog(array(
                'staff_id'=>$staff->id,
                'message'=>'销售【'.$manager['manager_name'].'】申请添加新服务人员，备注：'.$params['seller_remarks'].'，电话：'.$manager['phone'],
            ), $accessToken);
        });

        return true;
    }

    private function saveStaffCourse($course, $formId, $staffId)
    {
        // 如果为添加表单
        if (empty($formId)) {
            if (!empty($course)) {
                array_walk($course, function (&$item) use ($staffId){
                    DB::table('staff_courses')->insert(['staff_id'=>$staffId,'course_id'=>$item['course_id'],'name'=>$item['name']]);
                });
            }
        // 如果为编辑表单
        } else {
            $courseIds = array_column($course, 'id');
            // 原关系id集合
            $original_courseIds = DB::table('staff_courses')->select('id')->where('staff_id', $staffId)->pluck('id')->toArray();
            // 原关系数组与新数组交集
            $array_intersect = array_intersect($courseIds, $original_courseIds);
            // 需要删除的标签id
            $delete_courseIds = array_diff($original_courseIds, $array_intersect);
            // 物理删除员工标签表
            if (!empty($delete_courseIds)) {
                DB::table('staff_courses')->whereIn('id', $delete_courseIds)->delete();
            }
            if (!empty($course)) {
                array_walk($course, function (&$item) use ($staffId, $array_intersect){
                    if (!isset($item['id'])) {
                        $item['id'] = 0;
                    }
                    // 添加
                    if (!in_array($item['id'], $array_intersect)) {
                        DB::table('staff_courses')->insert(['staff_id'=>$staffId,'course_id'=>$item['course_id'],'name'=>$item['name']]);
                    // 更新
                    } else {
                        DB::table('staff_courses')->where('id', $item['id'])->update(['staff_id'=>$staffId,'course_id'=>$item['course_id'],'name'=>$item['name']]);
                    }
                });
            }
        }

        return true;
    }

    private function saveStaffPaper($paper, $formId, $staffId)
    {
        // 如果为添加表单
        if (empty($formId)) {
            if (!empty($paper)) {
                array_walk($paper, function (&$item) use ($staffId){
                    DB::table('staff_papers')->insert(['staff_id'=>$staffId,'paper_category_id'=>$item['paper_category_id'],'name'=>$item['name']]);
                });
            }
        // 如果为编辑表单
        } else {
            $paperIds = array_column($paper, 'id');
            // 原关系id集合
            $original_paperIds = DB::table('staff_papers')->select('id')->where('staff_id', $staffId)->pluck('id')->toArray();
            // 原关系数组与新数组交集
            $array_intersect = array_intersect($paperIds, $original_paperIds);
            // 需要删除的标签id
            $delete_paperIds = array_diff($original_paperIds, $array_intersect);
            // 物理删除员工标签表
            if (!empty($delete_paperIds)) {
                DB::table('staff_papers')->whereIn('id', $delete_paperIds)->delete();
            }
            if (!empty($paper)) {
                array_walk($paper, function (&$item) use ($staffId, $array_intersect){
                    if (!isset($item['id'])) {
                        $item['id'] = 0;
                    }
                    // 添加
                    if (!in_array($item['id'], $array_intersect)) {
                        DB::table('staff_papers')->insert(['staff_id'=>$staffId,'paper_category_id'=>$item['paper_category_id'],'name'=>$item['name']]);
                    // 更新
                    } else {
                        DB::table('staff_papers')->where('id', $item['id'])->update(['staff_id'=>$staffId,'paper_category_id'=>$item['paper_category_id'],'name'=>$item['name']]);
                    }
                });
            }
        }
        return true;
    }

    private function saveStaffPhoto($photo, $formId, $staffId)
    {
        // 如果为添加表单
        if (empty($formId)) {
            if (!empty($photo)) {
                array_walk($photo, function (&$item) use ($staffId){
                    // 移动图片
                    $url = move_upload_file($item['path'], 'paper');
                    // 更新数据库
                    DB::table('staff_photos')->insert(['staff_id'=>$staffId,'name'=>$item['name'],'url'=> $url]);
                });
            }
        // 如果为编辑表单
        } else {
            $photoIds = array_column($photo, 'id');
            // 原关系id集合
            $original_photoIds = DB::table('staff_photos')->select('id')->where('staff_id', $staffId)->pluck('id')->toArray();
            // 原关系数组与新数组交集
            $array_intersect = array_intersect($photoIds, $original_photoIds);
            // 需要删除的标签id
            $delete_photoIds = array_diff($original_photoIds, $array_intersect);
            // 物理删除员工标签表
            if (!empty($delete_photoIds)) {
                // 获取要删除的地址
                $delete_url = DB::table('staff_photos')->select('url')->whereIn('id', $delete_photoIds)->pluck('url')->toArray();
                // 逻辑删除员工标签表
                DB::table('staff_photos')->whereIn('id', $delete_photoIds)->delete();
                // 删除图片
                array_walk($delete_url, function ($item) {
                    if (file_exists(config('config.disks.resource.root') . '/' .$item) && $item != '') {
                        unlink(config('config.disks.resource.root') . '/' .$item);
                    }
                });
            }
            if (!empty($photo)) {
                // 添加
                array_walk($photo, function (&$item) use ($staffId, $array_intersect){
                    if (!isset($item['id'])) {
                        $item['id'] = 0;
                    }
                    // 添加
                    if (!in_array($item['id'], $array_intersect)) {
                        // 移动图片到指定位置
                        $url = move_upload_file($item['path'], 'paper');

                        DB::table('staff_photos')->insert(['staff_id'=>$staffId,'name'=>$item['name'],'url'=> $url]);
                    }
                });
            }
        }
        return true;
    }

    private function saveStaffRegion($region, $formId, $staffId)
    {
        // 如果为添加表单
        if (empty($formId)) {
            if (!empty($region)) {
                array_walk($region, function (&$item) use ($staffId){
                    DB::table('staff_regions')->insert(['staff_id'=>$staffId,'region_id'=>$item['region_id'],'name'=>$item['name']]);
                });
            }
        // 如果为编辑表单
        } else {
            $regionIds = array_column($region, 'id');
            // 原关系id集合
            $original_regionIds = DB::table('staff_regions')->select('id')->where('staff_id', $staffId)->pluck('id')->toArray();
            // 原关系数组与新数组交集
            $array_intersect = array_intersect($regionIds, $original_regionIds);
            // 需要删除的标签id
            $delete_regionIds = array_diff($original_regionIds, $array_intersect);
            // 物理删除员工标签表
            if (!empty($delete_regionIds)) {
                DB::table('staff_regions')->whereIn('id', $delete_regionIds)->delete();
            }
            if (!empty($region)) {
                array_walk($region, function (&$item) use ($staffId, $array_intersect){
                    if (!isset($item['id'])) {
                        $item['id'] = 0;
                    }
                    // 添加
                    if (!in_array($item['id'], $array_intersect)) {
                        DB::table('staff_regions')->insert(['staff_id'=>$staffId,'region_id'=>$item['region_id'],'name'=>$item['name']]);
                    // 更新
                    } else {
                        DB::table('staff_regions')->where('id', $item['id'])->update(['staff_id'=>$staffId,'region_id'=>$item['region_id'],'name'=>$item['name']]);
                    }
                });
            }
        }

        return true;
    }

    /**
     * 编辑员工能力标签
     *
     * @param array $crowd
     * @param int $staffId
     * @return boolean
     */
    private function saveStaffServiceCrowd($crowd, $formId, $staffId)
    {
        // 如果为添加表单
        if (empty($formId)) {
            if (!empty($crowd)) {
                array_walk($crowd, function (&$item) use ($staffId){
                    DB::table('staff_service_crowds')->insert(['staff_id'=>$staffId,'service_crowd_id'=>$item['service_crowd_id'],'name'=>$item['name']]);
                });
            }
        // 如果为编辑表单
        } else {
            $crowdIds = array_column($crowd, 'id');
            // 原关系id集合
            $original_crowdIds = DB::table('staff_service_crowds')->select('id')->where('staff_id', $staffId)->pluck('id')->toArray();
            // 原关系数组与新数组交集
            $array_intersect = array_intersect($crowdIds, $original_crowdIds);
            // 需要删除的标签id
            $delete_crowdIds = array_diff($original_crowdIds, $array_intersect);
            // 物理删除员工标签表
            if (!empty($delete_crowdIds)) {
                DB::table('staff_service_crowds')->whereIn('id', $delete_crowdIds)->delete();
            }
            if (!empty($crowd)) {
                array_walk($crowd, function (&$item) use ($staffId, $array_intersect){
                    if (!isset($item['id'])) {
                        $item['id'] = 0;
                    }
                    // 添加
                    if (!in_array($item['id'], $array_intersect)) {
                        DB::table('staff_service_crowds')->insert(['staff_id'=>$staffId,'service_crowd_id'=>$item['service_crowd_id'],'name'=>$item['name']]);
                    // 更新
                    } else {
                        DB::table('staff_service_crowds')->where('id', $item['id'])->update(['staff_id'=>$staffId,'service_crowd_id'=>$item['service_crowd_id'],'name'=>$item['name']]);
                    }
                });
            }
        }
        
        return true;
    }

    private function saveStaffServiceType($type, $formId, $staffId)
    {
        // 如果为添加表单
        if (empty($formId)) {
            if (!empty($type)) {
                array_walk($type, function (&$item) use ($staffId){
                    DB::table('staff_service_types')->insert(['staff_id'=>$staffId,'service_type_id'=>$item['service_type_id'],'name'=>$item['name']]);
                });
            }
        // 如果为编辑表单
        } else {
            $typeIds = array_column($type, 'id');
            // 原关系id集合
            $original_typeIds = DB::table('staff_service_types')->select('id')->where('staff_id', $staffId)->pluck('id')->toArray();
            // 原关系数组与新数组交集
            $array_intersect = array_intersect($typeIds, $original_typeIds);
            // 需要删除的标签id
            $delete_typeIds = array_diff($original_typeIds, $array_intersect);
            // 物理删除员工标签表
            if (!empty($delete_typeIds)) {
                DB::table('staff_service_types')->whereIn('id', $delete_typeIds)->delete();
            }
            if (!empty($type)) {
                array_walk($type, function (&$item) use ($staffId, $array_intersect){
                    if (!isset($item['id'])) {
                        $item['id'] = 0;
                    }
                    // 添加
                    if (!in_array($item['id'], $array_intersect)) {
                        DB::table('staff_service_types')->insert(['staff_id'=>$staffId,'service_type_id'=>$item['service_type_id'],'name'=>$item['name']]);
                    // 更新
                    } else {
                        DB::table('staff_service_types')->where('id', $item['id'])->update(['staff_id'=>$staffId,'service_type_id'=>$item['service_type_id'],'name'=>$item['name']]);
                    }
                });
            }
        }
        
        return true;
    }

    /**
     * 保存员工技能
     *
     * @param int $skill
     * @param int $formId 表单id，来判断是添加还是编辑
     * @param int $staffId
     * @return void
     */
    private function saveStaffSkill($skill, $formId, $staffId)
    {
        if (empty($formId)) {
            if (!empty($skill)) {
                array_walk($skill, function (&$item) use ($staffId){
                    DB::table('staff_skills')->insert(['staff_id'=>$staffId,'service_category_id'=>$item['service_category_id'],'name'=>$item['name']]);
                });
            }
        } else {
            $skillIds = array_column($skill, 'id');
            // 原关系id集合
            $original_skillIds = DB::table('staff_skills')->select('id')->where('staff_id', $staffId)->pluck('id')->toArray();
            // 原关系数组与新数组交集
            $array_intersect = array_intersect($skillIds, $original_skillIds);
            // 需要删除的标签id
            $delete_skillIds = array_diff($original_skillIds, $array_intersect);
            if (!empty($delete_skillIds)) {
                // 逻辑删除员工标签表
                DB::table('staff_skills')->whereIn('id', $delete_skillIds)->delete();
            }
            if (!empty($skill)) {
                // 创建和添加
                array_walk($skill, function (&$item) use ($staffId, $array_intersect){
                    if (!isset($item['id'])) {
                        $item['id'] = 0;
                    }
                    // 添加
                    if (!in_array($item['id'], $array_intersect)) {
                        DB::table('staff_skills')->insert(['staff_id'=>$staffId,'service_category_id'=>$item['service_category_id'],'name'=>$item['name']]);
                    // 更新
                    } else {
                        Db::table('staff_skills')->where('id', $item['id'])->update(['staff_id'=>$staffId,'service_category_id'=>$item['service_category_id'],'name'=>$item['name']]);
                    }
                });
            }
        }
        
        return true;
    }

    /**
     * 保存员工证件
     *
     * @param array $papers
     * @param int $staffId
     * @return boolean
     */
    private function saveStaffCertificates($certificate, $formId, $staffId)
    {
        if (empty($formId)) {
            if (!empty($certificate)) {
                array_walk($certificate, function (&$item) use ($staffId, $formId){
                    // 插入照片标签表
                    DB::table('staff_certificates')->insert(['staff_id'=>$staffId,'paper_category_id'=>$item['paper_category_id'],'name'=>$item['paper_category_name']]);
                    // 获得插入id
                    $insertId = DB::getPdo()->lastInsertId();

                    $this->saveImage($item['images'], $formId, $insertId);
                });
            }
        } else {
            $certificateIds = array_column($certificate, 'paper_category_id');
            // 原关系id集合
            $original_certificateIds = DB::table('staff_certificates')->select('paper_category_id')->where('staff_id', $staffId)->groupBy('paper_category_id')->pluck('paper_category_id')->toArray();
            // 原关系数组与新数组交集
            $array_intersect = array_intersect($certificateIds, $original_certificateIds);
            // 需要删除的标签id
            $delete_certificateIds = array_diff($original_certificateIds, $array_intersect);
            
            if (!empty($delete_certificateIds)) {
                
                // 获取要删除的图片id
                $delete_staff_certificate_id = DB::table('staff_certificates')->select('id')->whereIn('paper_category_id', $delete_certificateIds)->where('staff_id',$staffId)->pluck('id')->toArray();
                // 获取要删除的地址
                $delete_url = DB::table('staff_certificate_images')->select('url')->whereIn('staff_certificate_id', $delete_staff_certificate_id)->pluck('url')->toArray();
                // 逻辑删除员工证书表
                DB::table('staff_certificates')->whereIn('id',$delete_staff_certificate_id)->delete();
                // 删除images表
                DB::table('staff_certificate_images')->whereIn('staff_certificate_id', $delete_staff_certificate_id)->delete();
                // 删除图片
                array_walk($delete_url, function ($item) {
                    if (file_exists(config('config.disks.resource.root') . '/' .$item) && $item != '') {
                        unlink(config('config.disks.resource.root') . '/' .$item);
                    }
                });
            }
            if (!empty($certificate)) {
                array_walk($certificate, function (&$item) use ($staffId, $formId){
                    if (!isset($item['id'])) {
                        // 插入照片标签表
                        DB::table('staff_certificates')->insert(['staff_id'=>$staffId,'paper_category_id'=>$item['paper_category_id'],'name'=>$item['paper_category_name']]);
                        // 获得插入id
                        $insertId = DB::getPdo()->lastInsertId();
                        // 执行一遍保存图片
                        $this->saveImage($item['images'], $formId, $insertId);
                    } else {
                        $insertId = DB::table('staff_certificates')->select('id')->where(['staff_id'=>$staffId,'paper_category_id'=>$item['paper_category_id']])->first()->id;
                        // 执行一遍保存图片
                        $this->saveImage($item['images'], $formId, $insertId);
                    }
                });
            }
        }
        return true;
    }

    private function saveImage($images, $formId, $insertId)
    {
        if (empty($formId)) {
            if (!empty($images)) {
                array_walk($images, function (&$item) use ($insertId){
                    // 移动图片
                    $url = move_upload_file($item['path'], 'certificate');
                    // 更新数据库
                    DB::table('staff_certificate_images')->insert(['staff_certificate_id'=>$insertId,'name'=>$item['name'],'url'=> $url]);
                });
            }
        } else {
            $imageIds = array_column($images, 'id');
            // 原关系id集合
            $original_imageIds = DB::table('staff_certificate_images')->select('id')->where('staff_certificate_id',$insertId)->pluck('id')->toArray();
            // 原关系数组与新数组交集
            $array_intersect = array_intersect($imageIds, $original_imageIds);
            // 需要删除的标签id
            $delete_imageIds = array_diff($original_imageIds, $array_intersect);
            if (!empty($delete_imageIds)) {
                // 获取要删除的地址
                $delete_url = DB::table('staff_certificate_images')->select('url')->whereIn('id', $delete_imageIds)->pluck('url')->toArray();
                // 逻辑删除员工标签表
                DB::table('staff_certificate_images')->whereIn('id', $delete_imageIds)->delete();
                // 删除图片
                array_walk($delete_url, function ($item) {
                    if (file_exists(config('config.disks.resource.root') . '/' .$item) && $item != '') {
                        unlink(config('config.disks.resource.root') . '/' .$item);
                    }
                });
            }
            if (!empty($images)) {
                // 创建和添加
                array_walk($images, function (&$item) use ($insertId, $array_intersect){
                    if (!isset($item['id'])) {
                        $item['id'] = 0;
                    }
                    // 添加
                    if (!in_array($item['id'], $array_intersect)) {
                        // 移动图片到指定位置
                        $url = move_upload_file($item['path'], 'certificate');

                        DB::table('staff_certificate_images')->insert(['staff_certificate_id'=>$insertId,'name'=>$item['name'],'url'=> $url]);
                    }
                });
            }
        }
        return true;
    }
    public function changeWorkingStatus($params, $accessToken)
    {
        $staff = Staff::find($params['id']);
        if (empty($staff)) {
            send_msg_json(ERROR_RETURN, "该服务人员不存在");
        }
        // 原接单状态
        $original_working_status_id = $staff->working_status;
        // 接单状态配置
        $config_working_status = ConfigWorkingStatus::select(['id','name','type','version'])->where('type','enable')->get()->keyBy('id')->toArray();
        // 原接单状态名
        if (empty($original_working_status_id)) {
            $original_working_status_name = '无状态';
        } else {
            $original_working_status_name = $config_working_status[$original_working_status_id]['name'];
        }
        if (empty($params['working_status'])) {
            $working_status_name = '无状态';
        } else {
            $working_status_name = $config_working_status[$params['working_status']]['name'];
        }
        // 现在接单状态

        $manager = $this->getManagerByToken($accessToken);

        // 写入日志
        if ($params['warning_log'] == '') {
            $params['warning_log'] = '管理员【'.$manager['manager_name'].'】添加异常状态，原【'.$original_working_status_name.'】接单状态修改为【'.$working_status_name.'】';
        } else {
            $params['warning_log'] = '管理员【'.$manager['manager_name'].'】添加异常状态，原【'.$original_working_status_name.'】接单状态修改为【'.$working_status_name.'】，异常原因：'.$params['warning_log'];
        }
        $staff->working_status = $params['working_status'];
        $staff->data_status = 'warning';
        DB::transaction(function () use ($staff, $params, $accessToken){
            // 执行保存
            $staff->save();
            // 写日志
            $this->writeStaffLog(array(
                'staff_id'=>$params['id'],
                'message'=>$params['warning_log'],
            ), $accessToken);
        });

        return true;
    }

    public function deleteApplyStaff($id)
    {
        $staff = Staff::find($id);
        if (empty($staff)) {
            send_msg_json(ERROR_RETURN, "该服务人员不存在");
        }
        if ($staff->data_status != 'apply') {
            send_msg_json(ERROR_RETURN, "该记录不是申请记录");
        }
        return $staff->delete();
    }
    /**
     * 逻辑删除员工
     *
     * @param int $id 员工id
     * @param int $version
     * @return void
     */
    public function changeStaffType($id, $version,$accessToken)
    {
        $staff = Staff::find($id);
        if (empty($staff)) {
            send_msg_json(ERROR_RETURN, "该员工不存在");
        }
        if ($staff->version != $version) {
            send_msg_json(ERROR_RETURN, "数据错误，请刷新页面");
        }
        // 如果启用则停用
        if ($staff->type == 'enable') {
            $staff->type = 'disable';
        // 如果停用则启用
        } elseif ($staff->type == 'disable') {
            $staff->type = 'enable';
        }
        $staff->version = $version+1;
        // 更新
        return $staff->save();
    }

    public function checkStaffName($id, $name)
    {
        // 重复数量
        $count = Staff::select(['id'])->where('id','!=',$id)->where('name', $name)->count();
        
        if (!empty($count)) {

            $names = Staff::select(['id','name'])->where('id','!=',$id)->where('name','like',$name.'%')->get()->toArray();
            
            $data['isRepeat'] = 1;
            $data['count'] = count($names);
            $data['names'] = $names;
        } else {
            $data['isRepeat'] = 0;
            $data['count'] = 0;
            $data['names'] = [];
        }
        return $data;
    }

    public function getReturnStaff($params, $accessToken)
    {
        // 根据token查询管理员
        $manager = $this->getManagerByToken($accessToken);

        return Staff::select(['id'])
        ->where(function ($query) use ($params, $manager){
            $this->getQuery($query, $params);
            // 查询没有被回访的
            $query->where('return_id', 0);
            // 把已经属于自己的抛出
            $query->where('return_id', '!=', $manager['manager_id']);
        })
        ->count();
    }

    public function addReturnStaff($params, $accessToken)
    {
        // 根据token查询管理员
        $manager = $this->getManagerByToken($accessToken);

        return Staff::where(function ($query) use ($params, $manager){
            $this->getQuery($query, $params);
            // 查询没有被回访的
            $query->where('return_id', 0);
            // 把已经属于自己的抛出
            $query->where('return_id', '!=', $manager['manager_id']);
        })
        ->orderBy('id', 'DESC')
        ->limit($params['count'])
        ->update(['return_id'=>$manager['manager_id']]);
    }

    public function addReturnStaffById($id, $accessToken)
    {
        // 根据token查询管理员
        $manager = $this->getManagerByToken($accessToken);

        return Staff::where('id', $id)->update(['return_id'=>$manager['manager_id']]);
    }

    public function removeReturnStaff($accessToken)
    {
        // 根据token查询管理员
        $manager = $this->getManagerByToken($accessToken);

        return Staff::where(['return_id'=>$manager['manager_id']])->update(['return_id'=>0]);
    }

    public function removeReturnStaffById($id, $accessToken)
    {
        // 根据token查询管理员
        $manager = $this->getManagerByToken($accessToken);

        return Staff::where(['id'=>$id])->update(['return_id'=>0]);
    }

    public function agreeStaffById($id)
    {
        return Staff::where(['id'=>$id])->update(['data_status'=>'normal']);
    }

    public function writeStaffLog($params, $accessToken)
    {
        $created_at = time();

        $manager = $this->getManagerByToken($accessToken);
        if (!array_key_exists('message', $params)) {
            $params['message'] = '日常维护';
        }
        StaffLogs::insert(['staff_id'=>$params['staff_id'], 'manager_id'=>$manager['manager_id'], 'manager_name'=>$manager['manager_name'], 'message'=>$params['message'],'created_at'=>$created_at]);

        return true;
    }

    /**
     * 通过token获取manager
     *
     * @param string $accessToken
     * @return array array
     */
    public function getManagerByToken($accessToken)
    {
        $manager = Managers::select('id as manager_id', 'name as manager_name','phone')->where('access_token', $accessToken)->first();
        if (empty($manager)) {
            send_msg_json(ERROR_RETURN, "该管理员不存在");
        }

        return $manager->toArray();
    }

    private function getQuery($query, $params)
    {
        if ($params['get_for'] != '') {
            switch ($params['get_for']) {
                // 如果服务人员列表是为了订单匹配，则不显示停用的人
                case 'order':
                    $query->where('type', 'enable');
                    break;
                // 全部服务人员中不允许有申请状态数据
                case 'total':
                    $query->where('data_status', '!=', 'apply');
                    break;
                case 'return':
                    // 管理人数组
                    $manager = $this->getManagerByToken($params['accessToken']);
                    $query->where('return_id', $manager['manager_id']);
                    break;
                case 'warning':
                    $query->where('data_status', 'warning');
                    break;
                case 'apply':
                    $query->where('data_status', 'apply');
                    break;
                case 'seller':
                    $query->where('data_status', '!=', 'apply');
                    $query->where('type', 'enable');
                    break;
            }
        }
        // 如果有姓名搜索项
        if ($params['name']) {
            $query->where('name','like','%'.$params['name'].'%');
        }
        // 电话
        if ($params['phone']) {
            $query->where('phone','like', '%'.$params['phone'].'%');
        }
        // 员工编号
        if ($params['staff_code']) {
            $query->where('code','like','%'.$params['staff_code'].'%');
        }
        // 认证状态
        if (!empty($params['authentication_ids'])) {
            $query->whereIn('authentication', $params['authentication_ids']);
        }
        // 课程
        if (!empty($params['course_ids'])) {
            $query->whereIn('id', function ($query) use ($params){
                $query->select('staff_id')->from(with(new StaffCourses)->getTable())->whereIn('course_id', $params['course_ids']);
            });
        }
        // 民族
        if (!empty($params['nation_ids'])) {
            $query->whereIn('nation', $params['nation_ids']);
        }
        // 证书
        if (!empty($params['paper_category_ids'])) {
            $query->whereIn('id', function ($query) use ($params){
                $query->select('staff_id')->from(with(new StaffPapers)->getTable())->whereIn('paper_category_id', $params['paper_category_ids']);
            });
        }
        // 根据服务类型筛选
        if (!empty($params['service_category_ids'])) {
            $query->whereIn('id', function ($query) use ($params){
                $query->select('staff_id')->from(with(new StaffSkills)->getTable())->whereIn('service_category_id', $params['service_category_ids']);
            });
        }
        // 根据人群标签搜索
        if (!empty($params['service_crowd_ids'])) {
            $query->whereIn('id', function ($query) use ($params){
                $query->select('staff_id')->from(with(new StaffServiceCrowds)->getTable())->whereIn('service_crowd_id', $params['service_crowd_ids']);
            });
        }
        // 根据服务地区搜索
        if (!empty($params['service_region_ids'])) {
            $query->whereIn('id', function ($query) use ($params){
                $query->select('staff_id')->from(with(new StaffRegions)->getTable())->whereIn('region_id', $params['service_region_ids']);
            });
        }
        // 服务类型
        if (!empty($params['service_type_ids'])) {
            $query->whereIn('id', function ($query) use ($params){
                $query->select('staff_id')->from(with(new StaffServiceTypes)->getTable())->whereIn('service_type_id', $params['service_type_ids']);
            });
        }
        // 信息来源
        if (!empty($params['source_ids'])) {
            $query->whereIn('source', $params['source_ids']);
        }
        // 工龄
        if (!empty($params['working_age_ids'])) {
            $query->whereIn('working_age', $params['working_age_ids']);
        }
        // 接单状态
        if (!empty($params['working_status_ids'])) {
            $query->whereIn('working_status', $params['working_status_ids']);
        }
        // 年龄
        if (!empty($params['age'])) {
            $query->where('age', $params['age']);
        }
        // 回访信息
        if ($params['return_msg']) {
            $query->where('return_msg','like', '%'.$params['return_msg'].'%');
        }
        // 备注
        if ($params['remarks']) {
            $query->where('remarks','like', '%'.$params['remarks'].'%');
        }
        // 工作经验
        if ($params['working_experience']) {
            $query->where('working_experience','like', '%'.$params['working_experience'].'%');
        }
        // 籍贯
        if ($params['birthplace']) {
            $query->where('birthplace','like', '%'.$params['birthplace'].'%');
        }
        // 身份证
        if ($params['identify']) {
            $query->where('identify','like', '%'.$params['identify'].'%');
        }
        // 学历
        if (!empty($params['education_ids'])) {
            $query->whereIn('education', $params['education_ids']);
        }
        // 紧急联系人
        if ($params['urgent_phone']) {
            $query->where('urgent_phone','like', '%'.$params['urgent_phone'].'%');
        }
        // 银行卡号
        if ($params['bank_card']) {
            $query->where('bank_card','like', '%'.$params['bank_card'].'%');
        }
        // 数据状态
        if ($params['data_status']) {
            $query->where('data_status', $params['data_status']);
        }
        // 回访人id
        if (!empty($params['return_id'])) {
            $query->where('return_id', $params['return_id']);
        }
        // 教师评语
        if ($params['teacher_comment']) {
            $query->where('teacher_comment','like', '%'.$params['teacher_comment'].'%');
        }
        // 管理员
        if (!empty($params['manager_ids'])) {
            $query->whereIn('manager_id', $params['manager_ids']);
        }
        // 银行卡号
        if ($params['address']) {
            $query->where('address','like', '%'.$params['address'].'%');
        }
        // 来源名称
        if ($params['source_name']) {
            $query->where('source_name','like', '%'.$params['source_name'].'%');
        }
        if (!empty($params['updated_type_ids'])) {
            $id = $params['updated_type_ids'][0];
            // 现在时间戳
            $now = time();
            // 当天0点
            $today = strtotime(date("Y-m-d"),time());
            switch ($id) {
                case 1:
                    // 今天
                    $query->whereBetween('updated_at', [$today, $now]);
                    break;
                case 2:
                    // 昨天0点
                    $yesterday = $today - 86400;

                    $query->whereBetween('updated_at', [$yesterday, $today]);
                    break;
                case 3:
                    // 过去7天
                    $lastSevenDay = $today - 86400 * 7;
                    $query->whereBetween('updated_at', [$lastSevenDay, $now]);
                    break;
                case 4:
                    // 过去30天
                    $lastThirtyDay = $today - 86400 * 30;
                    $query->whereBetween('updated_at', [$lastThirtyDay, $now]);
                    break;
                case 5:
                    // 本周
                    $beginThisweek = mktime(0,0,0,date('m'),date('d')-date('w')+1,date('y'));

                    $query->whereBetween('updated_at', [$beginThisweek, $now]);
                    break;
                case 6:
                    // 上周
                    $beginLastweek=mktime(0,0,0,date('m'),date('d')-date('w')+1-7,date('Y')); 
                    $endLastweek=mktime(23,59,59,date('m'),date('d')-date('w')+7-7,date('Y'));

                    $query->whereBetween('updated_at', [$beginLastweek, $endLastweek]);
                    break;
                case 7:
                    // 本月
                    $beginThismonth=mktime(0,0,0,date('m'),1,date('Y'));
                    $endThismonth=mktime(23,59,59,date('m'),date('t'),date('Y'));

                    $query->whereBetween('updated_at', [$beginThismonth, $endThismonth]);
                    break;
                case 8:
                    // 上个月
                    $begin_time = strtotime(date('Y-m-01 00:00:00',strtotime('-1 month')));  
                    $end_time = strtotime(date("Y-m-d 23:59:59", strtotime(-date('d').'day'))); 

                    $query->whereBetween('updated_at', [$begin_time, $end_time]);
                    break;
                case 9:
                    // 本季度
                    $quarter = empty($param) ? ceil((date('n'))/3) : $param;//获取当前季度
                    $begin_time = mktime(0, 0, 0,$quarter*3-2,1,date('Y'));
                    $end_time = mktime(0, 0, 0,$quarter*3+1,1,date('Y'));
                    $query->whereBetween('updated_at', [$begin_time, $end_time]);
                    break;
                case 10:
                    // 本年
                    $begin_year = strtotime(date("Y",time())."-1"."-1"); //本年开始  
                    $end_year = strtotime(date("Y",time())."-12"."-31"); //本年结束 
                    $query->whereBetween('updated_at', [$begin_year, $end_year]);
                    break;
                case 11:
                    // 本年
                    $begin_year = strtotime(date('Y-01-01',strtotime('-1 year')));
                    $end_year = strtotime(date('Y-12-31',strtotime('-1 year')));
                    $query->whereBetween('updated_at', [$begin_year, $end_year]);
                    break;
            }
        }
        return $query;
    }
}
