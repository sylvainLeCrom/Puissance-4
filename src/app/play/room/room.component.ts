import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../auth/auth.service';
import { GameService } from '../game.service';
import { RoomService } from '../room/room.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: [
    './room.component.css',
    './room.component.wood.css',
    './room.component.classic.css',
    './room.component.simpson.css'
  ]
})
export class RoomComponent implements OnInit {
  plateauenligne: FirebaseObjectObservable<any>;
  auTourDe: any;
  public userUID: any;
  public indexRoom: number;
  public IDJoueur: string;
  public couleurJoueur: string;
  public indexJoueur: number;
  public pseudo: string;
  public pseudoJoueur1: string;
  public pseudoJoueur2: string;
  public other: string;
  public joueurEnCours: any;


  constructor(public af: AngularFireDatabase,
    private authService: AuthService,
    public gameService: GameService,
    public afAuth: AngularFireAuth,
    private roomService: RoomService) {


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
        this.pseudo = user.pseudo;
        this.roomService.getPseudoGamers(this.indexRoom).subscribe((pseudos) => {
          this.pseudoJoueur1 = pseudos.pseudoJoueur1;
          this.pseudoJoueur2 = pseudos.pseudoJoueur2;
          if (this.pseudo == this.pseudoJoueur1) {
            this.other = this.pseudoJoueur2;
          } else {
            this.other = this.pseudoJoueur1;
          }
        });

        while (this.indexRoom == undefined) {
        }
        this.auTourDe = this.af.object('/game/rooms/' + this.indexRoom + '/auTourDe');
        this.auTourDe.subscribe((data) => {
          this.joueurEnCours = data.$value;
        });
      }
      );
    });
  }
  logout() {
    this.afAuth.auth.signOut();
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
          if (nbJoueurActual == 1) {
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

}
