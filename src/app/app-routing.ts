import { Routes } from '@angular/router';

import { PseudoComponent } from './pseudo/pseudo.component';
import { RoomComponent } from './play/room/room.component';
import { LoginComponent } from './login/login.component';

export const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: "full"
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'room',
        component: RoomComponent
    },
    {
        path: 'pseudo',
        component: PseudoComponent
    },
];