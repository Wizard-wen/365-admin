<template>
    <div class="ad-box">
        <el-button
            v-if="!isShow && isAddAdPictureButtonShow"
            style="margin-bottom:15px;"
            icon="el-icon-plus"
            @click="goAdPictureItemPage('new', {})">添加图片</el-button>

        <div class="ad-imgs-box" v-for="(item, index) in adPositionList" :key="index">
            <div class="ad-imgs">
                <img
                    class="ad-item-img"
                    :src="'./resource/'+item.resource_object.url"
                    @click="showDetialPic(item.resource_object.url)">
            </div>
            <div class="image-messsage">
                <p>{{item.name}}</p>
                <div v-if="!isShow">
                    <el-button @click="deleteAdPictureItem(item)" class="el-icon-delete" type="text" size="small">删除</el-button>
                    <el-button @click="goAdPictureItemPage('edit', item)" class="el-icon-edit" type="text" size="small">编辑</el-button>
                </div>
            </div>
        </div>
        <picture-detail-dialog
            :imageUrl="detailImageUrl"
            :title="'证书详情'"
            v-if="pictureDetailDialogVisible"
            :pictureDetailDialogVisible="pictureDetailDialogVisible"
            @closePictureDetailDialog="pictureDetailDialogVisible=false"></picture-detail-dialog>
    </div>
</template>
<script>

import {pictureDetailDialog} from '@/pages/components'


export default {
    components: {
        pictureDetailDialog
    },
    props: {
        /**
         * v-model字段---证书数组
         */
        value: {
            type: Array,
            default: function(){return []}
        },
        /**
         * 是展示还是编辑操作
         */
        isShow: {
            type: Boolean,
            default: false,
        },
        adType: {
            type: Number | String,
            default: 0,
        }
    },
    computed: {
        isAddAdPictureButtonShow(){
            if(this.adType == 1){
                return true
            } else {
                if(this.adPositionList.length){
                    return false
                } else {
                    return true
                }
            }
        }
    },
    watch:{
        //v-model字段
        value: {
            handler(newVal, oldVal){
                if(newVal!= oldVal){
                    this.adPositionList = newVal
                }
            },
            immediate: true,
            deep: true,
        }
    },

    data(){
        return {
            //广告位图片显示列表
            adPositionList: [],
            //控制图片详情的显示隐藏
            pictureDetailDialogVisible: false,

            detailImageUrl: '',//展示证书详情的url
        }
    },
    methods: {

        /**
         * 新建 或 编辑 证书信息----打开弹窗
         */
        goAdPictureItemPage(state, paperItem){
            this.$router.push({
                path: '/operate/adPictureItem',
                query: {
                    from: this.$route.query.from,//来源于 客户端广告位还是服务端广告位
                    type: state == 'edit' ? 2 : 1,//是否是编辑
                    position_id: this.$route.query.position_id,//广告位id
                    resource_id: state == 'edit' ? paperItem.resource_object.id : 0,//资源id
                    ad_position_resource_id: state == 'edit' ? paperItem.ad_position_resource_id : 0,//资源关联id
                }
            })
        },
        /**
         * 删除一条图片数据
         * @param param 图片信息
         */
        deleteAdPictureItem(param){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.adPositionList.forEach((item, index) =>{
                    //判断证书分类字段
                    if(item.id == param.id){
                        //删除证书
                        this.adPositionList.splice(index, 1)
                    }
                })
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });

        },
        /**
         * 查看大图
         * @param pathParam 展示图片的url
         */
        showDetialPic(pathParam){
            this.detailImageUrl = './resource/'+pathParam
            this.pictureDetailDialogVisible = true
        },
    },
    mounted(){

    }
}
</script>
<style lang="scss" scoped>
    .ad-box{
        width: 530px;
        .ad-imgs-box{
            margin-bottom: 15px;
            border: 1px solid #ebeef5;
            background-color: #fff;
            box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
            &:last-child{
                margin-bottom: 0;
            }
            .ad-imgs{
                width: 530px;
                padding: 15px;
                display: flex;
                flex-wrap: wrap;
                .ad-item-img{
                    display: block;
                    width: 500px;
                    cursor: pointer;
                }
            }
            .image-messsage{
                line-height: 30px;
                display: flex;
                justify-content: space-between;
                padding: 0 20px;
            }
        }
    }



</style>


