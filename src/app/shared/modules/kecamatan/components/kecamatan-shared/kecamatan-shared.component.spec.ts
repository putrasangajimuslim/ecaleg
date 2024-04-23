import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KecamatanSharedComponent } from './kecamatan-shared.component';

describe('KecamatanSharedComponent', () => {
  let component: KecamatanSharedComponent;
  let fixture: ComponentFixture<KecamatanSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KecamatanSharedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KecamatanSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
