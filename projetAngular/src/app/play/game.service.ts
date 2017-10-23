import { Injectable } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { SOUNDS } from './sounds';
import { Router } from '@angular/router';

@Injectable()



export class GameService {

    constructor(private router: Router, ) {

    }
    theme = "classic";
    grilleVide = [
        ["vide", "vide", "vide", "vide", "vide", "vide"],
        ["vide", "vide", "vide", "vide", "vide", "vide"],
        ["vide", "vide", "vide", "vide", "vide", "vide"],
        ["vide", "vide", "vide", "vide", "vide", "vide"],
        ["vide", "vide", "vide", "vide", "vide", "vide"],
        ["vide", "vide", "vide", "vide", "vide", "vide"],
        ["vide", "vide", "vide", "vide", "vide", "vide"]
    ];

    // GESTION DES SONS
    getSounds() {
        return SOUNDS[this.theme];
    }

    playSound(src: string) {
        let sound = new Audio();
        sound.src = src;
        sound.load();
        sound.play();
    }

    playPionSound() {
        let sounds = this.getSounds().pion;
        console.log(sounds);
        let random = Math.floor(Math.random() * sounds.length);
        console.log(random);
        console.log(sounds[random]);

        this.playSound(sounds[random]);
    }

    playWinSound() {
        this.playSound(this.getSounds().win);
    }

    playDrawSound() {
        this.playSound(this.getSounds().draw);
    }

    playLooseSound() {
        this.playSound(this.getSounds().loose);
    }
    // navigation ROUTING
    goToRoomChoice() {
        this.router.navigateByUrl('/pseudo');
    }


    sendWinner(gagnant, joueurEnCours, plateauenligne, Dbgagne) {
        //on envoie le nom du gagnant
        gagnant = joueurEnCours;
        console.log(gagnant);
        plateauenligne.update({ gagnant: gagnant });
        Dbgagne.subscribe((data) => {
            gagnant = data.$value;
        });
    }
    changePlayer(joueur1, joueur2, joueurEnCours, auTourDe, plateauenligne, classGhost) {
        if (joueurEnCours == joueur1) {
            joueurEnCours = joueur2;
            plateauenligne.update({ auTourDe: joueurEnCours });
            auTourDe.subscribe((data) => {
                joueurEnCours = data.$value;
            });
            classGhost = "ghost" + joueurEnCours;


        } else {
            joueurEnCours = joueur1;
            plateauenligne.update({ auTourDe: joueurEnCours });
            auTourDe.subscribe((data) => {
                joueurEnCours = data.$value;
            });
            classGhost = "ghost" + joueurEnCours;
        }
    }

    verticalTest(
        x,
        y,
        grille,
        joueurEnCours,
        plateauenligne,
        winnerAlignGrille,
        winnerAlignPre,
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
                winnerAlignPre[xTest][yTest] = winPoint;
                if (align == 4) {
                    console.log("OULA");
                    winnerAlign = winnerAlignPre;
                    plateauenligne.update({ winnerAlignGrille: winnerAlign });

                    winnerAlignGrille.subscribe((grid) => {
                        let i = 0;
                        while (i < grid.length) {
                            winnerAlign[i] = grid[i];
                            i++;
                        }
                    });

                    this.sendWinner(gagnant, joueurEnCours, plateauenligne, Dbgagne);

                    return;
                }
            } else {
                align = 0;
            };
            yTest++;
        }
        winnerAlignPre = JSON.parse(JSON.stringify(this.grilleVide));
    }
    horizontalTest(
        x,
        y,
        grille,
        plateauenligne,
        Dbgagne,
        joueurEnCours,
        winnerAlignPre,
        winnerAlign,
        winnerAlignGrille,
        winPoint,
        gagnant) {
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
            winnerAlignPre[xTest][yTest] = winPoint;
            if (align == 4) {
              winnerAlign = winnerAlignPre;
              plateauenligne.update({ winnerAlignGrille: winnerAlign });
    
              winnerAlignGrille.subscribe((grid) => {
                let i = 0;
                while (i < grid.length) {
                  winnerAlign[i] = grid[i];
                  i++;
                }
    
              });
              this.sendWinner(gagnant, joueurEnCours, plateauenligne, Dbgagne);
    
    
              return;
            };
          } else {
            align = 0;
          };
          xTest++;
        }
        winnerAlignPre = JSON.parse(JSON.stringify(this.grilleVide));
      }
      diagTest(
          x,
        y,
        grille,
        plateauenligne,
        Dbgagne,
        joueurEnCours,
        winnerAlignPre,
        winnerAlign,
        winnerAlignGrille,
        winPoint,
        gagnant) {
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
            winnerAlignPre[xTest][yTest] = winPoint;
            if (align == 4) {
              winnerAlign = winnerAlignPre;
              plateauenligne.update({ winnerAlignGrille: winnerAlign });
    
              winnerAlignGrille.subscribe((grid) => {
                let i = 0;
                while (i < grid.length) {
                  winnerAlign[i] = grid[i];
                  i++;
                }
              });
              this.sendWinner(gagnant, joueurEnCours, plateauenligne, Dbgagne);
    
    
              return;
            };
          } else {
            align = 0;
          };
          xTest++;
          yTest--;
        }
        winnerAlignPre = JSON.parse(JSON.stringify(this.grilleVide));
      }
      antiDiagTest(x,
        y,
        grille,
        plateauenligne,
        Dbgagne,
        joueurEnCours,
        winnerAlignPre,
        winnerAlign,
        winnerAlignGrille,
        winPoint,
        gagnant) {
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
            winnerAlignPre[xTest][yTest] = winPoint;
            if (align == 4) {
              winnerAlign = winnerAlignPre;
              plateauenligne.update({ winnerAlignGrille: winnerAlign });
    
              winnerAlignGrille.subscribe((grid) => {
                let i = 0;
                while (i < grid.length) {
                  winnerAlign[i] = grid[i];
                  i++;
                }
              });
    
              this.sendWinner(gagnant, joueurEnCours, plateauenligne, Dbgagne);
    
              return;
            };
          } else {
            align = 0;
          };
          xTest++;
          yTest++;
        }
        winnerAlignPre = JSON.parse(JSON.stringify(this.grilleVide));
      }
}