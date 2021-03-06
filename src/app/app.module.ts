import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { ChatComponent } from './play/chat/chat.component';
import { AuthComponent } from './auth/auth.component';
import { GameService } from './play/game.service';
import { GameCalcWinService } from './play/gameCalcWin.service';
import { RoomService } from './play/room/room.service';
 
import { appRoutes } from './app-routing';
import { AngularFireModule } from 'angularfire2';
// New imports to update based on AngularFire2 version 4
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { GameComponent } from './play/game/game.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './auth/auth.service'
import { NgPipesModule } from 'ngx-pipes';
import { RoomComponent } from './play/room/room.component';

import { PseudoComponent } from './pseudo/pseudo.component';
import { LoginComponent } from './login/login.component';

export const firebaseConfig = {
  apiKey: "AIzaSyCqkzOS8R5k6y6NZ3YKdQdj14iMO7Uvkq8",
  authDomain: "wcs-puissance-4.firebaseapp.com",
  databaseURL: "https://wcs-puissance-4.firebaseio.com",
  projectId: "wcs-puissance-4",
  storageBucket: "wcs-puissance-4.appspot.com",
  messagingSenderId: "899774202606"
};



@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    AuthComponent,
    GameComponent,
    RoomComponent,
    PseudoComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
    NgPipesModule,
  ],
  providers: [AuthService, GameService, GameCalcWinService, RoomService],
  bootstrap: [AppComponent]
})
export class AppModule { }


