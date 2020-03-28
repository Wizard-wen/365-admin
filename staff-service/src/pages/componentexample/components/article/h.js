var cid = 0

export default function(tag){
    return {
        data: function() {
            return {
            }
        },
        methods: {
        },
        render(h){
            return h(tag, {class: tag, attrs:{"id":"h" + cid++}}, [this.$slots['default']])
        },
    }
}
