import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalonAddComponent } from './calon-add.component';

describe('CalonAddComponent', () => {
  let component: CalonAddComponent;
  let fixture: ComponentFixture<CalonAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalonAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalonAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
