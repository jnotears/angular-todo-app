import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Todo } from '../models/todo';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TodoService {
    private uid: number;
    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) {
        this.uid = authService.currentUid;
    }

    getAllByUid() {
        return this.http.get<Todo[]>(this.authService.hostUrl + `/todo?userid=${this.uid}`);
    }

    create(todo: Todo): Observable<Todo>{
        return this.http.post<Todo>(this.authService.hostUrl + `/todo`, todo);
    }

    update(todo: Todo): Observable<Todo> {
        return this.http.put<Todo>(this.authService.hostUrl + `/todo`,todo);
    }

    delete(id: number) {
        return this.http.delete(this.authService.hostUrl + `/todo/${id}`);
    }
}