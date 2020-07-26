import { Component, OnInit } from '@angular/core';
import { Todo } from '../models/todo';
import { TodoService } from '../services/todo.service'
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
enum Status {
    done = 'done',
    new = 'new',
}

@Component({
    templateUrl: 'todo.component.html'
})
export class TodoComponent implements OnInit {
    todo: Todo[] = [];
    status = Status;

    constructor(
        private todoService: TodoService,
        private authService: AuthService,
        private router: Router
    ) {
        if (!this.authService.currentUid) {
            this.router.navigate(['login']);
        }
    }

    ngOnInit() {
        this.getAllByUid();
    }

    getAllByUid() {
        this.todoService.getAllByUid().subscribe(
            todo => {
                this.todo = todo;
            }
        )
    }

    tongleStatus(e, item) {
        if (e.target.checked) {
            item.status = this.status.done;
        } else {
            item.status = this.status.new;
        }
        this.todoService.update(item).subscribe();
    }

    delete(id: number) {
        this.todoService.delete(id).subscribe(
            data => {
                this.getAllByUid();
            }
        );
    }

    logout() {
        if (this.authService.logout()) {
            this.router.navigate(['login']);
        }
    }

    addItem(todo: Todo){
        this.todo.push(todo);
    }
}