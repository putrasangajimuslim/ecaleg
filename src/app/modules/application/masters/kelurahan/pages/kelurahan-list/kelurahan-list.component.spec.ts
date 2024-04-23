import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KelurahanListComponent } from './kelurahan-list.component';

describe('KelurahanListComponent', () => {
  let component: KelurahanListComponent;
  let fixture: ComponentFixture<KelurahanListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KelurahanListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KelurahanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
