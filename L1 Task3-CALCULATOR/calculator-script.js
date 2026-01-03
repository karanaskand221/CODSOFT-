let currentInput = "";
let historyInput = "";

const outputDisplay = document.getElementById('output');
const historyDisplay = document.getElementById('history');

/** * Updates the display screen with values 
 */
function updateDisplay() {
    outputDisplay.innerText = currentInput || "0";
    historyDisplay.innerText = historyInput;
    
    // Scale font for long numbers
    if (currentInput.length > 6) {
        outputDisplay.style.fontSize = "2.5rem";
    } else {
        outputDisplay.style.fontSize = "4rem";
    }
}

function appendNumber(num) {
    if (num === '.' && currentInput.includes('.')) return;
    if (currentInput === "0" && num !== ".") currentInput = "";
    currentInput += num;
    updateDisplay();
}

/** * Handles arithmetic operators 
 */
function appendOperator(op) {
    if (currentInput === "" && historyInput === "") return;
    if (currentInput === "" && historyInput !== "") {
        historyInput = historyInput.slice(0, -2) + op + " ";
    } else {
        historyInput = currentInput + " " + op + " ";
        currentInput = "";
    }
    updateDisplay();
}

function clearScreen() {
    currentInput = "";
    historyInput = "";
    updateDisplay();
}

/** * Backspace logic 
 */
function deleteLast() {
    currentInput = currentInput.toString().slice(0, -1);
    updateDisplay();
}

/** * Square root logic 
 */
function calculateSqrt() {
    if (currentInput === "") return;
    currentInput = Math.sqrt(parseFloat(currentInput)).toString();
    updateDisplay();
}

/** * Evaluation logic using eval 
 */
function compute() {
    if (currentInput === "" || historyInput === "") return;
    try {
        let result = eval(historyInput + currentInput);
        historyInput = "";
        currentInput = result.toString();
        updateDisplay();
    } catch (e) {
        currentInput = "Error";
        updateDisplay();
    }
}