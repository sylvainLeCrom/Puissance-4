import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';



@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  user: Observable<firebase.User>;
  email: string;
  password: string;
  toto = false;
  public msgError: boolean;  

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase, public authService: AuthService) {    
    this.user = this.afAuth.authState;
    this.msgError = false;
  }
  loginFacebook() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }
  loginGoogle() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
  }

  
  signup() {
    this.authService.signup(this.email, this.password);
    this.email = this.password = '';
  }
  login() {
    this.authService.login(this.email, this.password, this.msgError);
    this.email = this.password = ''; 
    console.log(this.msgError)   
  }
  
}
