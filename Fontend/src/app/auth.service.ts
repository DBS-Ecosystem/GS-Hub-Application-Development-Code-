import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface LoginResponse {
  error: boolean;
  message: string;
}

interface User {
  name: string;
  type: string;
}

const options = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private api_link: string;

  constructor(private http: HttpClient) {
    this.api_link = './api/auth';
  }
  
  login(credentials: Object): Observable<HttpResponse<LoginResponse>> {
    return this.http.post<LoginResponse>(this.api_link + '/login', credentials, {...options, observe: 'response'});
  }

  register(credentials: Object): Observable<HttpResponse<LoginResponse>> {
    return this.http.post<LoginResponse>(this.api_link + '/reg', credentials, {...options, observe: 'response'});
  }

  saveToken(res: HttpResponse<LoginResponse>) {
    if (res.body && !res.body.error) {
      const token = res.headers.get('auth-token');
      if (token) localStorage.setItem('token',  token ?? "");
      const data = token ? this.parseJwt(token) : null;
      if (data) localStorage.setItem('data', JSON.stringify(data));
    }
  }

  private parseJwt(token: string): Object {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('data');
  }

  getUser(): User {
    const datajson = localStorage.getItem('data');
    const data: {name: string, type: string} = datajson ? JSON.parse(datajson) : {name: '', type: ''};
    return {name: data.name, type: data.type};
  }

  getToken(): any {
    return localStorage.getItem('token');
  }

  isLogged(): boolean {
    return localStorage.getItem('token') !== null;
  } 
}
