<template>
    <Article>
        <H1>图片类组件</H1>
        <P><Strong>ifec-manager-frontend-framework</Strong>是一个IFEC研发中心通用的前后分离框架，主要包括3部分：</P>
        <Ul>
            <Li>1.集成了前端脚手架的后台系统开发框架</Li>
            <Li>2.对第三方控件的封装，提供第一方控件的开发</Li>
            <Li>3.默认的主题样式</Li>
            <Li>4.教程及最佳实践</Li>
        </Ul>
        <H3>头像（单一图片）展示</H3>
        <P>通常后端返回的图片需要在前端加上<Strong>./resource</Strong></P>
        <P>由于展示的图片通常是后端返回的，因此，直接将后端的数据传进去就可以，<Strong>./resource</Strong>已经在组件中添加了。</P>
        <Demo title="头像展示">
            <icon-component
                slot="demo"
                :height="120"
                :width="90"
                :baseUrl="''"></icon-component>
            <Fun slot="demo"  :data="`
                * @param {Number|String}   height       图片高
                * @param {Number|String}   width        图片宽
                * @param {String}          baseUrl      图片url  
                * @param {String}          displayType      图片展现形式，circle是圆形，square是方形（默认）
            `"></Fun>
            

            <Code lang="html" slot="code">{{code1}}</Code>
        </Demo>

        <Demo title="头像展示">
            <upload-single-picture-component 
                slot="demo"
                @singlePictureUploadSucess="getPicturePath"
                :pictureUrl="pictureUrl"></upload-single-picture-component>
            <Fun slot="demo"  :data="`
                * @param {Number|String}   height       图片高
                * @param {Number|String}   width        图片宽
                * @param {String}          baseUrl      图片url  
                * @param {String}          displayType      图片展现形式，circle是圆形，square是方形（默认）
            `"></Fun>
            

            <Code lang="html" slot="code">{{code1}}</Code>
        </Demo>
        <singlePictureUpload
            :uploadHeader="uploadHeader"
            @onSinglePictureSuccess="onSinglePictureSuccess"
            :initUrl="pictureUrl"
            :height="200"
            :width="400"></singlePictureUpload>
        <multiplePictureUpload
            :height="200"
            :width="400"></multiplePictureUpload>
    </Article>
</template>

<script>
export default {

    data(){
        return {
            //图片上传header
            uploadHeader:{
                accessToken: this.$store.state.loginModule.token.access_token
            },
            code1:`
<icon-component :height="120" :width="90" :baseUrl="''"></icon-component>`,
pictureUrl: '',
            initUrl: '',

        }
    },
    methods: {
        getPicturePath(path){
            alert(path)
            this.pictureUrl = path
        },
        onSinglePictureSuccess(res){
            if(res){
                console.log(res)
                this.pictureUrl = res.path
            }
            
        }
    }
}
</script>

<style>

</style>