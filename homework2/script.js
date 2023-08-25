let counter = 0

const handleChange = () => {
    let x = document.querySelectorAll(".input");
    let input = 0;
    if (!isNaN(x[0].value) && x[0].value > 0) {
        input = parseInt(x[0].value);
    }
    let input2 = 0;
    let input3 = 0;

    try {
        x = document.getElementById(`input0`).value;
        input2 = parseInt(x);
        // console.log(x2);
    }
    catch (e) { }

    try {
        x = document.getElementById(`input1`).value;
        input3 = parseInt(x);
        // console.log(x2);
    }
    catch (e) { }

    let sum = input + input2 + input3;

    document.getElementById("sum").value = sum;

    let rate = 0;
    if (sum <= 150000) {
        rate = 0;
    }
    else if (sum <= 300000) {
        rate = 5;
    }
    else if (sum <= 500000) {
        rate = 10;
    }
    else if (sum <= 750000) {
        rate = 15;
    }
    else if (sum <= 1000000) {
        rate = 20;
    }
    else if (sum <= 2000000) {
        rate = 25;
    }
    else if (sum <= 5000000) {
        rate = 30;
    }
    else {
        rate = 35;
    }
    document.getElementById("rate").value = rate;

    const tax = sum * rate / 100;
    document.getElementById("tax").value = tax;
}

const addInputForm = () => {
    const create = document.createElement("input");
    create.type = 'number';
    create.className = `input${counter}`;
    create.id = `input${counter}`;
    create.name = 'input';
    create.addEventListener("input", handleChange);

    if (counter < 2) {
        document.getElementById("inputForm").appendChild(create);
        counter++;
        // console.log(document.getElementById("inputForm"));
    }
}

const removeInputForm = () => {
    if (counter - 1 >= 0) {
        document.getElementById("inputForm").removeChild(document.getElementById(`input${counter - 1}`))
        counter--;
    }
    handleChange();
}

let darkMode = false;
const toggleDarkMode = () => {
    if (!darkMode) {
        document.body.classList.add("darkMode")
        document.getElementById('toggleMode').innerHTML = "Toggle light mode";
        darkMode = !darkMode;
    }
    else {
        document.body.classList.remove("darkMode")
        document.getElementById('toggleMode').innerHTML = "Toggle dark mode";
        darkMode = !darkMode;
    }
}