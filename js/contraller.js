'use strict'
let canvas = document.querySelector('.canvas')
var context = canvas.getContext('2d');
var isSideBarOpen = false

function onInit() {
    renderImgs()
}


function onMyMemes() {
    console.log('my-memes')
}

function onGallery() {
    console.log('gallery')
}

function onAbout() {
    console.log('about')
}

function renderImgs() {
    let imgs = getImages()
    let strHtml = ''
    imgs.forEach(img => {
        strHtml += `<div class="meme-box" onclick="onImgClick(${img.id})"><img class="meme-img" src="img/meme-imgs (square)/${img.url}"></div>`
    })
    document.querySelector('.images-container').innerHTML = strHtml
}


function toggleSideNav() {
    let elSideBar = document.querySelector('.side-bar')
    if (isSideBarOpen) {
        elSideBar.style.display = 'none'
    } else {
        elSideBar.style.display = 'block'
    }
    isSideBarOpen = !isSideBarOpen
}

function onImgClick(id) {
    renderEditor(id)
    document.querySelector('.editor').style.display = 'grid'
    document.querySelector('.search-bar').style.display = 'none'
    document.querySelector('.images-container').style.display = 'none'
}


function onCloseEditor() {
    document.querySelector('.editor').style.display = 'none'
    document.querySelector('.search-bar').style.display = 'flex'
    document.querySelector('.images-container').style.display = 'grid'
}

function renderEditor(id) {
    let imgs = getImages()
    let currimg = imgs.find(img => img.id === id)
    let imgUrl = `img/meme-imgs (square)/${currimg.url}`

    make_base(imgUrl);
}

function make_base(imgUrl) {
    console.log(imgUrl)
    let base_image = new Image();
    base_image.src = imgUrl;

    // let hRatio = context.width / base_image.width;
    // let vRatio = context.height / base_image.height;
    // let ratio = Math.min(hRatio, vRatio);
    // context.drawImage(base_image, 0, 0, base_image.width, base_image.height, 0,0,base_image.width*ratio, base_image.height*ratio);

    context.drawImage(base_image, 0, 0);
}