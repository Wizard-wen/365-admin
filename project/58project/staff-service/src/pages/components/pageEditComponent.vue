<template>
    <div class="pageEdit">
        <div class="page-edit-title">

        </div>
        <div class="page-edit-contains">
            <slot name="form"></slot>
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
    .pageEdit{
        min-height: calc(100vh - 50px);
        width: 100%;
        background: #f0f2f5; 
        .page-edit-title{
            box-sizing: border-box;
            margin: 0;
            color: rgba(0,0,0,.65);
            font-size: 14px;
            font-variant: tabular-nums;
            line-height: 1.5;
            list-style: none;
            font-feature-settings: "tnum";
            position: relative;
            padding: 16px 24px;
            background: #fff;
        }
        .page-edit-contains{
            margin: 24px 24px 0;
            background: #fff;
        }
    }
</style>


