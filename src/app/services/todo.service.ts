import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'; 
import {AuthService} from './auth.service';
import {Todo} from '../models/todo';

@Injectable({
    providedIn: 'root'
})
export class TodoService{
    private uid: number;
    constructor(
        private http: HttpClient,
        private authService: AuthService
    ){
        this.uid = authService.currentUid;
    }

    getAllByUid(){
        return this.http.get<Todo[]>(this.authService.hostUrl + `/todo?userid=${this.uid}`);
    }
}