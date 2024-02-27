

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



let redStart = false
let greenStart = true
let blueStart = false

let redMaxed = true
let greenMaxed = false
let blueMaxed = false

let redStartOld = false
let greenStartOld = true
let blueStartOld = false

let redMaxedOld = true
let greenMaxedOld = false
let blueMaxedOld = false


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
    newDiv.style.backgroundColor = "rgb(255, 0, 0)";
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
  console.log("redStart: ", redStart,"redMaxed: ",redMaxed,"greenStart: ",greenStart,"greenMaxed: ",greenMaxed,"blueStart: ",blueStart,"blueMaxed: ",blueMaxed)

  // for (let i = 0; i < 5; i++) {

  
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
          if (greenMaxed == true) {
            oldR -= 1
          } else { //maybe
            oldR += 1
          }
          
          
        }
    
        if (oldR > 255) {
          redMaxed = true
          console.log('red max')

          if (blueMaxed == false) {
            greenStart = true
          } else {
            blueStart = true

            // redStart = false
            //drain blue
          }

          oldR -= 1
        } else if (oldR < 0) {
          redMaxed = false
          // oldR = 0
          redStart = false
          blueStart = true
        }
      }
      
      if (greenStart == true) {
        if (greenMaxed == false) {
          oldG += 1
        } else if (greenMaxed == true) {
          if (blueMaxed == true) {
            oldG -= 1
          }
          
        }
    
        if (oldG > 255) {
          greenMaxed = true

          blueStart = true
          redStart = true
          console.log('green max')

        } else if (oldG < 0) {
          greenMaxed = false
          oldG = 0
          greenStart = false
          redStart = true
        }
      }
      
      if (blueStart == true) {
        if (blueMaxed == false && greenMaxed == true && redMaxed == false) {
          oldB += 1
        } else if (blueMaxed == true && redMaxed == true) {
          oldB -= 1
        }
        //i think this code above here might be the problem??? maybe???
        //the duration of blue is longer for some reason???
        //if olb > 0, slow down? but only after bluemaxed?
    
        if (oldB > 255) {
          blueMaxed = true
          if (redMaxed == false) {
            greenStart = true
          }
          
          console.log('blue max: ', oldB, redMaxed)
        } else if (oldB < 0) {
          blueMaxed = false
          oldB = 0
          blueStart = false
          if (redMaxed == true) {
            greenStart = true
            // oldDiv = null
            console.log("end")

            // oldR = 0
          }
        }
      }




      // let newR = Math.abs(oldR - Math.floor(i/screen.width))
      // let newG = Math.abs(oldG - Math.floor(i/screen.width))
      // let newB = Math.abs(oldB - Math.floor(i/screen.width))

      // console.log(newR)

      //                                 "rgb(0, 0, 0)"
      currentDiv.style.backgroundColor = 'rgb(' + oldR + ', ' + oldG + ', ' + oldB + ')';
      oldDiv = divList[i]
      
      redLevel = oldR
      greenLevel = oldG
      blueLevel = oldB


    }
    // console.log(redStart,redMaxed,greenStart,greenMaxed,blueStart,blueMaxed)
    oldDiv = divList[1]
    




    //it could probably work without this garbage... if only i knew how
    // if (redMaxed) {
    //   redStart = false
    //   greenStart = true
    //   blueStart = false
  
    //   redMaxed = true
    //   greenMaxed = false
    //   blueMaxed = false
    // } 
    // if (greenMaxed) {
    //   redStart = true
    //   greenStart = true
    //   blueStart = true
  
    //   redMaxed = true
    //   greenMaxed = true
    //   blueMaxed = false
    // } 
    // if (greenMaxed && blueMaxed) {
    //   redStart = false
    //   greenStart = true
    //   blueStart = true
  
    //   redMaxed = false
    //   greenMaxed = true
    //   blueMaxed = true
    // } 
    // if (blueMaxed && greenMaxed != true) {
    //   redStart = false
    //   greenStart = true
    //   blueStart = true
  
    //   redMaxed = false
    //   greenMaxed = true
    //   blueMaxed = true

    // }
    // if (blueMaxed == true && redMaxed == true) {
    //   redStart = true
    //   greenStart = false
    //   blueStart = true
  
    //   redMaxed = true
    //   greenMaxed = false
    //   blueMaxed = true

    // }

    
    if (oldB == 255 && oldR >= 255) {
      console.log('hababhabbhbahbahbahhb', oldR, oldB)
    }


  // }
  // currentColor += 1
}