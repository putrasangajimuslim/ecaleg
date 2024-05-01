import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuaraSharedComponent } from './suara-shared.component';

describe('SuaraSharedComponent', () => {
  let component: SuaraSharedComponent;
  let fixture: ComponentFixture<SuaraSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuaraSharedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuaraSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
