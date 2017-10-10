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
  pseudo: string;
  IDroom: FirebaseObjectObservable<any>;
  nbRoom: number;
  gamers: FirebaseObjectObservable<any[]>;
  gamer: any;
  public joueur1: string;
  public joueur2: string;
  public couleur: string;

  constructor(public af: AngularFireDatabase) {

    this.maxJoueur = 2;
    this.nbJoueur = 0;
    this.IDroom = af.object('numberOpenRoom', { preserveSnapshot: true });
    this.pseudo = '';
    this.joueur1 = "rouge";
    this.joueur2 = "jaune";


  };
  ngOnInit() {
    this.IDroom.subscribe(snapshot => {
      console.log(snapshot.val());
      this.nbRoom = snapshot.val();
      console.log(this.nbRoom);
    })
  };

  envoi(input) {
    console.log(this.nbRoom);
    
    if (this.nbRoom == 0) {
      this.nbRoom = 1;
    } else if(this.nbRoom != 0){
      this.nbRoom++;
    }else{
      console.log("il y a " + this.nbRoom + " rooms ouvertes")
    }

    let random = Math.floor(Math.random() * 2) + 1;

    this.gamers = this.af.object('room' + this.nbRoom + '/gamers/joueur' + random);

    this.pseudo = input;
    let ID = Math.floor(Math.random() * 100) + 1;
    random = Math.floor(Math.random() * 2) + 1;
    if (random == 1) {
      this.couleur = this.joueur1;
    } else {
      this.couleur = this.joueur2;
    }

    this.gamer = [this.pseudo + ID, this.pseudo, this.couleur, ID];
    console.log(this.gamer);
    this.gamers.set({ ID: this.gamer });
    
  }

}
