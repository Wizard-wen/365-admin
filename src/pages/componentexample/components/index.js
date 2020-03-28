import Vue from 'vue'
import demo from './demo'
import code from './code'
import jsonExplain from './jsonExplain'
import propsExplain from './propsExplain'
import funExplain from './funExplain'
import article from './article/article'
import h from './article/h.js'
import './style.css'
import './styles/common.css'
Vue.component('Demo', demo)
Vue.component('Fun', funExplain)
Vue.component('Code', code)
Vue.component('Json', jsonExplain)
Vue.component('Props', propsExplain)
Vue.component('Article', article)

for(let i=1; i <= 3; i++ ){
    Vue.component(`H${i}`, h(`h${i}`))

}
var arr = ['p', 'ul', 'li', 'strong', ['a', ['href', 'target']], ['img', ['src', 'width', 'height'], true]]
arr.forEach(function(tag){
    if(Array.isArray(tag)){
        var props = tag[1]
        tag = tag[0]
        Vue.component(tag[0].toUpperCase() + tag.slice(1), {props: props, template: `<${tag} class="${tag}" ${props.map(prop=>`:${prop}="${prop}"`).join(' ')}>${tag[2] ? '' : '<slot></slot>'}</${tag}>`})
    } else {
        Vue.component(tag[0].toUpperCase() + tag.slice(1), {template: `<${tag} class="${tag}"><slot></slot></${tag}>`})
    }
})