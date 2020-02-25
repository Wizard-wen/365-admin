<template>
    <!-- <el-table-column  label="头像" prop="icon" align="center">
        <template> -->
            <el-popover trigger="click" placement="top">
                <img 
                    :src="icon?'./resource/'+icon:''" 
                    alt="" 
                    style="height: 200px; width: 200px;">
                <div 
                    slot="reference" 
                    style="height: 30px;width: 30px;margin: 0 auto;">
                    <img 
                        v-if="icon" 
                        :src="icon?'./resource/'+icon:''" 
                        alt="" 
                        style="height: 30px;width: 30px;">
                    <p v-else>无</p>
                </div>
            </el-popover>
        <!-- </template>
    </el-table-column> -->
</template>

<script>
export default {
    props: {
        icon: {
            type: String,
            default: '',
        }
    }
}
</script>

<style>

</style>