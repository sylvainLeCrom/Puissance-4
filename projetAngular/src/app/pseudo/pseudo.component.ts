import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-pseudo',
  templateUrl: './pseudo.component.html',
  styleUrls: ['./pseudo.component.css']
})
export class PseudoComponent implements OnInit {

  public maxJoueur: number;
  public nbJoueur: number;
  public numeroRoom: number;
  public pseudo: string;
  public gamers: FirebaseObjectObservable<any[]>;
  public gamer: any;
  public joueur1: string;
  public joueur2: string;
  public couleur: string;
  public userUID: any;
  public theme: string;

  constructor(private router: Router, public af: AngularFireDatabase, private authService: AuthService, public afAuth: AngularFireAuth) {
    this.maxJoueur = 2;
    this.nbJoueur = 0;
    this.pseudo = '';
    this.joueur1 = "rouge";
    this.joueur2 = "jaune";
    this.theme = "classic";

  };
  ngOnInit() {
    this.authService.authState.subscribe((userAuth) => {
      this.userUID = userAuth.uid;
      const userPath = "users/" + this.userUID;
      this.af.object(userPath).subscribe((user) => {
        this.pseudo = user.pseudo;
      });
    });
    this.nbJoueur = 0;
  };
  themeInf() {
    if (this.theme == "classic") {
      this.theme = "wood"
    } else {
      this.theme = "classic"
    }
  }

  themeSup() {
    if (this.theme == "classic") {
      this.theme = "wood"
    } else {
      this.theme = "classic"
    }
  }
  logout() {
    this.afAuth.auth.signOut();
  }
  redirectToRoom(input) {
    this.af.object("/" + this.theme + "/rooms").take(1).subscribe((rooms) => {

      this.af.object('/' + this.theme)
        .take(1)
        .subscribe((themeRooms) => {
          let nbRoom = themeRooms.numberOpenRoom;
          console.log(nbRoom);

          if (nbRoom == 0) {
            console.log("FIRST");
            //on crée la première room
            nbRoom = 1;
            this.numeroRoom = new Date().valueOf();
            this.af.object("/" + this.theme + "/").set({ numberOpenRoom: nbRoom, rooms: this.numeroRoom });
            //on tire au sort le numéro et la couleur du premier Gamer dans la room
            let random = Math.floor(Math.random() * 2) + 1;
            if (random == 1) {
              this.couleur = this.joueur1;
            } else {
              this.couleur = this.joueur2;
            }
            //on change le nb de joueur dans la room
            this.nbJoueur = 1;
            this.af.object("/" + this.theme + "/rooms/0").set({ room: this.numeroRoom, nbJoueur: this.nbJoueur, placement: random });
            //on récupère les infos du tout premier joueur      
            this.pseudo = input;
            let ID = Math.floor(Math.random() * 100) + 1;
            this.gamers = this.af.object("/" + this.theme + "/rooms/0/gamers/joueur" + random);
            this.gamer = { IDduJoueur: this.pseudo + ID, pseudo: this.pseudo, couleur: this.couleur, index: ID };
            this.gamers.set(this.gamer);

            this.af.object("users/" + this.userUID).update({ indexRoom: 0, theme: this.theme, IDduJoueur: this.pseudo + ID, pseudo: this.pseudo, couleur: this.couleur, index: ID });
            if (this.theme == "wood") {
              this.router.navigateByUrl('/roomWood');
            } else {
              this.router.navigateByUrl('/room');
            }

          } else {
            let index = 0
            while (index < nbRoom) {
              if (rooms[index].nbJoueur == 1) {
                this.nbJoueur = 2;
                this.af.object("/" + this.theme + "/rooms/" + index).update({ nbJoueur: this.nbJoueur });

                //on récupère les infos du deuxième joueur dans cette room    
                this.pseudo = input;
                let ID = Math.floor(Math.random() * 100) + 1;
                if (rooms[index].placement == 1) {
                  var lastplace = 2;
                  this.couleur = this.joueur2;
                } else {
                  lastplace = 1;
                  this.couleur = this.joueur1;
                }
                this.af.object("/" + this.theme + "/rooms/" + index).update({ placement: "full" })

                this.gamers = this.af.object("/" + this.theme + "/rooms/" + index + "/gamers/joueur" + lastplace);
                this.gamer = { IDduJoueur: this.pseudo + ID, pseudo: this.pseudo, couleur: this.couleur, index: ID };
                this.gamers.set(this.gamer);
                this.af.object("users/" + this.userUID).update({ indexRoom: index, theme: this.theme, IDduJoueur: this.pseudo + ID, pseudo: this.pseudo, couleur: this.couleur, index: ID });
                if (this.theme == "wood") {
                  this.router.navigateByUrl('/roomWood');
                } else {
                  this.router.navigateByUrl('/room');
                }
                return;
              } else {
                console.log("cette room est pleine" + index);
              }
              index++;
            }
            nbRoom++;
            this.numeroRoom = new Date().valueOf();
            console.log(rooms);
            rooms.push("room" + this.numeroRoom);
            this.af.object("/" + this.theme + "/").update({ numberOpenRoom: nbRoom });

            //on tire au sort le numéro et la couleur du premier Gamer dans la room
            let random = Math.floor(Math.random() * 2) + 1;
            if (random == 1) {
              this.couleur = this.joueur1;
            } else {
              this.couleur = this.joueur2;
            }
            //on change le nb de joueur dans la room
            this.nbJoueur = 1;
            this.af.object("/" + this.theme + "/rooms/" + index).set({ room: this.numeroRoom, nbJoueur: this.nbJoueur, placement: random });
            //on récupère les infos du joueur      
            this.pseudo = input;
            let ID = Math.floor(Math.random() * 100) + 1;
            this.gamers = this.af.object("/" + this.theme + "/rooms/" + index + "/gamers/joueur" + random);
            this.gamer = { IDduJoueur: this.pseudo + ID, pseudo: this.pseudo, couleur: this.couleur, index: ID };
            this.gamers.set(this.gamer);

            this.af.object("users/" + this.userUID).update({ indexRoom: index, theme: this.theme, IDduJoueur: this.pseudo + ID, pseudo: this.pseudo, couleur: this.couleur, index: ID });
            if (this.theme == "wood") {
              this.router.navigateByUrl('/roomWood');
            } else {
              this.router.navigateByUrl('/room');
            } return;
          }
        });
    });
  }
}


