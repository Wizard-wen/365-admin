function findTagId(id, arr){
    for(var i = 0; i<arr.length; i++){
        if(arr[i].children){
            return findTagId(id, arr[i].children)
        } else {
            if(arr[i].id == id){
                return 3
            } 
        }
    }
}

let arr = [
{
    id:1, 
    name: '1',
    children:[
        {id: 11,name: '11'}
    ],
},
{
    id:2, 
    name: '2',
    children:[
        {id: 21,name: '21'}
    ],
},
]
let aaa = findTagId(11,arr)
console.log(aaa)