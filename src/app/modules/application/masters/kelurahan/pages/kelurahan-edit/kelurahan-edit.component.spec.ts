import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KelurahanEditComponent } from './kelurahan-edit.component';

describe('KelurahanEditComponent', () => {
  let component: KelurahanEditComponent;
  let fixture: ComponentFixture<KelurahanEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KelurahanEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KelurahanEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
