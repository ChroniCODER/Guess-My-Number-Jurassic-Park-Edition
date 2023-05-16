localStorage.removeItem('difficulty');

//Get radio difficulty choice

//let diffChoice: string = "";



/* function onButtonPlayClick(){
  //let diffChoice: string = "";
  let test = getElementByClass('diffButton');
  console.log('afficher', test);

    if(document.getElementsByClassName("easyButton")!.value === "easy"){
    localStorage.setItem('difficulty','easy')!;
    //diffChoice = localStorage.getItem('difficulty')!;
    
    //console.log('LOG value de form',diffChoice);
    //return diffChoice;

  } else if (document.getElementsByClassName("mediumButton")!.value === "medium"){
    localStorage.setItem('difficulty','medium')!;
    //diffChoice = localStorage.getItem('difficulty')!;
    
    //console.log('LOG value de form',diffChoice);
    //return diffChoice;

  } else if (document.getElementsByClassName("hardButton")!.value === "hard"){
    localStorage.setItem('difficulty','hard')!;
    //diffChoice = localStorage.getItem('difficulty')!;
    //console.log('LOG value de form',diffChoice)!;
    //return diffChoice;
  } 
  
} */



//diffChoice = onButtonPlayClick()!;



//localStorage.setItem('difficulty','easy');
localStorage.setItem('difficulty','medium');
//localStorage.setItem('difficulty','hard');

const displayTitle:HTMLElement = document.querySelector('.displayTitle')!;
const displayGame:HTMLElement =  document.querySelector('.displayGame')!;
//let currentDifficulty = onButtonPlayClick();
let currentDifficulty = localStorage.getItem('difficulty');
console.log('statut de currentDifficulty',currentDifficulty)

//displayTitle.style.display = 'none';
//displayGame.style.display = 'none';

displaySet();

//displayTitle.style.display = 'block';
//.style.display = 'none'



//set variable

let randomMinByDiff: number = 0;
let randomMaxByDiff: number = 0;
let initialscoreByDiff: number = 0;

//init highScore via local storage

const storageHighScoreStr = GetHighScoreByDiff();

console.log('storagehishscoreLOG', storageHighScoreStr);

let currentHighScore = 0;

if (storageHighScoreStr) {
  currentHighScore = parseInt(storageHighScoreStr);
}

type Elements = {
  [key: string]: Element | null;
} 

const elements: Elements = {};


const highScore = getElementByClass('highscore')!;
highScore.textContent = currentHighScore.toString();

//SET & INITIALISE difficulty
const difficulties: any = {
  easy: {
    initialScore: 30,
    inititalRandomValues: {
      min: 1,
      max: 30
    }
  },
  medium: {
    initialScore: 60,
    inititalRandomValues: {
      min: 1,
      max: 60
    }
  },
  hard: {
    initialScore: 100,
    inititalRandomValues: {
      min: 1,
      max: 100
    }
  }
}


if(currentDifficulty === 'easy'){
  randomMinByDiff = difficulties.easy.inititalRandomValues.min;
  randomMaxByDiff = difficulties.easy.inititalRandomValues.max;
  initialscoreByDiff = difficulties.easy.initialScore;
  docChanger('between', `(between ${randomMinByDiff} and ${randomMaxByDiff})`, 1);

}else if(currentDifficulty === 'medium'){
  randomMinByDiff = difficulties.medium.inititalRandomValues.min;
  randomMaxByDiff = difficulties.medium.inititalRandomValues.max;
  initialscoreByDiff = difficulties.medium.initialScore;
  docChanger('between', `(between ${randomMinByDiff} and ${randomMaxByDiff})`, 1);

}else if(currentDifficulty === 'hard'){
  randomMinByDiff = difficulties.hard.inititalRandomValues.min;
  randomMaxByDiff = difficulties.hard.inititalRandomValues.max;
  initialscoreByDiff = difficulties.hard.initialScore;
  docChanger('between', `(between ${randomMinByDiff} and ${randomMaxByDiff})`, 1);
}

let currentScore = initialscoreByDiff;
const score = getElementByClass('score')!;
score.textContent = currentScore.toString();

const secretNumber = getRandomInt(randomMinByDiff, randomMaxByDiff);
console.log(secretNumber);

//console.log(currentDifficulty, randomMinByDiff, randomMaxByDiff, initialscoreByDiff);

//console.log(difficulties.easy.initialScore);


//---------functions--------------



function onButtonAgainClick() {
  //location.reload();
  localStorage.removeItem('difficulty');
}

function SetHighScoreByDiff(){
  if(currentDifficulty === 'easy'){
    if (currentScore > currentHighScore) {
      currentHighScore = currentScore;
      highScore.textContent = currentHighScore.toString();
      localStorage.setItem('easyHighscore', currentHighScore.toString());
    }
  }else if(currentDifficulty === 'medium'){
    if (currentScore > currentHighScore) {
      currentHighScore = currentScore;
      highScore.textContent = currentHighScore.toString();
      localStorage.setItem('mediumHighscore', currentHighScore.toString());
    }
  }else if(currentDifficulty === 'hard'){
    if (currentScore > currentHighScore) {
      currentHighScore = currentScore;
      highScore.textContent = currentHighScore.toString();
      localStorage.setItem('hardHighscore', currentHighScore.toString());
    }
  }
}

function GetHighScoreByDiff(){
  let highScoreByDiff:string = '';

  if(currentDifficulty === 'easy'){
    highScoreByDiff = localStorage.getItem('easyHighscore')!;
    return highScoreByDiff;
  }
  if(currentDifficulty === 'medium'){
    highScoreByDiff = localStorage.getItem('mediumHighscore')!;
    return highScoreByDiff;
  }
  if(currentDifficulty === 'hard'){
    highScoreByDiff = localStorage.getItem('hardHighscore')!;
    return highScoreByDiff;
  }
}

function displaySet(){
  if (!currentDifficulty){
  displayGame.style.display = 'none';
  console.log('la var currentDiff est vide');
} else{
displayTitle.style.display = 'none';
console.log(`la diff ${currentDifficulty} est choisi affichage du jeu`);
}
}

function verifyInput() {
  const inputValue = parseInt(inputElement.value);
  if (inputElement.value.includes('-') || inputValue > randomMaxByDiff) {
    console.log('problem dans la fonction verify input');
    inputElement.value = '0';
  }
}

let buttonAgainElt = getElementByClass('btn.again');

function blinking(obj: any, blinkColor: string, speed: number) {
  obj.style.backgroundColor = blinkColor;
  setInterval(function () {
    obj.style.opacity =
      obj.style.opacity == 1 ? 0 : 1;
  }, speed);
}

function getElementByClass(className: string) {
  if (elements[className]) {
    return elements[className];
  } else {
    const newElement = document.querySelector(`.${className}`);
    elements[className] = newElement;
    return newElement;
  }
}

// ramdom number creation
function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function docChanger(className: string, entrie: any, speed: number) {
  let element = getElementByClass(className);
  if(element === null) return;
  setTimeout(() => {
    if(element === null) return;
    element.textContent = entrie;
  }, speed);
}

//initialisation de la valeur d'input

let inputElement: HTMLInputElement = document.querySelector('.guess')!;
const tempNumber = 0;
inputElement.value = tempNumber.toString();

let checkButtonElement = getElementByClass('btn.check')!;


//**********************************game mechanics************************************************************
//************************************************************************************************************

function onButtonClick() {
  const parsedValue = parseInt(inputElement.value);
  const numberElt = getElementByClass('number')!;

  if (parsedValue === 0 || !inputElement.value) {
    docChanger('message', 'no number', 1);
    docChanger('number', 'no', 1);
    numberElt.classList.remove('error');
  } else if (parsedValue > secretNumber) {
    docChanger('message', `${parsedValue} is greater than the secret number`, 1);
    currentScore -= 1;
    score.textContent = currentScore.toString();
    docChanger('number', '', 1);
    numberElt.classList.add('error');
  } else if (parsedValue < secretNumber) {
    docChanger('message', `${parsedValue} is less than the secret number`, 1);
    docChanger('number', '', 1);
    currentScore -= 1;
    score.textContent = currentScore.toString();
    numberElt.classList.add('error');
  }
  if (parsedValue === secretNumber) {
    docChanger('message', 'bonne réponse ! BRAVO ! ', 1);
    docChanger('check', 'BRAVO !', 1);
    checkButtonElement.setAttribute('disabled', 'true');
    blinking(buttonAgainElt, 'green', 400);
    numberElt.classList.remove('error');
    docChanger('number', secretNumber, 1);
    SetHighScoreByDiff();
    /* 
    if (currentScore > currentHighScore) {
      currentHighScore = currentScore;
      highScore.textContent = currentHighScore.toString();
      localStorage.setItem('highscore', currentHighScore.toString());
    } */
  }

  if (score.textContent == '0') {
    docChanger('message', 'GAME OVER ! ', 1);
    docChanger('check', 'GAME OVER', 1);
    checkButtonElement.setAttribute('disabled', 'true');
    blinking(buttonAgainElt, 'red', 400);
    numberElt.classList.remove('error');
    docChanger('number', secretNumber, 1);

  }
}



//STYLE JS

//document.querySelector('body')!.style.backgroundColor = 'blue';

//const buttonElement: any = getElementByClass('diffButton')!;
const easyButton:HTMLElement = document.getElementById('easyButton')!;
const mediumButton:HTMLElement = document.getElementById('mediumButton')!;
const hardButton:HTMLElement = document.getElementById('hardButton')!;

let test ="";

easyButton.addEventListener("click", ()=>{
  test='easy';
  console.log('add event',test);
});

mediumButton.addEventListener("click", ()=>{
  test='medium';
  console.log('add event',test);
});

hardButton.addEventListener("click", ()=>{
  test='hard';
  console.log('add event',test);
});




/* function onButtonPlayClick(){
  //let diffChoice: string = "";
  console.log (easyButton.value);
  let test = "";
  console.log('premier test',test);
  if(easyButton.value === "easy"){
  test = 'easy'
  console.log('TEST EASY', test); 
  return;
  } 
  if(mediumButton.value === "medium"){
  test = 'medium';
  console.log('TEST MEDIUM', test);
  return;
  }
  if (hardButton.value === "hard"){
  test = 'hard';
  console.log('TEST HARD', test);
  return;
  }
 */
  /* if(document.getElementsByClassName("easyButton")!.value === "easy"){
    localStorage.setItem('difficulty','easy')!;
    //diffChoice = localStorage.getItem('difficulty')!;
    
    //console.log('LOG value de form',diffChoice);
    //return diffChoice;

  } else if (document.getElementsByClassName("mediumButton")!.value === "medium"){
    localStorage.setItem('difficulty','medium')!;
    //diffChoice = localStorage.getItem('difficulty')!;
    
    //console.log('LOG value de form',diffChoice);
    //return diffChoice;

  } else if (document.getElementsByClassName("hardButton")!.value === "hard"){
    localStorage.setItem('difficulty','hard')!;
    //diffChoice = localStorage.getItem('difficulty')!;
    //console.log('LOG value de form',diffChoice)!;
    //return diffChoice;
  } */

