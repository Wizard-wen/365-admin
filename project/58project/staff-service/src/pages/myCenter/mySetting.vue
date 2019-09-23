<template>
<div>

  <el-tabs :tab-position="tabPosition" >
    <el-tab-pane label="员工基本信息">
        <el-form label-width="120px" ref="baseForm" :model="baseForm" class="baseForm">
            <el-form-item label="账号"  prop="account">
                <el-input v-model="baseForm.account" :maxlength="20" :disabled="true" ></el-input>
            </el-form-item>

            <el-form-item label="工号" prop="staff_code">
                <el-input autocomplete="off" v-model="baseForm.staff_code"  :disabled="true" :maxlength="20"></el-input>
            </el-form-item>

            <el-form-item label="真实姓名" prop="real_name">
                <el-input autocomplete="off" :disabled="true" v-model="baseForm.real_name" ></el-input>
            </el-form-item>

            <el-form-item label="所属部门" prop="department_id">
                <el-input v-model="baseForm.department_id" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">确认更改</el-button>
            </el-form-item>
        </el-form>
    </el-tab-pane>
    <el-tab-pane label="员工个人信息">
        <el-form label-width="120px" ref="personalInfoForm" :model="personalInfoForm" class="personalInfoForm">

            <el-form-item label="用户名" prop="user_name">
                <el-input autocomplete="off" v-model="personalInfoForm.user_name" ></el-input>
            </el-form-item>

            <el-form-item label="手机号" prop="phone">
                <el-input autocomplete="off" v-model="personalInfoForm.phone" ></el-input>
            </el-form-item>

            <el-form-item label="生日" prop="birthday">
                <el-input autocomplete="off" v-model="personalInfoForm.birthday" ></el-input>
            </el-form-item>

            <el-form-item label="邮箱" prop="email">
                <el-input autocomplete="off" v-model="personalInfoForm.email" ></el-input>
            </el-form-item>

            <el-form-item label="微信号" prop="wechat">
                <el-input autocomplete="off" v-model="personalInfoForm.wechat"></el-input>
            </el-form-item>

            <el-form-item label="个人简介" prop="personal_intro">
                <el-input v-model="personalInfoForm.personal_intro"></el-input>
            </el-form-item>

            <el-form-item label="紧急联系人" prop="urgent">
                <el-input v-model="personalInfoForm.urgent"></el-input>
            </el-form-item>

            <el-form-item label="现住址" prop="current_adderss">
                <el-input v-model="personalInfoForm.current_adderss"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">确认更改</el-button>
            </el-form-item>
        </el-form>
    </el-tab-pane>
    <el-tab-pane label="更改密码">
        <el-form label-width="120px" ref="passwordChangeForm" :model="passwordChangeForm" class="passwordChangeForm">
            <el-form-item label="原密码">
                <el-input type="password" v-model="passwordChangeForm.originPassword"></el-input>
            </el-form-item>
            <el-form-item label="新密码">
                <el-input type="password" v-model="passwordChangeForm.newPassword"></el-input>
            </el-form-item>
            <el-form-item label="确认新密码">
                <el-input type="password" v-model="passwordChangeForm.reNewPassword"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">确认更改</el-button>
            </el-form-item>
        </el-form>
    </el-tab-pane>
    <!-- <el-tab-pane label="更改手机号">
        <el-form label-width="120px" ref="changePhoneForm" :model="changePhoneForm" class="changePhoneForm">
            <el-form-item label="原手机号">
                <el-input type="password" v-model="changePhoneForm.originPhone"></el-input>
            </el-form-item>
            <el-form-item label="新手机号">
                <el-input type="password" v-model="changePhoneForm.newPhone"></el-input>
            </el-form-item>
            <el-form-item label="验证码">
                <el-input type="password" v-model="changePhoneForm.authCode"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">确认更改</el-button>
            </el-form-item>
        </el-form>
    </el-tab-pane> -->
  </el-tabs>
</div>

</template>
<script>
  export default {
    data() {
        return {
            tabPosition: 'left',
            passwordChangeForm: {
                originPassword: '',//原始密码
                newPassword: '',//新密码
                reNewPassword: '',//确认新密码
            },
            //账号基本信息
            baseForm: {
                account: '',//账号
                staff_code: '',//员工号
                real_name: '',//真实姓名
                departmeng_id: '',//所属部门
            },
            //用户个人信息
            personalInfoForm: {
                user_name: '',//用户名
                phone: '',//手机号
                birthday: '',//生日
                email: '',//邮箱
                wechat: '',//微信
                personal_intro: '',//个人简介
                urgent: '',//紧急联系人
                current_adderss: '',//现住址
            },
            //更改密码
            changePhoneForm: {
                originPhone: '',//原手机号
                newPhone: '',//新手机号
                authCode: '',//验证码
            }
        };
    }
  };
</script>