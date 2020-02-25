<template>
    <Article>
        <H1>标签相关的组件</H1>
        <P><Strong>ifec-manager-frontend-framework</Strong>是一个IFEC研发中心通用的前后分离框架，主要包括3部分：</P>
        <Ul>
            <Li>1.集成了前端脚手架的后台系统开发框架</Li>
            <Li>2.对第三方控件的封装，提供第一方控件的开发</Li>
            <Li>3.默认的主题样式</Li>
            <Li>4.教程及最佳实践</Li>
        </Ul>
        <H3>通过级联选择器添加标签</H3>
        
        <Demo title="通过级联选择器添加标签">
            <cascader-tag-component
                slot="demo"
                :optionList="optionList"
                v-model="tagList1"></cascader-tag-component>
            <Fun slot="demo"  :data="`
                * @param {Array}   optionList       级联选择器渲染数组
                * @param {Array}   tagList          当前被选中的tag标签，v-model数据
                * @param {String}   tagName         （不重要）当前业务的标签属性名
                * @param {String}     idKey        数组对象中起id作用的键名，默认为id，可更改
                * @param {setProps}    setProps     级联选择则器字段，继承自element，设置级联选择器渲染的id和name
            `"></Fun>
            

            <Code lang="html" slot="code">{{code1}}</Code>
        </Demo>

        <H3>增删改标签信息</H3>
        
        <Demo title="通过级联选择器添加标签">
            <config-tag-component
                slot="demo"
                @editTag="editTag"
                :tagList="tagList2"
                :tagConfigKey="'abc'"
                :setLabel="{mainKey: 'id', label: 'name'}"></config-tag-component>
            <Fun slot="demo"  :data="`
                * @param {Array}   tagList       标签数组列表
                * @param {String}   tagConfigKey    当前tag标签的key值
                * @param {Object}    setLabel         字段自定义配置
            `"></Fun>
            <Fun slot="demo"  :data="`
                * @param {Object}  @editTag  回调当前标签的信息
            `"></Fun>
            

            <Code lang="html" slot="code">{{code2}}</Code>
        </Demo>
    </Article>
</template>

<script>
import {
        cascaderTagComponent,
        configTagComponent,
    } from '@/public/components/index.js'
export default {
    components: {
        cascaderTagComponent,
        configTagComponent,
    },
    data(){
        return {
            optionList: [{id:1,name:"aaa"}],
            tagList1: [],
            tagList2: [{id:1,name:"aaa", type: 'enable'},{id:2,name:"bbb", type: 'disable'}],
            code1: `
<template>
    <cascader-tag-component
        :optionList="optionList"
        :tagList="tagList"></cascader-tag-component>
<template>
<script>
    import {
        cascaderTagComponent
    } from '@/public/components/index.js'
    export default {
        components: {
            cascaderTagComponent,
        },
        data(){
            return {
                optionList: [{id:1,name:"aaa"}],
                tagList: [],
            }
        }
    }
${'<'}/script>`,
            code2: `
<template>
    <config-tag-component
        @editTag="editTag"
        :tagList="tagList"
        :tagConfigKey="'abc'"
        :setLabel="{mainKey: 'id', label: 'name'}"></config-tag-component>
<template>
<script>
    import {
        configTagComponent
    } from '@/public/components/index.js'
    export default {
        components: {
            configTagComponent,
        },
        data(){
            return {
                tagList2: [{id:1,name:"aaa", type: 'enable'},{id:2,name:"bbb", type: 'disable'}],
            }
        },
        methods: {
            editTag(){
                alert('回调方法')
            }
        }
    }
${'<'}/script>`,
        }
    },
    methods: {
        editTag(){
            alert('回调方法')
        }
    }
}
</script>

<style>

</style>