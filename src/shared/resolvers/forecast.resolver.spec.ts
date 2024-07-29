import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Subject } from 'rxjs';
import { forecastFeature, ForecastState } from '../store/forecast/forecast.feature';
import { ForecastQuery } from '../types/forecast.type';

describe('forecast resolver', () => {
  let store: MockStore;
  const actions$ = new Subject<any>();
  let actions;
  const initialState: ForecastState = {
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
    loading: false,
    error: null,
  };
  let mockForecastSelector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore(),
        provideMockActions(() => actions$),
      ],
    });

    store = TestBed.inject(MockStore);
    mockForecastSelector = store.overrideSelector(forecastFeature.selectForecast, initialState.forecast);
  });

  it('should resolve forecast data', async () => {
    // TestBed.runInInjectionContext(() => {
    //   const scheduler = new TestScheduler((actual, expected) => {
    //     expect(actual).toEqual(expected);
    //   });
    //   scheduler.run(({ cold, expectObservable }) => {
    //     const dispatchSpy = spyOn(store, 'dispatch').and.callFake(() => {});
    //     const expected = cold('---(a|)', { a: initialState.forecast });
    //     const resolvedData = forecastResolver(
    //       {} as ActivatedRouteSnapshot,
    //       {} as RouterStateSnapshot
    //     ) as Observable<BulkForecastItem[]>;
    //     store.refreshState();
    //     resolvedData.subscribe((data) => {
    //       console.log(data);
    //     });
    //     actions$.next(
    //       ForecastActions.getForecastSuccess({
    //         forecast: initialState.forecast,
    //       })
    //     );
    //     expect(dispatchSpy).toHaveBeenCalledWith(
    //       ForecastActions.forecastPageLoaded()
    //     );
    //     expectObservable(resolvedData).toBe('a', { a: initialState.forecast });
    //   });
    // });
  });
});
