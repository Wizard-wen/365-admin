<template >
    <span>
        {{label}}
        <el-tooltip effect="dark" :content="explain" placement="top-start">
            <i class="el-icon-info"></i>
            <template slot="content">
                <slot name="content"></slot>
            </template>
        </el-tooltip>
    </span>
</template>

<script>
export default {
    props: {
        /**
         * lanel名
         */
        label: {
            type: String,
            default: '',
        },
        /**
         * tooltip说明
         */
        explain: {
            type: String,
            default: '',
        }
    }
}
</script>

<style>

</style>