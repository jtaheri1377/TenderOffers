import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderItemComponent } from './tender-item.component';

describe('TenderItemComponent', () => {
  let component: TenderItemComponent;
  let fixture: ComponentFixture<TenderItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TenderItemComponent]
    });
    fixture = TestBed.createComponent(TenderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
