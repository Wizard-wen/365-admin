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
            <div class="label">联系电话：</div>
            <div class="contains">{{pictureForm.agent_manager_phone}}</div>
        </div>
        <div class="form-item">
            <div class="label">工种：</div>
            <div class="contains">
                <table-tag-component 
                    :propList="workerConfigForm.skill" 
                    v-if="workerConfigForm.skill" 
                    :tableOriginData="pictureForm.work_type"></table-tag-component>
            </div>
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
        <div class="form-item">
            <div class="label">订单详情：</div>
            <div class="contains">{{pictureForm.order_details}}</div>
        </div>
        
    </div>
</template>

<script>
export default {
    props: {
        pictureForm: {
            default: function(){return {}},
            type: Object
        },
        workerConfigForm: {
            type: Object,
            default(){return {}}
        }
    },
}
</script>

<style lang="scss" scoped>
.picture-contains{
    position: relative;
    height: 420px;
    width: 358px;
    background: url(./orderPictureComponent/images/orderImage.png) no-repeat;
    background-size: 368px 400px; 
    padding: 50px 10px 0 20px;
    .form-item{
        &:after{
            clear:both;
            display: block;
            content:'';
        }
        // height: 40px;
        line-height: 30px;
        margin-bottom:10px;
        width: 100%;
        // display: flex;
        font-family: '楷体';
        font-size: 14px;
        .label{
            float: left;
            font-family: 'KaiTi';
            width: 90px;
            text-align:right;
        }.contains{
            float:left;
            width: calc(100% - 90px);
        }
    }
    .form-double-item{
        // height: 90px;
        line-height: 35px;
        margin-bottom:5px;
        width: 100%;
        // display: flex;
        font-family: '楷体';
        font-size: 14px;
        .label{
            float: left;
            font-family: 'KaiTi';
            width: 90px;
        }
        .contains{
            // float: left;
        }
    }
}
</style>