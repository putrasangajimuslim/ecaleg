import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KelurahanSharedComponent } from './kelurahan-shared.component';

describe('KelurahanSharedComponent', () => {
  let component: KelurahanSharedComponent;
  let fixture: ComponentFixture<KelurahanSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KelurahanSharedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KelurahanSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
