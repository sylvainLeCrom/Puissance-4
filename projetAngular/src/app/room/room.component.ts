import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  auTourDe: any;  
  public userUID: any;
  public indexRoom: number;
  public IDJoueur: string;
  public couleurJoueur: string;
  public indexJoueur: number;
  public pseudo: string;
  public joueurEnCours: any;  
  public theme: string;  

  constructor(public af: AngularFireDatabase, private authService: AuthService) {


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
        this.theme = user.theme;        
        this.pseudo = user.pseudo;
        while (this.indexRoom == undefined) {
        }
        this.auTourDe = this.af.object('/'+this.theme+'/rooms/' + this.indexRoom + '/auTourDe');
        this.auTourDe.subscribe((data) => {
          this.joueurEnCours = data.$value;
        });
      }
      );
    });
  }

}
