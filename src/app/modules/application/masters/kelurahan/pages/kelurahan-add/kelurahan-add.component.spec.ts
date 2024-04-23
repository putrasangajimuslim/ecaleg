import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KelurahanAddComponent } from './kelurahan-add.component';

describe('KelurahanAddComponent', () => {
  let component: KelurahanAddComponent;
  let fixture: ComponentFixture<KelurahanAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KelurahanAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KelurahanAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
