import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarStatSummaryComponent } from './avatar-stat-summary.component';

describe('AvatarStatSummaryComponent', () => {
  let component: AvatarStatSummaryComponent;
  let fixture: ComponentFixture<AvatarStatSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvatarStatSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarStatSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
