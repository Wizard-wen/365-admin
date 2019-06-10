<?php

// 成功状态
defined("SUCCESS_RETURN") or define("SUCCESS_RETURN","0");
// 失败状态
defined("ERROR_RETURN") or define("ERROR_RETURN","1");
// 特殊状态
// 访问令牌已经到期
defined("ACCESS_TOKEN_IS_EXPIRE") or define("ACCESS_TOKEN_IS_EXPIRE","10001");
// 访问令牌错误
defined("ACCESS_TOKEN_IS_ERROR") or define("ACCESS_TOKEN_IS_ERROR","10002");
// 刷新令牌错误
defined("REFRESH_TOKEN_IS_ERROR") or define("REFRESH_TOKEN_IS_ERROR","10003");

