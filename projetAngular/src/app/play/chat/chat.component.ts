import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { AuthService } from '../../auth/auth.service';
import { GameService } from '../game.service';
import { PseudoComponent } from '../../pseudo/pseudo.component';


@Component({
  selector: 'zone-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  user: Observable<firebase.User>;
  items: FirebaseListObservable<any[]>;
  msgVal: string = '';
  userName: string = '';

  public userUID: any;
  public indexRoom: number;
  public IDJoueur: string;
  public couleurJoueur: string;
  public indexJoueur: number;
  public pseudo: string;

  constructor(public afAuth: AngularFireAuth,
    public af: AngularFireDatabase,
    private authService: AuthService,
    private gameService: GameService) {

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
        while (this.indexRoom == undefined) {
        }
        this.items = this.af.list('/' + this.gameService.theme + '/rooms/' + this.indexRoom + '/messages', {
          query: {
            orderByChild: 'reverseDate'
          }
        });
        this.items.remove();
        this.user = this.afAuth.authState;
      });
    });

  }
  Send(desc: string) {
    const date = Date.now();
    let reverseDate = 0 - date;
    let joueur = this.couleurJoueur;
    console.log(joueur);
    this.af.list('/' + this.gameService.theme + '/rooms/' + this.indexRoom + '/messages').push({ joueur, reverseDate, message: desc });
    this.msgVal = '';
  }

}
