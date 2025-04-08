import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceMarkComponent } from './attendance-mark.component';

describe('AttendanceMarkComponent', () => {
  let component: AttendanceMarkComponent;
  let fixture: ComponentFixture<AttendanceMarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanceMarkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceMarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
