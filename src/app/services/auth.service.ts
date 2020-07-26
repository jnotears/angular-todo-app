import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public hostUrl = 'http://localhost:3000';
    constructor(
        private http: HttpClient
    ) { }

    public get currentUid(): number{
        return parseInt(localStorage.getItem('uid'));
    }

    public get access_token(){
        return localStorage.getItem('access_token');
    }

    login(username: string, password: string) {
        return this.http.post<any>(this.hostUrl + '/auth/login', { username, password }).pipe(
            map(
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

        )
    }

    register(user: User) {
        return this.http.post<any>(this.hostUrl + '/auth/register', user).pipe(
            map(
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
        );
    }

    logout() {
        localStorage.removeItem('uid');
        localStorage.removeItem('access_token');
    }
}