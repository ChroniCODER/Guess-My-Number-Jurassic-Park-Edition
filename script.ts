//localStorage.removeItem('difficulty');

//Get radio difficulty choice


let currentDifficulty: string = "";
console.log('statut de currentDifficulty',currentDifficulty)

const displayTitle:HTMLElement = document.querySelector('.displayTitle')!;
const displayGame:HTMLElement =  document.querySelector('.displayGame')!;

displaySet();


//set variable

let randomMinByDiff: number = 0;
let randomMaxByDiff: number = 0;
let initialscoreByDiff: number = 0;

//init highScore via local storage

const storageHighScoreStr = getHighScoreByDiffFromStorage();

console.log('storagehishscoreLOG', storageHighScoreStr);

let currentHighScore = 0;

/* if (storageHighScoreStr) {
  currentHighScore = parseInt(storageHighScoreStr);
}
 */
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

let currentScore = 0;
const score = getElementByClass('score')!;
score.textContent = currentScore.toString();

let secretNumber = 0 ;
console.log(secretNumber);


//---------functions--------------

function onButtonPlayClick(difficulty:string){
  
  console.log('la currentDifficulty est', currentDifficulty )

  if(difficulty === "easy"){
    currentDifficulty = 'easy';
    console.log('la currentDifficulty est devenue', currentDifficulty );
    
  } else if (difficulty === "medium"){
    currentDifficulty = 'medium';
    console.log('la currentDifficulty est devenue', currentDifficulty );
    
  } else if (difficulty === "hard"){
    currentDifficulty = 'hard';
    console.log('la currentDifficulty est devenue', currentDifficulty );
    
  }
  setGameParameters();
  secretNumber = getRandomInt(randomMinByDiff, randomMaxByDiff);
  console.log(secretNumber)
  
  displaySet();
  
}

function setGameParameters(){
  
  if(currentDifficulty === 'easy'){
    randomMinByDiff = difficulties.easy.inititalRandomValues.min;
    randomMaxByDiff = difficulties.easy.inititalRandomValues.max;
    initialscoreByDiff = difficulties.easy.initialScore;
    docChanger('between', `(between ${randomMinByDiff} and ${randomMaxByDiff})`, 1);
    docChanger('score', initialscoreByDiff, 1);
    currentScore = initialscoreByDiff ;
    currentHighScore = getHighScoreByDiffFromStorage();
    docChanger('highscore', currentHighScore, 1);
    console.log('le record est', currentHighScore);

  
  }else if(currentDifficulty === 'medium'){
    randomMinByDiff = difficulties.medium.inititalRandomValues.min;
    randomMaxByDiff = difficulties.medium.inititalRandomValues.max;
    initialscoreByDiff = difficulties.medium.initialScore;
    docChanger('between', `(between ${randomMinByDiff} and ${randomMaxByDiff})`, 1);
    docChanger('score', initialscoreByDiff, 1);
    currentScore = initialscoreByDiff;
    currentHighScore = getHighScoreByDiffFromStorage();
    docChanger('highscore', currentHighScore, 1);
    console.log('le record est', currentHighScore);

  
  }else if(currentDifficulty === 'hard'){
    randomMinByDiff = difficulties.hard.inititalRandomValues.min;
    randomMaxByDiff = difficulties.hard.inititalRandomValues.max;
    initialscoreByDiff = difficulties.hard.initialScore;
    docChanger('between', `(between ${randomMinByDiff} and ${randomMaxByDiff})`, 1);
    docChanger('score', initialscoreByDiff, 1);
    currentScore = initialscoreByDiff;
    currentHighScore = getHighScoreByDiffFromStorage();
    docChanger('highscore', currentHighScore, 1);
    console.log('le record est', currentHighScore);

  }
  }

function onButtonAgainClick() {
  location.reload();
  localStorage.removeItem('difficulty');
}

function setHighScoreByDiff(){
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

function getHighScoreByDiffFromStorage(){
  const highScoreStr = localStorage.getItem(`${currentDifficulty}Highscore`);
  if (!highScoreStr){
    return 0;
  }
  return parseInt(highScoreStr);

}

function displaySet(){
  if (!currentDifficulty){
  displayGame.style.display = 'none';
  console.log('la var currentDiff est vide');
} else{
displayTitle.style.display = 'none';
displayGame.style.display = 'block';
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
    setHighScoreByDiff();
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

