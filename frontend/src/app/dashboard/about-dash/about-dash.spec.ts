import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutDash } from './about-dash';

describe('AboutDash', () => {
  let component: AboutDash;
  let fixture: ComponentFixture<AboutDash>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutDash]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutDash);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
