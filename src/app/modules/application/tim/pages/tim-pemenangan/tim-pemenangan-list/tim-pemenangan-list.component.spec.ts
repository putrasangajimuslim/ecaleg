import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimPemenanganListComponent } from './tim-pemenangan-list.component';

describe('TimPemenanganListComponent', () => {
  let component: TimPemenanganListComponent;
  let fixture: ComponentFixture<TimPemenanganListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimPemenanganListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimPemenanganListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
