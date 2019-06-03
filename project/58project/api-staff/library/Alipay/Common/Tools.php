<?php

namespace Library\Alipay\Common;

class Tools 
{
    /**
	 * 拼写签名方法
	 *
	 * @param array $params
	 * @param array $config
	 * @return void
	 */
    public static function generateSign($params, $config) {
        return self::sign(self::getSignContent($params, $config), $config);
    }
	
	/**
	 * 签名方法
	 *
	 * @param array $params
	 * @param array $config
	 * @return string
	 */
    public static function getSignContent($params, $config) {
		ksort($params);
		$stringToBeSigned = "";
		$i = 0;
		foreach ($params as $k => $v) {
			if (false === self::checkEmpty($v) && "@" != substr($v, 0, 1)) {
				// 转换成目标字符集
				$v = self::characet($v, $config);

				if ($i == 0) {
					$stringToBeSigned .= "$k" . "=" . "$v";
				} else {
					$stringToBeSigned .= "&" . "$k" . "=" . "$v";
				}
				$i++;
			}
		}

		unset ($k, $v);
		return $stringToBeSigned;
	}

	/**
	 * 签名方法
	 *
	 * @param array $data
	 * @param array $config
	 * @return string
	 */
	protected static function sign($data, $config) {
		if(self::checkEmpty($config['rsaPrivateKeyFilePath'])){
			$priKey=$config['rsaPrivateKey'];
			$res = "-----BEGIN RSA PRIVATE KEY-----\n" .
				wordwrap($priKey, 64, "\n", true) .
				"\n-----END RSA PRIVATE KEY-----";
		}else {
			$priKey = file_get_contents($config['rsaPrivateKeyFilePath']);
			$res = openssl_get_privatekey($priKey);
		}

		($res) or die('您使用的私钥格式错误，请检查RSA私钥配置'); 

		if ("RSA2" == $config['sign_type']) {
			openssl_sign($data, $sign, $res, OPENSSL_ALGO_SHA256);
		} else {
			openssl_sign($data, $sign, $res);
		}

		if(self::checkEmpty($config['rsaPrivateKeyFilePath'])){
			openssl_free_key($res);
		}
		$sign = base64_encode($sign);
		return $sign;
	}

	/**
	 * 校验$value是否非空
	 * if not set ,return true;
	 * if is null , return true;
	 *
	 * @param string $value
	 * @return boolen
	 */
	protected static function checkEmpty($value) {
		if (!isset($value))
			return true;
		if ($value === null)
			return true;
		if (trim($value) === "")
			return true;
		return false;
	}
	
    /**
     * 转换字符集编码
     * @param $data
     * @param $config
     * @param $targetCharset
     * @return string
     */
    public static function characet($data, $config) {
        if (!empty($data)) {
            $fileType = $config["charset"];
            if (strcasecmp($fileType, $config["charset"]) != 0) {
                $data = mb_convert_encoding($data, $config["charset"], $fileType);
                //$data = iconv($fileType, $config["charset"].'//IGNORE', $data);
            }
        }
        return $data;
    }

	/**
     * 建立请求，以表单HTML形式构造（默认）
     * @param $para_temp 请求参数数组
     * @return 提交表单HTML文本
     */
	public static function buildRequestForm($para_temp, $config) {
		
		$sHtml = "<form id='alipaysubmit' name='alipaysubmit' action='".$config['gatewayUrl']."?charset=".trim($config['charset'])."' method='POST'>";
		while (list ($key, $val) = each ($para_temp)) {
			if (false === self::checkEmpty($val)) {
				$val = str_replace("'","&apos;",$val);
				$sHtml.= "<input type='hidden' name='".$key."' value='".$val."'/>";
			}
        }
		//submit按钮控件请不要含有name属性
        $sHtml = $sHtml."<input type='submit' value='ok' style='display:none;''></form>";
		
		$sHtml = $sHtml."<script>document.forms['alipaysubmit'].submit();</script>";
		return $sHtml;
	}
}
