<?php

namespace Library\Wxpay\Config;

class WxpayConfig 
{
    // 公众账号ID
    private static $appid = "wx426b3015555a46be";
    // 商户号
    private static $mch_id = "1900009851";
    // 商户支付密钥，参考开户邮件设置（必须配置，登录商户平台自行设置）, 请妥善保管， 避免密钥泄露
    // 设置地址：https://pay.weixin.qq.com/index.php/account/api_cert
    private static $key = "8934e7d15453e97507ef794cf7b0519d";
    // 通知地址
    private static $notify_url = "http://paysdk.weixin.qq.com/notify.php";
    // 签名类型
    private static $sign_type = "HMAC-SHA256";
    //=======【证书路径设置】=====================================
	/**
	 * TODO：设置商户证书路径
	 * 证书路径,注意应该填写绝对路径（仅退款、撤销订单时需要，可登录商户平台下载，
	 * API证书下载地址：https://pay.weixin.qq.com/index.php/account/api_cert，下载之前需要安装商户操作证书）
	 * @var path
	 */
    private static $sslCertPath = 'cert/apiclient_cert.pem';
    
	private static $sslKeyPath = 'cert/apiclient_key.pem';
    
    /**
     * 获取微信配置
     */
    public static function getConfig(){
        
        $config = [];
		$config['appid'] = self::$appid;
        $config['mch_id'] = self::$mch_id;
        $config['key'] = self::$key;
		$config['notify_url'] = self::$notify_url;
        $config['sign_type'] = self::$sign_type;
        $config['sslCertPath'] = self::$sslCertPath;
        $config['sslKeyPath'] = self::$sslKeyPath;


		return $config;
    }
}