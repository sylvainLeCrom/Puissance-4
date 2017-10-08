import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';



@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  plateauenligne: FirebaseObjectObservable<any[]>;
  colonnes: FirebaseObjectObservable<any[]>;
  cases : FirebaseListObservable<any[]>;
  public SFX_pion;
  public SFX_draw;
  public SFX_WIN;
  public coupsJoués: number;
  public grille: string[][];
  public joueurEnCours: string;
  public classGhost: string;
  public anticlick: string;
  public joueur1: string;
  public joueur2: string;
  constructor(public af: AngularFireDatabase) {
    this.SFX_pion = new Audio();
    this.SFX_draw = new Audio();
    this.SFX_WIN = new Audio();
    this.plateauenligne = af.object('/GrilleTest');
    this.colonnes = af.object('GrilleTest/casesenligne');
    this.cases = af.list('GrilleTest/casesenligne/0')
    this.coupsJoués = 0;
    this.joueur1 = "rouge";
    this.joueur2 = "jaune"
    this.joueurEnCours = this.joueur1;
    this.classGhost = "ghost" + this.joueurEnCours;
    this.anticlick = "";
    this.grille = [
      ["vide", "vide", "vide", "vide", "vide", "vide"],
      ["vide", "vide", "vide", "vide", "vide", "vide"],
      ["vide", "vide", "vide", "vide", "vide", "vide"],
      ["vide", "vide", "vide", "vide", "vide", "vide"],
      ["vide", "vide", "vide", "vide", "vide", "vide"],
      ["vide", "vide", "vide", "vide", "vide", "vide"],
      ["vide", "vide", "vide", "vide", "vide", "vide"]
    ];

  }
  ngOnInit() {
    this.plateauenligne.remove();
    this.plateauenligne.update({ casesenligne: this.grille});
    
  }
  clickedColumn(id: number): void {
    console.log(this.cases);
    

    let x = id;
    let y = 6;
    while (y >= 0) {
      if (this.grille[x][y] == 'vide') {
        this.grille[x][y] = this.joueurEnCours;

        // on comptabilise le nombre de coups joués
        this.coupsJoués++;
        if (this.coupsJoués == 42) {

          this.anticlick = "anticlick";
          this.SFX_pion.src = "../../../assets/sounds/SFXdraw.mp3";
          this.SFX_pion.load();
          this.SFX_pion.play();
          // alert("Draw");
        }

        //on test si victoire verticale
        let xTest = x;
        let yTest = y;
        let align = 0;
        while (yTest <= (y + 3) && yTest <= 6) {
          if (this.grille[xTest][yTest] == this.joueurEnCours) {
            align = align + 1;
            if (align == 4) {
              this.anticlick = "anticlick";
              this.SFX_WIN.src = "../../../assets/sounds/SFX_WIN.mp3";
              this.SFX_WIN.load();
              this.SFX_WIN.play();
              console.log(this.joueurEnCours + " gagne Wouhouuuu");
              return;
            };
          } else {
            align = 0;
          };
          yTest++;
        }
        //on test si victoire horizontale
        xTest = x;
        yTest = y;
        align = 0;
        let recule = 3;
        //on cherche la case de départ du test
        while (xTest > 0 && recule > 0) {
          xTest--;
          recule--;
        }
        //on check the lign
        while (xTest <= (x + 3) && xTest <= 6) {
          if (this.grille[xTest][yTest] == this.joueurEnCours) {
            align = align + 1;
            if (align == 4) {
              this.anticlick = "anticlick";
              this.SFX_WIN.src = "../../../assets/sounds/SFX_WIN.mp3";
              this.SFX_WIN.load();
              this.SFX_WIN.play();
              console.log(this.joueurEnCours + " gagne Wouhouuuu");
              return;
            };
          } else {
            align = 0;
          };
          xTest++;
        }

        //on check la diagonale
        xTest = x;
        yTest = y;
        align = 0;
        recule = 3;
        //on cherche la case de départ du test
        while (xTest > 0 && yTest < 6 && recule > 0) {
          xTest--;
          yTest++;
          recule--;
        }
        //on check la ligne diagonale
        while (xTest <= (x + 3) && xTest <= 6 && yTest >= (y - 3) && yTest > 1) {
          if (this.grille[xTest][yTest] == this.joueurEnCours) {
            align = align + 1;
            if (align == 4) {
              this.anticlick = "anticlick";              
              this.SFX_WIN.src = "../../../assets/sounds/SFX_WIN.mp3";
              this.SFX_WIN.load();
              this.SFX_WIN.play();
              console.log(this.joueurEnCours + " gagne Wouhouuuu");
              return;
            };
          } else {
            align = 0;
          };
          xTest++;
          yTest--;
        }

        //on check l'anti diagonales
        xTest = x;
        yTest = y;
        align = 0;
        recule = 3;

        //on cherche la case de départ du test
        while (xTest > 0 && yTest > 1 && recule > 0) {
          xTest--;
          yTest--;
          recule--;
        }
        //on check the ligne antidiagonale
        while (xTest <= (x + 3) && xTest <= 6 && yTest <= (y + 3) && yTest <= 6) {
          if (this.grille[xTest][yTest] == this.joueurEnCours) {
            align = align + 1;
            if (align == 4) {
              this.anticlick = "anticlick";              
              this.SFX_WIN.src = "../../../assets/sounds/SFX_WIN.mp3";
              this.SFX_WIN.load();
              this.SFX_WIN.play();
              console.log(this.joueurEnCours + " gagne Wouhouuuu");
              return;
            };
          } else {
            align = 0;
          };
          xTest++;
          yTest++;
        }

        //on change de joueur
        if (this.joueurEnCours == this.joueur1) {
          this.joueurEnCours = this.joueur2;
          this.classGhost = "ghost" + this.joueurEnCours;

        } else {
          this.joueurEnCours = this.joueur1;
          this.classGhost = "ghost" + this.joueurEnCours;
        }

        // On charge un bruit aléatoire de pose du pion
        let random = Math.floor(Math.random() * 2) + 1;
        this.SFX_pion.src = "../../../assets/sounds/SFXposePion" + random + ".mp3";
        this.SFX_pion.load();
        this.SFX_pion.play();
        this.plateauenligne.update({ casesenligne: this.grille});        

        return;
      } else {
        y--;
      };
    }
    console.log("Full");
    return;
  }

}







