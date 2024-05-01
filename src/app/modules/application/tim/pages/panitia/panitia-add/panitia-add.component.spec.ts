import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanitiaAddComponent } from './panitia-add.component';

describe('PanitiaAddComponent', () => {
  let component: PanitiaAddComponent;
  let fixture: ComponentFixture<PanitiaAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanitiaAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PanitiaAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
