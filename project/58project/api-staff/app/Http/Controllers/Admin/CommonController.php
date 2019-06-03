<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller;
use App\Services\Admin\CommonService;

class CommonController extends Controller
{
    /**
     * 获取服务分类列表
     *
     * @return string
     */
    public function getServiceSelection(Request $request)
    {
        $commonService = new CommonService;
        // 获取类型
        $type = trim($request->input('type', ''));

        $selection = $commonService->getServiceSelection($type);

        return send_msg_json(SUCCESS_RETURN, "success", $selection);
    }
    
    /**
     * 获取标签树结构
     *
     * @return string
     */
    public function getLabelSelection(Request $request)
    {
        $commonService = new CommonService;
        // 获取类型
        $type = trim($request->input('type', ''));

        $selection = $commonService->getLabelSelection($type);

        return send_msg_json(SUCCESS_RETURN, "success", $selection);
    }

    public function getPaperSelection(Request $request)
    {
        $commonService = new CommonService;
        // 获取类型
        $type = trim($request->input('type', ''));
        
        $selection = $commonService->getPaperSelection($type);

        return send_msg_json(SUCCESS_RETURN, "success", $selection);
    }

    public function getManagerSelection()
    {
        $commonService = new CommonService;

        $selection = $commonService->getManagerSelection();

        return send_msg_json(SUCCESS_RETURN, "success", $selection);
    }

    public function getPermissionTree()
    {
        $commonService = new CommonService;

        $label = $commonService->getPermissionForTree();

        $tree = getTree($label);

        return send_msg_json(SUCCESS_RETURN, "success", $tree);
    }

    public function uploadImage(Request $request)
    {
        $request = $request->all();
        $file = $request['file'];
        return send_msg_json(SUCCESS_RETURN, "success", file_upload($file));
    }
}
