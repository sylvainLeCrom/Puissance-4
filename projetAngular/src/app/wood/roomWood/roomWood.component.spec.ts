import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomWoodComponent } from './roomWood.component';

describe('RoomWoodComponent', () => {
  let component: RoomWoodComponent;
  let fixture: ComponentFixture<RoomWoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomWoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomWoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
