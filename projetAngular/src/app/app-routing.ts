import { Routes } from '@angular/router';

import { RoomComponent } from './room/room.component';
//import { ChatComponent } from './chat/chat.component';

export const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/app'
        , pathMatch: 'full'
    },
    {
        path: 'game',
        component: RoomComponent
    },
    


    /*{
        path: '',
        redirectTo: '/app',
        pathMatch: 'full'
    },
    {
        path: '',
        redirectTo: 'app-game',
        component: GameComponent,
            
    },*/

];