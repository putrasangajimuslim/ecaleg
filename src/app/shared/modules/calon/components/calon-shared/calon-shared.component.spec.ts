import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalonSharedComponent } from './calon-shared.component';

describe('CalonSharedComponent', () => {
  let component: CalonSharedComponent;
  let fixture: ComponentFixture<CalonSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalonSharedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalonSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
