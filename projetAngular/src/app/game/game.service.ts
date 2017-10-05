import { Injectable } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GameService {
    plateau: number[][];
    valeur: number;
    couleur: string;

   /*x = event.target.parentElement.id; // n° de la colonne
    y = 6;

    posePion() {
            while (this.y > 0) {
              let position = this.x + "" + this.y;
              let Case = document.getElementById(position);
              let Etat = Case.className;
              if (Etat == "vide") {
                document.getElementById(Case.id).className = this.couleur;
                Etat = this.couleur;
        
                return;
              }
              else {
                this.y = this.y - 1;
              }
            }
            alert("colonne pleine");
          }

*/


}


