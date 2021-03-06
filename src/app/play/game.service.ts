import { Injectable } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { SOUNDS } from './sounds';
import { Router } from '@angular/router';

@Injectable()



export class GameService {

    constructor(private router: Router) {

    }
    theme = "classic";
    

    // GESTION DES SONS
    getSounds() {
        return SOUNDS[this.theme];
    }

    playSound(src: string) {
        let sound = new Audio();
        sound.src = src;
        sound.load();
        sound.play();
    }

    playPionSound() {
        let sounds = this.getSounds().pion;
        console.log(sounds);
        let random = Math.floor(Math.random() * sounds.length);
        console.log(random);
        console.log(sounds[random]);

        this.playSound(sounds[random]);
    }

    playWinSound() {
        this.playSound(this.getSounds().win);
    }

    playDrawSound() {
        this.playSound(this.getSounds().draw);
    }

    playLooseSound() {
        this.playSound(this.getSounds().loose);
    }
    // navigation ROUTING
    goToRoomChoice() {
        this.router.navigateByUrl('/pseudo');
    }


    sendWinner(gagnant, joueurEnCours, plateauenligne, Dbgagne) {
        //on envoie le nom du gagnant
        gagnant = joueurEnCours;
        console.log(gagnant);
        plateauenligne.update({ gagnant: gagnant });
        Dbgagne.take(1).subscribe((data) => {
            gagnant = data.$value;
        });
    }
    changePlayer(joueur1, joueur2, joueurEnCours, auTourDe, plateauenligne, classGhost) {
        if (joueurEnCours == joueur1) {
            joueurEnCours = joueur2;
            plateauenligne.update({ auTourDe: joueurEnCours });
            auTourDe.take(1).subscribe((data) => {
                joueurEnCours = data.$value;
            });
            classGhost = "ghost" + joueurEnCours;

        } else {
            joueurEnCours = joueur1;
            plateauenligne.update({ auTourDe: joueurEnCours });
            auTourDe.take(1).subscribe((data) => {
                joueurEnCours = data.$value;
            });
            classGhost = "ghost" + joueurEnCours;
        }
    }

    
}