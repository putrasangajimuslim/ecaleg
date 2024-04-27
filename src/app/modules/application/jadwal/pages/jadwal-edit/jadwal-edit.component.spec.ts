import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JadwalEditComponent } from './jadwal-edit.component';

describe('JadwalEditComponent', () => {
  let component: JadwalEditComponent;
  let fixture: ComponentFixture<JadwalEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JadwalEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JadwalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
