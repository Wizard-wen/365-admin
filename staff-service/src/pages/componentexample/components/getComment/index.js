//正则获取注释
export default function getComment(jsonStr){
    var codes = jsonStr.split('\n').map(code=>code.trim()).map(code=>code.indexOf('//') == 0 ? code : code.replace(/\s*/, ''))

    return function(name){
        var comments = []
        for(let index in codes){
            let code = codes[index]
            if(code.indexOf('//') == 0){
                comments.push(code)
            } else {
                if(code.indexOf(`${name}:`) == 0 || code.indexOf(`'${name}':`) == 0 || code.indexOf(`"${name}":`) == 0){
                    return comments.map(comment=>comment.substr(2, comment.length)).join('\n')
                }else {
                    comments = []
                }
            }
        }
        return ''
    }
}