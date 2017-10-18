import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameWoodComponent } from './gameWood.component';

describe('GameWoodComponent', () => {
  let component: GameWoodComponent;
  let fixture: ComponentFixture<GameWoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameWoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameWoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
