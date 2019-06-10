<?php

namespace Library\Wxpay\Common;

class Tools 
{
    /**
	 * 
	 * 产生随机字符串，不长于32位
	 * @param int $length
	 * @return 产生的随机字符串
	 */
	public static function getNonceStr($length = 32) 
	{
		$chars = "abcdefghijklmnopqrstuvwxyz0123456789";  
		$str ="";
		for ( $i = 0; $i < $length; $i++ )  {  
			$str .= substr($chars, mt_rand(0, strlen($chars)-1), 1);  
		} 
		return $str;
	}

	/**
	 * 生成签名
	 * @param WxPayConfigInterface $config  配置对象
	 * @param bool $needSignType  是否需要补signtype
	 * @return 签名，本函数不覆盖sign成员变量，如要设置签名需要调用SetSign方法赋值
	 */
	public static function MakeSign($commonConfigs, $config)
	{
		//签名步骤一：按字典序排序参数
		ksort($commonConfigs);
		$string = self::ToUrlParams($commonConfigs);
		//签名步骤二：在string后加入KEY
		$string = $string . "&key=".$config['key'];
		//签名步骤三：MD5加密或者HMAC-SHA256
		if($config['sign_type'] == "MD5"){
			$string = md5($string);
		} else if($config['sign_type'] == "HMAC-SHA256") {
			$string = hash_hmac("sha256",$string ,$config['key']);
		} else {
			die("签名类型不支持！");
		}
		//签名步骤四：所有字符转为大写
		$result = strtoupper($string);
		return $result;
	}

	/**
	 * 格式化参数格式化成url参数
	 */
	public static function ToUrlParams($config)
	{
		$buff = "";
		foreach ($config as $k => $v)
		{
			if($k != "sign" && $v != "" && !is_array($v)){
				$buff .= $k . "=" . $v . "&";
			}
		}
		
		$buff = trim($buff, "&");
		return $buff;
	}

	/**
	 * 构建请求并返回请求数据
	 *
	 * @param array $commonConfigs
	 * @param array $config
	 * @param integer $timeOut
	 * @return array
	 */
	public static function unifiedOrder($commonConfigs, $config, $url, $timeOut = 6)
	{
		$xml = self::ToXml($commonConfigs);

		$startTimeStamp = self::getMillisecond();//请求开始时间

		$response = self::postXmlCurl($config, $xml, $url, false, $timeOut);

		$result = self::Init($commonConfigs, $config, $response);

		return $result;
	}

	/**
	 * 输出xml字符
	 *
	 * @param array $commonConfigs
	 * @return string
	 */
	public static function ToXml($commonConfigs)
	{
		if(!is_array($commonConfigs) || count($commonConfigs) <= 0)
		{
    		die("数组数据异常！");
    	}
    	
    	$xml = "<xml>";
    	foreach ($commonConfigs as $key=>$val)
    	{
    		if (is_numeric($val)){
    			$xml.="<".$key.">".$val."</".$key.">";
    		}else{
    			$xml.="<".$key."><![CDATA[".$val."]]></".$key.">";
    		}
        }
        $xml.="</xml>";
        return $xml; 
	}

	/**
	 * 获取毫秒级别的时间戳
	 */
	private static function getMillisecond()
	{
		//获取毫秒的时间戳
		$time = explode ( " ", microtime () );
		$time = $time[1] . ($time[0] * 1000);
		$time2 = explode( ".", $time );
		$time = $time2[0];
		return $time;
	}

	/**
	 * 以post方式提交xml到对应的接口url
	 * 
	 * @param WxPayConfigInterface $config  配置对象
	 * @param string $xml  需要post的xml数据
	 * @param string $url  url
	 * @param bool $useCert 是否需要证书，默认不需要
	 * @param int $second   url执行超时时间，默认30s
	 * @throws WxPayException
	 */
	private static function postXmlCurl($config, $xml, $url, $useCert = false, $second = 30)
	{		
		$ch = curl_init();
		$curlVersion = curl_version();
		$ua = "WXPaySDK/3.0.9 (".PHP_OS.") PHP/".PHP_VERSION." CURL/".$curlVersion['version']." "
		.$config['mch_id'];
		//设置超时
		curl_setopt($ch, CURLOPT_TIMEOUT, $second);

		curl_setopt($ch,CURLOPT_URL, $url);
		curl_setopt($ch,CURLOPT_SSL_VERIFYPEER,FALSE);
		curl_setopt($ch,CURLOPT_SSL_VERIFYHOST,FALSE);//严格校验
		curl_setopt($ch,CURLOPT_USERAGENT, $ua); 
		//设置header
		curl_setopt($ch, CURLOPT_HEADER, FALSE);
		//要求结果为字符串且输出到屏幕上
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
	
		if($useCert == true){
			//设置证书
			//使用证书：cert 与 key 分别属于两个.pem文件
			//证书文件请放入服务器的非web目录下
			$sslCertPath = $config['sslCertPath'];
			$sslKeyPath = $config['sslKeyPath'];
			curl_setopt($ch,CURLOPT_SSLCERTTYPE,'PEM');
			curl_setopt($ch,CURLOPT_SSLCERT, $sslCertPath);
			curl_setopt($ch,CURLOPT_SSLKEYTYPE,'PEM');
			curl_setopt($ch,CURLOPT_SSLKEY, $sslKeyPath);
		}
		//post提交方式
		curl_setopt($ch, CURLOPT_POST, TRUE);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $xml);
		//运行curl
		$data = curl_exec($ch);
		//返回结果
		if($data){
			curl_close($ch);
			return $data;
		} else { 
			$error = curl_errno($ch);
			curl_close($ch);
			die("curl出错，错误码:$error");
		}
	}

	/**
     * 将xml转为array
     * @param WxPayConfigInterface $config  配置对象
     * @param string $xml
     * @throws WxPayException
     */
	public static function Init($commonConfigs, $config, $xml)
	{	
		self::CheckSign($commonConfigs, $config);
		$data = self::FromXml($xml);
        return $data;
	}

	/**
     * 将xml转为array
     * @param string $xml
     * @throws WxPayException
     */
	public static function FromXml($xml)
	{	
		if(!$xml){
			die("xml数据异常！");
		}
        //将XML转为array
        //禁止引用外部xml实体
        libxml_disable_entity_loader(true);
        $data = json_decode(json_encode(simplexml_load_string($xml, 'SimpleXMLElement', LIBXML_NOCDATA)), true);
		return $data;
	}

	/**
	 * @param WxPayConfigInterface $config  配置对象
	 * 检测签名
	 */
	public static function CheckSign($commonConfigs, $config)
	{
		if (!array_key_exists('sign', $commonConfigs)) {
			die("签名错误！");
		}
		// 请求时签名
		$requestSign = $commonConfigs['sign'];
		unset($commonConfigs['sign']);
		// 响应时签名
		$responseSign = self::MakeSign($commonConfigs, $config);
		if($requestSign == $responseSign){
			//签名正确
			return true;
		}
		die("签名错误！");
	}
}
