
//*CREATION DE LA GRILLE DU JEU AVEC COORDONNEES EN MODE TABLEAU
function creaJeu(lignes, colonnes) {
  var lignes = 6;
  var colonnes = 7;
  var position = 0;
  // LA GRILLE
  var grille = document.createElement("GRILLE");
  for (var i = 0; i < colonnes; i++) {
    var ul = document.createElement("UL");
    ul.id = (i + 1);
    ul.setAttribute("onclick", "posePion()");
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

  //4) setting table
  var plateau = document.createElement("PLATEAU");
  plateau.appendChild(grille);

  //5) placement du jeu dans la page
  document.getElementById("content").appendChild(plateau);
}

function posePion() {
  var couleur = 'jaune';
  var x = event.target.parentElement.id;
  var y = 6;
  
  while(y>0){
    var position = x + "" + y;
    Case = document.getElementById(position);
    Etat = Case.className;
    if(Etat == "vide"){
    document.getElementById(Case.id).className = couleur;
    return; 
    }
    else{
    y=y-1;
    }
  }
  alert("colonne pleine");  
}