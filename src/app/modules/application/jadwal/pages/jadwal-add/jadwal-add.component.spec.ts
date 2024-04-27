import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JadwalAddComponent } from './jadwal-add.component';

describe('JadwalAddComponent', () => {
  let component: JadwalAddComponent;
  let fixture: ComponentFixture<JadwalAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JadwalAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JadwalAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
