import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarItemComponent } from './side-bar-item.component';

describe('SideBarItemComponent', () => {
  let component: SideBarItemComponent;
  let fixture: ComponentFixture<SideBarItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SideBarItemComponent]
    });
    fixture = TestBed.createComponent(SideBarItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
