import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuaraEditComponent } from './suara-edit.component';

describe('SuaraEditComponent', () => {
  let component: SuaraEditComponent;
  let fixture: ComponentFixture<SuaraEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuaraEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuaraEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
