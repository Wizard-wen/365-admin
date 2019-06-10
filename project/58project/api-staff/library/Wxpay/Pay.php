<?php

namespace Library\Wxpay;

use Library\Wxpay\Config\WxpayConfig;
use Library\Wxpay\Common\Tools;

class Pay 
{
    // 声明参数数组
    private $config;

    public function __construct(){
        $this->config = WxpayConfig::getConfig();
    }

    public function pagePay($param){

        $commonConfigs = array(
            'appid' => $this->config['appid'],
            'mch_id' => $this->config['mch_id'],
            'nonce_str' => Tools::getNonceStr(),
            'body' => $param['body'],
            'out_trade_no' => $param['out_trade_no'],
            'total_fee' => $param['total_fee'],
            'spbill_create_ip' => $_SERVER['REMOTE_ADDR'],
            'notify_url' => $this->config['notify_url'],
            'trade_type' => "NATIVE",
            'product_id' => $param['product_id'],
        );
        $commonConfigs["sign"] = Tools::MakeSign($commonConfigs, $this->config);

		$url = "https://api.mch.weixin.qq.com/pay/unifiedorder";

        $result = Tools::unifiedOrder($commonConfigs, $this->config, $url);
        print_r($result);exit;
    }

    public function refund($param){
        $commonConfigs = array(
            'appid' => $this->config['appid'],
            'mch_id' => $this->config['mch_id'],
            'nonce_str' => Tools::getNonceStr(),
            'out_trade_no' => $param['out_trade_no'],
            'out_refund_no' => $param['out_refund_no'],
            'total_fee' => $param['total_fee'],
            'refund_fee' => $param['refund_fee'],
        );
        $commonConfigs["sign"] = Tools::MakeSign($commonConfigs, $this->config);

        $url = "https://api.mch.weixin.qq.com/secapi/pay/refund";

        $result = Tools::unifiedOrder($commonConfigs, $this->config, $url);
    }
}
