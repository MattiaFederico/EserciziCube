async function getData(){
  const api = {
    url: 'https://jsonplaceholder.typicode.com/users'
  }
  return await fetch(api.url)
  .then( response => response.json() )
  .then( data => data )
}

var msgContainer = document.getElementById("message");

(async function (){
  const data = await getData();
  if( checkData( data ) ){
    getDay( data );
  }
})();

function checkData( data ){
  for( field in data ){
    if( data[field].id > 0 && data[field].id < 8){
      return true;
    }
    return false;
  }
}

function getDay( data ){
  for( field in data ){
    let id = data[field].id;
      let li = document.createElement("li");

      switch( id ){
        case 1: 
          li.innerHTML = "Lunedì";
        break;
        case 2: 
          li.innerHTML = "Martedì";
        break;
        case 3: 
          li.innerHTML = "Mercoledì";
        break;
        case 4: 
          li.innerHTML = "Giovedì";
        break;
        case 5: 
          li.innerHTML = "Venerdì";
        break;
        case 6: 
          li.innerHTML = "Sabato";
        break;
        case 7: 
          li.innerHTML = "Domenica";
        break;
        default:
          li.innerHTML = "Che sfiga, non posso indovinare il giorno!";
        break;
      }
    msgContainer.appendChild(li);
  }
}