import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  public items: any[][];
  constructor() { 
    this.items = [
        ["vide","vide","vide","vide","vide","ghost"],
        ["vide","vide","vide","vide","vide","ghost"],
        ["vide","vide","vide","vide","vide","ghost"],
        ["vide","vide","vide","vide","vide","ghost"],
        ["vide","vide","vide","vide","vide","ghost"],
        ["vide","vide","vide","vide","vide","ghost"],
        ["vide","vide","vide","vide","vide","ghost"]];
  }
  ngOnInit() {
  }
}
