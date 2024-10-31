import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { ForecastItemComponent } from './forecast-item.component';

describe('ForecastItemComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForecastItemComponent],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(ForecastItemComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
  it('should check ui classes', () => {
    const fixture = TestBed.createComponent(ForecastItemComponent);
    const component = fixture.componentInstance;
    let item = signal({
      location: {
        name: 'London',
      },
      current: {
        condition: {
          text: 'Sunny',
        },
        temp_c: 20,
      },
    });
    component.item = item as any;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.sunny')).toBeTruthy();
    item = signal({
      location: {
        name: 'London',
      },
      current: {
        condition: {
          text: 'Overcast',
        },
        temp_c: 20,
      },
    });
    component.item = item as any;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.overcast')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('mat-card-title').textContent).toContain('London');
  });

});
