import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenAddComponent } from './absen-add.component';

describe('AbsenAddComponent', () => {
  let component: AbsenAddComponent;
  let fixture: ComponentFixture<AbsenAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbsenAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AbsenAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
