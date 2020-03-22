<template>
    <el-card :body-style="{padding: 0}">
        <div class="image-box">
            <img class="image" :src="`./resource/${pictureItem.url}`" >
        </div>
        <div class="picture-des">
            <span>{{pictureItem.name}}</span>
            <div class="bottom">
                <el-tag class="bottom-left" size="small">{{pictureItem.typeName}}</el-tag>
                <el-switch
                    class="bottom-right"
                    @change="changeSelectedTag"
                    v-model="pictureItem.isSelected"
                    active-color="#13ce66"
                    inactive-color="#ff4949"></el-switch>
            </div>
        </div>
    </el-card>
</template>

<script>
import {resourceTypeList} from './IresourcePicture'
export default {
    props: {
        pictureItem: {
            type: Object,
            default(){return {}}
        }
    },
    data(){
        return {
            resourceTypeList,
        }
    },
    methods: {
        changeSelectedTag(){
            this.$emit('changeSelectedTag', this.pictureItem)
        }
    },
}
</script>

<style scoped lang="scss">
    .image-box{
        width: 300px;
        height: 211px;
        border-bottom: 1px dashed #ccc;
        .image{
            width: 300px;
            height: 210px;
            display: block;
            margin: auto;
        }
    }  
    .picture-des{
        padding: 7px 14px;
        .bottom{
            margin-top: 10px;
            display: flex;
            justify-content: space-between;
        }
    }
</style>