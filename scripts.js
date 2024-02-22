

let divColor
let divList = []
let avaliableColorsArray = [
['red','blue','orange','purple','green','cyan','yellow','pink'],
['#618264','#79AC78','#B0D9B1','#D0E7D2'], //green-ish
['#EEF5FF','#B4D4FF','#86B6F6','#176B87'], //blue-ish
['#711DB0','#C21292','#EF4040','#FFA732'], //purple-ish
['red','blue','orange','purple','green','cyan','yellow','pink','black','black','black','black','black','black','black','black','black','black','black','black','black'],

]
let avaliableColors = avaliableColorsArray[0]
let currentColor = 0
//change above array to determine colors


let isOn = false
let trailStart
let mainContainer = document.getElementById('main-container')
let topLine = document.getElementById('top-line')

let redLevel = 0
let greenLevel = 0
let blueLevel = 0

let redMaxed = false
let greenMaxed = false
let blueMaxed = false


const startPress = () => {
  if (isOn == true) {
    isOn = false
    clearInterval(timer)
    console.log("here")

    return
  } else {
    let timer = window.setInterval(everyFrame, 1)
    isOn = true
    divCreator()
    return
  }
}


const divCreator = () => {
  for (let i = 0; i < screen.width; i++) {
    let newDiv = document.createElement("div");
    // newDiv.style.visibility = "hidden";
    topLine.appendChild(newDiv)
    divList.push(newDiv)
    newDiv.style.width = "1px";
    newDiv.style.height = "100vh";
    newDiv.style.backgroundColor = "rgb(0, 0, 0)";
    let rect = newDiv.getBoundingClientRect();
    let currentLeft = rect.left
    let currentTop = rect.top
    
    // console.log("div creator")
    
    newDiv.style.left = currentLeft
    newDiv.style.top = currentTop
    // console.log(currentLeft)
    // console.log(currentTop)
  
  }

}


//window.setInterval(everyFrame, 200)
const everyFrame = () => {
  console.log("doom started ticking")
  for (let i = 0; i < screen.width; i++) {
    let currentDiv = divList[i];
    let oldRGB = currentDiv.style.backgroundColor
    oldRGB = oldRGB.match(/\d+/g)
    oldR = Number(oldRGB[0])
    //absolute num(oldR - screen.width%255)
    if (redMaxed == false) {
      oldR += 1
    } else if (redMaxed == true) {
      
      oldR -= 1
    }

    if (oldR > 255) {
      redMaxed = true
      oldR -= 1
    } else if (oldR <= 0) {
      console.log('reset')
      redMaxed = false
    }
    // console.log(oldR)
    let newR = Math.abs(oldR - ((screen.width%i)))
    console.log(i%screen.width)

    //                                 "rgb(0, 0, 0)"
    currentDiv.style.backgroundColor = 'rgb(' + newR + ', 0, 0)';

    // console.log(currentDiv.style.backgroundColor)

    // currentColor += 1
    // if (currentColor == avaliableColors.length) {
    //   currentColor = 0
    // }

  }
  // currentColor += 1
}