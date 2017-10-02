
//*CREATION DE LA GRILLE DU JEU AVEC COORDONNEES EN MODE TABLEAU
function creaJeu(lignes, colonnes) {
  var lignes = 6;
  var colonnes = 7;
  var position = 0;
  var joueur1 = "jaune";
  var joueur2 = "rouge";
  var couleur = joueur1;
  // LA GRILLE DES PIONS
  var grille = document.createElement("GRILLE");
  for (var i = 0; i < colonnes; i++) {
    var ul = document.createElement("UL");
    ul.id = (i + 1);
    //ul.setAttribute("onclick", "posePion()");
    var li = document.createElement("LI");
    li.id = "ghost"
    ul.appendChild(li);

    for (var j = 0; j < lignes; j++) {
      var li = document.createElement("LI");
      var li_text = (i + 1) + "" + (j + 1);
      li.id = li_text;
      li.className += "vide";
      li_text = document.createTextNode(li_text);
      li.appendChild(li_text);
      ul.appendChild(li);
    }
    grille.appendChild(ul);
  }

  // LA GRILLE DANS LE PLATEAU
  var plateau = document.createElement("PLATEAU");
  plateau.appendChild(grille);
  plateau.addEventListener("click", jeu, false);

  // LE PLATEAU DANS LA PAGE
  document.getElementById("content").appendChild(plateau);

  function jeu() {
    posePion(); // on joue le coup
    testGrillePleine(); // test grille pleine
    testAlignenemt(); // test du coup  
    couleur = tour(); // on change le joueur
  }
  function posePion() {

    var x = event.target.parentElement.id; // n° de la colonne
    var y = 6;

    while (y > 0) {
      var position = x + "" + y;
      Case = document.getElementById(position);
      Etat = Case.className;
      if (Etat == "vide") {
        document.getElementById(Case.id).className = couleur;
        Etat = couleur;

        return;
      }
      else {
        y = y - 1;
      }
    }
    alert("colonne pleine");
  }



  // TEST GRILLE PLEINE
  function testGrillePleine() {
    //console.log(Case.id);
    var tx = 1;
    var total = 0;
    while (tx <= colonnes) {
      var tposition = tx + "" + 1;
      tCase = document.getElementById(tposition);
      tEtat = tCase.className;
      if (tEtat == "vide") {
        return;
      }
      tx++;
      total++;

      console.log('total = ' + total);
    }
    if (total == colonnes) {

      alert("LA GRILLE EST PLEINE");
    }
  }



  // TEST ALIGNEMENT DE 4
  function testAlignenemt() {
    var align = 0;
    var idNombre = parseInt(Case.id);

    // TEST VERTICAL
    var idcaseTest = idNombre;
    var idfinTest = idNombre;
    var loop = 1;
    while (idcaseTest >= 21 && loop <= 3) {
      idcaseTest = idcaseTest - 10;
      loop++;
    }
    var Testmax = (colonnes + "" + lignes) - 10;
    var loop = 1;
    while (idfinTest <= Testmax && loop <= 3) {
      idfinTest = idfinTest + 10;
      loop++;
    }
    caseTestEtat = document.getElementById(idcaseTest).className;
    while (idcaseTest <= idfinTest) {
      console.log(Etat);
      console.log(idcaseTest);
      console.log(idfinTest);
      console.log(caseTestEtat);
      if (caseTestEtat == Etat) {
        align++;
        idcaseTest = idcaseTest + 10;
      }
      else {
        align = align;
        idcaseTest = idcaseTest + 10;
      }
      console.log(align);      
      if (align == 4) {
        alert("Victoire du " + couleur);
      }
    }




  }



  // GESTION DU CHANGEMENT DE JOUEUR
  function tour() {
    if (couleur == joueur1) {
      return joueur2;
    } else {
      return joueur1;
    }
  }

}