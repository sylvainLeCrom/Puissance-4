
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
    console.log("joueur1 "+joueur1);
    console.log("joueur2 "+joueur2);
    console.log("c'est au tour du joueur "+ couleur);
    posePion();
    couleur = tour();    
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
        return;
      }
      else {
        y = y - 1;
      }
    }
    alert("colonne pleine");
  }

  function tour() {
    if (couleur == joueur1) {
      return joueur2;
    } else{
      return joueur1;
    }
  }
}