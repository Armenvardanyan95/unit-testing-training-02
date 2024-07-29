import { WeatherLocation } from "../../types/location.type";
import { LocationsActions } from "./locations.actions";
import { locationsFeature, LocationsState } from "./locations.feature";

describe('locations feature', () => {
  let reducer = locationsFeature.reducer;
  const initialState: LocationsState = {
    locations: [],
    favoriteLocations: [],
    loading: false,
    error: null,
  };
  const locations: WeatherLocation[] = [
    { id: 1, name: 'name', region: 'region', country: 'country', lat: 1, lon: 1, url: 'url' },
    { id: 2, name: 'name', region: 'region', country: 'country', lat: 1, lon: 1, url: 'url' },
  ];
  

  it('should create a reducer', () => {
    expect(reducer).toBeDefined();
  });

  it('should return the initial state', () => {
    const result = reducer(undefined, { type: 'unknown' });
    expect(result).toEqual(initialState);
  });

  it('should handle Search Locations', () => {
    let result = reducer(initialState, LocationsActions.searchLocations({ query: 'query' }));
    expect(result).toEqual({
      locations: [],
      favoriteLocations: [],
      loading: true,
      error: null,
    });

    result = reducer(result, LocationsActions.searchLocationsSuccess({ locations }));
    expect(result).toEqual({
      locations,
      favoriteLocations: [],
      loading: false,
      error: null,
    });
  });

   it('should handle Add to Favorites', () => {
      const result = reducer(initialState, LocationsActions.addToFavorites({ location: locations[0] }));
      expect(result).toEqual({
        locations: [],
        favoriteLocations: [locations[0]],
        loading: false,
        error: null,
      });
    });
 
    it('should handle Remove from Favorites', () => {
      let result = reducer(initialState, LocationsActions.addToFavorites({ location: locations[0] })); 
      result = reducer(initialState, LocationsActions.removeFromFavorites({ location: locations[0] }));
      expect(result).toEqual({
        locations: [],
        favoriteLocations: [],
        loading: false,
        error: null,
      });
    });

  it('should handle Set Favorites Bulk', () => {
    const result = reducer(initialState, LocationsActions.setFavoritesBulk({ locations }));
    expect(result).toEqual({
      locations: [],
      favoriteLocations: locations,
      loading: false,
      error: null,
    });
  });
});