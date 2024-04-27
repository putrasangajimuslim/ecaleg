import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TpsListComponent } from './tps-list.component';

describe('TpsListComponent', () => {
  let component: TpsListComponent;
  let fixture: ComponentFixture<TpsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TpsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TpsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
