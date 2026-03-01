import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDash } from './home-dash';

describe('HomeDash', () => {
  let component: HomeDash;
  let fixture: ComponentFixture<HomeDash>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeDash]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeDash);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
