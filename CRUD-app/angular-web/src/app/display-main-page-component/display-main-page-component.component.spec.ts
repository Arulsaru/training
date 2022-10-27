import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayMainPageComponentComponent } from './display-main-page-component.component';

describe('DisplayMainPageComponentComponent', () => {
  let component: DisplayMainPageComponentComponent;
  let fixture: ComponentFixture<DisplayMainPageComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayMainPageComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayMainPageComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
