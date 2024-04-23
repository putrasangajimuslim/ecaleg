import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartaiAddComponent } from './partai-add.component';

describe('PartaiAddComponent', () => {
  let component: PartaiAddComponent;
  let fixture: ComponentFixture<PartaiAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartaiAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PartaiAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
