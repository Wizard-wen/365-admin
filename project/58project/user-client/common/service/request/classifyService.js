import axios from 'axios'

export default {
    /**
     * 获取分类列表
     */
    getClassifyList() {
        return axios.get('/user/service/getCategory')
    }

}
