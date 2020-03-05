export class multiplePicture {
    private _url: string = '';
    name:string = '';
    constructor(){

    }
    
    get url(){
        return this._url;
    }
    set url(value){
        this._url = value;
    }

}