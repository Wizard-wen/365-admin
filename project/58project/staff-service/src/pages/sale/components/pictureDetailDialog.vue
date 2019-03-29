<template>

    <el-dialog 
        :title="title" 
        :visible.sync="openPictureDetailDialog"
        :show-close="false"
        :close-on-press-escape="false"
        :close-on-click-modal="false">
        <img :src="imageUrl" alt="" style="height:100%;width:100%">
        <div slot="footer" class="dialog-footer">
            <el-button @click="closeDialog">关 闭</el-button>
        </div>
    </el-dialog>
        
</template>
<script>

import {orderService, $utils} from '../../../../common'
export default {
    props: {
        //是否打弹出框
        openPictureDetailDialog: {
            type: Boolean,
            default: false,
        },
        //标题
        title: {
            type: String,
            default: ''
        },
        //图片url
        imageUrl: {
            type: String,
            default: ''
        }
    },
    data(){
        return {
          
        }
    },
    methods: {
        /**
         * 关闭弹窗
         */
        closeDialog(){
            //关闭签约弹出框
            this.$emit('closePictureDetailDialog')
        }, 
    }
}
</script>
<style lang="scss" scoped>

        .base-form-box{
            .base-line{
                float: left;
                display: flex;
                line-height: 40px;
                height:40px;
                .base-word{
                    display: flex;
                    .base-key{
                        width: 120px;
                        padding-right: 10px;
                        text-align: right;
                    }
                    .base-value{
                        flex: 1;
                    }
                }
            }
        }
        .assign-form{
            width:100%;
        }

</style>


