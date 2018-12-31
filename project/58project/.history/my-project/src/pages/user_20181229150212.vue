<template>
    <div>
        <div class="user-general">
            <div class="user-header">
                我的
                <span class="user-set">设置</span>
            </div>
        </div>
        <div class="user-order">

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
<style scoped lang="scss">
    .user-general{
        height: 1.4rem;
        width:100%;
        background: #336699;
        .user-header{
            position: relative;
            height:.5rem;
            line-height: .5rem;
            color: #fff;
            width:100%;
            text-align: center;
            font-size: .16rem;
            .user-set{
                position:absolute;
                right: .1rem;
            }
        }
    }
</style>


