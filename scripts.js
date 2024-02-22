

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
let oldDiv = null
let oldRGB

let redLevel = 0
let greenLevel = 0
let blueLevel = 0



let redStart = true
let greenStart = false
let blueStart = false

let redMaxed = false
let greenMaxed = false
let blueMaxed = false


const startPress = () => {
  document.getElementById("start").style.visibility = "hidden"
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
  // for (i = 0; i < screen.width; i++) {
  //   everyFrame()

  // }
}

//do some base funstions in startpress then have it go to next div every iteration
//window.setInterval(everyFrame, 200)
const everyFrame = () => {
  console.log("doom started ticking")
  for (let i = 0; i < screen.width; i++) {
    let currentDiv = divList[i]
    if (oldDiv == null) {
      oldRGB = currentDiv.style.backgroundColor
    } else {
      oldRGB = oldDiv.style.backgroundColor
    }
    //below line turns "rgb(0,0,0)" into [0, 0, 0]... somehow
    oldRGB = oldRGB.match(/\d+/g) 
    oldR = Number(oldRGB[0])
    oldG = Number(oldRGB[1])
    oldB = Number(oldRGB[2])
    //absolute num(oldR - screen.width%255)



    if (redStart == true) {
      if (redMaxed == false) {
        oldR += 1
      } else if (redMaxed == true) {
        oldR -= 1
        
      }
  
      if (oldR > 255) {
        redMaxed = true
        greenStart = true

        // oldR -= 1
      } else if (oldR < 0) {
        console.log('reset')
        redMaxed = false
        oldR = 0
        redStart = false
      }
    }
    
    if (greenStart == true) {
      if (greenMaxed == false) {
        oldG += 1
      } else if (greenMaxed == true) {
        oldG -= 1
        
      }
  
      if (oldG > 255) {
        greenMaxed = true
        blueStart = true

      } else if (oldG < 0) {
        console.log('reset')
        greenMaxed = false
        oldG = 0
        greenStart = false
      }
    }

    if (blueStart == true) {
      if (blueMaxed == false) {
        oldB += 1
      } else if (blueMaxed == true) {
        oldB -= 1
        
      }
  
      if (oldB > 255) {
        blueMaxed = true
        redStart = true

      } else if (oldB < 0) {
        console.log('reset')
        blueMaxed = false
        oldG = 0
        blueStart = false
      }
    }



    // if (oldR > 255) {
    //   redMaxed = true
    //   // oldR -= 1
    // } else if (oldR <= 0) {
    //   console.log('reset')
    //   redMaxed = false
    //   oldR = 0
    // }

    




    let newR = Math.abs(oldR - Math.floor(i/screen.width*255))
    // console.log(newR)
    //                                 "rgb(0, 0, 0)"
    currentDiv.style.backgroundColor = 'rgb(' + oldR + ', ' + oldG + ', ' + oldB + ')';
    
    console.log(oldG)

    // currentColor += 1
    // if (currentColor == avaliableColors.length) {
    //   currentColor = 0
    // }


    oldDiv = divList[i]
  }
  // currentColor += 1
}