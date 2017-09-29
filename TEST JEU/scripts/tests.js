
//*CREATION DE LA GRILLE DU JEU AVEC COORDONNEES EN MODE TABLEAU

/*
function creaJeu(lignes,colonnes){
    var lignes = 6;
    var colonnes = 7;
    // LA GRILLE
    var grille = document.createElement("GRILLE");
    for(var i = 0; i < lignes; i++){
      var tr = document.createElement("TR");
      for (var j = 0; j < colonnes; j++){
        var td = document.createElement("TD");
        var td_text = i+ ""+ j;
        td_text = document.createTextNode(td_text);
        td.appendChild(td_text);
        tr.appendChild(td);
      }
      grille.appendChild(tr);
    }

    //4) setting table
    var plateau = document.createElement("PLATEAU"); 
    plateau.appendChild(grille);
     
    //5) placement du jeu dans la page
    document.getElementById("content").appendChild(plateau);
  }
*/

//* CREATION DE LA GRILLE DU JEU AVEC COORDONNEES EN MODE COLONNE

/* function creaJeu(lignes,colonnes){
    var lignes = 6;
    var colonnes = 7;
    // LA GRILLE
    var grille = document.createElement("GRILLE");
    for(var i = 0; i < colonnes; i++){
      var ul = document.createElement("UL");
      for (var j = 0; j < lignes; j++){
        var li = document.createElement("LI");
        var li_text = i+ ""+ j;
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
  */

  function creaJeu(lignes,colonnes){
    var lignes = 6;
    var colonnes = 7;
    var position = 0;
    // LA GRILLE
    var grille = document.createElement("GRILLE");
    for(var i = 0; i < colonnes; i++){
      var ul = document.createElement("UL");
      for (var j = 0; j < lignes; j++){
        var li = document.createElement("LI");
        var li_text = i+ ""+ j;
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