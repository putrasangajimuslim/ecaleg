import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaksiListComponent } from './saksi-list.component';

describe('SaksiListComponent', () => {
  let component: SaksiListComponent;
  let fixture: ComponentFixture<SaksiListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaksiListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaksiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
