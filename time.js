let timeId,
    startStopwatch,
    getSeconds,
    getMinutes,
    getHours,
    startTimer,
    buttons = getButtons();
//Getting buttons from the page*********************************************************************************   
function getButtons(){
    let buttonStart = document.querySelector('#buttonStart'),
        buttonStop = document.querySelector('#buttonStop'),
        timeDisplay = document.querySelector('#timeDisplay'),
        stopwatch = document.querySelector('#stopwatch'),
        timer =  document.querySelector('#timer'),
        clear = document.querySelector('#clear');
    return {
          'buttonStart': buttonStart,
          'buttonStop': buttonStop,
          'timeDisplay': timeDisplay,
          'stopwatch': stopwatch,
          'timer': timer,
          'clear' : clear 
    };
}
// Getting clock display******************************************************************************************
function setHours(amount){
    let firstCell = document.querySelector('#firstCell'),
        secondCell = document.querySelector('#secondCell');

    if (typeof amount == 'number'){
        amount = String(amount);
    }
    firstCell.innerHTML = amount[0]; 
    secondCell.innerHTML = amount[1];
 
    if (amount < 10) {
      firstCell.innerHTML = 0;
      secondCell.innerHTML = amount[0];
   }
}
 
function setMinutes(amount){
    let thirdCell = document.querySelector('#thirdCell'),
        fourthCell = document.querySelector('#fourthCell');

    if (typeof amount == 'number'){
        amount = String(amount);
    }
    thirdCell.innerHTML = amount[0];
    fourthCell.innerHTML = amount[1]; 
 
    if (amount < 10) {
      thirdCell.innerHTML = 0;
      fourthCell.innerHTML = amount[0];  
    }
}
 
function setSeconds(amount){
    let fifthCell = document.querySelector('#fifthCell'),
        sixthCell = document.querySelector('#sixthCell');
    
    if (typeof amount == 'number'){
      amount = String(amount);
    }
    fifthCell.innerHTML = amount[0];  
    sixthCell.innerHTML = amount[1]; 

    if (amount < 10) {
      fifthCell.innerHTML = 0;
      sixthCell.innerHTML = amount[0];
    }
}
//Functions for button style and state*****************************************************************************
function buttonsModes(selector, styleOfbutton, buttonState){ 
  selector = document.querySelector(selector);
  selector.style.backgroundColor = styleOfbutton;
  selector.disabled = buttonState;
}

function buttonsStyle(selector1, selector2, selector3, style1, style2, style3){
  selector1 = document.querySelector(selector1);
  selector2 = document.querySelector(selector2);
  selector3 = document.querySelector(selector3);

  selector1.style.background = style1;
  selector2.style.background = style2;
  selector3.style.background = style3;
}

function buttonsState(selector1, selector2, selector3, state1, state2, state3){
  selector1 = document.querySelector(selector1);
  selector2 = document.querySelector(selector2);
  selector3 = document.querySelector(selector3);

  selector1.disabled = state1;
  selector2.disabled = state2;
  selector3.disabled = state3;
}

//CurrentTime**************************************************************************************************
function getCurrentTime() {  
  buttons.timeDisplay.style.background = 'violet';

  function setTime(){
    let date = new Date(),
        hour = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds();
    
    setHours(hour);
    setMinutes(minutes);
    setSeconds(seconds);
   }

   timeId = setInterval(setTime, 1000);
   buttons.buttonStart.disabled = true;
   buttons.buttonStop.disabled = true;
}
getCurrentTime();
//StopWatch********************************************************************************************************
function stopwatchOn() {
  let minutes = '00',
      seconds = '00',
      milliseconds = '00',
      thirdCell = document.querySelector('#thirdCell');
      
    function setStopwatch() {
        milliseconds++;
        setSeconds(milliseconds);
    
          if (milliseconds == 100) {
              seconds++;
              milliseconds = 0;
              setMinutes(seconds);
    
            if (seconds == 60) {
                minutes++;
                seconds = 0;
                thirdCell.innerHTML = 0;
                setHours(minutes);
          }           
        }         
      }
  startStopwatch = setInterval(setStopwatch, 10);
}
//***************************************************************************************************
var enterSc;
var enterMn;
var enterHr;

function enterTime () {
  enterSc = prompt('Enter secons',0);
  enterMn = prompt('Enter minutes',0);
  enterHr = prompt('Enter hours',0);

  if (enterSc == '' || enterSc == null) {
        sixthCell.innerHTML = 0;
  }
  if (enterMn == '' || enterMn == null) {
        fourthCell.innerHTML = 0;
  }
  if (enterHr == '' || enterHr == null) {
        secondCell.innerHTML = 0;
  }
  
  if (enterSc < 10) {
    fifthCell.innerHTML = 0;
    sixthCell.innerHTML = enterSc[0];
  } else {
    fifthCell.innerHTML = enterSc[0];
    sixthCell.innerHTML = enterSc[1];
  }

  if (enterMn < 10) {
    thirdCell.innerHTML = 0;
    fourthCell.innerHTML = enterMn[0];
  } else {
    thirdCell.innerHTML = enterMn[0];
    fourthCell.innerHTML = enterMn[1];
  }

  if (enterHr < 10) {
    firstCell.innerHTML = 0;
    secondCell.innerHTML = enterHr[0];
  } else {
    firstCell.innerHTML = enterHr[0];
    secondCell.innerHTML = enterHr[1];
  }
}

var startTimer;

function timerOn() {
  var secondCount = enterSc;  
  var minuteCount = enterMn;
  var hourCount = enterHr;
  
  startTimer = setInterval( function() {
    secondCount--;
      if (secondCount < 10) {
          secondCount = String(secondCount);
          fifthCell.innerHTML = 0;
          sixthCell.innerHTML = secondCount[0];
        } else {
          secondCount = String(secondCount);
          fifthCell.innerHTML = secondCount[0];
          sixthCell.innerHTML = secondCount[1];
        }

          if (secondCount < 0 && minuteCount > 0) {
              minuteCount--;           
              secondCount = 59;
              fifthCell.innerHTML = 5;
              sixthCell.innerHTML = 9;
              
              if (minuteCount < 10) {
                 minuteCount = String(minuteCount);
                 thirdCell.innerHTML = 0;
                 fourthCell.innerHTML = minuteCount[0];
                 } else {
                 minuteCount = String(minuteCount);
                 thirdCell.innerHTML = minuteCount[0];
                 fourthCell.innerHTML = minuteCount[1];
               }

                if (minuteCount <= 0 && hourCount > 0) {

                     hourCount--;
                     minuteCount = 60;
                     secondCount = 60;

                      if (hourCount < 10) {
                      hourCount = String(hourCount);
                      firstCell.innerHTML = 0;
                      secondCell.innerHTML = hourCount[0];
                      } else {
                      hourCount = String(hourCount);
                      firstCell.innerHTML = hourCount[0];
                      secondCell.innerHTML = hourCount[1];
                      }                                 
         }        
    }
      if (secondCount == 0 && minuteCount == 0 && hourCount == 0) {
         clearInterval(startTimer);
         enterSc = 0;
         enterMn = 0;
         enterHr = 0;
         buttonStart.style.backgroundColor = "rgb(82, 78, 78)";
         buttonStart.disabled = false;
         timeDisplay.disabled = false;
         stopwatch.disabled = false;
     }
  }, 1000);
}
//***********************************************************************************************************
function clearDisplay() { 
  clearInterval(timeId);
  clearInterval(startTimer);
  enterSc = 0;
  enterMn = 0;
  enterHr = 0;
   firstCell.innerHTML = 0; 
   secondCell.innerHTML = 0;  
   thirdCell.innerHTML = 0;
   fourthCell.innerHTML = 0;
   fifthCell.innerHTML = 0;  
   sixthCell.innerHTML = 0;
}
//*************************************Buttons click******************************************* */
clear.addEventListener('click', () => {
  clearDisplay();
  timeDisplay.style.background = "rgb(175, 138, 175)";
  stopwatch.style.background = "rgb(175, 138, 175)";
  timer.style.background = "rgb(175, 138, 175)";
  buttonStart.style.backgroundColor = "rgb(82, 78, 78)";
  buttonStop.style.backgroundColor = "rgb(82, 78, 78)";
  buttonStart.disabled = true;
 });

timeDisplay.addEventListener('click', () => {
  timeDisplay.style.background = "grey";
  stopwatch.style.background = "rgb(175, 138, 175)";
  timer.style.background = "rgb(175, 138, 175)";
  clearInterval(startTimer); 
  clearInterval(startStopwatch);
  getCurrentTime();
});

stopwatch.addEventListener('click', () => {
  clearDisplay();
  stopwatch.style.background = "grey";
  timeDisplay.style.background = "rgb(175, 138, 175)";
  timer.style.background = "rgb(175, 138, 175)";
  buttonStart.disabled = false;
  buttonStop.disabled = false;
});

buttonStart.addEventListener('click', () => { 
  if (enterSc || enterMn || enterHr) {timerOn();}
  else {stopwatchOn();};
  buttonStart.style.backgroundColor = "red";
  buttonStop.style.backgroundColor = "rgb(82, 78, 78)";
  stopwatch.disabled = true;
  timer.disabled = true;
  timeDisplay.disabled = true;
  buttonStart.disabled = true;
});

buttonStop.addEventListener('click', () => {
  clearInterval(startStopwatch);
  clearInterval(startTimer);
  buttonStart.style.backgroundColor = "rgb(82, 78, 78)";
  buttonStop.style.backgroundColor = "red";
  stopwatch.disabled = false;
  timer.disabled = false;
  timeDisplay.disabled = false;
  buttonStart.disabled = false;
});

timer.addEventListener('click', () => { 
  timer.style.background = "grey";
  clearDisplay();
  enterTime();
  stopwatch.style.background = "rgb(175, 138, 175)";
  timeDisplay.style.background = "rgb(175, 138, 175)";
  timer.disabled = true;
  buttonStart.disabled = false;
  buttonStop.disabled = false;
});

