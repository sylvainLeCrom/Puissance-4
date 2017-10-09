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
export class PseudoComponent{

  pseudo: string;
  IDgame: number;
  gamers: FirebaseObjectObservable<any[]>;
  gamer: any;
  public joueur1: string;
  public joueur2: string;
  public couleur: string;

  constructor(public af: AngularFireDatabase) { 

  this.pseudo='';
  this.joueur1 = "rouge";
  this.joueur2 = "jaune";
  let random = Math.floor(Math.random() * 2) + 1;  
  this.gamers = af.object('room/gamers/joueur'+random);  
  
    
  }

  envoi(input) {

    this.pseudo = input;
    let ID = Math.floor(Math.random() * 100) + 1;    
    let random = Math.floor(Math.random() * 2) + 1;
    if (random==1){
      this.couleur = this.joueur1;
    } else{
      this.couleur = this.joueur2;
    }
    
  
    this.gamer = [this.pseudo + ID,this.pseudo, this.couleur, ID];
    console.log(this.gamer);
    this.gamers.set({ ID: this.gamer });
  }

}
