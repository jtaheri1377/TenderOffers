import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderContributeComponent } from './tender-contribute.component';

describe('TenderContributeComponent', () => {
  let component: TenderContributeComponent;
  let fixture: ComponentFixture<TenderContributeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TenderContributeComponent]
    });
    fixture = TestBed.createComponent(TenderContributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
