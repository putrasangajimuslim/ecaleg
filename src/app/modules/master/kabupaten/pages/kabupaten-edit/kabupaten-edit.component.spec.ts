import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KabupatenEditComponent } from './kabupaten-edit.component';

describe('KabupatenEditComponent', () => {
  let component: KabupatenEditComponent;
  let fixture: ComponentFixture<KabupatenEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KabupatenEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KabupatenEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
