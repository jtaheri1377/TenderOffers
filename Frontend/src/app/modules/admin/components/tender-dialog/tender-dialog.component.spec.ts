import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderDialogComponent } from './tender-dialog.component';

describe('TenderDialogComponent', () => {
  let component: TenderDialogComponent;
  let fixture: ComponentFixture<TenderDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TenderDialogComponent]
    });
    fixture = TestBed.createComponent(TenderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
