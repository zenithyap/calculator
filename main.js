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


const DP = 6;
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

buttons?.addEventListener("click", (event) => {
    const target = event.target;
    
    target.classList.add("button-click-animation");
    target.addEventListener("animationend", () => {
        target.classList.remove("button-click-animation");
    }, {once: true});

    // Prevents event delgation of buttons-row
    if (event.target.tagName === "BUTTON") {
        const button = target.textContent;
    
        if (button === "+" || button === "-" || button === "*" || button === "/") {
            if (a !== "" && b !== "") {
                a = operate(+a, +b, op);
                reset("b");
            }
            op = button;
        } else if (button === "=") {
            if (b !== "") {
                a = operate(+a, +b, op);
                reset("b");
                op = "=";
            }
        } else if (button === "CLEAR") {
            reset("a", "b", "op");
        } else {
            if (op === "=") {
                reset("a", "op");
            }
            op === "" ? a += button : b += button
        }
    
        display.textContent = b === "" ? +((+a).toFixed(DP)) : +((+b).toFixed(DP));
    }
});
