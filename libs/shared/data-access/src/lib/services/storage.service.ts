import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly storage = typeof window !== 'undefined' ? window.localStorage : null;

  get<T>(key: string): T | null {
    if (!this.storage) {
      return null;
    }

    try {
      const item = this.storage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  }

  set<T>(key: string, value: T): void {
    if (!this.storage) {
      return;
    }

    try {
      this.storage.setItem(key, JSON.stringify(value));
    } catch {
    }
  }

  remove(key: string): void {
    if (!this.storage) {
      return;
    }

    this.storage.removeItem(key);
  }

  clear(): void {
    if (!this.storage) {
      return;
    }

    this.storage.clear();
  }
}


