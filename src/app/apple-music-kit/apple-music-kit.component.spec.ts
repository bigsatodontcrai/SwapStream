import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppleMusicKitComponent } from './apple-music-kit.component';

describe('AppleMusicKitComponent', () => {
  let component: AppleMusicKitComponent;
  let fixture: ComponentFixture<AppleMusicKitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppleMusicKitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppleMusicKitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
