export interface api_video{
    getVideoList:{(videoParam:object):Promise<any>},
    getVideo:{(id:string):Promise<any>},
    editVideo:{(videoObject:object):Promise<any>},
    deleteVideo:{(id:string):Promise<any>},
}