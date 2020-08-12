import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OurBeginningsComponent } from './our-beginnings.component';

describe('OurBeginningsComponent', () => {
  let component: OurBeginningsComponent;
  let fixture: ComponentFixture<OurBeginningsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OurBeginningsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OurBeginningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
