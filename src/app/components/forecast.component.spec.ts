import { TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { Mock, MockComponent } from 'ng-mocks';
import { ForecastItemComponent } from './forecast-item.component';
import { ForecastComponent } from './forecast.component';
import { ActivatedRoute } from '@angular/router';
import { ForecastQuery } from '../../shared/types/forecast.type';
import { of } from 'rxjs';

const mockData = of({
  forecast: [
    {
      query: {
        q: 'New York',
        location: { name: 'New York' },
        current: { condition: { text: 'Sunny' }, temp_c: 25 },
      } as unknown as ForecastQuery,
    },
    {
      query: {
        q: 'London',
        location: { name: 'London' },
        current: { condition: { text: 'Overcast' }, temp_c: 25 },
      } as unknown as ForecastQuery,
    },
  ],
});

describe('ForecastComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatCardModule, MockComponent(ForecastItemComponent)],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: mockData,
          },
        },
      ],
    }).compileComponents();
  }));

  it('should create the component', () => {
    const fixture = TestBed.createComponent(ForecastComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render forecast items', () => {
    const fixture = TestBed.createComponent(ForecastComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('app-forecast-item').length).toEqual(2);
  });
});
