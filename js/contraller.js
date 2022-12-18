'use strict'
let gCanvas = document.querySelector('.canvas')
var gContext = gCanvas.getContext('2d');
var isSideBarOpen = false
let gStartPos
let isDrag = false
var currImgId = null
var savedMemIndx = null
var textBoxIndex = 0
var numTextBoxes = 1
var currFontSize = 60
var renderSavedMem = false
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']
var currColor = '#ffffff'
var currFont = 'Impact'

function onInit() {
    renderImgs()
    addTextBox("", 10, 60, gCanvas.width, currFontSize, currColor, currFont)
    addListeners()
}

//open and close editor 

function onImgClick(id) {
    if (id !== 'upload-img') {
        currImgId = id
        renderEditor()
        document.querySelector('.editor').style.display = 'grid'
        document.querySelector('.search-bar').style.display = 'none'
        document.querySelector('.images-container').style.display = 'none'
    } else {

    }
}


function onCloseEditor() {
    renderSavedMem = false
    document.querySelector('.editor').style.display = 'none'
    document.querySelector('.search-bar').style.display = 'flex'
    document.querySelector('.images-container').style.display = 'grid'
    document.querySelector('.text-input').value = ''
    clearTextBoxes()
    addTextBox("", 10, 60, gCanvas.width, currFontSize, currColor, currFont)
    textBoxIndex = 0
}



function onCloseMyMemes() {
    onCloseEditor()
    document.querySelector('.my-memes').style.display = 'none'
    document.querySelector('.search-bar').style.display = 'flex'
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
    if (!checkIfClickedTextBox(pos)) {
        textBoxIndex = -1
        renderEditor()
        return
    }
    textBoxIndex = getSelectedTextBoxIndex()
    let textBox = getTextBox(textBoxIndex)
    currColor = textBox.color
    currFont = textBox.font
    currFontSize = textBox.fontSize
    document.querySelector('.color-picker').value = currColor
    document.querySelector('.font-form').value = currFont
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

function onMyMemes(isSideBar) {
    if (isSideBar) {  //close side bar on switch pages
        toggleSideNav()
    }
    onCloseEditor()
    document.querySelector('.my-memes').style.display = 'block'
    document.querySelector('.search-bar').style.display = 'none'
    document.querySelector('.images-container').style.display = 'none'
    renderSavedMemes()
}

function onGallery(isSideBar) {
    if (isSideBar) {  //close side bar on switch pages
        toggleSideNav()
    }
    onCloseMyMemes()
}

function onAbout(isSideBar) {
    if(isSideBar){   //close side bar on switch pages
        toggleSideNav()
    }
    alert('coming soon...')
}

function onSetColor(elColorPicker) {
    currColor = elColorPicker.value
    let index = textBoxIndex < 0 ? numTextBoxes - 1 : textBoxIndex
    setColorInTextBox(index, currColor)
    renderEditor()
}


function onSetFont(elFontSelector) {
    currFont = elFontSelector.value
    let index = textBoxIndex < 0 ? numTextBoxes - 1 : textBoxIndex
    setFontInTextBox(index, currFont)
    renderEditor()
}

function onFontSize(delta) {
    let index = textBoxIndex < 0 ? numTextBoxes - 1 : textBoxIndex
    setFontSize(index, delta)
    renderEditor()
}

function hideElement(el) {
    el.style.display = 'none'
}


function renderImgs(isFillter = false) {
    if (isFillter) {
        var imgs = getFilteredImages()
    } else {
        var imgs = getImages()
    }
    let strHtml = `<div class="meme-box upload" onclick="onUploadImg()">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" rel="stylesheet" />
    <label class="upload btn btn-default btn-sm btn-file">
    <i class="fa fa-upload fa-2x" aria-hidden="true"></i>
    <input type="file" onchange="onUploadImg(this)" style="display: none;">
    </label></div>`
    imgs.forEach(img => {
        strHtml += `<div class="meme-box" onclick="onImgClick(${img.id})"><img class="meme-img" src="${img.url}"></div>`
    })
    document.querySelector('.images-container').innerHTML = strHtml
}


function toggleSideNav() {
    let elSideBarShadow = document.querySelector('.side-bar-shadow')
    let elSideBar = document.querySelector('.side-bar')
    if (isSideBarOpen) {
        elSideBarShadow.style.display = 'none'
        elSideBar.style.display = 'none'
    } else {
        elSideBarShadow.style.display = 'block'
        elSideBar.style.display = 'block'
    }
    isSideBarOpen = !isSideBarOpen
}



function renderEditor() {
    let imgUrl
    if (renderSavedMem) {
        imgUrl = getSavedMemes()[savedMemIndx].dataUrl
    }
    else {
        let imgs = getImages()
        let currimg = imgs.find(img => img.id === currImgId)
        imgUrl = currimg.url
    }
    make_base(imgUrl);
    let textBoxes = getTextBoxes()
    textBoxes.forEach((textBox, index) => {
        if (textBox.text) {
            drawText(textBox.text, textBox.x, textBox.y, index, textBox.color, textBox.font, textBox.fontSize)
        }
    })
}

function onRemove() {
    if (confirm('Are you sure?')) {
        document.querySelector('.text-input').value = ''
        clearTextBoxes()
        addTextBox('', 10, 60, gCanvas.width, currFontSize, currColor, currFont, currFontSize)
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
    let index = textBoxIndex < 0 ? numTextBoxes - 1 : textBoxIndex
    let textBox = getTextBox(index)
    drawText(str, textBox.x, textBox.y, index, textBox.color, textBox.font, textBox.fontSize)
}



function drawText(str, x, y, index = textBoxIndex, color = currColor, font = currFont, fontSize = currFontSize) {
    const ctx = gCanvas.getContext("2d")
    if (index === textBoxIndex) {
        ctx.beginPath()
        ctx.rect(0, y - (fontSize - 7), gCanvas.width, fontSize)
        ctx.lineWidth = 1;
        ctx.stroke()
        document.querySelector('.text-input').value = str
    }
    ctx.font = `${fontSize}px ${font}`
    ctx.fillStyle = color
    ctx.lineWidth = 5
    ctx.strokeText(str, x, y)
    ctx.fillText(str, x, y)
    //console.log(ctx.measureText(str).width)
    setTextInTextBox(index, str)
}

function onAddNewTextBox() {
    document.querySelector('.text-input').value = ''
    numTextBoxes++
    if (numTextBoxes === 2) {
        addTextBox('', 10, gCanvas.height - 100, gCanvas.width, currFontSize, currColor, currFont)
    } else {
        addTextBox('', 10, gCanvas.height / 2, gCanvas.width, currFontSize, currColor, currFont)
    }
    setTextInTextBox(numTextBoxes - 1, null)
    textBoxIndex = numTextBoxes - 1
}

function drawStiker(stiker) {
    let x = gCanvas.width / 2.5
    let y = gCanvas.height / 2
    renderEditor()
    addTextBox('', x, y, gCanvas.width, currFontSize, currColor, currFont)
    drawText(stiker, x, y, numTextBoxes)
    numTextBoxes++
}
function onSaveMeme() {
    let dataUrl = gCanvas.toDataURL("image/jpeg")
    addMemeToMyMemes(dataUrl)
    //open "saved" auto-closed modal
    document.querySelector('.saved-modal').style.display = 'block'
    setTimeout(() => { document.querySelector('.saved-modal').style.display = 'none' }, 3000)
}

function renderSavedMemes() {
    let strHtml = ''
    getSavedMemes().forEach((currMem, index) =>
        strHtml += `<div class="saved-mem" onclick="onSavedMemClick(${index})" style="background-image: 
        url(${currMem.dataUrl}); background-size: cover;">
        <img class="editor-btns btn-download btn-my-memes" onclick="onDownloadSavedMeme(${index})" 
        src="img/btns/download.png"><img class="editor-btns top btn-remove btn-my-memes"
        onclick="onRemoveSavedMeme(${index})" src="img/btns/remove.png"></div>`)
    document.querySelector('.my-memes-container').innerHTML = strHtml
}


function onDownloadSavedMeme(index) {
    event.stopPropagation()
    let dataUrl = getSavedMemes()[index].dataUrl
    downloadURL(dataUrl)

}

function onDownloadCanvasMeme() {
    let dataUrl = gCanvas.toDataURL("image/jpeg")
    downloadURL(dataUrl)
}

function downloadURL(url) {
    var link = document.createElement("a");
    link.href = url;
    link.download = "myMem";
    link.click();
}

function onRemoveSavedMeme(index) {
    event.stopPropagation()
    removeSavedMeme(index)
    renderSavedMemes()
}

function onSavedMemClick(index) {
    savedMemIndx = index
    renderSavedMem = true
    renderEditor()
    document.querySelector('.editor').style.display = 'grid'
    document.querySelector('.search-bar').style.display = 'none'
    document.querySelector('.images-container').style.display = 'none'
    document.querySelector('.my-memes').style.display = 'none'
}

function onUploadImg(elImage) {
    const reader = new FileReader()
    reader.addEventListener("load", () => {
        let url = reader.result
        let grups = []
        var stop = false
        while (!stop) {
            var category = prompt('Please add categories for your image (exit to stop)')
            if (category.toUpperCase() !== 'EXIT') {
                grups.push(category)
            } else {
                stop = true
            }
        }
        addImage(url, grups)
        renderImgs()
    })
    if (elImage)
        reader.readAsDataURL(elImage.files[0])
}

function onSearch(val) {
    searchFillter(val)
    renderImgs(true)
}