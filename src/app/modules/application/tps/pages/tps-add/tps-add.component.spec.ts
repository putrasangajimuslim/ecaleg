import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TpsAddComponent } from './tps-add.component';

describe('TpsAddComponent', () => {
  let component: TpsAddComponent;
  let fixture: ComponentFixture<TpsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TpsAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TpsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
