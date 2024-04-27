import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TpsSharedComponent } from './tps-shared.component';

describe('TpsSharedComponent', () => {
  let component: TpsSharedComponent;
  let fixture: ComponentFixture<TpsSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TpsSharedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TpsSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
