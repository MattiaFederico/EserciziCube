var prison = {
  name: "Arkham Asylum",
  guards: [
    {
      id: 1,
      name: "Mario",
      lastname: "Rossi",
      birthdate: "01/11/1997"
    },
    {
      id: 2,
      name: "Marco",
      lastname: "Biondi",
      birthdate: "01/11/1997"
    }
  ],
  prisoners: [
    {
      id: 1,
      name: "Stefano",
      lastname: "Bianchi",
      birthdate: "01/11/1977"
    },
    {
      id: 2,
      name: "Carlo",
      lastname: "Verdi",
      birthdate: "01/11/1997"
    },
    {
      id: 3,
      name: "Mariano",
      lastname: "Giusti",
      birthdate: "07/01/1982"
    },
    {
      id: 4,
      name: "Cornelio",
      lastname: "Maroni",
      birthdate: "07/01/1982"
    }
  ],
  dossier: [
    {
      id: 1,
      prisoner_id: 1,
      imprisonement_date: "01/11/1997",
      release_date: "01/11/2027",
      crime: "crime",
      status: "in jail"
    },
    {
      id: 2,
      prisoner_id: 2,
      imprisonement_date: "03/12/2001",
      release_date: "00/00/0000",
      crime: "crime",
      status: "escaped"
    },
    {
      id: 3,
      prisoner_id: 3,
      imprisonement_date: "03/12/2001",
      release_date: "00/00/0000",
      crime: "crime",
      status: "dead"
    },
    {
      id: 4,
      prisoner_id: 4,
      imprisonement_date: "03/12/2001",
      release_date: "00/00/0000",
      crime: "crime",
      status: "escaped"
    },
  ]
}

$(document).ready( () => {
  $("#title").html("Welcome to " + prison.name);
  tableInit();
  summary();
});

$("#guard_btn").click( () => {
  hireGuard();
});

$("#prisoner_btn").click( () => {
  registerPrisoner();
});

$("#dossier_btn").click( () => {
  createDossier();
});

$("#searchBtn").click( () => {
  search();
});

function tableInit(){
  tableStructure( prison.guards, $("#guardsTableHead") );
  tableStructure( prison.prisoners, $("#prisonersTableHead") );
  tableStructure( prison.dossier, $("#dossierTableHead") );
  getCurrentData( prison.guards, $("#guardsTableBody") );
  getCurrentData( prison.prisoners, $("#prisonersTableBody") );
  getCurrentData( prison.dossier, $("#dossierTableBody") );
}

function search(){
  let searchVal = $("#search").val();
  $("#searchResults ul").html("");
  if( searchVal ){
    let prisoners = prison.prisoners;
    let dossier = prison.dossier;
    
    prisoners.forEach( (obj) => {
      if( searchVal === obj.name ){
        let prisonerID = obj.id;
        let lista = $("#searchResults ul");
        
        dossier.forEach( (obj2) => {
          if( prisonerID == obj2.id ){
            for( prop in obj2 ){
              if( prop != "id" ){
                let li = $(`<li id=${prop}></li>`);
                li.html(prop + ": " + obj2[prop]);
                lista.append(li);
              }
            }            
          }
        });

        $("#searchResults").append(lista);
      }
    });
  }
}

function summary(){
  let guards = prison.guards;
  let prisoners = prison.prisoners;
  let dossiers = prison.dossier;

  let guardsCount = guards.length;
  let escapedPrisonersCount = countFatalities( "escaped" );
  let deadPrisonersCount = countFatalities( "dead" );
  let prisonersCount = (prisoners.length - ( escapedPrisonersCount + deadPrisonersCount ));

  let summaryGuards = $("#summaryGuards");
  let summaryPrisoners = $("#summaryPrisoners");
  let summaryEscaped = $("#summaryEscaped");
  let summaryDead = $("#summaryDead");

  summaryGuards.html("Numero di guardie nel carcere: " + guardsCount );
  summaryPrisoners.html("Numero di prigionieri nel carcere(tot): " + prisonersCount );
  summaryEscaped.html("Numero di prigionieri evasi dal carcere: " + escapedPrisonersCount );
  summaryDead.html("Numero di prigionieri morti nel carcere: " + deadPrisonersCount );

  console.log(dossiers);
}

function countFatalities( cond ){
  let counter = 0;
  let dossiers = prison.dossier;
  dossiers.forEach( (obj) => {
    if(obj.status === cond){
      counter++;
    }
  });
  return counter;
}

function getCurrentData( array, table ){
  array.forEach( (obj) => {
    let tr = $("<tr></tr>");
    for( prop in obj ){
      let td = $("<td>" + obj[prop] + "</td>");
      tr.append(td);
    }
    table.append(tr);
  });
  
}

function tableStructure( obj, table ){
  let tr = $("<tr></tr>");
  for( prop in obj[0] ){
    let td = $("<td>" + prop + "</td>");
    tr.append(td);
  }
  table.append(tr);
}

function hireGuard(){
  let guardName = $("#guard_name").val();
  let guardLastname = $("#guard_lastname").val();
  let guardBirth = $("#guard_birth").val();

  if( guardName && guardLastname && guardBirth ){
    // Registrazione guardia
    writeNewAnagraphic( prison.guards, guardName, guardLastname, guardBirth, $("#guardsTableBody") );
  }
}

function registerPrisoner(){
  let prisonerName = $("#prisoner_name").val();
  let prisonerLastname = $("#prisoner_lastname").val();
  let prisonerBirth = $("#prisoner_birth").val();

  if( prisonerName && prisonerLastname && prisonerBirth ){
    // Registrazione carcerato
    writeNewAnagraphic( prison.prisoners, prisonerName, prisonerLastname, prisonerBirth, $("#prisonersTableBody") );
  }
}

function createDossier(){
  let prisonerID = $("#d_prisoner_id").val();
  let imprisonementDate = $("#d_imprisonement_date").val();
  let releaseDate = $("#d_release_date").val();
  let crime = $("#d_prisoner_crime").val();

  if( prisonerID && imprisonementDate && releaseDate && crime ){
    // Registrazione dossier
    writeNewDossier( prison.dossier, prisonerID, imprisonementDate, releaseDate ,crime, $("#dossierTableBody") );
  }

}

function writeNewDossier( array, val1, val2, val3, val4, table ){
  let id = array[(array.length - 1)].id + 1;

  if( val1 < id ){
    $("#formFeedback").html("Dossier già registrato");
  } else {
    let obj = {
      id: id,
      prisoner_id: val1,
      imprisonement_date: val2,
      release_date: val3,
      crime: val4,
      status: "in jail"
    };

    array.push(obj);

    let trBody = $("<tr></tr>");
    let td1 = $("<td></td>");
    let td2 = $("<td></td>");
    let td3 = $("<td></td>");
    let td4 = $("<td></td>");
    let td5 = $("<td></td>");
    let td6 = $("<td></td>");
  
    td1.html(id);
    td2.html(val1);
    td3.html(val2);
    td4.html(val3);
    td5.html(val4);
    td6.html(obj.status);
  
    trBody.append(td1);
    trBody.append(td2);
    trBody.append(td3);
    trBody.append(td4);
    trBody.append(td5);
    trBody.append(td6);

    table.append(trBody);
  }
 
}

function writeNewAnagraphic( array, val1, val2, val3, table ){
  let id = array[(array.length - 1)].id + 1;

  array.push({
    id: id,
    name: val1,
    lastname: val2,
    birthdate: val3
  });

  let trBody = $("<tr></tr>");
  let td1 = $("<td></td>");
  let td2 = $("<td></td>");
  let td3 = $("<td></td>");
  let td4 = $("<td></td>");

  td1.html(id);
  td2.html(val1);
  td3.html(val2);
  td4.html(val3);

  trBody.append(td1);
  trBody.append(td2);
  trBody.append(td3);
  trBody.append(td4);

  table.append(trBody);
}