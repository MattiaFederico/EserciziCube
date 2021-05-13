var num1Selector = document.querySelector("#numBlock1");
var num2Selector = document.querySelector("#numBlock2");
num2Selector.style.border = "3px solid blue";
var randNum1 = Math.ceil(Math.random() * 10);
var randNum2 = Math.ceil(Math.random() * 10);
var message = document.getElementById("message");
var btn = document.getElementById("check");
num1Selector.innerHTML = randNum1;
num2Selector.innerHTML = randNum2;

btn.addEventListener("click", () => {
  let sumInput = +document.getElementById("sum").value;
  if( sumInput == ( randNum1 + randNum2 ) ){
    message.innerHTML = "La somma è corretta";
  } else if( sumInput == "" ){
    message.innerHTML = "Inserire un valore in input";
  } else {
    message.innerHTML = "La somma non è corretta";
  }
  message.style.display = "block";
});



