import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KabupatenAddComponent } from './kabupaten-add.component';

describe('KabupatenAddComponent', () => {
  let component: KabupatenAddComponent;
  let fixture: ComponentFixture<KabupatenAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KabupatenAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KabupatenAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
