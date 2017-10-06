import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  public coupsJoués: number;
  public grille: string[][];
  public joueurEnCours: string;
  public joueur1: string;
  public joueur2: string;
  constructor() {
    this.coupsJoués = 0;
    this.joueur1 = "rouge";
    this.joueur2 = "jaune"
    this.joueurEnCours = this.joueur1;
    this.grille = [
      ["vide", "vide", "vide", "vide", "vide", "vide", "ghost"+ this.joueurEnCours],
      ["vide", "vide", "vide", "vide", "vide", "vide", "ghost"+ this.joueurEnCours],
      ["vide", "vide", "vide", "vide", "vide", "vide", "ghost" + this.joueurEnCours],
      ["vide", "vide", "vide", "vide", "vide", "vide", "ghost" + this.joueurEnCours],
      ["vide", "vide", "vide", "vide", "vide", "vide", "ghost" + this.joueurEnCours],
      ["vide", "vide", "vide", "vide", "vide", "vide", "ghost" + this.joueurEnCours],
      ["vide", "vide", "vide", "vide", "vide", "vide", "ghost" + this.joueurEnCours]
    ];

  }
  ngOnInit() {

  }
  clickedColumn(id: number): void {


    let x = id;
    let y = 6;
    while (y > 0) {
      if (this.grille[x][y] == 'vide') {
        this.grille[x][y] = this.joueurEnCours;

        this.coupsJoués++;
        console.log(this.coupsJoués);
        if (this.coupsJoués == 42) {
          alert("Draw");
        }

        //on test si victoire verticale
        let xTest = x;
        let yTest = y;
        let align = 0;
        while (yTest <= (y + 3) && yTest <= 6) {
          if (this.grille[xTest][yTest] == this.joueurEnCours) {
            align = align + 1;
            if (align == 4) {
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
              console.log(this.joueurEnCours + " gagne Wouhouuuu");
              return;
            };
          } else {
            align = 0;
          };
          xTest++;
        }

        //on check les diagos
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
        //on check the lign diago
        while (xTest <= (x + 3) && xTest <= 6 && yTest >= (y - 3) && yTest > 1) {
          if (this.grille[xTest][yTest] == this.joueurEnCours) {
            align = align + 1;
            if (align == 4) {
              console.log(this.joueurEnCours + " gagne Wouhouuuu");
              return;
            };
          } else {
            align = 0;
          };
          xTest++;
          yTest--;
        }

        //on check l'anti diago
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
        //on check the lign antidiago
        while (xTest <= (x + 3) && xTest <= 6 && yTest <= (y + 3) && yTest <= 6) {
          if (this.grille[xTest][yTest] == this.joueurEnCours) {
            align = align + 1;
            if (align == 4) {
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
        } else {
          this.joueurEnCours = this.joueur1;
        }




        return;
      } else {
        y--;

      };

    }
    console.log("Full");
    return;
  }

}







