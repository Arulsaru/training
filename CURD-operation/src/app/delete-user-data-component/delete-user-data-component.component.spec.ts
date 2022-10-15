import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUserDataComponentComponent } from './delete-user-data-component.component';

describe('DeleteUserDataComponentComponent', () => {
  let component: DeleteUserDataComponentComponent;
  let fixture: ComponentFixture<DeleteUserDataComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteUserDataComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteUserDataComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
