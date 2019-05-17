<template>
    <div class="text-box">
        <div class="order-number-box">
            <div class="number-title">金额</div>
            <div class="number-box">
                <div class="order-number border-right">
                    <div class="title">合同总金额</div>
                    <div class="number">3000</div>
                </div>
                <div class="order-number border-right">
                    <div class="title">合同总金额</div>
                    <div class="number">3000</div>
                </div>
                <div class="order-number border-right">
                    <div class="title">合同总金额</div>
                    <div class="number">3000</div>
                </div>
                <div class="order-number">
                    <div class="title">合同总金额</div>
                    <div class="number">3000</div>
                </div>
            </div>
        </div>
        
        <div class="order-number-box" style="margin-left: 20px;">
            <div class="number-title">金额</div>
            <div class="number-box">
                <div class="order-number border-right">
                    <div class="title">合同总金额</div>
                    <div class="number">3000</div>
                </div>
                <div class="order-number border-right">
                    <div class="title">合同总金额</div>
                    <div class="number">3000</div>
                </div>
                <div class="order-number border-right">
                    <div class="title">合同总金额</div>
                    <div class="number">3000</div>
                </div>
                <div class="order-number">
                    <div class="title">合同总金额</div>
                    <div class="number">3000</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {

        }
    }
}
</script>
<style lang="scss" scoped>
.text-box{
    padding: 0 15px;
    display: flex;
    .order-number-box{
        border: 1px solid #dddddd;
        width: calc(50% - 10px);
        .number-title{
            background: #f9f9f9;
            height: 36px;
            width: 100%;
            line-height: 36px;
            text-align: center;
        }
        .number-box{
            padding: 4px 0;
            display: flex;
            .order-number{
                height: 62px;
                width: 25%;
                .title{
                    height: 20px;
                    line-height: 20px;
                    text-align: center;
                    width: 100%;
                }
                .number{
                    height: 42px;
                    width: 100%;
                    text-align: center;
                    line-height: 42px;
                    color: #09C;
                    font-weight: bold;
                    font-size: 30px;
                }
            }
            .border-right{
                border-right: 1px solid #dddddd;
            }
        }
    }
}

</style>


