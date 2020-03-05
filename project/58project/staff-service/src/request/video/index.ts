import {api_video} from './api_video'
import axios from 'axios'



export const apiRequestVideo:api_video = {
    /**
     * 获取视频列表
     * @param videoParam
     */
    getVideoList(videoParam){
        return axios.post(`./admin/video/getVideoList?`,{
            ...videoParam,
        })
    },
    /**
     * 获取视频
     */
    getVideo(id){
        return axios.get(`./admin/video/getVideo?id=${id}`)
    },
    /**
     * 编辑视频
     */
    editVideo(videoObject){
        return axios.post(`./admin/video/editVideo`,{
            ...videoObject,
        })
    },
    /**
     * 删除视频
     */
    deleteVideo(id){
        return axios.post(`./admin/video/deleteVideo`,{
            id,
        })
    },
}