import { Injectable } from '@angular/core';
//import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AuthService {
    private authState: Observable<firebase.User>
    private currentUser: firebase.User = null;
    constructor(public afAuth: AngularFireAuth) {
        this.authState = this.afAuth.authState;
        this.authState.subscribe(user => {
            if (user) {
                this.currentUser = user;
            } else {
                this.currentUser = null;
            }
        });
    }
    getAuthState() {
        return this.authState;
    }

    loginFacebook() {
        this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .catch(function (error){
          alert('${error.message} Please try again')
        })
      }
    loginGoogle() {
        this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
          .catch(function (error){
          alert('${error.message} Please try again')
        })
      }
    isLoggedIn() {
        if (this.currentUser == null) {
            return false;
        }
        return true;
    }
    
}



