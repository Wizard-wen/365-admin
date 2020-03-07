
/**
 * 生成图片字段
 */
export interface workerPictureComponent {
    name:string;//姓名
    sex:string;//姓别
    age:string;//年龄
    body_height:string;//身高
    body_weight:string;//体重
    zodiac_sign:string;//属相
    isMarried:string;//婚姻状态
    //140*100  高 宽
    icon:string;//头像
    // 单行
    skill:Array<number>;//职业类型
    paper:Array<number>;//技能证书
    cus_working_experience:string;//工作经历，个人技能
}