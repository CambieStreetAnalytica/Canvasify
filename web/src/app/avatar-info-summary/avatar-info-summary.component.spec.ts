import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarInfoSummaryComponent } from './avatar-info-summary.component';

describe('AvatarInfoSummaryComponent', () => {
  let component: AvatarInfoSummaryComponent;
  let fixture: ComponentFixture<AvatarInfoSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvatarInfoSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarInfoSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
