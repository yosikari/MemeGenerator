'use strict'
let gCanvas = document.querySelector('.canvas')
var gContext = gCanvas.getContext('2d');
var isSideBarOpen = false
let gStartPos
let isDrag = false
var currImgId = null
var textBoxIndex = 0
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']
var currColor = 'white'
var currFont = 'Impact'

function onInit() {
    renderImgs()
    addTextBox("", 10, 60, gCanvas.width, 60, currColor, currFont)
    addListeners()
}

//open and close editor 

function onImgClick(id) {
    currImgId = id
    renderEditor()
    document.querySelector('.editor').style.display = 'grid'
    document.querySelector('.search-bar').style.display = 'none'
    document.querySelector('.images-container').style.display = 'none'
}


function onCloseEditor() {
    if (confirm('Are you sure?')) {
        document.querySelector('.editor').style.display = 'none'
        document.querySelector('.search-bar').style.display = 'flex'
        document.querySelector('.images-container').style.display = 'grid'


        document.querySelector('.text-input').value = ''
        clearTextBoxes()
        addTextBox("", 10, 60, gCanvas.width, 60, currColor, currFont)
        textBoxIndex = 0
    }
}




//Handle the listeners
function addListeners() {
    addMouseListeners()
    addTouchListeners()
    //Listen for resize ev
    window.addEventListener('resize', () => {
        //resizeCanvas()

    })
}


// function renderCanvas() { //todo for touch-ev
//     gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
//     renderCircle()
// }

function addMouseListeners() {
    gCanvas.addEventListener('mousemove', onMove)
    gCanvas.addEventListener('mousedown', onDown)
    gCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gCanvas.addEventListener('touchmove', onMove)
    gCanvas.addEventListener('touchstart', onDown)
    gCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    // Get the ev pos from mouse or touch
    const pos = getEvPos(ev)
    //Get the text to move
    if (!checkIfClickedTextBox(pos)) return
    isDrag = true

    //Save the pos we start from
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    if (!isDrag) return
    const pos = getEvPos(ev)
    // Calc the delta , the diff we moved
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveTextBox(dx, dy)
    // Save the last pos , we remember where we`ve been and move accordingly
    gStartPos = pos
    // The canvas is render again after every move
    renderEditor()
}

function onUp() {
    isDrag = false
    document.body.style.cursor = 'grab'
}



function getEvPos(ev) {
    // Gets the offset pos , the default pos
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    // Check if its a touch ev
    if (TOUCH_EVS.includes(ev.type)) {
        //soo we will not trigger the mouse ev
        ev.preventDefault()
        //Gets the first touch point
        ev = ev.changedTouches[0]
        //Calc the right pos according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}



function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight
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

function onSetColor(elColorPicker) {
    currColor = elColorPicker.value
    setColorInTextBox(textBoxIndex, currColor)
    renderEditor()
}

function onSetFont(elFontSelector) {
    currFont = elFontSelector.value
    setFontInTextBox(textBoxIndex, currFont)
    renderEditor()
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



function renderEditor() {
    let imgs = getImages()
    let currimg = imgs.find(img => img.id === currImgId)
    let imgUrl = `img/meme-imgs (square)/${currimg.url}`
    make_base(imgUrl);
    let textBoxes = getTextBoxes()
    textBoxes.forEach((textBox, index) => {
        if (textBox.text) {
            drawText(textBox.text, textBox.x, textBox.y, index, textBox.color, textBox.font)
        }
    })
}

function onRemove() {
    if (confirm('Are you sure?')) {
        document.querySelector('.text-input').value = ''
        clearTextBoxes()
        addTextBox('', 10, 60, gCanvas.width, 60, currColor, currFont)
        textBoxIndex = 0
        renderEditor()
    }
}

function make_base(imgUrl) {
    let base_image = new Image();
    base_image.src = imgUrl;
    gCanvas.width = base_image.width
    gCanvas.height = base_image.height
    gContext.drawImage(base_image, 0, 0)
}


function onTextInput() {
    let str = document.querySelector('.text-input').value
    renderEditor()
    let pos = getTextBoxPos(textBoxIndex)
    drawText(str, pos.x, pos.y)
}



function drawText(str, x, y, index = textBoxIndex, color = currColor, font = currFont) {
    console.log(currFont)
    const ctx = gCanvas.getContext("2d")
    ctx.font = `60px ${font}`
    ctx.fillStyle = color
    ctx.lineWidth = 5
    ctx.strokeText(str, x, y)
    ctx.fillText(str, x, y)
    setTextInTextBox(index, str)
}

function onAddNewTextBox() {
    document.querySelector('.text-input').value = ''
    textBoxIndex++
    if (textBoxIndex === 1) {
        addTextBox('', 10, gCanvas.height - 100, gCanvas.width, 60, currColor, currFont)
    } else {
        addTextBox('', 10, gCanvas.height / 2, gCanvas.width, 60, currColor, currFont)
    }
    setTextInTextBox(textBoxIndex, null)


}