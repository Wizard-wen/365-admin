import {apiRequestVideo} from '@/request/index'


export const videoService = {
    /**
     * 获取视频列表
     * @param videoParam
     */
    getVideoList(videoParam:any){
        return apiRequestVideo.getVideoList(videoParam)
    },
    /**
     * 获取视频
     */
    getVideo(id:number){
        return apiRequestVideo.getVideo(id)
    },
    /**
     * 编辑视频
     */
    editVideo(videoObject:any){
        return apiRequestVideo.editVideo(videoObject)
    },
    /**
     * 删除视频
     */
    deleteVideo(id:number){
        return apiRequestVideo.deleteVideo(id)
    },
}