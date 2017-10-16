import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  plateauenligne: FirebaseObjectObservable<any[]>;
  plateauDeJeu: FirebaseObjectObservable<any[]>;
  winnerAlignGrille: FirebaseObjectObservable<any[]>;
  auTourDe: any;
  cases0: FirebaseListObservable<any[]>;
  cases1: FirebaseListObservable<any[]>;
  cases2: FirebaseListObservable<any[]>;
  cases3: FirebaseListObservable<any[]>;
  cases4: FirebaseListObservable<any[]>;
  cases5: FirebaseListObservable<any[]>;
  cases6: FirebaseListObservable<any[]>;
  wincases0: FirebaseListObservable<any[]>;
  wincases1: FirebaseListObservable<any[]>;
  wincases2: FirebaseListObservable<any[]>;
  wincases3: FirebaseListObservable<any[]>;
  wincases4: FirebaseListObservable<any[]>;
  wincases5: FirebaseListObservable<any[]>;
  wincases6: FirebaseListObservable<any[]>;
  public SFX_pion;
  public SFX_draw;
  public SFX_WIN;
  public coupsJoués: number;
  public grille: string[][];
  public winnerAlign: string[][];
  public winnerAlignPre: string[][];
  public joueurEnCours: any;
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
  public indexJoueur: number;
  public pseudo: string;

  constructor(public af: AngularFireDatabase, private authService: AuthService) {
    this.SFX_pion = new Audio();
    this.SFX_draw = new Audio();
    this.SFX_WIN = new Audio();

    this.coupsJoués = 0;
    this.joueur1 = "rouge";
    this.joueur2 = "jaune";
    this.joueurEnCours = this.joueur1;
    this.winPoint = "winPoint";
    this.classGhost = "ghost" + this.joueurEnCours;
    this.anticlick = false;
    this.grille = [
      ["vide", "vide", "vide", "vide", "vide", "vide"],
      ["vide", "vide", "vide", "vide", "vide", "vide"],
      ["vide", "vide", "vide", "vide", "vide", "vide"],
      ["vide", "vide", "vide", "vide", "vide", "vide"],
      ["vide", "vide", "vide", "vide", "vide", "vide"],
      ["vide", "vide", "vide", "vide", "vide", "vide"],
      ["vide", "vide", "vide", "vide", "vide", "vide"]
    ];
    this.winnerAlign = [
      ["vide", "vide", "vide", "vide", "vide", "vide"],
      ["vide", "vide", "vide", "vide", "vide", "vide"],
      ["vide", "vide", "vide", "vide", "vide", "vide"],
      ["vide", "vide", "vide", "vide", "vide", "vide"],
      ["vide", "vide", "vide", "vide", "vide", "vide"],
      ["vide", "vide", "vide", "vide", "vide", "vide"],
      ["vide", "vide", "vide", "vide", "vide", "vide"]
    ];
    this.winnerAlignPre = [
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
    this.authService.authState.subscribe((userAuth) => {
      this.userUID = userAuth.uid.toString();
      const userPath = "users/" + this.userUID;
      this.af.object(userPath).subscribe((user) => {
        this.IDJoueur = user.IDduJoueur;
        this.couleurJoueur = user.couleur;
        this.indexJoueur = user.index;
        this.indexRoom = user.indexRoom;
        this.theme = user.theme;
        this.pseudo = user.pseudo;
        while (this.indexRoom == undefined) {
        }
        this.plateauenligne = this.af.object('/' + this.theme + '/rooms/' + this.indexRoom);
        this.plateauDeJeu = this.af.object('/' + this.theme + '/rooms/' + this.indexRoom + '/plateauDeJeu');
        this.auTourDe = this.af.object('/' + this.theme + '/rooms/' + this.indexRoom + '/auTourDe');
        this.cases0 = this.af.list('/' + this.theme + '/room/' + this.indexRoom + '/plateauDeJeu/0');
        this.cases1 = this.af.list('/' + this.theme + '/room/' + this.indexRoom + '/plateauDeJeu/1');
        this.cases2 = this.af.list('/' + this.theme + '/room/' + this.indexRoom + '/plateauDeJeu/2');
        this.cases3 = this.af.list('/' + this.theme + '/room/' + this.indexRoom + '/plateauDeJeu/3');
        this.cases4 = this.af.list('/' + this.theme + '/room/' + this.indexRoom + '/plateauDeJeu/4');
        this.cases5 = this.af.list('/' + this.theme + '/room/' + this.indexRoom + '/plateauDeJeu/5');
        this.cases6 = this.af.list('/' + this.theme + '/room/' + this.indexRoom + '/plateauDeJeu/6');
        this.plateauDeJeu.remove();
        this.auTourDe.subscribe((data) => {
          this.joueurEnCours = data.$value;
        });
        this.plateauDeJeu.subscribe((grid) => {

          let i = 0;
          while (i < grid.length) {
            this.grille[i] = grid[i];
            i++;
          }
        });
        this.plateauenligne.update({ plateauDeJeu: this.grille, auTourDe: this.joueurEnCours });
        this.plateauenligne.update({ auTourDe: this.joueurEnCours });
        this.winnerAlign = [
          ["vide", "vide", "vide", "vide", "vide", "vide"],
          ["vide", "vide", "vide", "vide", "vide", "vide"],
          ["vide", "vide", "vide", "vide", "vide", "vide"],
          ["vide", "vide", "vide", "vide", "vide", "vide"],
          ["vide", "vide", "vide", "vide", "vide", "vide"],
          ["vide", "vide", "vide", "vide", "vide", "vide"],
          ["vide", "vide", "vide", "vide", "vide", "vide"]
        ];
        this.winnerAlignGrille = this.af.object('/' + this.theme + '/rooms/' + this.indexRoom + '/winnerAlignGrille');
        this.wincases0 = this.af.list('/' + this.theme + '/room/' + this.indexRoom + '/winnerAlignGrille/0');
        this.wincases1 = this.af.list('/' + this.theme + '/room/' + this.indexRoom + '/winnerAlignGrille/1');
        this.wincases2 = this.af.list('/' + this.theme + '/room/' + this.indexRoom + '/winnerAlignGrille/2');
        this.wincases3 = this.af.list('/' + this.theme + '/room/' + this.indexRoom + '/winnerAlignGrille/3');
        this.wincases4 = this.af.list('/' + this.theme + '/room/' + this.indexRoom + '/winnerAlignGrille/4');
        this.wincases5 = this.af.list('/' + this.theme + '/room/' + this.indexRoom + '/winnerAlignGrille/5');
        this.wincases6 = this.af.list('/' + this.theme + '/room/' + this.indexRoom + '/winnerAlignGrille/6');
        this.winnerAlignGrille.remove();
        this.winnerAlignGrille.subscribe((grid) => {

          let i = 0;
          while (i < grid.length) {
            this.winnerAlign[i] = grid[i];
            i++;
          }
        });
        this.plateauenligne.update({ plateauDeJeu: this.grille, auTourDe: this.joueurEnCours, winnerAlignGrille: this.winnerAlign });
      }
      );
    });
  }
  newGame() {
    console.log("reload page");
    /*
     this.winnerAlign = grilleVide;
     this.winnerAlignGrille.remove();
     this.winnerAlignGrille.subscribe((grid) => {
 
       let i = 0;
       while (i < grid.length) {
         this.winnerAlign[i] = grid[i];
         i++;
       }
     });
     this.grille = grilleVide;    
     this.plateauDeJeu.remove();
     this.plateauDeJeu.subscribe((grid) => {
 
       let i = 0;
       while (i < grid.length) {
         this.grille[i] = grid[i];
         i++;
       }
     });
     this.plateauenligne.update({ plateauDeJeu: this.grille, auTourDe: this.joueurEnCours, winnerAlignGrille: this.winnerAlign });
   */
  }



  clickedColumn(id: number): void {
    const grilleVide = [
      ["vide", "vide", "vide", "vide", "vide", "vide"],
      ["vide", "vide", "vide", "vide", "vide", "vide"],
      ["vide", "vide", "vide", "vide", "vide", "vide"],
      ["vide", "vide", "vide", "vide", "vide", "vide"],
      ["vide", "vide", "vide", "vide", "vide", "vide"],
      ["vide", "vide", "vide", "vide", "vide", "vide"],
      ["vide", "vide", "vide", "vide", "vide", "vide"]
    ];

    this.winnerAlignGrille.subscribe((grid) => {
      let i = 0;
      while (i < grid.length) {
        this.winnerAlign[i] = grid[i];
        i++;
      }
    });
    this.winnerAlign = grilleVide;
    this.winnerAlignGrille.remove();
    this.plateauenligne.update({ winnerAlignGrille: this.winnerAlign });
    let x = id;
    let y = 6;
    while (y >= 0) {
      if (this.grille[x][y] == 'vide') {
        this.grille[x][y] = this.joueurEnCours;
        this.plateauenligne.update({ plateauDeJeu: this.grille });
        this.plateauDeJeu.subscribe((grid) => {
          let i = 0;
          while (i < grid.length) {
            this.grille[i] = grid[i];
            i++;
          }
        });
        // on comptabilise le nombre de coups joués
        this.coupsJoués++;
        if (this.coupsJoués == 42) {
          this.anticlick = true;
          this.SFX_pion.src = "../../../assets/sounds/SFXdraw.mp3";
          this.SFX_pion.load();
          this.SFX_pion.play();
          // alert("Draw");
        }
        //on test si victoire verticale
        let xTest = x;
        let yTest = y;
        let align = 0;
        while (yTest <= (y + 3) && yTest <= 5) {
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

              this.anticlick = true;
              this.SFX_WIN.src = "../../../assets/sounds/SFX_WIN.mp3";
              this.SFX_WIN.load();
              this.SFX_WIN.play();
              console.log(this.joueurEnCours + " gagne Wouhouuuu");
              return;
            }
          } else {
            align = 0;
          };
          yTest++;
        }
        this.winnerAlignPre = grilleVide;
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

              this.anticlick = true;
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
        while (xTest > 0 && yTest < 5 && recule > 0) {
          xTest--;
          yTest++;
          recule--;
        }
        //on check la ligne diagonale
        while (xTest <= (x + 3) && xTest <= 6 && yTest >= (y - 3) && yTest >= 0) {
          if (this.grille[xTest][yTest] == this.joueurEnCours) {
            align = align + 1;
            if (align == 4) {
              this.anticlick = true;
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
        while (xTest <= (x + 3) && xTest <= 6 && yTest <= (y + 3) && yTest <= 5) {
          if (this.grille[xTest][yTest] == this.joueurEnCours) {
            align = align + 1;
            if (align == 4) {
              this.anticlick = true;
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
          this.plateauenligne.update({ auTourDe: this.joueurEnCours });
          this.auTourDe.subscribe((data) => {
            this.joueurEnCours = data.$value;
          });
          this.classGhost = "ghost" + this.joueurEnCours;


        } else {
          this.joueurEnCours = this.joueur1;
          this.plateauenligne.update({ auTourDe: this.joueurEnCours });
          this.auTourDe.subscribe((data) => {
            this.joueurEnCours = data.$value;
          });
          this.classGhost = "ghost" + this.joueurEnCours;
        }

        // On charge un bruit aléatoire de pose du pion
        let random = Math.floor(Math.random() * 3) + 1;
        this.SFX_pion.src = "../../../assets/sounds/SFXposePion" + random + ".mp3";
        this.SFX_pion.load();
        this.SFX_pion.play();
        return;
      } else {
        y--;
      };
    }
    alert("Full");
    return;
  }

}