'use strict'

const numberPickedField = document.querySelector('.field--number .field');
const betSizeField = document.querySelector('.field--betsize .field');
const balanceField = document.querySelector('.field--balance .field');

const numberPickedProblemTextElement = document.querySelector('.field--number .problem');
const betSizeProblemTextElement = document.querySelector('.field--betsize .problem');
const balanceProblemTextElement = document.querySelector('.field--balance .problem');

const gameOverScreen = document.querySelector('.gameover--screen');

const cube = document.querySelector('.cube');
const topSide = document.querySelector('.top');
const bottomSide = document.querySelector('.bottom');
const leftSide = document.querySelector('.left');
const rightSide = document.querySelector('.right');
const frontSide = document.querySelector('.front');
const backSide = document.querySelector('.back');
const shadow = document.querySelector('.shadow');

const resultText = document.querySelector('.result--text');
const gameOverTextEl = document.querySelector('.gameover--screen span');
const daleBTN = document.querySelector('.dale');
let winner;

let number;
let numberString;
let betSize;
let betSizeString;
let balance = '100';
balanceField.value = balance;
let numbers = [1, 2, 3, 4, 5, 6];
const sides = [topSide, leftSide, rightSide, frontSide, backSide];


daleBTN.addEventListener('click', () => {
  if(numberPickedField.classList.contains('field--error--animation')){
    numberPickedField.classList.remove('field--error--animation');
    numberPickedProblemTextElement.textContent = '';
  }
  numberPickedField.offsetWidth;
  if(betSizeField.classList.contains('field--error--animation')){
    betSizeField.classList.remove('field--error--animation');
    betSizeProblemTextElement.textContent = '';
  }
  if(resultText.classList.contains('loss--animation')){
    resultText.offsetWidth;
    resultText.classList.remove('loss--animation')
  }
  if(resultText.classList.contains('win--animation')){
    resultText.offsetWidth;
    resultText.classList.remove('win--animation')
  }
  resultText.offsetWidth;

    numberString = numberPickedField.value;
    number = parseFloat(numberString);
    betSizeString = betSizeField.value;
    betSize = parseFloat(betSizeString);
    winner = Math.trunc(Math.random() * 6) + 1;
    
    const problems = checkNumberFields(number, numberString, betSize, betSizeString);
    const numberProblem = problems.get(numberPickedField);
    const betSizeProblem = problems.get(betSizeField);

      if(numberProblem) {
        numberPickedField.classList.add('field--error--animation');
        numberPickedProblemTextElement.textContent = numberProblem;
      }

      if(betSizeProblem) {
        betSizeField.classList.add('field--error--animation');
        betSizeProblemTextElement.textContent = betSizeProblem;
      }

      if(!problems.get(betSizeField) && !problems.get(numberPickedField)) {
        toggleAnimation();
        balance = balance - betSize;
        balanceField.value = balance;
        daleBTN.classList.remove('active');
        daleBTN.classList.add('inactive');
        daleBTN.textContent = 'a ver...';
        setUpPictures(winner);
      } 
});


  let animationCount = 4;

  cube.addEventListener('animationend', ()=>{
    if(animationCount > 0) {
        animationCount--;
        
        if(animationCount === 1) {
          if(number === winner) {
            balance += (4 * betSize);
            resultText.classList.add('win--animation')
            resultText.offsetWidth;
            resultText.textContent = '¡Qué suerte!'
          }
          else{
            resultText.classList.add('loss--animation')
            resultText.offsetWidth;
            resultText.textContent = 'Qué fuerte...'
          }
        }
      }
    else {
        balanceField.value = balance + "";
        daleBTN.classList.remove('inactive');
        daleBTN.classList.add('active');
        daleBTN.textContent = 'otra vez?';

        if(balance === 0) {
          checkBalance();
        }

        animationCount = 4;
    }
  });


  function toggleAnimation() {    
    if (!cube.classList.contains('animate--cube') && !shadow.classList.contains('animate--shadow')) {
      cube.classList.add('animate--cube');
      shadow.classList.add('animate--shadow');
    } else {
      shadow.offsetWidth;
      cube.classList.remove('animate--cube');
      shadow.classList.remove('animate--shadow');
      shadow.offsetWidth;
      cube.classList.add('animate--cube');
      shadow.classList.add('animate--shadow');
    }
  }


  function setUpPictures(winner){
    const temp = numbers.filter(num => num !== winner);
    bottomSide.querySelector('.image').src = `./img/dice${winner}.png`
    for(let i = 0; i < temp.length - 1; i++) {
        const image = sides[i].querySelector('.image');
        image.src = `./img/dice${temp[i]}.png`;
    }
  }

  
  function checkNumberFields(num, numString, betSize, betSizeString){
    const problems = new Map();
    
    if(isNaN(num) || num.toString() !== numString || (num !== 1 && num !== 2 && num !== 3 && num !== 4 && num !== 5 && num !== 6)){
      problems.set(numberPickedField, 'Solo puedes poner un número del 1 al 6');
    }

    if(isNaN(betSize) || betSize.toString() !== betSizeString) {
      problems.set(betSizeField, 'Escribe solo números positivos');
    }

    if(betSize < 1 && betSize > 0) {
      problems.set(betSizeField, 'Con eso no llegas ni para un chicle');
    }

    if(betSize < 0) {
      problems.set(betSizeField, '¿Te crees el más listo?');
    }

    if(balance - betSize < 0) {
      problems.set(betSizeField, '¿Te crees que soy el banco?');
    }

    if(betSize === 0) {
      problems.set(betSizeField, 'No puedes apostar cero');
    }
    
    return problems;  
  }

  function checkBalance(){
    if(balance === 0) {
      gameOverScreen.classList.add('gameover--screen--animation');
      gameOverTextEl.classList.add('gameover--text--animation');
    }
  }