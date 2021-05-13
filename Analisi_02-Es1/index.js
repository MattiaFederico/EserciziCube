var prison = {
  name: "Arkham Asylum",
  guards: [
    {
      id: 0,
      name: "Mario",
      lastname: "Rossi",
      birthdate: "01/11/1997"
    }
  ],
  prisoners: [
    {
      id: 0,
      name: "Stefano",
      lastname: "Bianchi",
      birthdate: "01/11/1997"
    }
  ],
  dossier: [
    {
      id: 0,
      prisoner_id: 0,
      imprisonement_date: "01/11/1997",
      crime: "crime"
    }
  ]
}

var n = 0;

$(document).ready( () => {
  $("#title").html("Welcome to " + prison.name);
  showData( prison.guards, $("#guardsContainer table"), $("#guardsTableBody") );
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

function showAll(){

}

function hireGuard(){
  let guardName = $("#guard_name").val();
  let guardLastname = $("#guard_lastname").val();
  let guardBirth = $("#guard_birth").val();

  if( guardName && guardLastname && guardBirth ){
    // Registrazione guardia
    let id = 0;
    prison.guards.push({
      id: id++,
      name: guardName,
      lastname: guardLastname,
      birthdate: guardBirth
    });

    showData( prison.guards, $("#guardsContainer table"), $("#guardsTableBody") );
  }
}

function registerPrisoner(){
  let id = 0;
  let prisonerName = $("#prisoner_name").val();
  let prisonerLastname = $("#prisoner_lastname").val();
  let prisonerBirth = $("#prisoner_birth").val();

  if( prisonerName && prisonerLastname && prisonerBirth ){
    // Registrazione carcerato
    prison.prisoners.push({
      id: id++,
      name: prisonerName,
      lastname: prisonerLastname,
      birthdate: prisonerBirth
    });

  }

  showData( prison.prisoners, $("#prisonersContainer table"), $("#prisonersTableBody") );
}

function createDossier(){
  let id = 0;
  let prisonerID = $("#d_prisoner_id").val();
  let imprisonementDate = $("#d_imprisonement_date").val();
  let crime = $("#d_prisoner_crime").val();

  if( prisonerID && imprisonementDate && crime ){
    // Registrazione dossier
    prison.dossier.push({
      id: id++,
      prisoner_id: prisonerID,
      imprisonement_date: imprisonementDate,
      crime: crime
    });

  }

  showData( prison.dossier, $("#dossierContainer table"), $("#dossierTableBody") );
}

function showData( array, table, tbody ){
  let tableName = table;
  let tbodyName = tbody;

  let arr = array;
  let obj = arr[n];

  let trBody = $("<tr></tr>");

  for( i in obj ){
    let td = $(`<td class='td_${i}'>${obj[i]}</td>`);

    trBody.append(td);
    tbodyName.append(trBody);
    tableName.append(tbody);
  }
  n++;
}
