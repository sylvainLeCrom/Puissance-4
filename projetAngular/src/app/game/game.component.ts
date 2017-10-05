import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  public items: string[][];
  public couleurJoueur: string;
  constructor() {
    this.couleurJoueur = "jaune";
    this.items = [
      ["vide", "vide", "vide", "vide", "vide", "vide","ghost this.couleurJoueur"],
      ["vide", "vide", "vide", "vide", "vide", "vide", "ghost this.couleurJoueur"],
      ["vide", "vide", "vide", "vide", "vide", "vide", "ghost this.couleurJoueur"],
      ["vide", "vide", "vide", "vide", "vide", "vide", "ghost this.couleurJoueur"],
      ["vide", "vide", "vide", "vide", "vide", "vide", "ghost this.couleurJoueur"],
      ["vide", "vide", "vide", "vide", "vide", "vide", "ghost this.couleurJoueur"],
      ["vide", "vide", "vide", "vide", "vide", "vide", "ghost this.couleurJoueur"]
    ];
    this.items[4][0] = "jaune";
  }
  ngOnInit() {
  }
  onClick(event: Event) {
    
   
    alert("click sur colonne "+ event.target + " marche");
  }
}
