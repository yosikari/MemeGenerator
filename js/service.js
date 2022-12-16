'use strict'

const IMGS_KEY = 'images'
const MEMES_KEY = 'memes'

var gImages = [
    { id: getRandomId(), url: 'img/meme-imgs (square)/1.jpg', keywords: ['funny', 'cat'] },
    { id: getRandomId(), url: 'img/meme-imgs (square)/2.jpg', keywords: ['funny', 'cat'] },
    { id: getRandomId(), url: 'img/meme-imgs (square)/3.jpg', keywords: ['funny', 'cat'] },
    { id: getRandomId(), url: 'img/meme-imgs (square)/4.jpg', keywords: ['funny', 'cat'] },
    { id: getRandomId(), url: 'img/meme-imgs (square)/5.jpg', keywords: ['funny', 'cat'] },
    { id: getRandomId(), url: 'img/meme-imgs (square)/6.jpg', keywords: ['funny', 'cat'] },
    { id: getRandomId(), url: 'img/meme-imgs (square)/7.jpg', keywords: ['funny', 'cat'] },
    { id: getRandomId(), url: 'img/meme-imgs (square)/8.jpg', keywords: ['funny', 'cat'] },
    { id: getRandomId(), url: 'img/meme-imgs (square)/9.jpg', keywords: ['funny', 'cat'] },
    { id: getRandomId(), url: 'img/meme-imgs (square)/10.jpg', keywords: ['funny', 'cat'] },
    { id: getRandomId(), url: 'img/meme-imgs (square)/11.jpg', keywords: ['funny', 'cat'] },
    { id: getRandomId(), url: 'img/meme-imgs (square)/12.jpg', keywords: ['funny', 'cat'] },
    { id: getRandomId(), url: 'img/meme-imgs (square)/13.jpg', keywords: ['funny', 'cat'] },
    { id: getRandomId(), url: 'img/meme-imgs (square)/14.jpg', keywords: ['funny', 'cat'] },
    { id: getRandomId(), url: 'img/meme-imgs (square)/15.jpg', keywords: ['funny', 'cat'] },
    { id: getRandomId(), url: 'img/meme-imgs (square)/16.jpg', keywords: ['funny', 'cat'] },
    { id: getRandomId(), url: 'img/meme-imgs (square)/17.jpg', keywords: ['funny', 'cat'] },
    { id: getRandomId(), url: 'img/meme-imgs (square)/18.jpg', keywords: ['funny', 'cat'] },
];

var gTextBoxes = []
let gIndexSelctedTextBox = -1

var gSavedMemes = []


function addImage(url, keywords){
    gImages.unshift({id: getRandomId(), url:url, keywords: keywords})
    _SaveImgsToStorage()
}

function getImages() {
    let storegeImages = loadFromStorage(IMGS_KEY)
    gImages = storegeImages ? storegeImages : gImages
    return gImages
}
function getTextBoxes() {
    return gTextBoxes
}

function getTextBox(index){
  return gTextBoxes[index]
}

function getTextBoxPos(index) {
    return { x: gTextBoxes[index].x, y: gTextBoxes[index].y }
}

function setTextInTextBox(index, text) {
    gTextBoxes[index].text = text
}

function setColorInTextBox(index, color) {
    gTextBoxes[index].color = color
}

function setFontInTextBox(index, font) {
    gTextBoxes[index].font = font
}

function setFontSize(index, delta){
    if(gTextBoxes[index].fontSize + delta === 25 || gTextBoxes[index].fontSize + delta === 120) return
    gTextBoxes[index].fontSize += delta
}

function addTextBox(text, x, y, width, fontSize, color, font) {
    gTextBoxes.push({ text: text, x: x, y: y, width: width, fontSize: fontSize, color: color, font: font })
}

function checkIfClickedTextBox(clickedPos) {
    for (var i = 0; i < gTextBoxes.length; i++) {
        if (gTextBoxes[i].y - gTextBoxes[i].fontSize <= clickedPos.y &&
            gTextBoxes[i].y > clickedPos.y) {
            gIndexSelctedTextBox = i
            return true
        }
    }
    return false
}

function moveTextBox(dx, dy) {
    gTextBoxes[gIndexSelctedTextBox].x += dx
    gTextBoxes[gIndexSelctedTextBox].y += dy

}

function getSelectedTextBoxIndex() {
    return gIndexSelctedTextBox;
}

function clearTextBoxes() {
    gTextBoxes = []
    gIndexSelctedTextBox = -1
}


function addMemeToMyMemes(dataUrl) {
    gSavedMemes.push({dataUrl:dataUrl})
    _SaveMemesToStorage()
}
function removeSavedMeme(index){
    gSavedMemes.splice(index,1)
    _SaveMemesToStorage()

}

function getSavedMemes() {
    gSavedMemes = loadFromStorage(MEMES_KEY) 
    return gSavedMemes
}

function _SaveImgsToStorage() {
    saveToStorage(IMGS_KEY, gImages)
}

function _SaveMemesToStorage() {
    saveToStorage(MEMES_KEY, gSavedMemes)
}