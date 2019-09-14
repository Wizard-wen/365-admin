<template>
    <div class="queryBox">

    </div>
</template>
<script>
import {
    querySearchList,
    querySearchInput
} from './queryComponent/index.js'

export default {
    components: {
        querySearchList,
        querySearchInput,
    },
    computed:{
        workerConfigForm(){
            return this.$store.state.operateModule.workerConfigForm
        }
    },
    methods: {
        // 更新表格数据
        updateTable(){
            this.$emit('updateTable')
        }
    },
}
</script>
<style lang="scss" scoped>

</style>


