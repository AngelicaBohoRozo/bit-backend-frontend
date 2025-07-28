import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HabitosComponent } from './habits';

describe('HabitosComponent', () => {
  let component: HabitosComponent;
  let fixture: ComponentFixture<HabitosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitosComponent] // standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(HabitosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});