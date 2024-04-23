import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KecamatanAddComponent } from './kecamatan-add.component';

describe('KecamatanAddComponent', () => {
  let component: KecamatanAddComponent;
  let fixture: ComponentFixture<KecamatanAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KecamatanAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KecamatanAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
