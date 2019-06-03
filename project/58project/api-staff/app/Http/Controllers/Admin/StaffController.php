<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller;
use App\Services\Admin\StaffService;
use Illuminate\Support\Facades\DB;

class StaffController extends Controller
{
    /**
     * 获取工作人员列表
     *
     * @param Request $request
     * @return string
     */
    public function getStaffList(Request $request)
    {
        $staffService = new StaffService;
        $params = $this->getParamsForList($request);
        // 懒加载分页用
        if ($request->input('lastId')) {
            $params['lastId'] = (int)trim($request->input('lastId', 0));
        }
        // 返回格式，lazyLoad懒加载，paginate列表分页
        $format = trim($request->input('format', 'paginate'));
        // 一页几条，默认15条
        $pageNumber = (int)trim($request->input('pageNumber', 15));

        $list = $staffService->getStaffList($params, $format, $pageNumber);
        if (!empty($list['data'])) {
            array_walk($list['data'], function (&$item){
                // 更新时间
                if (!empty($item['updated_at'])) {
                    $item['updated_at'] = $item['updated_at'] * 1000;
                }
                // 创建时间
                if (!empty($item['created_at'])) {
                    $item['created_at'] = $item['created_at'] * 1000;
                }
                // 注册时间
                if (!empty($item['register_at'])) {
                    $item['register_at'] = $item['register_at'] * 1000;
                }
                // 生日
                if (!empty($item['birthday'])) {
                    $item['birthday'] = $item['birthday'] * 1000;
                }
                // 课程集合
                if ($item['course_ids'] != '') {
                    $item['course_ids'] = explode(',', $item['course_ids']);
                } else {
                    $item['course_ids'] = [];
                }
                // 地区集合
                if ($item['region_ids'] != '') {
                    $item['region_ids'] = explode(',', $item['region_ids']);
                } else {
                    $item['region_ids'] = [];
                }
                // 服务人群集合
                if ($item['service_crowd_ids'] != '') {
                    $item['service_crowd_ids'] = explode(',', $item['service_crowd_ids']);
                } else {
                    $item['service_crowd_ids'] = [];
                }
                // 服务类型集合
                if ($item['service_type_ids'] != '') {
                    $item['service_type_ids'] = explode(',', $item['service_type_ids']);
                } else {
                    $item['service_type_ids'] = [];
                }
                // 技能集合
                if ($item['skill_ids'] != '') {
                    $item['skill_ids'] = explode(',', $item['skill_ids']);
                } else {
                    $item['skill_ids'] = [];
                }
                // 证书集合
                if ($item['paper_ids'] != '') {
                    $item['paper_ids'] = explode(',', $item['paper_ids']);
                } else {
                    $item['paper_ids'] = [];
                }
            });
        }

        return send_msg_json(SUCCESS_RETURN, "success", $list);
    }

    /**
     * 获取服务人员信息
     *
     * @param Request $request
     * @return string
     */
    public function getStaff(Request $request)
    {
        $staffService = new StaffService;
        // 工作人员id
        $id = (int)trim($request->input('id', 0));
        if (empty($id)) {
            send_msg_json(ERROR_RETURN, "请传入服务人员id");
        }
        // 工作人员信息
        $staff = $staffService->getStaffById($id);

        $staff['course'] = $staffService->getCourseById($id);
        $staff['paper'] = $staffService->getPaperById($id);
        $staff['photo'] = $staffService->getPhotoById($id);
        $staff['id_photo'] = $staffService->getIdPhotoById($id);
        $staff['region'] = $staffService->getRegionById($id);
        $staff['service_crowd'] = $staffService->getServiceCrowdsById($id);
        $staff['service_type'] = $staffService->getServiceTypesById($id);
        $staff['skill'] = $staffService->getSkillById($id);
        $staff['certificate'] = $staffService->getCertificateById($id);
        $staff['log'] = $staffService->getLogById($id);
        
        return send_msg_json(SUCCESS_RETURN, "success", $staff);
    }

    /**
     * 编辑/添加服务人员
     *
     * @param Request $request
     * @return string
     */
    public function editStaff(Request $request)
    {
        $staffService = new StaffService;
        // 访问令牌
        $accessToken = trim($request->header('accessToken',''));

        $params = $this->getParamsForEdit($request);
        
        $staffService->saveStaff($params, $accessToken);
        
        if (empty($params['id'])) {
            $msg = '添加成功';
        } else {
            $msg = '修改成功';
        }
        return send_msg_json(SUCCESS_RETURN, $msg);
    }
    public function checkStaffName(Request $request)
    {
        $staffService = new StaffService;
        // 服务人员id
        $id = (int)trim($request->input('id', 0));
        // 服务人员姓名
        $name = trim($request->input('name', ''));

        if ($name == '') {
            send_msg_json(ERROR_RETURN, "请输入姓名");
        }

        $result = $staffService->checkStaffName($id, $name);
        if ($result['isRepeat'] == 1) {
            send_msg_json(ERROR_RETURN, "该姓名已重复", $result);
        } else {
            send_msg_json(SUCCESS_RETURN, '不重复');
        }
    }
    /********************销售人员部分********************/
    
    // 销售人员创建服务人员信息
    public function createStaffBySeller(Request $request)
    {
        $staffService = new StaffService;
        // 访问令牌
        $accessToken = trim($request->header('accessToken',''));
        // 服务人员姓名
        $params['name'] = trim($request->input('name', ''));
        // 服务人员手机号
        $params['phone'] = trim($request->input('phone', ''));
        // 备注
        $params['seller_remarks'] = trim($request->input('seller_remarks', ''));
        if ($params['name'] == '') {
            send_msg_json(ERROR_RETURN, "请填写服务人员姓名");
        }
        if ($params['phone'] == '') {
            send_msg_json(ERROR_RETURN, "请填写服务人员手机");
        }
        $staff_id = $staffService->createStaffBySeller($params, $accessToken);

        return send_msg_json(SUCCESS_RETURN, '添加成功');
    }
    // 销售人员修改接单状态
    public function changeWorkingStatus(Request $request)
    {
        $staffService = new StaffService;
        $accessToken = trim($request->header('accessToken',''));
        // 服务人员id
        $params['id'] = (int)trim($request->input('id', 0));
        if (empty($params['id'])) {
            send_msg_json(ERROR_RETURN, "请传入服务人员id");
        }
        // 接单状态给id
        $params['working_status'] = (int)trim($request->input('working_status', 0));
        // 异常日志
        $params['warning_log'] = trim($request->input('warning_log', ''));

        $staffService->changeWorkingStatus($params, $accessToken);

        return send_msg_json(SUCCESS_RETURN, '修改接单状态成功');
    }
    // 物理删除申请员工
    public function deleteApplyStaff(Request $request)
    {
        $staffService = new StaffService;
        // 服务人员id
        $id = (int)trim($request->input('id', 0));
        if (empty($id)) {
            send_msg_json(ERROR_RETURN, "请传入服务人员id");
        }

        $staffService->deleteApplyStaff($id);

        return send_msg_json(SUCCESS_RETURN, '删除申请成功');
    }

    /********************销售人员结束********************/


    /********************回访人员部分********************/
    // 获取可回访人员数量
    public function getReturnStaff(Request $request)
    {
        $staffService = new StaffService;

        $accessToken = trim($request->header('accessToken', ''));
        // 搜索项
        $params = $this->getParamsForList($request);
        
        $data['count'] = $staffService->getReturnStaff($params, $accessToken);

        return send_msg_json(SUCCESS_RETURN, 'success', $data);
    }
    // 添加回访人员到列表
    public function addReturnStaff(Request $request)
    {
        $staffService = new StaffService;

        $accessToken = trim($request->header('accessToken', ''));
        // 搜索项
        $params = $this->getParamsForList($request);
        
        $staffService->addReturnStaff($params, $accessToken);

        return send_msg_json(SUCCESS_RETURN, '添加回访列表成功');
    }
    // 单个添加回访人员
    public function addReturnStaffSingle(Request $request)
    {
        $staffService = new StaffService;

        $accessToken = trim($request->header('accessToken', ''));

        $id = (int)trim($request->input('id', 0));

        if (empty($id)) {
            send_msg_json(ERROR_RETURN, "请传入服务人员id");
        }

        $staffService->addReturnStaffById($id, $accessToken);

        return send_msg_json(SUCCESS_RETURN, '添加回访列表成功');
    }
    // 移除所有回访人员
    public function removeReturnStaff(Request $request)
    {
        $staffService = new StaffService;

        $accessToken = trim($request->header('accessToken', ''));

        $staffService->removeReturnStaff($accessToken);

        return send_msg_json(SUCCESS_RETURN, '移除回访人员成功');
    }

    public function agreeStaffSingle(Request $request)
    {
        $staffService = new StaffService;

        $accessToken = trim($request->header('accessToken', ''));
        // 从那个页面来
        $from = trim($request->input('from', ''));
        // 哪个模块 warning, apply, return
        $module = trim($request->input('module', ''));
        
        $params['id'] = (int)trim($request->input('id', 0));

        if (empty($params['id'])) {
            send_msg_json(ERROR_RETURN, "请传入服务人员id");
        }
        $manager = $staffService->getManagerByToken($accessToken);
        if ($from == 'list') {
            switch ($module) {
                case 'warning':
                    DB::transaction(function () use ($staffService, $params, $accessToken, $manager){
                        $staffService->agreeStaffById($params['id']);
                        $staffService->writeStaffLog(array(
                            'staff_id'=>$params['id'],
                            'message'=>'管理员【'.$manager['manager_name'].'】修正【异常】数据为【正常】',
                        ), $accessToken);
                    });
                    break;
                case 'apply':
                    DB::transaction(function () use ($staffService, $params, $accessToken, $manager){
                        $staffService->agreeStaffById($params['id']);
                        $staffService->writeStaffLog(array(
                            'staff_id'=>$params['id'],
                            'message'=>'管理员【'.$manager['manager_name'].'】修正【申请】数据为【正常】',
                        ), $accessToken);   
                    });
                    break;
                case 'return':
                    $staffService->removeReturnStaffById($params['id'], $accessToken);
                    break;
            }
        } elseif ($from == 'edit') {
            $params = $this->getParamsForEdit($request);
            // 此接口在这里不需要编写日志
            $params['write_log'] = false;
            // 保存服务人员信息
            $staffService->saveStaff($params, $accessToken);
            switch ($module) {
                case 'warning':
                    DB::transaction(function () use ($staffService, $params, $accessToken, $manager){
                        $staffService->agreeStaffById($params['id']);
                        $staffService->writeStaffLog(array(
                            'staff_id'=>$params['id'],
                            'message'=>'管理员【'.$manager['manager_name'].'】修改服务人员信息，修正【异常】数据为【正常】',
                        ), $accessToken);
                    });
                    break;
                case 'apply':
                    DB::transaction(function () use ($staffService, $params, $accessToken, $manager){
                        $staffService->agreeStaffById($params['id']);
                        $staffService->writeStaffLog(array(
                            'staff_id'=>$params['id'],
                            'message'=>'管理员【'.$manager['manager_name'].'】补充服务人员信息，修正【异常】数据为【正常】',
                        ), $accessToken);
                    });
                    break;
                case 'return':
                    $staffService->removeReturnStaffById($params['id'], $accessToken);
                    break;
            }
        } else {
            send_msg_json(ERROR_RETURN, "请传入from参数");
        }
        return send_msg_json(SUCCESS_RETURN, '操作成功');
    }
    /********************回访人员结束********************/
    /**
     * 停用/启用服务人员
     *
     * @param Request $request
     * @return string
     */
    public function changeStaffType(Request $request)
    {
        $staffService = new StaffService;
        // 访问令牌
        $accessToken = trim($request->header('accessToken', ''));
        // 服务人员id
        $id = (int)trim($request->input('id', 0));
        // 操作版本号
        $version = (int)trim($request->input('version', 0));

        $staffService->changeStaffType($id, $version,$accessToken);

        return send_msg_json(SUCCESS_RETURN, "修改成功");
    }

    private function getParamsForList($request)
    {
        // token
        $params['accessToken'] = trim($request->header('accessToken',''));
        // 获取为了哪个模块
        $params['get_for'] = trim($request->input('get_for','total'));
        // 服务人员姓名
        $params['name'] = trim($request->input('name',''));
        // 手机号
        $params['phone'] = trim($request->input('phone',''));
        // 员工号
        $params['staff_code'] = trim($request->input('staff_code',''));
        // 认证状态
        $params['authentication_ids'] = $request->input('authentication_ids', array());
        // 课程
        $params['course_ids'] = $request->input('course_ids', array());
        // 民族
        $params['nation_ids'] = $request->input('nation_ids', array());
        // 证书
        $params['paper_category_ids'] = $request->input('paper_category_ids', array());
        // 职业类型
        $params['service_category_ids'] = $request->input('service_category_ids', array());
        // 服务人群
        $params['service_crowd_ids'] = $request->input('service_crowd_ids', array());
        // 地区
        $params['service_region_ids'] = $request->input('service_region_ids', array());
        // 服务类型
        $params['service_type_ids'] = $request->input('service_type_ids', array());
        // 信息来源
        $params['source_ids'] = $request->input('source_ids', array());
        // 工龄
        $params['working_age_ids'] = $request->input('working_age_ids', array());
        // 接单状态
        $params['working_status_ids'] = $request->input('working_status_ids', array());
        // 年龄
        $params['age'] = (int)trim($request->input('age', 0));
        // 回访信息
        $params['return_msg'] = trim($request->input('return_msg', ''));
        // 备注
        $params['remarks'] = trim($request->input('remarks', ''));
        // 工作经验
        $params['working_experience'] = trim($request->input('working_experience', ''));
        // 籍贯
        $params['birthplace'] = trim($request->input('birthplace', ''));
        // 身份证
        $params['identify'] = trim($request->input('identify', ''));
        // 学历
        $params['education_ids'] = $request->input('education_ids', array());
        // 紧急联系人
        $params['urgent_phone'] = trim($request->input('urgent_phone', ''));
        // 银行卡号
        $params['bank_card'] = trim($request->input('bank_card', ''));
        // 数据状态
        $params['data_status'] = trim($request->input('data_status', ''));
        // 回访人id
        $params['return_id'] = (int)trim($request->input('return_id', 0));
        // 教师评语
        $params['teacher_comment'] = trim($request->input('teacher_comment', ''));
        // 创建人数组
        $params['manager_ids'] = $request->input('manager_ids', array());
        // 住址
        $params['address'] = trim($request->input('address', ''));
        // 来源名称
        $params['source_name'] = trim($request->input('source_name', ''));
        // 更新时间
        $params['updated_type_ids'] = $request->input('updated_type_ids', array());
        // 回访数量
        $params['count'] = (int)trim($request->input('count', 0));

        return $params;
    }

    private function getParamsForEdit($request)
    {
        // 登记时间
        $params['register_at'] = (int)trim($request->input('register_at', 0));
        // 生日
        $params['birthday'] = (int)trim($request->input('birthday', 0));
        // 服务人员id
        $params['id'] = (int)trim($request->input('id', 0));
        // 认证状态
        $params['authentication'] = (int)trim($request->input('authentication', 0));
        // 服务人员姓名
        $params['name'] = trim($request->input('name', ''));
        // 年龄
        $params['age'] = (int)trim($request->input('age', 0));
        // 服务人员手机号
        $params['phone'] = trim($request->input('phone', ''));
        // 回访信息
        $params['return_msg'] = trim($request->input('return_msg', ''));
        // 接单状态
        $params['working_status'] = (int)trim($request->input('working_status', 0));
        // 备注
        $params['remarks'] = trim($request->input('remarks', ''));
        // 工龄
        $params['working_age'] = (int)trim($request->input('working_age', 0));
        // 工作经验
        $params['working_experience'] = trim($request->input('working_experience', ''));
        // 民族
        $params['nation'] = (int)trim($request->input('nation', 0));
        // 籍贯
        $params['birthplace'] = trim($request->input('birthplace', ''));
        // 身份证号
        $params['identify'] = trim($request->input('identify', ''));
        // 住址
        $params['address'] = trim($request->input('address', ''));
        // 教育程度
        $params['education'] = (int)trim($request->input('education', 0));
        // 紧急联系人
        $params['urgent_phone'] = trim($request->input('urgent_phone', ''));
        // 银行卡号
        $params['bank_card'] = trim($request->input('bank_card', ''));
        // 服务人员头像
        $params['icon'] = trim($request->input('icon', ''));
        // 信息来源
        $params['source'] = (int)trim($request->input('source', 0));
        // 服务人员性别
        $params['sex'] = (int)trim($request->input('sex', 1));
        // 操作版本号
        $params['version'] = (int)trim($request->input('version', 0));
        // 培训课程（数组）
        $params['course'] = $request->input('course', array());
        // 证书（数组）
        $params['paper'] = $request->input('paper', array());
        // 照片（数组）
        $params['photo'] = $request->input('photo', array());
        // 服务地区（数组）
        $params['region'] = $request->input('region', array());
        // 服务人群标签（数组）
        $params['service_crowd'] = $request->input('service_crowd', array());
        // 服务类型标签（数组）
        $params['service_type'] = $request->input('service_type', array());
        // 技能（数组）
        $params['skill'] = $request->input('skill', array());
        // 证书照片
        $params['certificate'] = $request->input('certificate', array());
        // 教师评语
        $params['teacher_comment'] = trim($request->input('teacher_comment', ''));
        // 身份证正反面
        $params['id_photo'] = $request->input('id_photo', array());
        // 来源名称
        $params['source_name'] = trim($request->input('source_name', ''));
        // 此接口需要编写日志
        $params['write_log'] = true;

        return $params;
    }
}
