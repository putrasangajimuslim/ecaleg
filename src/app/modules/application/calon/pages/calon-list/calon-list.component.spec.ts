import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalonListComponent } from './calon-list.component';

describe('CalonListComponent', () => {
  let component: CalonListComponent;
  let fixture: ComponentFixture<CalonListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalonListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
