
<template>
    <div class="code" v-if="!onlyBtn">
        <pre :class="{bg: bg}">
            <code :class="language" ref="code">
                <slot></slot>
            </code>
        </pre>
        <span class="scale" @click="scale">
            <el-tooltip :content="'放大'" placement="top" transfer>
                <i class="el-icon-full-screen" size="18"></i>
            </el-tooltip>
        </span>
        <span class="copy" @click="clip">
            <el-tooltip :content="'复制代码'" placement="top" transfer>
                <i class="el-icon-copy-document" size="18" v-if="!copied"></i>
                <i class="el-icon-check" size="18" v-else style="color:#5cb85c"></i>
            </el-tooltip>
        </span>
        <!-- <Modal class-name="code-scale-modal" :title="title" width="65" v-model="openScale">
            <pre :class="{bg: bg}">
                <code :class="language" ref="code2"></code>
            </pre>
        </Modal> -->
    </div>

    <el-button v-else @click="scale" icon="md-qr-scanner"  shape="circle">
        查看代码
        <div ref="code" style="display: none">
            <slot></slot>
        </div>
        <Modal class-name="code-scale-modal" :title="title" width="65" v-model="openScale">
            <pre :class="{bg: bg}">
                <code :class="language" ref="code2"></code>
            </pre>
        </Modal>
    </el-button>

</template>
<script>
    // 代码高亮
    import hljs from 'highlightjs/highlight.pack.js';
    // 文字拷贝组件
    import Clipboard from 'clipboard';

    import tag_map from './tag-map';

    function replaceTag(source, tagMap) {
        Object.keys(tagMap).forEach(i => {
            source = source
                .replace(new RegExp(`<${i}\(\\W+\)`, 'g'), `<${tagMap[i]}$1`)
                .replace(new RegExp(`<\/${i}>`, 'g'), `<\/${tagMap[i]}>`);
        });
        return source;
    }

    export default {
        props: {
            /**
             * 开发语言
             */
            lang: {
                type: String,
                default: 'javascript'
            },
            /**
             * 
             */
            bg: {
                type: Boolean,
                default: false
            },
            /**
             * 
             */
            onlyBtn: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                openScale: false, //打开放大弹框
                code: '', //代码文本
                copied: false,
                docLang: this.$lang,
                title: 'Code'
            }
        },
        computed: {
            /**
             * 设置开发语言
             */
            language () {
                if (this.lang == 'auto') {
                    return ''
                } else {
                    return this.lang;
                }
            }
        },
        mounted () {
            this.code = this.$refs.code.innerHTML.replace(/\n/, '');
            this.$refs.code.innerHTML = this.code;
            hljs.highlightBlock(this.$refs.code);

            // this.$refs.code2.innerHTML = this.code;
            // hljs.highlightBlock(this.$refs.code2);

            const Demo = this.$parent.$parent.$parent;
            if (Demo.$options.name === 'Demo') {
                this.title = Demo.title;
            }
        },
        methods: {
            /**
             * 
             */
            clip () {
                const code = this.code.replace(/&lt;/g,'<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
                const clipboard = new Clipboard('.copy', {
                    text () {
                        return code
                    }
                });

                clipboard.on('success', (e) => {
                    e.clearSelection();
                    clipboard.destroy();
                    this.copied = true;
                    if (this.docLang === 'zh-CN') {
                        // this.$Message.success('代码已复制到剪贴板');
                        this.$message({
                            message: '代码已复制到剪贴板',
                            type: 'success'
                        });
 
                    } else {
                        this.$message({
                            message: 'Code copied',
                            type: 'success'
                        });
                        // this.$Message.success('Code copied');
                    }
                    setTimeout(() => {
                        this.copied = false;
                    }, 2000);
                });
            },
            /**
             * 放大
             */
            scale () {
                const h = this.$createElement;
                this.$msgbox({
                    title: '消息',
                    message: this.code,
                    showCancelButton: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    // beforeClose: (action, instance, done) => {
                    //     if (action === 'confirm') {
                    //         instance.confirmButtonLoading = true;
                    //         instance.confirmButtonText = '执行中...';
                    //         setTimeout(() => {
                    //             done();
                    //             setTimeout(() => {
                    //                 instance.confirmButtonLoading = false;
                    //             }, 300);
                    //         }, 3000);
                    //     } else {
                    //         done();
                    //     }
                    // }
                })
                // this.openScale = true;
            },



            // 以下代码暂时没用
			getSource(source, type){
				const regex = new RegExp(`<${type}[^>]*>`);
				let openingTag = source.match(regex);

				if (!openingTag) return '';
				else openingTag = openingTag[0];

                return source.slice(source.indexOf(openingTag) + openingTag.length, source.lastIndexOf(`</${type}>`));
            },
            openFiddle(){
                const source = this.$refs.code.textContent;

                const script = this.getSource(source, 'script').replace(/export default/, 'var Main =');
                const style = this.getSource(source, 'style');
                const template = '<div id="app">' + replaceTag(this.getSource(source, 'template'), tag_map) + '</div>';

                const html = [
                    '<script src="//unpkg.com/vue/dist/vue.js"></scr' + 'ipt>',
                    '<script src="//unpkg.com/iview/dist/iview.min.js"></scr' + 'ipt>',
                    template
                ].join('\n');

                const css = '@import url("//unpkg.com/iview/dist/styles/iview.css");\n#app{padding: 32px;}' + style;
                const js = script + '\nvar Component = Vue.extend(Main)\nnew Component().$mount(\'#app\')';

                const data = {
                    js: js,
                    css: css,
                    html: html,
                    panel_css: 1,
                    panel_js: 3
                };

                const formAttributes = {
                    method: 'post',
                    action: 'https://jsfiddle.net/api/post/library/pure/',
                    target: '_blank',
                    id: 'fiddle-form',
                    style: 'display: none;'
                }

                const node = document.createElement('textarea');
                const form = document.createElement('form');
                for (const attr in formAttributes) {
                    form.setAttribute(attr, formAttributes[attr]);
                }

                for (let name in data) {
                    node.name = name;
                    node.value = data[name].toString();
                    form.appendChild(node.cloneNode());
                }

                document.body.appendChild(form);
                form.submit();
                document.body.removeChild(form);
            }
        }
    }
</script>
<style scoped>
    .code{
        background-color: #f7f7f7;
        margin: 10px 0;
        padding: 3px 5px;
        border-radius: 5px;
    }
    .code pre code{
        padding: 5px 15px;
    }
    div{
        position: relative;
        font-size: 14px;
    }
    span.copy, span.scale, span.open-fiddle{
        border-radius: 0 0 3px 3px;
        padding: 2px 5px;
        position: absolute;
        top: 5px;
        right: 0;
        color: #b2b2b2;
        cursor: pointer;
    }
    span.scale{
        right: 25px;
    }
    span.open-fiddle{
        right: 50px;
    }
    .bg + span.copy{
        right: 5px;
    }
    span.copy:hover, span.scale:hover, span.open-fiddle:hover{
        color: #5c6b77;
    }
    .code-scale-modal .ivu-modal-body{
        background-color: #f7f7f7;
    }
    .code-scale-modal pre{
        font-size: 14px;
    }
</style>