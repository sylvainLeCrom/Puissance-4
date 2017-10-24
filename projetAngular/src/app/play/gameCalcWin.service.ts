import { Injectable } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { GameService } from './game.service';
import { Router } from '@angular/router';

@Injectable()
export class GameCalcWinService {
  public winnerAlignPre: string[][];

  constructor(private gameService: GameService, private router: Router) {
    this.winnerAlignPre = JSON.parse(JSON.stringify(this.grilleVide));
  }
  grilleVide = [
    ["vide", "vide", "vide", "vide", "vide", "vide"],
    ["vide", "vide", "vide", "vide", "vide", "vide"],
    ["vide", "vide", "vide", "vide", "vide", "vide"],
    ["vide", "vide", "vide", "vide", "vide", "vide"],
    ["vide", "vide", "vide", "vide", "vide", "vide"],
    ["vide", "vide", "vide", "vide", "vide", "vide"],
    ["vide", "vide", "vide", "vide", "vide", "vide"]
  ];

  verticalTest(
    x,
    y,
    grille,
    joueurEnCours,
    plateauenligne,
    winnerAlignGrille,
    winnerAlign,
    winPoint,
    gagnant,
    Dbgagne) {

    let xTest = x;
    let yTest = y;
    let align = 0;
    while (yTest <= (y + 3) && yTest <= 5) {
      if (grille[xTest][yTest] == joueurEnCours) {
        align = align + 1;
        this.winnerAlignPre[xTest][yTest] = winPoint;
        if (align == 4) {
          console.log("OULA");
          winnerAlign = this.winnerAlignPre;
          console.log(this.winnerAlignPre);
          plateauenligne.update({ winnerAlignGrille: winnerAlign });

          winnerAlignGrille.subscribe((grid) => {
            let i = 0;
            while (i < grid.length) {
              winnerAlign[i] = grid[i];
              i++;
            }
          });

          this.gameService.sendWinner(gagnant, joueurEnCours, plateauenligne, Dbgagne);

          return;
        }
      } else {
        align = 0;
      };
      yTest++;
    }
    this.winnerAlignPre = JSON.parse(JSON.stringify(this.grilleVide));
    console.log(this.winnerAlignPre);
  }
  horizontalTest(
    x,
    y,
    grille,
    joueurEnCours,
    plateauenligne,
    winnerAlignGrille,
    winnerAlign,
    winPoint,
    gagnant,
    Dbgagne
  ) {
    let xTest = x;
    let yTest = y;
    let align = 0;
    let recule = 3;
    //on cherche la case de départ du test
    while (xTest > 0 && recule > 0) {
      xTest--;
      recule--;
    }
    //on check the lign
    while (xTest <= (x + 3) && xTest <= 6) {
      if (grille[xTest][yTest] == joueurEnCours) {
        align = align + 1;
        this.winnerAlignPre[xTest][yTest] = winPoint;
        if (align == 4) {
          winnerAlign = this.winnerAlignPre;
          plateauenligne.update({ winnerAlignGrille: winnerAlign });

          winnerAlignGrille.subscribe((grid) => {
            let i = 0;
            while (i < grid.length) {
              winnerAlign[i] = grid[i];
              i++;
            }

          });
          this.gameService.sendWinner(gagnant, joueurEnCours, plateauenligne, Dbgagne);


          return;
        };
      } else {
        align = 0;
      };
      xTest++;
    }
    this.winnerAlignPre = JSON.parse(JSON.stringify(this.grilleVide));
    console.log(this.winnerAlignPre);
  }
  diagTest(
    x,
    y,
    grille, joueurEnCours,
    plateauenligne,
    winnerAlignGrille,
    winnerAlign,
    winPoint,
    gagnant,
    Dbgagne) {
    let xTest = x;
    let yTest = y;
    let align = 0;
    let recule = 3;
    //on cherche la case de départ du test
    while (xTest > 0 && yTest < 5 && recule > 0) {
      xTest--;
      yTest++;
      recule--;
    }
    //on check la ligne diagonale
    while (xTest <= (x + 3) && xTest <= 6 && yTest >= (y - 3) && yTest >= 0) {
      if (grille[xTest][yTest] == joueurEnCours) {
        align = align + 1;
        this.winnerAlignPre[xTest][yTest] = winPoint;
        if (align == 4) {
          winnerAlign = this.winnerAlignPre;
          plateauenligne.update({ winnerAlignGrille: winnerAlign });

          winnerAlignGrille.subscribe((grid) => {
            let i = 0;
            while (i < grid.length) {
              winnerAlign[i] = grid[i];
              i++;
            }
          });
          this.gameService.sendWinner(gagnant, joueurEnCours, plateauenligne, Dbgagne);


          return;
        };
      } else {
        align = 0;
      };
      xTest++;
      yTest--;
    }
    this.winnerAlignPre = JSON.parse(JSON.stringify(this.grilleVide));
    console.log(this.winnerAlignPre);
  }
  antiDiagTest(
    x,
    y,
    grille,
    joueurEnCours,
    plateauenligne,
    winnerAlignGrille,
    winnerAlign,
    winPoint,
    gagnant,
    Dbgagne) {
    let xTest = x;
    let yTest = y;
    let align = 0;
    let recule = 3;

    //on cherche la case de départ du test
    while (xTest > 0 && yTest > 1 && recule > 0) {
      xTest--;
      yTest--;
      recule--;
    }
    //on check the ligne antidiagonale
    while (xTest <= (x + 3) && xTest <= 6 && yTest <= (y + 3) && yTest <= 5) {
      if (grille[xTest][yTest] == joueurEnCours) {
        align = align + 1;
        this.winnerAlignPre[xTest][yTest] = winPoint;
        if (align == 4) {
          winnerAlign = this.winnerAlignPre;
          plateauenligne.update({ winnerAlignGrille: winnerAlign });

          winnerAlignGrille.subscribe((grid) => {
            let i = 0;
            while (i < grid.length) {
              winnerAlign[i] = grid[i];
              i++;
            }
          });

          this.gameService.sendWinner(gagnant, joueurEnCours, plateauenligne, Dbgagne);

          return;
        };
      } else {
        align = 0;
      };
      xTest++;
      yTest++;
    }
    this.winnerAlignPre = JSON.parse(JSON.stringify(this.grilleVide));
    console.log(this.winnerAlignPre);
  }
}
