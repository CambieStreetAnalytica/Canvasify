import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectExpComponent } from './collect-exp.component';

describe('CollectExpComponent', () => {
  let component: CollectExpComponent;
  let fixture: ComponentFixture<CollectExpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectExpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectExpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
