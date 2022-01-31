import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamingAPIComponent } from './streaming-api.component';

describe('StreamingAPIComponent', () => {
  let component: StreamingAPIComponent;
  let fixture: ComponentFixture<StreamingAPIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamingAPIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamingAPIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
