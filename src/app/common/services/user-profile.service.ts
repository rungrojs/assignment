import { Injectable } from '@angular/core';

const authenKey: string = 'isAuthenticated'
@Injectable({
    providedIn: 'root'
})
export class UserProfileService {
    public isAuthenticated(): boolean {
        return localStorage.getItem(authenKey) === 'true';
    }

    public signedIn(): void {
        localStorage.setItem(authenKey, 'true');
    }

    public signedOut(): void {
        localStorage.removeItem(authenKey);
    }

}
