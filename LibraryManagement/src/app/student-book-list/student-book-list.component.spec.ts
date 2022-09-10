import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentBookListComponent } from './student-book-list.component';

describe('StudentBookListComponent', () => {
  let component: StudentBookListComponent;
  let fixture: ComponentFixture<StudentBookListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentBookListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentBookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
