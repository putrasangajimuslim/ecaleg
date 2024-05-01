import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuaraAddComponent } from './suara-add.component';

describe('SuaraAddComponent', () => {
  let component: SuaraAddComponent;
  let fixture: ComponentFixture<SuaraAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuaraAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuaraAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
