const baseURL = "https://v6.exchangerate-api.com/v6/cb1012abfd816a975388e652/pair"

const dropdowns = document.querySelectorAll(".dropdown select")
const btn  = document.querySelector("form button")
const fromCurr = document.querySelector(".from select")
const toCurr = document.querySelector(".to select")

for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option")
        newOption.innerText = currCode
        newOption.value = currCode
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected"
        }
        else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected"
        }
        select.append(newOption)
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target)
    })
}

const updateFlag = (element) => {
  let currCode = element.value
  let countryCode = countryList[currCode]
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
  let img = element.parentElement.querySelector("img")
  img.src = newSrc
}

btn.addEventListener('click', async (evt) => {
  evt.preventDefault()
  let amount = document.querySelector(".amount input")
  let amtval = amount.value
  if(amtval === ""|| amtval <1){
    amtval =1;
    amount.value =1;
  }
//   console.log(fromCurr.value,toCurr.value);
  
  const URL = `${baseURL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}`
  let response = await fetch(URL)
  let data = await response.json()
  let rate = data[" "]
  console.log(rate);
  
//   console.log(response)
})

