import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsDash } from './projects-dash';

describe('ProjectsDash', () => {
  let component: ProjectsDash;
  let fixture: ComponentFixture<ProjectsDash>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsDash]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsDash);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
