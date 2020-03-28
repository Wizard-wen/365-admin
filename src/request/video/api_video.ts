export interface api_video{
    getVideoList:{(videoParam:object):Promise<any>},
    getVideo:{(id:number):Promise<any>},
    editVideo:{(videoObject:object):Promise<any>},
    deleteVideo:{(id:number):Promise<any>},
}