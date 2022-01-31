import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerModuleComponent } from './player-module.component';

describe('PlayerModuleComponent', () => {
  let component: PlayerModuleComponent;
  let fixture: ComponentFixture<PlayerModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerModuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
