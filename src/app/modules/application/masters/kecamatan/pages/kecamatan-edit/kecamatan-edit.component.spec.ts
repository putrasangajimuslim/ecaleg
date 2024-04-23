import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KecamatanEditComponent } from './kecamatan-edit.component';

describe('KecamatanEditComponent', () => {
  let component: KecamatanEditComponent;
  let fixture: ComponentFixture<KecamatanEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KecamatanEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KecamatanEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
