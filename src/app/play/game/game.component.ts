import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../auth/auth.service';
import { GameService } from '../game.service';
import { GameCalcWinService } from '../gameCalcWin.service';
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
  nbJoueurPath : any;

  public coupsJoués: number;
  public grille: string[][];
  public winnerAlign: string[][];
  public joueurEnCours: any;
  public gagnant: string;
  public winPoint: string;
  public classGhost: string;
  public anticlick: boolean;
  public joueur1: string;
  public joueur2: string;
  public userUID: any;
  public indexRoom: number;
  public IDJoueur: string;
  public couleurJoueur: string;
  public other: string;
  public indexJoueur: number;
  public pseudo: string;
  public divReset: boolean;
  public nbJoueur: number;

  constructor(public af: AngularFireDatabase,
    public authService: AuthService,
    public afAuth: AngularFireAuth,
    private router: Router,
    public gameService: GameService,
    public gameCalcWinService: GameCalcWinService) {

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

    this.grille = JSON.parse(JSON.stringify(this.gameCalcWinService.grilleVide));
    this.winnerAlign = JSON.parse(JSON.stringify(this.gameCalcWinService.grilleVide));
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
        this.pseudo = user.pseudo;
        while (this.indexRoom == undefined) {
        }
        this.plateauenligne = this.af.object('/game/rooms/' + this.indexRoom);
        this.plateauDeJeu = this.af.object('/game/rooms/' + this.indexRoom + '/plateauDeJeu');
        this.auTourDe = this.af.object('/game/rooms/' + this.indexRoom + '/auTourDe');
        this.nbJoueurPath = this.af.object('/game/rooms/' + this.indexRoom + '/nbJoueur');
        this.Dbgagne = this.af.object('/game/rooms/' + this.indexRoom + '/gagnant');
        this.plateauDeJeu.remove();
        
        /*
        this.nbJoueurPath.subscribe((data) =>{
          this.nbJoueur = data.$value;
          console.log(this.nbJoueur);
          if (this.nbJoueur != 2){
            this.anticlick = true;            
          }
        });
        console.log(this.nbJoueur);
        */
        
        this.auTourDe.subscribe((data) => {
          this.joueurEnCours = data.$value;
          if (this.joueurEnCours == this.couleurJoueur) {
            this.anticlick = false;
          } else {
            this.anticlick = true;
          }
        });
        this.Dbgagne.subscribe((data) => {
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
        this.winnerAlign = JSON.parse(JSON.stringify(this.gameCalcWinService.grilleVide));
        this.winnerAlignGrille = this.af.object('/game/rooms/' + this.indexRoom + '/winnerAlignGrille');
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
    this.winnerAlign = JSON.parse(JSON.stringify(this.gameCalcWinService.grilleVide));
    this.winnerAlignGrille.remove();
    this.winnerAlignGrille.subscribe((grid) => {

      let i = 0;
      while (i < grid.length) {
        this.winnerAlign[i] = grid[i];
        i++;
      }
    });
    this.grille = JSON.parse(JSON.stringify(this.gameCalcWinService.grilleVide));
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
   // this.anticlick = false;
   if (this.joueurEnCours == this.couleurJoueur) {
    this.anticlick = false;
    console.log("false");
  } else {
    this.anticlick = true;
    console.log("true");
    
  }
  this.gagnant = "null";
  }
  quit() {
    this.authService.authState.subscribe((userAuth) => {
      this.userUID = userAuth.uid.toString();
      const userPath = "users/" + this.userUID;
      this.af.object(userPath).take(1).subscribe((user) => {
        this.IDJoueur = user.IDduJoueur;
        this.indexRoom = user.indexRoom;
        this.plateauenligne = this.af.object('/game/rooms/' + this.indexRoom);
        this.plateauenligne.take(1).subscribe((data) => {
          const nbJoueurActual = data.nbJoueur;
          console.log(nbJoueurActual);
          if (nbJoueurActual == 1) {
            console.log("HE PA , jm'en fou mets ce que tu veux !")
            this.plateauenligne.remove();
            this.af.object('/game').take(1).subscribe((data) => {
              let nbOpenRoomActual = data.numberOpenRoom;
              nbOpenRoomActual = nbOpenRoomActual - 1;
              this.af.object('/game').update({ numberOpenRoom: nbOpenRoomActual });

            });
          } else {
            const gamers = this.af.object('/game/rooms/' + this.indexRoom + '/gamers/');
            gamers.take(1).subscribe((data) => {

              const IDjoueur1 = data.joueur1.IDduJoueur;
              console.log(IDjoueur1)
              if (IDjoueur1 == this.IDJoueur) {
                this.af.object('/game/rooms/' + this.indexRoom + '/gamers/joueur1').remove();
              } else {
                this.af.object('/game/rooms/' + this.indexRoom + '/gamers/joueur2').remove()
              }

              this.plateauenligne.update({ placement: 1, nbJoueur: 1, gagnant: "null" });
            });
          }
          this.gameService.goToRoomChoice();
        });


      });
    });

  }

  clickedColumn(id: number): void {
    // si ce n'est pas mon tour, je ne peux pas jouer !
    if (this.anticlick || this.gagnant != "null") {
      return;
    }
    this.winnerAlignGrille.subscribe((grid) => {
      let i = 0;
      while (i < grid.length) {
        this.winnerAlign[i] = grid[i];
        i++;
      }
    });
    this.winnerAlign = JSON.parse(JSON.stringify(this.gameCalcWinService.grilleVide));
    this.winnerAlignGrille.remove();
    this.plateauenligne.update({ winnerAlignGrille: this.winnerAlign });
    let x = id;
    let y = 6;
    while (y >= 0) {
      if (this.grille[x][y] == 'vide') {
        this.grille[x][y] = this.joueurEnCours;
        this.plateauenligne.update({ plateauDeJeu: this.grille });

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
        this.gameCalcWinService.verticalTest(
          x,
          y,
          this.grille,
          this.joueurEnCours,
          this.plateauenligne,
          this.winnerAlignGrille,
          this.winnerAlign,
          this.winPoint,
          this.gagnant,
          this.Dbgagne
        );
        //on test si victoire horizontale
        this.gameCalcWinService.horizontalTest(
          x,
          y,
          this.grille, this.joueurEnCours,
          this.plateauenligne,
          this.winnerAlignGrille,
          this.winnerAlign,
          this.winPoint,
          this.gagnant,
          this.Dbgagne
        );

        //on check la diagonale
        this.gameCalcWinService.diagTest(
          x,
          y,
          this.grille, this.joueurEnCours,
          this.plateauenligne,
          this.winnerAlignGrille,
          this.winnerAlign,
          this.winPoint,
          this.gagnant,
          this.Dbgagne
        );

        //on check l'anti diagonales
        this.gameCalcWinService.antiDiagTest(
          x,
          y,
          this.grille, this.joueurEnCours,
          this.plateauenligne,
          this.winnerAlignGrille,
          this.winnerAlign,
          this.winPoint,
          this.gagnant,
          this.Dbgagne);


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
}