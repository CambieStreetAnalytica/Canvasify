import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarSummaryListComponent } from './avatar-summary-list.component';

describe('AvatarSummaryListComponent', () => {
  let component: AvatarSummaryListComponent;
  let fixture: ComponentFixture<AvatarSummaryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvatarSummaryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarSummaryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
