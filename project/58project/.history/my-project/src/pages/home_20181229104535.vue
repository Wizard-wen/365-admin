<template>
    <div class="home">
        <div 
            class=""
            v-for="(item,index) in items"
            :key="index">
            <div class="">
                {{item.name}}
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

<style scoped>

</style>
