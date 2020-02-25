<template>
    <Article>
        <H1>自定义表单类</H1>
        <P><Strong>ifec-manager-frontend-framework</Strong>是一个IFEC研发中心通用的前后分离框架，主要包括3部分：</P>
        <Ul>
            <Li>1.集成了前端脚手架的后台系统开发框架</Li>
            <Li>2.对第三方控件的封装，提供第一方控件的开发</Li>
            <Li>3.默认的主题样式</Li>
            <Li>4.教程及最佳实践</Li>
        </Ul>
        <H3>表单详情展示案例</H3>
        
        <Demo title="表单详情展示案例">
            <div slot="demo" style="padding: 24px;background:#f0f2f5;">
                <card-box-component
                    slot="demo"
                    :title="'表单详情展示'">
                    <template slot="contains">
                        <detail-form-component>
                            <detail-form-item-component
                                :label="'护理依赖程度'"
                                :size="3"
                                :value="'自理'"></detail-form-item-component>
                            <detail-form-item-component
                                :label="'护理依赖程度'"
                                :size="3"
                                :value="'自理'"></detail-form-item-component>
                            <detail-form-item-component
                                :label="'护理依赖程度'"
                                :size="3"
                                :value="'自理'"></detail-form-item-component>
                            <detail-form-item-component
                                :label="'护理依赖程度'"
                                :size="2"
                                :value="'自理'"></detail-form-item-component>
                            <detail-form-item-component
                                :label="'护理依赖程度'"
                                :size="2"
                                :value="'自理'"></detail-form-item-component>
                            <detail-form-item-component
                                :label="'护理依赖程度'"
                                :size="1"
                                :value="'自理'"></detail-form-item-component>
                        </detail-form-component>
                    </template>
                </card-box-component>
            </div>
            <Fun slot="demo"  :data="`
            `"></Fun>
            

            <Code lang="html" slot="code">{{code1}}</Code>
        </Demo>
        <H3>表单详情引用第三方组件展示案例</H3>
        <P>表单详情组件可以引用第三方组件。</P>
        <P>要将<Strong>detail-form-item-component</Strong>的type属性指定为<Strong>template</Strong></P>
        <P>同时，要将第三方组件的<Strong>slot</Strong>也指定为<Strong>template</Strong></P>
        <Demo title="表单详情引用第三方组件展示案例">
            <detail-form-component
                slot="demo">
                <detail-form-item-component
                    :type="'template'"
                    :label="'头像'"
                    :size="2"
                    :value="headIcon">
                    <icon-component slot="template" height="60" width="60" :iconUrl="''"></icon-component>
                </detail-form-item-component>
                <detail-form-item-component
                    :type="'template'"
                    :label="'头像'"
                    :size="2"
                    :value="headIcon">
                    <icon-component slot="template" height="60" width="60" :iconUrl="''"></icon-component>
                </detail-form-item-component>
            </detail-form-component>
            <Code lang="html" slot="code">{{code2}}</Code>
        </Demo>
        <H3><Strong>card-box-component</Strong>表单展示卡片组件</H3>
        <P><Strong>card-box-component</Strong>组件用来展示表单详情。</P>
        <P><Strong>card-box-component</Strong>组件可以包含<Strong>contains</Strong>和<Strong>control</Strong>两个插槽。</P>
        <Demo title="表单展示卡片组件">
            <div slot="demo" style="padding: 24px;background:#f0f2f5;">
                <card-box-component 
                    :title="'表单详情展示'">
                    <template slot="contains">
                        这里是contains
                    </template>
                    <template slot="control">
                        <el-button size="mini" type="primary">控制按钮</el-button>
                    </template>
                </card-box-component>
                <card-box-component 
                    :title="'表单详情展示'">
                    <template slot="contains">
                        这里是contains
                    </template>
                    <template slot="control">
                        <el-button size="mini" type="primary">控制按钮</el-button>
                    </template>
                </card-box-component>
            </div>
            
            <Code lang="html" slot="code">{{code3}}</Code>
        </Demo>

    </Article>
</template>

<script>
import headIcon from '../../assets/head-icon.jpg'
import {
        detailFormItemComponent,
        detailFormComponent,
        formItemLabelTooltipComponent,
        cardBoxComponent,
    } from '@/public/components/index.js'
export default {
    components: {
        // detailFormItemComponent,
        // detailFormComponent,
        // formItemLabelTooltipComponent,
        // cardBoxComponent,
    },
    data(){
        return {
            headIcon,
            code1:`
<card-box-component :title="'表单详情展示'">
    <template slot="contains">
        <detail-form-component>
            <detail-form-item-component :label="'护理依赖程度'" :size="3" :value="'自理'"></detail-form-item-component>
            <detail-form-item-component :label="'护理依赖程度'" :size="3" :value="'自理'"></detail-form-item-component>
            <detail-form-item-component :label="'护理依赖程度'" :size="3" :value="'自理'"></detail-form-item-component>
            <detail-form-item-component :label="'护理依赖程度'" :size="2" :value="'自理'"></detail-form-item-component>
            <detail-form-item-component :label="'护理依赖程度'" :size="2" :value="'自理'"></detail-form-item-component>
            <detail-form-item-component :label="'护理依赖程度'" :size="1" :value="'自理'"></detail-form-item-component>
        </detail-form-component>
    </template>
</card-box-component>`,
            code2:`
<detail-form-component>
    <detail-form-item-component
        :type="'template'"
        :label="'头像'"
        :size="3"
        :value="headIcon">
        <icon-component slot="template" :iconUrl="''"></icon-component>
    </detail-form-item-component>
</detail-form-component>`,
            code3: `
<card-box-component
    :title="'表单详情展示'">
    <template slot="contains">
        这里是contains
    </template>
    <template slot="control">
        <el-button size="mini" type="primary">控制按钮</el-button>
    </template>
</card-box-component>`
        }
    },
    methods: {

    }
}
</script>

<style>

</style>