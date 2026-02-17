import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StadiumInfoComponent } from './stadium-info.component';

describe('StadiumInfoComponent', () => {
  let component: StadiumInfoComponent;
  let fixture: ComponentFixture<StadiumInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StadiumInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StadiumInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
