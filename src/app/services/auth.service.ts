import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { access } from 'fs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private http: HttpClient
    ) { }

    login(username: string, password: string) {
        return this.http.post<any>('http://localhost:3000/auth/login', { username, password }).subscribe(
            data => {
                if (data) {
                    localStorage.setItem('uid', data.id);
                    localStorage.setItem('access_token', data.access_token);
                    return data;
                } else {
                    return;
                }
            }
        )
    }

    logout(){
        localStorage.removeItem('uid');
        localStorage.removeItem('access_token');
    }
}