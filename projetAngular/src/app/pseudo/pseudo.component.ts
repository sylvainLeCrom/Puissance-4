import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-pseudo',
  templateUrl: './pseudo.component.html',
  styleUrls: ['./pseudo.component.css']
})
export class PseudoComponent implements OnInit {

  public maxJoueur: number;
  public nbJoueur: number;
  public roomsArray: any;
  public numeroRoom: number;
  public pseudo: string;
  public TotalRoom: FirebaseObjectObservable<any>;
  public nbRoom: number;
  public gamers: FirebaseObjectObservable<any[]>;
  public gamer: any;
  public joueur1: string;
  public joueur2: string;
  public couleur: string;
  public userUID: any;
  constructor(public af: AngularFireDatabase, private authService: AuthService) {
    this.maxJoueur = 2;
    this.nbJoueur = 0;
    this.TotalRoom = af.object('numberOpenRoom', { preserveSnapshot: true });
    this.pseudo = '';
    this.joueur1 = "rouge";
    this.joueur2 = "jaune";
    this.roomsArray;

  };
  ngOnInit() {
    this.authService.authState.subscribe((userAuth) => {
      this.userUID = userAuth.uid;
    });

    this.nbJoueur = 0;
    this.TotalRoom.subscribe(snapshot => {
      this.nbRoom = snapshot.val();
    });
    this.af.object("rooms").subscribe((rooms) => {
      this.roomsArray = rooms;
    });
  };




  envoi(input) {

    if (this.nbRoom == 0) {
      //on crée la première room
      this.nbRoom = 1;
      this.numeroRoom = new Date().valueOf();
      this.af.object("/").set({ numberOpenRoom: this.nbRoom, rooms: this.numeroRoom });
      //on tire au sort le numéro et la couleur du premier Gamer dans la room
      let random = Math.floor(Math.random() * 2) + 1;
      if (random == 1) {
        this.couleur = this.joueur1;
      } else {
        this.couleur = this.joueur2;
      }
      //on change le nb de joueur dans la room
      this.nbJoueur = 1;
      this.af.object("rooms/0").set({ room: this.numeroRoom, nbJoueur: this.nbJoueur, placement: random });
      //on récupère les infos du tout premier joueur      
      this.pseudo = input;
      let ID = Math.floor(Math.random() * 100) + 1;
      this.gamers = this.af.object('rooms/0/gamers/joueur' + random);
      this.gamer = { IDduJoueur: this.pseudo + ID, pseudo: this.pseudo, couleur: this.couleur, index: ID };
      this.gamers.set(this.gamer);

      this.af.object("users/" + this.userUID).set({ indexRoom: 0, IDduJoueur: this.pseudo + ID, pseudo: this.pseudo, couleur: this.couleur, index: ID });
    } else {
      let index = 0
      while (index <= this.nbRoom) {
        if (this.roomsArray[index].nbJoueur == 1) {
          this.nbJoueur = 2;
          this.af.object("rooms/" + index).update({ nbJoueur: this.nbJoueur });
          //on récupère les infos du deuxième joueur dans cette room    
          this.pseudo = input;
          let ID = Math.floor(Math.random() * 100) + 1;
          if (this.roomsArray[index].placement == 1) {
            var lastplace = 2;
            this.couleur = this.joueur2;
          } else {
            lastplace = 1;
            this.couleur = this.joueur1;
          }
          this.af.object("rooms/" + index).update({ placement: "full" })

          this.gamers = this.af.object("rooms/" + index + "/gamers/joueur" + lastplace);
          this.gamer = { IDduJoueur: this.pseudo + ID, pseudo: this.pseudo, couleur: this.couleur, index: ID };
          this.gamers.set(this.gamer);
          console.log("cette room est pleine");
          this.af.object("users/" + this.userUID).set({ indexRoom: 0, IDduJoueur: this.pseudo + ID, pseudo: this.pseudo, couleur: this.couleur, index: ID });
          return;
        } else {
          /*
          this.nbRoom++;
          this.numeroRoom = new Date().valueOf();
          this.roomsArray.push("room" + this.numeroRoom);
          this.af.object("/").update({ numberOpenRoom: this.nbRoom });
          index++;
          //on tire au sort le numéro et la couleur du premier Gamer dans la room
          let random = Math.floor(Math.random() * 2) + 1;
          if (random == 1) {
            this.couleur = this.joueur1;
          } else {
            this.couleur = this.joueur2;
          }
          //on change le nb de joueur dans la room
          this.nbJoueur = 1;
          this.af.object("rooms/" + index).set([this.numeroRoom, this.nbJoueur, random]);
          //on récupère les infos du joueur      
          this.pseudo = input;
          let ID = Math.floor(Math.random() * 100) + 1;
          this.gamers = this.af.object('rooms/0/' + index + '/gamers/joueur' + random);
          this.gamer = [this.pseudo + ID, this.pseudo, this.couleur, ID];
          this.gamers.set([this.gamer]);
          console.log(index);
          index++;
          console.log(index);
          */

        }

      }

      return;
    }
    return;
  }

}
