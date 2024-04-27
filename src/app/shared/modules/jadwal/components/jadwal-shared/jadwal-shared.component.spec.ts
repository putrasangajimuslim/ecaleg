import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JadwalSharedComponent } from './jadwal-shared.component';

describe('JadwalSharedComponent', () => {
  let component: JadwalSharedComponent;
  let fixture: ComponentFixture<JadwalSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JadwalSharedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JadwalSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
