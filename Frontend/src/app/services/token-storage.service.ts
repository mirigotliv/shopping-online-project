import { Injectable } from '@angular/core';

@Injectable()

export class TokenStorageService {
    set(key: string, data: string): void {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            console.error('Error saving to localStorage', error);
        }
    }

    get(key: string) {
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch (error) {
            console.error('Error getting data from localStorage', error);
            return null;
        }
    }
}