import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-pseudo',
  templateUrl: './pseudo.component.html',
  styleUrls: ['./pseudo.component.css']
})
export class PseudoComponent implements OnInit {

  maxJoueur: number;
  nbJoueur: number;
  numeroRoom: number;
  pseudo: string;
  TotalRoom: FirebaseObjectObservable<any>;
  nbRoom: number;
  gamers: FirebaseObjectObservable<any[]>;
  gamer: any;
  public joueur1: string;
  public joueur2: string;
  public couleur: string;

  constructor(public af: AngularFireDatabase) {

    this.maxJoueur = 2;
    this.nbJoueur = 0;
    this.TotalRoom = af.object('numberOpenRoom', { preserveSnapshot: true });
    this.pseudo = '';
    this.joueur1 = "rouge";
    this.joueur2 = "jaune";


  };
  ngOnInit() {
    this.nbJoueur = 0;
    this.TotalRoom.subscribe(snapshot => {
      this.nbRoom = snapshot.val();
    })
  };

  envoi(input) {

    if (this.nbRoom == 0) {

      //on crée la room 1
      this.nbRoom = 1;
      this.numeroRoom = 1;
      this.af.object("/").set({ numberOpenRoom: this.nbRoom });

      let random = Math.floor(Math.random() * 2) + 1;
      if (random == 1) {
        this.couleur = this.joueur1;
      } else {
        this.couleur = this.joueur2;
      }
      this.gamers = this.af.object('room' + this.numeroRoom + '/gamers/joueur' + random);
      //this.af.object("room" + this.numeroRoom).set({ numeroRoom: this.numeroRoom });

      //on change le nb de joueur dans la room
      this.nbJoueur++;
      this.af.object("room" + this.numeroRoom).set({ nbJoueur: this.nbJoueur, numeroRoom: this.numeroRoom });

      this.pseudo = input;
      let ID = Math.floor(Math.random() * 100) + 1;


      this.gamer = [this.pseudo + ID, this.pseudo, this.couleur, ID];
      this.gamers.set({ ID: this.gamer });

    } else {
      let index = 1;
      while (index <= this.nbRoom) {
        this.af.object("room" + index).subscribe(data => {
          console.log(index);
          console.log(data);
          if (data) {
            console.log("la room " + index + " existe");

          } else {
            console.log("la room n° " + index + " n'existe pas");
          }
        })


        //        this.af.object("room" + this.numeroRoom).update({ nbJoueur: 2 });

        index++;
      }

    }



  }

}
