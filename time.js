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
//Timer************************************************************************************************************
function getTime() {
  getSeconds = prompt('Enter the number of seconds',0);
  getMinutes = prompt('Enter the number of minutes',0);
  getHours = prompt('Enter the number of hours',0);

  if (getSeconds == '' || getSeconds == null) {
        setSeconds('00');
  }
  if (getMinutes == '' || getMinutes == null) {
        setMinutes('00');
  }
  if (getHours == '' || getHours == null) {
        setHours('00');
  } 
  setHours(getHours);
  setMinutes(getMinutes);
  setSeconds(getSeconds);
}

function timerOn() {
  let fourthCell = document.querySelector('#fourthCell'),
      fifthCell = document.querySelector('#fifthCell'),
      sixthCell = document.querySelector('#sixthCell');   

      function setTimer() {    
        getSeconds--;
        setSeconds(getSeconds);
          
        if (getSeconds < 0 && getMinutes > 0) {            
          getMinutes--;                        
          getSeconds = 59;
            fourthCell.innerHTML = 0;
            fifthCell.innerHTML = 5;
            sixthCell.innerHTML = 9;
            setMinutes(getMinutes); 
                  
            if (getMinutes <= 0 && getHours > 0) {                        
              getHours--;
              getMinutes = 60;
              getSeconds = 59;
            setHours(getHours);                              
             }        
        }
           if (getSeconds == 0 && getMinutes == 0 && getHours == 0) {
              clearDisplay();
              buttonsModes('#buttonStart', 'rgb(82, 78, 78)', false);
              buttons.timeDisplay.disabled = false;
              buttons.stopwatch.disabled = false;
          }
      }  
  startTimer = setInterval(setTimer, 1000);
}
//clearDisplay************************************************************************************************
function clearDisplay() { 
  clearInterval(timeId);
  clearInterval(startTimer);
  setHours('00');
  setMinutes('00');
  setSeconds('00');
}
//Buttons click************************************************************************************************
buttons.clear.addEventListener('click', () => {
  clearDisplay();
  buttonsStyle('#timeDisplay','#stopwatch','#timer', 'rgb(175, 138, 175)','rgb(175, 138, 175)','rgb(175, 138, 175)');
  buttons.buttonStop.style.backgroundColor = 'rgb(82, 78, 78)';
  buttonsModes('#buttonStart', 'rgb(82, 78, 78)', true);
 });

buttons.timeDisplay.addEventListener('click', () => {
  buttonsStyle('#timeDisplay','#stopwatch','#timer', 'violet','rgb(175, 138, 175)','rgb(175, 138, 175)');
  clearInterval(startTimer); 
  clearInterval(startStopwatch);
  getCurrentTime();
});

buttons.stopwatch.addEventListener('click', () => {
  clearDisplay();
  buttonsStyle('#timeDisplay','#stopwatch','#timer', 'rgb(175, 138, 175)','violet','rgb(175, 138, 175)');
  buttons.buttonStart.disabled = false;
  buttons.buttonStop.disabled = false;
});

buttons.buttonStart.addEventListener('click', () => { 
  if (getSeconds > 0 || getMinutes > 0 || getHours > 0) {timerOn();}
  else {stopwatchOn();}
  buttonsModes('#buttonStart', 'red', true);
  buttons.buttonStop.style.backgroundColor = 'rgb(82, 78, 78)';
  buttonsState('#stopwatch', '#timer', '#timeDisplay', true, true, true);
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

