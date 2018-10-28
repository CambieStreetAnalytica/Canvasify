import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarExpSummaryComponent } from './avatar-exp-summary.component';

describe('AvatarExpSummaryComponent', () => {
  let component: AvatarExpSummaryComponent;
  let fixture: ComponentFixture<AvatarExpSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvatarExpSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarExpSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
