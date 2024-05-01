import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenEditComponent } from './absen-edit.component';

describe('AbsenEditComponent', () => {
  let component: AbsenEditComponent;
  let fixture: ComponentFixture<AbsenEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbsenEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AbsenEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
