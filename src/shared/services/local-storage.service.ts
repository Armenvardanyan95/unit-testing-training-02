import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class LocalStorageService {
  constructor() {}

  getItem<T>(key: string): T | string {
    const item = localStorage.getItem(key) ?? 'null';
    try {
      return JSON.parse(item);
    } catch {
      return item;
    }
  }

  setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}