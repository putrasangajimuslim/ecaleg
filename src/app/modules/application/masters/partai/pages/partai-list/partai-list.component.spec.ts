import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartaiListComponent } from './partai-list.component';

describe('PartaiListComponent', () => {
  let component: PartaiListComponent;
  let fixture: ComponentFixture<PartaiListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartaiListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PartaiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
