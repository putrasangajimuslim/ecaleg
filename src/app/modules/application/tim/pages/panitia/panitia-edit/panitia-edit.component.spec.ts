import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanitiaEditComponent } from './panitia-edit.component';

describe('PanitiaEditComponent', () => {
  let component: PanitiaEditComponent;
  let fixture: ComponentFixture<PanitiaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanitiaEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PanitiaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
