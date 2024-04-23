import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KecamatanListComponent } from './kecamatan-list.component';

describe('KecamatanListComponent', () => {
  let component: KecamatanListComponent;
  let fixture: ComponentFixture<KecamatanListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KecamatanListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KecamatanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
