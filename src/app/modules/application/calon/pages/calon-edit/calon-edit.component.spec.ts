import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalonEditComponent } from './calon-edit.component';

describe('CalonEditComponent', () => {
  let component: CalonEditComponent;
  let fixture: ComponentFixture<CalonEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalonEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalonEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
