import { TestBed } from '@angular/core/testing';
import { ForecastComponent } from './forecast.component';
import { provideRouter } from '@angular/router';

describe('ForecastComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForecastComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(ForecastComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
