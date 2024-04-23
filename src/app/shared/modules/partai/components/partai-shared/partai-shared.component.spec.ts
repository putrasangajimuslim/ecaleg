import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartaiSharedComponent } from './partai-shared.component';

describe('PartaiSharedComponent', () => {
  let component: PartaiSharedComponent;
  let fixture: ComponentFixture<PartaiSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartaiSharedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PartaiSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
