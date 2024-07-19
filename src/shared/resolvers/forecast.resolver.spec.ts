import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, Subject } from 'rxjs';
import { ForecastActions } from '../store/forecast/forecast.actions';
import { ForecastState } from '../store/forecast/forecast.feature';
import { BulkForecastItem, ForecastQuery } from '../types/forecast.type';
import { forecastResolver } from './forecast.resolver';

describe('forecast resolver', () => {
  let store: MockStore;
  const actions$ = new Subject<any>();
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({ initialState }),
        provideMockActions(() => actions$),
      ],
    });

    store = TestBed.inject(MockStore);
  });

  it('should resolve forecast data', async () => {
    TestBed.runInInjectionContext(() => {
      const dispatchSpy = spyOn(store, 'dispatch').and.callFake(() => {});
      const expected = cold('---a', { a: initialState.forecast });
      const resolvedData = forecastResolver(
        {} as ActivatedRouteSnapshot,
        {} as RouterStateSnapshot
      ) as Observable<BulkForecastItem[]>;
      actions$.next(
        ForecastActions.getForecastSuccess({ forecast: initialState.forecast })
      );
      expect(dispatchSpy).toHaveBeenCalledWith(
        ForecastActions.forecastPageLoaded()
      );
      expect(resolvedData).toBeObservable(expected);
    });
  });
});
