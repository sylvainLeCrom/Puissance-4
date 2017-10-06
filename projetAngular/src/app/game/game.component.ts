import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';



@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  grille: FirebaseListObservable<any[]>;
  public items: string[][];
  send: string;
  public couleurJoueur: string;
  constructor(public af: AngularFireDatabase) {
    this.grille = af.list('/grille');
    this.couleurJoueur = "jaune";
    this.items = [
      ["vide", "vide", "vide", "vide", "vide", "vide", "ghost this.couleurJoueur"],
      ["vide", "vide", "vide", "vide", "vide", "vide", "ghost this.couleurJoueur"],
      ["vide", "vide", "vide", "vide", "vide", "vide", "ghost this.couleurJoueur"],
      ["vide", "vide", "vide", "vide", "vide", "vide", "ghost this.couleurJoueur"],
      ["vide", "vide", "vide", "vide", "vide", "vide", "ghost this.couleurJoueur"],
      ["vide", "vide", "vide", "vide", "vide", "vide", "ghost this.couleurJoueur"],
      ["vide", "vide", "vide", "vide", "vide", "vide", "ghost this.couleurJoueur"]
    ];
    this.items[4][0] = "jaune";
    this.send = this.items[4][2];
  }
  ngOnInit() {
    this.grille.remove();
    this.grille.push({ cases: this.items });
    //console.log({$key})
  }
  onClick(event: Event) {
    alert("click sur colonne " + event.target + " marche");
  }

}
