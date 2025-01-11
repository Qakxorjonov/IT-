// script.js
const textElement = document.getElementById('text');
const inputElement = document.getElementById('input');
const resultElement = document.getElementById('result');
const timerElement = document.getElementById('timer');
const wordCountElement = document.getElementById('wordCount');
const startButton = document.getElementById('startButton');
const resultModal = document.getElementById('resultModal');
const wpmResult = document.getElementById('wpmResult');
const accuracyResult = document.getElementById('accuracyResult');
const restartButton = document.getElementById('restartButton');
const homeButton = document.getElementById('homeButton');

const texts = [
    "The quick brown fox jumps over the lazy dog.",
    "Sphinx of black quartz, judge my vow.",
    "Pack my box with five dozen liquor jugs.",
    "How razorback-jumping frogs can level six piqued gymnasts!"
];

let currentText = '';
let startTime = null;
let timer = 60;
let timerInterval = null;
let wordCount = 0;
let correctCount = 0;

function getRandomText() {
    const randomIndex = Math.floor(Math.random() * texts.length);
    return texts[randomIndex];
}

function startTest() {
    currentText = getRandomText();
    textElement.textContent = '';
    currentText.split('').forEach(char => {
        const span = document.createElement('span');
        span.textContent = char;
        textElement.appendChild(span);
    });
    inputElement.value = '';
    inputElement.disabled = false;
    inputElement.style.display = 'block';
    inputElement.focus();
    startButton.style.display = 'none';
    resultElement.textContent = '';
    timerElement.textContent = `Time: ${timer}`;
    timerElement.style.display = 'block';
    wordCountElement.textContent = `Words: ${wordCount}`;
    wordCountElement.style.display = 'block';
    startTime = new Date().getTime();
    startTimer();
}

function endTest() {
    clearInterval(timerInterval);
    const endTime = new Date().getTime();
    const duration = (endTime - startTime) / 1000; // seconds
    const wpm = (wordCount / duration) * 60;
    const accuracy = (correctCount / currentText.length) * 100;

    inputElement.disabled = true;
    resultModal.style.display = 'block';
    wpmResult.textContent = `WPM: ${Math.round(wpm)}`;
    accuracyResult.textContent = `Accuracy: ${Math.round(accuracy)}%`;
}

function startTimer() {
    timer = 60; // 60 seconds for the test
    timerInterval = setInterval(() => {
        timer--;
        timerElement.textContent = `Time: ${timer}`;
        if (timer === 0) {
            endTest();
        }
    }, 1000);
}

inputElement.addEventListener('input', () => {
    const inputText = inputElement.value.split('');
    const spanArray = textElement.querySelectorAll('span');
    let correct = true;
    let currentWordCount = 0;
    correctCount = 0;

    spanArray.forEach((span, index) => {
        const character = inputText[index];
        if (character == null) {
            span.classList.remove('highlight');
            span.classList.remove('error');
        } else if (character === span.textContent) {
            span.classList.add('highlight');
            span.classList.remove('error');
            correctCount++;
            if (span.textContent === ' ') {
                currentWordCount++;
            }
        } else {
            span.classList.add('error');
            span.classList.remove('highlight');
            correct = false;
        }
    });

    wordCount = currentWordCount + 1; // Add 1 for the last word
    wordCountElement.textContent = `Words: ${wordCount}`;

    if (correct && inputText.length === spanArray.length) {
        endTest();
    }
});

startButton.addEventListener('click', startTest);

restartButton.addEventListener('click', () => {
    resultModal.style.display = 'none';
    wordCount = 0;
    startTest();
});

homeButton.addEventListener('click', () => {
    resultModal.style.display = 'none';
    inputElement.style.display = 'none';
    timerElement.style.display = 'none';
    wordCountElement.style.display = 'none';
    startButton.style.display = 'block';
});

window.addEventListener('load', () => {
    inputElement.style.display = 'none';
    timerElement.style.display = 'none';
    wordCountElement.style.display = 'none';
});
