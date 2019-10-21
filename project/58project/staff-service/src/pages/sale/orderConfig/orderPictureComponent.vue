<template>
    <div class="picture-contains">
        <div class="form-item">
            <div class="label">订单编号：</div>
            <div class="contains">{{pictureForm.order_code}}</div>
        </div>
        <div class="form-item">
            <div class="label">家政顾问：</div>
            <div class="contains">{{pictureForm.agent_manager_name}}</div>
        </div>
        <div class="form-item">
            <div class="label">工种：</div>
            <div class="contains">{{pictureForm.work_type}}</div>
        </div>
        <div class="form-item">
            <div class="label">工资待遇：</div>
            <div class="contains">{{pictureForm.wage}}</div>
        </div>
        <div class="form-item">
            <div class="label">工作时间：</div>
            <div class="contains">{{pictureForm.service_duration}}</div>
        </div>
        <div class="form-item">
            <div class="label">地址：</div>
            <div class="contains">{{pictureForm.service_address}}</div>
        </div>
        <div class="form-double-item">
            <div class="label">订单详情：</div>
            <div class="contains">{{pictureForm.order_details}}</div>
        </div>
        <div class="form-item">
            <div class="label">联系电话：</div>
            <div class="contains">{{pictureForm.agent_manager_phone}}</div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    props: {
        pictureForm: {
            default: function(){return {}},
            type: Object
        }
    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>
.picture-contains{
    position: relative;
    height: 500px;
    width: 460px;
    background: url(./orderPictureComponent/images/orderImage.png) no-repeat;
    background-size: 460px 500px; 
    padding: 80px 10px 0 30px;
    .form-item{
        height: 45px;
        line-height: 45px;
        width: 100%;
        display: flex;
        font-family: '楷体';
        font-size: 18px;
        .label{
            font-family: 'KaiTi';
            width: 110px;
        }
    }
    .form-double-item{
        height: 90px;
        line-height: 45px;
        width: 100%;
        // display: flex;
        font-family: '楷体';
        font-size: 18px;
        .label{
            float: left;
            font-family: 'KaiTi';
            width: 110px;
        }
        .contains{
            // float: left;
        }
    }
}
</style>