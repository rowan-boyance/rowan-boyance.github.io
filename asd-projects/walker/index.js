/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  
  // Game Item Objects
  var KEY = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,  
  };

  var KEY2 = {
    W: 87,
    A: 65,
    S: 83,
    D: 68,
  };
  var walker1 = {
    positionX: 0,
    positionY: 0,
    speedX: 0,
    speedY: 0,
  }

  var walker2 = {
    positionX: 200,
    positionY: 200,
    speedX: 0,
    speedY: 0,
  }
  // one-time setup

  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);
  $(document).on('keyup', handleKeyUp);                            // change 'eventType' to the type of event you want to handle

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem();
    newColor();
    wallCollision();
    redrawGameItem();
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.LEFT) {
      console.log("left pressed")
      walker1.speedX = -5
    } else if (event.which === KEY.RIGHT) {
      console.log("right pressed")
      walker1.speedX = 5
    } else if (event.which === KEY.UP) {
      console.log("up pressed")
      walker1.speedY = -5
    } else if (event.which === KEY.DOWN) {
      console.log("down pressed")
      walker1.speedY = 5
    }

    if (event.which === KEY2.A) {
      walker2.speedX = -5
      console.log("A Key pressed")
    } else if (event.which === KEY2.D) {
      walker2.speedX = 5
      console.log("D Key pressed")
    } else if (event.which === KEY2.W) {
      walker2.speedY = -5
      console.log("W Key pressed")
    } else if (event.which === KEY2.S) {
      walker2.speedY = 5
      console.log("S Key pressed")
    }
  }
  
  function handleKeyUp(event) {
    if (event.which === KEY.LEFT || event.which === KEY.RIGHT) {
      walker1.speedX = 0
    } else if (event.which === KEY.UP || event.which === KEY.DOWN) {
      walker1.speedY = 0
    }

    if (event.which === KEY2.A || event.which === KEY2.D) {
      walker2.speedX = 0
    } else if (event.which === KEY2.W || event.which === KEY2.S) {
      walker2.speedY = 0
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////


  function repositionGameItem() {
    walker1.positionX += walker1.speedX
    walker1.positionY += walker1.speedY
    walker2.positionX += walker2.speedX
    walker2.positionY += walker2.speedY
  }

  function wallCollision() {
    if (walker1.positionX >= $("#board").width()-51) {
      walker1.positionX = $("#board").width()-51
      walker1.speedX = 0
    } else if (walker1.positionX <= 0) {
      walker1.positionX = 0
      walker1.speedX = 0
    } 

    if (walker1.positionY >= $("#board").height()-51) {
      walker1.positionY = $("#board").height()-51;
      walker1.speedY = 0;
    } else if (walker1.positionY <= 0) {
      walker1.positionY = 0;
      walker1.speedY = 0;
    }

    if (walker2.positionX >= $("#board").width()-51) {
      walker2.positionX = $("#board").width()-51
      walker2.speedX = 0
    } else if (walker2.positionX <= 0) {
      walker2.positionX = 0
      walker2.speedX = 0
    } 

    if (walker2.positionY >= $("#board").height()-51) {
      walker2.positionY = $("#board").height()-51;
      walker2.speedY = 0;
    } else if (walker2.positionY <= 0) {
      walker2.positionY = 0;
      walker2.speedY = 0;
    }
  }

  function newColor() {
    var randomColor = "#000000".replace(/0/g, function () {
      return (~~(Math.random() * 16)).toString(16);
    });
    var randomColor2 = "#000000".replace(/0/g, function () {
      return (~~(Math.random() * 16)).toString(16);
    });
    $("#walker1").css("background-color",randomColor)
    $("#walker2").css("background-color",randomColor2)
  }
  
  function redrawGameItem() {
    $("#walker1").css("left", walker1.positionX)
    $("#walker1").css("top", walker1.positionY)
    $("#walker2").css("left", walker2.positionX)
    $("#walker2").css("top", walker2.positionY)
  }

  

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}