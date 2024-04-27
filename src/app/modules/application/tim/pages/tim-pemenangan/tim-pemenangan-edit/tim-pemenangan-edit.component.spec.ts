import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimPemenanganEditComponent } from './tim-pemenangan-edit.component';

describe('TimPemenanganEditComponent', () => {
  let component: TimPemenanganEditComponent;
  let fixture: ComponentFixture<TimPemenanganEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimPemenanganEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimPemenanganEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
