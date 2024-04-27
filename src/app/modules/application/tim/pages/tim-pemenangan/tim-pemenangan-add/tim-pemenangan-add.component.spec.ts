import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimPemenanganAddComponent } from './tim-pemenangan-add.component';

describe('TimPemenanganAddComponent', () => {
  let component: TimPemenanganAddComponent;
  let fixture: ComponentFixture<TimPemenanganAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimPemenanganAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimPemenanganAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
