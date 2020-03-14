<template>
    <card-box-component :title="title" >
        <div slot="contains">
            <div style="display: flex;">
                <sort-box style="width: 25%" :title="'保姆业绩'"></sort-box>
                <sort-box style="width: 25%" :title="'保姆业绩'"></sort-box>
                <sort-box style="width: 25%" :title="'保姆业绩'"></sort-box>
                <sort-box style="width: 25%" :title="'保姆业绩'"></sort-box>
            </div>
        </div>
        
    </card-box-component>
</template>

<script>
import sortBox from './sortBox.vue'
export default {
    components: {
        sortBox
    },
    props: {
        title: {
            type: String,
            default: '门店排行'
        }
    }
}
</script>

<style>

</style>