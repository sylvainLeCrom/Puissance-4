import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { AuthService } from '../auth/auth.service';
import { PseudoComponent} from '../pseudo/pseudo.component';


@Component({
  selector: 'zone-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent{
  user: Observable<firebase.User>;
  items: FirebaseListObservable<any[]>;
  msgVal: string = '';  
  userName : string = '';

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase) {    
    this.items = af.list('/messages', {
      query: {
        orderByChild : 'reverseDate'
      }
    });
    this.items.remove();        
    this.user = this.afAuth.authState;
  }
  Send(desc: string) {
    const date = Date.now();
    let reverseDate = 0 - date;
    this.items.push({ reverseDate, message: desc });
    this.msgVal = '';
  }
  
}
