import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributorItemComponent } from './contributor-item.component';

describe('ContributorItemComponent', () => {
  let component: ContributorItemComponent;
  let fixture: ComponentFixture<ContributorItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContributorItemComponent]
    });
    fixture = TestBed.createComponent(ContributorItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
