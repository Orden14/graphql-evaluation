import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }

  isUserLoggedIn(): boolean {
    return !!sessionStorage.getItem('JwT');
  }

  logout() : void {
    sessionStorage.removeItem('JwT');
  }
}
