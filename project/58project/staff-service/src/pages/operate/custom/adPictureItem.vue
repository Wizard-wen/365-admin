<template>
    <el-form :model="adPictureForm" class="form-style" label-width="120px" :rules="adPictureRules" ref="adPictureForm">

        <upload-single-ad-resource-component 
            v-model="adPictureForm.resource_object" 
            :label="'跳转页详情图片'"></upload-single-ad-resource-component>

        <el-form-item label="跳转类别" prop="jump_type">
            <select-tag-component
                :propTagList="jump_typeList"
                v-model="adPictureForm.jump_type"
                :isSingle="true"></select-tag-component>
        </el-form-item>

        <el-form-item label="服务详情" prop="client_category_id" v-if="adPictureForm.jump_type == 2">
            <el-cascader
                :props="propAttribute"
                v-model="clientCategoryIds"
                :options="serviceGoodList"
                @change="clientCategoryChange"
                :show-all-levels="false"></el-cascader>
        </el-form-item>

        <upload-single-ad-resource-component 
            v-else 
            v-model="adPictureForm.activity_object" 
            :label="'跳转页详情图片'"></upload-single-ad-resource-component>

        <el-form-item>
            <el-button type="primary" @click="editAdPositionResource('adPictureForm')">提交</el-button>
            <el-button @click="goback">返回</el-button>
        </el-form-item>
    </el-form>
</template>

<script>

/**
 * type 0 新建  1 编辑
 */
import {operateService, customService} from '../../../../common'
import {selectTagComponent} from '@/pages/components/index.js'

import {uploadSingleAdResourceComponent} from './adPictureItem/index.js'


export default {
    components: {
        selectTagComponent,
        uploadSingleAdResourceComponent,
    },
    data() {
        return {
            is_loading: false,
            //
            jump_typeList: [{id: 1, name: '活动页'}, {id: 2, name: '详情页'}],
            //表单校验
            adPictureRules: {

            },
            //广告位图片表单
            adPictureForm: {
                ad_position_resource_id: this.$route.query.type == 2? this.$route.query.ad_position_resource_id : 0,//关联广告位id
                position_id: this.$route.query.position_id,//所属广告位id
                resource_id: this.$route.query.type == 2? this.$route.query.resource_id : 0,//资源id
                resource_object: {},//广告图片对象
                jump_type: 1,//跳转页面类别
                client_category_id: 0,//详情页id
                activity_object: {},//活动图片对象
            },
            //服务商品列表
            serviceGoodList: [],
            //级联选择器选中的
            clientCategoryIds: [],
            //级联选择器字段名
            propAttribute: {
                label: 'name',
                value: 'id'
            }
        }
    },
    methods: {
        /**
         * 请求广告位资源
         */
        async getResourceItem(){
            try{
                this.is_loading = true
                await customService.getAdPositionResource(this.$route.query.ad_position_resource_id).then(data =>{
                    if(data.code == '0'){
                        this.adPictureForm = data.data
                        this.adPictureForm.resource_object = data.data.resource_object
                        this.is_loading = false
                    }
                }).catch(error =>{
                    this.$message({
                        type:'error',
                        message: error.message
                    })
                    this.is_loading = false
                }).finally(() =>{
                    this.is_loading = false
                })
            } catch(error){
                this.$message({
                    type:'error',
                    message: error.message
                })
                this.is_loading = false
            }
        },
        /**
         * 提交修改
         */
        async editAdPositionResource(formName){

            let _this = this;

            await this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    try{
                        this.is_loading = true
                        await customService.editAdPositionResource(this.adPictureForm).then(data =>{
                            if(data.code == '0'){
                                this.$message({
                                    type:'success',
                                    message: data.message
                                })
                                this.is_loading = false
                                this.$router.push({
                                    path: `/operate/adPositionItem`,
                                    query: {
                                        from : this.$route.query.from,
                                        position_id: this.$route.query.position_id
                                    }
                                })
                            }
                        }).catch(error =>{
                            this.$message({
                                type:'error',
                                message: error.message
                            })
                            this.is_loading = false
                        }).finally(() =>{
                            this.is_loading = false
                        })
                    } catch(error){
                        this.$message({
                            type:'error',
                            message: error.message
                        })
                        this.is_loading = false
                    }

                } else {
                    return false;
                }
            });
        },
        /**
         * 返回
         */
        goback(){
            this.$router.push({
                path: '/operate/adPositionItem',
                query: {
                    from: this.$route.query.from,
                    position_id: this.$route.query.position_id,
                }
            })
        },
        /**
         * 改变跳转页类别
         */
        clientCategoryChange(item){
            this.adPictureForm.client_category_id = item[1]
        },
    },
    async mounted(){
        //获取服务商品下拉菜单
        try{
            await operateService.getServiceTree().then(data =>{
                this.serviceGoodList = data.data

                this.serviceGoodList = this.serviceGoodList.reduce((arr, item, index) =>{
                    return item.hasOwnProperty('children')? [
                        ...arr,
                        item,
                    ] : arr
                },[])
            }).catch(error =>{
                this.$message({
                    type:'error',
                    message: error.message
                })
            })
            if(this.$route.query.type == 2){
                await this.getResourceItem()
            }
        } catch(error){
            this.$message({
                type:'error',
                message: error.message
            })
        }

    }
}
</script>
<style lang="scss" scoped>
    .form-style{
        margin: 24px;
        width: 760px;
    }
    .adPictureBox{
        height: 300px;
        width: 500px;
        .adPicture{
            height: 300px;
            display: block;
            width: 500px;
        }
    }
    .adPicture-plus{
        line-height: 300px;
        text-align: center;
        border: 1px dashed #ccc;
        border-radius: 6px;
        height: 300px;
        width: 500px;
    }
    .adPicture-plus:hover{
        border-color: blue;
        cursor: pointer;
    }
    .icon-box{
        width:500px;
        height: 300px;
        position: relative;
        .icon-item {
            width:500px;
            height: 300px;
            display: block;
        }
        .icon-item-back{
            position: absolute;
            width:500px;
            height: 300px;
            top: 0;
            z-index: 4;
            background: rgba(0,0,0,.5);
            text-align: center;
            line-height: 300px;
            cursor: pointer;
        }
    }
    .picture-message{
        display: flex;
        margin-top: 10px;
    }
</style>


