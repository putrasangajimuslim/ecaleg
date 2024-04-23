import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KabupatenSharedComponent } from './kabupaten-shared.component';

describe('KabupatenSharedComponent', () => {
  let component: KabupatenSharedComponent;
  let fixture: ComponentFixture<KabupatenSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KabupatenSharedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KabupatenSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
