import { NgClass } from '@angular/common';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { By } from '@angular/platform-browser';
import { ForecastQuery } from '../../shared/types/forecast.type';
import { ForecastItemComponent } from './forecast-item.component';

describe('ForecastItemComponent', () => {
  const forecastQuery: ForecastQuery = {
      q: 'New York',
      location: { name: 'New York' },
      current: { condition: { text: 'Sunny' }, temp_c: 25 },
    } as unknown as ForecastQuery;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatCardModule, NgClass],
    }).compileComponents();
  }));
  it('should render correctly when provided with valid ForecastQuery input', async () => {
    const fixture = TestBed.createComponent(ForecastItemComponent);
    fixture.componentRef.setInput('item', forecastQuery); 

    await fixture.detectChanges();

    const title = fixture.debugElement.query(By.css('mat-card-title'));
    expect(title.nativeElement.textContent).toContain('New York');
  });

  it('should render a relevant picture when provided with a weather condition', async () => {
    const fixture = TestBed.createComponent(ForecastItemComponent);
    fixture.componentRef.setInput('item', forecastQuery); 

    await fixture.detectChanges();

    const card = fixture.debugElement.query(By.css('mat-card'));
    expect((card.nativeElement as HTMLElement).classList.value).toContain('sunny');

    fixture.componentRef.setInput('item', {...forecastQuery, current: { ...forecastQuery.current, condition: { text: 'Overcast' } } });
    fixture.detectChanges();

    expect((card.nativeElement as HTMLElement).classList.value).toContain('overcast');
  });

  it('should render the condition and temperature when provided with a weather condition', async () => {
    const fixture = TestBed.createComponent(ForecastItemComponent);
    fixture.componentRef.setInput('item', forecastQuery); 

    await fixture.detectChanges();

    const card = fixture.debugElement.query(By.css('mat-card'));
    const condition = card.query(By.css('span:first-child'));
    const temperature = card.query(By.css('span:last-child'));

    expect(condition.nativeElement.textContent).toContain('Sunny');
    expect(temperature.nativeElement.textContent).toContain('25');
  });

  afterEach(() => {});
});
