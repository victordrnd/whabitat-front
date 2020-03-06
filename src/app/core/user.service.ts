import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUserSubject = new BehaviorSubject<any>({});
  public currentUser = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());


  private isAuthenticatedSubject = new BehaviorSubject<any>(false);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient,
      private router : Router) {
    this.populate();
   }


  async populate() {
    // If JWT detected, attempt to get & store user's info
    if (this.getToken()) {
      try {
        let result;
        await this.getCurrentUser().toPromise().then(res => {
          result = res;
        });
        this.currentUserSubject.next(result);
        //this.setAuth(result);
        this.isAuthenticatedSubject.next(true);
        return true;
      } catch (error) {
        console.log(error);
        this.purgeAuth();
        this.isAuthenticatedSubject.next(false);
        return false;
      }
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
      return false;
    }
  }

  setAuth({ user, token }: any) {
    // Save JWT sent from server in localstorage
    this.saveToken(token);

    // Set current user data into observable
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  async purgeAuth() {
    // Remove JWT from localstorage
    this.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next({});
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }


  getCurrentUser() {
    return this.http.get(`${environment.ApiUrl}/auth/current`)
      .pipe(map((res: any) => res.result));
  }

  attemptAuth(crendentials) {
    return this.http.post(`${environment.ApiUrl}/auth/login`, crendentials)
      .pipe(map((res: any) => res.result));
  }

  signUp(user){
    return this.http.post(`${environment.ApiUrl}/auth/signup`, user)
      .pipe(map((res:any) => res.result));
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }
  destroyToken() {
    localStorage.removeItem('token');
  }

}
