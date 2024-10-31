import { LocationsActions } from "./locations.actions";
import { locationsFeature } from "./locations.feature";

describe('Location feature', () => {
    let reducer = locationsFeature.reducer;
    const location = { id: 1, name: 'New York', region: 'New York', country: 'US', lat: 40.7128, lon: -74.006, url: 'https://www.weatherapi.com/weather/40.7128/-74.006' };
    it('should test searchLocations', () => {
        const state = reducer(undefined, LocationsActions.searchLocations);
        expect(state.loading).toBeTrue();
     });
     it('should test searchLocationsFailure', () => {
        const state = reducer(undefined, LocationsActions.searchLocationsFailure);
        expect(state.loading).toBeFalsy();
     });
     it('should test searchLocationsSuccess', () => {
        const state = reducer(undefined, LocationsActions.searchLocationsSuccess);
        expect(state.loading).toBeFalsy();
     });
     it('should test addToFavorites', () => {
        const state = reducer(undefined, LocationsActions.addToFavorites({ location }));
        expect(state.favoriteLocations.length).toBe(1);
     });
     it('should test setFavoritesBulk', () => {
        const state = reducer(undefined, LocationsActions.setFavoritesBulk({ locations: [location] }));
        expect(state.favoriteLocations.length).toBe(1);
     });
     it('should test removeFromFavorites', () => {
        const state = reducer({ locations: [], loading: false, error: null, favoriteLocations: [location] }, LocationsActions.removeFromFavorites({ location }));
        expect(state.favoriteLocations.length).toBe(0);
     });
     it('should select locations with the favorite flag', () => {
        const locations = [location];
        const favoriteLocations = [location];
        const state = {
          locations,
          favoriteLocations,
          loading: false,
          error: null,
        };
        const result = locationsFeature.selectLocationResults.projector(
          state.locations,
          state.favoriteLocations
        );
        expect(result).toEqual([
          { ...location, favorite: true },
        ]);
      });
});