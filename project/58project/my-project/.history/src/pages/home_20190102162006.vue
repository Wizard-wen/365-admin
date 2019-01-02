<template>
    <div class="home">
        <v-header :title="'我们的系统'"></v-header>
    </div>
</template>

<script>
import header from '../../common/components/header/header.vue'
export default {
    data(){
        return {

        }
    },
    components: {
        'v-header': header
    }
}
</script>

<style scoped>
.home{
    /* background: #f5f5f5;
    min-height: calc(100vh - .7rem);
    width: 100%; */
}
</style>
