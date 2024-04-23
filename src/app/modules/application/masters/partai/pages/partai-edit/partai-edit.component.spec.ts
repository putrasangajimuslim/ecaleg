import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartaiEditComponent } from './partai-edit.component';

describe('PartaiEditComponent', () => {
  let component: PartaiEditComponent;
  let fixture: ComponentFixture<PartaiEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartaiEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PartaiEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
