import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public host = 'http://localhost:3000';
    constructor(
        private http: HttpClient
    ) { }

    login(username: string, password: string) {
        return this.http.post<any>(this.host + '/auth/login', { username, password }).pipe(
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
        return this.http.post<any>(this.host + '/auth/register', user).pipe(
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