import { ForecastActions } from "./forecast.actions";
import { forecastFeature } from "./forecast.feature";

describe('Forecast feature', () => {
    let reducer = forecastFeature.reducer;
    it('should test success case', () => {
       const state = reducer(undefined, ForecastActions.getForecastSuccess);
       expect(state.loading).toBeFalsy();
    });
    it('should test failure case', () => {
        const state = reducer(undefined, ForecastActions.getForecastFailure({ error: 'error' }));
        expect(state.loading).toBeFalsy();
        expect(state.error).toBe('error');
    });
});