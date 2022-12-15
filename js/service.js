'use strict'

var gImages = [
    {id: getRandomId(), url: '1.jpg', keywords: ['funny', 'cat']},
    {id: getRandomId(), url: '2.jpg', keywords: ['funny', 'cat']},
    {id: getRandomId(), url: '3.jpg', keywords: ['funny', 'cat']},
    {id: getRandomId(), url: '4.jpg', keywords: ['funny', 'cat']},
    {id: getRandomId(), url: '5.jpg', keywords: ['funny', 'cat']},
    {id: getRandomId(), url: '6.jpg', keywords: ['funny', 'cat']},
    {id: getRandomId(), url: '7.jpg', keywords: ['funny', 'cat']},
    {id: getRandomId(), url: '8.jpg', keywords: ['funny', 'cat']},
    {id: getRandomId(), url: '9.jpg', keywords: ['funny', 'cat']},
    {id: getRandomId(), url: '10.jpg', keywords: ['funny', 'cat']},
    {id: getRandomId(), url: '11.jpg', keywords: ['funny', 'cat']},
    {id: getRandomId(), url: '12.jpg', keywords: ['funny', 'cat']},
    {id: getRandomId(), url: '13.jpg', keywords: ['funny', 'cat']},
    {id: getRandomId(), url: '14.jpg', keywords: ['funny', 'cat']},
    {id: getRandomId(), url: '15.jpg', keywords: ['funny', 'cat']},
    {id: getRandomId(), url: '16.jpg', keywords: ['funny', 'cat']},
    {id: getRandomId(), url: '17.jpg', keywords: ['funny', 'cat']},
    {id: getRandomId(), url: '18.jpg', keywords: ['funny', 'cat']},
];

var gTextBoxes = []
let gTextBoxToMove = null


function getImages(){
    return gImages
}
function getTextBoxes(){
   return gTextBoxes
}

function getTextBoxPos(index){
    return {x:gTextBoxes[index].x , y :gTextBoxes[index].y}
}

function setTextInTextBox(index,text){
     gTextBoxes[index].text = text
}

function setColorInTextBox(index,color){
    gTextBoxes[index].color = color
}

function setFontInTextBox(index,font){
    gTextBoxes[index].font = font
}

function addTextBox(text ,x, y, width, height, color, font){
    gTextBoxes.push({text:text, x :x, y: y ,width: width, height: height, color: color, font: font})
}

function checkIfClickedTextBox(clickedPos){
    for(var i = 0 ; i < gTextBoxes.length; i++){
        if(gTextBoxes[i].y - gTextBoxes[i].height <= clickedPos.y &&
           gTextBoxes[i].y > clickedPos.y){
             gTextBoxToMove =  gTextBoxes[i]
             return true
        }
    }
  return false
}

function moveTextBox(dx, dy) {
    gTextBoxToMove.x += dx
    gTextBoxToMove.y += dy

}

function clearTextBoxes(){
    gTextBoxes = []
}