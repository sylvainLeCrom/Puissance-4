import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class AuthService {
  public authState: Observable<firebase.User>
  public currentUser: firebase.User = null;

  constructor(public afAuth: AngularFireAuth, private afDB: AngularFireDatabase, private router: Router) {
    this.authState = this.afAuth.authState;
    this.authState.subscribe(user => {
      if (user) {
        this.afDB.object("users/" + user.uid).update({ email: user.email, name: user.displayName });
        this.currentUser = user;
        this.router.navigate(['pseudo']);
      } else {
        this.currentUser = null;
        this.router.navigate(['login']);
      }
    });
  }

  getAuthState() {
    return this.authState;
  }


  signup(email: string, password: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  login(email: string, password: string, msgError:boolean) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!');
      })
      .catch(err => {
        alert("oulalala tu es qui toi ?");
        console.log('Something went wrong:', err.message);
      });
  }

  logout() {
    this.afAuth.auth
      .signOut();
  }




  loginFacebook() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .catch(function (error) {
        alert('${error.message} Please try again')
      })
  }
  loginGoogle() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .catch(function (error) {
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



