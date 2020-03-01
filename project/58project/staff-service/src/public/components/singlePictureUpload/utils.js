


export default {
    // base64转成bolb对象
    dataURItoBlob(base64Data){
        let byteString;
        if (base64Data.split(',')[0].indexOf('base64') >= 0) { 
            byteString = atob(base64Data.split(',')[1]);
        } else { 
            byteString = unescape(base64Data.split(',')[1]); 
        }
        let mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];
        let ia = new Uint8Array(byteString.length);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ia], { type: mimeString });
    },
    // 压缩图片
    compress(img, scale) {
        console.log(scale)
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');

        // 图片原始尺寸
        var originWidth = img.width;
        var originHeight = img.height;
        // 最大尺寸限制
        var maxHeight = 400;
        // 目标尺寸
        var targetWidth = originWidth, targetHeight = originHeight;
        // 图片尺寸超过400x400的限制
        if ( originHeight > maxHeight) {
            targetHeight = maxHeight;
            targetWidth = maxHeight * scale;
        }
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        // 铺底色
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, targetWidth, targetHeight);
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
        // 进行压缩
        let ndata = canvas.toDataURL('image/jpeg', 0.8);
        return ndata;
    },
}