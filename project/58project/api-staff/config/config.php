<?php

return [

    /*
    |--------------------------------------------------------------------------
    | 图片缩放
    |--------------------------------------------------------------------------
    |
    | 图片缩放配置
    |
    */

    'image' => [
        'type' => [
            env('IMAGE_TYPE_MAX', 'max'),
            env('IMAGE_TYPE_MID', 'mid'),
            env('IMAGE_TYPE_MIN', 'min')
        ],
        'pixel' => [
            env('IMAGE_TYPE_MAX', 'max') => [
                'height' => env('IMAGE_PIXEL_MAX_H', 300),
                'width' => env('IMAGE_PIXEL_MAX_W', 300),
            ],
            env('IMAGE_TYPE_MID', 'mid') => [
                'height' => env('IMAGE_PIXEL_MID_H', 150),
                'width' => env('IMAGE_PIXEL_MID_W', 150),
            ],
            env('IMAGE_TYPE_MIN', 'min') => [
                'height' => env('IMAGE_PIXEL_MIN_H', 50),
                'width' => env('IMAGE_PIXEL_MIN_W', 50),
            ],
        ]
    ],
    
    /*
    |--------------------------------------------------------------------------
    | 文件上传
    |--------------------------------------------------------------------------
    |
    | 文件上传配置
    |
    */

    'disks' => [

        //资源文件上传路径
        'resource' => [
            'driver' => 'local',
            'root' => public_path() . '/resource',
            'url' => env('APP_URL', 'http://localhost') . '/resource'
        ]
    ],
];