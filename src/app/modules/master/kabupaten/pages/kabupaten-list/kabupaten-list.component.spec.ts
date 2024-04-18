import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KabupatenListComponent } from './kabupaten-list.component';

describe('KabupatenListComponent', () => {
  let component: KabupatenListComponent;
  let fixture: ComponentFixture<KabupatenListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KabupatenListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KabupatenListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
