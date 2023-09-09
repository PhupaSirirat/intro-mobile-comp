let counter = 0

class TaxLaw {

    constructor(rate, maximum) {
        this.rate = rate;
        this.maximum = maximum;
    }

}

//Tax rate rule that we can change the rule here.
const TAX_RATE_MANIFESTO = [new TaxLaw(0, 150000),
new TaxLaw(0.05, 300000),
new TaxLaw(0.1, 500000),
new TaxLaw(0.15, 750000),
new TaxLaw(0.2, 1000000),
new TaxLaw(0.25, 2000000),
new TaxLaw(0.3, 5000000),
new TaxLaw(0.35, Infinity)];

const getRate = (price) => {
    for (let i = 0; i < TAX_RATE_MANIFESTO.length; i++) {
        let tax = TAX_RATE_MANIFESTO[i];
        let maximum = tax.maximum;
        if (price <= maximum) {
            return tax.rate;
        }
    }
}

//calculated taxes follow the stairs (progressive tax)
const progressiveTax = (price) => {
    let totalTax = 0;
    let rate = 0;
    for (let i = 0; i < TAX_RATE_MANIFESTO.length; i++) {
        let iTax = TAX_RATE_MANIFESTO[i];
        let iRate = iTax.rate;
        let iMax = iTax.maximum;
        let cropPrice = price;
        if (i >= 1) {
            let prevTax = TAX_RATE_MANIFESTO[i - 1];
            let prevMax = prevTax.maximum;
            cropPrice -= prevMax;
        }
        if (price > iMax) {
            cropPrice += iMax - price;
        }
        else {
            totalTax += iRate * cropPrice;
            return {tax:totalTax, rate:iRate};
        }
        totalTax += iRate * cropPrice;
    }
    lastTaxPos = TAX_RATE_MANIFESTO.length;
    return {tax:totalTax, rate:TAX_RATE_MANIFESTO[lastTaxPos].rate};
}

//Return sum of each element value (make sure the element has a number value!).
const getSumOf = (eLst) => {
    let lstNum = eLst.length;
    let sum = 0;
    for (let i = 0; i < lstNum; i++) {
        if (!isNaN(eLst[i].value) && parseFloat(eLst[i].value) > 0) {
            sum += parseFloat(eLst[i].value);
        }
    }
    return sum
}

//just calculate the inputs and show the result about tax
const handleChange = () => {
    let inputList = document.querySelectorAll(".input");
    let sum = getSumOf(inputList);
    const taxNrate = progressiveTax(sum);
    let rate = taxNrate.rate;
    let tax = taxNrate.tax;

    document.getElementById("sum").value = sum.toLocaleString("en-US");
    document.getElementById("rate").value = rate;
    document.getElementById("tax").value = tax.toLocaleString("en-US");
}

const addInputForm = () => {
    const create = document.createElement("input");
    create.type = 'text';
    create.className = `input`;
    create.id = `input${counter}`;
    create.name = 'input';
    create.addEventListener("input", handleChange);
    create.addEventListener("input", inputFormat);

    if (counter < 2) {
        document.getElementById("inputForm").appendChild(create);
        counter++;
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
        document.getElementById('toggleMode').innerHTML = "Toggle Light Mode";
        darkMode = !darkMode;
    }
    else {
        document.body.classList.remove("darkMode")
        document.getElementById('toggleMode').innerHTML = "Toggle Dark Mode";
        darkMode = !darkMode;
    }
}

const inputFormat = () => {
    // var removeChar =  document.getElementById("input").value.replace(/[^0-9\.]/g, '')
    // document.getElementById("input").value = removeChar
    const inputEle = document.getElementsByClassName("input");
    for (let i = 0; i < inputEle.length; i++ ) {
        ele = inputEle[i];
        if (isNaN(ele.value)) {
            triggerWarning()
            ele.value = ""
        }
    }
}

const triggerWarning = () => {
    alert("Input is NaN!")
}

