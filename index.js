const BASE_URL =
"https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"

let dropdown_select = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(" form button");
const msg = document.querySelector(".msg");
const fromcurr = document.querySelector(".from select")
const tocurr = document.querySelector(".to select");


for(let select of dropdown_select){
    for(currcode in countryList){
        let new_options = document.createElement("option");
        new_options.innerText = currcode;
        new_options.value = currcode;
        if(select.name === "from" && currcode === "USD"){
            new_options.selected = "selected";
        }
        else if(select.name === "to" && currcode === "INR"){
            new_options.selected = "selected";
        }
        
        select.append(new_options);
    };

    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
        });

}

const updateFlag = (element)=>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newimg_src = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newimg_src; 

}

btn.addEventListener("click", async (evt)=>{
    evt.preventDefault();
    
    let amount = document.querySelector(".amount input")
    let amtval = amount.value;
    if(amtval === '' || amtval<0){
        amtval = 1;
        amount.value = "1";
    };
    
    const url = `${BASE_URL}/${fromcurr.value.toLowerCase()}.json`;
    let response = await fetch(url);
    let data =  await response.json();
    let rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];
    let finalamount = (amount.value)*rate;
    
    msg.innerText = `${amount.value} ${fromcurr.value} = ${finalamount} ${tocurr.value}`
});