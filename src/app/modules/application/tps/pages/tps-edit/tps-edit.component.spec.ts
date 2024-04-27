import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TpsEditComponent } from './tps-edit.component';

describe('TpsEditComponent', () => {
  let component: TpsEditComponent;
  let fixture: ComponentFixture<TpsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TpsEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TpsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
