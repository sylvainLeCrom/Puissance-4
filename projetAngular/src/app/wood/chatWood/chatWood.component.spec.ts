import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatWoodComponent } from './chatWood.component';

describe('ChatWoodComponent', () => {
  let component: ChatWoodComponent;
  let fixture: ComponentFixture<ChatWoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatWoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatWoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
