import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenSharedComponent } from './absen-shared.component';

describe('AbsenSharedComponent', () => {
  let component: AbsenSharedComponent;
  let fixture: ComponentFixture<AbsenSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbsenSharedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AbsenSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
