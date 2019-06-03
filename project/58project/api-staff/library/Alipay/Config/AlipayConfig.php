<?php

namespace Library\Alipay\Config;

class AlipayConfig 
{
    // 应用ID,您的APPID
    private static $app_id = "2016092300574633";
    // 支付宝公钥,查看地址：https://openhome.alipay.com/platform/keyManage.htm 对应APPID下的支付宝公钥
    private static $alipay_public_key = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAochxGE/7N1dmBMQhi4vaRO1O4kUxDTVHVPR++xbjuCVayg1mfCom5mYu5ysKnSJuv27TUyQgxErrvyPylM/li0JmA2VwSOl02sivrLYCSAzuieF3hdwNyVY1Rsl9rAoawnquXhD3u8bUAXuX6sCr9aPlgNZ52/PvWqQghk/tscY4Rv6P5FFNKS8C1qSFZBHkM7j1q4WxvovTZ8OGdzY1W+8EIzDiFAToM3UKK3sghFtfye21rKtJKLCVwEfpsz4a04TU1wXpv3NqJCCyJA/NxdGXdTVIzaD8debSEZfBn6U8JidUIOAqyHB2l/Z3Jb/ZU/ogu6yrkas6U6v+KQSBXQIDAQAB";
    // 商户私钥文件
    private static $merchant_private_key_path= "cert/cacert.pem";
    // 异步通知地址
    private static $notify_url = "";
    // 同步跳转
    private static $return_url = "";
    // 编码格式
    private static $charset = "UTF-8";
    // 签名方式
    private static $sign_type = "RSA2";
    // 支付宝网关
    // private static $gateway_url = "https://openapi.alipay.com/gateway.do";
    private static $gateway_url = "https://openapi.alipaydev.com/gateway.do";

    /**
     * 获取支付宝配置
     */
    public static function getConfig(){
        
        $config = [];
		$config['app_id'] = self::$app_id;
        $config['alipayPublicKey'] = self::$alipay_public_key;
		$config['rsaPrivateKeyFilePath'] = dirname(dirname(__FILE__)).'/'.self::$merchant_private_key_path;
		$config['notify_url'] = self::$notify_url;
		$config['return_url'] = self::$return_url;
		$config['charset'] =  self::$charset;
		$config['sign_type'] =  self::$sign_type;
		$config['gatewayUrl'] =  self::$gateway_url;

		return $config;
    }
}