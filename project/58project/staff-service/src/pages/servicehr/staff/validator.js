/**
 * 针对员工信息的表单验证
 */
export default {
    validatePass(rule, value, callback){
        if (value === '') {
            callback(new Error('请输入密码'));
        } else {
            if (this.ruleForm2.checkPass !== '') {
                
            }
            callback();
        }
    },

}