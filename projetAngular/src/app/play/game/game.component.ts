import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../auth/auth.service';
import { GameService } from '../game.service';
import { Router } from '@angular/router';
import "rxjs/Rx";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: [
    './game.component.css',
    './game.component.classic.css',
    './game.component.wood.css',
    './game.component.simpson.css'
  ]
})
export class GameComponent implements OnInit {
  plateauenligne: FirebaseObjectObservable<any>;
  plateauDeJeu: FirebaseObjectObservable<any[]>;
  winnerAlignGrille: FirebaseObjectObservable<any[]>;
  auTourDe: any;
  Dbgagne: any;

  public coupsJoués: number;
  public grille: string[][];
  public winnerAlign: string[][];
  public winnerAlignPre: string[][];
  public joueurEnCours: any;
  public gagnant: string;
  public winPoint: string;
  public classGhost: string;
  public anticlick: boolean;
  public joueur1: string;
  public joueur2: string;
  public userUID: any;
  public indexRoom: number;
  public theme: string;
  public IDJoueur: string;
  public couleurJoueur: string;
  public other: string;
  public indexJoueur: number;
  public pseudo: string;
  public divReset: boolean;

  constructor(public af: AngularFireDatabase,
    private authService: AuthService,
    public afAuth: AngularFireAuth,
    private router: Router,
    private gameService: GameService) {

    this.divReset = false;

    this.coupsJoués = 0;
    this.joueur1 = "rouge";
    this.joueur2 = "jaune";
    let random = Math.floor(Math.random() * 2) + 1;
    if (random == 1) {
      this.joueurEnCours = this.joueur1;
    } else {
      this.joueurEnCours = this.joueur2;
    }
    this.gagnant = "null";
    this.winPoint = "winPoint";
    this.classGhost = "ghost" + this.joueurEnCours;
    this.anticlick = false;

    this.grille = JSON.parse(JSON.stringify(this.gameService.grilleVide));
    this.winnerAlign = JSON.parse(JSON.stringify(this.gameService.grilleVide));
    this.winnerAlignPre = JSON.parse(JSON.stringify(this.gameService.grilleVide));
  }

  ngOnInit() {
    this.authService.authState.subscribe((userAuth) => {
      this.userUID = userAuth.uid.toString();
      const userPath = "users/" + this.userUID;
      this.af.object(userPath).take(1).subscribe((user) => {
        this.IDJoueur = user.IDduJoueur;
        this.couleurJoueur = user.couleur;
        if (this.couleurJoueur == this.joueur1) {
          this.other = this.joueur2;
        } else {
          this.other = this.joueur1;
        }
        this.indexJoueur = user.index;
        this.indexRoom = user.indexRoom;
        this.theme = user.theme;
        this.pseudo = user.pseudo;
        while (this.indexRoom == undefined) {
        }
        this.plateauenligne = this.af.object('/' + this.theme + '/rooms/' + this.indexRoom);
        this.plateauDeJeu = this.af.object('/' + this.theme + '/rooms/' + this.indexRoom + '/plateauDeJeu');
        this.auTourDe = this.af.object('/' + this.theme + '/rooms/' + this.indexRoom + '/auTourDe');
        this.Dbgagne = this.af.object('/' + this.theme + '/rooms/' + this.indexRoom + '/gagnant');
        this.plateauDeJeu.remove();
        this.auTourDe.subscribe((data) => {
          this.joueurEnCours = data.$value;
        });
        this.Dbgagne.subscribe((data) => {
          console.log("fffffff");
          this.gagnant = data.$value;
          if (this.gagnant == "personne") {
            this.gameService.playDrawSound();
            this.divReset = true;
            this.anticlick = true;

          } else if (this.gagnant == this.couleurJoueur) {
            this.gameService.playWinSound();
            this.divReset = true;
            this.anticlick = true;

          } else if (this.gagnant == this.other) {
            this.gameService.playLooseSound();
            this.divReset = true;
            this.anticlick = true;
          }
        });



        this.plateauDeJeu.subscribe((grid) => {
          console.log("JE FAIS DU SON");

          if (!this.isGridEmpty(grid)) {
            this.gameService.playPionSound();
          }

          let i = 0;
          while (i < grid.length) {
            this.grille[i] = grid[i];
            i++;
          }
        });
        this.plateauenligne.update({ plateauDeJeu: this.grille, auTourDe: this.joueurEnCours });
        this.plateauenligne.update({ auTourDe: this.joueurEnCours });
        this.winnerAlign = JSON.parse(JSON.stringify(this.gameService.grilleVide));
        this.winnerAlignGrille = this.af.object('/' + this.theme + '/rooms/' + this.indexRoom + '/winnerAlignGrille');
        this.winnerAlignGrille.remove();
        this.winnerAlignGrille.subscribe((grid) => {

          let i = 0;
          while (i < grid.length) {
            this.winnerAlign[i] = grid[i];
            i++;
          }
        });
        this.plateauenligne.update({ plateauDeJeu: this.grille, auTourDe: this.joueurEnCours, gagnant: this.gagnant, winnerAlignGrille: this.winnerAlign });
      }
      );
    });
  }

  isGridEmpty(grid: string[][]) {
    for (let column of grid) {
      for (let cell of column) {
        if (cell != "vide") {
          return false;
        }
      }
    }
    return true;
  }

  newGame() {
    this.winnerAlign = JSON.parse(JSON.stringify(this.gameService.grilleVide));
    this.winnerAlignGrille.remove();
    this.winnerAlignGrille.subscribe((grid) => {

      let i = 0;
      while (i < grid.length) {
        this.winnerAlign[i] = grid[i];
        i++;
      }
    });
    this.grille = JSON.parse(JSON.stringify(this.gameService.grilleVide));
    this.plateauDeJeu.remove();
    this.plateauDeJeu.take(1).subscribe((grid) => {
      console.log("GROS SON RECOMMENCER");
      let i = 0;
      while (i < grid.length) {
        this.grille[i] = grid[i];
        i++;
      }
    });
    this.plateauenligne.update({ plateauDeJeu: this.grille, auTourDe: this.joueurEnCours, winnerAlignGrille: this.winnerAlign });
    this.divReset = false;
    this.anticlick = false;
  }

  quit() {
    this.authService.authState.subscribe((userAuth) => {
      this.userUID = userAuth.uid.toString();
      const userPath = "users/" + this.userUID;
      this.af.object(userPath).take(1).subscribe((user) => {
        this.theme = user.theme;
        this.IDJoueur = user.IDduJoueur;
        this.indexRoom = user.indexRoom;
        this.plateauenligne = this.af.object('/' + this.theme + '/rooms/' + this.indexRoom);
        this.plateauenligne.take(1).subscribe((data) => {
          const nbJoueurActual = data.nbJoueur;
          if (nbJoueurActual == 1) {
            this.plateauenligne.remove();
            this.af.object('/' + this.theme).take(1).subscribe((data) => {
              let nbOpenRoomActual = data.numberOpenRoom;
              nbOpenRoomActual = nbOpenRoomActual - 1;
              this.af.object('/' + this.theme).update({ numberOpenRoom: nbOpenRoomActual });

            });
            // this.af.object('/' + this.theme).unsubscribe();

            this.router.navigateByUrl('/pseudo');
          } else {
            const gamers = this.af.object('/' + this.theme + '/rooms/' + this.indexRoom + '/gamers/');
            gamers.take(1).subscribe((data) => {

              const IDjoueur1 = data.joueur1.IDduJoueur;
              console.log(IDjoueur1)
              if (IDjoueur1 == this.IDJoueur) {
                this.af.object('/' + this.theme + '/rooms/' + this.indexRoom + '/gamers/joueur1').remove();
              } else {
                this.af.object('/' + this.theme + '/rooms/' + this.indexRoom + '/gamers/joueur2').remove()
              }

              this.plateauenligne.update({ placement: 1, nbJoueur: 1, gagnant: "null" });
              this.router.navigateByUrl('/pseudo');


            });
          }
          console.log(nbJoueurActual);
        });


      });
    });

    //this.afAuth.auth.signOut();
  }


  clickedColumn(id: number): void {

    this.winnerAlignGrille.subscribe((grid) => {
      let i = 0;
      while (i < grid.length) {
        this.winnerAlign[i] = grid[i];
        i++;
      }
    });
    this.winnerAlign = JSON.parse(JSON.stringify(this.gameService.grilleVide));
    this.winnerAlignGrille.remove();
    this.plateauenligne.update({ winnerAlignGrille: this.winnerAlign });
    let x = id;
    let y = 6;
    while (y >= 0) {
      if (this.grille[x][y] == 'vide') {
        this.grille[x][y] = this.joueurEnCours;
        this.plateauenligne.update({ plateauDeJeu: this.grille });
        /*this.plateauDeJeu.subscribe((grid) => {
          console.log("JE FAIS DU BRUIT");
          let i = 0;
          while (i < grid.length) {
            this.grille[i] = grid[i];
            i++;
          }
        });*/
        // on comptabilise le nombre de coups joués
        this.coupsJoués++;
        if (this.coupsJoués == 42) {
          this.gagnant = "personne";
          this.plateauenligne.update({ gagnant: this.gagnant });
          this.Dbgagne.subscribe((data) => {
            this.gagnant = data.$value;
          });

        }
        //on test si victoire verticale
        this.gameService.verticalTest(
          x,
          y,
          this.grille,
          this.joueurEnCours,
          this.plateauenligne,
          this.winnerAlignGrille,
          this.winnerAlignPre,
          this.winnerAlign,
          this.winPoint,
          this.gagnant,
          this.Dbgagne
        );
        //on test si victoire horizontale
        this.horizontalTest(x, y);

        //on check la diagonale
        this.diagTest(x, y);

        //on check l'anti diagonales
        this.antiDiagTest(x, y);


        //on change de joueur
        this.gameService.changePlayer(this.joueur1, this.joueur2, this.joueurEnCours, this.auTourDe, this.plateauenligne, this.classGhost);

        return;
      } else {
        y--;
      };
    }
    alert("Full");
    return;
  }


  horizontalTest(x, y) {
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
      if (this.grille[xTest][yTest] == this.joueurEnCours) {
        align = align + 1;
        this.winnerAlignPre[xTest][yTest] = this.winPoint;
        if (align == 4) {
          this.winnerAlign = this.winnerAlignPre;
          this.plateauenligne.update({ winnerAlignGrille: this.winnerAlign });

          this.winnerAlignGrille.subscribe((grid) => {
            let i = 0;
            while (i < grid.length) {
              this.winnerAlign[i] = grid[i];
              i++;
            }

          });
          this.gameService.sendWinner(this.gagnant, this.joueurEnCours, this.plateauenligne, this.Dbgagne);


          return;
        };
      } else {
        align = 0;
      };
      xTest++;
    }
    this.winnerAlignPre = JSON.parse(JSON.stringify(this.gameService.grilleVide));
  }
  diagTest(x, y) {
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
      if (this.grille[xTest][yTest] == this.joueurEnCours) {
        align = align + 1;
        this.winnerAlignPre[xTest][yTest] = this.winPoint;
        if (align == 4) {
          this.winnerAlign = this.winnerAlignPre;
          this.plateauenligne.update({ winnerAlignGrille: this.winnerAlign });

          this.winnerAlignGrille.subscribe((grid) => {
            let i = 0;
            while (i < grid.length) {
              this.winnerAlign[i] = grid[i];
              i++;
            }
          });
          this.gameService.sendWinner(this.gagnant, this.joueurEnCours, this.plateauenligne, this.Dbgagne);


          return;
        };
      } else {
        align = 0;
      };
      xTest++;
      yTest--;
    }
    this.winnerAlignPre = JSON.parse(JSON.stringify(this.gameService.grilleVide));
  }
  antiDiagTest(x, y) {
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
      if (this.grille[xTest][yTest] == this.joueurEnCours) {
        align = align + 1;
        this.winnerAlignPre[xTest][yTest] = this.winPoint;
        if (align == 4) {
          this.winnerAlign = this.winnerAlignPre;
          this.plateauenligne.update({ winnerAlignGrille: this.winnerAlign });

          this.winnerAlignGrille.subscribe((grid) => {
            let i = 0;
            while (i < grid.length) {
              this.winnerAlign[i] = grid[i];
              i++;
            }
          });

          this.gameService.sendWinner(this.gagnant, this.joueurEnCours, this.plateauenligne, this.Dbgagne);

          return;
        };
      } else {
        align = 0;
      };
      xTest++;
      yTest++;
    }
    this.winnerAlignPre = JSON.parse(JSON.stringify(this.gameService.grilleVide));
  }
}