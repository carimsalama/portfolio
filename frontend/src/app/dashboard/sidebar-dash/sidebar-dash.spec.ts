import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarDash } from './sidebar-dash';

describe('SidebarDash', () => {
  let component: SidebarDash;
  let fixture: ComponentFixture<SidebarDash>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarDash]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarDash);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
