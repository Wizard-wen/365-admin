<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;
// exec("CHCP 65001");
ini_set( 'display_errors', 'off' );
class ExcelToSql extends Command
{
    // 认证状态数组
    const auth = [
        "认证通过（已培训）"=>1,
        "未完成认证（未听课）"=>2
    ];

    const config_working_status = [
        "可接单"=>1,
        "暂不接单"=>2,
        "更改行业"=>3,
        "已上户（非365）"=>4,
        "已上户"=>5
    ];
    const config_skill = [
        "小时工"=>1,
        "保姆"=>2,
        "月嫂"=>3,
        "育儿嫂"=>4,
        "育婴师"=>5,
        "护工"=>6,
    ];
    const config_working_age = [
        "0-1年"=>1,
        "1-3年"=>2,
        "3-5年"=>3,
        "5-10年"=>4,
        "10年以上"=>5,
        "0"=>1,
        "0.5"=>1,
        "1"=>2,
        "1.5"=>2,
        "2"=>2,
        "2.5"=>2,
        "3"=>3,
        "4"=>3,
        "5"=>3,
        "6"=>4,
        "7"=>4,
        "8"=>4,
        "9"=>4,
        "10"=>5
    ];
    const config_service_type = [
        "住家"=>1,
        "不住家"=>2,
    ];
    const config_service_crowd = [
        "打扫卫生"=>1,
        "只做饭"=>2,
        "做饭+打扫卫生"=>3,
        "照顾0-1岁宝宝"=>4,
        "照顾1-3岁宝宝"=>5,
        "接孩子"=>6,
        "自理老人"=>7,
        "半自理老人"=>8,
        "不自理老人"=>9,
    ];
    const config_nation = [
        "满"=>1,
        "汉"=>2,
        "蒙古族"=>3,
        "锡伯族"=>4,
        "回"=>5,
        "其他"=>6,
        "朝鲜族"=>7,
        "鄂伦春"=>8,
        "壮族"=>9,
    ];

    const config_education = [
        "小学"=>1,
        "初中"=>2,
        "高中"=>3,
        "职高"=>4,
        "中专"=>5,
        "专科"=>6,
        "自考成人大专"=>7,
        "本科"=>8,
        "本科及以上"=>9,
        "大专"=>10
    ];
    const service_region = [
        "沈河区"=>1,
        "大东区"=>2,
        "和平区"=>3,
        "铁西区"=>4,
        "皇姑区"=>5,
        "于洪北"=>6,
        "沈北新区"=>7,
        "于洪广场"=>8,
        "东陵区"=>9,
        "浑南新区"=>10,
        "长白"=>11,
        "苏家屯"=>12,
        "住家"=>13,
        "于洪南"=>14,
    ];
    const config_course = [
        "养老护理"=>1,
        "育儿"=>2,
        "月嫂"=>3,
        "中餐"=>4,
        "保洁"=>5,
        "菲佣"=>6,
        "辅食制作"=>7,
    ];

    const config_paper_category = [
        "护工证"=>1,
        "厨师证"=>2,
        "幼师"=>3,
        "教师"=>4,
        "面点师证"=>5,
        "初级家政服务员"=>6,
        "高级家政服务员"=>7,
        "中级家政服务员"=>8,
        "月嫂证"=>9,
        "母婴护理员"=>10,
        "母婴护理师"=>11,
        "育儿嫂证"=>12,
        "初级育婴员"=>13,
        "中级育婴师"=>14,
        "高级育婴师"=>15,
        "高级催乳师证书"=>16,
        "高级母婴护理师"=>17,
        "按摩师证"=>18,
        "驾驶证"=>19,
        "营养师证"=>20,
    ];

    const config_source = [
        "转介绍"=>1,
        "网络"=>2,
        "员工"=>3,
        "合作家政-笑笑家政"=>4,
    ];

    protected $signature = 'excel';

    protected $description = 'excel';

    public function handle()
    {
        $url = storage_path('61.xls');

        Excel::load($url, function ($reader){
            foreach ($reader->all()[0] as $key => $value) {
                if ($key >= 2) {
                    // 登记时间
                    $params['register_at'] = strtotime($value[1]);
                    // 认证状态
                    if (empty($value[2])) {
                        $params['authentication'] = 0;
                    } else {
                        $params['authentication'] = array_key_exists($value[2],self::auth) ? self::auth[$value[2]] :　0;
                    }
                    // 姓名
                    $params['name'] = !empty($value[3]) ? $value[3] : '';
                    // 年龄
                    $params['age'] = !empty($value[4]) ? $value[4] : 0;
                    // 电话
                    $params['phone'] = !empty($value[5]) ? $value[5] : '';
                    // 回访信息
                    $params['return_msg'] = !empty($value[6]) ? $value[6] : '';
                    // 接单状态
                    if (empty($value[7])) {
                        $params['working_status'] = 0;
                    } else {
                        $params['working_status'] = array_key_exists($value[7], self::config_working_status) ? self::config_working_status[$value[7]] : 0;
                    }
                    // 备注
                    $params['remarks'] = !empty($value[8]) ? $value[8] : '';
                    // 职业类型
                    $params['skill'] = [];
                    if (empty($value[9])) {
                        $params['skill'] = [];
                    } else {
                        $skill_array = explode("、",$value[9]);
                        foreach ($skill_array as $k => $v) {
                            if (array_key_exists($v, self::config_skill)) {
                                $obj = new \stdClass;
                                $obj->id = self::config_skill[$v];
                                $obj->name = $v;
                                array_push($params['skill'], $obj);
                                unset($obj);
                            }
                        }
                    }
                    // 服务类型,找王硕对
                    $params['service_type'] = [];
                    if (empty($value[10])) {
                        $params['service_type'] = [];
                    } else {
                        $service_type_array = explode("、",$value[10]);
                        foreach ($service_type_array as $k => $v) {
                            if (array_key_exists($v, self::config_service_type)) {
                                $obj = new \stdClass;
                                $obj->id = self::config_service_type[$v];
                                $obj->name = $v;
                                array_push($params['service_type'], $obj);
                                unset($obj);
                            }
                        }
                    }
                    // 可服务人群
                    $params['service_crowd'] = [];
                    if (empty($value[11])) {
                        $params['service_crowd'] = [];
                    } else {
                        $service_crowd_array = explode("、",$value[11]);
                        
                        foreach ($service_crowd_array as $k => $v) {
                            if (array_key_exists($v, self::config_service_crowd)) {
                                $obj = new \stdClass;
                                $obj->id = self::config_service_crowd[$v];
                                $obj->name = $v;
                                array_push($params['service_crowd'], $obj);
                                unset($obj);
                            }
                        }
                    }
                    // 工龄
                    if (empty($value[12])) {
                        $params['working_age'] = 0;
                    } else {
                        $params['working_age'] = array_key_exists((string)$value[12], self::config_working_age) ? self::config_working_age[(string)$value[12]] : 0;
                    }
                    // 工作经验
                    $params['working_experience'] = !empty($value[13]) ? $value[13] : '';
                    // 民族
                    if (empty($value[14])) {
                        $params['nation'] = 0;
                    } else {
                        $params['nation'] = array_key_exists($value[14], self::config_nation) ? self::config_nation[$value[14]] : 0;
                    }
                    // 籍贯
                    $params['birthplace'] = !empty($value[15]) ? $value[15] : '';
                    // 身份证号码
                    $params['identify'] = !empty($value[16]) ? $value[16] : '';
                    // 地址
                    $params['address'] = !empty($value[17]) ? $value[17] : '';
                    // 区域
                    $params['region'] = [];
                    if (empty($value[18])) {
                        $params['region'] = [];
                    } else {
                        $region_array = explode("、",$value[18]);
                        foreach ($region_array as $k => $v) {
                            if (array_key_exists($v, self::service_region)) {
                                $obj = new \stdClass;
                                $obj->id = self::service_region[$v];
                                $obj->name = $v;
                                array_push($params['region'], $obj);
                                unset($obj);
                            }
                        }
                    }
                    // 教育程度
                    if (empty($value[19])) {
                        $params['education'] = 0;
                    } else {
                        $params['education'] = array_key_exists($value[19], self::config_education) ? self::config_education[$value[19]] : 0;
                    }
                    // 联系人电话
                    $params['urgent_phone'] = !empty($value[20]) ? $value[20] : '';
                    // 银行卡号
                    $params['bank_card'] = !empty($value[21]) ? $value[21] : '';
                    // 头像?????
                    // $params['icon'] = !empty($value[22]) ? $value[22] : '';
                    // 参加培训
                    $params['course'] = [];
                    if (empty($value[23])) {
                        $params['course'] = [];
                    } else {
                        $course_array = explode("、",$value[23]);
                        foreach ($course_array as $k => $v) {
                            if (array_key_exists($v, self::config_course)) {
                                $obj = new \stdClass;
                                $obj->id = self::config_course[$v];
                                $obj->name = $v;
                                array_push($params['course'], $obj);
                                unset($obj);
                            }
                        }
                    }
                    // 教师评语
                    $params['teacher_comment'] = !empty($value[24]) ? $value[24] : '';
                    // 技能证书
                    $params['paper'] = [];
                    if (empty($value[25])) {
                        $params['paper'] = [];
                    } else {
                        $paper_array = explode("、",$value[25]);
                        foreach ($paper_array as $k => $v) {
                            if (array_key_exists($v, self::config_paper_category)) {
                                $obj = new \stdClass;
                                $obj->id = self::config_paper_category[$v];
                                $obj->name = $v;
                                array_push($params['paper'], $obj);
                                unset($obj);
                            }
                        }
                    }
                    // 信息来源
                    if (empty($value[26])) {
                        $params['source'] = 0;
                    } else {
                        $params['source'] = array_key_exists($value[26], self::config_source) ? self::config_source[$value[26]] : 0;
                    }
                    // 创建时间
                    $params['created_at'] = strtotime($value[30]);
                    // print_r($params);exit;
                    DB::transaction(function() use ($params){
                        try {
                            DB::table('staff')->insert(['register_at'=>$params['register_at'],'updated_at'=>$params['register_at'],'authentication'=>$params['authentication'],'name'=>$params['name'],'phone'=>$params['phone'],'return_msg'=>$params['return_msg'],'working_status'=>$params['working_status'],'remarks'=>$params['remarks'],'working_age'=>$params['working_age'],'working_experience'=>$params['working_experience'],'nation'=>$params['nation'],'birthplace'=>$params['birthplace'],'identify'=>$params['identify'],'address'=>$params['address'],'education'=>$params['education'],'urgent_phone'=>$params['urgent_phone'],'bank_card'=>$params['bank_card'],'source'=>$params['source'],'created_at'=>$params['created_at'],'teacher_comment'=>$params['teacher_comment']]);
                            
                        } catch (\Throwable $th) {
                            print_r($params);

                            throw $th;
                        }

                        $id = DB::getPdo()->lastInsertId();
                        // 年份
                        $add_year = date("Y", time()) - date("Y", $params['created_at']);
                        if ($params['age'] != 0) {
                            // 新年龄
                            $params['age'] = $params['age'] + $add_year;
                        }
                        
                        // 根据订单id设置订单号
                        $code = sprintf("%06d", $id);
                       
                        DB::table('staff')->where('id',$id)->update(['code'=>$code,'manager_id'=>1,'manager_name'=>'超级管理员','age'=> $params['age']]);
                        
                        if (!empty($params['skill'])) {
                            $skill_ids = array_column($params['skill'], 'id');
                            if (!empty($skill_ids)) {
                                DB::table('staff')->where('id', $id)->update(['skill_ids'=>implode(",",$skill_ids)]);
                            }
                            array_walk($params['skill'], function (&$item) use ($id){
                                // 更新数据库
                                DB::table('staff_skills')->insert(['staff_id'=>$id,'service_category_id'=>$item->id,'name'=> $item->name]);
                            });
                        }
                        if (!empty($params['service_type'])) {
                            $service_type_ids = array_column($params['service_type'], 'id');
                            if (!empty($service_type_ids)) {
                                DB::table('staff')->where('id', $id)->update(['service_type_ids'=>implode(",",$service_type_ids)]);
                            }
                            array_walk($params['service_type'], function (&$item) use ($id){
                                // 更新数据库
                                DB::table('staff_service_types')->insert(['staff_id'=>$id,'service_type_id'=>$item->id,'name'=> $item->name]);
                            });
                        }
                        if (!empty($params['service_crowd'])) {
                            $service_crowd_ids = array_column($params['service_crowd'], 'id');
                            if (!empty($service_crowd_ids)) {
                                DB::table('staff')->where('id', $id)->update(['service_crowd_ids'=>implode(",",$service_crowd_ids)]);
                            }
                            array_walk($params['service_crowd'], function (&$item) use ($id){
                                // 更新数据库
                                DB::table('staff_service_crowds')->insert(['staff_id'=>$id,'service_crowd_id'=>$item->id,'name'=> $item->name]);
                            });
                        }
                        if (!empty($params['region'])) {
                            $region_ids = array_column($params['region'], 'id');
                            if (!empty($region_ids)) {
                                DB::table('staff')->where('id', $id)->update(['region_ids'=>implode(",",$region_ids)]);
                            }
                            array_walk($params['region'], function (&$item) use ($id){
                                // 更新数据库
                                DB::table('staff_regions')->insert(['staff_id'=>$id,'region_id'=>$item->id,'name'=> $item->name]);
                            });
                        }
                        if (!empty($params['course'])) {
                            $course_ids = array_column($params['course'], 'id');
                            if (!empty($course_ids)) {
                                DB::table('staff')->where('id', $id)->update(['course_ids'=>implode(",",$course_ids)]);
                            }
                            array_walk($params['course'], function (&$item) use ($id){
                                // 更新数据库
                                DB::table('staff_courses')->insert(['staff_id'=>$id,'course_id'=>$item->id,'name'=> $item->name]);
                            });
                        }
                        if (!empty($params['paper'])) {
                            $paper_ids = array_column($params['paper'], 'id');
                            if (!empty($paper_ids)) {
                                DB::table('staff')->where('id', $id)->update(['paper_ids'=>implode(",",$paper_ids)]);
                            }
                            array_walk($params['paper'], function (&$item) use ($id){
                                // 更新数据库
                                DB::table('staff_papers')->insert(['staff_id'=>$id,'paper_category_id'=>$item->id,'name'=> $item->name]);
                            });
                        }
                    });
                }
            }
        });

        echo "success";
    }
}