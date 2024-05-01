import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenListComponent } from './absen-list.component';

describe('AbsenListComponent', () => {
  let component: AbsenListComponent;
  let fixture: ComponentFixture<AbsenListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbsenListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AbsenListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
