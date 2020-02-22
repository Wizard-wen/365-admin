<template>
    <div class="codeStyle">
        <pre v-if="codeType == 1" class="language-html public"><span class="token tag" v-html="$options.filters.prismJS(code)"></span></pre>
        <pre v-else-if="codeType == 2" class="language-css public"><span class="token tag"  v-html="$options.filters.prismJS(code)"></span></pre>
        <pre v-else class="language-js public"><span class="token tag"  v-html="$options.filters.prismJS(code)"></span></pre>
    </div>

</template>

<script>
    import Prism from "prismjs";
    import "prismjs/themes/prism-tomorrow.css";

    export default {
        props: {
            //要展示的代码类型 html：1 css：2 js：3
            codeType: {
                type: [Number,String],
                default: 1
            },
            //要展示的h代码
            code: {
                type: String,
                default: ''
            },
        },
        filters: {
            prismJS(value) {
                return Prism.highlight(value, Prism.languages.javascript)
            }
        },
    };

</script>

<style scoped>
    .code {
        width: 100%;
        padding: 20px;
        box-sizing: border-box;
        overflow: hidden;
    }

    .public {
        line-height: 1.2!important;
        overflow-x: scroll!important;
    }
</style>
