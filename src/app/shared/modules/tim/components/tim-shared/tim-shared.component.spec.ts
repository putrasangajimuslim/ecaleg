import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimSharedComponent } from './tim-shared.component';

describe('TimSharedComponent', () => {
  let component: TimSharedComponent;
  let fixture: ComponentFixture<TimSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimSharedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
