
import iconComponent from './icon.vue'

export {
    iconComponent
}

export const computeStringLength = (array, listKey, configKey) =>{
    let string = 0
    if(Array.isArray(array)){
        array.forEach(it =>{
            if(this.workerConfigForm[configKey].find(i => i.id == it)){
                let baseLength = parseInt(this.workerConfigForm[configKey].filter(i => i.id == it)[0].name.length *12 )
                string += (baseLength + 27)
            }
        })
    } else {
        if(this.workerConfigForm[configKey].find(i => i.id == array)){
            string = parseInt(this.workerConfigForm[configKey].filter(i => i.id == array)[0].name.length * 12) + 27
        } else {
            string = 0
        }
    }
    if(string > this.maxLength[listKey]){
        this.maxLength[listKey] = (string + 20) > 80 ? (string + 20) : 80
    }
}