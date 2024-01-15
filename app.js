let baseUrl =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

let dropdowns = document.querySelectorAll(".dropdown select");
let button = document.querySelector("form button");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let msg = document.querySelector(".message p");

for (let select of dropdowns) {
  for (currCode in countryList) {
    // console.log(code, countryList[code]);
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;

    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }

    select.append(newOption);
  }

  select.addEventListener("change", (event) => {
    updateFlag(event.target);
  });
}

const updateExchangeRate = async () => {
  let amount = document.querySelector(".inputText input");
  let amntvalue = amount.value;
  //   console.log(amntvalue);

  if (amntvalue === "" || amntvalue < 1) {
    amntvalue = 1;
    amount.value = "1";
  }
  //   console.log(fromCurr.value, toCurr.value);
  const URL = `${baseUrl}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[toCurr.value.toLowerCase()];
  //   console.log(rate);

  finalamount = amntvalue * rate;
  msg.innerText = `${amntvalue} ${fromCurr.value} = ${finalamount} ${toCurr.value}`;
};

const updateFlag = (element) => {
  let currCode = element.value;
  //   console.log(currCode);
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;

  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

button.addEventListener("click", (e) => {
  e.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});
