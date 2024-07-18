import { UtilsService } from "./utils.service";

describe('UtilsService', () => {
  const service = new UtilsService();

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should clone an object', () => {
    const obj = {a: 1, b: 2};
    const clone = service.clone(obj);
    expect(clone).toEqual(obj);
    expect(clone).not.toBe(obj);
  });

  it('should clone an array', () => {
    const arr = [1, 2, 3];
    const clone = service.clone(arr);
    expect(clone).toEqual(arr);
    expect(clone).not.toBe(arr);
  });

  it('should clone a deep nested object', () => {
    const obj = {a: 1, b: {c: 2, d: {e: 3}}};
    const clone = service.clone(obj);
    expect(clone).toEqual(obj);
    expect(clone).not.toBe(obj);
  });   
});
    