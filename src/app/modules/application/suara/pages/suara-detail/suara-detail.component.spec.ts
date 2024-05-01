import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuaraDetailComponent } from './suara-detail.component';

describe('SuaraDetailComponent', () => {
  let component: SuaraDetailComponent;
  let fixture: ComponentFixture<SuaraDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuaraDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuaraDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
