import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaksiEditComponent } from './saksi-edit.component';

describe('SaksiEditComponent', () => {
  let component: SaksiEditComponent;
  let fixture: ComponentFixture<SaksiEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaksiEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaksiEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
