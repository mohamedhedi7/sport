import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStadiumComponent } from './edit-stadium.component';

describe('EditStadiumComponent', () => {
  let component: EditStadiumComponent;
  let fixture: ComponentFixture<EditStadiumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditStadiumComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditStadiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
