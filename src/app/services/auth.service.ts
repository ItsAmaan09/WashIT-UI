import { Injectable } from "@angular/core";
import { environement } from '../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private baseAPIurl = environement.api_url;

    constructor(private http: HttpClient){}

    login(payload: {username:string; password: string}) {
      return this.http.post<any>(`${this.baseAPIurl}auth/login`, payload).pipe(
        tap((res: any) => {
          if(res?.token) {
            localStorage.setItem('token', res.token);
            localStorage.setItem('username', res.UserName);
          }
        })
      );
    }

    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('UserName');
    }

    getToken() {
      return localStorage.getItem('token');
    }

    isLoggedIn() : boolean {
      return !!localStorage.getItem('token');
    }
}
