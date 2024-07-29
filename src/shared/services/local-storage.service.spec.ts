import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  const service = new LocalStorageService();
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('should get an item from local storage', () => {
  //   const key = 'test';
  //   const value = 'test';
  //   localStorage.setItem(key, value);
  //   expect(service.getItem(key)).toEqual(value);
  // });

  it('should set an item in local storage', () => {
    const key = 'test';
    const value = 'test';
    service.setItem(key, value);
    expect(service.getItem(key)).toEqual(value);
  });

  // it('should remove an item from local storage', () => {
  //   const key = 'test';
  //   const value = '{item: test}';
  //   service.setItem(key, value);
  //   service.removeItem(key);
  //   expect(service.getItem(key)).toBeNull();
  // });

  afterEach(() => {
    localStorage.clear();
  });
});
