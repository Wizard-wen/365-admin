<?php

namespace Library\Alipay;

use Library\Alipay\Config\AlipayConfig;
use Library\Alipay\Common\Tools;

class Pay 
{
    // 声明参数数组
    private $config;

    public function __construct(){
        $this->config = AlipayConfig::getConfig();
    }

    /**
     * 支付宝pc支付方法
     * @param string $out_trade_no 商户订单号，商户网站订单系统中唯一订单号
     * @param string $product_code 销售产品码 FAST_INSTANT_TRADE_PAY
     * @param string $total_amount 付款总金额
     * @param string $subject 订单标题
     */
    public function pagePay($param){
        // 请求参数
        $requestConfigs = array(
            'out_trade_no' => $param['out_trade_no'],
            'product_code' => $param['product_code'],
            'total_amount' => $param['total_amount'],
            'subject' => $param['subject'],
        );
        // 公共请求参数
        $commonConfigs = array(
            'app_id' => $this->config['app_id'],
            'method' => 'alipay.trade.page.pay',
            'return_url' => $this->config['return_url'],
            'charset' => $this->config['charset'],
            'sign_type' => $this->config['sign_type'],
            'timestamp' => date('Y-m-d H:i:s'),
            'version' => '1.0',
            'notify_url' => $this->config['notify_url'],
            'biz_content' => json_encode($requestConfigs),
        );
        $commonConfigs["sign"] = Tools::generateSign($commonConfigs,$this->config);
        // POST请求
        return Tools::buildRequestForm($commonConfigs, $this->config);
    }

    /**
     * 手机网页支付
     *
     * @param [type] $param
     * @return void
     */
    public function wapPay($param){
        // 请求参数
        $requestConfigs = array(
            'out_trade_no' => $param['out_trade_no'],
            'product_code' => $param['product_code'],
            'total_amount' => $param['total_amount'],
            'subject' => $param['subject'],
        );
        // 公共请求参数
        $commonConfigs = array(
            'app_id' => $this->config['app_id'],
            'method' => 'alipay.trade.wap.pay',
            'return_url' => $this->config['return_url'],
            'charset' => $this->config['charset'],
            'sign_type' => $this->config['sign_type'],
            'timestamp' => date('Y-m-d H:i:s'),
            'version' => '1.0',
            'notify_url' => $this->config['notify_url'],
            'biz_content' => json_encode($requestConfigs),
        );
        $commonConfigs["sign"] = Tools::generateSign($commonConfigs,$this->config);
        // POST请求
        return Tools::buildRequestForm($commonConfigs, $this->config);
    }

    /**
     * 退款方法
     *
     * @param array $param
     * @return void
     */
    public function refund($param){
        // 请求参数
        $requestConfigs = array(
            'out_trade_no'=>$param['out_trade_no'],
            'refund_amount'=>$param['refund_fee'], // 单位 元
        );
        // 公共参数
        $commonConfigs = array(
            'app_id' => $this->config["app_id"],
            // 接口名称
            'method' => 'alipay.trade.refund',    
            'charset'=>$this->config["charset"],
            'sign_type'=>$this->config["sign_type"],
            'timestamp'=>date('Y-m-d H:i:s'),
            'version'=>'1.0',
            'biz_content'=>json_encode($requestConfigs),
        );
        $commonConfigs["sign"] = Tools::generateSign($commonConfigs,$this->config);
        // POST请求
		return Tools::buildRequestForm($commonConfigs, $this->config);
    }
}
