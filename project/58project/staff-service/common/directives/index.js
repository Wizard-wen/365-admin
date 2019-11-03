import Vue from 'vue'

Vue.directive('hide', {
    bind(el, binding, vnode){
        //父元素
        el.style.position = 'relative'
        
        //
        Vue.nextTick(() =>{
            text.style.lineHeight=el.scrollHeight+'px'; 
        })
        //添加两个元素
        var divEle = document.createElement('div')
        var text = document.createElement('p')

        divEle.classList = ['hide']

        text.innerText = 'coming soon ...'
        text.classList = ['hide-text']
        
        el.appendChild(divEle)
        el.appendChild(text)
    },
    inserted(el){
        
    }
})


