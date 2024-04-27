import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaksiAddComponent } from './saksi-add.component';

describe('SaksiAddComponent', () => {
  let component: SaksiAddComponent;
  let fixture: ComponentFixture<SaksiAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaksiAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaksiAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
