


// 压缩图片
function compress(img) {
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    // let initSize = img.src.length;
    let width = img.width;
    let height = img.height;
    canvas.width = width;
    canvas.height = height;
    // 铺底色
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, width, height);
    // 进行压缩
    let ndata = canvas.toDataURL('image/jpeg', 0.8);
    return ndata;
}

// base64转成bolb对象
function dataURItoBlob(base64Data) {
    let byteString;
    if (base64Data.split(',')[0].indexOf('base64') >= 0) { byteString = atob(base64Data.split(',')[1]); } else { byteString = unescape(base64Data.split(',')[1]); }
    let mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];
    let ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], { type: mimeString });
}



export {
    dataURItoBlob,
    compress,

}