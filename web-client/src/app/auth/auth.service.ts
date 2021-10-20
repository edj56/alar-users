import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ILoginRequest, ILoginResponse } from './login/login.interfaces';
import { IRegisterRequest } from './register/register.interfaces';
import { IProfile } from "./auth.interfaces";

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  login(data: ILoginRequest): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>('/api/auth/login', data)
      .pipe(tap((response) => {
        localStorage.setItem('alar.accessToken', response.token);
      }));
  }

  register(data: IRegisterRequest): Observable<boolean> {
    return this.http.post<boolean>('/api/auth/register', data);
  }

  getMe(): Observable<IProfile> {
    return this.http.get<IProfile>('/api/profile');
  }
}
