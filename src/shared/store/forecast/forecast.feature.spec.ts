import { BulkForecastItem, CurrentWeather } from '../../types/forecast.type';
import { ForecastActions } from './forecast.actions';
import { forecastFeature, ForecastState } from './forecast.feature';

describe('forecast feature', () => {
  let reducer = forecastFeature.reducer;
  const initialState: ForecastState = {
    forecast: [],
    loading: false,
    error: null,
  };
  const forecast: BulkForecastItem[] = [
    {
      query: {
        q: 'query',
        location: {
          id: 1,
          name: 'name',
          region: 'region',
          country: 'country',
          lat: 1,
          lon: 1,
          url: 'url',
        },
        current: { condition: { text: 'text', icon: 'icon', code: 1 }} as unknown as CurrentWeather,
      },
    },
    {
      query: {
        q: 'query',
        location: {
          id: 2,
          name: 'name',
          region: 'region',
          country: 'country',
          lat: 1,
          lon: 1,
          url: 'url',
        },
        current: { condition: { text: 'text', icon: 'icon', code: 1 } } as unknown as CurrentWeather,
      },
    },
  ];

  it('should create a reducer', () => {
    expect(reducer).toBeDefined();
  });

  it('should return the initial state', () => {
    const result = reducer(undefined, { type: 'unknown' });
    expect(result).toEqual(initialState);
  });

  it('should handle Forecast Page Loaded', () => {
    const result = reducer(initialState, ForecastActions.forecastPageLoaded());
    expect(result).toEqual({
      forecast: [],
      loading: true,
      error: null,
    });
  });

  it('should handle Get Forecast Success', () => {
    const result = reducer(
      initialState,
      ForecastActions.getForecastSuccess({ forecast })
    );
    expect(result).toEqual({
      forecast,
      loading: false,
      error: null,
    });
  });

  it('should handle Get Forecast Failure', () => {
    const result = reducer(
      initialState,
      ForecastActions.getForecastFailure({ error: 'error' })
    );
    expect(result).toEqual({
      forecast: [],
      loading: false,
      error: 'error',
    });
  });
});
