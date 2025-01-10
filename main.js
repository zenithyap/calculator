function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(a, b, op) {
    switch (op) {
        case "+":
            return add(a, b);
            break;
        case "-":
            return subtract(a, b);
            break;
        case "*":
            return multiply(a, b);
            break;
        case "/":
            return divide(a, b);
            break;
    }
}


const DP = 7;
let a = "0";
let b = "";
let op = "";
const buttons = document.querySelector("#buttons-container");
const display = document.querySelector("#display");

function reset(...args) {
    for (const arg of args) {
        switch (arg) {
            case "a":
                a = "0";
                break;
            case "b":
                b = "";
                break;
            case "op":
                op = "";
                break;
        }
    }
}

function stringToNum(str, dp) {
    return +((+str).toFixed(dp));
}

function handleDecimalButtonClick() {
    if (b !== "" && !b.includes(".")) {
        b = String(+b) + ".";
        display.textContent = b;
    } else if (a !== "" && !a.includes(".")) {
        a = String(+a) + ".";
        display.textContent = a;
    }
}

function handleArithmeticButtonClick(button) {
    if (a !== "" && b !== "") {
        a = operate(+a, +b, op);
        reset("b");
    }
    op = button;
}

function handleEqualButtonClick() {
    if (b !== "") {
        a = operate(+a, +b, op);
        reset("b");
        op = "=";
    }
}

function handleClearButtonClick() {
    reset("a", "b", "op");
}

function handleDeleteButtonClick() {
    if (b !== "") {
        b = b.slice(0, b.length - 1);
        display.textContent = b.includes(".") ? b : stringToNum(b);
    } else if (op === "") {
        a = a.slice(0, a.length - 1);
        display.textContent = a.includes(".") ? a : stringToNum(a);
    }
}

function handleNumberButtonClick(button) {
    if (op === "=") {
        reset("a", "op");
    }
    op === "" ? a += button : b += button
}

buttons?.addEventListener("click", (event) => {
    const target = event.target;

    // Prevents event delgation of buttons-row
    if (event.target.tagName === "BUTTON") {
        target.classList.add("button-click-animation");
        target.addEventListener("animationend", () => {
            target.classList.remove("button-click-animation");
        }, {once: true});

        const button = target.textContent;
    
        if (button === "+" || button === "-" || button === "*" || button === "/") {
            handleArithmeticButtonClick(button);
        } else if (button === "=") {
            handleEqualButtonClick();
        } else if (button === ".") {
            handleDecimalButtonClick();
            return;
        } else if (button === "CLEAR") {
            handleClearButtonClick();
        } else if (button === "DEL") {
            handleDeleteButtonClick();
            return;
        } else {
            handleNumberButtonClick(button);
        }
    
        display.textContent = b === "" ? stringToNum(a, DP) : stringToNum(b, DP);
    }
});
