import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuaraListComponent } from './suara-list.component';

describe('SuaraListComponent', () => {
  let component: SuaraListComponent;
  let fixture: ComponentFixture<SuaraListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuaraListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuaraListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
