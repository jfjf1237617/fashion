// let dFragment=document.createDocumentFragment();
async function imgToCanvas(url) {
  const img = document.createElement("img");
  let timestamp = new Date().getTime();
  img.setAttribute("crossOrigin", "anonymous");
  img.src = url + '?' + timestamp;
  await new Promise((resolve) => (img.onload = resolve));
  const canvas = document.createElement("canvas");
  let width = 215;
  let height = width / img.width * img.height;
  canvas.width = width;
  canvas.height = height;
  canvas.getContext("2d").drawImage(img, 0, 0, width, height);
  return canvas;
}
function addWatermark(canvas, text) {
  const ctx = canvas.getContext("2d");
  // ctx.fillStyle = "white";
  ctx.textBaseline = "middle";
  // ctx.rotate(-25 * Math.PI / 180);
  // ctx.font = "100px Microsoft JhengHei";
  ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
  ctx.shadowOffsetX = 1;
  ctx.shadowOffsetY = 1;
  ctx.shadowBlur = 0;
  ctx.fillStyle = "rgba(255,255,255,0.5)";
  ctx.textAlign = 'center';
  ctx.textBaseline = 'Middle';
  ctx.translate(canvas.width, canvas.height);
  // let cpyName = "XShop-Nuxt";
  ctx.font = "30px Microsoft JhengHei";
  // if (ctx.measureText(text).width < 180) {
  // var size = 180 / text.length;
  // ctx.font = '800 ' + size + 'px ' + ' Microsoft JhengHei';
  // }
  ctx.fillText(text, -50, -30);
  // for (let i = (canvas.height * 0.5) * -1; i < 800; i += 250) {
  //   for (let j = 0; j < canvas.height * 2; j += 80) {
  //     ctx.fillText(cpyName, i, j)
  //   }
  // }
  return canvas;
}
function canvasToImg(canvas, id) {
  var image = new Image();
  image.setAttribute("crossOrigin", "anonymous");
  let quality=0.5
  image.src = canvas.toDataURL("image/png",quality);
  // image.classList.add('picture-hide');
  image.classList.add(`pic-${id}`);
  image.style.display="none"
  // dFragment.appendChild(image);
  // document.body.appendChild(image);
  return image;
  // return dFragment;
}
async function watermark(picUrl, id) {
  let imgUrl = '';
  let imgArr = [];
  for (let i = 0; i < picUrl.length; i++) {
    imgUrl = picUrl[i];
    const tempCanvas = await imgToCanvas(imgUrl);
    const canvas = addWatermark(tempCanvas, id);
    const img = canvasToImg(canvas,id);
    imgArr.push(img)
  }
  return imgArr
  // let imgUrl=picUrl
  // const tempCanvas = await imgToCanvas(imgUrl);
  // const canvas = addWatermark(tempCanvas, id);
  // const img = canvasToImg(canvas,id);
  // return img
}
export default watermark;
// export {dFragment};
