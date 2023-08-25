let counter = 0

const handleChange = () => {
    let inputList = document.querySelectorAll(".input");
    // let input1 = 0;
    // let input2 = 0;
    // let input3 = 0;
    let sum = 0;
    let i = 0

    for (i = 0; i < inputList.length; i++ ) {

        if (!isNaN(inputList[i].value) && parseInt(inputList[i].value) > 0) {
        sum += parseInt(inputList[i].value);
        }
    }

    // try {
    //     x = document.getElementById(`input0`).value;
    //     if (!isNaN(x) && x > 0) {
    //         input2 = parseInt(x);
    //     }
    //     // console.log(x2);
    // }
    // catch (e) { }

    // try {
    //     x = document.getElementById(`input1`).value;
    //     if (!isNaN(x) && x > 0) {
    //          input3 = parseInt(x);
    //     }
    //     // console.log(x2);
    // }
    // catch (e) { }

    // let sum = input + input2 + input3;

    document.getElementById("sum").value = sum.toLocaleString("en-US");

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

//calculated taxes follow the stairs (progressive tax)
    let tax
    let diff

    if(sum >= 5000001) {
        diff = sum - 5000000;
        tax = (diff * 0.35) + 1265000
    }
    else if (sum >= 2000001) {
        diff = sum - 2000000;
        tax = (diff * 0.3) + 365000
    }
    else if (sum >= 1000001) {
        diff = sum - 1000000;
        tax = (diff * 0.25) + 115000
    }
    else if (sum >= 750001) {
        diff = sum - 750000;
        tax = (diff * 0.2) + 65000
    }
    else if (sum >= 500001) {
        diff = sum - 500000;
        tax = (diff * 0.15) + 27500
    }
    else if (sum >= 300001) {
        diff = sum - 300000;
        tax = (diff * 0.1) + 7500
    }
    else if ( sum >= 150001) {
        diff = sum - 150000;
        tax = diff * 0.05;
    }
    else {
        tax = 0;
    }

    document.getElementById("tax").value = tax.toLocaleString("en-US");
}

const addInputForm = () => {
    const create = document.createElement("input");
    create.type = 'number';
    create.className = `input`;
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

const inputFormat = () => {
    var removeChar =  document.getElementById("input").value.replace(/[^0-9\.]/g, '')
    document.getElementById("input").value = removeChar

    // var formatedNumber =  document.getElementById("input").value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    // document.getElementById("input").value = formatedNumber
}

