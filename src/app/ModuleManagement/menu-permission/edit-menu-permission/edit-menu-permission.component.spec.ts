import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMenuPermissionComponent } from './edit-menu-permission.component';

describe('EditMenuPermissionComponent', () => {
  let component: EditMenuPermissionComponent;
  let fixture: ComponentFixture<EditMenuPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMenuPermissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMenuPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
