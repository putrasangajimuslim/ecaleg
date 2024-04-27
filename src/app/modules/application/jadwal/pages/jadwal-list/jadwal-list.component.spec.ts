import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JadwalListComponent } from './jadwal-list.component';

describe('JadwalListComponent', () => {
  let component: JadwalListComponent;
  let fixture: ComponentFixture<JadwalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JadwalListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JadwalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
