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
        strHtml += `<div class="meme-box"><img class="meme-img" src="/img/meme-imgs (square)/${img.url}"></div>`
    })
    document.querySelector('.images-container').innerHTML = strHtml
}


function toggleSideNav() {
    let elSideBar = document.querySelector('.side-bar')
    if (isSideBarOpen) {
        elSideBar.style.right = '-100%'
    } else {
        elSideBar.style.right = '-32px'
    }
    isSideBarOpen = !isSideBarOpen
}