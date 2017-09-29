
//CREATION DE LA GRILLE DU JEU AVEC COORDONNEES EN MODE TABLEAU


function creaJeu(lignes,colonnes){
    var lignes = 6;
    var colonnes = 7;
    // LA GRILLE
    var grille = document.createElement("GRILLE");
    for(var i = 0; i < lignes; i++){
      var tr = document.createElement("TR");
      for (var j = 0; j < colonnes; j++){
        var td = document.createElement("TD");
        var td_text = eval(i+1)+ ""+ eval(j+1);
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



  function creaJeu2(lignes,colonnes){
    var lignes = 6;
    var colonnes = 7;
    // LA GRILLE
    var grille = document.createElement("GRILLE");
    for(var i = 0; i < lignes; i++){
      var tr = document.createElement("TR");
      for (var j = 0; j < colonnes; j++){
        var td = document.createElement("TD");
        var td_text = eval(i+1)+ ""+ eval(j+1);
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