import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';


@Injectable()
export class RoomService {

  constructor(public af: AngularFireDatabase) { }

  getPseudoGamers(indexRoom: number) {
    return this.af.object('game/rooms/' + indexRoom + '/gamers/').take(1).map((data) => {
      let pseudos = {
        pseudoJoueur1: data.joueur1.pseudo,
        pseudoJoueur2: data.joueur2.pseudo
      };
      return pseudos;
    });
  }
}
